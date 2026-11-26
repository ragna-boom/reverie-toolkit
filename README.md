# RÊVERIE Toolkit

One repo that holds **every skill, agent, tool and source repo** used to build *RÊVERIE* — a five-chapter, scroll-driven dreamcore 3D experience (Three.js r170 + GSAP 3.12.5 + Lenis 1.1.0).

> A working library, not a gallery. Read the file you need before a build, don't read the whole thing.

## Contents

```
skills/
  awwwards-3d/            SKILL.md + references index  — the cinematic 3D playbook
  3d-web-build-playbook/  SKILL.md + repos.md          — the 8-phase build + full skill index
  performance/            SKILL.md                     — evidence-led web performance
  systematic-debugging/   SKILL.md                     — root cause before fixes
agents/
  3d-web-pack.md          6 layer agents + 4 workflow skills (roster + links)
tools/
  STACK.md                every library, CLI, asset pipeline and AI 3D tool used
repos/
  SOURCES.md              the external repos this toolkit is distilled from
```

## Skills

| Skill | Use it when | What it gives you |
|---|---|---|
| [awwwards-3d](skills/awwwards-3d/SKILL.md) | A premium scroll-driven 3D site | Locked stack, archetypes, 5-step build, polish order, 11 hard rules, perf audit |
| [3d-web-build-playbook](skills/3d-web-build-playbook/SKILL.md) | Any 3D/WebGL build or redesign | 8 phases: architect → scaffold → scene → look → motion → assets → perf → QA |
| [3d-web-build-playbook/repos.md](skills/3d-web-build-playbook/repos.md) | You know the problem, not the file | 24 Three.js skills + 6 agents + 4 workflows, each with its job |
| [performance](skills/performance/SKILL.md) | "it's slow", audits, before/after numbers | Budgets, critical path, images/fonts/caching, runtime jank, measurement honesty |
| [systematic-debugging](skills/systematic-debugging/SKILL.md) | Any bug, test failure, weird behaviour | The Iron Law, 4 phases, evidence at layer boundaries, 3-fix architecture stop |

## Agents

[agents/3d-web-pack.md](agents/3d-web-pack.md) lists the six layer agents (architect, r3f engineer, shader artist, motion choreographer, perf auditor, asset pipeline engineer) that hand off in order, plus the four guided workflow skills.

## Tools

[tools/STACK.md](tools/STACK.md) — three, gsap, lenis, EffectComposer/UnrealBloomPass, gltf-transform, gltfpack, gltfjsx, Draco/KTX2/meshopt, Poly Haven, Meshy/Tripo/Rodin/Spline, Lighthouse/CrUX/Spector/stats-gl.

## Source repos

[repos/SOURCES.md](repos/SOURCES.md) — `cesartevisual/threejs-skills`, `skinnye/3d-web-pack`, `tsogjavklann/awwwards-3d`, plus the Freebuff account skills these files were copied from.

## How to use

1. Before any 3D request, read `3d-web-build-playbook/SKILL.md` for the phase order.
2. If the look must be premium, read `awwwards-3d/SKILL.md` (aesthetics > geometry, lerp everything, polish order).
3. Reuse the skill texts as-is — each has YAML frontmatter, so it also works as an Agent Skill (drop the folder into a `skills/` directory).
4. When something breaks, open `systematic-debugging` before touching code.
5. When someone says "slow", open `performance` and get a number first.

## RÊVERIE itself

Built with this toolkit: single-file `reverie.html`, one CatmullRom camera path through five stations (Dream Entrance → Floating Garden → Cloud Kingdom → Celestial Room → The Final Dream), lerped palettes/fog/bloom per chapter, `svh`-locked scroll length for mobile Chrome, budget-aware quality tiers, tap-only raycasting, reduced-motion path.

## Licence

The skill texts in `skills/performance` and `skills/systematic-debugging` come from their upstream authors (see frontmatter and `repos/SOURCES.md`); keep their licence and attribution. `awwwards-3d` and `3d-web-build-playbook` are personal working notes distilled from public repos — credit the repos they summarise.
