# 🖥️ Terminal Portfolio - React Edition

A terminal-style UI portfolio built with React + Vite. Designed for developers, engineers, and tech enthusiasts who want a unique and geeky way to showcase their skills, projects, and articles.

## 🔧 Features

- Simulated terminal interface with command-line input
- Custom commands like `about`, `skills`, `projects`, `articles`, and `clear`
- Markdown-based article rendering
- Easily updatable via JSON/Markdown files
- Free deployment with GitHub Pages

---

## 📦 Setup Instructions

### 1. Clone this repo
```bash
git clone https://github.com/yourusername/react-terminal-portfolio.git
cd react-terminal-portfolio
```

### 2. Install dependencies
```bash
git clone https://github.com/yourusername/react-terminal-portfolio.git
cd react-terminal-portfolio
```

### 3. Run locally
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

## ✍️ Add or Update Content

### 📁 About
Edit src/content/about.json

### 📁 Skills
Edit src/content/skills.json

### 📁 Projects
Edit src/content/projects.json

### 📁 Articles
Place your Markdown files inside src/content/articles/, e.g.:
```
src/content/articles/article1.md
```
The default setup displays `article1.md`. You can modify `Terminal.jsx` to list and select multiple articles.

## 🚀 Deployment (GitHub Pages)

### 1. Install gh-pages

```
npm install --save-dev gh-pages
```

### 2. Add these to `package.json`.

`homepage`
```json
"homepage": "https://yourusername.github.io/react-terminal-portfolio"
```

`scripts`
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

### Deploy

```bash
npm run deploy
```

## 🛠 Tech Stack

- React
- Vite
- Marked for Markdown parsing
- gh-pages for GitHub Pages deployment

