# Portfolio - David Rodríguez Hernández

A modern, static portfolio site with clean architecture, filterable projects, Mermaid diagrams, and Giscus comments.

Built with vanilla JavaScript using ES6 modules, following clean code principles and separation of concerns.

## ✨ Features

- 🎨 Modern, responsive design
- 🔍 Advanced filtering (year, technology, type, search)
- 📊 Interactive Mermaid diagrams
- 💬 Giscus comment system
- 🎭 Matrix-style 404 error page
- 🏗️ Clean, modular architecture
- ⚡ Static site generation
- 📱 Mobile-friendly

## 🏗️ Project Structure

```
my-portfolio/
├── src/
│   ├── scripts/
│   │   ├── config/
│   │   │   └── constants.js          # Configuration
│   │   ├── services/
│   │   │   └── api.js                # Data fetching
│   │   ├── utils/
│   │   │   ├── badges.js             # Badge utilities
│   │   │   └── dom.js                # DOM utilities
│   │   ├── templates/
│   │   │   └── html-generators.js    # HTML templates
│   │   ├── modules/
│   │   │   └── filters.js            # Filter logic
│   │   ├── site.js                   # Home page
│   │   ├── project-detail.js         # Project pages
│   │   └── error-page.js             # 404 page
│   ├── templates/
│   │   ├── index.html                # Home template
│   │   └── project.html              # Project template
│   ├── styles/
│   │   ├── styles.css                # Main styles
│   │   └── matrix-effect.css         # Matrix animation
│   └── data/
│       └── projects.json             # Projects data
├── public/
│   └── assets/                       # Static assets
├── scripts/
│   └── build.js                      # Build script
└── dist/                             # Build output
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.0.0

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd my-portfolio

# Install dependencies (optional, for live-server)
npm install
```

### Development
```bash
# Build and serve the site
npm run dev

# Build with file watching (auto-rebuild on changes)
npm run dev:watch

# Open in browser
# Visit: http://localhost:3000
```

### Production Build
```bash
# Build for production
npm run build

# The built site will be in the dist/ directory
```

## 📝 Adding Projects

Edit `src/data/projects.json` to add new projects:

```json
{
  "config": {
    "siteName": "Your Name",
    "tagline": "Your Tagline"
  },
  "projects": [
    {
      "id": "project-slug",
      "title": "Project Title",
      "icon": "🎮",
      "year": 2026,
      "type": "game",
      "description": "Short description",
      "tech": ["JavaScript", "React"],
      "url": "projects/project-slug/",
      "featured": true,
      "details": {
        "summary": "Detailed summary",
        "content": "Full description",
        "links": {
          "github": "https://github.com/...",
          "demo": "https://...",
          "discussions": "https://..."
        },
        "images": ["../../assets/project/image.png"],
        "diagram": {
          "type": "mermaid",
          "code": "flowchart LR; A-->B;"
        }
      }
    }
  ]
}
```

## 🎨 Customization

### Styles
Edit `src/styles/styles.css` to customize the look and feel.

### Templates
- `src/templates/index.html` - Home page layout
- `src/templates/project.html` - Individual project page layout

### Scripts
- `src/scripts/site.js` - Home page functionality
- `src/scripts/project-detail.js` - Project page functionality

## 🌐 Deployment

### GitHub Pages
1. Create a public repository
2. Push your code to the `main` branch
3. Build the site: `npm run build`
4. Deploy the `dist` folder to GitHub Pages
5. Configure in **Settings → Pages** → Deploy from branch → `main` → `/dist`

Alternatively, use GitHub Actions to automate:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Other Platforms
- **Netlify**: Connect your repo and set build command to `npm run build` and publish directory to `dist`
- **Vercel**: Same as Netlify
- **Any static host**: Upload the contents of the `dist` folder

## 💬 Comments (Giscus)

To enable comments on project pages:
1. Go to https://giscus.app
2. Configure your discussion repository
3. Update the Giscus configuration in `src/data/projects.json` for each project

## 🔧 Scripts Reference

- `npm run dev` - Build and start local server
- `npm run dev:watch` - Start development mode with file watching
- `npm run build` - Build for production
- `npm run serve` - Serve the dist folder
- `npm run clean` - Remove dist directory
- `npm start` - Build and serve (alias for production preview)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**David Rodríguez Hernández**
- GitHub: [@DavidRodriguez-create](https://github.com/DavidRodriguez-create)
