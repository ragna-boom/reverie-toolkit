# Root Cause Tracing

Bugs often surface deep in the call stack (git init in the wrong directory, a file in the wrong place, a database opened with the wrong path). The instinct is to fix where the error appears; that treats a symptom.

**Core principle:** trace backward through the call chain to the original trigger, then fix at the source.

## When to use

- The error happens deep in execution, not at the entry point.
- The stack trace shows a long call chain.
- It is unclear where invalid data originated.
- You need to find which test or code path triggers the problem.

## The tracing process

1. **Observe the symptom.** Example: `git init failed in ~/project/packages/core`.
2. **Find the immediate cause.** `await execFileAsync('git', ['init'], { cwd: projectDir })`.
3. **Ask what called it.** `WorktreeManager.createSessionWorktree` was called by `Session.initializeWorkspace`, called by `Session.create`, called by a test inside `Project.create`.
4. **Keep tracing up and check the values.** `projectDir` was an empty string, and an empty string as `cwd` resolves to `process.cwd()` — the source directory.
5. **Find the original trigger.** `setupCoreTest()` returns `{ tempDir: '' }`, and the test read `context.tempDir` before `beforeEach` ran.

## Adding stack traces

When manual tracing fails, instrument before the dangerous operation, not after it fails:

```js
const stack = new Error().stack;
console.error('DEBUG git init:', { directory, cwd: process.cwd(), nodeEnv: process.env.NODE_ENV, stack });
```

Use `console.error` in tests, because a logger may be suppressed. Capture with `npm test 2>&1 | grep 'DEBUG git init'` and look for the test file and line that triggers the call, then for the common pattern (same test, same parameter, same environment).

## Finding which test causes pollution

If a file or directory appears during the test run but you do not know which test creates it, run the bisection script `find-polluter.sh`:

```bash
bash ./find-polluter.sh '.git' 'src/**/*.test.ts'
```

It runs test files one by one and stops at the first polluter, printing the test name and the pollution it created.

## Real example

Symptom: `.git` created in `packages/core/`. Chain: `git init` in `process.cwd()` because `projectDir` was empty, passed down from `Session.create()`, passed an empty string by a test that read `context.tempDir` before setup. Root cause: top-level initialisation reading a value that does not exist yet. Fix: make `tempDir` a getter that throws when accessed too early, plus defence in depth at every layer.

**Never fix only where the error appears.** Trace to the origin, fix there, then add validation at each layer so the bug becomes impossible.
