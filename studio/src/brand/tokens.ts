// Brand colours. Source of truth: account.json "colors" (and BRAND.md section 3.2 for the roles).
// bg: cards and covers · bgDeep: behind scenes · text: all text · accent: the ONE key word/number per screen
// accentDark: accent on light backgrounds · accent2: the handle and "going up" · down: "going down" only
// warm1/warm2: scene light in good moments · gloom: scene tint in the problem part · ink: eyes · cheek: cheeks
import { ACCOUNT } from "./account";

export const COLORS = { ...ACCOUNT.colors, mascot: ACCOUNT.mascot.body } as const;
