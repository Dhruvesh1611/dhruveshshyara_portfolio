export const allProjects = [
    {
        id: 1,
        slug: "yaritu",
        title: "Yaritu — Premium Fashion & Jewelry Showcase",
        category: "Fullstack",
        description: "A high-performance, commercial-grade showcase platform built for a premium wedding clothing and jewelry brand. Features cloud-native media optimization and custom CMS.",
        image: "/projects/yaritu.png",
        tags: ["Next.js", "React", "MongoDB", "AWS S3", "Cloudinary", "NextAuth", "Framer Motion", "Node.js"],
        youtubeVideoId: "2tve8WuCZ_0", // Replace with your actual YouTube video ID
        subtitle: "High-Performance Luxury Fashion Ecosystem",
        timeTaken: "8 Weeks",
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
        live: "https://yaritu.com/"
    },
    {
        id: 2,
        slug: "shyara-gold",
        title: "Shyara Gold — Luxury Jewelry E-Commerce Platform",
        category: "Fullstack",
        description: "A high-performance, full-stack e-commerce ecosystem built with the MERN stack, specifically designed for a premium jewelry brand. Features dynamic collection management, secure authentication, and a unique 'Design Upload' system for custom jewelry requests.",
        image: "/projects/shyaragold.png",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Cloudinary", "JWT", "Tailwind CSS", "Framer Motion"],
        youtubeVideoId: "", // Add video ID if available
        subtitle: "Startup-Ready Jewelry E-Commerce Engine",
        timeTaken: "6 Weeks",
        role: "Full Stack Developer",
        purpose: "Shyara Gold is engineered to handle the complexities of a modern retail environment, moving beyond simple product listings to a fully interactive shopping experience. The platform prioritizes high-fidelity visuals and lightning-fast state management to ensure a premium feel for luxury shoppers.",
        detailedDescription: "The frontend is built with React.js and Redux Toolkit, providing a seamless, single-page application experience with real-time cart updates and fluid UI transitions. On the backend, a modular Express.js architecture paired with MongoDB Atlas ensures data integrity for product catalogs, user profiles, and order histories.\\n\\nA standout feature of this project is its custom media pipeline. Using Multer and Cloudinary, the application allows users to upload their own design inspirations, which are then processed and stored in the cloud, bridging the gap between digital browsing and personalized craftsmanship.",
        features: [
            { icon: "💎", title: "Premium Product Ecosystem", description: "Dynamic collections with real-time data fetching for categories like 'Best Sellers' and 'Editorial Picks.' High-fidelity gallery with responsive product grids, hover effects, and detailed modal views." },
            { icon: "🎨", title: "Custom Design Studio", description: "User-generated uploads integrated with Cloudinary API for personal jewelry design references. Cloud-native processing with automatic image optimization and secure storage using Multer." },
            { icon: "🛒", title: "Advanced Shopping Logic", description: "Redux-powered persistent shopping bag that maintains state across page refreshes. Secure checkout flow with structured API endpoints and real-time stock display." },
            { icon: "🔐", title: "Security & Authentication", description: "JWT session handling with secure, token-based authentication. Protected API routes with middleware-level security and B-crypt hashing for password protection." }
        ],
        architecture: {
            frontend: "React.js (Vite), Redux Toolkit, Tailwind CSS, Framer Motion",
            backend: "Node.js, Express.js, Mongoose (ODM)",
            database: "MongoDB Atlas with complex product schemas"
        },
        dataLayer: [
            "Product Schema: Complex attributes for jewelry specs (gold purity, weight, stone types).",
            "User Schema: Detailed profiles with order history and saved design uploads.",
            "Relational Logic: Seamless mapping between users, custom designs, and shopping cart items."
        ],
        standoutPoints: [
            "Beyond Standard CRUD: Includes complex logic for user-generated content and design uploads.",
            "Enterprise State Management: Expert use of Redux Toolkit for a glitch-free shopping experience.",
            "Mobile-First UX: Fully responsive components optimized for mobile conversion.",
            "Clean Codebase: Modular folder structure (MVC) following professional development standards."
        ],
        github: "https://github.com/codinggita/shyara_gold",
        live: "https://shyara-gold.netlify.app/"
    },
    {
        id: 3,
        slug: "tattoo-studio",
        title: "Tattoo Studio — Customer Loyalty & Rewards System",
        category: "Fullstack",
        description: "A specialized customer retention and loyalty ecosystem developed for a professional tattoo studio. Features a multi-tiered points system, digital rewards, and personalized user dashboard to drive repeat bookings and brand advocacy.",
        image: "/projects/tatto-web.jpeg",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Framer Motion"],
        youtubeVideoId: "", // Add video ID if available
        subtitle: "Gamified Customer Retention Platform",
        timeTaken: "5 Weeks",
        role: "Core Contributor & Backend Architect",
        purpose: "The primary goal was to increase customer lifetime value (CLV) and studio engagement by gamifying bookings, driving organic growth through referrals, and building a personalized VIP experience with a tiered membership structure that provides tangible value to loyal clients.",
        detailedDescription: "As a core contributor, I architected the loyalty logic that transforms a standard studio website into an interactive community platform. The system is designed to reward users not just for spending, but for active engagement—such as social media interactions, friend referrals, and review submissions.\\n\\nThe platform utilizes a secure MERN stack foundation, featuring a digital wallet for every user. My implementation includes a dynamic calculation engine that tracks points in real-time, manages VIP tier upgrades (Silver, Gold, Platinum), and handles secure reward redemption through an intuitive user interface.",
        features: [
            { icon: "🎫", title: "Digital Membership & Onboarding", description: "Instant loyalty card upon signup with digital membership ID and tracking dashboard. Centralized hub for users to track past tattoos, upcoming appointments, and earned benefits." },
            { icon: "🎯", title: "Multi-Action Reward Engine", description: "Automated 100-point credit for booking sessions. Integrated points for referring friends (200 pts), verified reviews (50 pts), and social media follows (25 pts)." },
            { icon: "🎁", title: "Automated Redemption System", description: "Tiered rewards with programmed logic for unlocking discounts (10% off), physical goods (Aftercare kits), and high-tier prizes (Free small tattoos). Exclusive VIP access to early style drops." },
            { icon: "📊", title: "Digital Wallet & Analytics", description: "Clean visual representation of current point balances with progress bars. Logged redemption history to prevent system abuse and ensure data integrity." }
        ],
        architecture: {
            frontend: "React.js, Tailwind CSS, Framer Motion (Reward Animations)",
            backend: "Node.js, Express.js, JWT (Secure Membership Sessions)",
            database: "MongoDB Atlas with Mongoose (User & Points Schemas)"
        },
        dataLayer: [
            "Loyalty Schema: Custom-built schema to track point accumulation sources (Session, Referral, Review).",
            "User VIP Logic: Middleware to automatically calculate and update user tiers based on point thresholds.",
            "Redemption Model: Secure logging of reward vouchers to ensure one-time use and studio verification."
        ],
        vipTiers: [
            { tier: "Silver", points: "1,000 pts", benefits: "Permanent 5% discount on all sessions" },
            { tier: "Gold", points: "2,500 pts", benefits: "10% discount + Priority scheduling privileges" },
            { tier: "Platinum", points: "5,000 pts", benefits: "15% discount + Exclusive studio merchandise" }
        ],
        standoutPoints: [
            "Gamification Strategy: Transforms customer experience into an interactive loyalty journey.",
            "Real-Time Points Engine: Dynamic calculation system with automated tier upgrades.",
            "Multi-Channel Engagement: Rewards social interactions, referrals, and reviews beyond transactions.",
            "Secure Wallet System: JWT-authenticated digital wallet with fraud prevention mechanisms."
        ],
        github: "https://github.com/Dhruvesh1611/tattoo-studio",
        live: "https://dhruveshshyara.com/"
    },
    {
        id: 4,
        slug: "eatclub-clone",
        title: "EatClub Clone",
        category: "Frontend",
        description: "A responsive clone of the EatClub website built with HTML5, CSS3, and JavaScript. Features include modern design and interactive elements.",
        image: "/projects/eatclub.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        purpose: "Frontend clone to practice high-end responsive design and layout techniques.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "HTML5", icon: "🧱" },
            { name: "CSS3", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" }
        ],
        github: "https://github.com/Dhruvesh1611/website1-Eat-club-",
        live: "https://eatclub-clone.netlify.app/"
    },
    {
        id: 5,
        slug: "rolls-royce-clone",
        title: "Rolls-Royce Clone",
        category: "Frontend",
        description: "A luxury car website clone built with HTML5, CSS3, and JavaScript. Features include elegant design and smooth animations.",
        image: "/projects/rollsroyce.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        purpose: "A minimal, high-end car showroom clone focusing on elegance and smooth motion.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "HTML5", icon: "🧱" },
            { name: "CSS3", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" }
        ],
        github: "https://github.com/Dhruvesh1611/website2-rolls-royce-",
        live: "https://rollsroyce-clone.netlify.app/"
    },
    {
        id: 6,
        slug: "libas-clone",
        title: "Libas Clone",
        category: "Frontend",
        description: "A fashion e-commerce website clone built with HTML5, CSS3, and JavaScript. Features include product showcase and modern UI.",
        image: "/projects/libas.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        purpose: "Fashion website clone to explore product grid layouts and search functionalities.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "HTML5", icon: "🧱" },
            { name: "CSS3", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" }
        ],
        github: "https://github.com/Dhruvesh1611/website3-libas-",
        live: "https://libas-web.netlify.app/"
    },
    {
        id: 7,
        slug: "snake-game",
        title: "Snake Game",
        category: "Frontend",
        description: "A classic Snake game built with JavaScript, HTML5 Canvas, and CSS3. Features include game logic and score tracking.",
        image: "/projects/game.png",
        tags: ["JavaScript", "HTML5 Canvas", "CSS3"],
        purpose: "Classic arcade game implementation using pixel-perfect collision detection.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "JavaScript", icon: "⚡" },
            { name: "Canvas", icon: "🎨" },
            { name: "CSS3", icon: "💅" }
        ],
        github: "https://github.com/Dhruvesh1611/snake-game",
        live: "https://snake-game-demo.netlify.app/"
    },
    {
        id: 8,
        slug: "ui-ux-yaritu",
        title: "UI/UX Design - Yaritu",
        category: "UI/UX",
        description: "Figma design for Yaritu, a luxury wedding outfit rental service, focusing on elegant user flows and visual hierarchy.",
        image: "/projects/yaritu_figma.png",
        tags: ["UI/UX", "Figma"],
        purpose: "Initial design phase for the Yaritu rental platform.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "Figma", icon: "🎨" },
            { name: "UI/UX", icon: "📱" }
        ],
        github: "#",
        live: "#"
    },
    {
        id: 9,
        slug: "ui-ux-shyara-gold",
        title: "UI/UX Design - Shyara Gold",
        category: "UI/UX",
        description: "Figma design for Shyara Gold, a jewelry e-commerce platform, emphasizing a premium shopping experience.",
        image: "/projects/shyara_gold_figma.png",
        tags: ["UI/UX", "Figma"],
        purpose: "Visual identity and user interaction design for Shyara Gold.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "Figma", icon: "🎨" },
            { name: "UI/UX", icon: "📱" }
        ],
        github: "#",
        live: "#"
    },
    {
        id: 10,
        slug: "ui-ux-docscanx",
        title: "UI/UX Design - DocScanX",
        category: "UI/UX",
        description: "Figma design for DocScanX, a document scanning application, optimizing for speed and simplicity.",
        image: "/projects/docscanx.png",
        tags: ["UI/UX", "Figma"],
        purpose: "App design focusing on utility and clarity for mobile scanning.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "Figma", icon: "🎨" },
            { name: "UI/UX", icon: "📱" }
        ],
        github: "#",
        live: "#"
    }
];
