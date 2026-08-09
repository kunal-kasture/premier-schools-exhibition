# Premier Schools Exhibition (PSE)

A responsive, accessible single-page marketing website for the Premier Schools Exhibition — a one-stop education fair that brings Gurugram's top 30+ schools, along with 500+ participating schools across 17 cities worldwide, all in one place. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Live Demo
https://premier-schools-exhibition-six-beta.vercel.app/

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Interactivity | Vanilla JavaScript (ES6+), modular component scripts |
| Build/Deps | None required — runs straight from source |

## Features

- **Hero slider** with animated capsule image track and an "Enquire Now" form
- **Achievements strip** showcasing legacy stats (1M+ trusted, 22+ years, 500+ schools, 17 cities)
- **Participating schools** marquees scrolling left-to-right and right-to-left with a pause control
- **Event video** player with play/pause toggle
- **School category** selector — "Choose the School That Fits You Best"
- **Pre-schedule** appointment call-to-action
- **Awards & attractions** section featuring the Premier Kidz Awards and The Parent Exchange
- **Exhibition highlights** slider with prev/next arrows, dots, and pause control
- **Visitor reviews** video grid with play toggles
- **Photo gallery** with a horizontally scrollable track
- **Sticky header**, mobile **sticky register CTA**, and a full **footer** with office addresses and social links

## Accessibility

Built with accessibility in mind:

- Skip-to-content link and semantic landmarks (`header`, `main`, `footer`, `section`)
- ARIA labels, roles, and `aria-pressed`/`aria-current` states on all sliders and controls
- Keyboard-focusable carousels and buttons with visible focus styles
- Descriptive alt text on every image
- Form labels (visually hidden) tied to their inputs

## Getting Started

```bash
git clone <repo-url>
cd premier-schools-exhibition
```

Then open `index.html` in your browser.

## Project Structure

```
premier-schools-exhibition/
├── index.html            # Single-page entry point
├── assets/               # SVG illustrations, logos, videos, photos
├── css/
│   ├── main.css          # Imports all component styles
│   └── components/       # Per-section stylesheets
└── js/
    ├── main.js           # Boots all widgets on DOM ready
    └── components/       # Per-feature scripts
```

### CSS components

| File | Purpose |
|------|---------|
| `css/components/header.css` | Sticky header |
| `css/components/hero.css` | Hero slider, capsule track, enquiry form |
| `css/components/achievements.css` | Achievements strip |
| `css/components/choose-school.css` | School category selector |
| `css/components/participating-schools.css` | School logo marquees |
| `css/components/pre-schedule.css` | Pre-schedule CTA section |
| `css/components/event-video.css` | Event video player |
| `css/components/awards.css` | Awards & attractions section |
| `css/components/exhibition.css` | Exhibition highlights slider |
| `css/components/visitors-review.css` | Visitor review videos |
| `css/components/gallery.css` | Photo gallery |
| `css/components/footer.css` | Footer with addresses & socials |
| `css/components/sticky-cta.css` | Mobile sticky register CTA |

### JS components

| File | Purpose |
|------|---------|
| `js/components/header.js` | Sticky header behavior |
| `js/components/hero.js` | Hero slider and draggable capsule track |
| `js/components/choose-school.js` | School category slider & dots |
| `js/components/participating-schools.js` | School logo marquees |
| `js/components/event-video.js` | Event video play toggle |
| `js/components/exhibition.js` | Exhibition highlights slider |
| `js/components/visitors-review.js` | Visitor review video grid |
| `js/components/gallery.js` | Gallery horizontal scroll |
| `js/components/enquiry-form.js` | Enquire Now form handling |

Each widget is exposed on `window` and booted by `js/main.js`, which isolates failures so one broken init never breaks the rest.
