# Project Architecture

This document outlines the structural and technical architecture for this Next.js (App Router) e-commerce project, focused on maintainability, modularity, and efficient performance for both desktop and especially mobile/older devices.

---

## 📁 Project Structure

```
root/
├── app/                  # Next.js app router, page layouts and routes
│   └── ...               # (home, auth, marketplace, product, etc.)
├── components/           # All reusable React components
│   ├── ui/               # Basic UI components (buttons, cards, modals, etc.)
│   ├── layout/           # Layout-related components (Sidebar, Header, etc.)
│   ├── animated/         # Animated SVG or motion-based elements (e.g. vines)
│   ├── three/            # 3D viewers (Three.js) [dynamically loaded]
│   ├── pixi/             # Pixi.js (2D/2.5D) components
│   ├── wasm/             # WASM (Rust-powered) wrappers [if needed]
│   └── index.ts          # Optionally, export all from here
├── hooks/                # Custom React hooks
├── lib/                  # Business logic and animation/physics helpers
├── utils/                # Pure utility functions
├── config/               # App-level configs (animation, theming, 3D, etc.)
├── types/                # TypeScript types & interfaces
├── public/               # Publicly accessible static assets (SVG, images, .wasm, 3D models)
├── styles/               # Tailwind, DaisyUI, and global stylesheets
├── wasm/                 # (Optional) Rust sources (compiled to /public for WASM)
├── ...
```

---

## 🌟 Animation Strategy

### Libraries/Tools Used

- **TailwindCSS + DaisyUI v5:** Utility-first styling and component library.
- **Framer Motion (or react-spring):** For performant, declarative, flexible UI/SVG animations.
- **Three.js & Pixi.js:** For heavy/advanced 3D (Three) or fast 2D (Pixi) renderings, **loaded dynamically** only where needed for best performance.
- **Rust/WASM (Optional):** For extremely heavy or complex physics/simulation logic.
    - Only relevant if animation or calculations require performance beyond what is possible in JS (rare in e-commerce UI).

### Where to Animate

Focus animation efforts on:
- **Hero/homepage:** Decorative SVG (e.g. vines/leaves), text or call-to-action entrance.
- **Product images:** Hover/zoom, carousel transitions, 3D view if needed.
- **Add-to-cart/favorite:** Micro-interactions for feedback.
- **Cards & Buttons:** Subtle scale/fade/slide on interaction.
- **Overlays, modals, notifications:** Smooth transitions.
- **General page transitions:** (optional, as per UX focus)

### Key Animation Decisions

- **Stay with Framer Motion or react-spring for all UI/SVG/DOM animations.** These tools use the browser’s GPU-accelerated `transform` and `opacity` for excellent performance on both modern and older mobile devices.
- **Do NOT use WASM for simple UI/UX animation:** For 2–3 SVG "vines" or basic UI/UX motions, JavaScript-based libraries are more than sufficient and simpler to integrate.
- **WASM is only justified for real, heavy, or “simulation” logic** (many objects, advanced physics). Generally not needed for a decorative/animated UI.
- **Keep all animated blocks modular and dynamically loaded:** Use Next.js dynamic imports (with `ssr: false`) for Three.js, Pixi.js, or WASM-powered components so they don’t impact the initial bundle.

---

## 🔒 Mobile & Performance Considerations

- Core animation libraries (Framer Motion, etc.) are highly optimized, using GPU transforms and batching—**safe for low-end mobile devices**.
- Keep SVGs optimized and simple, avoid excessive DOM elements.
- Only load heavy/complex assets (3D, WASM, Pixi.js) on-demand, never on initial load.
- Regularly audit performance, especially on real/old mobile devices using browser dev tools.

---

## ✅ Summary: Recommended Stack for Animations

- **DaisyUI v5 + TailwindCSS**: for styling, design system.
- **Framer Motion (or react-spring)**: for UI and SVG animations—primary animation engine.
- **Three.js/Pixi.js**: only for selected advanced views, loaded on demand.
- **WASM**: only if facing JS performance limitations on non-trivial animation/simulation (rare in this context).
- **Never animate everything—focus on where it serves the experience and feels natural.**

---

## 🔗 Example: Where to Place Things

- `components/animated/Vines.tsx` — SVG vines animation for homepage banner
- `components/three/Product3D.tsx` — 3D model viewer, loaded only in product detail view
- `components/wasm/VineSimWasm.tsx` — (if ever used) interface to Rust-compiled physics engine
- `public/` — static SVG, 3D model, or `.wasm` files
