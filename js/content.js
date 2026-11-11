/* ==========================================================================
   content.js — every word and picture on the site lives here.
   To change copy, edit this file. Layout lives in css/style.css and
   behaviour lives in js/main.js.
   ========================================================================== */

/* Contact details used across the site. */
const BUSINESS = {
  name: "Spotty and the Owl Apparel",
  phone: "250-218-3428",
  phoneHref: "tel:+12502183428",
  email: "",                      // Dan's email goes here when we have it.
  town: "Comox, BC",
  region: "Vancouver Island",
  since: "2018",
  instagram: "https://www.instagram.com/spottyandtheowl_apparel/",
  facebook: "https://www.facebook.com/spottyandtheowl",
  promoStore: "https://www.spottyandtheowlpromotional.com/",
};

/* Where the quote form sends its data. Leave empty until a form service
   (Formspree, Web3Forms, Netlify Forms...) is set up for Dan's inbox. */
const QUOTE_FORM_ENDPOINT = "";

/* The five decoration methods. `slug` becomes the address #services/<slug>. */
const METHODS = [
  {
    slug: "screen-printing",
    name: "Screen printing",
    short: "Bold, consistent graphics for larger runs.",
    intro: "Screen printing is an excellent option for producing consistent designs across many garments. Ink is pushed through a fine mesh screen, one colour at a time, for a print that is vivid and built to last.",
    best: ["Business and company apparel", "School and team shirts", "Event merchandise", "Larger quantity orders", "Bold logos and graphic designs"],
    note: "Each colour in a design may need its own screen, depending on the production process.",
    img: "screen-print",
    alt: "A screen printer inspecting a blue mesh screen with a design burned into it",
  },
  {
    slug: "embroidery",
    name: "Embroidery",
    short: "A stitched, textured finish that looks professional.",
    intro: "Embroidery stitches your logo straight into the garment, giving it texture and a polished, premium look that holds up to years of wear.",
    best: ["Company polos", "Workwear", "Jackets and outerwear", "Hats and caps", "Uniforms and corporate apparel"],
    note: "Artwork has to be digitized into an embroidery file before production. Digitizing charges may apply.",
    img: "fire-crest",
    alt: "A Tajima embroidery machine stitching a fire department crest onto a navy shirt",
    extra: { img: "cap-embroidery", alt: "Black caps clamped onto cap frames under a multi-needle embroidery head" },
  },
  {
    slug: "vinyl",
    name: "Heat-transfer vinyl",
    short: "Clean names, numbers and lettering.",
    intro: "Vinyl is cut to shape and pressed onto the garment with heat. It gives crisp, sharp edges, which makes it ideal for personalization.",
    best: ["Sports team names and numbers", "Individual personalization", "Business lettering", "Simple logos and graphics"],
    note: "Different vinyl types and garment fabrics may affect the final result.",
    img: "vinyl-peel",
    alt: "A hand peeling the carrier sheet off white chevron vinyl pressed onto a black t-shirt",
  },
  {
    slug: "dtf",
    name: "DTF printing",
    short: "Full-colour transfers that work on many fabrics.",
    intro: "Direct-to-Film transfers are printed in full colour, then applied to the garment with heat and pressure. They handle fine detail and gradients that would be impractical to screen print.",
    best: ["Multi-colour artwork", "Detailed logos", "Small and medium production runs", "Designs that are not practical for screen printing"],
    note: "Fabric compatibility, garment construction and care instructions should be considered.",
    img: "heat-press-colour",
    alt: "A heat press closing on a white t-shirt with a bright watercolour transfer",
  },
  {
    slug: "dtg",
    name: "DTG printing",
    short: "Photo-quality detail printed straight onto cotton.",
    intro: "Direct-to-Garment printing applies ink directly into compatible garments, so detailed, full-colour artwork comes out soft to the touch with no minimum screens to make.",
    best: ["Detailed artwork", "Photographic-style designs", "Small production runs", "Cotton garments and compatible fabrics"],
    note: "Garment material, colour and pretreatment requirements can affect print results.",
    img: "dtg-printer",
    alt: "A direct-to-garment printer with a white t-shirt loaded on the platen",
  },
];

/* Who the shop outfits. Shown as tabs on the home page. */
const AUDIENCES = [
  { id: "businesses", name: "Businesses", text: "Branded uniforms, promotional apparel and company merchandise that look as professional as the work you do.", img: "hk-flannel", alt: "A grey and black quilted flannel shirt jacket with an embroidered HK monogram" },
  { id: "trades", name: "Trades", text: "Durable workwear, branded shirts, hoodies, jackets and hats that stand up to the job site.", img: "belmont-hat", alt: "A black cap embroidered with the Belmont Landscaping and Design logo, sitting on a granite boulder" },
  { id: "schools", name: "Schools", text: "Spirit wear, club apparel, graduation clothing and gear for school events.", img: "patch-dream-big", alt: "An embroidered graduation cap patch reading Dream Big in gold thread" },
  { id: "teams", name: "Sports teams", text: "Team shirts, practice apparel, jerseys and fan merchandise, with names and numbers.", img: "lacrosse-tees", alt: "A stack of white Comox Valley Wild Lacrosse t-shirts printed in gold and navy" },
  { id: "events", name: "Events and organizations", text: "Event shirts, staff apparel, fundraising merchandise and group clothing.", img: "westcoast-weekends", alt: "Charcoal and black sweatshirts printed with Forest bathing, Beach walks, Mountain tops" },
];

/* Finished jobs for the Work page. `kind` drives the filter buttons. */
const WORK = [
  { img: "lacrosse-tees", title: "Comox Valley Wild Lacrosse", detail: "Team tees in gold and navy", kind: "print" },
  { img: "belmont-hat-angle", title: "Belmont Landscaping & Design", detail: "Embroidered Flexfit caps", kind: "embroidery" },
  { img: "fire-crest", title: "Fire department crest", detail: "Embroidered left chest", kind: "embroidery" },
  { img: "hk-flannel", title: "HK monogram", detail: "Embroidered quilted flannel jacket", kind: "embroidery" },
  { img: "westcoast-weekends", title: "Westcoast Weekends", detail: "Crewneck sweatshirts", kind: "print" },
  { img: "island-trucker", title: "Vancouver Island trucker", detail: "Trucker cap, photo by The Comox Box", kind: "print" },
  { img: "dog-mom", title: "Dog Mom", detail: "Westcoast Weekends crewneck", kind: "print" },
  { img: "squad-love", title: "Squad Love", detail: "Crewneck sweatshirt", kind: "print" },
  { img: "belmont-hat", title: "Belmont Landscaping & Design", detail: "Three-colour cap embroidery", kind: "embroidery" },
  { img: "logo-hoodie", title: "Our own house hoodie", detail: "Spotty and the Owl, est. 2018", kind: "print" },
  { img: "cap-embroidery", title: "Caps in the hoop", detail: "Multi-needle cap embroidery", kind: "embroidery" },
  { img: "logo-tee", title: "Our own badge tee", detail: "Heather grey tri-blend", kind: "print" },
];

/* Alt text for the Work photos (kept separate so captions stay short). */
const WORK_ALT = {
  "lacrosse-tees": "A stack of white Comox Valley Wild Lacrosse t-shirts printed in gold and navy",
  "belmont-hat-angle": "A black cap embroidered with the Belmont Landscaping and Design logo",
  "fire-crest": "A Tajima embroidery machine stitching a fire department crest onto a navy shirt",
  "hk-flannel": "A quilted flannel shirt jacket with an embroidered HK monogram",
  "westcoast-weekends": "Charcoal and black sweatshirts printed with Forest bathing, Beach walks, Mountain tops",
  "island-trucker": "A woman on the beach wearing a black trucker cap with a Vancouver Island outline",
  "dog-mom": "A black crewneck printed with Dog Mom in white",
  "squad-love": "A woman in a mustard toque and black Squad Love sweatshirt in the forest",
  "belmont-hat": "A black cap embroidered with the Belmont Landscaping and Design logo, front view",
  "logo-hoodie": "A woman in a sage green Spotty and the Owl hoodie",
  "cap-embroidery": "Black caps on cap frames under a multi-needle embroidery head",
  "logo-tee": "A heather grey tee printed with the Spotty and the Owl badge logo",
};

/* Reasons to choose the shop. */
const REASONS = [
  { t: "Every method under one roof", d: "Screen printing, embroidery, vinyl, DTF and DTG, so the choice is about your project, not our equipment." },
  { t: "Blank apparel, sourced for you", d: "We help you choose the garment as well as the decoration, from tees to jackets and hats." },
  { t: "Guidance at every step", d: "Honest recommendations on method, placement and budget, from first idea to final count." },
  { t: "Care with artwork and detail", d: "We check your files before anything is printed or stitched, so the result matches what you approved." },
  { t: "Built for groups", d: "Solutions for businesses, teams and organizations, from a dozen shirts to a full uniform order." },
  { t: "Clear quotes, clear expectations", d: "You know the price, the timeline and the quantity before production begins." },
];

/* Blank apparel categories. */
const BLANKS = ["T-shirts and long sleeves", "Polo shirts", "Hoodies and sweatshirts", "Sweatpants and athletic wear", "Work shirts and uniforms", "Jackets and outerwear", "Hats and headwear", "Tote bags and accessories"];

/* What affects price. */
const PRICING = [
  ["Apparel", "Brand, garment style, colour and size"],
  ["Quantity", "Number of garments ordered"],
  ["Decoration", "Screen printing, embroidery, vinyl, DTF or DTG"],
  ["Design", "Artwork complexity and number of colours"],
  ["Placement", "Front, back, sleeves, hats or multiple locations"],
  ["Setup", "Screens, digitizing, artwork preparation or other setup"],
  ["Turnaround", "Rush production, when available"],
];

/* Order-size notes. */
const QUANTITY_NOTES = [
  "Larger orders may qualify for volume pricing.",
  "Screen printing may have minimum production quantities.",
  "Embroidery may involve a one-time digitizing or setup fee.",
  "Small orders may have minimum charges.",
  "Individual names and numbers may add to the cost.",
];

/* The order process, in order. */
const STEPS = [
  ["We review your project", "We read through your details, sizes, dates and artwork."],
  ["We check the requirements", "Apparel, decoration method and artwork are matched to your project."],
  ["We prepare your quote", "A clear, itemized quotation with any setup costs listed."],
  ["You approve it", "Review the quote and your artwork proof, and sign off."],
  ["We produce your order", "Production begins once the order requirements are met."],
  ["Pickup or delivery", "We let you know as soon as your order is ready, and it goes out as agreed."],
];
