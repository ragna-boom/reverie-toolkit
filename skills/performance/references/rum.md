# First-party real-user monitoring

Read this only when the user wants to add, review or improve production RUM. Part of [../SKILL.md](../SKILL.md).

## Before changing the site

Telemetry touches production data and privacy. Reuse an existing analytics or RUM pipeline when possible. If a new endpoint, vendor, cookie or consent behaviour was not requested, propose it and get authorisation first.

Prefer the `web-vitals` library over hand-written `PerformanceObserver` code: it follows the metric lifecycle and browser edge cases used by Google's tooling. Use the attribution build only when the extra context will be reviewed, and allowlist specific fields.

## Minimal collection pattern

```js
import {onCLS, onINP, onLCP} from 'web-vitals';

function sendToRum({name, value, rating, id, navigationType}) {
  const body = JSON.stringify({
    name, value, rating, id, navigationType,
    path: location.pathname,
    release: window.APP_RELEASE
  });
  if (!navigator.sendBeacon?.('/rum', body)) {
    fetch('/rum', {method: 'POST', body, keepalive: true});
  }
}

onCLS(sendToRum);
onINP(sendToRum);
onLCP(sendToRum);
```

Adapt the payload to the existing backend. Never include query strings, user-entered text or DOM fragments. If you use the attribution build, send only explicit low-cardinality fields that fit the site's privacy model.

## Collection rules

- Record a stable release or experiment identifier so a regression can be tied to a change.
- Group by route template, not one bucket per URL.
- Keep device form factor, navigation type and coarse connection context when the privacy model allows.
- Sample deliberately and record the sampling rate; never compare cohorts with different sampling rules.
- Let the library report final values. `reportAllChanges` is for local debugging, not production telemetry.
- Handle consent and regional privacy through the site's existing policy.

## Aggregation and reporting

For each route or journey report the p75 of LCP, INP and CLS, the share of visits in good, needs-improvement and poor buckets, the sample count and time window, and the important segments (form factor, release, navigation type).

Never use an average as the pass/fail signal. All three p75 values must meet their good thresholds for a route to pass.

CrUX and first-party RUM can disagree because they cover different users, browsers, routes, sampling rules and time windows. Document that before calling either source wrong.

## Sources

- web-vitals library
- web.dev: measuring Web Vitals in the field, finding slow interactions in the field
