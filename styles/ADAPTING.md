# Using a library style in this account

Read this before any `styles/<slug>/STYLE.md`. A style decides **how things look and move**. This
account (`account.json`, `BRAND.md`, `LEARNINGS.md`) decides **everything else**. Where they disagree,
the account wins, in this order: `LEARNINGS.md` → `BRAND.md` → this file → `STYLE.md` → `DEMO.md`.

The guides were written for 16:9 films of any length with an offline voice and a sampled score,
rendered by a different pipeline. Here is what changes.

## 1. What every style keeps from this account

| Topic | The account's rule (always) | What to take from `STYLE.md` |
|---|---|---|
| Shape | 9:16, 1080×1920, 30 fps; 60 s reels. Safe zones from BRAND.md section 4 | Sections 2, 3, 5, 6, 8: materials, colour, motion, camera, native moves |
| Story | The reel skill's rules: hook first, one analogy world, one token, save-and-share ending | Its camera grammar and native moves, chosen to fit our beats |
| Voice | ElevenLabs, the `account.json` voice | The *feel* of its voice line (pace, warmth) for the voice tags |
| Music | ElevenLabs music; `music.style` unless the style suggests a better fit (say so at Gate 1) | Section 7 as the music prompt and the effect list |
| Subtitles | Exactly the spoken words, above the bottom safe zone, readable at phone size | Its typeface and its subtitle treatment (halo, box or none), if readable |
| Mascot | The account mascot appears in every reel and cover | Redraw it **in the style's medium** (a cel, a crayon drawing, a woodcut, a sprite…). Same silhouette, colours and face so it is still recognisable |
| Palette | The style's palette is fine; the brand accent (`colors.accent`) should appear somewhere (the token, the end card) | Section 3 |
| Facts | Every figure sourced and dated (BRAND.md section 7) | — |
| End card | Brand end card: concept line, handle, disclaimer, sources | Draw it in the style's medium |

## 2. Turning 16:9 into 9:16

- Stack, don't shrink. A wide composition becomes two layers stacked vertically (sky above, subject
  below) or a slow tilt along a tall object.
- Lateral dollies become vertical tilts or slow pushes. A long pan is fine if the subject stays in
  the middle 3:4.
- Keep text and the subject inside the 3:4 middle; on a reel nothing important in the top 220 px,
  the bottom 420 px or the right 120 px (BRAND.md section 4 has every format's zones; `SAFE` in
  `studio/src/brand/ui.tsx` has them in code).
- Type sizes in the guides are for 1920 px wide films watched on a big screen and are far too small on
  a phone. For anything people must read, use the BRAND.md type sizes (subtitles 64 px, body 50 px,
  never under 30 px) and keep only the guide's typeface and treatment.
- A style with a fixed aspect inside it (silent-film 4:3, pixel-rpg 320×180) keeps that aspect as a
  frame in the middle of the 9:16 canvas, or turns it to portrait (pixel-rpg at 180×320).

## 3. Building it in Remotion

The upstream demos render a web page with `render(t)` in headless Chrome. Remotion does the same
thing frame by frame, so their drawing ports almost line for line.

- `renderer: svg` (catalog.json): draw with React/SVG and the kit, as before.
- `renderer: canvas`: put the drawing inside `<StyleCanvas>` (`src/kit/StyleCanvas.tsx`). It hands
  you a 2D canvas and the time `t` in seconds for each frame. Port the engine as a `setup` that builds
  sprites, paper and fonts once, and a `draw(t)` that is a pure function of `t`.
- `renderer: three`: same component with `webgl: true`; create a `THREE.WebGLRenderer` on the canvas
  it gives you. The reel needs three.js: `bash scripts/new-reel.sh <slug> --style <style>` installs it.
  Rendering uses the ANGLE GL backend (`remotion.config.ts`); it is slow without a GPU, so render
  stills of the look frame first.
- **Determinism:** no `Math.random()` without a seed and no state carried between frames.
  Remotion renders frames in parallel and out of order. Seed per object (`rnd()` in `kit/helpers.ts`,
  or `mulberry32`/`withSeed` patterns from the upstream engines).
- Subtitles, the closing card and the brand templates stay React components drawn on top of the
  canvas, so they are always crisp and in the brand fonts.
- Fonts: load the style's Google Fonts with `@remotion/google-fonts`. No font files from the demos.

## 4. Reference code (optional)

`DEMO.md` explains how the upstream demo film was made. To read its engine code:

```bash
bash scripts/fetch-style-demo.sh <style>
```

It downloads that demo and the shared `core/` helpers into `styles/<style>/demo/` and
`styles/_upstream/` (git-ignored), pinned to the commit in `catalog.json`. Read it, port what you
need into the reel's own files, and **never run its build, fetch or render scripts**: they belong to
the other pipeline and some download music or footage with their own licences.

Do not copy from a demo: its voice tracks (six of them have no reuse rights), music, footage,
photos, HDRIs or font files. Each demo's `CREDITS` lists third-party licences.

## 5. Styles that need real material

`material: real` styles (catalog.json) are built on real footage, photos, scans or survey data. They
break the house rule "every frame drawn in code" unless the owner supplies the material and has the
rights to it. Only offer one when the owner asks for it or has the material. Note its sources and
licences in `sources.md`.

## 6. Picking a style

- An account has a few house styles (`account.json` → `styles.allowed`, default `styles.default`).
  Using one look most of the time keeps the feed recognisable.
- At Gate 1 of a reel (or Checkpoint 1 of a social piece), propose the default plus at most two
  others from `allowed` (or the full library if the owner asks), each with a one-line reason tied to
  the topic, and send the picker sheet for those styles.
- A style used for the first time on this account: render a look frame (one still with the mascot
  and a subtitle) and get the owner's OK before building the whole reel. Then add what was learned
  (how the mascot was drawn in it, sizes that worked) to `LEARNINGS.md`.

## 7. Credits

The library styles are from [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab.
Guides are MIT (`LICENSE-lemo-opuscar`); `poster.jpg` frames are CC BY 4.0 © LemoLab. Reels made with
a style are the account's own and need no credit. If a poster frame is ever posted publicly (a
"which style should I use?" post), credit LemoLab with a link.
