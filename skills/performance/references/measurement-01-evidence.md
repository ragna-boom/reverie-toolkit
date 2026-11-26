# Performance measurement: evidence and workflow

Part 1 of the measurement reference for [../SKILL.md](../SKILL.md).

## Keep the evidence types separate

| Evidence | What it represents | Best use |
|---|---|---|
| CrUX field data | Aggregated real Chrome users, rolling 28 days | Decide whether users have a Core Web Vitals problem |
| First-party RUM | Measurements from the site's own sessions | Segment and diagnose current production experience |
| DevTools performance trace | One observed session under stated conditions | Find LCP, INP, CLS, network and main-thread causes |
| Lighthouse lab run | A controlled synthetic navigation | Reproduce load problems and prevent regressions |
| Static inspection | Potential issues inferred from source | Form hypotheses when no page can run |

A `PerformanceObserver` result injected into one page is a single-session lab observation, not field data. It becomes RUM only when real users' measurements are reported and aggregated.

## Preferred low-friction route

With Chrome DevTools MCP:

1. Navigate to the exact route and state. Record whether it is public, authenticated, local or staging.
2. Record a reload trace with auto-stop (`performance_start_trace`). Note whether field scope is URL or origin.
3. Analyze only the failing or suspicious insights (`performance_analyze_insight`): LCPBreakdown, LCPDiscovery, DocumentLatency, RenderBlocking, ThirdParties.
4. Run the Lighthouse capabilities (`lighthouse_audit`) for Accessibility, SEO, Best Practices and Agentic Browsing. It excludes performance; do not use it as the performance path.
5. Re-run the same lab measurement after a fix. Field data will not reflect a new deploy immediately.

Use mobile conditions by default for a public site, add desktop when asked or when traffic justifies it, and test authenticated and unauthenticated states separately when they render differently.

With emulation, set viewport, network and CPU rate explicitly, confirm the reported conditions, and reset before the next profile. Lighthouse navigation mode reloads the page, so use snapshot mode when a reload would lose state; never run a navigation audit on an unsaved form.

## Token-efficient tool use

Start with one trace and one audit, not broad DOM, network, console and source dumps. Preserve large reports to files when the tool supports it and summarise only actionable failures. Drill into the few insights tied to a poor field metric. Filter and paginate network and console output. Take a text snapshot before a screenshot unless pixels matter.
