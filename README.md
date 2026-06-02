# 🚀 Nisha Soni — Auto-Sync Portfolio

A production-ready personal portfolio that **automatically syncs all your GitHub repositories** — no manual updates ever needed.

![Portfolio Preview](preview.png)

---

## ✨ Features

- 🔄 **Auto GitHub Sync** — All public repos load live via GitHub API
- 🎨 **Bold & Colorful UI** — Dark theme with animated blobs & gradient accents
- 🔍 **Filter by Language** — Python, JS, HTML, Jupyter Notebook
- ⭐ **Stats Panel** — Shows repo count & languages used
- 📱 **Fully Responsive** — Works on mobile & desktop
- 🔗 **Live Demo Links** — Reads `homepage` field from each repo automatically
- ⚡ **Zero Backend** — Pure HTML/CSS/JS, no server needed

---

## 📁 Project Structure

```
portfolio/
├── index.html      → Main portfolio page
├── style.css       → All styles (dark theme, animations)
├── app.js          → GitHub API fetching + filter logic
└── README.md       → This file
```

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Create the repo
1. Go to [github.com/new](https://github.com/new)
2. Name it exactly: `N-i-sha.github.io`
   *(replace N-i-sha with your exact GitHub username)*
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Upload files
Upload these 3 files to the repo:
- `index.html`
- `style.css`
- `app.js`

### Step 3 — Enable GitHub Pages
1. Go to repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` → folder: `/ (root)`
4. Click **Save**

### Step 4 — Done! 🎉
Your portfolio is live at:
```
https://N-i-sha.github.io
```

---

## 🎯 How Auto-Sync Works

Every time someone visits your portfolio, it calls the GitHub API:
```
https://api.github.com/users/N-i-sha/repos
```
This fetches ALL your public repos in real-time. So:
- Push a new project to GitHub → it appears on portfolio automatically
- Update a repo description → portfolio shows new description
- Add a `homepage` URL to a repo → portfolio shows a live demo button

---

## ✏️ Customization

### Update your email & LinkedIn
Open `index.html` and find:
```html
<a href="mailto:your@email.com" ...>
<a href="https://www.linkedin.com/in/YOUR-LINKEDIN" ...>
```
Replace with your real email and LinkedIn URL.

### Add a project description on GitHub
In each GitHub repo, click **Edit** (pencil icon) next to About:
- Add a **Description** → shows as project card text
- Add a **Website URL** → shows as live demo button 🔗

### Show a repo as featured
Add the topic `featured` to any GitHub repo. The card will appear first.

---

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Data:** GitHub REST API v3
- **Hosting:** GitHub Pages (free)
- **Fonts:** Syne + DM Sans (Google Fonts)

---

## 📄 License
MIT — Free to use and customize.

---

*Made with 💜 by Nisha Soni*
