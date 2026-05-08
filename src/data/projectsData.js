export const allProjects = [
    {
        id: 1,
        slug: "doppelganger",
        title: "Doppelganger — Azure AI Code Assistant",
        category: "Fullstack",
        description: "🏆 1st Place among 33 teams — AI-powered VS Code extension that detects Azure SDK coding context and generates Copilot-style inline ghost text suggestions, backed by a RAG pipeline with ChromaDB, feedback collection, and a companion product website.",
        image: "/projects/doppelganger.png",
        tags: ["TypeScript", "VS Code API", "Azure OpenAI", "Node.js", "Express", "ChromaDB", "MongoDB", "React", "Groq LLM"],
        youtubeVideoId: "gNV1cgxKt5U",
        subtitle: "🏆 1st Place — Doppelganger 30-Hour Build Sprint by OpenPools",
        timeline: "March 2026 (30-Hour Build Sprint)",
        role: "Frontend Developer & Project Workflow Coordinator",
        hackathon: {
            achievement: "🏆 1st Place winner",
            eventName: "Doppelganger 30-Hour Build Sprint",
            organizer: "OpenPools.in",
            duration: "30 Hours",
            category: "AI + Cloud + Developer Tools",
            teamName: "Team Eklavya",
            teamMembers: [
                { name: "Dhruvesh Shyara", role: "Frontend Development & Project Workflow Coordination" },
                { name: "Priy Mavani", role: "Backend Developer (API Development & Deployment)" },
                { name: "Arjun Divraniya", role: "Extension Logic Pipeline & Integration" },
                { name: "Mayank Dudhatra", role: "RAG System, Research & Feedback System" }
            ],
            mentors: "CodingGita & Patel Neel Maheshkumar",
            keyLearnings: [
                "The power of team collaboration under pressure",
                "Building real developer tools in a limited time",
                "Turning an idea into a working product within 30 hours"
            ]
        },
        purpose: "Built during the Doppelganger 30-Hour Build Sprint hackathon organized by OpenPools — where Team Eklavya secured 1st Rank among 33 teams. The extension eliminates AI hallucinations in Azure SDK code suggestions by using context-injected Azure documentation retrieval (RAG) to provide accurate, grounded inline completions for JS/TS/C# developers.",
        detailedDescription: "Doppelganger is a full-stack developer tool consisting of a VS Code extension, an Express backend API, and a React-based marketing website — built in an intense 30-hour hackathon sprint.\n\nThe extension detects when a developer is working with Azure SDKs (storage, cosmos, identity, keyvault, service-bus, etc.) and provides inline ghost text suggestions powered by Groq's Llama model. A RAG pipeline using ChromaDB ensures suggestions are grounded in real Azure documentation, drastically reducing hallucinations.\n\nThe backend orchestrates the entire pipeline — context analysis, vector retrieval with SDK-specific filtering, prompt construction, and response cleanup. A feedback endpoint with MongoDB persistence enables continuous improvement of suggestion quality. The extension also features automatic Azure import injection, intent detection from comments, and a multi-layer caching system (session + Redis) that reduces API calls by 80%+.\n\nWhile working with Azure SDKs, developers often need to repeatedly go through documentation and copy commands manually — slowing down the development process. Our solution simplifies this workflow by providing AI-powered suggestions directly inside VS Code, helping developers use Azure SDKs without constantly switching to documentation.",
        features: [
            { icon: "⚡", title: "Copilot-Style Inline Suggestions", description: "Ghost text completions appear directly in the editor as you type Azure SDK code — accept with Tab, dismiss with Escape." },
            { icon: "🧠", title: "Azure-Aware Context Detection", description: "Automatically detects Azure SDK usage in JS/TS/C# (storage, cosmos, identity, keyvault, service-bus) and tailors suggestions accordingly." },
            { icon: "🔎", title: "RAG-Powered Documentation Grounding", description: "ChromaDB + embedding service retrieves relevant Azure docs to ground every suggestion in real documentation — no hallucinations." },
            { icon: "🛠️", title: "Auto Import & Quick Fixes", description: "Automatically injects missing Azure SDK imports and provides quick fix code actions for common patterns." },
            { icon: "⭐", title: "Feedback & Continuous Improvement", description: "Built-in feedback endpoint with MongoDB persistence allows rating suggestions for continuous model improvement." },
            { icon: "🧪", title: "Mock Mode for Local Development", description: "One boolean switch enables full local development without cloud dependencies — perfect for offline coding." }
        ],
        architecture: {
            frontend: "React (Marketing Website + VS Code Webview Panel)",
            backend: "Node.js, Express.js (API Service + RAG Pipeline)",
            database: "MongoDB (Feedback Storage), ChromaDB (Vector Store)",
            core: "TypeScript (VS Code Extension Host), Groq Llama LLM"
        },
        challenges: [
            {
                problem: "AI code assistants often hallucinate Azure SDK APIs that don't exist.",
                solution: "Implemented a RAG pipeline using ChromaDB with embedded Azure documentation, ensuring every suggestion is grounded in real, verified SDK references."
            },
            {
                problem: "YouTube Shorts-style SPA navigation in VS Code can cause content scripts to lose context.",
                solution: "Intercepted VS Code editor events, used MutationObserver patterns, and implemented a singleton architecture to ensure the extension reinitializes correctly on context changes."
            },
            {
                problem: "High API call volume during rapid typing creates latency and cost issues.",
                solution: "Built a multi-layer caching system (session + Redis) achieving 80%+ API call reduction, combined with a debounced typing watcher for intelligent trigger timing."
            },
            {
                problem: "Developers need to quickly switch between mock and production environments during development.",
                solution: "Designed a single-boolean configuration switch that seamlessly toggles between mock fallback behavior and full cloud backend — zero config changes needed."
            }
        ],
        projectStructure: [
            "azure-ai-code-extension/extension/src — VS Code extension host, inline provider, code watcher, Azure detector",
            "azure-ai-code-extension/backend/src — Express API, RAG service, LLM integration, feedback controller",
            "azure-ai-code-extension/extension/webview — React app rendered in VS Code panel",
            "azure-ai-code-extension/extension/frontend — React marketing/demo website",
            "azure-ai-code-extension/shared — Shared constants and types across packages"
        ],
        standoutPoints: [
            "🏆 1st Place Winner: Secured 1st Rank among 33 teams at the Doppelganger 30-Hour Build Sprint by OpenPools.",
            "Published on VS Code Marketplace: Live extension available for immediate download and use.",
            "Zero Hallucination Architecture: RAG pipeline eliminates the #1 problem with AI code assistants.",
            "Security-First: Always suggests DefaultAzureCredential over connection strings.",
            "Intent Detection: Detects developer intent from comments (e.g., '// I need to upload to blob' → generates full function).",
            "30-Hour Sprint: Entire project — extension, backend API, RAG pipeline, and marketing website — built in just 30 hours."
        ],
        github: "https://github.com/Dhruvesh1611/Doppelganger-March-2026-Eklavya",
        live: "https://azure-ai-code-assistant.vercel.app/",
        marketplace: "https://marketplace.visualstudio.com/items?itemName=TEAMEKLAVYA.azure-ai-code-assistant"
    },
    {
        id: 2,
        slug: "yaritu",
        title: "Yaritu — Premium Fashion & Jewelry Showcase",
        category: "Fullstack",
        description: "A high-performance, commercial-grade showcase platform built for a premium wedding clothing and jewelry brand. Features cloud-native media optimization and custom CMS.",
        image: "/projects/yaritu.png",
        tags: ["Next.js", "React", "MongoDB", "AWS S3", "Cloudinary", "NextAuth", "Framer Motion", "Node.js"],
        youtubeVideoId: "2tve8WuCZ_0", // Replace with your actual YouTube video ID
        subtitle: "High-Performance Luxury Fashion Ecosystem",
        timeline: "Jan 2024 - Mar 2024",
        role: "Lead Fullstack Developer",
        purpose: "Yaritu is a real-world freelancing project developed to bridge the gap between high-end fashion retail and digital accessibility. The platform is engineered for speed, scalability, and zero-code content management for non-technical brand owners.",
        detailedDescription: "The application leverages Next.js for superior SEO and performance, ensuring that high-resolution media is served efficiently. By integrating a dual-cloud storage strategy (AWS S3 for reliability and Cloudinary for optimization), the platform maintains lightning-fast load times even with heavy video content.\n\nOn the administrative side, a secure, role-based dashboard allows the brand to manage their entire digital presence—from celebrity endorsements and jewelry collections to real-time marketing offers—without writing a single line of code.",
        features: [
            { icon: "📱", title: "Immersive Visual Experience", description: "Instagram-style vertical video cards, a dedicated celebrity showcase section, and fluid motion UI powered by Framer Motion." },
            { icon: "🔐", title: "Custom CMS & Admin Dashboard", description: "Secure NextAuth integration allowing brand owners to manage inventory, jewelry listings, and real-time marketing banners." },
            { icon: "☁️", title: "Cloud-Native Media Pipeline", description: "AWS S3 storage with Cloudinary CDN transformation and automated compression for 4K media delivery." },
            { icon: "💬", title: "Customer Conversion Tools", description: "Integrated WhatsApp Business chat, automated offer subscription for lead capture, and dynamic testimonial engines." }
        ],
        architecture: {
            frontend: "Next.js (App Router), React.js, Framer Motion, Vanilla CSS",
            backend: "Node.js, Next.js API Routes, NextAuth.js",
            database: "MongoDB Atlas with Mongoose ORM"
        },
        dataLayer: [
            "Jewellery & Clothing Models: Relational schemas to handle complex fashion categories.",
            "Celebrity & Trending Video Models: Optimized data fetching for media-heavy sections.",
            "Admin & Subscription Data: Secure storage for credentials and customer leads."
        ],
        roadmap: [
            "E-commerce Module: Transitioning to a full-service store with Razorpay/Stripe.",
            "AI Fashion Assistant: Outfit suggestions based on user browsing history.",
            "AR Virtual Try-On: Augmented Reality jewelry visualization for customers."
        ],
        standoutPoints: [
            "Professional Freelance Pedigree: Built for a commercial client, not a tutorial.",
            "Hybrid Cloud Strategy: Sophisticated S3 + Cloudinary enterprise media handling.",
            "High Lighthouse Scores: Optimized for Core Web Vitals and premium performance.",
            "Zero-Code Management: Completely dynamic backend for full client control."
        ],
        github: "https://github.com/Dhruvesh1611/yaritu",
        live: "https://yaritu.vercel.app"
    },
    {
        id: 3,
        slug: "shyara-gold",
        title: "Shyara Gold (Full-Stack Jewelry E-commerce Platform)",
        category: "Fullstack",
        description: [
            "Full-stack web application for digitalizing the jewelry shopping experience.",
            "Robust system for managing and browsing multiple gold and diamond jewelry categories.",
            "Dedicated sections for Rings, Necklaces, Bangles, Mangalsutra, Pendants, Earrings, and Chains.",
            "Advanced real-time search functionality across the platform.",
            "Polished, responsive UI/UX with custom CSS and React components.",
            "Cloudinary integration for high-quality image management.",
            "Contact & Inquiry system for custom user requests."
        ],
        image: "/projects/shyaragold.png",
        tags: ["React.js", "Vite", "HTML5", "CSS3", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
        youtubeVideoId: "OAvjmlRpBAA",
        purpose: "Shyara Gold provides a premium jewelry shopping experience with high-fidelity visuals, real-time search, and secure checkout.",
        detailedDescription: `Key Features (Main Functions):

    - Dynamic Product Categories for all major jewelry types
    - Real-time product search with SearchContext
    - Responsive, animated UI/UX
    - Cloudinary-powered media management
    - Custom Contact Us form for inquiries

    Technical Stack:
    - Frontend: React.js, Vite, HTML5, CSS3
    - Backend: Node.js, Express.js
    - Database: MongoDB (MERN stack)
    - State: React Context API
    - Cloud: Cloudinary

    Technical Highlights:
    - RESTful APIs for seamless frontend-backend data flow
    - SPA navigation with React Router and breadcrumbs
    - Component-based, scalable codebase
    - Fast builds with Vite

    Project Structure:
    - backend/: Server logic and Cloudinary config
    - frontend/src/components/: All reusable UI components
    - frontend/src/style/: Section-specific CSS modules
    `,
        features: [
            { icon: "📂", title: "Dynamic Product Categories", description: "Multiple jewelry segments (Rings, Necklaces, Bangles, Mangalsutra, Pendants, Earrings, Chains) with dedicated sections." },
            { icon: "🔍", title: "Live Search Functionality", description: "Advanced SearchContext for real-time product search across the platform." },
            { icon: "✨", title: "Interactive UI/UX", description: "Polished animations and responsive design using custom CSS and React components." },
            { icon: "🖼️", title: "Media Management", description: "Cloudinary integration for efficient storage and serving of high-quality jewelry images." },
            { icon: "📞", title: "Contact & Inquiry System", description: "Dedicated Contact Us form for custom user inquiries." }
        ],
        architecture: {
            frontend: "React.js, Vite, HTML5, CSS3",
            backend: "Node.js, Express.js",
            database: "MongoDB (MERN stack)",
            state: "React Context API",
            cloud: "Cloudinary"
        },
        standoutPoints: [
            "MERN Stack Expertise: RESTful APIs for seamless frontend-backend data flow.",
            "SPA Experience: React Router for smooth navigation and breadcrumbs.",
            "Component-Based Architecture: Easy maintenance with reusable UI components.",
            "Performance: Vite for fast development and production builds."
        ],
        projectStructure: [
            "backend/: Server logic (server.js) and Cloudinary config files.",
            "frontend/src/components/: All reusable UI components (BanglesSection, RingsSection, Home_page, etc.)",
            "frontend/src/style/: Section-specific CSS modules for clean styling."
        ],
        github: "https://github.com/codinggita/shyara_gold",
        live: "https://shyara-gold.netlify.app/"
    },
    {
        id: 4,
        slug: "tattoo-studio",
        title: "Tattoo Studio - Membership Program",
        category: "Fullstack",
        description: [
            "Open-source full-stack membership platform for tattoo studios.",
            "Robust Loyalty & Rewards System to drive customer engagement and repeat business.",
            "Digital wallet for tracking points, rewards, and activity history.",
            "Tiered VIP system with exclusive benefits and discounts.",
            "Secure JWT-authenticated user accounts."
        ],
        image: "/projects/tatto-web.png",
        tags: ["React", "Node.js", "JWT", "MongoDB"],
        purpose: "A customer engagement module built for a tattoo studio. The system encourages repeat bookings by rewarding customers with points for various actions like session booking, referrals, reviews, and social media engagement.",
        detailedDescription: "This open-source project implements a full gamified Loyalty & Rewards System for a tattoo studio. Customers earn points through actions, redeem them for discounts and freebies, and unlock VIP tiers (Silver, Gold, Platinum) with escalating benefits. A dedicated Digital Wallet and Tracking Dashboard lets users monitor their points balance, upcoming rewards, and activity history in real-time. All points calculation and tier upgrades are automated via backend logic.",
        features: [
            { icon: "🎯", title: "Gamified Points System", description: "Session booking (100 pts), referral (200 pts), review (50 pts), social follow (25 pts) — all actions earn rewards." },
            { icon: "🎁", title: "Redeemable Rewards", description: "500 pts: 10% off next tattoo. 1,000 pts: Free aftercare kit. 2,000 pts: Small free tattoo." },
            { icon: "🔥", title: "VIP Tiers", description: "Silver (1,000 pts): 5% off. Gold (2,500 pts): 10% off + priority booking. Platinum (5,000 pts): 15% off + free merchandise." },
            { icon: "📊", title: "Digital Wallet & Dashboard", description: "Real-time points balance, upcoming rewards, and full activity history tracking for every user." },
            { icon: "⚡", title: "Automated Backend Logic", description: "Points calculation and tier upgrades are fully automated — every user action instantly updates their status." }
        ],
        architecture: {
            frontend: "React.js (User profile & points display)",
            backend: "Node.js & Express.js (Point calculation logic)",
            database: "MongoDB (User history & tier status storage)",
            state: "React Context API (AuthContext for user status tracking)"
        },
        challenges: [
            {
                problem: "Customer retention is difficult in the tattoo industry — clients rarely return after one session.",
                solution: "Built a gamified points system where session booking (100 pts), referrals (200 pts), and reviews (50 pts) all earn rewards to encourage repeat visits."
            },
            {
                problem: "Users had no easy way to track their points and progress.",
                solution: "Created a dedicated Digital Wallet and Tracking Dashboard where users can view their points balance and upcoming rewards in real-time."
            },
            {
                problem: "Basic rewards weren't enough to differentiate highly loyal customers.",
                solution: "Implemented VIP Tiers (Silver, Gold, Platinum) that automatically unlock escalating benefits like priority booking and flat discounts (up to 15%) as users earn more points."
            },
            {
                problem: "Manual tracking was error-prone and time-consuming for the business.",
                solution: "Automated all points calculation and tier upgrades via backend logic — every user action instantly updates their status without manual intervention."
            },
            {
                problem: "Needed to boost business growth and social media engagement organically.",
                solution: "Added rewards for social media follows (25 pts) and friend referrals (200 pts), driving organic marketing and community growth for the studio."
            }
        ],
        projectStructure: [
            "Backend/models/User.js — Defines points and VIP tier schema.",
            "Backend/routes/authRoutes.js — Handles digital membership card and signup logic.",
            "vite_app/src/components/UserProfile.jsx — Displays user's digital wallet and points.",
            "vite_app/src/contexts/AuthContext.jsx — Tracks loyal customer status at a global level."
        ],
        standoutPoints: [
            "Gamified Engagement: Points-based system that directly drives repeat bookings and customer loyalty.",
            "Automated VIP System: Tier upgrades happen automatically as users earn points — zero manual work.",
            "Real-Time Dashboard: Users can track points, rewards, and history instantly from their profile.",
            "Organic Marketing: Referral and social media rewards encourage organic business growth.",
            "Open Source: Built as a community-driven project with clean, scalable architecture."
        ],
        github: "https://github.com/Dhruvesh1611/tattoo-studio",
        live: "https://tattoos-dreamers-studio.onrender.com/"
    },
    {
        id: 5,
        slug: "youtube-shorts-auto-scroller",
        title: "YouTube Shorts Auto-Scroller",
        category: "Browser Extension",
        description: "A high-performance Chrome extension that enhances YouTube Shorts viewing by intelligently auto-scrolling to the next video when one ends, with an automated 'Skip Sponsored' mode to filter ads seamlessly.",
        image: "/projects/yt-shorts-scroller.png",
        tags: ["JavaScript", "Chrome Extension", "Manifest V3", "MutationObserver", "HTML5 Video API"],
        youtubeVideoId: "ciPr7EpB4Vo",
        purpose: "Built to solve the frustration of manually scrolling through YouTube Shorts. This extension provides a hands-free viewing experience with smart ad detection and skip functionality.",
        detailedDescription: "YouTube Shorts Auto-Scroller is an intelligent browser extension that transforms the Shorts viewing experience. Since YouTube Shorts loop automatically, the standard HTML5 'ended' event never fires—making traditional detection methods useless. This extension implements a sophisticated timeupdate listener that calculates remaining duration and triggers smooth scrolling when the video is within 0.5 seconds of completion.\n\nThe extension also tackles YouTube's SPA architecture by intercepting history.pushState and history.replaceState, combined with a MutationObserver to ensure the script re-initializes precisely when URL or DOM changes occur. The ad-filtering system uses advanced pattern matching to identify and automatically bypass sponsored shorts.",
        features: [
            { icon: "🔄", title: "Intelligent Auto-Scroll", description: "Uses native video event listeners to trigger smooth scroll to the next video exactly when the current one finishes." },
            { icon: "🚫", title: "Ad-Filtering (Skip Sponsored)", description: "Employs advanced pattern matching to identify and automatically bypass sponsored shorts or ads." },
            { icon: "🔗", title: "SPA-Aware Navigation", description: "Implements MutationObserver and History API interception to remain active during YouTube's dynamic page transitions." },
            { icon: "⚡", title: "Performance Optimized", description: "Built with 'single event listener' architecture to prevent memory leaks and ensure low CPU/Memory overhead." }
        ],
        architecture: {
            frontend: "Popup UI (HTML/CSS/JS)",
            backend: "Background Service Worker, Content Scripts",
            core: "Modular Singleton Pattern, React Hooks integration"
        },
        challenges: [
            {
                problem: "YouTube Shorts loop automatically, meaning the standard HTML5 'ended' event never fires.",
                solution: "Implemented a timeupdate listener that calculates remaining duration and triggers scroll when video is within 0.5 seconds of completion."
            },
            {
                problem: "YouTube is a Single Page Application (SPA); content script can lose track when navigating from Home to Shorts.",
                solution: "Intercepted history.pushState and history.replaceState, combined with MutationObserver to ensure script re-initializes on URL/DOM changes."
            }
        ],
        projectStructure: [
            "manifest.json - Manifest V3 configuration",
            "background.js - Service worker for script injection",
            "popup.html/js - Extension UI and toggle logic",
            "src/autoScroller.js - Core business logic (Singleton)",
            "src/contentScript.js - DOM-level interaction & ad detection",
            "src/useAutoScroller.js - React integration hook"
        ],
        standoutPoints: [
            "Manifest V3 Compliant: Built using the latest Chrome Extension standards.",
            "Cross-Framework Compatible: Works as standalone extension, React hook, or via programmatic control.",
            "Zero Memory Leaks: Single event listener architecture prevents performance degradation.",
            "Seamless SPA Handling: Advanced navigation detection for YouTube's dynamic routing."
        ],
        github: "https://github.com/Dhruvesh1611/youtube-shorts-auto-scroller",
        live: null
    },
    {
        id: 6,
        slug: "eatclub-clone",
        title: "EatClub Clone",
        category: "Frontend",
        description: [
            "Pixel-perfect responsive clone of the EatClub food delivery website.",
            "Modern, clean layout with interactive navigation and smooth scrolling.",
            "Fully responsive across mobile, tablet, and desktop breakpoints.",
            "Built from scratch using only HTML5, CSS3, and vanilla JavaScript."
        ],
        image: "/projects/eatclub.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        purpose: "Built to sharpen responsive design skills by reverse-engineering a real-world food delivery platform. Focused on pixel-perfect layout recreation, mobile-first design, and clean semantic HTML.",
        detailedDescription: "A complete frontend clone of the EatClub website, recreated from scratch without any CSS frameworks. This project focuses on mastering responsive web design, flexbox/grid layouts, and interactive UI elements using vanilla JavaScript. Every section — from the hero banner to the footer — was hand-coded to match the original design as closely as possible, serving as a deep-dive into professional web layout techniques.",
        features: [
            { icon: "📱", title: "Fully Responsive Design", description: "Adapts seamlessly across all screen sizes using CSS media queries and flexible layouts." },
            { icon: "🎨", title: "Pixel-Perfect Layout", description: "Recreated every section of the original EatClub website with attention to spacing, typography, and color." },
            { icon: "⚡", title: "Interactive Elements", description: "Smooth scrolling, hover effects, and dynamic navigation built with vanilla JavaScript." },
            { icon: "🧱", title: "Semantic HTML", description: "Clean, accessible markup using proper HTML5 semantic elements throughout." }
        ],
        standoutPoints: [
            "Responsive Mastery: Built mobile-first with fluid grids and breakpoints for every device.",
            "No Frameworks: Pure HTML/CSS/JS — no Bootstrap, Tailwind, or libraries used.",
            "Real-World Patterns: Explored professional e-commerce UI patterns, card layouts, and CTAs.",
            "Reverse Engineering: Strengthened ability to analyze and rebuild live production websites."
        ],
        technologyStack: [
            { name: "HTML5", icon: "🧱" },
            { name: "CSS3", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" }
        ],
        github: "https://github.com/Dhruvesh1611/website1-Eat-club-",
        live: "https://eatclub-clone.netlify.app/"
    },
    {
        id: 7,
        slug: "rolls-royce-clone",
        title: "Rolls-Royce Clone",
        category: "Frontend",
        description: [
            "Elegant clone of the Rolls-Royce luxury car website.",
            "Smooth CSS animations and transitions for a premium feel.",
            "High-end visual design with attention to typography and spacing.",
            "Fully responsive layout optimized for all devices."
        ],
        image: "/projects/rollsroyce.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        purpose: "Built to master CSS animations, luxury branding aesthetics, and the art of designing premium, visually rich web experiences from scratch.",
        detailedDescription: "A frontend clone of the Rolls-Royce official website, focusing on delivering a luxury feel through smooth animations, elegant typography, and cinematic layouts. Every transition and hover effect was carefully crafted to replicate the premium brand identity. This project served as a deep exploration of advanced CSS techniques including keyframe animations, parallax-style effects, and high-contrast visual storytelling.",
        features: [
            { icon: "✨", title: "Smooth Animations", description: "Advanced CSS keyframe animations and transitions for a cinematic, luxury browsing experience." },
            { icon: "🖋️", title: "Premium Typography", description: "Carefully selected fonts, letter-spacing, and text hierarchy to match the Rolls-Royce brand identity." },
            { icon: "🎬", title: "Cinematic Layouts", description: "Full-screen hero sections with high-contrast imagery and parallax-style visual storytelling." },
            { icon: "📱", title: "Responsive Design", description: "Optimized for all screen sizes while maintaining the luxury aesthetic across devices." }
        ],
        standoutPoints: [
            "Advanced CSS: Mastered keyframe animations, transitions, and transform properties.",
            "Brand Replication: Studied and recreated a luxury brand's visual identity from scratch.",
            "Visual Storytelling: Learned to convey premium value through layout, whitespace, and motion.",
            "Design Analysis: Strengthened ability to deconstruct high-end website designs and implement them."
        ],
        technologyStack: [
            { name: "HTML5", icon: "🧱" },
            { name: "CSS3", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" }
        ],
        github: "https://github.com/Dhruvesh1611/website2-rolls-royce-",
        live: "https://rollsroyce-clone.netlify.app/"
    },
    {
        id: 8,
        slug: "libas-clone",
        title: "Libas Clone",
        category: "Frontend",
        description: [
            "Fashion e-commerce website clone with product showcase and modern UI.",
            "Product grid layouts with hover effects and category filtering.",
            "Responsive navigation with search functionality.",
            "Clean, modular CSS for scalable styling."
        ],
        image: "/projects/libas.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        purpose: "Built to explore e-commerce frontend patterns — product grids, category navigation, search bars, and responsive card layouts commonly used in fashion retail platforms.",
        detailedDescription: "A frontend clone of the Libas fashion e-commerce website, recreating the product showcase, category navigation, and shopping experience. This project focused on mastering CSS Grid for product layouts, implementing hover-based interactions for product cards, and building a responsive navigation system. It served as a practical exercise in understanding how fashion e-commerce platforms structure their frontend for maximum visual appeal and usability.",
        features: [
            { icon: "🛍️", title: "Product Grid Layout", description: "CSS Grid-based product showcase with hover effects, image scaling, and quick-view overlays." },
            { icon: "🔍", title: "Search & Navigation", description: "Responsive navbar with search functionality and category-based browsing." },
            { icon: "📱", title: "Mobile-First Approach", description: "Designed for mobile devices first, then scaled up for tablet and desktop." },
            { icon: "🎨", title: "Fashion-Forward UI", description: "Clean typography, soft color palette, and whitespace-driven layout for a premium shopping feel." }
        ],
        standoutPoints: [
            "E-Commerce Patterns: Mastered product card layouts, grids, and interactive hover states.",
            "CSS Grid Expertise: Built complex, responsive grid systems without frameworks.",
            "User-Centric Design: Focused on how fashion platforms guide users through browsing and discovery.",
            "Modular CSS: Structured stylesheets for maintainability and scalability."
        ],
        technologyStack: [
            { name: "HTML5", icon: "🧱" },
            { name: "CSS3", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" }
        ],
        github: "https://github.com/Dhruvesh1611/website3-libas-",
        live: "https://libas-web.netlify.app/"
    },
    {
        id: 9,
        slug: "snake-game",
        title: "Snake Game",
        category: "Frontend",
        description: [
            "Classic Snake arcade game built with JavaScript and HTML5 Canvas.",
            "Real-time game loop with smooth rendering and collision detection.",
            "Score tracking, speed progression, and game-over logic.",
            "Keyboard controls with responsive canvas sizing."
        ],
        image: "/projects/game.png",
        tags: ["JavaScript", "HTML5 Canvas", "CSS3"],
        purpose: "Built to strengthen core JavaScript skills through game development — implementing game loops, collision detection, state management, and real-time rendering with HTML5 Canvas.",
        detailedDescription: "A fully functional Snake game built from scratch using vanilla JavaScript and the HTML5 Canvas API. The game features a real-time game loop that handles snake movement, food generation, collision detection, and score tracking. As the player progresses, the snake speeds up, adding increasing difficulty. This project was a deep dive into event-driven programming, canvas rendering, and managing complex game state without any external libraries.",
        features: [
            { icon: "🎮", title: "Real-Time Game Loop", description: "Smooth 60fps game loop using requestAnimationFrame for fluid snake movement and rendering." },
            { icon: "💥", title: "Collision Detection", description: "Pixel-perfect collision logic for walls, self-collision, and food pickup." },
            { icon: "📈", title: "Progressive Difficulty", description: "Snake speed increases as score grows, keeping the gameplay challenging and engaging." },
            { icon: "🏆", title: "Score Tracking", description: "Real-time score display with high-score persistence during the session." }
        ],
        standoutPoints: [
            "Canvas Mastery: Deep understanding of HTML5 Canvas API for 2D game rendering.",
            "Game Logic: Implemented complex state management for movement, food, and collisions.",
            "Event-Driven Design: Keyboard event handling for responsive, lag-free controls.",
            "Zero Dependencies: Built entirely with vanilla JavaScript — no game engines or libraries."
        ],
        technologyStack: [
            { name: "JavaScript", icon: "⚡" },
            { name: "Canvas", icon: "🎨" },
            { name: "CSS3", icon: "💅" }
        ],
        github: "https://github.com/Dhruvesh1611/snake-game",
        live: "https://snake-game-demo.netlify.app/"
    },
    {
        id: 10,
        slug: "ui-ux-yaritu",
        title: "UI/UX Design - Yaritu",
        category: "UI/UX",
        description: [
            "Complete Figma design for Yaritu — a luxury wedding outfit rental platform.",
            "Elegant user flows and visual hierarchy for a premium brand experience.",
            "Color palette, typography system, and component library designed from scratch.",
            "Wireframes, high-fidelity mockups, and interactive prototypes."
        ],
        image: "/projects/yaritu_figma.png",
        tags: ["UI/UX", "Figma"],
        purpose: "Designed the complete visual identity and user experience for Yaritu before development. This was the foundational design phase where every screen, user flow, and interaction was planned and prototyped in Figma.",
        detailedDescription: "The Yaritu UI/UX project was the design foundation for the full-stack Yaritu platform. Starting from user research and competitor analysis, the design process included wireframing, creating a cohesive color palette inspired by luxury wedding aesthetics, selecting elegant serif and sans-serif font pairings, and building a reusable Figma component library. High-fidelity mockups were created for every major screen — homepage, product listing, celebrity showcase, jewelry gallery, and admin dashboard. Interactive prototypes were used to validate user flows before a single line of code was written.",
        features: [
            { icon: "🎨", title: "Visual Identity System", description: "Custom color palette, typography scale, and spacing system designed to reflect luxury wedding aesthetics." },
            { icon: "📐", title: "Wireframes & Mockups", description: "Low-fidelity wireframes evolved into pixel-perfect high-fidelity mockups for every screen." },
            { icon: "🔄", title: "Interactive Prototyping", description: "Clickable Figma prototypes to test user flows, navigation, and micro-interactions before development." },
            { icon: "📚", title: "Component Library", description: "Reusable Figma components (buttons, cards, modals, forms) for design consistency and faster iteration." }
        ],
        standoutPoints: [
            "Design-First Approach: Every screen was designed and validated before any code was written.",
            "Luxury Branding: Color, typography, and layout choices reflect high-end wedding fashion.",
            "User Flow Mapping: Complete user journeys mapped from landing to conversion.",
            "Design System: Reusable component library that scaled from design to development seamlessly."
        ],
        technologyStack: [
            { name: "Figma", icon: "🎨" },
            { name: "UI/UX", icon: "📱" }
        ],
        github: "#",
        live: "#",
        figma: "#"
    },
    {
        id: 11,
        slug: "ui-ux-shyara-gold",
        title: "UI/UX Design - Shyara Gold",
        category: "UI/UX",
        description: [
            "Figma design for Shyara Gold — a premium jewelry e-commerce platform.",
            "Focused on trust, clarity, and conversion-driven layouts.",
            "Product showcase designs with high-fidelity jewelry imagery.",
            "Responsive design system covering mobile and desktop experiences."
        ],
        image: "/projects/shyara_gold_figma.png",
        tags: ["UI/UX", "Figma"],
        purpose: "Designed the complete UI/UX for Shyara Gold to create a premium, trustworthy online jewelry shopping experience. The design focuses on showcasing products beautifully while guiding users smoothly from browsing to inquiry.",
        detailedDescription: "The Shyara Gold UI/UX project established the visual language for the full-stack jewelry e-commerce platform. The design process included studying competitor jewelry websites, understanding customer psychology around trust and premium perception, and translating those insights into a clean, elegant interface. High-fidelity mockups were created for product listing pages, category sections (Rings, Necklaces, Bangles, etc.), search functionality, and the contact/inquiry system. Special attention was given to image presentation — ensuring jewelry photos appear vivid and luxurious against carefully chosen background gradients.",
        features: [
            { icon: "💎", title: "Premium Product Showcase", description: "Jewelry images presented with elegant backgrounds, shadows, and spacing to convey luxury and quality." },
            { icon: "🧭", title: "Conversion-Driven Layout", description: "User flows designed to guide visitors from browsing categories to submitting inquiries with minimal friction." },
            { icon: "📱", title: "Responsive Design System", description: "Mockups for both mobile and desktop, ensuring a consistent shopping experience across all devices." },
            { icon: "🎯", title: "Trust-Building Elements", description: "Design patterns for testimonials, certifications, and brand storytelling to build customer confidence." }
        ],
        standoutPoints: [
            "E-Commerce UX: Designed for conversion — clear CTAs, category browsing, and smooth inquiry flows.",
            "Jewelry-Specific Design: Image presentation optimized for gold and diamond products.",
            "Customer Psychology: Trust signals, social proof, and brand credibility baked into the design.",
            "Design-to-Dev Handoff: Clean, organized Figma file ready for seamless developer implementation."
        ],
        technologyStack: [
            { name: "Figma", icon: "🎨" },
            { name: "UI/UX", icon: "📱" }
        ],
        github: "#",
        live: "#",
        figma: "#"
    },
    {
        id: 12,
        slug: "ui-ux-docscanx",
        title: "UI/UX Design - DocScanX",
        category: "UI/UX",
        description: [
            "Figma design for DocScanX — a mobile document scanning application.",
            "Optimized for speed, simplicity, and one-handed mobile usage.",
            "Clean, minimal interface with focus on core scanning functionality.",
            "Designed accessible UI with clear visual feedback and intuitive controls."
        ],
        image: "/projects/docscanx.png",
        tags: ["UI/UX", "Figma"],
        purpose: "Designed a mobile-first document scanning app interface that prioritizes speed, simplicity, and ease of use. The goal was to minimize taps between opening the app and scanning a document, while keeping the UI clean and accessible.",
        detailedDescription: "DocScanX is a UI/UX design project for a mobile document scanning application. The design philosophy centered on 'scan in 3 taps' — reducing friction between opening the app and capturing a document. The interface uses a minimal color palette with high-contrast elements for readability, large touch targets for one-handed use, and clear visual feedback during scanning (progress indicators, edge detection overlays). The design also includes screens for document management, PDF export, and sharing — all following a consistent, accessible design language.",
        features: [
            { icon: "📷", title: "Quick Scan Flow", description: "Designed a '3-tap scan' experience — open, capture, save — with minimal friction and maximum speed." },
            { icon: "👆", title: "One-Handed Mobile Design", description: "Large touch targets, bottom navigation, and thumb-zone-friendly layouts for comfortable single-hand use." },
            { icon: "🔲", title: "Edge Detection UI", description: "Visual overlay showing document edges during scanning, with auto-crop and manual adjustment controls." },
            { icon: "📄", title: "Document Management", description: "Clean file browser for organizing scanned documents, with PDF export and sharing capabilities." }
        ],
        standoutPoints: [
            "Mobile-First UX: Every design decision optimized for speed and ease on small screens.",
            "Accessibility: High-contrast colors, large touch targets, and clear visual feedback throughout.",
            "Real-World Problem Solving: Designed to solve an everyday utility need with minimal complexity.",
            "Prototyped Interactions: Figma prototype with realistic scanning flow and page transitions."
        ],
        technologyStack: [
            { name: "Figma", icon: "🎨" },
            { name: "UI/UX", icon: "📱" }
        ],
        github: "#",
        live: "#",
        figma: "#"
    }
];
