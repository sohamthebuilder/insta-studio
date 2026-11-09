# {{displayName}} brand guide

**Status:** v0.1 template. Run the `new-account` skill to fill every `{{...}}` and **[TBD]**. Keep a dated line here each time the owner changes a rule.
**Who reads this:** anyone making content for @{{handle}}, people and Claude skills alike. When this guide and any other note disagree, this guide wins. Machine-readable values (handle, colours, voice, mascot) live in `account.json`. Keep the two in sync.

A filled-in example for a finance account is in `examples/finance-unboring/BRAND.md`.

---

## 0. Who we are

**One line:** {{one line, e.g. "We explain X the way a friend would, with a tiny cartoon story, in under a minute."}}

**Audience:** {{who, age, country, what they already know, what nobody explained to them}}

**What makes us different:** No presenter, no shouting. Every idea becomes a little cartoon world, and that world does the explaining. {{add niche-specific difference}}

**Tone in three words:** {{e.g. simple, warm, useful}}

**Content pillars**

| Pillar | What it is | Example |
|---|---|---|
| {{Basics}} | One idea, explained with one analogy world | {{"What is X?"}} |
| {{Mistakes}} | A common habit that costs people | {{example}} |
| {{What it means for you}} | A news event explained calmly, after the dust settles | {{example}} |
| {{Quiz}} | A question hook, the answer in the reel | {{example}} |

---

## 1. Voice and tone

### The rules
1. **Sound like a person explaining out loud to a friend.** Read every line aloud. If you wouldn't say it to a friend, rewrite it.
2. **Simple, human words only.** No jargon without an explanation right after it.
3. **No em-dashes (—). No semicolons (;).** Use a full stop or a comma instead.
4. **No formal phrasing.** No "furthermore", "it is important to note", "one must".
5. **Short sentences.** Most lines under 15 words. One idea per sentence.
6. **Clear and useful.** Every reel and post leaves the viewer with one thing they now understand or can do.
7. **Talk to "you".**
8. **Warm, never preachy.**

### Words we don't use

| Don't say | Say instead |
|---|---|
| leverage, utilise | use |
| furthermore, moreover, additionally | and, also, plus |
| it is imperative / essential that | you need to |
| individuals, consumers | you, people |
| in order to | to |
| commence | start |
| {{niche jargon}} | {{plain words}} |
| {{words that overpromise in this niche}} | never say these at all |

### Jargon rule
When a real term is needed, **show the idea first, name it after**.

---

## 2. Storytelling formula

Every reel follows the same eight beats. Times are for a 60 s reel (about {{wordsPerSecond × 55}} spoken words). For a 30 s reel, keep beats 1, 2, 5, 6 and 8.

| # | Beat | Time | What happens |
|---|---|---|---|
| 1 | **Hook** | 0 to 1.5 s | A moving picture plus one bold line. **The first spoken line lands the loss or the surprise.** Never a setup, never "Today we'll learn…" |
| 2 | **The world** | 1.5 to 8 s | Set up the analogy world and its characters |
| 3 | **The problem** | 8 to 20 s | Something goes wrong. Colours turn grey-blue |
| 4 | **The turn** | 20 to 30 s | "Then something changed…" Colours warm up |
| 5 | **The payoff** | 30 to 42 s | The one key number or fact lands, in the accent colour |
| 6 | **The real term** | 42 to 48 s | Name the idea in plain words |
| 7 | **The takeaway** | 48 to 54 s | One line the viewer keeps |
| 8 | **Save, share, follow** | 54 to 60 s | Tailored to the topic, names {{spokenHandle}} |

**Rules for the world**
- One analogy world per reel. Every concept maps to one thing in it.
- One **token** object that leaves and comes back.
- Never reuse a world from an earlier reel. Check `LOG.md` first.
- {{mascot name}} is our recurring character and can appear in any world.

---

## 3. Visual identity

### 3.1 Logo and profile mark
**Chosen: option {{logoOption}}.** Pick from `brand/assets/avatar/avatar-options.png` (rendered by `bash studio/render-brand.sh`) and set `logoOption` in `account.json`.

| File | Use |
|---|---|
| `brand/assets/profile/profile-instagram-1080.png` | Instagram profile picture |
| `brand/assets/profile/profile-youtube-800.png` | YouTube profile picture |
| `studio/src/brand/Avatars.tsx` | The code it's drawn from. Change the art here, then re-render |

Rules: reads at 110 px and 48 px. Clear space of half the mark's height. Wordmark "{{wordmark.plain}}{{wordmark.accent}}" with the second part in the accent colour. Don't stretch, rotate, recolour or outline it.

### 3.2 Palette
Values live in `account.json` → `colors`. Roles:

| Role | Default | Use |
|---|---|---|
| bg | `#161E34` | Main background for cards, slides, covers, end card |
| bgDeep | `#1A1D2E` | Behind scenes, banner edges |
| text | `#FFF7E6` | All main text and subtitles |
| accent | `#FFE3A3` | **Only the one key number or word per screen** (and the wordmark) |
| accent2 | `#8FF0B4` | The handle, and "going up" changes |
| down | `#FF8A80` | "Going down" changes only. Never decoration |
| warm1 → warm2 | `#FFC861` → `#FF9A2A` | Scene light in the good parts of the story |
| gloom | `#7D8BA8` | Scene tint in the problem part |
| ink / cheek | `#2B1D18` / `#FF8FA3` | Character eyes / cheeks |

Rules: one accent item per screen. Text colour on bg for all text. Colour tells the story: warm, then gloom for the problem, warm again at the turn.

### 3.3 Fonts
Baloo 2 (500/700/800) for headlines, numbers and body. Patrick Hand for subtitles. To change fonts, edit the two imports in `studio/src/brand/type.ts` and the reel's `kit/Subtitles.tsx`.

| Use | Font | Weight | Size (1080×1920) |
|---|---|---|---|
| Big number | Baloo 2 | 800 | 220 px |
| Hero word | Baloo 2 | 800 | 120 px |
| Headline | Baloo 2 | 800 | 96 px |
| Sub-headline | Baloo 2 | 700 | 64 px |
| Body | Baloo 2 | 500 | 50 px |
| Subtitles | Patrick Hand | 400 | 64 px |
| Handle | Baloo 2 | 700 | 52 px |
| Source / disclaimer | Baloo 2 | 500 | 30 px (never smaller) |

Carousels (1080×1350): every size × 0.85. Headline max 8 words. Body max 25 words per screen.

### 3.4 Charts and numbers
- One number per screen, in the accent colour, at big-number size.
- Every fact or number carries its date and source, right under it.
- Simple bars or one line. Max 4 bars. No 3D, no pies, no gridlines.
- {{niche number formats, units, currency}}

### 3.5 Characters and scenes
- Soft, flat storybook style, drawn in code. No photos, no AI images, no stock art.
- Round bean bodies, big eyes, pink cheeks. They blink and bob.
- One warm light source per scene. Gentle camera moves only.
- **{{mascot name}}** is our mascot: {{personality}}. {{mascot name}} asks the questions the viewer is thinking.

### 3.6 Sound (reels)
- **Narrator:** {{voice.name}} (ElevenLabs `{{voice.id}}`), about {{voice.wordsPerSecond}} words a second.
- **Music:** {{music.style}}. It dips in the problem part and lifts at the payoff.
- **Effects:** {{music.effectsPerReel}} soft ones per reel, placed just after their key word.
- **Mix:** music and effects sit 16 to 17 dB under the voice (music `gainDb` {{music.gainDb}}, `sfxBusDb` {{music.sfxBusDb}}).

---

## 4. Asset specs by channel

### 4.1 Instagram

| Asset | Size | Notes |
|---|---|---|
| Reel | 1080×1920 | Keep text and faces out of the bottom 420 px, the right 120 px and the top 220 px |
| Reel cover | 1080×1920 | The grid shows a 3:4 crop (middle 1080×1440). Headline and key art go inside it |
| Carousel / single post | 1080×1350 | 5 to 8 slides, 60 px margins |
| Story | 1080×1920 | Keep the top 250 px and bottom 340 px clear |
| Highlight cover | 1080×1920 | Icon inside the centre 600 px circle. bg colour, text-colour icon |
| Profile picture | 1080×1080 | Shown as a circle at about 110 px |

### 4.2 YouTube
Short 1080×1920 (same safe zones, under 60 s). Profile 800×800. Banner 2560×1440, safe middle 1546×423.

---

## 5. Templates

All templates are drawn in code (`studio/src/templates/`) and read `account.json`, so reels, carousels and stories always match.

- **See them all:** `brand/templates/template-sheet.png`. Re-render everything: `bash studio/render-brand.sh`.
- **Reels:** cover, hook card, text-line, big number, analogy scene, real term, end card.
- **Carousel:** cover, explainer (number or picture), summary.
- **Stories:** teaser, poll, quiz, ask us, greeting.
- **Highlights:** start, basics, news, ask.

**Cover rule (every reel).** Never use a frame from the reel as the cover. Each cover (1) states the topic, (2) makes people curious with a question or gap the reel really answers, (3) shows the mascot reacting with art drawn for this topic. One accent word, headline max 5 words, everything inside the 3:4 middle. Check it at phone-feed size (about 360 px wide). Save as `reels/<slug>/out/cover.png`.

**Stickers** can't be baked in. Never print a sticker box or "add the sticker" text in an image. Leave plain empty space and say which sticker to add in `caption.md`.

---

## 6. Captions, titles and hashtags

### 6.1 Instagram caption
```
[Hook line, the same idea as the reel's first line, one emoji at most]

[3 to 5 short lines explaining the idea in plain words]

[One-line takeaway]

Save this for later and send it to a friend who needs it.
Follow @{{handle}} for {{what we post}}.

[Source line with dates, if the reel uses facts]
[Disclaimer, if account.json has one]

{{hashtags.brand}} #[topic] #[topic] #[topic]
```
**Hashtags:** 3 to 5 (Instagram's limit is 5). Always include {{hashtags.brand}}. No #viral or #trending.

### 6.2 YouTube Shorts title
Under 70 characters, ends with #Shorts. Use the words people search for. No clickbait the reel doesn't deliver.

### 6.3 YouTube Shorts description
2 to 3 explaining lines, "Follow @{{handle}}…", sources with dates and links, the disclaimer (if any), 4 to 6 hashtags.

### 6.4 Bios
- **Instagram name field:** {{Name | keywords}}
- **Bio** (under 150 characters): {{bio}}
- **YouTube description:** {{channel description}}

---

## 7. Safety and accuracy rules

**If a piece of content breaks any rule here, it doesn't go out.**

### 7.1 The niche safe zone
{{What this niche must never do, and any regulator or platform rule. Examples: finance → no buy/sell calls (SEBI). Health/fitness → no diagnosis, no cure claims, "talk to a doctor". Food → allergy and food-safety care. Kids → nothing scary, no data collection.}}

**We do:** {{explain ideas, explain news calmly}}
**We never:** {{list}}

### 7.2 The disclaimer
`account.json` → `disclaimer`: "{{disclaimer or none}}". If set, it goes in the bio, every caption, the end card of every reel and the summary slide of every carousel. A disclaimer never makes a risky line safe. Rewrite the line.

### 7.3 Every fact needs a source and a date
- Fact-check every figure and factual claim with at least two sources. If they disagree, leave it out.
- Each reel and post folder has a `sources.md`: every number or claim, its link, the date it applies to.
- Fast-changing figures: use the latest official figure with its date. {{niche-specific freshness rule}}
- Preferred sources: {{official bodies for this niche}}

### 7.4 Brands and people
No logos. Mention companies by name only when needed. No real people's faces or likenesses.

### 7.5 Pre-publish checklist
- [ ] Nothing breaks the niche safe zone (7.1) in narration, screen or caption
- [ ] Every number has a date on screen and a line in `sources.md`
- [ ] Disclaimer (if any) is on the end card and in the caption
- [ ] No logos or real faces
- [ ] Read the caption aloud: no em-dashes, no semicolons, no formal phrasing
- [ ] Accent colour used for one thing per screen
- [ ] Text inside the safe zones for that channel
- [ ] First spoken line lands the loss or surprise
- [ ] Reel has its own designed cover, not a frame from the reel

---

## 8. Open items
- [TBD] Fill sections 0, 1 (niche words), 3.4, 3.6, 6.4 and 7 with the `new-account` skill.
