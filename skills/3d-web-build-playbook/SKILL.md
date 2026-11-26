# 3D Web Build Playbook

Distilled from `cesartevisual/threejs-skills` (24 Three.js skills) and `skinnye/3d-web-pack` (6 agents + 4 workflows). Read the relevant file, do not reinvent it. Full index: [repos.md](repos.md).

## Rule 0 — Serve the request, not the toolkit

These repos are capability, not a shopping list. A plain marketing page gets no canvas, no 3D, no scroll choreography, no extra packages. Read only the skills the request needs.

## Phase 1 — Architect

One paragraph of intent, then a written plan before any code.

- Stack: R3F + drei for component sites inside React/Next; vanilla Three.js for a single cinematic canvas; Babylon.js for heavy interaction/physics/XR; WebGPU + TSL for new 2026 builds with WebGL2 fallback.
- Decide up front: render strategy (demand vs continuous), camera model (orbit, scroll rig, cinematic), post pass list and order, folder layout, loading and error states, mobile floor.
- State budgets: 60fps on a mid-range Android, under 100 draw calls, hero GLB a few MB, textures KTX2, geometry Draco/meshopt.
- Output: stack, architecture, budgets, structure, ordered build plan, top three risks.

## Phase 2 — Scaffold

Vite + React + TS by default, Next.js when SEO/SSR matters, 3D as islands. Build a vertical slice first: responsive canvas, representative subject, framed camera, one interaction, visible loading and error state. Keep copy, nav and primary actions in semantic HTML outside the canvas.

## Phase 3 — Scene

Prefer the drei helper over a hand-rolled one (`useGLTF`, `Environment`, `ContactShadows`, `Instances`, `Text`). Never allocate inside `useFrame`; mutate refs, use `delta`, damp with maath easing, no per-frame state. Dispose geometry, material, texture and render targets on unmount. Match installed versions instead of copying examples.

## Phase 4 — Look

State the target: GLSL for WebGL2, TSL for WebGPU. Pass `uTime` and `uResolution` (with DPR) to every custom shader. Toolkit: FBM/curl noise, domain warping, fresnel rim, iridescence, matcap, dissolve, edge glow, hologram, aurora, vertex displacement, GPGPU particles. Post: EffectComposer with multisampling 0, bloom with mipmapBlur, DOF animated and dropped on mobile, subtle CA and grain, ACES tone mapping, SMAA. Every pass is full-screen cost, so define tiers and keep bloom plus tone mapping on low-end.

## Phase 5 — Motion

One source of truth for scroll. Either Lenis + ScrollTrigger (DOM scrolls, 3D follows: `lenis.on("scroll", ScrollTrigger.update)`, drive `lenis.raf` from `gsap.ticker`, `lagSmoothing(0)`, clean up with `gsap.context()`) or drei ScrollControls with `useScroll`. Always: a `prefers-reduced-motion` static path, destroy ScrollTriggers and Lenis on unmount, `smoothTouch` off if mobile is janky.

## Phase 6 — Assets

`npx @gltf-transform/cli inspect` then `optimize --compress draco --texture-compress ktx2`, `gltfpack -cc` as a meshopt alternative, `gltfjsx -t -T` for a typed component. Keep originals, write optimized output separately, report X MB to Y MB with the percentage. Wire decoders; vanilla Three.js needs DRACOLoader, KTX2Loader and MeshoptDecoder. AI-generated models are raw input: fix scale, origin and PBR maps, then always run the optimize pass.

## Phase 7 — Performance

Measure, fix the single biggest cost, re-measure, report before and after. By symptom: many draw calls means instancing or batching; overdraw means fewer passes and lower DPR; heavy geometry means Draco and LOD; heavy textures means KTX2; static scene means `frameloop="demand"`; CPU stalls mean no per-frame allocation and throttled events; leaks mean dispose and watch memory; slow load means code-split the 3D bundle.

## Phase 8 — Quality gate

Semantic HTML controls for every 3D action, keyboard support, a text description of the scene, reduced-motion path, no motion-only information, readable contrast, a non-WebGL poster fallback, visible loading and error states. Verify in a browser when asked, and report what was checked on which devices and what could not be tested.

---

Compact working copy of the Freebuff account skill `3d-web-build-playbook`.
