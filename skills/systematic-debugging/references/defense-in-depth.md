# Defense in Depth

When a bug was caused by invalid data, one validation point feels sufficient, but a single check can be bypassed by another code path, a refactor or a mock.

**Core principle:** validate at every layer the data passes through, so the bug becomes structurally impossible.

## Why multiple layers

Different layers catch different cases: entry validation catches most bugs, business logic catches edge cases, environment guards prevent context-specific danger, and debug logging helps when the others fail.

## The four layers

**1. Entry point validation** — reject obviously invalid input at the boundary.

```js
if (!workingDirectory || workingDirectory.trim() === '') throw new Error('workingDirectory cannot be empty');
if (!existsSync(workingDirectory)) throw new Error(`does not exist: ${workingDirectory}`);
if (!statSync(workingDirectory).isDirectory()) throw new Error(`not a directory: ${workingDirectory}`);
```

**2. Business logic validation** — make sure the value makes sense for this operation.

```js
if (!projectDir) throw new Error('projectDir required for workspace initialization');
```

**3. Environment guards** — forbid dangerous operations in specific contexts.

```js
if (process.env.NODE_ENV === 'test') {
  const normalized = normalize(resolve(directory));
  const tmpDir = normalize(resolve(tmpdir()));
  if (!normalized.startsWith(tmpDir)) throw new Error(`Refusing git init outside temp dir during tests: ${directory}`);
}
```

**4. Debug instrumentation** — capture context for forensics, including `new Error().stack`, directory, cwd and the immediate inputs.

## Applying the pattern

1. Trace the data flow: where does the bad value originate, where is it used?
2. Map every checkpoint the data passes through.
3. Add validation at each layer: entry, business, environment, debug.
4. Test each layer by trying to bypass layer 1 and confirming layer 2 catches it.

## Worked example

Bug: an empty `projectDir` made `git init` run in the source tree. Data flow: test setup produced `''` → `Project.create(name, '')` → `WorkspaceManager.createWorkspace('')` → `git init` in `process.cwd()`.

Four layers added: `Project.create` validates not empty, exists, is a directory; `WorkspaceManager` validates not empty; `WorktreeManager` refuses `git init` outside tmpdir while testing; a stack trace is logged before `git init`. Result: 1847 tests passing and the bug impossible to reproduce.

All four were necessary: different code paths bypassed entry validation, mocks bypassed business logic, platform edge cases needed environment guards, and the logging exposed structural misuse. **Do not stop at one validation point.**
