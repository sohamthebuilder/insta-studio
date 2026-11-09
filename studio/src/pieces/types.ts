import type { TEMPLATES } from "../templates/registry";

// A piece = one post, carousel or story set. Each slide picks a template from the registry
// and overrides its sample text with `props`. Images go in public/pieces/<slug>/.
export type Slide = { t: keyof typeof TEMPLATES; props?: Record<string, unknown> };
export type Piece = { slug: string; slides: Slide[] };
