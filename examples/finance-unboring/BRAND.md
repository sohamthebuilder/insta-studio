# finance.unboring brand guide

**Status:** v0.5, 7 Nov 2026 (reel cover rule added). v0.4, 5 Nov 2026 (logo, bios, templates, YouTube banner, finance-social skill). Items marked **[TBD]** get settled at the next steps (avatar pick, template sheet).
**Who reads this:** anyone making content for @finance.unboring, people and Claude skills alike. When this guide and any other note disagree, this guide wins.

---

## 0. Who we are

**One line:** We explain money the way a friend would, with a tiny cartoon story, in under a minute.

**Audience:** Indians aged 15 to 30. Students, first jobbers, people with their first salary. They are smart, but nobody ever explained money to them in plain words.

**What makes us different:** No presenter, no stock tips, no shouting. Every idea becomes a little cartoon world (a classroom, a corner shop, a lake), and that world does the explaining.

**Tone in three words:** simple, warm, useful.

**Content pillars**

| Pillar | What it is | Example |
|---|---|---|
| Money Basics | One idea, explained with one analogy world | "What is the Sensex?" |
| Money Mistakes | A common habit that costs people money | "Paying only the minimum due on your card" |
| What It Means For You | An economy event explained calmly, after the dust settles. Never a race to post first | "The repo rate: why your EMI cares" |
| Quiz | A question hook, the answer in the reel | "₹1 lakh in an FD for 10 years. What's it really worth?" |

---

## 1. Voice and tone

### The rules
1. **Sound like a person explaining out loud to a friend.** Read every line aloud. If you wouldn't say it at a chai stall, rewrite it.
2. **Simple, human words only.** No complex phrases, no jargon without an explanation right after it.
3. **No em-dashes (—). No semicolons (;).** Use a full stop or a comma instead.
4. **No formal phrasing.** No "furthermore", "it is important to note", "one must".
5. **Short sentences.** Most lines under 15 words. One idea per sentence.
6. **Clear and useful.** Every reel and post leaves the viewer with one thing they now understand or can do.
7. **Talk to "you".** Use "you" and "your money", not "investors" or "individuals".
8. **Warm, never preachy.** We don't scold people for money mistakes. We've made them too.

### Words we don't use

| Don't say | Say instead |
|---|---|
| leverage, utilise | use |
| furthermore, moreover, additionally | and, also, plus |
| it is imperative / essential that | you need to |
| individuals, consumers | you, people |
| purchasing power erodes | your money buys less |
| in order to | to |
| commence | start |
| optimal | best |
| financial instruments | things like FDs, mutual funds |
| "guaranteed", "sure-shot", "multibagger" | never say these at all |

### Before and after

| Before | After |
|---|---|
| Inflation erodes the real value of your savings over time. | Prices go up every year. So the same money buys a bit less each time. |
| The repo rate is the rate at which the RBI lends to commercial banks; it influences lending rates. | The repo rate is what banks pay to borrow from the RBI. When it goes up, your loan usually costs more. |
| It is important to note that past performance does not guarantee future returns. | What happened before won't always happen again. |

### Jargon rule
When a real term is needed, **show the idea first, name it after**. "Your money grew 6%, but prices grew 5.5%. So you really grew 0.5%. That's called your **real return**."

---

## 2. Storytelling formula

Every reel follows the same eight beats. Times are for a 60 s reel (about 150 spoken words). For a 30 s reel, keep beats 1, 2, 5, 6 and 8 and aim for about 70 words.

| # | Beat | Time | What happens | Example (inflation reel) |
|---|---|---|---|---|
| 1 | **Hook** | 0 to 1.5 s | A moving picture plus one bold line. Never "Today we'll learn…" | "Your ₹100 just shrank. Nobody touched it." |
| 2 | **The world** | 1.5 to 8 s | Set up the analogy world and its characters | A corner shop, the Sharma bean family, a cloth bag |
| 3 | **The problem** | 8 to 20 s | Something goes wrong. Colours turn grey-blue | The same bag of onions costs more every visit |
| 4 | **The turn** | 20 to 30 s | "Then something changed…" Colours warm up | The price board on the wall starts to make sense |
| 5 | **The payoff** | 30 to 42 s | The one key number lands, in gold | 5.54% |
| 6 | **The real term** | 42 to 48 s | Name the idea in plain words | "That's inflation." |
| 7 | **The takeaway** | 48 to 54 s | One line the viewer keeps | "If your money grows slower than prices, you're getting poorer." |
| 8 | **Save, share, follow** | 54 to 60 s | Tailored to the topic, names finance dot unboring | "Save this for the next price hike. Follow finance dot unboring." |

**Rules for the world**
- One analogy world per reel. Every concept maps to one thing in it.
- One **token** object that leaves and comes back (a paper plane, a cloth bag, a chocolate raft).
- Never reuse a world from an earlier reel. Check the reel log first.
- Mini the bean is our recurring character and can appear in any world.

---

## 3. Visual identity

### 3.1 Logo and profile mark
**Chosen 5 Nov 2026: option C, "Big face".** Mini's head and sun hat fill a navy circle, with two mint sparkles and one small cream sparkle. Warm glow behind the head.

| File | Use |
|---|---|
| `assets/profile/profile-instagram-1080.png` | Instagram profile picture |
| `assets/profile/profile-youtube-800.png` | YouTube profile picture |
| `assets/avatar/avatar-C.png` | Master file, 1080×1080 |
| `studio/src/brand/Avatars.tsx` (option C) | The code it's drawn from. Change the art here, then re-render |

Options A (Mini waving) and B (Mini with a coin) are not the logo, but can appear inside content, for example on the Start highlight cover or a carousel.

Rules:
- **The mark:** Mini's big face on a navy circle. It reads at 110 px (Instagram profile size on a phone) and at 48 px.
- **Clear space:** keep empty space around the mark of **at least half the mark's height** on every side. No text, stickers or other art inside that space.
- **Minimum size:** 48 px tall on screen. Below that, use the face alone without the circle.
- **Wordmark:** "finance.unboring" in Baloo 2 ExtraBold, with "unboring" in gold. This is the only place gold is allowed on something other than the key number.
- **Don't:** stretch it, rotate it, recolour it, add shadows or outlines, or put it on a busy picture without the navy circle.

### 3.2 Palette

| Name | Hex | Role |
|---|---|---|
| Night navy | `#161E34` | Main background for cards, slides, covers, end card |
| Deep navy | `#1A1D2E` | Background behind scenes, banner edges |
| Cream | `#FFF7E6` | All main text and subtitles |
| Gold | `#FFE3A3` | **Accent. Only for the one key number or word per screen** |
| Mint | `#8FF0B4` | The @finance.unboring handle, and "going up" changes |
| Coral | `#FF8A80` | "Going down" changes only. Never for decoration |
| Warm glow | `#FFC861` → `#FF9A2A` | Light inside scenes in the good parts of the story |
| Gloom blue | `#7D8BA8` | Scene tint in the problem part of the story |
| Ink | `#2B1D18` | Character eyes and outlines |
| Cheek pink | `#FF8FA3` | Character cheeks only |

**Rules**
- One gold item per screen. If two things want to be gold, one of them isn't the key point.
- Cream on navy for all text. Never put text on gold, mint or coral.
- Colour tells the story: warm for good times, gloom blue for the problem, warm again at the turn.

### 3.3 Fonts

Two fonts, both free on Google Fonts.

- **Baloo 2** (weights 500, 700, 800): headlines, numbers, body text on cards. Rounded and friendly, and it supports Hindi if we ever need it.
- **Patrick Hand** (400, the only weight): reel subtitles and small handwritten notes inside scenes.

**Sizes on a 1080×1920 canvas** (reels, stories)

| Use | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Big number | Baloo 2 | 800 | 220 px | 1.0 |
| Hero word (reel cover headline, "the real term") | Baloo 2 | 800 | 120 px | 1.02 |
| Headline | Baloo 2 | 800 | 96 px | 1.05 |
| Sub-headline | Baloo 2 | 700 | 64 px | 1.15 |
| Body | Baloo 2 | 500 | 50 px | 1.3 |
| Subtitles | Patrick Hand | 400 | 64 px | 1.2 |
| Handle | Baloo 2 | 700 | 52 px | 1.0 |
| Source and disclaimer line | Baloo 2 | 500 | 30 px (never smaller) | 1.4 |

**On 1080×1350 (carousels):** multiply every size by 0.85. The source line stays at 30 px minimum.

**Text limits**
- Headline: 8 words max.
- Body: 25 words max per screen or slide.
- Max line width: 84% of the canvas width.

### 3.4 Charts and numbers
- **One number per screen.** It's the hero, in gold, at big-number size.
- **Every number carries its date**, right under it: "5.50% · RBI, 7 Oct 2026".
- **Rupees:** "₹" with no space, Indian grouping: ₹1,00,000. Say "₹1 lakh" or "₹2 crore" in headlines.
- **Percentages:** two decimals for official rates (5.54%), round in narration ("about five and a half percent").
- **Changes:** "▲ 0.25%" in mint, "▼ 1.2%" in coral.
- **Charts:** simple bars or one line. Max 4 bars. No 3D, no pie charts, no gridlines. Label the bars directly, no legend.
- **Rates like repo and CPI:** show the latest official figure with its date. Don't show old comparison values on screen.
- **Market data (Sensex, Nifty, stock prices):** can be from any date, recent or old, as long as it is verified with two or more sources and shown with its exact date. See section 7.

### 3.5 Characters and scenes
- Soft, flat storybook style, drawn in code. No photos, no AI images, no stock art.
- Round bean bodies, big eyes, pink cheeks. They blink and bob, so they always feel alive.
- One warm light source per scene. Gentle camera moves only.
- **Mini** is our mascot: small, curious, a little cheeky. Mini asks the questions the viewer is thinking.
- Mini never gives advice, never holds a stock chart, never says "buy".

### 3.6 Sound (reels)
- **Narrator:** Rameez (ElevenLabs, Indian-English accent), about 2.7 words a second.
- **Music:** playful pizzicato and marimba. It dips in the problem part and lifts at the payoff.
- **Effects:** 3 soft ones per reel, placed just after their key word.
- **Mix:** music and effects sit 16 to 17 dB under the voice.

---

## 4. Asset specs by channel

### 4.1 Instagram

| Asset | Size | Notes |
|---|---|---|
| Reel | 1080×1920, 9:16 | Keep text and faces out of the **bottom 420 px** (caption and buttons) and the **right 120 px** (like, comment, share icons). Top 220 px stays clear too. |
| Reel cover | 1080×1920 | The profile grid shows a **3:4 crop: the middle 1080×1440** (240 px cut from top and bottom). The headline and the key picture must sit inside that middle area. |
| Carousel | 1080×1350, 4:5 | 5 to 8 slides. Keep 60 px margins on all sides. |
| Single post | 1080×1350, 4:5 | Same template as a carousel cover. |
| Story | 1080×1920 | Keep the **top 250 px** and **bottom 340 px** clear (profile bar and reply box). |
| Highlight cover | 1080×1920 | Shown as a small circle. Put the icon in the centre, inside a **600 px circle**. Navy background, cream icon. |
| Profile picture | 1080×1080 | Shown as a circle at about 110 px. Use the profile mark. |

### 4.2 YouTube

| Asset | Size | Notes |
|---|---|---|
| Short | 1080×1920, 9:16 | Same safe zones as an IG reel. Keep under 60 s. |
| Profile picture | 800×800 | Shown as a circle at 98 px. Use the profile mark. |
| Channel banner | 2560×1440 | Everything important goes in the **safe middle area: 1546×423**. The rest is decoration that shows only on TVs. Max 6 MB. Ready: `assets/youtube-banner.jpg` (check copy with the safe area marked: `assets/youtube-banner-guides.png`). |
| Shorts title | under 70 characters | See section 6. |
| Shorts description | 3 to 6 short lines | See section 6. |

---

## 5. Templates

All templates are drawn in code with Remotion, so reels, carousels and stories always match.

- **See them all:** `templates/template-sheet.png`. Each one at full size is in `templates/png/`.
- **The code:** `studio/src/templates/` (`reel.tsx`, `carousel.tsx`, `story.tsx`, `highlight.tsx`). Shared pieces (fonts, background, gold, handle, safe zones) are in `studio/src/brand/`.
- **Re-render all of them:** `bash studio/render-templates.sh`. Add `--guides` to shade the safe zones in red (and the 3:4 grid crop in blue) for checking.
- The sample text in every template comes from reel #3 (real return). Swap it for each new piece.
- **To make a carousel, post or story set,** ask Claude for one. The `finance-social` skill writes the slide outline for your OK, then renders the images into `social/<slug>/` with a `caption.md` and a `sources.md`. Example: `social/inflation-recap/`.

### 5.1 Reels (1080×1920)

| Template | What it's for | Contents |
|---|---|---|
| **Reel cover** | Feed and grid thumbnail. **Every reel gets its own designed cover** (see the cover rule below) | Topic tag + curiosity headline (max 5 words) + Mini + art from the reel's topic, all inside the 3:4 middle area |
| **Hook card** | First 1.5 s | One bold line over a moving scene |
| **Text-line scene** | A short point with no drawing needed | One sub-headline line on navy, Mini reacting in the corner |
| **Big-number card** | The payoff | The number in gold at 220 px, a label above, the date and source below |
| **Analogy scene** | The story itself | The world, characters and the token. Built fresh for each reel |
| **"The real term" card** | Beat 6 | "This is called…" then the term in gold, then a one-line meaning in cream |
| **End card** | Last 6 s | Concept in one line, @finance.unboring in mint, "For education only. Not investment advice.", the source line with dates |

**Cover rule (every reel, set by the owner on 7 Nov 2026).** Never use a frame from the reel as the cover. Frames don't look appealing in the feed and give people no reason to open the reel. Each cover is made on purpose and does three jobs:
1. **States the topic.** The viewer can tell what the reel is about at a glance (the topic tag, for example "Muhurat trading").
2. **Makes people curious.** The headline is a question or a gap the reel answers, not a summary. It must be something the reel really delivers, so no clickbait.
3. **Shows our avatar and related graphics.** Mini is reacting to something, with art drawn for this topic. Don't reuse the template's sample coin unless the topic needs one.

The usual rules still apply: one gold word, no logos or real faces, no buy or sell hints, and everything important inside the 3:4 middle area. Check it at phone-feed size before sending. Save it as `<reel-folder>/out/cover.png` and deliver it with the reel.

### 5.2 Carousel (1080×1350)

| Template | Contents |
|---|---|
| **Cover slide** | Headline (max 8 words), Mini, a "swipe →" hint, the handle small at the bottom |
| **Explainer slide** | Slide number, one sub-headline, up to 25 words of body, one picture or one gold number |
| **Summary slide** | "In short:" plus 3 bullet points, "Save this. Share it with a friend.", handle, disclaimer, sources |

### 5.3 Stories (1080×1920)

| Template | Contents |
|---|---|
| **New reel teaser** | A frame from the reel, "New reel 👀", the handle |
| **Poll** | A question in big text, empty space for the poll sticker |
| **Quiz** | A question and a picture, empty space for the quiz sticker |
| **Ask us** | "Ask us anything about money", Mini looking curious, space marked for the question box |

Stickers can't be baked into an image, so they are added in the app. **Never print a sticker box or "add the sticker" text in an image.** The templates leave plain empty space, and the posting notes in `caption.md` say which sticker to add.

### 5.4 Highlight covers
Four covers, same style: navy background, a cream icon inside the centre circle. No text on the cover. The label is the highlight name you type in the app.

| Cover | Icon idea |
|---|---|
| **Start** | Mini waving |
| **Basics** | A small book |
| **News** | A newspaper |
| **Ask** | A question mark bubble |

---

## 6. Captions, titles and hashtags

All copy follows section 1. No em-dashes, no semicolons, sounds like a person.

### 6.1 Instagram caption

```
[Hook line, the same idea as the reel's first line, with one emoji at most]

[3 to 5 short lines explaining the idea in plain words]

[One-line takeaway]

Save this for later and send it to a friend who needs it.
Follow @finance.unboring for money, explained simply.

Data: [source], [date].
For education only. Not investment advice.

#financeunboring #[topic] #[topic] #[topic] #personalfinanceindia
```

**Example**
```
Your FD gave you 6%. You might have earned zero. 😶

Your bank pays you interest every year.
But prices also go up every year.
If prices go up almost as fast, your money barely grew.
What's left over is called your real return.

Real return = interest minus inflation.

Save this for later and send it to a friend who needs it.
Follow @finance.unboring for money, explained simply.

Data: RBI repo rate 5.50% (7 Oct 2026), MoSPI CPI 5.54% (Sep 2026).
For education only. Not investment advice.

#financeunboring #inflation #fixeddeposit #realreturn #personalfinanceindia
```

**Hashtags:** 3 to 5 per post (Instagram now limits posts to 5). Always include #financeunboring. Pick the rest from the topic. No generic tags like #viral or #trending.

### 6.2 YouTube Shorts title

- Under 70 characters, ends with #Shorts.
- Use the words people search for ("What is repo rate", "inflation explained").
- No clickbait the reel doesn't deliver.

Format: `[Search phrase] explained in 60 seconds #Shorts` or `[Hook as a question] #Shorts`

Example: `What is real return? Your FD explained #Shorts`

### 6.3 YouTube Shorts description

```
[2 to 3 lines explaining the idea in plain words]

Follow @finance.unboring for money, explained simply.

Sources:
[source 1, date, link]
[source 2, date, link]

For education only. Not investment advice.

#financeunboring #[topic] #[topic] #personalfinance
```

### 6.4 Bios

**Instagram**
- **Name field** (searchable, so it carries keywords): `Finance Unboring | Money Explained`
- **Bio** (under 150 characters):
```
Money, explained simply in 60-sec cartoons 🇮🇳
New reels every week. Save them for later.
For education only. Not investment advice.
```

**YouTube**
- **Channel name:** `Finance Unboring`
- **Handle:** `@finance.unboring`
- **Description:**
```
Money, explained simply. Every Short is a tiny cartoon story about one money idea, like inflation, the repo rate, SIPs or your FD's real return.

No jargon, no stock tips. Just the idea, explained the way a friend would.

New Shorts every week. Subscribe so you don't miss one.

For education only. Not investment advice.
```

---

## 7. Safety and accuracy rules

**This is the most important section. If a piece of content breaks any rule here, it doesn't go out.**

### 7.1 The SEBI safe zone
We are not SEBI-registered advisers. So we stay strictly in education.

**We do:**
- Explain money concepts (what is inflation, how a SIP works, what the repo rate is).
- Explain economy news and what it means in general (RBI decisions, CPI, the Budget).

**We never:**
- Give buy or sell calls on any stock, fund, crypto or anything else.
- Give price targets or say where a market or stock is "going".
- Promise or hint at returns ("you'll double your money", "guaranteed 12%").
- Use **stock or index data (Sensex, Nifty, share prices) that isn't verified.** Recent or old is fine, but every figure must match across two or more sources and carry its exact date. If the sources disagree, leave it out.
- Recommend a specific product, company, fund or app.
- Show past returns as a reason to invest.

**Note:** economic figures like the repo rate, CPI or GDP are not market prices. For these we show the latest official figure with its date.

### 7.2 The disclaimer
- "For education only. Not investment advice." goes in **the bio**, **every caption**, and **the end card** of every reel and the summary slide of every carousel.
- **The disclaimer alone doesn't make advice safe.** If a line sounds like advice, rewrite the line. Don't lean on the disclaimer.

### 7.3 Every number needs a source and a date
- Fact-check every figure with at least two sources. If the sources disagree, don't show the number.
- Each reel and post folder has a `sources.md`: every number, its source link, and the date it applies to.
- The caption names the source and date where it fits.
- Prefer official sources: RBI, MoSPI, SEBI, NSE, BSE, PIB, the Union Budget site.

### 7.4 Companies and brands
- **No company logos** (Jio, PhonePe, banks, apps, anyone). Not on screen, not in the art, not in thumbnails.
- Mention companies by name only, and only when it's needed to explain the idea.
- No real people's faces or likenesses.

### 7.5 Pre-publish checklist
Tick every box before posting.

- [ ] No buy, sell, target or return promise anywhere (narration, screen, caption)
- [ ] Market data (if any) is verified with two or more sources and dated
- [ ] Every number has a date on screen and a line in `sources.md`
- [ ] Disclaimer is on the end card and in the caption
- [ ] No company logos or real faces
- [ ] Read the caption aloud: no em-dashes, no semicolons, no formal phrasing
- [ ] Gold is used for one thing per screen only
- [ ] Text sits inside the safe zones for that channel
- [ ] Reel has its own designed cover (topic, curiosity, Mini and topic art), not a frame from the reel

---

## 8. Open items

- ~~Reel #1 used fresh Sensex figures, which broke the old 3-month rule.~~ Settled 5 Nov 2026: the owner replaced the 3-month rule with "verified and dated" (7.1), so reel #1 is fine as long as its figures were verified.
