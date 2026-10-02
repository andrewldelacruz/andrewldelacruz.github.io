# Photos still needed

Every `<img>` on the site already points at the **final filename** below. A generated SVG
placeholder stands in until the real photo exists, so **adding a photo is just dropping a
correctly-named file into the right folder** — no HTML editing, and nothing ever looks broken.

## How to add one

1. Resize the photo to about **1600 px on its long edge** and save it as a JPG (quality ~80).
   Aim to keep each file under ~300 KB so the page stays fast on a phone.
2. Name it **exactly** as listed below, including the number prefix.
3. Drop it into `assets/img/<folder>/`.
4. Commit and push. That's it — the placeholder disappears on its own.
5. Optionally tighten the caption in the HTML. Captions live in `<figcaption>` tags, so you
   can reword them without touching any image.

Delete the matching `.svg` once a real photo is in place (optional — it just stops being used).

## Site-wide

- [x] **`assets/img/headshot.jpg`** — 880×880 — done (professional headshot, Oct 2026)
      Head-and-shoulders photo, neutral background. Reuse your LinkedIn profile picture.

## FlashBack — done

- [x] `assets/img/flashback/01-hero.jpg` — the printed DUEN banquet panorama (banner)
- [x] `assets/img/flashback/02-booth.jpg` — the finished booth
- [x] `assets/img/flashback/03-ui.jpg` — touchscreen UI, live feed and counters
- [x] `assets/img/flashback/04-cad-assembly.jpg` — SolidWorks full assembly
- [x] `assets/img/flashback/05-cad-chassis.jpg` — chassis interior
- [x] `assets/img/flashback/06-cad-camera-head.jpg` — camera head and ring light
- [x] `assets/img/flashback/card.jpg` — 16:10 crop for the home-page card

Still missing, if you ever want them: a photo of the real chassis internals (wiring, Pi, buck
converters) and one of the bearing base. The CAD renders stand in for both.

## Smart Nightstand Hub

- [ ] **`assets/img/nightstand/01-hero.jpg`** — 1600×900
      The hub on the window sill, both displays lit and legible. LinkedIn preview image.

- [ ] **`assets/img/nightstand/02-cad-assembly.jpg`** — 1200×900
      SolidWorks screenshot of the three-part enclosure. CROP OR HIDE the stray plus/minus 0.01 dimensions.

- [ ] **`assets/img/nightstand/03-internals.jpg`** — 1200×900
      Back panel off: ESP32, buck converter, speaker, amp, and the sensor away from heat sources.

- [ ] **`assets/img/nightstand/04-press-fit.jpg`** — 1200×900
      Close-up of the ledges, locating pegs, or roof-to-panel fit. Macro shot or CAD detail view.

- [ ] **`assets/img/nightstand/05-print-iterations.jpg`** — 1200×900
      Print 1 beside print 2 so the clearance changes are visible.

- [ ] **`assets/img/nightstand/06-gdt-drawing.jpg`** — 1600×900
      The GD&T drawing sheet once finished. Replace the 'in progress' wording on the page when you add it.

## Fold or Roll

- [ ] **`assets/img/fold-or-roll/01-hero.jpg`** — 1600×900
      Game screen from Player 1's side, mid-round, Sabotage Die visible. Real screenshot preferred.

- [ ] **`assets/img/fold-or-roll/02-player2-view.jpg`** — 1200×900
      Same round from the second computer, showing the hidden opponent total.

- [ ] **`assets/img/fold-or-roll/03-showdown.jpg`** — 1200×900
      The showdown screen with both hands revealed.

- [ ] **`assets/img/fold-or-roll/04-two-machines.jpg`** — 1600×900
      Two laptops side by side playing each other. Proves the networking claim.

## Also needed

- [x] **`assets/img/og-card.png`** — 1200×630 — done. The link-preview card for LinkedIn and
      iMessage. Every page points at it for now; once project photos land, each project page can
      point at its own hero image instead.
- [ ] **`assets/resume.pdf`** — your résumé export. Two fixes first: replace the
      `github.com/jake` placeholder with this site's URL, and remove "EECS second-in-command"
      so the wording matches the site.
