/* ==========================================================================
   main.js — behaviour only. Every page is its own HTML file; this script
   adds the interactive parts to whichever page it finds them on.

   Contents
   1. Hero video and reduced motion
   2. Phone menu sheet
   3. "Who we work with" tabs (home page)
   4a. Endless "Recent work" strip (home page)
   4b. Work gallery: filters and photo viewer (work page)
   5. Quote form (quote page)
   6. Footer year
   ========================================================================== */

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 1. Hero video ------------------------------------------------------------
   People who ask their device for less motion get the still poster frame. */

const heroVideo = document.querySelector(".hoop-video");
if (heroVideo && reduceMotion) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

/* 2. Phone menu sheet ---------------------------------------------------------- */

const sheet = document.getElementById("sheet");
const menuButton = document.getElementById("menu-open");

function openSheet() {
  sheet.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => sheet.classList.add("open"));  // next frame, so the slide-up animates
  sheet.querySelector("a").focus();
}

function closeSheet() {
  if (sheet.hidden) return;
  sheet.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  setTimeout(() => { sheet.hidden = true; }, 220);           // after the slide-down finishes
}

menuButton.addEventListener("click", openSheet);
sheet.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) { closeSheet(); menuButton.focus(); }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

/* 3. Tabs -----------------------------------------------------------------------
   Tap a group to see its photo. Arrow keys move between tabs. */

document.querySelectorAll("[data-tabs]").forEach((box) => {
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
      select(next);
      next.focus();
    });
  });
});

/* 4a. Endless strip ------------------------------------------------------------
   The Recent work row on the home page loops: go past the last photo and the
   first one comes next, in either direction.

   How it works: the row holds three copies of the photos side by side,
   [copy | real | copy], and you start on the real (middle) set. Whenever the row
   comes to rest inside one of the copies, it jumps instantly by exactly one set's
   width back into the middle. The copy and the real photos are identical, so the
   jump can't be seen. */

document.querySelectorAll(".strip[data-loop]").forEach((strip) => {
  const real = [...strip.children];
  const before = real.map(loopCopy);
  const after = real.map(loopCopy);
  strip.prepend(...before);
  strip.append(...after);

  // Measured on screen each time, so it stays right when the window is resized.
  const left = (el) => el.getBoundingClientRect().left;
  const setWidth = () => left(after[0]) - left(real[0]);   // one full set of photos
  const step = () => left(real[1]) - left(real[0]);        // one photo plus the gap
  // Where a photo sits when the row is "resting" on it (the snap line).
  const snapLine = () => left(before[0]) + strip.scrollLeft;

  // Jump sideways with snapping off, so the browser doesn't nudge the row mid-jump.
  function jump(dx) {
    strip.style.scrollSnapType = "none";
    strip.scrollLeft += dx;
    strip.style.scrollSnapType = "";
  }

  // If the row has come to rest in a copy, move back to the same photo in the real set.
  function recenter() {
    const w = setWidth();
    const d = left(real[0]) - snapLine();   // 0 on the first real photo
    if (d > step() / 2) jump(w);             // drifted back into the left copy
    else if (d <= -w + step() / 2) jump(-w); // drifted on into the right copy
  }

  jump(setWidth());   // start on the first real photo

  // Recenter only once the row has stopped (not while a finger is on it).
  let timer, touching = false;
  const settle = () => { clearTimeout(timer); timer = setTimeout(() => { if (!touching) recenter(); }, 140); };
  strip.addEventListener("scroll", settle, { passive: true });
  strip.addEventListener("touchstart", () => { touching = true; }, { passive: true });
  strip.addEventListener("touchend", () => { touching = false; settle(); }, { passive: true });
  addEventListener("resize", settle);

  // Arrow buttons: one photo per press. Quick presses add up instead of being lost,
  // because we aim from where the last press was heading, not from where the row is mid-glide.
  let target = null, lastPress = 0;
  function go(dir) {
    const now = performance.now();
    if (target === null || now - lastPress > 450) { recenter(); target = strip.scrollLeft; }
    lastPress = now;
    target += dir * step();
    strip.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
  }
  strip.addEventListener("scroll", () => { if (performance.now() - lastPress > 450) target = null; }, { passive: true });
  document.querySelectorAll(`[aria-controls="${strip.id}"][data-strip-prev]`).forEach((b) => b.addEventListener("click", () => go(-1)));
  document.querySelectorAll(`[aria-controls="${strip.id}"][data-strip-next]`).forEach((b) => b.addEventListener("click", () => go(1)));
});

/* A copy of a photo for the loop: hidden from screen readers and keyboard, so it's only scenery. */
function loopCopy(el) {
  const copy = el.cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  copy.inert = true;
  return copy;
}

/* 4b. Work gallery -------------------------------------------------------------- */

const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach((button) => button.addEventListener("click", () => {
  filterButtons.forEach((b) => b.setAttribute("aria-pressed", b === button));
  document.querySelectorAll(".gallery li").forEach((li) => {
    li.hidden = button.dataset.filter !== "all" && li.dataset.kind !== button.dataset.filter;
  });
}));

const viewer = document.getElementById("viewer");
if (viewer) {
  const viewerImg = document.getElementById("viewer-img");
  const viewerCap = document.getElementById("viewer-cap");

  document.querySelectorAll(".tile").forEach((tile) => tile.addEventListener("click", () => {
    const img = tile.querySelector("img");
    const title = tile.querySelector(".tile-cap strong").textContent;
    const detail = tile.querySelector(".tile-cap").lastChild.textContent;
    viewerImg.src = img.src.replace("-800.webp", "-1600.webp");  // the big copy for full screen
    viewerImg.alt = img.alt;
    viewerCap.textContent = `${title}. ${detail}`;
    viewer.showModal();
  }));

  document.getElementById("viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });  // tap outside the photo
}

/* 5. Quote form -------------------------------------------------------------- */

const form = document.getElementById("quote-form");
if (form) {
  const fileInput = document.getElementById("artwork");
  const fileList = document.getElementById("drop-files");
  const error = document.getElementById("form-error");

  // Arriving from "Request an artwork review" on the Artwork page.
  if (location.hash === "#artwork-review") {
    form.elements.details.value = "Artwork review: please check my file before I order.";
  }

  fileInput.addEventListener("change", () => {
    const names = [...fileInput.files].map((f) => f.name);
    fileList.textContent = names.length ? `Added: ${names.join(", ")}` : "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check the required boxes and name any that are missing.
    form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
    const missing = [...form.querySelectorAll("[required]")].filter((f) => !f.value.trim() || !f.checkValidity());
    if (missing.length) {
      missing.forEach((f) => f.setAttribute("aria-invalid", "true"));
      const labels = missing.map((f) => f.closest("label").querySelector(".field-name").firstChild.textContent.trim().toLowerCase());
      error.textContent = `Please add your ${listify(labels)} so we can reply with a quote.`;
      error.hidden = false;
      missing[0].focus();
      return;
    }
    error.hidden = true;

    if (SITE.quoteFormEndpoint) {
      try {
        const res = await fetch(SITE.quoteFormEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.status);
      } catch {
        error.textContent = `Your request didn't send. Check your connection and try again, or call us at ${SITE.phone}.`;
        error.hidden = false;
        return;
      }
    }
    showSent(!SITE.quoteFormEndpoint);
  });
}

/* "name, email and phone" */
function listify(words) {
  return words.length < 2 ? words.join("") : `${words.slice(0, -1).join(", ")} and ${words.at(-1)}`;
}

/* Swap the form for a thank-you note. */
function showSent(preview) {
  // form.elements.name, not form.name: form.name is the form's own name attribute.
  const first = form.elements.name.value.trim().split(" ")[0];
  const sent = document.getElementById("sent");
  sent.querySelector("[data-first]").textContent = first;
  sent.querySelector("[data-preview]").hidden = !preview;
  form.hidden = true;
  sent.hidden = false;
  sent.focus();
}

/* 6. Footer year ------------------------------------------------------------- */

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
