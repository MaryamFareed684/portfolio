# Maryam Farid — Portfolio

A multi-page portfolio site built with plain HTML, CSS and JavaScript. No build step and no dependencies.

**Pages:** Home, About, Experience, Projects, Skills, Contact

## Structure

```
portfolio/
├── index.html
├── about.html
├── experience.html
├── projects.html
├── skills.html
├── contact.html
├── css/style.css
├── js/main.js
└── assets/Maryam_Farid_Resume.pdf
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages

1. Create a new public repository named `portfolio` (or `MaryamFareed684.github.io` for a cleaner URL).
2. Upload these files, or push them:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/MaryamFareed684/portfolio.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**, set the source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. After a minute your site is live at `https://MaryamFareed684.github.io/portfolio/`.

## Before you publish

- Create a GitHub repository for each project, using the names linked on the Projects page, or edit the links to match your repository names.
- Add the live link for StudyMind AI: in `projects.html`, change the `Live demo` link from `#` to your deployed URL.
- Add your phone number only if you want it public. It is left out on purpose.

## Edit content

Each page is plain HTML. Project cards are in `projects.html` and the first three also appear in `index.html`. Colors and fonts are variables at the top of `css/style.css`.
