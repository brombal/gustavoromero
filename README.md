# Gustavo Romero - Concert Pianist

Official website for Gustavo Romero, Mexican-American concert pianist.

**Live site:** [gustavoromero.com](https://gustavoromero.com)

## Local Development

No build process required. Simply open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Updating Content

Content is stored in markdown files in the `content/` directory:

| File | Content |
|------|---------|
| `home.md` | Hero section tagline and quote |
| `biography.md` | Biography text |
| `applause.md` | Press reviews |
| `discography.md` | Album details and purchase links |
| `media.md` | YouTube video IDs |
| `contact.md` | Contact information |

To update the site:
1. Edit the relevant markdown file(s)
2. Ask the AI agent to update the site, or manually edit `index.html`

## Deployment

Hosted on GitHub Pages. To deploy changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Changes will be live within a few minutes.

## Project Structure

```
├── index.html           # Main website
├── assets/
│   ├── css/style.css    # Styles
│   ├── js/main.js       # JavaScript
│   └── images/          # Images and album covers
├── content/             # Markdown content files
├── AGENTS.md            # Instructions for AI agents
└── README.md            # This file
```

## Tech Stack

- Plain HTML, CSS, JavaScript
- Google Fonts (Cormorant Garamond, Inter)
- GitHub Pages hosting
- No build tools or frameworks
