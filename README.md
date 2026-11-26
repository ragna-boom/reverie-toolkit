# RÊVERIE Toolkit

One repo that holds **every skill, agent, tool and source repo** used to build *RÊVERIE* — a five-chapter, scroll-driven dreamcore 3D experience (Three.js r170 + GSAP 3.12.5 + Lenis 1.1.0).

> A working library, not a gallery. Read the file you need before a build, not the whole thing.

## Contents

```
skills/
  awwwards-3d/             the cinematic 3D playbook
  3d-web-build-playbook/   8-phase build + repos.md full index
  performance/             evidence-led web performance
  systematic-debugging/    root cause before fixes
agents/
  3d-web-pack.md           6 layer agents + 4 workflow skills
tools/
  STACK.md                 every library, CLI and asset/AI tool
repos/
  SOURCES.md               the external repos this is distilled from
```

## Skills

| Skill | Use it when | What it gives you |
|---|---|---|
| [awwwards-3d](skills/awwwards-3d/SKILL.md) | a premium scroll-driven 3D site | locked stack, import map, archetypes, polish order, 11 hard rules |
| [3d-web-build-playbook](skills/3d-web-build-playbook/SKILL.md) | any 3D/WebGL build or redesign | architect, scaffold, scene, look, motion, assets, perf, quality gate |
| [repos.md](skills/3d-web-build-playbook/repos.md) | you know the problem, not the file | 24 Three.js skills + 6 agents + 4 workflows, each with its job |
| [performance](skills/performance/SKILL.md) | "it is slow", audits, before/after numbers | budgets, critical path, images/fonts/caching, runtime jank, honest measurement |
| [systematic-debugging](skills/systematic-debugging/SKILL.md) | any bug, test failure, odd behaviour | the Iron Law, 4 phases, boundary evidence, 3-fix architecture stop |

## Agents

[agents/3d-web-pack.md](agents/3d-web-pack.md) — the six layer agents (architect, R3F engineer, shader artist, motion choreographer, perf auditor, asset pipeline engineer) and the four guided workflow skills.

## Tools

[tools/STACK.md](tools/STACK.md) — three, gsap, lenis, EffectComposer and UnrealBloomPass, gltf-transform, gltfpack, gltfjsx, Draco/KTX2/meshopt, Poly Haven, Meshy/Tripo/Rodin/Spline, Lighthouse/CrUX/Spector/stats-gl.

## Source repos

[repos/SOURCES.md](repos/SOURCES.md) — `cesartevisual/threejs-skills`, `skinnye/3d-web-pack`, `tsogjavklann/awwwards-3d`, plus the Freebuff account skills these files were copied from.

## How to use

1. Before any 3D request, read `skills/3d-web-build-playbook/SKILL.md` for the phase order.
2. If the look must be premium, read `skills/awwwards-3d/SKILL.md`: aesthetics over geometry, lerp everything, layer the polish in order.
3. These are compact working copies, not the full originals. Each one keeps every operative rule and links to its upstream for the deep detail. The full texts stay in the Freebuff account skills, so they are available in every chat.
4. To reuse one as an Agent Skill, add frontmatter (`name`, `description`) above the first heading and drop the folder into a `skills/` directory.
5. When something breaks, open `systematic-debugging` before touching code.
6. When someone says "slow", open `performance` and get a number first.

## RÊVERIE itself

Built with this toolkit: single-file `reverie.html`, one CatmullRom camera path through five stations (Dream Entrance, Floating Garden, Cloud Kingdom, Celestial Room, The Final Dream), lerped palettes, fog and bloom per chapter, `svh`-locked scroll length for mobile Chrome, budget-aware quality tiers, tap-only raycasting and a reduced-motion path.

## Licence

`skills/performance` is by web-quality-skills (MIT, v2.0) and `skills/systematic-debugging` comes from the superpowers family; keep their attribution if you redistribute. `awwwards-3d` and `3d-web-build-playbook` are personal working notes distilled from the public repos listed in `repos/SOURCES.md` — credit those repos.
