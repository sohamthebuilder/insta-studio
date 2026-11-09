import React from "react";
import { Still } from "remotion";
import { AvatarSheet, AvatarStill } from "./brand/Avatars";
import { TEMPLATES, TemplateStill } from "./templates/registry";
import { PIECES } from "./pieces";

// Brand studio: stills for the account's brand kit (everything brand-specific is in account.json).
// Render one:  npx remotion still src/index.ts <id> out.png --props='{"guides":true}'
export const RemotionRoot: React.FC = () => (
  <>
    <Still id="AvatarSheet" component={AvatarSheet} width={1920} height={1080} />
    <Still id="AvatarA" component={AvatarStill} width={1080} height={1080} defaultProps={{ id: "A" as const }} />
    <Still id="AvatarB" component={AvatarStill} width={1080} height={1080} defaultProps={{ id: "B" as const }} />
    <Still id="AvatarC" component={AvatarStill} width={1080} height={1080} defaultProps={{ id: "C" as const }} />
    {Object.entries(TEMPLATES).map(([name, t]) => (
      <Still key={name} id={name} component={TemplateStill} width={t.w} height={t.h} defaultProps={{ name, guides: false }} />
    ))}
    {PIECES.flatMap((p) =>
      p.slides.map((sl, i) => {
        const t = TEMPLATES[sl.t];
        const id = `${p.slug}--${String(i + 1).padStart(2, "0")}`;
        return <Still key={id} id={id} component={TemplateStill} width={t.w} height={t.h} defaultProps={{ name: sl.t, guides: false, props: sl.props ?? {} }} />;
      })
    )}
  </>
);
