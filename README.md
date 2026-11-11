# Spotty and the Owl Apparel website

The website for **Spotty and the Owl Apparel**, a family-run custom apparel shop in Courtenay, BC, on Vancouver Island. It covers screen printing, embroidery, heat-transfer vinyl, DTF and DTG printing for businesses, trades, schools, sports teams and events.

It's a hand-built static site: plain HTML, CSS and JavaScript, with no frameworks, no build step and nothing to install. To preview it on your computer, run a tiny local web server from this folder and open the address it prints:

```bash
python -m http.server 8000      # then visit http://localhost:8000
```

(Double-clicking `index.html` mostly works, but browsers won't load the logo stencil from a file on disk for security reasons, so the logo goes blank. Through any web server it shows normally.) Any static host (GitHub Pages, Cloudflare Pages, Netlify) can serve the files exactly as they are.

---

## Pages

Every page is its own HTML file, so each one has a real address that Google can read and people can bookmark.

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | The embroidery-hoop video, the five methods, who we work with, recent work, why choose us |
| Services | `services.html` | Each method in detail, the method chooser table, blank apparel, promotional products |
| Work | `work.html` | Gallery of finished jobs with Embroidery / Printing filters and a full-screen viewer |
| Pricing | `pricing.html` | What determines price, order sizes, customer-supplied garments |
| Quote | `quote.html` | The quote request form and what happens next |
| Artwork | `artwork.html` | File formats, vector vs raster, AI-image warning, review and approval |
| About | `about.html` | The story, the logo, how the shop works |
| Guarantee | `guarantee.html` | Production guarantee, what isn't covered, customer-supplied apparel, quantity accuracy |

Sections inside a page have ids, so a link can jump straight to one: `services.html#embroidery`, `guarantee.html#supplied`.

---

## Project structure

```
spotty-and-the-owl/
├── index.html, services.html, work.html, pricing.html,
│   quote.html, artwork.html, about.html, guarantee.html
│                       Structure and words: one file per page
├── css/
│   └── style.css       Looks: all the styling, in numbered sections (contents at the top)
├── js/
│   ├── config.js       Settings the scripts need: phone number, quote form address
│   └── main.js         Behaviour: phone menu, tabs, gallery filters and viewer, quote form
└── assets/
    ├── fonts/          Self-hosted fonts (Archivo, Newsreader) and their open-source licences
    ├── img/            Photos, each in an 800px and a 1600px WebP
    ├── logo/           The traced logo (full illustration and wordmark) as SVG
    └── video/          The 5-second embroidery loop and its poster frame
```

**The rule of thumb:** words and pictures live in the HTML files, looks live in `css/style.css`, and behaviour lives in `js/main.js`. The script never writes page content; it only adds the interactive parts to whatever page it finds them on.

**Shared parts.** The top bar, footer, phone dock and menu appear in every page file. If you change one of them (a new menu item, a new phone number in the footer), make the same change in all eight files. A search-and-replace across the folder does it in one go.

**The logo** is drawn with CSS: the SVG files in `assets/logo/` are used as a stencil and filled with the text colour, so it's black in light mode and white in dark mode from one file (see `.logo` in `style.css`).

---

## Common changes

**Contact details.** The phone number appears in the footer of every page, on the quote page, in the closing green band, and in `js/config.js` (used in the form's error message). Replace it everywhere with one search-and-replace. To add an email address, add a line under the phone number in each footer.

**Connecting the quote form.** The form works but has nowhere to send yet, so it shows a "Preview only" note after submitting. Sign up for a form service that accepts file uploads (Formspree, Web3Forms or Netlify Forms), then paste its address into `quoteFormEndpoint` in `js/config.js`. The note disappears and requests go to Dan's inbox.

**Adding a finished job.** Make two WebP copies of the photo, 800px and 1600px wide, named like `assets/img/my-job-800.webp` and `assets/img/my-job-1600.webp`. In `work.html`, copy one `<li data-kind="...">` block in the gallery and change the picture names, the alt text and the caption. `data-kind` is `embroidery` or `print` and drives the filter buttons. The viewer finds the 1600px copy by itself.

**Swapping a photo.** Replace the two WebP files, keeping the same names, and update the alt text where the picture is used if it changed.

---

## Colours and type

Colours are set once as tokens at the top of `css/style.css` (`--bone`, `--ink`, `--spruce`, `--gold` and friends), with a second set for dark mode. Every rule uses the tokens, so changing a colour in one place changes it everywhere.

Headlines use Archivo at a narrow width, like team lettering; body text uses Archivo at normal width; the spoken lines ("Don't just say it. Wear it.") use Newsreader italic.

---

## Unused photos

`dtf-printers`, `patch-landscape` and `thread-cones` are in `assets/img/` but not used on any page yet. They're kept in case they're wanted later.
