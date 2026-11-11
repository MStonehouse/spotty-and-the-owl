/* ==========================================================================
   estimator.js — the ballpark price estimator on the Pricing page.

   Prices live in the tables below; price() combines them. To update prices,
   change only the tables.

   SAMPLE NUMBERS: these are placeholders, not Dan's prices.
   Replace them before the site moves to spottyandtheowlapparel.com.
   ========================================================================== */

(() => {
  const form = document.getElementById("est-form");
  if (!form) return;

  /* ---- Price tables ------------------------------------------------------ */

  // Blank garment cost per item: [low, high]
  const GARMENT = { tee: [6, 10], long: [10, 14], hoodie: [24, 32], polo: [16, 24], cap: [12, 18], jacket: [40, 58] };

  // Printing or stitching per item, for one spot, before quantity breaks: [low, high].
  // Screen printing depends on the number of colours; the others on design size.
  const METHOD = {
    screen: (colours) => [2.5 + 0.9 * colours, 3.5 + 1.1 * colours],
    emb:    (size) => (size === "small" ? [7, 9] : [14, 18]),
    vinyl:  (size) => (size === "small" ? [5, 7] : [9, 12]),
    dtf:    (size) => (size === "small" ? [5, 7] : [9, 12]),
    dtg:    (size) => (size === "small" ? [8, 10] : [12, 16]),
  };

  // One-time setup per spot (screens, digitizing), shared across the order.
  const SETUP = { screen: (colours) => 25 * colours, emb: () => 40, vinyl: () => 0, dtf: () => 0, dtg: () => 0 };
  const SETUP_NAME = { screen: "screen setup", emb: "digitizing" };

  // Quantity breaks: from this many garments, printing or stitching costs this share.
  const BREAKS = [[250, 0.55], [100, 0.62], [48, 0.74], [24, 0.86], [1, 1]];
  const PRESETS = [12, 24, 48, 100, 250];

  // Methods that don't suit a garment: { garment: { method: "reason" } }
  const NOT_FOR = { cap: { dtg: "DTG doesn't print on caps. Caps are best embroidered." } };

  /* ---- The sum ----------------------------------------------------------- */

  function price(garment, qty, method, detail, spots) {
    const share = BREAKS.find(([from]) => qty >= from)[1];
    const [mLow, mHigh] = METHOD[method](method === "screen" ? Number(detail) : detail);
    const setup = SETUP[method](Number(detail)) * spots;
    return {
      low: GARMENT[garment][0] + mLow * share * spots + setup / qty,
      high: GARMENT[garment][1] + mHigh * share * spots + setup / qty,
      setup,
    };
  }

  /* ---- The page ---------------------------------------------------------- */

  const $ = (id) => document.getElementById(id);
  const picked = (name) => form.querySelector(`[name="${name}"]:checked`)?.value;
  const money = (n) => "$" + Math.round(n).toLocaleString("en-CA");
  const qtyBox = $("est-q");

  function update() {
    const garment = picked("g");
    const qty = Math.max(1, parseInt(qtyBox.value, 10) || 1);
    const spots = Number(picked("p"));

    // Cross out methods that don't suit this garment, and say why.
    const blocked = NOT_FOR[garment] || {};
    form.querySelectorAll('[name="m"]').forEach((radio) => {
      radio.disabled = Boolean(blocked[radio.value]);
      if (radio.disabled && radio.checked) form.querySelector('[name="m"][value="emb"]').checked = true;
    });
    const reasons = Object.values(blocked).join(" ");
    $("est-why").textContent = reasons;
    $("est-why").hidden = !reasons;

    // Screen printing asks for colours; the other methods ask for design size.
    const method = picked("m");
    const screen = method === "screen";
    $("est-colours").hidden = !screen;
    $("est-size").hidden = screen;
    $("est-d-legend").textContent = screen ? "Ink colours" : "Design size";
    const detail = screen ? picked("c") : picked("s");

    const p = price(garment, qty, method, detail, spots);
    const each = `${money(p.low)} to ${money(p.high)}`;
    $("est-each").textContent = each;
    $("est-live").textContent = each;
    $("est-total").textContent = `About ${money(p.low * qty)} to ${money(p.high * qty)} for ${qty}`;
    $("est-setup").textContent = p.setup
      ? `Includes about ${money(p.setup)} of one-time ${SETUP_NAME[method]}, shared across the order.`
      : "No setup fee for this method.";

    // Show what the next quantity break would cost.
    const next = PRESETS.find((n) => n > qty);
    const np = next && price(garment, next, method, detail, spots);
    $("est-nudge").textContent = next ? `Order ${next} and it drops to about ${money(np.low)} to ${money(np.high)} each.` : "";
    form.querySelectorAll("[data-q]").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.q) === qty));

    // Carry the choices into the quote form.
    const params = new URLSearchParams({ g: garment, q: qty, m: method, d: detail, p: spots, est: each });
    $("est-cta").href = `quote.html?${params}`;
  }

  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("change", update);
  qtyBox.addEventListener("input", update);
  form.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => {
    qtyBox.value = Math.max(1, (parseInt(qtyBox.value, 10) || 1) + Number(b.dataset.step));
    update();
  }));
  form.querySelectorAll("[data-q]").forEach((b) => b.addEventListener("click", () => {
    qtyBox.value = b.dataset.q;
    update();
  }));
  update();
})();
