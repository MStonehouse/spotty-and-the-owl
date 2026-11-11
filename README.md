# Spotty and the Owl Apparel website

The website for **Spotty and the Owl Apparel**, a family-run custom apparel shop in Comox, BC, on Vancouver Island. It covers screen printing, embroidery, heat-transfer vinyl, DTF and DTG printing for businesses, trades, schools, sports teams and events.

It's a hand-built static site: plain HTML, CSS and JavaScript, with no frameworks, no build step and nothing to install. Any static host (GitHub Pages, Cloudflare Pages, Netlify) can serve the files exactly as they are.

---

## Pages

| Page | Address | What's on it |
|---|---|---|
| Home | `#home` | The embroidery-hoop video, the five decoration methods, who we work with, recent work, why choose us |
| Services | `#services` | Each method in detail, the method chooser table, blank apparel, promotional products |
| Work | `#work` | Gallery of finished jobs with Embroidery / Printing filters and a full-screen viewer |
| Pricing | `#pricing` | What determines price, order sizes, customer-supplied garments |
| Quote | `#quote` | The quote request form and what happens next |
| Artwork | `#artwork` | File formats, vector vs raster, AI-image warning, review and approval |
| About | `#about` | The story, the logo, how the shop works |
| Guarantee | `#policies` | Production guarantee, what isn't covered, customer-supplied apparel, quantity accuracy |

The whole site is one HTML page. The part of the address after `#` decides which page `js/main.js` draws, so moving between pages is instant. A second part after a hyphen scrolls to a section: `#services-embroidery`, `#policies-supplied`.

---

## Project structure

```
spotty-and-the-owl/
├── index.html          The page shell: top bar, phone dock and menu, photo viewer
├── css/
│   └── style.css       All the styling, in numbered sections (contents at the top)
├── js/
│   ├── content.js      The words and pictures: contact details, methods, work, pricing, steps
│   ├── logos.js        Dan's logo as vector shapes, generated from assets/logo/
│   └── main.js         Builds each page from content.js and makes everything interactive
└── assets/
    ├── fonts/          Self-hosted fonts (Archivo, Newsreader) and their open-source licences
    ├── img/            Photos, each in an 800px and a 1600px WebP
    ├── logo/           The traced logo (full illustration and wordmark) as SVG
    └── video/          The 5-second embroidery loop and its poster frame
```

**The rule of thumb:** words and pictures live in `js/content.js`, looks live in `css/style.css`, and behaviour lives in `js/main.js`. Most day-to-day changes only touch `content.js`.

---

## Common changes

**Contact details.** Edit `BUSINESS` at the top of `js/content.js`. Adding an email address there makes it appear in the footer automatically.

**Connecting the quote form.** The form works but has nowhere to send yet, so it shows a "Preview only" note after submitting. Sign up for a form service that accepts file uploads (Formspree, Web3Forms or Netlify Forms), then paste its address into `QUOTE_FORM_ENDPOINT` in `js/content.js`. The note disappears and requests go to Dan's inbox.

**Adding a finished job.** Make two WebP copies of the photo, 800px and 1600px wide, named like `assets/img/my-job-800.webp` and `assets/img/my-job-1600.webp`. Then add a line to `WORK` and an alt text to `WORK_ALT` in `js/content.js`. `kind` is `"embroidery"` or `"print"` and drives the filter buttons.

**Swapping a photo.** Replace the two WebP files, keeping the same names, and update the alt text in `content.js` if the picture changed.

---

## Colours and type

Colours are set once as tokens at the top of `css/style.css` (`--bone`, `--ink`, `--spruce`, `--gold` and friends), with a second set for dark mode. Every rule uses the tokens, so changing a colour in one place changes it everywhere.

Headlines use Archivo at a narrow width, like team lettering; body text uses Archivo at normal width; the spoken lines ("Don't just say it. Wear it.") use Newsreader italic.

---

## Unused photos

`dtf-printers`, `patch-landscape` and `thread-cones` are in `assets/img/` but not used on any page yet. They're kept in case they're wanted later.
