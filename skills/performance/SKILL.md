# Performance optimization

Evidence-led, using real-user signals to prioritise and browser traces to diagnose. Never claim a speedup without a measurement.

## How it works

1. If a page can run, take a field plus lab baseline before editing.
2. Prioritise poor real-user Core Web Vitals, then find the cause in a performance trace.
3. Change only the code connected to a measured bottleneck.
4. Re-run equivalent lab measurements and report before and after with conditions and uncertainty. Field verification stays pending until new user data arrives.

With no runnable page, static inspection findings are hypotheses, not measured regressions, and each one needs the command or workflow that would verify it.

## Starting budget

Total page weight under 1.5 MB, JS under 300 KB compressed, CSS under 100 KB, above-fold images under 500 KB, fonts under 100 KB, third-party under 200 KB. These are guardrails for a typical content page, not universal pass/fail; keep an existing project budget if one exists.

## Critical rendering path

TTFB under 800 ms. Brotli or gzip. HTTP/2 or 3. Edge-cached HTML. Preconnect to required origins, preload only resources whose late discovery shows in the trace. Defer non-critical CSS, keep critical CSS inline. `defer` or `async` scripts; `type=module` is deferred by default. Speculation Rules prerender only with a measured hit rate. Early Hints only for proven critical preloads.

## JavaScript

Split by route, component and feature. Import the single function, not the whole library. Virtualise lists over 100 items and use `content-visibility: auto` with `contain-intrinsic-size`.

## Images and fonts

AVIF then WebP then JPEG; PNG for transparency, SVG for icons. `srcset` with `sizes`, real `width` and `height`, `loading="lazy"` and `decoding="async"` below the fold. The LCP image gets `fetchpriority="high"`, `loading="eager"`, `decoding="sync"`. Fonts: `font-display: swap`, subset with `unicode-range`, prefer one variable file, preload the critical face, keep a system stack fallback.

## Caching

HTML `no-cache, must-revalidate`; hashed assets `max-age=31536000, immutable`; unhashed `max-age=86400, stale-while-revalidate=604800`; API `private, max-age=0`. Service workers: cache-first for static assets.

## Runtime

Batch reads then writes to avoid layout thrashing. Debounce scroll and resize handlers. Use `requestAnimationFrame`, not `setInterval`. Long lists get `content-visibility`. View Transitions for navigation swaps, same-document via `document.startViewTransition`, cross-document via `@view-transition { navigation: auto; }`, with `view-transition-name` for shared elements.

## Third-party

Async load, or delay until the widget enters the viewport. Prefer a facade: a static thumbnail and a play button that loads the embed on click.

## Measurement

| Metric | Kind | Meaning |
|---|---|---|
| LCP, INP, CLS at p75 | Field | real user outcome, use for pass/fail |
| LCP, CLS in a trace | Lab | reproducible diagnostic |
| TBT | Lab | main-thread blocking, rough INP proxy |
| FCP, Speed Index | Lab | loading diagnostics |

Report numbers, conditions (device, network, cache state, version) and the median of at least three runs, plus what is still unverified.

---

Compact working copy of the Freebuff account skill `performance` (web-quality-skills, MIT, v2.0). Its references MEASUREMENT.md and RUM.md stay in the skill.
