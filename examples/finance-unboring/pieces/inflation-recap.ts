import type { Piece } from "./types";

// Test piece: a 6-slide carousel recap of reel #2 "What is inflation?" (inflation-basket).
// Frames from that reel are in public/pieces/inflation-recap/. Figures: see social/inflation-recap/sources.md.
const IMG = "pieces/inflation-recap";
const piece: Piece = {
  slug: "inflation-recap",
  slides: [
    { t: "carousel-01-cover", props: { tag: "Money Basics", before: "Why does your ₹100 buy ", gold: "less", after: " every year?" } },
    { t: "carousel-02-explainer", props: { page: "2/6", title: "Onions almost doubled", body: "A kilo of onions now costs ₹52.70. That's almost double what it cost a year ago.", image: `${IMG}/f60.png`, imageY: 280, source: "Onion price · Consumer Affairs data via news reports, 16 Oct 2026" } },
    { t: "carousel-02-explainer", props: { page: "3/6", title: "Meet the Sharma bag", body: "Rice, onions, milk, bus fare, school fees. Everything an average family buys in a month.", image: `${IMG}/f300.png`, imageY: 470, source: "" } },
    { t: "carousel-02-explainer", props: { page: "4/6", title: "Same bag, more money", body: "Say the bag cost ₹1,000 last year. Now the same bag costs ₹1,055. That rise is inflation.", image: `${IMG}/f700.png`, imageY: 150, source: "An example to show the idea" } },
    { t: "carousel-02-explainer", props: { page: "5/6", title: "The real number", body: "The government prices this bag across India every month. That's the Consumer Price Index, or CPI. In September it was:", value: "5.54%", source: "CPI inflation · MoSPI, Sep 2026 (out 12 Oct 2026)" } },
    { t: "carousel-03-summary", props: { points: ["Inflation is how fast prices go up.", "The CPI tracks an average family's shopping bag.", "So your ₹100 buys a bit less every year."], sources: "CPI 5.54% (MoSPI, Sep 2026) · Onion ₹52.70/kg (Consumer Affairs via news, 16 Oct 2026)" } },
  ],
};
export default piece;
