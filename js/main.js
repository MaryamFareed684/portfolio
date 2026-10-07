/* Mobile menu, project filters, contact form, and the hero "embedding space" */

// ---- Mobile menu
(function () {
  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// ---- Project filters
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  var items = document.querySelectorAll('.project');
  if (!chips.length) return;
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      items.forEach(function (it) {
        var cats = (it.getAttribute('data-cats') || '').split(' ');
        it.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
      });
    });
  });
})();

// ---- Contact form: opens the visitor's email app with the message filled in
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var from = form.elements.email.value.trim();
    var msg = form.elements.message.value.trim();
    var subject = encodeURIComponent('Portfolio message from ' + name);
    var body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + from + ')');
    window.location.href = 'mailto:mrymfarid684@gmail.com?subject=' + subject + '&body=' + body;
  });
})();

// ---- Hero: points drift into four clusters; move the cursor to pull them
(function () {
  var canvas = document.getElementById('space');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clusters = [
    { name: 'documents', color: '#2d3cf5', x: 0.27, y: 0.30 },
    { name: 'images',    color: '#0f9d6a', x: 0.74, y: 0.28 },
    { name: 'text',      color: '#e0457b', x: 0.30, y: 0.72 },
    { name: 'tables',    color: '#e09a14', x: 0.72, y: 0.74 }
  ];
  var pts = [], w = 0, h = 0, dpr = 1, mouse = null, raf;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init() {
    pts = [];
    clusters.forEach(function (c, ci) {
      for (var i = 0; i < 26; i++) {
        pts.push({
          c: ci,
          x: Math.random() * w, y: Math.random() * h,
          vx: 0, vy: 0,
          ox: (Math.random() - 0.5) * 0.17, oy: (Math.random() - 0.5) * 0.17,
          r: 2.4 + Math.random() * 2
        });
      }
    });
  }

  function step() {
    pts.forEach(function (p) {
      var c = clusters[p.c];
      var tx = (c.x + p.ox) * w, ty = (c.y + p.oy) * h;
      p.vx += (tx - p.x) * 0.0035; p.vy += (ty - p.y) * 0.0035;
      if (mouse) {
        var dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        if (d < 120) { p.vx += (dx / d) * (120 - d) * 0.012; p.vy += (dy / d) * (120 - d) * 0.012; }
      }
      p.vx *= 0.9; p.vy *= 0.9;
      p.x += p.vx; p.y += p.vy;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // faint links inside each cluster
    ctx.lineWidth = 1;
    for (var i = 0; i < pts.length; i++) {
      for (var j = i + 1; j < pts.length; j++) {
        if (pts[i].c !== pts[j].c) continue;
        var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d2 = dx * dx + dy * dy;
        if (d2 < 2400) {
          ctx.strokeStyle = clusters[pts[i].c].color + '33';
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    }
    pts.forEach(function (p) {
      ctx.fillStyle = clusters[p.c].color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
    });
    ctx.font = '600 13px "IBM Plex Sans", sans-serif';
    ctx.textAlign = 'center';
    clusters.forEach(function (c) {
      ctx.fillStyle = c.color;
      ctx.fillText(c.name, c.x * w, (c.y < 0.5 ? c.y - 0.16 : c.y + 0.19) * h);
    });
  }

  function loop() { step(); draw(); raf = requestAnimationFrame(loop); }

  function start() {
    size(); init();
    if (reduce) {
      for (var k = 0; k < 160; k++) step();
      draw();
    } else {
      cancelAnimationFrame(raf); loop();
    }
  }

  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  canvas.addEventListener('pointerleave', function () { mouse = null; });
  window.addEventListener('resize', start);
  start();
})();
