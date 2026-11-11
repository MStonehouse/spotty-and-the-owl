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
│   ├── main.js         Behaviour: phone menu, tabs, gallery filters and viewer, quote form
│   └── estimator.js    The Pricing page price estimator, with its price tables
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

## Share card

When someone shares a link to the site (Facebook, iMessage, Slack, LinkedIn...), the preview shows `assets/share-card.jpg`, a 1200 x 630 image, with the page's title and description. The tags that ask for it are near the top of every page, under the `<meta name="description">` line.

**The addresses must be absolute.** Link previews are made by the sharing app's own server, which fetches the image by its full address, so the tags say `https://mstonehouse.github.io/spotty-and-the-owl/...`. When the site moves to Dan's own domain, replace that address in all eight pages with the new one in a single search-and-replace.

**Keep the words big.** Apps show the card at about 300 to 500 pixels wide, so everything on it shrinks to a third or less. Keep every line of text at 42px or larger in the source, and keep it to a few words.

**Changing the card.** Its source is `scripts/share-card.html`. Serve the folder (`python -m http.server 8000`), open `http://localhost:8000/scripts/share-card.html` in a 1200 x 630 window, take a screenshot and save it over `assets/share-card.jpg`. Then raise the number in `share-card.jpg?v=1` on every page (to `v=2`, and so on): apps keep their old copy of a preview picture, and a new address makes them fetch the new one.

**Checking a preview.** Facebook's Sharing Debugger (developers.facebook.com/tools/debug) shows exactly what Facebook sees for a link and has a button to make it fetch again.

---

## Icons

The browser-tab and home-screen icons are Dan's owl, cut from his logo. `favicon.ico` (16, 32 and 48px) and `assets/icons/favicon.svg` use a bolder face-only version, because the full drawing turns to mush at 16px; `apple-touch-icon.png` (iPhone home screen) and the `icon-*.png` files listed in `site.webmanifest` (Android) use the full head and chest as drawn. The maskable icon has extra space around the owl because Android may crop it to a circle.

---

## Price estimator

The Pricing page has a ballpark price estimator (`js/estimator.js`, styles in section 9b of `css/style.css`). Visitors pick a garment, quantity, method, ink colours or design size, and one spot or front and back, and see a price range per item, the order total, any setup fee, and what the next quantity break would cost. "Get your exact quote" opens the quote form with those choices already ticked.

**The prices are sample numbers.** They sit in four tables at the top of `js/estimator.js` (`GARMENT`, `METHOD`, `SETUP`, `BREAKS`), plus `NOT_FOR` for methods that don't suit a garment. Replace the numbers there; the `price()` function that combines them doesn't need to change. Anything in that file can be read by visitors in their browser.

The Pricing page as it was before the estimator is saved on the `pricing-before-estimator` branch.

---

## Moving to spottyandtheowlapparel.com

Everything for the move is ready on the `domain-switch` branch: every page address and share-card address changed to `https://spottyandtheowlapparel.com/`, plus a `CNAME` file that tells GitHub Pages to answer for Dan's domain. **Don't merge it early.** Once `CNAME` is on `main`, the GitHub address redirects to Dan's domain, which shows the old WordPress site until the DNS change below takes effect. Merge it on switch day.

Switch day, in this order:

1. **Before anything else:** Dan approves the site, the quote form is connected, his email address is on the site, and **the price estimator has his real prices** (it currently runs on sample numbers; see "Price estimator").
2. **Verify the domain with GitHub** (your GitHub Settings, then Pages, then "Add a domain"). GitHub gives a TXT record to add at the domain's DNS. GitHub recommends this before pointing the domain, so nobody else can claim it.
3. **Merge `domain-switch` into `main`.**
4. **Change the DNS** where spottyandtheowlapparel.com is registered:
   - Replace the domain's `A` records with GitHub's four: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Optional, for IPv6: `AAAA` records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
   - Point `www` with a `CNAME` record to `mstonehouse.github.io` (no repository name).
   - **Leave the `MX` and email `TXT` records alone** if Dan's email uses this domain, or his email stops working.
   - Don't add wildcard (`*`) records.
5. **In the repo:** Settings, then Pages. The custom domain should show spottyandtheowlapparel.com. Tick "Enforce HTTPS" when it appears (it can take up to 24 hours).
6. **Refresh link previews:** paste the address into Facebook's Sharing Debugger and click "Scrape Again".
7. **Only then** cancel the old WordPress hosting. Keep the domain registration itself. The `.ca` domain can be forwarded to the `.com` at its registrar.

DNS changes can take from minutes to a day to reach everyone.

---

## Colours and type

Colours are set once as tokens at the top of `css/style.css` (`--bone`, `--ink`, `--spruce`, `--gold` and friends), with a second set for dark mode. Every rule uses the tokens, so changing a colour in one place changes it everywhere.

Headlines use Archivo at a narrow width, like team lettering; body text uses Archivo at normal width; the spoken lines ("Don't just say it. Wear it.") use Newsreader italic.

---

## Unused photos

`dtf-printers`, `patch-landscape` and `thread-cones` are in `assets/img/` but not used on any page yet. They're kept in case they're wanted later.
