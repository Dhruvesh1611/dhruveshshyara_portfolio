<div align="center">

<img src="docs/screenshots/banner.png" alt="Dhruvesh Shyara Portfolio Banner" width="100%" />

# 🚀 Dhruvesh Shyara — Portfolio

### *"Learning, Living, and Leveling Up."*

[![Live Site](https://img.shields.io/badge/🌐_Live-dhruveshshyara.in-4a6cf7?style=for-the-badge&labelColor=0b0b0b)](https://dhruveshshyara.in)
[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

A **cinematic, high-performance** developer portfolio built with **Next.js 16**, **React 19**, and **Framer Motion** — featuring immersive animations, a **VS Code-inspired command palette**, an **admin dashboard**, custom analytics tracking, and a fully responsive design.

<br/>

</div>

---

## 📑 Table of Contents

- [📸 Preview](#-preview)
- [✨ Highlights](#-highlights)
- [🏗️ Architecture](#️-architecture)
- [🧭 Application Flow](#-application-flow)
- [📄 Pages & Routes](#-pages--routes)
- [🧩 Component Architecture](#-component-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🎨 Design System](#-design-system)
- [⚡ Key Features](#-key-features)
- [📊 Admin Dashboard](#-admin-dashboard)
- [🔧 Getting Started](#-getting-started)
- [📦 Environment Variables](#-environment-variables)
- [🚀 Deployment](#-deployment)
- [📈 Performance](#-performance)
- [🤝 Contact](#-contact)

---

## 📸 Preview

<div align="center">

### 🎬 Hero Section — Cinematic Landing Experience

<img src="docs/screenshots/hero1.png" alt="Hero Section" width="90%" />

<br/><br/>

### 💼 Projects Page — Filterable Project Showcase

<img src="docs/screenshots/projects.png" alt="Projects Page" width="90%" />

<br/><br/>

### ⏳ Preloader — Bold Entry Animation

<img src="docs/screenshots/preloader.png" alt="Preloader Screen" width="90%" />

<br/><br/>

### 👤 About Me Page — Education Timeline & Bio

<img src="docs/screenshots/aboutme.png" alt="About Me Page" width="90%" />

<br/><br/>

### 📜 Certificates Page — Achievement Showcase

<img src="docs/screenshots/certificates.png" alt="Certificates Page" width="90%" />

<br/><br/>

### ⌘ Command Palette — VS Code-Style Search

<img src="docs/screenshots/command-palette.png" alt="Command Palette" width="90%" />

<br/><br/>

### 📱 Mobile Responsive — Seamless on Every Device

<img src="docs/screenshots/mobile-responsive.png" alt="Mobile Responsive View" width="45%" />

</div>

---

## ✨ Highlights

<br/>

| Feature | Description |
|---------|-------------|
| 🎬 **Cinematic Hero** | Full-screen hero with nebula effects, animated star canvas, and concentric ring animations |
| ⌘ **Command Palette** | VS Code-style `Cmd+K` search with fuzzy matching across all portfolio content |
| 🧠 **Admin Dashboard** | Full CMS for managing projects, skills, certificates, and site settings |
| 📊 **Custom Analytics** | Built-in analytics tracking with page views, visitor data, and dashboard visualization |
| 🎭 **Page Transitions** | Smooth page transitions with Framer Motion AnimatePresence |
| 🌑 **Dark Mode** | Premium dark theme with glassmorphism effects and gradient accents |
| 👁️ **Interactive Footer** | Animated avatar with mouse-tracking eyes that follow cursor position |
| 📱 **Fully Responsive** | Mobile-first design with hamburger navigation and optimized touch interactions |
| ⚡ **Preloader** | Custom animated preloader for premium first-load experience |
| 🔐 **Auth System** | NextAuth.js based admin authentication with bcrypt password hashing |

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Client Layer"]
        Browser["Browser"]
        CMD["Command Palette (Cmd+K)"]
    end

    subgraph NextJS["⚡ Next.js 16 App Router"]
        subgraph Pages["📄 Pages"]
            Home["/ (Home)"]
            About["/aboutme"]
            Projects["/projects"]
            ProjectDetail["/projects/[slug]"]
            Certificates["/certificates"]
            Explanation["/explanation"]
            Admin["/admin/*"]
        end

        subgraph Components["🧩 Components"]
            Hero["Hero"]
            NavBar["Navbar"]
            Skills["Skills"]
            ProjectsComp["Projects"]
            CertsComp["Certificates"]
            Footer["Footer"]
            Preloader["Preloader"]
            PageTransition["PageTransition"]
            CustomCursor["CustomCursor"]
        end

        subgraph API["🔌 API Routes"]
            AuthAPI["/api/auth/[...nextauth]"]
            AdminAPI["/api/admin/*"]
            AnalyticsAPI["/api/analytics"]
        end
    end

    subgraph Data["💾 Data Layer"]
        JSON["JSON Data Files"]
        ENV[".env.local"]
    end

    subgraph External["☁️ External Services"]
        Vercel["Vercel (Hosting)"]
        GA["Google Analytics"]
    end

    Browser --> NextJS
    CMD --> NextJS
    Pages --> Components
    Pages --> API
    API --> Data
    Components --> Data
    NextJS --> Vercel
    NextJS --> GA

    style Client fill:#1a1a2e,stroke:#4a6cf7,color:#fff
    style NextJS fill:#0d1117,stroke:#4a6cf7,color:#fff
    style Data fill:#1a1a2e,stroke:#a855f7,color:#fff
    style External fill:#1a1a2e,stroke:#22c55e,color:#fff
```

---

## 🧭 Application Flow

```mermaid
flowchart LR
    A["🌐 User Visits"] --> B["⏳ Preloader Animation"]
    B --> C["🏠 Home Page"]
    C --> D{"Navigation"}

    D --> E["👤 About Me\n/aboutme"]
    D --> F["💼 Projects\n/projects"]
    D --> G["📜 Certificates\n/certificates"]
    D --> H["📖 Explanation\n/explanation"]
    D --> I["⌘ Command Palette\nCmd+K"]

    F --> J["📋 Project Detail\n/projects/[slug]"]
    I --> K["🔍 Fuzzy Search\nAll Content"]

    C --> L["🔐 Admin Login\n/admin/login"]
    L --> M["📊 Admin Dashboard\n/admin"]

    subgraph AdminPanel["Admin Dashboard"]
        M --> N["Projects CRUD"]
        M --> O["Skills Manager"]
        M --> P["Certificates Manager"]
        M --> Q["Analytics Viewer"]
        M --> R["Site Settings"]
    end

    style A fill:#4a6cf7,stroke:#fff,color:#fff
    style C fill:#a855f7,stroke:#fff,color:#fff
    style M fill:#22c55e,stroke:#fff,color:#fff
```

---

## 📄 Pages & Routes


### Public Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero section, About preview, Skills showcase, Projects grid, Certificates carousel |
| `/aboutme` | **About Me** | Detailed education timeline, journey, and personal bio |
| `/projects` | **All Projects** | Full project showcase with filtering and detailed cards |
| `/projects/[slug]` | **Project Detail** | Individual project page with features, architecture, challenges, and YouTube demos |
| `/certificates` | **Certificates** | All certifications with verification links |
| `/explanation` | **Explanation** | Behind-the-scenes technical explanation of the portfolio |

### Admin Pages

| Route | Page | Description |
|-------|------|-------------|
| `/admin/login` | **Login** | Secure authentication with NextAuth.js |
| `/admin` | **Dashboard** | Overview analytics and quick actions |
| `/admin/projects` | **Projects Manager** | Full CRUD for project entries |
| `/admin/skills` | **Skills Manager** | Manage skill categories and proficiency levels |
| `/admin/certificates` | **Certificates Manager** | Add/edit/delete certifications |
| `/admin/analytics` | **Analytics** | Page view data and visitor insights |
| `/admin/settings` | **Settings** | Site-wide configuration |
| `/admin/about` | **About Editor** | Edit personal info and bio |
| `/admin/experience` | **Experience** | Manage work experience entries |
| `/admin/media` | **Media Manager** | Upload and manage media assets |
| `/admin/content` | **Content Editor** | Edit page content |
| `/admin/seo` | **SEO Settings** | Meta tags and SEO configuration |
| `/admin/appearance` | **Appearance** | Theme and visual settings |
| `/admin/messages` | **Messages** | View contact form submissions |

---

## 🧩 Component Architecture

```mermaid
graph TD
    RootLayout["RootLayout\n(layout.js)"]
    RootLayout --> Preloader["⏳ Preloader"]
    RootLayout --> PageTransition["🎭 PageTransition"]
    RootLayout --> GA["📊 GoogleAnalytics"]
    RootLayout --> AT["📈 AnalyticsTracker"]

    PageTransition --> HomePage["🏠 Home Page"]

    HomePage --> Navbar["🧭 Navbar\n+ CommandPalette"]
    HomePage --> Hero["🎬 Hero\n+ Star Canvas\n+ Nebula Effects"]
    HomePage --> About["👤 About\n+ Avatar + Resume"]
    HomePage --> Skills["⚡ Skills\n+ Tech Stack Grid"]
    HomePage --> Projects["💼 Projects\n+ Animated Cards"]
    HomePage --> Certificates["📜 Certificates\n+ Carousel"]
    HomePage --> Footer["🦶 Footer\n+ Eye-Tracking Avatar"]

    Navbar --> CMD["⌘ CommandPalette\nFuzzy Search"]
    Navbar --> CC["🎯 CustomCursor"]

    style RootLayout fill:#4a6cf7,stroke:#fff,color:#fff
    style HomePage fill:#a855f7,stroke:#fff,color:#fff
    style CMD fill:#22c55e,stroke:#fff,color:#fff
```

---

## 🛠️ Tech Stack

<div align="center">
<img src="docs/screenshots/tech-stack.png" alt="Tech Stack Overview" width="90%" />
</div>

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.4 | React framework with App Router, SSR, and API routes |
| **React** | 19.2.3 | UI component library |
| **React DOM** | 19.2.3 | DOM rendering |

### Animation & UI

| Technology | Purpose |
|------------|---------|
| **Framer Motion** 12.29 | Page transitions, scroll animations, hover effects |
| **Vanilla CSS** | 89KB+ custom design system with CSS variables |
| **Google Fonts** | Fira Code, Anton, Passions Conflict, Playfair Display, Inter, Outfit |

### Backend & Auth

| Technology | Purpose |
|------------|---------|
| **NextAuth.js** 4.24 | Admin authentication with credential provider |
| **bcryptjs** 3.0 | Password hashing for secure auth |
| **Next.js API Routes** | RESTful endpoints for admin CRUD operations |

### Utilities

| Technology | Purpose |
|------------|---------|
| **react-icons** | Icon library for consistent iconography |
| **react-dropzone** | File upload in admin dashboard |
| **react-hot-toast** | Toast notifications for user feedback |
| **slugify** | URL-safe slug generation for projects |
| **uuid** | Unique ID generation for data entries |

### DevOps & Deployment

| Technology | Purpose |
|------------|---------|
| **Vercel** | Production hosting with edge functions |
| **ESLint** | Code quality and linting |
| **Git** | Version control |

---

## 📂 Project Structure

```
dhruveshshyara_portfolio/
├── public/                          # Static assets
│   ├── certificates/                # Certificate images
│   ├── png/                         # Portfolio images, logos, avatars
│   ├── projects/                    # Project screenshots
│   ├── resumes/                     # Resume PDF files
│   ├── svg/                         # SVG icons and illustrations
│   └── preloader.html               # Custom preloader template
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.js                # Root layout (fonts, metadata, analytics)
│   │   ├── page.js                  # Home page composition
│   │   ├── globals.css              # Complete design system (89KB)
│   │   │
│   │   ├── aboutme/page.jsx         # About Me page (education timeline)
│   │   ├── projects/
│   │   │   ├── page.jsx             # Projects listing page
│   │   │   └── [slug]/page.jsx      # Dynamic project detail pages
│   │   ├── certificates/page.jsx    # Certificates page
│   │   ├── explanation/page.jsx     # Portfolio explanation page
│   │   │
│   │   ├── admin/                   # Admin Dashboard
│   │   │   ├── layout.jsx           # Admin layout wrapper
│   │   │   ├── page.jsx             # Dashboard home
│   │   │   ├── admin.css            # Admin-specific styles
│   │   │   ├── login/               # Auth login page
│   │   │   ├── projects/            # Project CRUD
│   │   │   ├── skills/              # Skills management
│   │   │   ├── certificates/        # Certificate management
│   │   │   ├── analytics/           # Analytics dashboard
│   │   │   ├── settings/            # Site settings
│   │   │   ├── about/               # About editor
│   │   │   ├── experience/          # Experience editor
│   │   │   ├── media/               # Media manager
│   │   │   ├── content/             # Content editor
│   │   │   ├── seo/                 # SEO settings
│   │   │   ├── appearance/          # Theme settings
│   │   │   └── messages/            # Contact messages
│   │   │
│   │   └── api/                     # API Routes
│   │       ├── auth/[...nextauth]/  # NextAuth.js handler
│   │       ├── admin/               # Admin CRUD endpoints
│   │       │   ├── about/
│   │       │   ├── analytics/
│   │       │   ├── certificates/
│   │       │   ├── dashboard/
│   │       │   ├── experience/
│   │       │   ├── projects/
│   │       │   ├── settings/
│   │       │   └── skills/
│   │       └── analytics/           # Public analytics endpoint
│   │
│   ├── components/                  # Reusable UI Components
│   │   ├── Hero.jsx                 # Cinematic hero with star canvas
│   │   ├── Navbar.jsx               # Navigation + hamburger menu
│   │   ├── CommandPalette.jsx       # VS Code-style Cmd+K search
│   │   ├── About.jsx                # About section with avatar
│   │   ├── Skills.jsx               # Tech stack grid
│   │   ├── Projects.jsx             # Project cards with animations
│   │   ├── Certificates.jsx         # Certificate showcase
│   │   ├── Footer.jsx               # Interactive footer with tracking eyes
│   │   ├── Preloader.jsx            # Loading animation
│   │   ├── PageTransition.jsx       # Framer Motion page transitions
│   │   ├── CustomCursor.jsx         # Custom cursor effect
│   │   ├── GoogleAnalytics.jsx      # GA4 integration
│   │   ├── AnalyticsTracker.jsx     # Custom analytics tracking
│   │   ├── YouTubeEmbed.jsx         # YouTube video player
│   │   └── admin/                   # Admin-specific components
│   │
│   ├── data/                        # JSON Data Store
│   │   ├── about.json               # Personal info, social links
│   │   ├── projects.json            # All project entries (52KB)
│   │   ├── skills.json              # Skills with categories & levels
│   │   ├── certificates.json        # Certifications data
│   │   ├── analytics.json           # Analytics data storage
│   │   ├── settings.json            # Site configuration
│   │   ├── commandPaletteData.js    # Search index for Cmd+K
│   │   └── projectsData.js          # Project helper utilities
│   │
│   ├── lib/                         # Utility Libraries
│   │   ├── data.js                  # Data read/write helpers
│   │   └── imageUtils.js            # Image processing utilities
│   │
│   └── pages/                       # Pages Router (API compat)
│       └── api/                     # Additional API routes
│
├── .env.local                       # Environment variables
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies & scripts
├── eslint.config.mjs                # Linting configuration
└── jsconfig.json                    # Path aliases (@/)
```

---

## 🎨 Design System

### Typography

| Font | Variable | Usage |
|------|----------|-------|
| **Fira Code** | `--font-fira-code` | Code blocks, monospace text, developer aesthetic |
| **Anton** | `--font-anton` | Large hero headings, impact text |
| **Passions Conflict** | `--font-passions-conflict` | Decorative cursive accents |
| **Playfair Display** | `--font-playfair` | Elegant italic text, quotes |
| **Inter** | `--font-inter` | Body text, general UI |
| **Outfit** | `--font-outfit` | Headings, navigation, buttons |

### Color Palette

```
Primary Blue    → #4a6cf7   (Accents, links, CTAs)
Light Purple    → var(--color-light-purple)   (Gradients, glows)
Dark Mode BG    → #0b0b0b / #070607   (Backgrounds)
White           → #ffffff   (Text on dark)
Gray Text       → #b3b3b3   (Secondary text)
Border          → var(--tech-stack-box-border-color)
```

### Visual Effects

- **Nebula/Smoke effects** — Radial gradients with blur for cosmic background
- **Glassmorphism** — Backdrop blur with semi-transparent backgrounds
- **Micro-animations** — Framer Motion `whileInView`, `whileHover` transitions
- **Concentric rings** — Animated orbital rings around hero image
- **Mouse-tracking eyes** — Pupil positions calculated from cursor coordinates
- **Gradient borders** — Linear gradient borders on interactive elements

---

## ⚡ Key Features

### 🎬 Cinematic Hero Section

The hero features a full-screen immersive experience with:
- **Star Particles Canvas** — HTML5 Canvas with 80 twinkling stars using `requestAnimationFrame`
- **Cosmic Nebula Effects** — Three layered radial gradients (left, right, center)
- **Concentric Rings** — CSS-animated orbital rings around the profile photo
- **Bottom Cinematic Fade** — Gradient overlay for seamless section transition

### ⌘ Command Palette (Cmd+K)



VS Code-inspired command palette with:
- **Fuzzy search** across all portfolio content (projects, skills, pages)
- **Social links** browsable when no query is entered
- **Keyboard navigation** — Arrow keys, Enter to select, Escape to close
- **Auto-scroll** active items into view
- **Grouped results** with type badges (page, project, section, info)

### 👁️ Interactive Footer Avatar

<div align="center">
<img src="docs/screenshots/footer-avatar.png" alt="Interactive Footer with Eye-Tracking Avatar" width="90%" />
</div>

Animated avatar in the footer with:
- **Mouse-tracking eyes** — Pupils follow cursor position in real-time
- **Math-based movement** — Position calculated as fraction of viewport dimensions
- **Smooth transitions** — CSS transform with calculated `translate()` values

### 📊 Custom Analytics

<div align="center">
<img src="docs/screenshots/analytics.png" alt="Custom Analytics Dashboard" width="90%" />
</div>

Built-in analytics system independent of Google Analytics:
- **Page view tracking** per route
- **Visitor data collection** with timestamps
- **Admin dashboard visualization** with summary metrics
- **JSON-based storage** for lightweight data persistence

---

## 📊 Admin Dashboard

<div align="center">
<img src="docs/screenshots/admin-dashboard.png" alt="Admin Dashboard Overview" width="90%" />
</div>

The portfolio includes a full-featured admin CMS accessible at `/admin`:

```mermaid
graph LR
    subgraph Auth["🔐 Authentication"]
        Login["Login Page"] --> NextAuth["NextAuth.js"]
        NextAuth --> BCrypt["bcrypt Verification"]
    end

    subgraph Dashboard["📊 Dashboard"]
        Overview["Dashboard Overview"]
        Overview --> PM["📁 Projects Manager"]
        Overview --> SM["⚡ Skills Manager"]
        Overview --> CM["📜 Certificates Manager"]
        Overview --> AN["📈 Analytics"]
        Overview --> ST["⚙️ Settings"]
        Overview --> AB["👤 About Editor"]
        Overview --> EX["💼 Experience"]
        Overview --> MD["🖼️ Media Manager"]
        Overview --> CT["📝 Content Editor"]
        Overview --> SE["🔍 SEO Settings"]
        Overview --> AP["🎨 Appearance"]
        Overview --> MS["💬 Messages"]
    end

    subgraph API["🔌 API Layer"]
        CRUD["REST API Routes"]
        CRUD --> JSONFiles["JSON Data Files"]
    end

    Auth --> Dashboard
    PM & SM & CM --> CRUD

    style Auth fill:#dc2626,stroke:#fff,color:#fff
    style Dashboard fill:#4a6cf7,stroke:#fff,color:#fff
    style API fill:#22c55e,stroke:#fff,color:#fff
```

### Admin Features



- **Full CRUD operations** for all content types
- **JSON file-based data persistence** — no external database required
- **Media upload** with react-dropzone integration
- **Real-time preview** of content changes
- **Role-based access** with NextAuth.js session management
- **Toast notifications** for operation feedback

---

## 🔧 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+ (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Dhruvesh1611/dhruveshshyara_portfolio.git

# 2. Navigate to the project directory
cd dhruveshshyara_portfolio

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials (see Environment Variables section)

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📦 Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🚀 Deployment

This portfolio is deployed on **Vercel** with automatic deployments on every push to `main`.

```mermaid
flowchart LR
    A["📝 Git Push"] --> B["🔄 Vercel Build"]
    B --> C["⚡ Next.js Build\nnpm run build"]
    C --> D["🌐 Edge Network\nGlobal CDN"]
    D --> E["✅ Live at\ndhruveshshyara.in"]

    style A fill:#4a6cf7,stroke:#fff,color:#fff
    style E fill:#22c55e,stroke:#fff,color:#fff
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dhruvesh1611/dhruveshshyara_portfolio)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel Dashboard → Settings → Environment Variables
4. Deploy! 🎉

---

## 📈 Performance
The portfolio is optimized for performance with:

- **Next.js Image Optimization** — Automatic resizing, lazy loading, and WebP conversion
- **Font Optimization** — Self-hosted Google Fonts via `next/font` (zero layout shift)
- **Code Splitting** — Automatic route-based code splitting
- **CSS Optimization** — Single CSS file with efficient selectors
- **Framer Motion** — `viewport={{ once: true }}` to animate only on first view
- **Priority Loading** — Hero image marked with `priority` for LCP optimization

---

## 📁 Featured Projects

<div align="center">
<img src="docs/screenshots/featured-projects.png" alt="Featured Projects Showcase" width="90%" />
</div>

| # | Project | Tech Stack | Links |
|---|---------|------------|-------|
| 🏆 | **Doppelganger** — Azure AI Code Assistant | TypeScript, VS Code API, Azure OpenAI, ChromaDB | [GitHub](https://github.com/Dhruvesh1611/Doppelganger-March-2026-Eklavya) · [Live](https://azure-ai-code-assistant.vercel.app/) |
| 👗 | **Yaritu** — Premium Fashion Showcase | Next.js, MongoDB, AWS S3, Cloudinary | [GitHub](https://github.com/Dhruvesh1611/yaritu) · [Live](https://yaritu.vercel.app) |
| 💍 | **Shyara Gold** — Jewelry E-commerce | React, Node.js, Express, MongoDB | [GitHub](https://github.com/codinggita/shyara_gold) · [Live](https://shyara-gold.netlify.app/) |
| 🎨 | **Tattoo Studio** — Membership Platform | React, Node.js, JWT, MongoDB | [GitHub](https://github.com/Dhruvesh1611/tattoos_website) · [Live](https://tattoos-dreamers-studio.onrender.com/) |
| 📄 | **HireLens** — AI Resume Optimizer | Next.js, TypeScript, Gemini API, Redis | [GitHub](https://github.com/Dhruvesh1611/Team-Velox-AI-RESUME-OPTIMIZER) · [Live](https://hirelens.dev) |
| 🔄 | **YT Shorts Auto-Scroller** | JavaScript, Chrome Extension, Manifest V3 | [GitHub](https://github.com/Dhruvesh1611/auto-scroll-extension) |

---

## 🤝 Contact

<div align="center">

| Platform | Link |
|----------|------|
| 🌐 **Portfolio** | [dhruveshshyara.in](https://dhruveshshyara.in) |
| 💼 **LinkedIn** | [linkedin.com/in/dhruveshshyara](https://linkedin.com/in/dhruveshshyara) |
| 🐙 **GitHub** | [github.com/Dhruvesh1611](https://github.com/Dhruvesh1611) |
| 📧 **Email** | [dhruvesh.shyara.cg@gmail.com](mailto:dhruvesh.shyara.cg@gmail.com) |
| 📱 **Phone** | +91-9327595429 |

</div>

---

<div align="center">

**Design & Built by Dhruvesh Shyara © 2026**

⭐ If you liked this portfolio, consider giving it a star!

</div>

