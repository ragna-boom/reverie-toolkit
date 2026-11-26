# Condition-Based Waiting

Flaky tests guess at timing with arbitrary delays, which creates races that pass on a fast machine and fail under load or in CI.

**Core principle:** wait for the actual condition you care about, not a guess about how long it takes.

## When to use

Use it when tests have arbitrary delays (`setTimeout`, `sleep`), are flaky, time out when run in parallel, or wait for async work to complete.

Do not use it when you are testing real timing behaviour (debounce, throttle intervals). If you must use a fixed timeout, document why.

## Core pattern

```js
// before: guessing
await new Promise(r => setTimeout(r, 50));

// after: waiting for the condition
await waitFor(() => getResult() !== undefined);
```

## Quick patterns

| Scenario | Pattern |
|---|---|
| Wait for an event | `waitFor(() => events.find(e => e.type === 'DONE'))` |
| Wait for state | `waitFor(() => machine.state === 'ready')` |
| Wait for count | `waitFor(() => items.length >= 5)` |
| Wait for a file | `waitFor(() => fs.existsSync(path))` |
| Compound condition | `waitFor(() => obj.ready && obj.value > 10)` |

## Implementation

```js
async function waitFor(condition, description, timeoutMs = 5000) {
  const startTime = Date.now();
  while (true) {
    const result = condition();
    if (result) return result;
    if (Date.now() - startTime > timeoutMs) {
      throw new Error(`Timeout waiting for ${description} after ${timeoutMs}ms`);
    }
    await new Promise(r => setTimeout(r, 10));
  }
}
```

[condition-based-waiting-example.ts](condition-based-waiting-example.ts) has the full version with domain helpers (`waitForEvent`, `waitForEventCount`, `waitForEventMatch`) from a real debugging session.

## Common mistakes

- Polling too fast (`setTimeout(check, 1)`) wastes CPU. Poll every 10 ms.
- No timeout means an infinite loop if the condition never comes true. Always fail with a clear message.
- Reading stale data: call the getter inside the loop, not before it.

## When a fixed timeout is correct

```js
await waitForEvent(manager, 'TOOL_STARTED');      // first, the triggering condition
await new Promise(r => setTimeout(r, 200));        // then, known timing: 2 ticks at 100ms
```

Requirements: wait for the trigger first, base the delay on known timing rather than a guess, and comment WHY.

## Real impact

In the session this came from: 15 flaky tests fixed across 3 files, pass rate 60% to 100%, 40% faster execution, no race conditions left.
