# AI AGENT INSTRUCTIONS

This file is for AI agents (Claude, etc.) working on this codebase. Humans should refer to README.md.

## Your Role

You are maintaining a static website for Gustavo Romero, a concert pianist. When the user updates content in the markdown files, your job is to update the HTML/CSS/JS files to reflect those changes.

## Workflow

When the user says they've updated the markdown files:

1. Read the relevant markdown file(s) in `content/`
2. Update the corresponding section(s) in `index.html`
3. If adding albums, also update the `albumData` object in `assets/js/main.js`
4. If adding videos, add both the thumbnail HTML and update `content/media.md`

## Content Files → HTML Mapping

| Markdown File | HTML Section | Notes |
|---------------|--------------|-------|
| `content/home.md` | `#home` .hero-content | Tagline and quote |
| `content/biography.md` | `#biography` .bio-content | Verbatim text - do not paraphrase |
| `content/applause.md` | `#applause` .quotes-masonry | Verbatim quotes - do not paraphrase |
| `content/discography.md` | `#discography` .albums-grid + JS albumData | Album cards and modal data |
| `content/media.md` | `#media` .video-grid | YouTube video IDs |
| `content/contact.md` | `#contact` .contact-info | Email and social links |

## Critical Rules

1. **Never paraphrase or summarize biography text or press reviews** - these must be verbatim
2. **No build process** - this is a plain static site, just edit the files directly
3. **No scroll snapping** - this was removed intentionally due to poor UX

## Design System (for any new elements)

- **Colors:** Deep black (`#080808`), warm ivory (`#ede5d8`/`#f7f2eb`), burnished gold accent (`#c5963a`)
- **Fonts:** DM Serif Display for headings, Lexend for body
- **Quote sizes:** Use `quote-large` for short quotes, `quote-medium` for medium, `quote-small` for longer quotes
- **Animations:** Use `animate-on-scroll` class for fade-in effects

## File Structure

```
index.html          # Main page - update sections here
assets/css/style.css   # Styles
assets/js/main.js      # Navigation, modals, albumData object
assets/images/         # Images including albums/
content/               # Markdown source files (user edits these)
```

## Example: User adds a new album

When user updates `content/discography.md` with a new album:

1. Add new `.album-card` div in the `#discography` section of `index.html`
2. Add new entry to `albumData` object in `assets/js/main.js` with title, subtitle, composer, performer, image path, tracks array, and purchaseUrl
3. Ensure album cover image exists in `assets/images/albums/`

## Example: User adds a new review

When user updates `content/applause.md` with a new review:

1. Add new `.quote-card` div in the `#applause` .quotes-masonry section
2. Choose appropriate size class based on quote length
3. Include the exact quote text and source attribution
