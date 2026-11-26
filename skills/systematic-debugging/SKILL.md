# Systematic Debugging

Use for any bug, test failure, build failure, perf problem or unexpected behaviour. Core principle: always find the root cause before attempting fixes. A symptom fix is a failure.

## The Iron Law

No fixes without root cause investigation first. If phase 1 is not complete, you cannot propose a fix.

Use it especially when under time pressure, when "one quick fix" looks obvious, when earlier fixes did not work, or when you do not fully understand the issue. Skip it never.

## Phase 1 — Root cause investigation

1. Read error messages completely: stack traces, line numbers, paths, codes. They often contain the answer.
2. Reproduce consistently. If you cannot, gather data instead of guessing.
3. Check recent changes: diff, commits, new dependencies, config, environment.
4. In multi-component systems (CI to build to signing, API to service to database), instrument every boundary before proposing fixes: log what enters, what exits, and verify config propagation. Run once to see where it breaks, then investigate that component.
5. Trace the data flow backwards until you find where the bad value originates. Fix at the source.

## Phase 2 — Pattern analysis

Find a working example in the same codebase. Read the reference implementation completely, do not skim. List every difference between working and broken, however small. Understand its dependencies, settings and assumptions.

## Phase 3 — Hypothesis and testing

State one hypothesis clearly: X is the root cause because Y. Make the smallest possible change to test it, one variable at a time. If it works, go to phase 4. If not, form a new hypothesis; do not stack fixes. When you do not know, say so and research.

## Phase 4 — Implementation

1. Create the failing test case first: the simplest reproduction, automated where possible.
2. Implement one fix for the identified root cause. No "while I am here" refactors.
3. Verify: the test passes, nothing else broke, the issue is actually resolved.
4. If it fails, count attempts. Under three, return to phase 1 with the new information. At three or more, stop and question the architecture, not the symptom. Each fix revealing a new problem elsewhere is an architecture problem.

## Red flags that mean stop

Quick fix for now. Just try changing X. Several changes at once. Skip the test, verify manually. It is probably X. I do not fully understand but this might work. Proposing solutions before tracing data flow. One more attempt after two failures.

## Supporting techniques

- Root cause tracing: add stack traces and context before the dangerous operation, then walk up the call chain.
- Defense in depth: after finding the cause, validate at the entry point, the business logic, the environment guard and with debug instrumentation, so the bug becomes impossible.
- Condition-based waiting: replace arbitrary sleeps with polling for the actual condition, with a timeout and a clear message. Keep a real timeout only for genuine timing tests, and document why.

---

Compact working copy of the Freebuff account skill `systematic-debugging` (superpowers family). Its references root-cause-tracing.md, defense-in-depth.md, condition-based-waiting.md, condition-based-waiting-example.ts and find-polluter.sh stay in the skill.
