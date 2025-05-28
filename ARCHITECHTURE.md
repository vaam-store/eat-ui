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

## Application Layout & Route Structure

### Core Layout Components

1. **Mobile-First Shell Layout**
   - Bottom navigation bar (for mobile)
   - Collapsible sidebar (for tablet/desktop)
   - Header with search, profile menu, and cart
   - AI Assistant floating button/interface

2. **Authentication Components**
   - WebAuthn registration/login interface
   - Biometric authentication UI

3. **Product Components**
   - Product cards with optimized mobile view
   - Product detail layout
   - Review and rating interface
   - Seller profile view

4. **Marketplace Components**
   - Category browsing interface
   - Search results with filters
   - Recommended products section

5. **User Dashboard Components**
   - Seller tools and listings management
   - Order tracking and history
   - Profile management

### App Routing Structure

Let's create a detailed routing plan using Next.js app routing:

```
app/
├── layout.tsx (Root layout with authentication provider)
├── page.tsx (Home page)
├── auth/
│   ├── layout.tsx (Auth layout)
│   ├── login/
│   │   └── page.tsx (WebAuthn login/register combined page)
│   └── verify/
│       └── page.tsx (Verify authentication)
├── marketplace/
│   ├── layout.tsx (Marketplace layout)
│   ├── page.tsx (Browse all items)
│   ├── category/
│   │   ├── [category]/
│   │   │   └── page.tsx (Category browsing)
│   │   └── page.tsx (All categories)
│   └── search/
│       └── page.tsx (Search results)
├── product/
│   ├── layout.tsx (Product view layout)
│   └── [id]/
│       ├── page.tsx (Product detail)
│       └── reviews/
│           └── page.tsx (Product reviews)
├── seller/
│   ├── [id]/
│   │   ├── page.tsx (Seller profile)
│   │   └── products/
│   │       └── page.tsx (Seller products)
│   └── register/
│       └── page.tsx (Become a seller)
├── dashboard/
│   ├── layout.tsx (Dashboard layout)
│   ├── page.tsx (Dashboard overview)
│   ├── profile/
│   │   └── page.tsx (User profile)
│   ├── orders/
│   │   ├── page.tsx (Orders list)
│   │   └── [id]/
│   │       └── page.tsx (Order detail)
│   ├── messages/
│   │   ├── page.tsx (Messages list)
│   │   └── [id]/
│   │       └── page.tsx (Conversation)
│   └── selling/
│       ├── page.tsx (Selling dashboard)
│       ├── products/
│       │   ├── page.tsx (My products)
│       │   ├── new/
│       │   │   └── page.tsx (Add product)
│       │   └── [id]/
│       │       └── page.tsx (Edit product)
│       └── orders/
│           ├── page.tsx (Selling orders)
│           └── [id]/
│               └── page.tsx (Order detail as seller)
├── cart/
│   └── page.tsx (Shopping cart)
├── checkout/
│   ├── page.tsx (Checkout process)
│   └── success/
│       └── page.tsx (Checkout success)
└── api/
    ├── auth/
    │   └── [...nextauth]/
    │       └── route.ts (Authentication API)
    ├── medusa/
    │   └── [...path]/
    │       └── route.ts (Medusa API proxy)
    └── ai/
        └── chat/
            └── route.ts (AI assistant endpoint)
```

## Page-by-Page Content & Features

Let's detail what should be on each main route:

### Home Page (`/`)

- Featured products carousel
- Category quick-access cards
- Recent listings
- Special deals section
- AI assistant prompt
- Personalized recommendations (if logged in)

### Authentication (`/auth/login`)

- Combined WebAuthn registration and login
- Simple UI explaining biometric/security key usage
- Fallback for devices without WebAuthn support
- Clear instructions for first-time users

### Marketplace (`/marketplace`)

- Browse all products with infinite scroll
- Filter sidebar (collapsible on mobile)
- Sort options
- Quick category switching
- Search integration

### Category Pages (`/marketplace/category/[category]`)

- Category-specific products
- Sub-category navigation
- Category-specific filters
- Related categories

### Search Results (`/marketplace/search`)

- Search results with highlighted matches
- Filter options
- Sort options
- Related search suggestions
- AI enhanced search capabilities

### Product Detail (`/product/[id]`)

- Image gallery (swipeable)
- Product details
- Price and availability
- Seller information
- Buy/Add to cart buttons
- Similar products
- Reviews summary
- Q&A section with AI assistance

### Seller Profile (`/seller/[id]`)

- Seller information and rating
- Featured products
- Reviews and feedback
- Contact seller option
- Report seller option

### User Dashboard (`/dashboard`)

- Overview of recent activities
- Quick access to orders, messages, listings
- Account stats
- Notifications center

### Profile Management (`/dashboard/profile`)

- Personal information
- Payment methods
- Addresses
- Account settings
- WebAuthn credentials management

### Orders Management (`/dashboard/orders`)

- List of orders with status
- Order filtering and search
- Order details view
- Tracking information
- Order support/return options

### Messaging System (`/dashboard/messages`)

- Conversations list
- Chat interface
- Read/unread indicators
- AI-assisted message suggestions

### Selling Dashboard (`/dashboard/selling`)

- Sales overview and statistics
- Recent orders requiring action
- Product inventory status
- Performance metrics

### Product Management (`/dashboard/selling/products`)

- List of products with status
- Quick edit options
- Inventory management
- Add new product button
- Bulk actions

### Cart & Checkout (`/cart`, `/checkout`)

- Mobile-optimized cart view
- Address and payment selection
- Order summary
- Shipping options
- Promo code input
- Secure checkout process

## AI Integration with the `ai` package

Here's how you can integrate AI throughout your application:

1. **Product Search Enhancement**
   - Natural language product search
   - Intent recognition for complex queries
   - Product recommendation based on conversation

2. **Shopping Assistant**
   - Floating AI chat button
   - Product comparisons
   - Personalized recommendations
   - Help with finding specific items

3. **Seller Support**
   - Listing optimization suggestions
   - Pricing recommendations
   - Category placement advice
   - Description improvements

4. **Customer Support**
   - Order status inquiries
   - Return/refund assistance
   - Policy questions
   - Troubleshooting common issues

5. **AI Implementation**
   - Use the `ai` package for streaming responses
   - Implement conversation memory
   - Create custom AI endpoints in `/api/ai/chat`
   - Integrate with Medusa's product catalog

## WebAuthn Implementation

For WebAuthn (which combines registration and authentication):

1. **Registration Flow**
   - Check if user exists
   - If new user, create WebAuthn registration
   - Generate challenge
   - Register credential
   - Store credential IDs linked to user

2. **Authentication Flow**
   - Generate authentication challenge
   - Verify credential
   - Create session
   - Redirect to dashboard

3. **Implementation Notes**
   - Use libraries like `@simplewebauthn/server` and `@simplewebauthn/browser`
   - Implement proper error handling for devices without WebAuthn support
   - Consider adding a traditional password fallback

## Medusa.js Integration

As your client is Medusa.js, you'll need to:

1. **Setup API Routes**
   - Create proxy routes in `/api/medusa/[...path]`
   - Handle authentication and authorization
   - Properly format requests and responses

2. **Product Management**
   - Sync products with Medusa catalog
   - Handle inventory management
   - Implement product variants

3. **Order Processing**
   - Connect checkout to Medusa order processing
   - Handle payment methods integration
   - Manage order fulfillment

4. **User Management**
   - Link WebAuthn credentials to Medusa user accounts
   - Sync user profile data

## Mobile-First Optimizations

For a truly mobile-first experience:

1. **Performance**
   - Implement image optimization
   - Use Next.js Server Components where appropriate
   - Implement proper loading states

2. **UI/UX**
   - Use gesture-based interactions (swipe, pinch, etc.)
   - Design for thumb zones on mobile screens
   - Implement virtual scroll for long lists
   - Design bottom sheets instead of modals where appropriate

3. **Offline Capabilities**
   - Implement Service Worker for offline browsing
   - Cache important resources
   - Handle offline cart additions

## Development Plan & Next Steps

1. **Setup Project**
   - Initialize Next.js with app router
   - Configure Medusa.js client
   - Set up WebAuthn libraries
   - Install `ai` package

2. **Authentication Layer**
   - Implement WebAuthn registration/login
   - Create authentication provider
   - Set up protected routes

3. **Core Marketplace Features**
   - Build product browsing
   - Implement search functionality
   - Create product detail pages
   - Set up cart and checkout flow

4. **User Dashboard**
   - Develop profile management
   - Build order tracking
   - Create messaging system
   - Implement seller tools

5. **AI Integration**
   - Set up AI API endpoints
   - Implement chat interface
   - Connect to product catalog
   - Train on your specific marketplace content

Would you like me to go deeper into any specific part of this plan? For example, I could provide more detailed design recommendations for specific pages, elaborate on the AI implementation, or focus more on the WebAuthn authentication flow.
