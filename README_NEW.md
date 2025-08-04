# Ahmetcan Aksu - Personal Portfolio

A modern, responsive, and accessible personal portfolio website built with React, Tailwind CSS, and daisyUI. Deployed on GitHub Pages with custom domain support.

🌐 **Live Site**: [ahmetcanaksu.com](https://ahmetcanaksu.com)  
🚀 **GitHub Pages**: [ahmetcanaksu.github.io/ahmetcanaksu](https://ahmetcanaksu.github.io/ahmetcanaksu)

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching with localStorage persistence
- **Accessible**: WCAG 2.1 AA compliant with semantic HTML and ARIA attributes
- **Fast Performance**: Built with Vite for optimal loading speeds
- **SEO Optimized**: Proper meta tags and structured content
- **GitHub Pages Ready**: Automated deployment via GitHub Actions

## 🛠️ Tech Stack

- **Frontend**: React 19+ with JavaScript
- **Styling**: Tailwind CSS + daisyUI components
- **Routing**: React Router v6+ with HashRouter (GitHub Pages compatible)
- **Build Tool**: Vite for fast development and building
- **Package Manager**: pnpm for efficient dependency management
- **Deployment**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions for automated deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (install with `npm install -g pnpm`)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/ahmetcanaksu/ahmetcanaksu.git
cd ahmetcanaksu

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open http://localhost:5173 in your browser
```

### Build & Deploy

```bash
# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Deploy to GitHub Pages
pnpm run deploy
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation bar with theme toggle
│   ├── Footer.jsx       # Footer with social links
│   ├── ThemeToggle.jsx  # Dark/light theme switcher
│   ├── ProjectCard.jsx  # Project display cards
│   └── ResumeEmbed.jsx  # PDF resume viewer
├── pages/               # Route components
│   ├── Home.jsx         # Landing page with hero section
│   ├── About.jsx        # About me page
│   ├── Projects.jsx     # Projects showcase
│   ├── Blog.jsx         # Blog posts listing
│   ├── Utilities.jsx    # UtilStation tools showcase
│   ├── Resume.jsx       # Resume/CV page
│   └── Contact.jsx      # Contact form and info
├── data/
│   └── projects.json    # Project data (EDIT THIS)
├── content/
│   └── blog/            # Blog posts in Markdown
└── App.jsx              # Main app with routing
```

## 🎨 Customization

### 1. Personal Information

Update personal details in:

- `src/pages/Home.jsx` - Hero section
- `src/pages/About.jsx` - Bio and background
- `src/components/Footer.jsx` - Social links
- `src/components/Header.jsx` - Navigation

### 2. Projects

Edit `src/data/projects.json` to add/modify projects:

```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "techTags": ["React", "Node.js"],
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "featured": true,
  "status": "active",
  "year": "2024"
}
```

### 3. Blog Posts

Add Markdown files to `src/content/blog/`:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
excerpt: "Brief description"
tags: ["Programming", "React"]
author: "Your Name"
---

# Your content here...
```

### 4. Resume/CV

Replace `public/cv.pdf` with your actual PDF resume.

### 5. Theme Customization

Modify `tailwind.config.js` to customize colors and themes:

```javascript
daisyui: {
  themes: ["light", "dark", "cupcake", "synthwave"], // Add your preferred themes
}
```

## 🌐 DNS & Domain Setup

For custom domain (like `ahmetcanaksu.com`):

### DNS Configuration

Set up these DNS records with your domain provider:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     ahmetcanaksu.github.io
```

### GitHub Pages Settings

1. Go to your repo → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `/ (root)`
4. Custom domain: `yourdomain.com`
5. ✅ Enforce HTTPS

The `CNAME` file is already included in `public/CNAME`.

## 🔧 Available Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `pnpm run dev`     | Start development server |
| `pnpm run build`   | Build for production     |
| `pnpm run preview` | Preview production build |
| `pnpm run deploy`  | Deploy to GitHub Pages   |
| `pnpm run lint`    | Run ESLint               |

## 📝 Content Guidelines

### Projects

- Include both `repoUrl` and `liveUrl` when available
- Use descriptive `techTags` for filtering
- Mark important projects as `featured: true`
- Keep descriptions concise but informative

### Blog Posts

- Use consistent frontmatter format
- Include relevant tags for filtering
- Write engaging excerpts for the listing page
- Structure content with proper headings

### Images & Assets

- Place images in `public/` directory
- Use descriptive alt text for accessibility
- Optimize images for web (WebP format recommended)
- Reference images with absolute paths: `/image.jpg`

## 🚀 Deployment

### Automatic Deployment

GitHub Actions automatically deploys to GitHub Pages on every push to `main`:

1. Builds the project with `pnpm run build`
2. Deploys to `gh-pages` branch
3. Updates live site at your custom domain

### Manual Deployment

```bash
pnpm run deploy
```

This runs the build and pushes to the `gh-pages` branch.

## 🎯 Performance

- ⚡ **Vite**: Fast development and optimized builds
- 🎨 **Tailwind CSS**: Utility-first CSS with purging
- 📦 **Code Splitting**: Automatic route-based splitting
- 🖼️ **Image Optimization**: WebP support and lazy loading
- ♿ **Accessibility**: WCAG 2.1 AA compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Questions?

Feel free to reach out:

- **Email**: hello@ahmetcanaksu.com
- **GitHub**: [@ahmetcanaksu](https://github.com/ahmetcanaksu)
- **Twitter**: [@ahmetcanaksu](https://twitter.com/ahmetcanaksu)
- **LinkedIn**: [ahmetcanaksu](https://linkedin.com/in/ahmetcanaksu)

---

**Built with ❤️ using React, Tailwind CSS, daisyUI, and pnpm**
