# Soft Storybook — Style Prompt

> A modern picture book that moves: simple round shapes, soft colour, one warm light, cute characters with big eyes, drawn in SVG inside Remotion.
> This is insta-studio's original house style (it was `engine/references/visual-style.md`). It needs no canvas bridge: draw it with the kit in `engine/template/src/kit/`.

## 1. Essence, and what it is not

- **A soft, flat cartoon world** built in layers, lit by **one warm light** per scene.
- **Round bean characters** with big eyes, a small mouth and blush (`Face` in `kit/parts.tsx`). They are always alive: breathing, blinking, bobbing.
- **Colour tells the story**: warm for the setup, gloom for the problem, warm again at the turn.
- Tone: gentle, curious, a friend explaining over a cup of tea.

Not clip art, not vector-stock icons, not a flat infographic, not anime.

## 2. Materials & rendering

- **SVG shapes, paths and gradients in React** (Remotion). No raster images.
- **Build in layers, back to front:** sky gradient → far shapes (skyline, hills, mountains, parallax at 0.3–0.5 of the camera) → mid world (houses, trees) → ground → characters → foreground details → light (glows, screen-blended) → vignette → subtitle scrim.
- **Glows** use `mixBlendMode: "screen"` radial gradients (`Glow` in `kit/parts.tsx`).
- **Texture and life:** a few drifting particles (stars twinkling, dust, petals, rain), seeded with `rnd()` so every render is identical.
- Skies and walls get gentle gradients; avoid flat full-screen single colours.

## 3. Colour logic

- **One light source per scene** (moon, lamp, sun, a flame). Everything else gets darker or cooler away from it.
- Pick 3–4 colours per mood and change them when the story turns: grey city → spring pastels; warm lit lane → dark blue → warm again.
- **A single accent** (the red flower, the gold coin) draws the eye to the token.
- Base palette: `account.json` `colors` (`bg`, `text`, `accent`, `warm1`, `warm2`, `gloom`, `down`, `cheek`).

## 4. Type & subtitles

- Handwritten font (Patrick Hand) for subtitles, Baloo 2 for titles and cards (`studio/src/brand/type.ts`).
- Subtitles: warm white with a soft dark halo, near the bottom (higher on 9:16 so the app's buttons don't cover them), a soft dark scrim behind. Exactly the spoken words.

## 5. Motion quality

- Ease everything (`eio`, `eout`, `eback`). Nothing moves linearly except rain and stars.
- Things appear by being drawn, growing or popping in, not by plain fade-ins.
- **No dead air:** something visibly changes every second. Inside a long line, add a slow camera creep plus idle motion.
- Characters: breathing (scale 1 ± 0.03), a blink every 3–5 s, a slight bob. **Squash and stretch** on hops and landings; `eback()` for pops; anticipation (a small dip) before a big move.
- Effects that sell the story: wind streaks and flying petals, rain plus lightning flashes (a 3–4 frame white flash at 20–35 % opacity), smoke curls when a light dies, sparks when one lights, sprouts popping up one by one.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| Slow push-in on a character | feeling; attention | the problem landing; the "aha" |
| Pull-back (z ≈ 0.58 on 9:16) | the whole world; a crowd | everyone reacting; the payoff |
| Lateral pan along the world | a journey; cause → effect | money moving; a chain of events |
| Locked frame with idle motion | a calm explanation | a definition; a big number |

Gentle moves only (`kit/camera.ts`). On 9:16 keep subjects above the subtitles.

## 7. Sound palette

- **Music:** `account.json` `music.style` (default playful pizzicato and marimba), with an arc that follows the story.
- **Effects:** `music.effectsPerReel` soft effects, each just after its key word (a pop, a chime, a whoosh).
- **Voice:** the account voice; warm storyteller.

## 8. Native moves

- **Pop-in reveal.** A thing grows with `eback()` on its word. *Fits:* a new idea; a number.
- **Colour turn.** The whole palette shifts from gloom to warm at the turn. *Fits:* the fix; the good news.
- **Token glow.** The token object gets its own little light. *Fits:* the thing that leaves and comes back.
- **Crowd hello-bounce.** Characters bounce on their cue. *Fits:* "everyone", "millions of people".

## 9. Pitfalls of the medium

- Stretched shapes, hard pure-black areas, text off-screen, shapes cutting through each other by accident.
- Redrawing a character differently in a close-up: draw each character as ONE component with props for pose, mood and facing.
- Half the frame empty on 9:16: characters stay on screen.

## 10. Engine

`engine/template/src/kit/` (`parts.tsx` with `Face`, `Glow`; `camera.ts`; `helpers.ts` with easing and `rnd`; `Subtitles.tsx`). Complete films: `engine/examples/tiny-diya/Film.tsx`, `engine/examples/little-robot/Film.tsx`, and `examples/finance-unboring/reel-sensex-classroom/`.

## 11. Variation space

The analogy world, the token, the light source and the palette change every reel. Keep the character design (the account mascot) and the subtitle look the same.

## Craft checklist for the look frame

- Would a picture-book illustrator be proud of this frame?
- Can you tell where the light comes from?
- Does the main character read instantly, even small?
- Is there depth: near, middle, far?
- Is the token visible and lit?
