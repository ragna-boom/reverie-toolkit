# Source index

Jump straight to the right file.

## cesartevisual/threejs-skills — `skills/<name>/SKILL.md`

Project and delivery

- threejs-web — plan and implement a whole experience; routing guide in references/routing.md
- threejs-html — web/framework integration, canvas ownership, responsive sizing
- threejs-deployment — build, bundle split, delivery, hosting
- threejs-testing — 3D testing and visual QA
- threejs-debugging — rendering diagnostics
- threejs-performance — frame and memory budgets
- threejs-accessibility — accessible 3D, reduced motion, HTML controls, fallbacks

Scene building

- threejs-scene — scenes, cameras, math
- threejs-lighting — light rigs, environment/IBL, shadows
- threejs-geometry — geometry, instancing, batching
- threejs-materials — PBR materials, textures, maps
- threejs-animation — keyframes, timelines, mixer
- threejs-interaction — raycasting, picking, controls
- threejs-shaders — custom GLSL and ShaderMaterial
- threejs-webgpu — WebGPU renderer and TSL node materials
- threejs-postprocessing — effect composer pipelines
- threejs-particles — particles and large point datasets
- threejs-spatial-data — big spatial datasets, clustering, LOD by distance
- threejs-physics — Rapier/Cannon style integration
- threejs-audio — positional audio and audio-reactive scenes
- threejs-xr — WebXR, VR, AR
- threejs-assets — model and texture loading pipeline
- threejs-r3f — React Three Fiber and drei patterns
- threejs-product-viewer — product viewers and configurators

Repo rules (AGENTS.md): preserve installed versions; verify version-sensitive APIs against official docs; each SKILL.md is source of truth; ask only what blocks the build.

## skinnye/3d-web-pack — `agents/<name>.md` and `skills/<name>/SKILL.md`

Agents: threejs-architect, r3f-engineer, shader-artist, motion-choreographer, webgl-perf-auditor, asset-pipeline-engineer. Roster and hand-off order: [agents/3d-web-pack.md](../../agents/3d-web-pack.md).

Workflow skills: scaffold-3d-site, optimize-3d-assets, add-postprocessing, scroll-3d-scene.

## Recommended stack, 2026

Render: R3F + drei, Three.js, WebGPU + TSL, Babylon.js. Motion: GSAP + ScrollTrigger, Lenis, react-spring, theatre.js. Look: postprocessing, GLSL/TSL, HDRI, leva. Assets: gltf-transform, gltfpack, Draco, KTX2/Basis. Perf: instancing, LOD, frameloop demand, stats-gl, r3f-perf.

AI 3D tools: Meshy (PBR textures, rigging, animation presets), Tripo (fastest, clean meshes), Rodin/Hyper3D (high detail), Spline (visual editor, web export), Poly Haven (free CC0). Always optimize AI output before shipping.
