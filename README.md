# Aditya Paul — Portfolio

A single-file, no-build-tools portfolio site for a full-stack web developer. Built as one self-contained `index.html` with embedded CSS and JS — open it directly in a browser or deploy it anywhere that serves static files.

**Live concept:** the page is styled like a blueprint / API-documentation notebook — a fitting frame for a backend-leaning developer. The hero renders as a mock `GET /api/profile` response typed out live, and the skills section is laid out as database schema tables (`frontend_stack`, `backend_stack`, `tools`, `other_skills`).

## Features

- **Single HTML file** — no npm install, no build step, no dependencies to manage. Just open `index.html`.
- **Dark / light theme toggle** — persists across visits via `localStorage`, with a genuinely distinct light ("aged paper") palette rather than an inverted dark theme.
- **Typewriter hero panel** — animated on load, falls back to static text if the visitor has `prefers-reduced-motion` enabled.
- **Scroll-triggered reveals** for each section via `IntersectionObserver`.
- **Fully responsive** — mobile nav collapses into a menu below 900px; layout re-stacks for narrow screens.
- **Accessible by default** — visible keyboard focus states, semantic headings, reduced-motion support.

## File structure

```
/
├── index.html              ← the entire site (rename aditya-portfolio.html to this)
└── Aditya_Paul_Resume.pdf  ← you need to add this yourself (see below)
```

## Before you deploy — action items

1. **Add your résumé PDF.** The "Download Résumé" buttons link to `./Aditya_Paul_Resume.pdf`, which isn't included — add your actual résumé file with that exact filename in the same folder as `index.html`, or update the two `href="./Aditya_Paul_Resume.pdf"` links in the file if you name it differently.
2. **Rename the HTML file to `index.html`** if you're deploying to GitHub Pages, Netlify, or Vercel — most static hosts look for that filename by default.
3. **Double check contact details** — email, phone, LinkedIn, and GitHub links are pulled from what you gave me. Update them directly in the `#contact` section if anything changes.

## Customizing

Everything lives in one `<style>` block at the top of the file, driven by CSS custom properties:

- **Colors** — edit the `[data-theme="dark"]` and `[data-theme="light"]` blocks near the top of the `<style>` tag. Every color in the page (backgrounds, text, accents, borders) is a variable, so changing a value there updates it everywhere.
- **Fonts** — three Google Fonts are loaded in `<head>`: `Space Grotesk` (headings), `IBM Plex Sans` (body text), `IBM Plex Mono` (code/labels). Swap the `<link>` tag and the `--font-*` variables together if you want a different pairing.
- **Sections** — each section (`#about`, `#stack`, `#work`, `#experience`, `#contact`) is a clearly marked `<section>` block in the HTML body; content can be edited directly without touching the CSS or JS.
- **Projects** — each project is a `.case-card` block under `#work`. Copy an existing card's markup to add a new one; the `status` span accepts `live` or `progress` as a class to control the badge color.

## Deploying

**GitHub Pages (free, simplest):**
1. Create a repo, add `index.html` and your résumé PDF.
2. Push to GitHub.
3. In the repo's Settings → Pages, set the source to the `main` branch, root folder.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

**Netlify / Vercel:** drag-and-drop the folder in their dashboard, or connect the GitHub repo — no build command is needed since there's no build step.

## Tech notes

- No frameworks, no bundlers — plain HTML/CSS/JS.
- Theme preference is stored in `localStorage` under the key `theme`.
- Respects `prefers-reduced-motion` and `prefers-color-scheme` on first visit.

---

Built by Aditya Paul — [pauladitya2907@gmail.com](mailto:pauladitya2907@gmail.com) · [linkedin.com/in/aditya-web](https://linkedin.com/in/aditya-web) · [github.com/Aditya-2907](https://github.com/Aditya-2907)
