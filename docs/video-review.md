# Video implementation review

## Review method

The first implementation used five sampled frames per clip. On this revision, the on-screen content was inspected at three-second intervals across all five complete timelines (72 frames total). This is a review of visual frames and on-screen captions; it is not a full audio transcription or a claim that every instruction has been implemented.

| Supplied clip | Main on-screen advice | Implementation / scope |
|---|---|---|
| 1000865913.mp4 | Give permission to show off; make progress visible; let people express identity; make sharing look good | Custom universe names, sharable snapshot links, 1080×1350 downloadable taste cards; watched/read/listened statuses; saved-discovery progress. No fabricated achievements or inferred personality claims. |
| 1000865923.mp4 | Use established component/UI references and interface guidelines | SmoothUI carousel, theme, animated tags and expandable-card patterns inform the custom lightweight implementation. Semantic controls, screen-reader labels, keyboard/swipe carousel and reduced-motion rules. No claim that the React SmoothUI package was installed. |
| 1000865931.mp4 | Google Maps scraping kit and lead enrichment | Not implemented. RabbitHole searches film/book/music/TV catalogues, not local-business leads. Adding an unrelated lead scraper would not support the product. |
| 1000865958.mp4 | Twenty prelaunch security checks | Applicable controls below. Auth/database/upload controls remain out of scope because those systems are absent. |
| 1000865959.mp4 | Server validation, rate limiting/lockouts, password hashing, generic auth errors and trusted auth | Shared inputs are bounded/escaped; URLs are restricted; JSON parse errors have safe messages. There is no application login/password service. Search pacing is client-side convenience, not a server security boundary. |

## Security applicability

| Advice | State |
|---|---|
| Hide API keys / purge repository secrets | No private API keys are used; GitHub export excludes `.openai`, credentials and task files. |
| Use public database keys, RLS, server auth, record locking, field tampering controls | No database or account/record API exists in this version. Required when a backend is added. |
| Encrypt sensitive data | No sensitive personal fields are requested. Local saved preferences are not encrypted and should not be treated as secret. |
| Secure session cookies / password hashing / login limits | No app authentication or password store. Hosting has its own access controls. |
| Add bot protection / parameterize queries | No writable server endpoint or SQL queries. |
| Validate input / escape user content | Search terms, board names and shared records are length-bounded; strings are escaped; source prose is rendered as text. |
| Restrict uploads | There is no upload endpoint. |
| Trim API responses | Book requests select needed fields, catalogue limits cap results and records are normalized. |
| Add security headers / force HTTPS | CSP and referrer policy are set in HTML; existing publication is HTTPS. Full response-header configuration depends on the host and must be verified on any new deployment. |
| Scan dependencies | No runtime npm dependencies. Downloaded Lucide and League Spartan licences are included. |

## Remaining limits

- Browser visual QA and a complete browser→provider→UI run have not been performed.
- Apple returned zero results in a live probe; provider response coverage remains unverified.
- Existing source-based theme matching is not an AI recommendation engine.
- GitHub is a source copy, not a configured deployment pipeline.
