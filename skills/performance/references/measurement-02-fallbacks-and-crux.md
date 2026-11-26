# Performance measurement: fallbacks, CrUX and reporting

Part 2 of the measurement reference for [../SKILL.md](../SKILL.md). See also [measurement-01-evidence.md](measurement-01-evidence.md).

## Fallbacks when DevTools tooling is unavailable

Use the first available option; never block an audit on optional setup.

1. **Lighthouse CLI** for lab data, pinned to the project's compatible version. Keep the JSON for comparison and avoid installing a permanent dependency unless asked.
2. **PageSpeed Insights web UI** for a public URL: zero setup, gives lab diagnostics plus available CrUX field data.
3. **CrUX Vis** when trend history matters and the URL or origin is eligible.
4. **CrUX API or History API** for automation (free, needs a Google Cloud key; never make a key a prerequisite).
5. **Static inspection** when nothing can run: label every finding a hypothesis and give the exact measurement needed to verify it.

## Reading CrUX correctly

- Prefer page-level data for the audited URL. If only origin data exists, label it origin scope: context, not proof for that route.
- Compare p75 against the Core Web Vitals threshold and include the percentage of good experiences when available.
- Keep phone and desktop data separate; never combine form factors to answer a device-specific question.
- Missing CrUX data means **unavailable**, never passing. Localhost, staging, new, private and low-traffic pages usually have no record.
- CrUX is aggregated and delayed: use it to prioritise, not to verify a deploy from minutes ago.

## Repeatable lab comparisons

Record the final URL and page state, browser and tool version, viewport or form factor, CPU and network throttling, cold or warm cache, and authentication/consent/experiment state.

For any headline lab metric, run at least three equivalent navigations and report the median plus range. Never compare a single local trace directly with the CrUX p75.

Use metric values as evidence. A Lighthouse score is a diagnostic summary whose weighting can change between versions.

## Reconciling lab and field

| Field | Lab | Interpretation |
|---|---|---|
| Poor | Poor | Reproducible user problem; fix the dominant bottleneck |
| Poor | Good | Local run missed real conditions; segment RUM, test real devices, routes and cache states |
| Good | Poor | The synthetic cold/throttled case is fragile, but do not claim users are failing |
| Unavailable | Any | Use lab for diagnosis and recommend RUM if production impact matters |

## Compact audit output

Start with an evidence table:

| Signal | Scope and conditions | Baseline | After | Source |
|---|---|---|---|---|
| LCP | URL, phone, p75/28 days | 3.1s | pending field window | CrUX |
| LCP | URL, mobile lab, cold cache, median of 3 | 3.8s | 2.6s | DevTools trace |

Then separate: measured failures, trace-backed causes, source-code hypotheses, fixes made or recommended, verification status and remaining uncertainty.

## Sources

- Chrome DevTools MCP tool reference
- Chrome UX Report API
- web.dev: measuring Web Vitals, field measurement best practices
- PageSpeed Insights API
