# Aditya — Personal Portfolio Website

A modern, professional, fully responsive personal portfolio for **Aditya** — Frontend Web Developer, UI Designer & Creative Digital Freelancer.

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main HTML file
├── css/
│   └── style.css       ← All styles (variables, components, responsive)
├── js/
│   └── main.js         ← All interactivity (navbar, animations, form)
├── images/             ← Add your images here
│   └── (add project screenshots & profile photo here)
└── README.md
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Background | `#0f172a` |
| Secondary Background | `#111827` |
| Card Background | `#1e293b` |
| Accent Color | `#38bdf8` |
| Primary Text | `#f1f5f9` |
| Secondary Text | `#94a3b8` |
| Display Font | DM Serif Display |
| Body Font | DM Sans |

## ✅ Sections

1. **Hero** — Name, title, CTA buttons, stats, animated profile card
2. **About** — Summary + 4 info cards (Frontend, Design, Backend, Creative)
3. **Skills** — 3-column grid: Frontend, Backend, Creative
4. **Services** — 5 service cards + 1 CTA card
5. **Projects** — 4 project cards with hover overlay
6. **Journey** — Vertical timeline of learning history
7. **Contact** — Info panel + contact form
8. **Footer** — Logo, tagline, socials, nav links

## 🚀 Deploy to Netlify

1. Drag & drop the `portfolio/` folder into [app.netlify.com/drop](https://app.netlify.com/drop)
2. Done — live in seconds!

## 🐙 Deploy to GitHub Pages

```bash
# 1. Create a GitHub repo
# 2. Push files
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 3. Go to Settings → Pages → Source: main branch → Save
```

## 🖼 Replacing Placeholders

### Profile Photo
In `index.html`, find `.profile-img-placeholder` and replace with:
```html
<img src="images/aditya.jpg" alt="Aditya – Frontend Developer" class="profile-photo">
```
Then add CSS in `style.css`:
```css
.profile-photo {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
```

### Project Images
Replace each `.project-img-placeholder` div with:
```html
<img src="images/project-name.jpg" alt="Project Name" loading="lazy">
```

### Social Links
Search for these placeholders in `index.html` and update:
- `your-username` in GitHub URL
- `your-username` in LinkedIn URL
- `your-username` in Fiverr URL
- `aditya@email.com` email address

## 📬 Real Contact Form

To make the form actually send emails, replace the simulated delay in `main.js` with one of:

**Option A — Formspree (free tier)**
```javascript
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(contactForm),
  headers: { 'Accept': 'application/json' }
});
```

**Option B — EmailJS (free tier)**
Use their SDK: [emailjs.com](https://www.emailjs.com/)

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| > 1100px | Full 3-col services grid |
| ≤ 900px | Tablet: stacked hero, 1-col services/skills |
| ≤ 600px | Mobile: full-width, centered, compact |
| ≤ 380px | Small phones: tighter spacing |

---
Built with ❤️ using HTML5, CSS3 & Vanilla JavaScript — no frameworks, no build tools needed.
