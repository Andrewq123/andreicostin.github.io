# Andrei Costin | Portfolio

Junior QA tester and C++ developer. A static website (HTML, CSS, JavaScript) that works on GitHub Pages, with no build step.

## Put it online (GitHub Pages)

1. Create a GitHub account if you don't have one, then click **New repository**.
2. Name it `YOUR-GITHUB-USERNAME.github.io` (your site will be `https://YOUR-GITHUB-USERNAME.github.io`) or any other name (your site will be `https://YOUR-GITHUB-USERNAME.github.io/that-name/`). Make it **Public**.
3. Click **uploading an existing file**, drag in **everything inside this folder** (the `.html` files, `css`, `js`, `assets`, `.nojekyll`), and click **Commit changes**.
4. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and Save.
5. Wait 1 to 2 minutes and open the link GitHub shows you.

## Before you publish

Replace `YOUR-GITHUB-USERNAME` with your real username. It appears in the footer of the six `.html` files. In VS Code: Edit > Replace in Files.

Then put your new site link and GitHub link into the CV, where it says `[portfolio link]` and `[GitHub link]`.

## Files

- `index.html`, `about.html`, `projects.html`, `tools.html`, `play.html`, `contact.html`: the pages
- `css/style.css`: all styling, with a dark theme by default and a light theme
- `js/main.js`: theme switch, scroll effects. The other files in `js/` each belong to one page
- `assets/img/`: the banner drawings

## Notes

- The contact form opens the visitor's email app with the message filled in, because GitHub Pages cannot receive form data.
- To change text, edit the `.html` files. To add a project, copy one `<article class="card" ...>` block in `projects.html` and change its text and `data-tags`.
