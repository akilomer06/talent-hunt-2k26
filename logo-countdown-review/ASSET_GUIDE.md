# Asset guide

All editable paths are in `src/data/siteData.ts`. Paths begin with `/assets/` and correspond to files under `public/assets/`. Rebuild after replacing files. Preserve original supplied assets and aspect ratios. At the user's request, the Crescent logo uses a monochrome CSS presentation on dark surfaces. The registration QR was recreated losslessly from the exact decoded brochure URL and verified independently; keep its payload and clear quiet zone intact.

| Asset                    | Current / suggested file                                     | State and requirements                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Event logo               | `public/assets/logos/talent-hunt.png`                        | Original supplied PNG preserved for reference alongside its JPEG. The website header, intro, and footer use the native BrandWordmark component; the favicon uses talent-hunt-mark.svg.                                                                                                 |
| College logo             | `public/assets/logos/crescent.png`                           | Supplied original wide PNG, unchanged. Preserve approximately 3.62:1 ratio. A monochrome CSS treatment with screen blending removes the visible white rectangle on dark surfaces; the source asset remains unchanged.                                                                  |
| CSEA logo                | `public/assets/logos/csea.png`                               | Supplied original PNG, converted to transparent RGBA format. Footer, contain sizing.                                                                                                                                                                                                   |
| ACM logo                 | `public/assets/logos/acm.png`                                | Official square PNG format converted from WebP. Footer, contain sizing.                                                                                                                                                                                                                |
| Brochure reference       | `public/assets/documents/brochure-qr.jpg`                    | Updated supplied 1024 × 1536 JPEG with registration QR, unchanged. The “View Official Brochure” action opens this image. It is not mislabeled as a PDF.                                                                                                                                |
| Downloadable brochure    | `public/assets/documents/talent-hunt-2k26.pdf`               | Not supplied. Set `assets.brochurePdf` after adding the original PDF. The Download Brochure action then appears in home/footer. PDF must remain unmodified.                                                                                                                            |
| Registration QR          | `public/assets/registration/official-qr.png`                 | Clean 370 × 370 lossless PNG with a four-module quiet zone. It encodes exactly the URL decoded from the updated brochure and was independently decoded to verify the match. Both QR and button require successful image loading. A real-phone scan remains an additional device check. |
| Default social preview   | `public/assets/social/default.jpg`                           | Not supplied. Set `assets.defaultSocial` only to supplied artwork. Suggested 1200 × 630, with safe text margins. No fabricated logo/social artwork.                                                                                                                                    |
| Event social preview     | `public/assets/social/<event-slug>.jpg`                      | Optional. Set each event's `socialImage`. Falls back to the supplied default when absent; otherwise image metadata is omitted.                                                                                                                                                         |
| Event decorative artwork | `public/assets/events/<event-slug>.webp`                     | Optional. Set event `artwork`. Suggested 1200 × 900 with subject in central safe area; responsive card crops apply to decorative images only. Default SVG graphics are original decorations, not official logos.                                                                       |
| Intro sound              | `public/assets/audio/intro.mp3`                              | Optional. Set `assets.introAudio`. No autoplay; toggle appears only for an existing asset. Confirm rights and keep volume restrained. A missing/unplayable file never blocks access.                                                                                                   |
| Favicon                  | `assets.favicon` currently points to the supplied event JPEG | Uses the actual official asset. If replacing with official PNG/ICO, update the MIME type in `scripts/prerender.mjs` as well as the central path.                                                                                                                                       |

## Fonts

Fontsource packages bundle local Barlow regular/medium/semibold and Barlow Condensed semibold/bold/extra-bold. No Google Fonts HTTP calls. Original SIL OFL licences are copied from the installed font packages to `public/licenses` and `dist/licenses` during the build.

- [Barlow information and licence](https://fontsource.org/fonts/barlow/about)
- [Barlow Condensed information and licence](https://fontsource.org/fonts/barlow-condensed/about)
- Local licences: `public/licenses/barlow-OFL.txt`, `public/licenses/barlow-condensed-OFL.txt`.

## Missing-asset behavior

Local asset existence is checked at build time through Vite's asset glob. Logo/image load failures render a graceful fallback or remove optional media. Event title text remains available if a logo is missing. Brochure actions fall back to the supplied JPEG when the PDF is absent; if neither exists, a non-interactive availability message appears. Registration actions additionally require successful QR loading. Missing audio/social files are hidden. This site does not fetch arbitrary external media.

## Replacement procedure

1. Keep an archival copy of the supplied original.
2. Add the file at the documented path without altering official marks or QR content.
3. Update its path in `siteData.ts`; never rename competition slugs just to rename artwork.
4. Run `npm run verify` and `npm run test:browser`.
5. Review phone/desktop sizing and physically scan a supplied QR. Confirm all social previews after the deployment origin is configured.
