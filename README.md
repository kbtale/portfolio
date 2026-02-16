
https://github.com/user-attachments/assets/629fa77b-ed95-4ed2-88af-aef7355eae9d

## 1. Project Overview

A portfolio website built on **Next.js 16 (App Router)**. Prioritizes raw CSS Modules, custom WebGL shaders, and physics-based animations over UI component libraries.

---

## 2. Technology Stack

*   **Framework**: Next.js 16.1.6
*   **Language**: TypeScript 5.9.3
*   **Rendering**: React 19.2.3
*   **3D**: Three.js (r160+) / React Three Fiber
*   **Animation**: GSAP 3.14 (ScrollTrigger, Draggable)
*   **Scrolling**: Lenis
*   **i18n**: next-intl
*   **Styling**: CSS Modules + CSS Variables
*   **Email**: Resend API

---

## 3. Core Architecture

### 3.1. Theme Engine (`src/components/ThemeContext.tsx`)
State-driven variable injection system using `CSSStyleDeclaration.setProperty`.

*   **State**: Maintains a `Palette` object (foreground, background, accent).
*   **Sync**: `useEffect` hook writes values to `:root` on state change.
*   **Persistence**: `localStorage` + `window.matchMedia` fallback.

### 3.2. Data Caching (`src/components/GitHubStarsContext.tsx`)
Client-side caching layer for GitHub API.

1.  **Mount**: Fetch all repo stars via `Promise.all`.
2.  **Cache**: Store result object `{ data, timestamp }` in `localStorage`.
3.  **Invalidation**: Skip fetch if `Date.now() - timestamp < 86400000`.

### 3.3. State Filtering (`src/components/TechFilterContext.tsx`)
Global filter state accessible via Context API.

*   **Producer**: `TechStack.tsx` (About Section).
*   **Consumer**: `TechSearchFilter.tsx` (Projects Section).
*   **Action**: Clicking an icon updates context -> triggers auto-scroll to Projects -> filters list.

---

## 4. 3D & Shaders

### 4.1. Wireframe Reveal (`src/components/FaceWireframeReveal.tsx`)
Runtime shader modification via `onBeforeCompile`.

*   **Materials**:
    *   **Base**: MeshStandardMaterial.
    *   **Overlay**: LineBasicMaterial (Accent Color).
*   **Shader Injection**:
    *   **Vertex**: Pass `vWorldPosition`.
    *   **Fragment**: Calculate distance field against `uFadeRadius`.
    *   **Logic**: `gl_FragColor.a *= smoothstep(start, end, position.y)`.
*   **Clipping**: `THREE.Plane` constant updated on scroll frame.

### 4.2. Interactive Grid (`src/components/InteractiveGrid.tsx`)
Pure GLSL implementation.

*   **Vertex Shader**: Displaces `position.z` using `sin(uTime) + distance(uv, uMouse)`.
*   **Fragment Shader**:
    *   Grid pattern: `fract(vUv * gridLines)`.
    *   Glow mask: `1.0 - smoothstep(radius, uv)`.

---

## 5. Animation

### 5.1. Scroll & Physics
*   **Lenis**: Intercepts `wheel` event, applies dampening.
*   **Sync**: `gsap.ticker.add((time) => lenis.raf(time))` ensures single-frame synchronization.

### 5.2. Experience Timeline (`src/components/ExperienceTimeline.tsx`)
*   **Translation**: `ScrollTrigger` tracks container `scroll` -> Updates `transform: translateX()`.
*   **Interaction**: `Draggable` on proxy element. `onDrag` updates Lenis scroll target.

---

## 6. Logic & Algorithms

### 6.1. Bento Layout (`src/components/TechStack.tsx`)
Grid packing algorithm for variable-width items.
*   Input: Array of items.
*   Logic:
    *   `if (remaining >= 3)`: Output row [span-2, span-2, span-2] OR [span-3, span-3] + [span-2, span-2, span-2].
    *   `if (remaining == 2)`: Output row [span-3, span-3].
    *   `if (remaining == 1)`: Output row [span-6].

---

## 7. Security

### 7.1. API Routes (`src/app/api/contact/route.ts`)
*   **Environment**: API Keys accessed via `process.env` (Server Runtime).
*   **Validation**: Honeypot field check.
*   **Response**: 200 OK / 400 Bad Request / 500 Internal Error.

---

## 8. Setup

```bash
# 1. Clone
git clone https://github.com/kbtale/portfolio.git

# 2. Install
npm install

# 3. Environment
echo "RESEND_API_KEY=re_123" > .env
echo "CONTACT_EMAIL=me@example.com" >> .env

# 4. Dev
npm run dev

# 5. Build
npm run build
```
