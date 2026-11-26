# The 3D build team

Six layer agents from [skinnye/3d-web-pack](https://github.com/skinnye/3d-web-pack), read as `agents/<name>.md`. They hand off in order; each one owns one layer and does not wander into the next.

| # | Agent | Owns | Never does |
|---|---|---|---|
| 1 | threejs-architect | stack choice, scene graph plan, budgets, project structure | feature code |
| 2 | r3f-engineer | Canvas, meshes, lights, materials, cameras, controls, glTF loading, drei helpers | shader authoring |
| 3 | shader-artist | GLSL and TSL shaders, custom materials, post effects | scene layout |
| 4 | motion-choreographer | GSAP ScrollTrigger, Lenis, camera choreography, reduced motion | asset work |
| 5 | webgl-perf-auditor | measure then fix: draw calls, instancing, LOD, compression, memory, mobile | new features |
| 6 | asset-pipeline-engineer | glTF/GLB optimization, Draco/KTX2/meshopt, gltfjsx, AI asset intake | scene code |

## Workflow skills (`skills/<name>/SKILL.md`)

- **scaffold-3d-site** — Vite or Next + R3F + drei + postprocessing + motion skeleton.
- **optimize-3d-assets** — gltf-transform, gltfpack and gltfjsx commands with before/after reporting.
- **add-postprocessing** — cinematic bloom, DOF, grain and tone mapping stack with a cost budget.
- **scroll-3d-scene** — Lenis + ScrollTrigger or drei ScrollControls, with cleanup and reduced motion.

## How to run them

1. Architect writes the plan and the budgets. Nothing is coded before that plan exists.
2. Engineer builds a vertical slice, then detail.
3. Artist adds the look only after the scene reads correctly unlit.
4. Choreographer adds scroll and pointer motion, plus the reduced-motion path.
5. Auditor measures and fixes the biggest cost, reporting numbers.
6. Asset engineer compresses and ships within budget.

Read the exact file when you need its detail: `https://raw.githubusercontent.com/skinnye/3d-web-pack/main/agents/<name>.md`.

## Same team, other names

In Freebuff the same work is split as: researcher for unknowns, code searcher for locating code, editor for edits, runner for commands, and a reviewer for the diff. Same rule applies: one layer at a time, evidence before claims.
