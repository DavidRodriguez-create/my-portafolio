# Portfolio - David Rodríguez Hernández

[![Portfolio](https://img.shields.io/badge/🔗_Live_Site-Visit_Now-blue?style=for-the-badge)](https://davidrodriguez-create.github.io/my-portafolio/)



## 🎯 Project Aim

A collection of my personal side projects showcasing backend engineering, data pipelines, and web development experiments. This portfolio highlights my skills across Java/Quarkus, Python, Spark/Databricks, and modern web tooling.

**Key Features:**
- JSON-driven content - update projects without touching HTML
- Giscus comment system for project discussions
- Static site generation for fast loading and easy deployment

## 🏗️ How to Build Locally

### Prerequisites
- Node.js >= 14.0.0

### Build Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DavidRodriguez-create/my-portafolio.git
   cd my-portafolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build and run the site**
   ```bash
   npm run dev
   ```
   This will build the site and serve it at `http://localhost:3000`

4. **Development with auto-rebuild** (optional)
   ```bash
   npm run dev:watch
   ```
   Automatically rebuilds when you change source files.

### Production Build
```bash
npm run build
```
The built site will be in the `dist/` directory, ready to deploy.

## ➕ How to Add New Projects

All projects are defined in a single JSON file. To add a new project:

1. **Open** `src/data/projects.json`

2. **Add your project** to the `projects` array:

   ```json
   {
     "id": "my-awesome-project",
     "title": "My Awesome Project",
     "icon": "🚀",
     "year": 2026,
     "type": "web",
     "description": "A brief description of your project",
     "tech": ["JavaScript", "React", "Node.js"],
     "url": "https://github.com/yourusername/project",
     "featured": true,
     "details": {
       "summary": "Short summary for the detail page",
       "content": "Longer description with more details",
       "links": {
         "github": "https://github.com/yourusername/project",
         "demo": "https://yourproject.com",
         "discussions": "https://github.com/yourusername/project/discussions"
       },
       "images": [
         "assets/project/screenshot.png"
       ],
       "diagram": {
         "type": "mermaid",
         "code": "flowchart LR; A[User] --> B[App]; B --> C[API];"
       },
       "giscus": {
         "repo": "yourusername/project",
         "repoId": "YOUR_REPO_ID",
         "category": "Q&A",
         "categoryId": "YOUR_CATEGORY_ID",
         "mapping": "og:title",
         "strict": "0",
         "reactionsEnabled": "1",
         "emitMetadata": "0",
         "inputPosition": "top",
         "theme": "preferred_color_scheme",
         "lang": "en",
         "loading": "lazy"
       }
     }
   }
   ```

3. **Field explanations:**
   - `id` - Unique identifier (used in URLs)
   - `title` - Project name displayed on the site
   - `icon` - Emoji icon for the project card
   - `year` - Project year (for filtering)
   - `type` - Category: `"web"`, `"game"`, `"data"`, `"tool"`, etc.
   - `description` - Short description shown on cards
   - `tech` - Array of technologies (creates badges automatically)
   - `url` - Link to project (GitHub, demo, etc.)
   - `featured` - Set to `true` to highlight the project
   - `details` - (Optional) Extended info for detail page:
     - `summary` - Brief summary
     - `content` - Full description
     - `links` - GitHub, demo, discussions URLs
     - `images` - Screenshots (place in `public/assets/`)
     - `diagram` - Mermaid diagram code
     - `giscus` - Comment system config (get from [giscus.app](https://giscus.app))

4. **Add images** (if any) to `public/assets/your-project/`

5. **Rebuild** the site:
   ```bash
   npm run build
   ```

Your new project will appear automatically on the homepage with filtering support!

---

## � License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**David Rodríguez Hernández**
- GitHub: [@DavidRodriguez-create](https://github.com/DavidRodriguez-create)
- Portfolio: [https://davidrodriguez-create.github.io/my-portafolio/](https://davidrodriguez-create.github.io/my-portafolio/)

