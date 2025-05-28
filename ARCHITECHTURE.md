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

### Where to Animate

Focus animation efforts on:

- **Hero/homepage:** Decorative SVG (e.g. vines/leaves), text or call-to-action entrance.
- **Product images:** Hover/zoom, carousel transitions, 3D view if needed.
- **Add-to-cart/favorite:** Micro-interactions for feedback.
- **Cards & Buttons:** Subtle scale/fade/slide on interaction.
- **Overlays, modals, notifications:** Smooth transitions.
- **General page transitions:** (optional, as per UX focus)

### Key Animation Decisions

- **Keep all animated blocks modular and dynamically loaded:** Use Next.js dynamic imports (with `ssr: false`) for Three.js, Pixi.js, or WASM-powered components so they don’t impact the initial bundle.

---

## 🔒 Mobile & Performance Considerations

- Core animation libraries are highly optimized, using GPU transforms and batching—**safe for low-end mobile devices**.
- Keep SVGs optimized and simple, avoid excessive DOM elements.
- Only load heavy/complex assets (3D, WASM, Pixi.js) on-demand, never on initial load.
- Regularly audit performance, especially on real/old mobile devices using browser dev tools.

---

## ✅ Summary: Recommended Stack for Animations

- **DaisyUI v5 + TailwindCSS**: for styling, design system.
- **Never animate everything—focus on where it serves the experience and feels natural.**

---

## 🗨️ AI Chat Interface Refactor

### Overview
The AI chat interface has been refactored to leverage the `deep-chat` library, enhancing the user experience with modern design and improved functionality.

### Key Changes
1. **Integration of `deep-chat`**: The chat interface now utilizes the `deep-chat` library for rendering messages and handling user input.
2. **tRPC Procedure Utilization**: The existing tRPC procedure (`ai.chatStream` or `ai.generateResponse`) is used for all backend communication, allowing for efficient message processing and streaming responses.
3. **User and AI Message Styles**: Distinct visual styles have been implemented for user and AI messages, improving clarity and engagement.
4. **Message Timestamps**: Each message now displays a timestamp, providing context for the conversation.
5. **Responsive Design**: The chat interface is designed to be responsive, ensuring usability across various screen sizes.
6. **Loading and Error States**: Visual feedback for loading states and error occurrences has been added to enhance user experience.
7. **Public Accessibility**: The chat interface is publicly accessible without requiring user authentication.

### Implementation Details
- The `Chat` component located at `src/components/chat/index.ts` has been updated to integrate `deep-chat`.
- The message handling logic has been adapted to work with `deep-chat` components, ensuring a seamless user experience.
