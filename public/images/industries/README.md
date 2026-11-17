# Industry illustrations — photography pending

Four original code-authored sector scenes provide distinct visual placeholders: a stepped mining/ore-handling scene, bridge/civil works, a manufacturing process line and grain storage/agro-processing. They are not photographs, technical specifications or depictions of Zieve projects, facilities or customers. No stock imagery was downloaded.

`src/config/industry-media.ts` maps sector slugs to media, independent fallback entries, alt descriptions, visible captions and object positions. Replace `industryMedia` entries with approved local photography (`kind: 'image'`) and an approval reference. Confirm accurate descriptions, rights and both desktop/mobile crops before release. Keep the illustration fallback mapping intact.

The frame reserves a 4:3 ratio. Next Image lazily optimises photographs; SVGs remain unoptimised vectors. A small vertical overscan supports ±10px desktop parallax without exposed edges or scaling. Missing media switches to the sector illustration, then to a named static placeholder if needed. No image URLs or company achievements have been fabricated.
