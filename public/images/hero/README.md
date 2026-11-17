# Hero media — approval pending

`industrial-placeholder.svg` is original code-authored geometric equipment linework created for this website's development. It is a schematic placeholder, not company photography, a product specification, a real facility or a completed project. Its palette follows the existing navy/amber/white tokens. No stock image was downloaded and no external URL was invented.

Replace `src/config/hero-media.ts` after obtaining rights-cleared industrial media. The right side should carry the equipment; leave negative space on the left for text. Verify both crops and contrast before approval. Suggested photography: at least 2400px wide landscape with a separate portrait crop when needed. Do not imply illustrative media depicts Zieve property.

- `kind: 'image'`: local `src`, optional `mobileSrc`, a truthful visible `caption`, approval/rights reference in `approval`, and desktop/mobile object positions. Next Image handles responsive optimisation and priority loading.
- `kind: 'video'`: local MP4/WebM `src`, required still `poster` and `mobilePoster`, approval/rights reference, caption and positions. Muted looping playback is restricted to desktop with no reduced-motion preference and no Save-Data request. A visible pause control is provided. Mobile and reduced-motion visitors receive only the still. The video source is not mounted for them. Playback is paused outside the viewport or in a hidden tab. No audio or external embeds.
- `kind: 'placeholder'`: current original SVG. It is intentionally unoptimised as a vector; no raster is generated.

The schematic remains underneath all media as a failure fallback. A failed configured image/video is replaced by the labelled placeholder. Keep the hero overlay and geometry; replace media through configuration rather than editing layout code.
