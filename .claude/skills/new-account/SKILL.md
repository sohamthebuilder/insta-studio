---
name: new-account
description: Set up this repo for a new Instagram/YouTube account in any niche. Interviews the owner about the niche, audience, handle, voice, mascot, colours and safety rules, then fills account.json and BRAND.md, renders the brand kit (profile picture, highlight covers, banner, template sheet) and proposes the first content plan. Use when the user says "set up a new account", "new niche", "start the brand", "fill the brand guide", or when account.json still says "niche": "TBD".
---

# New account

Turns this template repo into one account's content studio. After this, the `reel` and `social`
skills work for that account with no other changes. All paths are relative to the repo root.

Reference: `examples/finance-unboring/` is a fully filled account (BRAND.md, the two original skills,
a reel, story pieces). Use it to see what "done" looks like, not as content to copy.

## Step 1: the interview (ONE message, defaults for everything)
Ask all of these at once, each with a suggested default drawn from the niche the user named, and say
"reply 'go' to use the defaults":
1. **Niche and one-line promise.** "We explain ___ the way a friend would, in under a minute."
2. **Audience:** who, age range, country, language.
3. **Handle and display name** (and how the handle is spoken aloud, e.g. "plant dot pal").
   Remind them to check that the handle is free on Instagram and YouTube themselves.
4. **Content pillars:** 3–4, like Basics / Mistakes / What it means for you / Quiz.
5. **Voice:** narrator feel and accent. Offer 2–3 options from `creative_list_voices`
   (`use_cases: ["narrative_story"]`) with their free `preview_url`s. Nothing is generated yet.
6. **Music feel** (e.g. playful marimba, lo-fi, warm acoustic).
7. **Mascot:** keep the bean (rename it, recolour it, hat or no hat) or describe a new one.
8. **Colours:** keep the default night-navy palette, or give 1–2 brand colours and you derive the rest
   (accent must be readable on bg, `down` only for "going down").
9. **Safety:** what this niche must never do (regulators, health claims, kids' safety), and the
   disclaimer line, or none.
10. **Hashtags:** the brand tag plus 3–5 niche tags.

## Step 2: write the files (after the answers)
1. **`account.json`:** fill every field. Keep the keys exactly as they are (the studio reads them).
   `badgeSymbol` is one character that suits the niche (★, ♥, ✿, ?, a currency sign…).
2. **`BRAND.md`:** replace every `{{...}}` and **[TBD]**, following the finance example's level of
   detail: niche words in 1, a worked example in 2, number formats in 3.4, voice and music in 3.6,
   bios in 6.4, and a real 7.1 safe zone with preferred official sources in 7.3. Keep the voice rules
   (no em-dashes, no semicolons, plain words). Put today's date in the status line.
3. **Mascot / badge art:** if the owner wants a new mascot, redraw `Mascot` in
   `studio/src/brand/Mascot.tsx` (same props: `s`, `mood`, `look`, `wave`, `hold`; drawn around (0,0)
   = bottom of body, about 104 units tall). Swap `Badge` for a topic object if a coin doesn't fit.
   Update the highlight icons in `studio/src/templates/highlight.tsx` if the niche needs others.
   Fonts: change the two imports in `studio/src/brand/type.ts` only if asked.
4. **`LOG.md` and `LEARNINGS.md`:** leave them with only their headers (a fresh account has no history).
   Remove the "Example" rows if any.

## Step 3: render and check the brand kit
1. `bash scripts/setup.sh` if `studio/node_modules` or `.venv` is missing.
2. `cd studio && npx tsc --noEmit -p . && bash render-brand.sh`
3. LOOK at `brand/templates/template-sheet.png`, `brand/assets/avatar/avatar-options.png` and
   `brand/assets/youtube-banner.jpg`. Check: the handle and wordmark are right, the accent reads on bg,
   the mascot looks appealing at 110 px and 48 px, nothing has leftover sample text from another niche.
4. Send the three images with SendUserFile and ask the owner to pick the logo option (A, B or C).
   Set `logoOption` and re-run `render-brand.sh` if it changed.

## Step 4: hand over
Tell the owner:
- what to upload: `brand/assets/profile/profile-instagram-1080.png`, `profile-youtube-800.png`,
  `youtube-banner.jpg`, the four highlight covers in `brand/templates/png/highlight-*.png`, and the
  bios from BRAND.md 6.4 (paste-ready in code blocks);
- a starter plan: 5 first reel ideas (one per pillar plus a quiz), each with a hook line that lands the
  loss or surprise, and a different analogy world each;
- next step: "say 'make the next reel' to run the `reel` skill on idea 1".
Then commit: `git add -A && git commit -m "Set up <handle>"` (ask before pushing).
