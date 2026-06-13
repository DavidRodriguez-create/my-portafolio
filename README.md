# Portfolio - David Rodriguez Hernandez

[![Portfolio](https://img.shields.io/badge/🔗_Live_Site-Visit_Now-blue?style=for-the-badge)](https://davidrodriguez-create.github.io/my-portafolio/)

## Project Aim

A collection of my personal side projects showcasing backend engineering, data pipelines, and web development experiments. This portfolio highlights my skills across Java/Quarkus, Go, Python, and modern web tooling.

**Key Features:**
- JSON-driven content — update projects without touching HTML
- Giscus comment system for project discussions
- Dark/light theme with persistent preference
- Static site generation for fast loading and easy deployment

## How to Build Locally

### Prerequisites
- Node.js >= 18
- pnpm

### Build Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DavidRodriguez-create/my-portafolio.git
   cd my-portafolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build and run the site**
   ```bash
   pnpm dev
   ```
   This will build the site and serve it at `http://localhost:3000`

### Production Build
```bash
pnpm build
```
The built site will be in the `dist/` directory, ready to deploy.

## How to Add New Projects

All projects are defined in a single JSON file. To add a new project:

1. **Open** `src/data/projects.json`

2. **Add your project** to the `projects` array:

   ```json
   {
     "id": "my-awesome-project",
     "title": "My Awesome Project",
     "icon": "🚀",
     "year": 2026,
     "status": "building",
     "type": "web",
     "description": "A brief description of your project",
     "tech": ["JavaScript", "React", "Node.js"],
     "url": "projects/my-awesome-project/",
     "featured": true,
     "details": {
       "summary": "Short summary for the detail page",
       "content": ["<p>Longer description with more details</p>"],
       "links": {
         "github": "https://github.com/yourusername/project",
         "demo": "https://yourproject.com",
         "docs": "https://yourusername.github.io/project/",
         "discussions": "https://github.com/yourusername/project/discussions"
       },
       "images": [
         "../../assets/project/screenshot.png"
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
         "reactionsEnabled": "0",
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
   - `id` — Unique identifier (used in URLs)
   - `title` — Project name displayed on the site
   - `icon` — Emoji icon for the project card
   - `year` — Project year (for filtering)
   - `status` — One of `"live"`, `"building"`, or `"complete"`
   - `type` — Category: `"web"`, `"game"`, `"fullstack"`, `"backend"`, etc.
   - `description` — Short description shown on cards
   - `tech` — Array of technologies
   - `url` — Relative path to the project detail page
   - `featured` — Set to `true` to highlight the project
   - `details` — Extended info for the detail page:
     - `summary` — Brief summary
     - `content` — Array of HTML strings for the full description
     - `links` — `github`, `demo`, `docs`, `discussions` URLs
     - `images` — Screenshots (place in `public/assets/`)
     - `diagram` — Mermaid diagram config
     - `giscus` — Comment system config (get IDs from [giscus.app](https://giscus.app))

4. **Add images** (if any) to `public/assets/your-project/`

5. **Rebuild** the site:
   ```bash
   pnpm build
   ```

Your new project will appear automatically on the homepage with filtering support.

---

## License

MIT License — see [LICENSE](LICENSE) file for details.

## Author

**David Rodriguez Hernandez**
- GitHub: [@DavidRodriguez-create](https://github.com/DavidRodriguez-create)
- Portfolio: [https://davidrodriguez-create.github.io/my-portafolio/](https://davidrodriguez-create.github.io/my-portafolio/)
