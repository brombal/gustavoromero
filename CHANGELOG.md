# Changelog

This documents changes made from the initial AI-generated draft to the final website. The goal is to prevent regressions and avoid repeating mistakes in future updates.

## Issues Fixed From Initial Draft

### Content Accuracy
- **Biography text must be verbatim** - The initial draft paraphrased/summarized the biography. This was corrected to use the exact text from the original site. Never paraphrase official biography or press review text.
- **All press reviews must be verbatim** - Same issue as biography. Reviews are copyrighted material and must be reproduced exactly.
- **Mompou track listing corrected** - Initial draft had placeholder/incorrect track names. Updated to correct Spanish titles (Pájaro Triste, La Barca, etc.)

### UX Issues
- **Removed scroll snapping** - The initial `scroll-snap-type: y mandatory` was too aggressive. Users reported it jumping to the next section before they were ready. Removed entirely for smooth free scrolling.
- **Fixed mobile menu background** - Menu had no visible background when opened while scrolled down on a page. Fixed by using solid `var(--color-black)` background, `height: 100vh`, `top: 0`, and proper `z-index: 999`.
- **Improved hero quote readability** - Text was hard to read against the background image. Added `text-shadow` to `.hero-quote p`, `.hero-quote cite`, and `.hero-tagline`.

### Removed Sections
- **Performances section removed** - Only had outdated past performances with no upcoming events. Better to omit than show stale data.
- **Audio section removed** - The interview MP3 file no longer exists at the original URL.

## Design Decisions

### Color Scheme
- Primary: Black (`#0a0a0a`) and white
- Accent: Gold (`#c9a962`) - used sparingly for highlights
- Avoid introducing new colors

### Typography
- Headings: Cormorant Garamond (serif)
- Body: Inter (sans-serif)
- Don't change fonts without good reason

### Applause Section
- Uses masonry layout (CSS columns)
- Quote sizes vary by length:
  - `quote-large` - Very short quotes ("A pianist of genius")
  - `quote-medium` - Medium length quotes
  - `quote-small` - Longer quotes

### Discography
- Album cards open modal popups on click
- Modals include: cover image, title, composer, performer, track listing, Amazon purchase link
- Album data stored in `albumData` object in main.js

### Media Section
- Featured video at top (larger)
- Thumbnail grid below - clicking swaps the featured video
- Uses YouTube thumbnail URLs: `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
- Active thumbnail gets `.active` class

### Mobile Navigation
- Hamburger menu at 768px breakpoint
- Full-screen overlay with centered links
- Uses opacity/visibility transition (not transform - had issues with scroll containers)
