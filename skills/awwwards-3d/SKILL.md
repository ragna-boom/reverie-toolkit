# Awwwards-Style 3D Websites

Cinematic scroll-driven 3D in the lineage of Active Theory, Lusion, 14islands, Bonhomme, Resn, Igloo Inc. Target feel: premium, slow, lerped, glossy, atmospheric. Never snappy, never default.

## Philosophy

1. Aesthetics over geometry. A 6-poly cube with a good HDRI, ACES tone mapping and bloom beats 200k polys lit by one light.
2. Lerp everything, damping 0.06 to 0.1. Nothing may snap.
3. Single-file HTML is the default deliverable.
4. Mobile first: dpr capped at 2, frustum culling, half-strength post.
5. ACESFilmicToneMapping and SRGBColorSpace, always.
6. metalness above 0 needs an environment map, or it is a black blob.
7. 60fps desktop, 30fps mobile floor. Cut post passes before geometry.

## Locked stack

three 0.170.0, gsap 3.12.5 with ScrollTrigger, lenis 1.1.0 (not the retired @studio-freight scope). Post uses three's own EffectComposer addons; the standalone postprocessing package is incompatible with r170. Glass is MeshPhysicalMaterial with transmission 1.0 and dispersion 1.2.

## Import map

three -> unpkg three@0.170.0 build/three.module.js; three/addons/ -> unpkg examples/jsm/; gsap and gsap/ScrollTrigger -> esm.sh 3.12.5; lenis -> unpkg lenis@1.1.0 dist/lenis.mjs. Fallback order unpkg, esm.sh, skypack. Vendor locally for production.

## Archetypes

Object showcase (camera orbits a hero object), room walkthrough (path through an interior), tunnel (fly forward forever), vertical descent (scroll equals falling), flyover (traverse a landscape), particle field. Pick one, do not invent a new one.

## Build order

1. Pick archetype. 2. Plan assets: primitives first, Poly Haven HDRIs, Sketchfab last. 3. Start from a minimal template. 4. Layer the polish in order: HDRI as scene.environment, ACES, one directional light, bloom (0.45/0.4/0.82) then vignette then grain, Lenis wired to ScrollTrigger.update, custom cursor, scroll timeline, final grain pass. 5. Audit performance.

## Hard rules

No snap animations. No metalness without envMap. No uncapped pixel ratio. No uncompressed GLB. No autoplay audio. No console.log in the loop. Never mix CSS and JS scroll. No OrbitControls in production. No ShaderMaterial without precision mediump float. Never raycast the whole scene per frame. No frame-count animation, use delta and factor = 1 - pow(1 - ease, delta * 60).

## Delivery note

ESM imports are blocked on file:// so serve over HTTP: python3 -m http.server 8765, then open the localhost URL.

---

Full text lives in the Freebuff account skill awwwards-3d. Upstream reading: https://github.com/tsogjavklann/awwwards-3d
