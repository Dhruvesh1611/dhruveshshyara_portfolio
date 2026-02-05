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
        title: "Shyara Gold - Your Style Statement",
        category: "Fullstack",
        description: "Engineered a high-performance jewelry e-commerce platform using React and Node.js. Integrated Cloudinary and Multer for media management.",
        image: "/projects/shyaragold.png",
        tags: ["React", "Node.js", "Express", "MongoDB"],
        purpose: "Shyara Gold provides a premium jewelry shopping experience with high-fidelity visuals and secure checkout.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "React", icon: "⚛️" },
            { name: "Node.js", icon: "🟢" },
            { name: "Express", icon: "🚂" },
            { name: "MongoDB", icon: "📊" }
        ],
        github: "https://github.com/codinggita/shyara_gold",
        live: "https://shyara-gold.netlify.app/"
    },
    {
        id: 3,
        slug: "tattoo-studio",
        title: "Tattoo Studio - Membership Program",
        category: "Fullstack",
        description: "Architected a tiered membership program with a loyalty & rewards system using React and Node.js. Developed a secure JWT-authenticated digital wallet.",
        image: "/projects/tatto-web.jpeg",
        tags: ["React", "Node.js", "JWT", "MongoDB"],
        purpose: "A sophisticated membership system for tattoo studios to reward loyal customers.",
        detailedDescription: "Details coming soon...",
        technologyStack: [
            { name: "React", icon: "⚛️" },
            { name: "Node.js", icon: "🟢" },
            { name: "JWT", icon: "🔑" },
            { name: "MongoDB", icon: "📊" }
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
