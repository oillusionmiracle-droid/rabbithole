# RabbitHole — redesign

A mobile-first cultural discovery app joining Open Library, TVmaze and Apple's Search API. Serve `dist/` over HTTPS. Existing saved boards and original snapshot links remain compatible.

## Experience

- Media-led dashboard with an original orbital identity; the original Pip mascot and orbital placeholder removed. The user-supplied black/white rabbit logos and lavender app icon are used unchanged.
- Light and dark colour modes, system preference on first visit, saved local override.
- Swipeable and keyboard-operable featured threads; explicit next/previous controls and screen-reader announcements. No forced autoplay.
- Animated segmented filters, theme tags, expanding detail dialog, loading skeletons, reduced-motion fallback.
- Search across film, book, album and TV catalogues, with caching, timeout handling and partial results.
- Save/remove favourites, name your universe, mark films watched, books read or albums listened; view actual exploration progress; export a 1080×1350 taste-card PNG, share a board snapshot link.
- Original generated cosmic artwork is explicitly labelled as thematic artwork, not an official Interstellar still.

## Palette sampled from the supplied reference

Sun Glare `#DAFF02`, Exuberant Orange `#FE572A`, Blue Violet `#685BC7`, Cloud Dancer `#F3F0EB`, Darkest Hour `#201E1F`. These are sampled screen RGB approximations, not official Pantone colour conversions.

Typography: self-hosted League Spartan, with system fallbacks. It follows the bold Porter direction from the supplied reference sheet; it is not the exact Porter font. Its SIL Open Font License is included. Icons are downloaded Lucide SVGs, with the upstream ISC licence in `dist/assets/icons/LICENSE`.

## References reviewed

- SmoothUI: Coverflow Carousel, Theme Toggle, Animated Tags, Expandable Cards, component index. Patterns adapted to this app's existing lightweight code; this does not claim installation of the React SmoothUI package.
- Inspora: Web/Motion galleries, tabs animation by @marcelkargul, Same element new position by @shawn_kel, Visual Exploration by yahyavision. Text/metadata were readable; the motion video's download returned HTTP 403, so its timing was not visually verified.
- Supplied 1000865913.mp4: identity and shareable artefacts → custom-named universe + downloadable taste card.
- Supplied 1000865923.mp4: use established UI component patterns and accessibility → carousel, theme controls, semantic buttons/dialog and focus states.
- Supplied 1000865931.mp4: scraper workflow reference. No scraping/enrichment pipeline is added; the app uses documented catalogue APIs.
- Supplied 1000865958.mp4 and 1000865959.mp4: validation, secret handling, safe error messages and security boundaries. This browser-local app has no login, database, upload endpoint or private API key. Those server-side recommendations do not apply here.

## Sharing and security

Shared content is length-bounded and normalized, all strings are escaped, links and covers are restricted to provider hostnames, no innerHTML receives raw provider prose. A restrictive CSP prevents object/frame embedding, arbitrary script sources and inline event handlers. Client search pacing reduces accidental repeat calls; it is not a substitute for server-side rate limiting in a future backend. Boards and appearance remain browser-local. A board snapshot is readable to anyone with access to the site and its link. Hosting access is unchanged.

## Verification

JavaScript syntax checks and functional integration checks with simulated responses passed: light/dark persistence, saved boards, filters, carousel, taste-card drawing, sharing/import round-trip, cross-catalogue discovery, partial provider failure and rejection of malicious shared links. Live HTTP probes returned Open Library and TVmaze JSON. Apple returned an empty result set for the test query; live Apple result coverage remains unverified. Browser visual/end-to-end QA was unavailable because the supported control-browser skill is not present.

## GitHub and local use

Repository: https://github.com/oillusionmiracle-droid/rabbithole

The complete app is in `dist/`, including artwork, supplied logos, fonts and icon licences. Run locally with `python3 -m http.server 8000 --directory dist`, then open http://localhost:8000. Deploy the `dist` folder to an HTTPS static host. No private credentials or build step are needed.

Run `node tests/functional.cjs` for functional checks. These simulate catalogue responses and are not browser visual tests. Catalogue availability and permissions still depend on each provider.

The uploaded brand originals are copied without changing their pixels. Black is used on light backgrounds, white on dark, and the supplied lavender icon is used as the favicon and Apple touch icon.

See `docs/video-review.md` for exactly what was reviewed and what applies to this app. The current hosted app uses Sites; pushing to GitHub does not automatically link GitHub changes back to that hosting provider.
