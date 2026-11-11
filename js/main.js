/* ==========================================================================
   main.js — builds each page from content.js and makes the site interactive.

   How pages work: the whole site is one HTML page. The part of the address
   after "#" (for example #services) decides which page is drawn into <main>.
   A second part (#services-embroidery) scrolls to that spot on the page.
   ========================================================================== */

/* ---------- Small helpers ---------- */

/* Escape text before putting it into HTML, so a stray "<" can't break the page. */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* A responsive photo. The browser picks the 800px or 1600px file to suit the screen. */
function pic(name, alt, { sizes = "100vw", eager = false, cls = "" } = {}) {
  const small = `assets/img/${name}-800.webp`;
  const set = name === "vector-raster" ? `${small} 800w` : `${small} 800w, assets/img/${name}-1600.webp 1600w`;
  return `<img class="${cls}" src="${small}" srcset="${set}" sizes="${sizes}" alt="${esc(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async">`;
}

/* A list whose bullets are little Dalmatian spots. */
const spots = (items) => `<ul class="spots">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

/* The phone number, as a tappable link. */
const phoneLink = (cls = "") => `<a class="${cls}" href="${BUSINESS.phoneHref}">${BUSINESS.phone}</a>`;

/* ---------- The embroidery hoop around the hero video ---------- */

const HOOP = `
<div class="hoop">
  <video class="hoop-video" autoplay muted loop playsinline preload="metadata"
         poster="assets/video/stitching-poster.webp" aria-label="Our Tajima embroidery machine stitching a logo onto a grey cap">
    <source src="assets/video/stitching.mp4" type="video/mp4">
  </video>
  <svg class="hoop-frame" viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <mask id="sew"><circle class="sew-mask" cx="200" cy="200" r="193" pathLength="1" fill="none" stroke="#fff" stroke-width="10" transform="rotate(-90 200 200)"/></mask>
    </defs>
    <circle class="hoop-ring" cx="200" cy="200" r="168"/>
    <circle class="hoop-ring" cx="200" cy="200" r="180"/>
    <g class="hoop-clasp">
      <rect x="184" y="8" width="32" height="20" rx="3"/>
      <rect x="176" y="2" width="48" height="8" rx="4"/>
    </g>
    <circle class="hoop-stitch" cx="200" cy="200" r="193" mask="url(#sew)"/>
  </svg>
</div>`;

/* ---------- Pages ---------- */

const PAGES = {};

PAGES.home = () => `
<section class="hero wrap">
  <div class="hero-text">
    <h1 class="display">Make something worth wearing.</h1>
    <p class="lede">Custom screen printing, embroidery, vinyl, DTF and DTG printing for businesses, trades, schools, sports teams and events.</p>
    <div class="actions">
      <a class="btn" href="#quote">Request a quote</a>
      <a class="btn btn-quiet" href="#work">See our work</a>
    </div>
    <p class="hero-place">Family-run in ${BUSINESS.town}, on ${BUSINESS.region}, since ${BUSINESS.since}.</p>
  </div>
  ${HOOP}
</section>

<section class="wrap block" aria-labelledby="methods-h">
  <div class="head">
    <h2 id="methods-h">Five ways to put your name on it</h2>
    <p>Each method suits different garments, artwork and order sizes. Tell us about your project and we'll recommend the right one.</p>
  </div>
  <ul class="methods">
    ${METHODS.map((m) => `
    <li>
      <a class="method" href="#services-${m.slug}">
        <span class="method-img">${pic(m.img, "", { sizes: "(min-width: 760px) 20vw, 30vw" })}</span>
        <span class="method-text"><strong>${esc(m.name)}</strong><span>${esc(m.short)}</span></span>
      </a>
    </li>`).join("")}
  </ul>
</section>

<section class="band" aria-labelledby="who-h">
  <div class="wrap block">
    <div class="head">
      <h2 id="who-h">Apparel for every team, business and occasion</h2>
    </div>
    <div class="who" data-tabs>
      <div class="who-tabs" role="tablist" aria-label="Who we work with">
        ${AUDIENCES.map((a, i) => `<button role="tab" id="tab-${a.id}" aria-controls="panel-${a.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(a.name)}</button>`).join("")}
      </div>
      ${AUDIENCES.map((a, i) => `
      <div class="who-panel" role="tabpanel" id="panel-${a.id}" aria-labelledby="tab-${a.id}" ${i === 0 ? "" : "hidden"}>
        <div class="who-img">${pic(a.img, a.alt, { sizes: "(min-width: 760px) 45vw, 100vw" })}</div>
        <p>${esc(a.text)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="block" aria-labelledby="recent-h">
  <div class="wrap head head-row">
    <h2 id="recent-h">Recent work</h2>
    <a class="link" href="#work">All work</a>
  </div>
  <div class="strip" tabindex="0" aria-label="Recent work, scroll sideways">
    ${WORK.slice(0, 8).map((w) => `
    <figure class="strip-item">
      ${pic(w.img, WORK_ALT[w.img], { sizes: "(min-width: 760px) 26vw, 72vw" })}
      <figcaption><strong>${esc(w.title)}</strong>${esc(w.detail)}</figcaption>
    </figure>`).join("")}
  </div>
</section>

<section class="wrap block" aria-labelledby="why-h">
  <div class="split">
    <div>
      <h2 id="why-h">Why choose Spotty and the Owl</h2>
      <blockquote class="say">Don't just say it. Wear it.</blockquote>
      <div class="why-img">${pic("logo-hoodie", "A smiling woman in a sage green Spotty and the Owl hoodie", { sizes: "(min-width: 760px) 35vw, 100vw" })}</div>
    </div>
    <dl class="reasons">
      ${REASONS.map((r) => `<div><dt>${esc(r.t)}</dt><dd>${esc(r.d)}</dd></div>`).join("")}
    </dl>
  </div>
</section>

${CTA()}
`;

PAGES.services = () => `
<section class="wrap page-head">
  <h1 class="display">The right apparel. The right decoration.</h1>
  <p class="lede">We source blank apparel and decorate it with the method that suits your artwork, your garment and your budget. A small batch or a whole company, we'll help you choose.</p>
</section>

<nav class="wrap jump" aria-label="Jump to a method">
  ${METHODS.map((m) => `<a href="#services-${m.slug}">${esc(m.name)}</a>`).join("")}
  <a href="#services-blanks">Blank apparel</a>
</nav>

${METHODS.map((m, i) => `
<section class="wrap service ${i % 2 ? "service-flip" : ""}" id="${m.slug}" aria-labelledby="${m.slug}-h">
  <div class="service-img">
    ${pic(m.img, m.alt, { sizes: "(min-width: 760px) 50vw, 100vw" })}
  </div>
  <div class="service-text">
    <h2 id="${m.slug}-h">${esc(m.name)}</h2>
    <p>${esc(m.intro)}</p>
    <h3>Best suited for</h3>
    ${spots(m.best)}
    <p class="note">${esc(m.note)}</p>
  </div>
</section>`).join("")}

<section class="wrap block" aria-labelledby="choose-h">
  <div class="head">
    <h2 id="choose-h">Not sure which method is right?</h2>
    <p>Here's where each one shines. Send us your artwork, garment preference and an estimated quantity, and we'll recommend an option for your project.</p>
  </div>
  <table class="table">
    <thead><tr><th scope="col">Method</th><th scope="col">Common applications</th></tr></thead>
    <tbody>
      <tr><th scope="row">Screen printing</th><td>Larger runs and bold graphics</td></tr>
      <tr><th scope="row">Embroidery</th><td>Polos, hats and professional workwear</td></tr>
      <tr><th scope="row">Vinyl</th><td>Names, numbers and lettering</td></tr>
      <tr><th scope="row">DTF</th><td>Detailed, full-colour designs</td></tr>
      <tr><th scope="row">DTG</th><td>Detailed artwork on compatible garments</td></tr>
    </tbody>
  </table>
</section>

<section class="band" id="blanks" aria-labelledby="blanks-h">
  <div class="wrap block split">
    <div>
      <h2 id="blanks-h">Blank apparel</h2>
      <p>We source quality blanks for your project, decorated or not. Brands, colours, styles and sizes depend on supplier inventory, and we'll help you find the right fit.</p>
      ${spots(BLANKS)}
    </div>
    <div class="band-img">${pic("heat-press-tee", "A printer laying a white t-shirt onto a heat press, with stacks of blank tees behind", { sizes: "(min-width: 760px) 45vw, 100vw" })}</div>
  </div>
</section>

<section class="wrap block promo" aria-labelledby="promo-h">
  <div class="promo-img">${pic("mug-press", "A gloved hand pressing a transfer onto a white mug", { sizes: "(min-width: 760px) 40vw, 100vw" })}</div>
  <div>
    <h2 id="promo-h">Promotional products</h2>
    <p>Mugs, pens, bags, gloves and thousands more branded items for trade shows, giveaways and staff gifts. Browse the full catalogue and request pricing online.</p>
    <a class="btn btn-quiet" href="${BUSINESS.promoStore}" target="_blank" rel="noopener">Browse promotional products<span class="sr"> (opens in a new tab)</span></a>
  </div>
</section>

${CTA()}
`;

PAGES.work = () => `
<section class="wrap page-head">
  <h1 class="display">Recent work</h1>
  <p class="lede">Team tees, embroidered caps, company workwear and our own house apparel, made in Comox.</p>
</section>
<div class="wrap">
  <div class="filters" role="group" aria-label="Filter work">
    <button type="button" data-filter="all" aria-pressed="true">All</button>
    <button type="button" data-filter="embroidery" aria-pressed="false">Embroidery</button>
    <button type="button" data-filter="print" aria-pressed="false">Printing</button>
  </div>
  <ul class="gallery">
    ${WORK.map((w, i) => `
    <li data-kind="${w.kind}">
      <button class="tile" type="button" data-view="${i}">
        ${pic(w.img, WORK_ALT[w.img], { sizes: "(min-width: 1100px) 30vw, (min-width: 760px) 45vw, 100vw" })}
        <span class="tile-cap"><strong>${esc(w.title)}</strong>${esc(w.detail)}</span>
      </button>
    </li>`).join("")}
  </ul>
</div>
${CTA("Like what you see?", "Tell us what you have in mind, and we'll put together a quote.")}
`;

PAGES.pricing = () => `
<section class="wrap page-head">
  <h1 class="display">Every project is different. Every quote is tailored.</h1>
  <p class="lede">Custom apparel pricing depends on the garment, the quantity, the decoration and the design. We give you a project-specific quote, so you know what to expect before production begins.</p>
</section>

<section class="wrap block" aria-labelledby="factors-h">
  <div class="head"><h2 id="factors-h">What determines your price</h2></div>
  <table class="table">
    <thead><tr><th scope="col">Factor</th><th scope="col">What affects the cost</th></tr></thead>
    <tbody>${PRICING.map(([f, d]) => `<tr><th scope="row">${f}</th><td>${d}</td></tr>`).join("")}</tbody>
  </table>
</section>

<section class="wrap block split" aria-labelledby="qty-h">
  <div>
    <h2 id="qty-h">Order sizes</h2>
    <p>We work with orders of different sizes, depending on the decoration method and production requirements.</p>
  </div>
  ${spots(QUANTITY_NOTES)}
</section>

<section class="band" aria-labelledby="own-h">
  <div class="wrap block split">
    <div>
      <h2 id="own-h">Bringing your own garments?</h2>
      <p>We may decorate customer-supplied garments, subject to approval and inspection first. A handling surcharge may apply, and the decoration rate can be higher than on garments we source, because different fabrics react differently to heat, ink and stitching.</p>
      <p>Any surcharge is shown in your quote before you approve the order.</p>
      <a class="link" href="#policies-supplied">Read the full policy</a>
    </div>
    <div class="band-img">${pic("heat-press-shop", "Our clamshell heat press in the shop, with folded black apparel beside it", { sizes: "(min-width: 760px) 40vw, 100vw" })}</div>
  </div>
</section>

${CTA("Ready for a number?", "Send us the details and we'll prepare a quotation for your project.")}
`;

PAGES.quote = () => `
<section class="wrap page-head">
  <h1 class="display">Request your custom quote</h1>
  <p class="lede">The more you can tell us, the more accurate your quote. Not sure about something? Leave it blank and we'll help you work it out.</p>
</section>

<div class="wrap quote-layout">
  <form class="form" id="quote-form" novalidate>
    <fieldset>
      <legend>Your details</legend>
      <div class="grid2">
        <label class="field"><span class="field-name">Name</span><input name="name" autocomplete="name" required></label>
        <label class="field"><span class="field-name">Business, school or team <span class="opt">optional</span></span><input name="organization" autocomplete="organization"></label>
        <label class="field"><span class="field-name">Email</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="field"><span class="field-name">Phone</span><input name="phone" type="tel" autocomplete="tel" required></label>
      </div>
    </fieldset>

    <fieldset>
      <legend>What would you like decorated?</legend>
      <div class="checks">
        ${["T-shirts", "Long sleeves", "Polos", "Hoodies and sweatshirts", "Jackets and outerwear", "Hats and toques", "Workwear", "Bags and accessories", "Something else"]
          .map((a) => `<label class="check"><input type="checkbox" name="apparel" value="${a}"><span>${a}</span></label>`).join("")}
      </div>
      <label class="field"><span class="field-name">Preferred brand or style <span class="opt">optional</span></span><input name="brand" placeholder="For example: heavyweight cotton, Gildan, Flexfit"></label>
    </fieldset>

    <fieldset>
      <legend>Decoration</legend>
      <div class="checks">
        ${[...METHODS.map((m) => m.name), "Not sure, recommend one"]
          .map((m, i) => `<label class="check"><input type="radio" name="method" value="${m}" ${i === METHODS.length ? "checked" : ""}><span>${m}</span></label>`).join("")}
      </div>
      <p class="field-label">Placement</p>
      <div class="checks">
        ${["Front", "Back", "Left chest", "Sleeve", "Hat front", "More than one spot"]
          .map((p) => `<label class="check"><input type="checkbox" name="placement" value="${p}"><span>${p}</span></label>`).join("")}
      </div>
    </fieldset>

    <fieldset>
      <legend>Quantity and timing</legend>
      <div class="grid2">
        <label class="field"><span class="field-name">Estimated quantity</span><input name="quantity" type="number" min="1" inputmode="numeric" required></label>
        <label class="field"><span class="field-name">Needed by <span class="opt">optional</span></span><input name="date" type="date"></label>
      </div>
      <label class="field"><span class="field-name">Sizes and colours <span class="opt">optional</span></span><input name="sizes" placeholder="For example: 10 M, 12 L, 6 XL, all in navy"></label>
      <p class="field-label">Are you supplying the garments?</p>
      <div class="checks">
        <label class="check"><input type="radio" name="supplied" value="No, please source them" checked><span>No, please source them</span></label>
        <label class="check"><input type="radio" name="supplied" value="Yes, I'll bring my own"><span>Yes, I'll bring my own</span></label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Artwork and details</legend>
      <label class="drop" id="drop">
        <input type="file" name="artwork" id="artwork" multiple accept=".ai,.eps,.svg,.pdf,.png,.psd,.tif,.tiff,.jpg,.jpeg">
        <span class="drop-main">Add your logo or artwork</span>
        <span class="drop-sub">Vector files (AI, EPS, SVG or PDF) give the best results. <a href="#artwork">Artwork guidelines</a></span>
        <span class="drop-files" id="drop-files" aria-live="polite"></span>
      </label>
      <label class="field"><span class="field-name">Tell us about your project</span><textarea name="details" rows="5" placeholder="What it's for, colours you have in mind, anything we should know"></textarea></label>
    </fieldset>

    <p class="form-error" id="form-error" role="alert" hidden></p>
    <button class="btn btn-wide" type="submit">Send quote request</button>
  </form>

  <aside class="aside">
    <h2>What happens next</h2>
    <ol class="steps">
      ${STEPS.map(([t, d]) => `<li><strong>${t}</strong><span>${d}</span></li>`).join("")}
    </ol>
    <div class="aside-call">
      <p>Prefer to talk it through?</p>
      ${phoneLink("big-phone")}
    </div>
  </aside>
</div>
`;

PAGES.artwork = () => `
<section class="wrap page-head">
  <h1 class="display">Great apparel starts with great artwork</h1>
  <p class="lede">Clean files give clean lines, accurate detail and consistent results. Here's what to send us, and why it matters.</p>
</section>

<section class="wrap block" aria-labelledby="formats-h">
  <div class="head"><h2 id="formats-h">File formats</h2></div>
  <div class="formats">
    <div class="format-group format-best">
      <h3>Recommended: vector files</h3>
      <dl class="format-list">
        <div><dt>AI</dt><dd>Adobe Illustrator</dd></div>
        <div><dt>EPS</dt><dd>Encapsulated PostScript</dd></div>
        <div><dt>SVG</dt><dd>Scalable Vector Graphics</dd></div>
      </dl>
    </div>
    <div class="format-group">
      <h3>Also accepted, after review</h3>
      <dl class="format-list">
        <div><dt>PDF</dt><dd>Preferably vector-based</dd></div>
        <div><dt>PNG</dt><dd>High resolution, transparent background where needed</dd></div>
        <div><dt>PSD</dt><dd>Layered Photoshop files</dd></div>
        <div><dt>TIFF</dt><dd>High-resolution raster artwork</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="band" aria-labelledby="vector-h">
  <div class="wrap block split">
    <div>
      <h2 id="vector-h">Why vector artwork?</h2>
      <p>Vector graphics are built from shapes rather than pixels, so they can be scaled to a cap front or a full jacket back without losing sharpness. Pixel images blur and break up as they get bigger.</p>
      <h3>When you prepare your file</h3>
      ${spots(["Convert fonts to outlines or curves", "Include every element of the design", "Embed or supply any linked images", "Note Pantone colours if colours must match", "Send a separate file for each design variation"])}
    </div>
    <div class="band-img contain">${pic("vector-raster", "A diagram comparing crisp vector circles with pixelated raster circles, listing AI, EPS, PDF and SVG as vector formats and JPEG, PNG and GIF as raster", { sizes: "(min-width: 760px) 40vw, 100vw" })}</div>
  </div>
</section>

<section class="wrap block split" aria-labelledby="ai-h">
  <div>
    <h2 id="ai-h">Not every image is production-ready</h2>
    <p>Images taken from websites, screenshots, social media, messaging apps and AI tools often don't have the resolution or construction needed for professional decoration.</p>
  </div>
  ${spots([
    "Small or pixelated JPEG files may print blurry.",
    "AI-generated artwork can contain distorted lettering, irregular lines or stray background elements.",
    "Upscaling a poor image doesn't restore missing detail.",
    "Some methods need a transparent background.",
    "AI-generated logos aren't automatically suitable for embroidery or screen printing.",
  ])}
</section>

<section class="wrap block split" aria-labelledby="approve-h">
  <div>
    <h2 id="approve-h">Review and approval</h2>
    <p>We review all artwork before production. If a file isn't suitable, we'll ask for a replacement, recommend professional preparation, or quote to rebuild it for you. Production only begins once your artwork is approved.</p>
    <p>Before you approve, please check the spelling and wording, logo accuracy, colours, proportions, placement and garment details. Changes after approval may add cost and time.</p>
  </div>
  <div class="card-cta">
    <p>Not sure if your file will work?</p>
    <a class="btn" href="#quote" data-prefill="Artwork review: please check my file before I order.">Request an artwork review</a>
  </div>
</section>
`;

PAGES.about = () => `
<section class="wrap page-head">
  <h1 class="display">More than apparel. A way to represent your brand.</h1>
</section>

<section class="wrap block split about-intro">
  <div class="about-logo" role="img" aria-label="The Spotty and the Owl logo: a Dalmatian in a top hat looking up at an owl on a branch">
    <span data-svg="full"></span>
  </div>
  <div class="prose">
    <p class="lede">At Spotty and the Owl Apparel, custom garment decoration is more than a job. It's what we love doing.</p>
    <p>We started the business in ${BUSINESS.since}, built on years of hands-on experience and a real love for well-made branded gear, to close a gap we kept seeing in custom apparel: a lack of professionalism, clear communication and reliable craftsmanship.</p>
    <p>Apparel is never just something you wear. It's how you represent your business, build team spirit, promote an event and create a sense of pride and belonging. Our job is to help you wear what you really want.</p>
    <blockquote class="say">Don't just say it. Wear it.</blockquote>
  </div>
</section>

<section class="band" aria-labelledby="start-h">
  <div class="wrap block split">
    <div>
      <h2 id="start-h">Straightforward from start to finish</h2>
      <p>From choosing the right blank garment and preparing your artwork to picking the best decoration for your budget and timeline, we guide you through every step, so you get a finished product you're proud to wear.</p>
      <p>Every project gets proper attention: clear expectations, honest recommendations and quality workmanship, from the first quote to the final count.</p>
    </div>
    <div class="band-img">${pic("tajima-four-head", "A four-head Tajima embroidery machine stitching light blue shirts", { sizes: "(min-width: 760px) 45vw, 100vw" })}</div>
  </div>
</section>

<section class="wrap block" aria-labelledby="for-h">
  <div class="head"><h2 id="for-h">Who we work with</h2></div>
  <dl class="reasons reasons-3">
    <div><dt>Businesses and trades</dt><dd>Crisp, durable workwear and uniforms.</dd></div>
    <div><dt>Schools and sports teams</dt><dd>Apparel that builds unity and pride.</dd></div>
    <div><dt>Organizations and events</dt><dd>Memorable, wearable merchandise.</dd></div>
  </dl>
</section>

${CTA("Let's make something worth wearing.", "Tell us about your project and we'll take it from there.")}
`;

PAGES.policies = () => `
<section class="wrap page-head">
  <h1 class="display">Our guarantee and policies</h1>
  <p class="lede">We stand behind our workmanship. Here's exactly what that means, so there are no surprises.</p>
</section>

<nav class="wrap jump" aria-label="Jump to a policy">
  <a href="#policies-guarantee">Production guarantee</a>
  <a href="#policies-not-covered">What isn't covered</a>
  <a href="#policies-supplied">Customer-supplied apparel</a>
  <a href="#policies-quantity">Quantity accuracy</a>
</nav>

<article class="wrap policy prose">
  <section id="guarantee" aria-labelledby="g-h">
    <h2 id="g-h">Our production guarantee</h2>
    <p>Our goal is finished apparel that matches the approved artwork, garment selection, decoration method and order details. Before an order is complete, we check it for noticeable production defects and count it against the approved quantity.</p>
    <p>If an item has a confirmed manufacturing or decoration defect caused by our production process, contact us within <strong>7 calendar days</strong> of receiving your order. We'll review the issue and, where the claim is justified, arrange a fair remedy, which may include:</p>
    ${spots(["Repair, where practical", "Replacement of the affected item", "Reprinting or re-embroidery", "A refund or credit for the affected part of the order"])}
    <p class="note">Any remedy depends on the nature of the issue and applicable consumer protection laws.</p>
  </section>

  <section id="not-covered" aria-labelledby="n-h">
    <h2 id="n-h">What isn't covered</h2>
    ${spots([
      "Normal wear and tear",
      "Damage from improper washing or drying",
      "Damage from misuse or accidents",
      "Pre-existing defects in customer-supplied garments",
      "Shrinkage or fabric behaviour outside our control",
      "Differences between on-screen colours and physical garment or ink colours",
      "Minor variations that are part of printing, embroidery or garment processes",
      "Artwork errors that were approved by the customer",
      "Changes requested after production approval",
    ])}
  </section>

  <section id="supplied" aria-labelledby="s-h">
    <h2 id="s-h">Customer-supplied apparel</h2>
    <p>We may decorate garments you supply, subject to approval and inspection first.</p>
    <ol class="plain-ol">
      <li>Garments must be clean, unused, in good condition and suited to the decoration method.</li>
      <li>We may decline garments that are damaged, unsuitable, difficult to process or likely to give a poor result.</li>
      <li>A handling and processing surcharge may apply.</li>
      <li>The decoration rate may be higher than on garments we source.</li>
      <li>All garments are counted and inspected before production.</li>
      <li>Please supply a few extra garments where possible, in case of production issues.</li>
    </ol>
    <h3>Why is there an extra charge?</h3>
    <p>Your own garments bring extra handling, inspection, setup and production risk. The surcharge covers that, and it's shown in your quote before you approve the order.</p>
    <h3>What we can guarantee</h3>
    <p>We can't guarantee the performance, durability or suitability of the original garment, only our own workmanship in the decoration we perform. Fabrics, finishes, seams and coatings all react differently to heat, pressure, ink and stitching. Please talk to us before buying garments for decoration.</p>
  </section>

  <section id="quantity" aria-labelledby="q-h">
    <h2 id="q-h">Your order, your agreed quantity</h2>
    <p>Quantity matters, especially for uniforms, schools and teams.</p>
    ${spots([
      "Every approved order states the garment quantity.",
      "Quantities are checked before production.",
      "Finished orders are counted before pickup or delivery.",
      "We tell you about any production issue that affects the agreed quantity.",
      "We never knowingly substitute garments, sizes or colours without your approval.",
      "Any shortfall or excess is resolved according to your approved quote.",
    ])}
  </section>
</article>

${CTA()}
`;

/* The closing call to action used at the bottom of most pages. */
function CTA(title = "Let's make something worth wearing.", text = "From a simple logo on a work shirt to apparel for a whole organization.") {
  return `
<section class="cta">
  <div class="wrap cta-in">
    <h2>${esc(title)}</h2>
    <p>${esc(text)}</p>
    <div class="actions">
      <a class="btn btn-light" href="#quote">Request a quote</a>
      ${phoneLink("cta-phone")}
    </div>
    <span class="cta-logo" data-svg="full" aria-hidden="true"></span>
  </div>
</section>`;
}

/* ---------- Footer ---------- */

function footer() {
  return `
<div class="wrap footer-in">
  <div class="footer-brand">
    <span class="footer-logo" data-svg="wordmark"></span>
    <p class="say">Wear your identity.</p>
  </div>
  <div class="footer-cols">
    <div>
      <h2>Visit or call</h2>
      <p>${BUSINESS.town}<br>${BUSINESS.region}</p>
      <p>${phoneLink()}</p>
      ${BUSINESS.email ? `<p><a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></p>` : ""}
    </div>
    <div>
      <h2>Explore</h2>
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#artwork">Artwork guidelines</a></li>
        <li><a href="#policies">Our guarantee</a></li>
      </ul>
    </div>
    <div>
      <h2>Follow</h2>
      <ul>
        <li><a href="${BUSINESS.instagram}" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="${BUSINESS.facebook}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="${BUSINESS.promoStore}" target="_blank" rel="noopener">Promotional products</a></li>
      </ul>
    </div>
  </div>
  <p class="footer-small">&copy; ${new Date().getFullYear()} ${BUSINESS.name}. Est. ${BUSINESS.since}.</p>
</div>`;
}

/* ---------- Router ---------- */

const main = document.getElementById("main");
let current = "";

function render() {
  // "#services-embroidery" means: the services page, scrolled to the embroidery section.
  // Page names never contain a hyphen, so everything after the first hyphen is the spot.
  const hash = location.hash.replace(/^#/, "");
  const cut = hash.indexOf("-");
  const page = (cut < 0 ? hash : hash.slice(0, cut)) || "home";
  const spot = cut < 0 ? "" : hash.slice(cut + 1);
  const name = PAGES[page] ? page : "home";

  if (name !== current) {
    main.innerHTML = PAGES[name]();
    current = name;
    document.body.dataset.page = name;   // lets CSS adjust things per page
    document.title = name === "home" ? BUSINESS.name : `${titleFor(name)} | ${BUSINESS.name}`;
    fillLogos(main);
    setUpPage(name);
  }

  // Mark the current page in both menus.
  document.querySelectorAll(".topnav a, .sheet-panel a").forEach((a) => {
    a.toggleAttribute("aria-current", a.getAttribute("href") === `#${name}`);
    if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
  });

  closeSheet();
  const target = spot && document.getElementById(spot);
  if (target) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  else window.scrollTo(0, 0);
}

function titleFor(name) {
  return { services: "Services", work: "Work", pricing: "Pricing", quote: "Request a quote", artwork: "Artwork guidelines", about: "About", policies: "Guarantee and policies" }[name];
}

/* Put the inline logo drawings into any element marked data-svg. */
function fillLogos(root) {
  root.querySelectorAll("[data-svg]").forEach((el) => { el.innerHTML = LOGOS[el.dataset.svg]; });
}

/* ---------- Per-page behaviour ---------- */

function setUpPage(name) {
  // Pause the hero video for people who prefer less motion.
  const video = main.querySelector(".hoop-video");
  if (video && matchMedia("(prefers-reduced-motion: reduce)").matches) { video.removeAttribute("autoplay"); video.pause(); }

  main.querySelectorAll("[data-tabs]").forEach(setUpTabs);
  if (name === "work") setUpGallery();
  if (name === "quote") setUpForm();
}

/* Tabs on the home page: tap a group to see the matching photo. Arrow keys move between tabs. */
function setUpTabs(box) {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      select(next); next.focus();
    });
  });
}

/* Work page: filter buttons and the full-screen viewer. */
function setUpGallery() {
  const buttons = main.querySelectorAll("[data-filter]");
  buttons.forEach((b) => b.addEventListener("click", () => {
    buttons.forEach((x) => x.setAttribute("aria-pressed", x === b));
    main.querySelectorAll(".gallery li").forEach((li) => {
      li.hidden = b.dataset.filter !== "all" && li.dataset.kind !== b.dataset.filter;
    });
  }));

  const viewer = document.getElementById("viewer");
  main.querySelectorAll("[data-view]").forEach((tile) => tile.addEventListener("click", () => {
    const w = WORK[tile.dataset.view];
    const img = document.getElementById("viewer-img");
    img.src = `assets/img/${w.img}-1600.webp`;
    img.alt = WORK_ALT[w.img];
    document.getElementById("viewer-cap").textContent = `${w.title}. ${w.detail}`;
    viewer.showModal();
  }));
}

document.getElementById("viewer-close").addEventListener("click", () => document.getElementById("viewer").close());
document.getElementById("viewer").addEventListener("click", (e) => { if (e.target.id === "viewer") e.target.close(); });

/* Quote form: show chosen files, check required fields, then send. */
let prefillText = "";
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-prefill]");
  if (a) prefillText = a.dataset.prefill;
});

function setUpForm() {
  const form = document.getElementById("quote-form");
  const fileInput = document.getElementById("artwork");
  const fileList = document.getElementById("drop-files");
  const error = document.getElementById("form-error");

  if (prefillText) { form.elements.details.value = prefillText; prefillText = ""; }

  fileInput.addEventListener("change", () => {
    const names = [...fileInput.files].map((f) => f.name);
    fileList.textContent = names.length ? `Added: ${names.join(", ")}` : "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const missing = [...form.querySelectorAll("[required]")].filter((f) => !f.value.trim() || !f.checkValidity());
    form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
    if (missing.length) {
      missing.forEach((f) => f.setAttribute("aria-invalid", "true"));
      const labels = missing.map((f) => f.closest("label").querySelector(".field-name").firstChild.textContent.trim().toLowerCase());
      error.textContent = `Please add your ${listify(labels)} so we can reply with a quote.`;
      error.hidden = false;
      missing[0].focus();
      return;
    }
    error.hidden = true;

    if (QUOTE_FORM_ENDPOINT) {
      try {
        const res = await fetch(QUOTE_FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.status);
      } catch {
        error.textContent = `Your request didn't send. Check your connection and try again, or call us at ${BUSINESS.phone}.`;
        error.hidden = false;
        return;
      }
    }
    showSent(form, !QUOTE_FORM_ENDPOINT);
  });
}

const listify = (a) => (a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a.at(-1)}`);

function showSent(form, preview) {
  // form.elements.name, not form.name: form.name is the form's own name attribute.
  const first = form.elements.name.value.trim().split(" ")[0];
  form.outerHTML = `
  <div class="sent" tabindex="-1" id="sent">
    <h2>Thanks, ${esc(first)}. Your quote request is in.</h2>
    <p>We'll review your project and get back to you by email or phone with your quote.</p>
    ${preview ? `<p class="note">Preview only: this form isn't connected to an inbox yet, so nothing was sent.</p>` : ""}
    <a class="btn btn-quiet" href="#work">Browse our work</a>
  </div>`;
  document.getElementById("sent").focus();
}

/* ---------- Phone menu sheet ---------- */

const sheet = document.getElementById("sheet");
const opener = document.getElementById("menu-open");

function openSheet() {
  sheet.hidden = false;
  opener.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => sheet.classList.add("open"));
  sheet.querySelector("a").focus();
}
function closeSheet() {
  if (sheet.hidden) return;
  sheet.classList.remove("open");
  opener.setAttribute("aria-expanded", "false");
  setTimeout(() => { sheet.hidden = true; }, 220);
}
opener.addEventListener("click", openSheet);
sheet.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) { closeSheet(); opener.focus(); } });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

/* ---------- Start ---------- */

document.getElementById("footer").innerHTML = footer();
fillLogos(document);
window.addEventListener("hashchange", render);
render();
