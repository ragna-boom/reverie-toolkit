# Tools and stack

Every library, CLI and service used across these skills. Versions are locked; do not upgrade without asking.

## Runtime

| Tool | Version | Job |
|---|---|---|
| three | 0.170.0 | renderer, geometry, physical materials |
| gsap + ScrollTrigger | 3.12.5 | scroll timelines, eased property changes |
| lenis | 1.1.0 | smooth scroll owner (never mix with CSS smooth scroll) |
| @react-three/fiber + drei | matching three r170 | React scenes, helpers, loaders |
| @react-three/postprocessing | matching | bloom, DOF, grain, tone mapping |
| @react-three/rapier | optional | physics |

## Asset pipeline

| Tool | Job |
|---|---|
| @gltf-transform/cli | inspect, optimize, draco, ktx2, resize textures |
| gltfpack | meshopt alternative compressor |
| gltfjsx | typed R3F component from a GLB |
| Blender | authoring, export GLB with Draco + KTX2 |
| Poly Haven | free CC0 HDRIs, textures, models |
| Meshy, Tripo, Rodin, Spline | AI 3D generation; always optimize before shipping |

Commands: `npx @gltf-transform/cli inspect model.glb`, `npx @gltf-transform/cli optimize model.glb model.opt.glb --compress draco --texture-compress ktx2`, `npx gltfjsx model.opt.glb -t -T`.

## Measurement

`renderer.info` (calls, triangles, geometries, textures), stats-gl, drei Stats and Perf, DevTools Performance traces, Spector.js for frame capture, Lighthouse and CrUX / PageSpeed Insights for field and lab web vitals. Report before and after numbers, never a claim without one.

## Quality floor

Draw calls under 100, hero GLB a few MB, textures KTX2, geometry Draco or meshopt, DPR capped, reduced-motion path, non-WebGL poster fallback, semantic HTML controls outside the canvas.
