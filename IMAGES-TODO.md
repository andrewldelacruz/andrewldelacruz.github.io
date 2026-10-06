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

## Smart Nightstand Hub — done

- [x] `01-hero.jpg` — the finished unit, front
- [x] `02-cad-front.jpg` — SolidWorks model, front: locating pegs and ledges
- [x] `03-cad-rear.jpg` — SolidWorks model, rear: tapered roof and back-panel channel
- [x] `04-print.jpg` — earlier white print
- [x] `05-rear.jpg` — printed rear: sliding panel, vents, USB-C
- [x] `06-bench.jpg` — breadboard bring-up, both screens live
- [x] `card.jpg` — 16:10 crop for the home-page card

Only outstanding item: the **GD&T drawing sheet**. The page describes the drawings but shows none.
Crop or hide the stray ±0.01 dimensions before posting it.

## Fold or Roll — done

- [x] `assets/img/fold-or-roll/01-hero.jpg` — Player 1's game screen, mid-round
- [x] `assets/img/fold-or-roll/card.jpg` — 16:10 crop for the home-page card

The page used to have a three-image gallery; with only one screenshot it was mostly placeholders,
so the gallery was removed and the screenshot promoted to the hero. If you ever capture Player 2's
view, a showdown, or the two laptops playing each other, say so and the gallery can come back.

## Also needed

- [x] **`assets/img/og-card.png`** — 1200×630 — done. The link-preview card for LinkedIn and
      iMessage. Every page points at it for now; once project photos land, each project page can
      point at its own hero image instead.
- [x] **`assets/resume.pdf`** — installed. Portfolio URL and split Cogwell dates are in.
