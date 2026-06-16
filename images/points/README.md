# Pressure-point illustrations

Each pressure point card shows one image from this folder, with a **dot** (exact
location) and **massage-motion arrows** drawn *on top by the code* (see
`buildOverlay()` in `script.js`). You only supply the clean body-part image — the
dot + arrows are not part of the image.

## How to replace a placeholder
The files here are temporary placeholders. To use a real illustration, **overwrite
the file in place, keeping the exact same name** — no code change needed:

| File | Point | Body area |
|------|-------|-----------|
| `yintang.webp` | Yintang (Third Eye) | between the brows |
| `du20.webp`    | DU20 (Hundred Meetings) | top of the head |
| `li4.webp`     | LI4 (Joining Valley) | back of the hand (thumb/index web) |
| `pc6.webp`     | PC6 (Inner Gate) | inner forearm above the wrist |
| `st36.webp`    | ST36 (Leg Three Miles) | lower leg, outside the shin below the knee |
| `sp6.webp`     | SP6 (Three Yin Crossing) | inner lower leg above the ankle |
| `ht7.webp`     | HT7 (Spirit Gate) | inner wrist, little-finger side |
| `gb20.webp`    | GB20 (Wind Pool) | base of the skull |

**Format:** WebP (or JPG/PNG — if not `.webp`, tell me and I'll switch the path),
**exactly 3:2** landscape (e.g. 1200×800), optimised to ≤ ~120 KB.

## Generation prompts
Append this **style suffix** to every prompt so all 8 match:

> Soft, calm hand-drawn illustration in a warm minimalist wellness style. Muted
> earthy palette (rice-paper cream, sage green, soft clay, dusty blue). Even soft
> lighting, clean uncluttered pale background, flat gentle shading. Single subject
> **centered** with generous even margins — the relevant body area sits well inside
> the frame, never touching an edge. **No text, no labels, no dots, no arrows, no
> markings.** Aspect ratio **3:2, landscape, 1200×800.**

Per-point subject:
1. **yintang** — a serene front-facing face, relaxed, focusing on the smooth forehead and the area between the eyebrows.
2. **du20** — a calm head from a high three-quarter angle, showing the crown / very top of the head.
3. **li4** — the back of a relaxed open hand, clearly showing the soft webbing between thumb and index finger.
4. **pc6** — a forearm palm-up, focusing on the inner wrist and the area a few finger-widths up from the wrist crease.
5. **st36** — a lower leg just below the knee, slightly outer view, showing the muscle beside the shinbone.
6. **sp6** — an inner lower leg and ankle, showing the area just above the inner ankle bone behind the shin.
7. **ht7** — a wrist palm-up, focusing on the wrist crease on the little-finger side.
8. **gb20** — the back of a head and upper neck, showing the base of the skull and the two hollows beside the neck muscles.

## Tuning the dot after you add an image
Each point's dot position + motion live in the `POINTS` array in `script.js`:
`dot:{x,y}` uses a `0–300 × 0–200` grid (3:2), so `{x:150,y:100}` is dead-centre.
After dropping in a real image, nudge `dot` so it lands on the actual point (and for
`gb20`, set `arrow.angle` so the press arrow points the right way). I can do this for you.
