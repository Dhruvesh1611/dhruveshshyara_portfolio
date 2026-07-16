// Searchable content index for the command palette
// This file aggregates all portfolio content for client-side search

export const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/Dhruvesh1611',
        icon: 'github',
        description: 'My open source projects & code',
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/dhruveshshyara',
        icon: 'linkedin',
        description: 'Professional network & experience',
    },
    {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/dhruvesh_shyara/',
        icon: 'leetcode',
        description: 'DSA problem solving profile',
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/dhruvesh_shyara',
        icon: 'instagram',
        description: 'Personal & dev content',
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com/@dhruveshshyara',
        icon: 'youtube',
        description: 'Project walkthroughs & tutorials',
    },
    {
        name: 'Email',
        url: 'mailto:dhruvesh.shyara.cg@gmail.com',
        icon: 'mail',
        description: 'dhruvesh.shyara.cg@gmail.com',
    },
    {
        name: 'Resume',
        url: 'https://drive.google.com/file/d/1Hk6RZF-T9-8Za_laaa_eo-TO3yBqNonT/view?usp=drive_link',
        icon: 'resume',
        description: 'Download my latest resume',
    },
    {
        name: 'Twitter / X',
        url: 'https://x.com/dhruveshshyara',
        icon: 'twitter',
        description: '@dhruveshshyara on X',
    },
];

export const searchableContent = [
    // Pages
    { type: 'page', title: 'Home', description: 'Portfolio landing page', href: '/', keywords: 'home portfolio landing hero' },
    { type: 'page', title: 'About Me', description: 'Learn more about Dhruvesh', href: '/aboutme', keywords: 'about me dhruvesh shyara developer mern full stack education' },
    { type: 'page', title: 'Projects', description: 'All my projects & work', href: '/projects', keywords: 'projects work portfolio fullstack frontend ui ux extension' },
    { type: 'page', title: 'Certificates', description: 'My certifications & achievements', href: '/certificates', keywords: 'certificates certifications achievements awards' },
    { type: 'page', title: 'Explanation', description: 'Project explanation videos', href: '/explanation', keywords: 'explanation videos youtube tutorials walkthroughs' },

    // Sections
    { type: 'section', title: 'Skills', description: 'React, Next.js, Node.js, MongoDB, TypeScript & more', href: '/#skills', keywords: 'skills react next.js node.js mongodb express typescript html css javascript c c++ git github figma tailwind aws redis framer motion' },
    { type: 'section', title: 'Contact', description: 'Get in touch with me', href: '/#footer', keywords: 'contact email phone get in touch social media' },

    // Projects
    { type: 'project', title: 'Doppelganger — Azure AI Code Assistant', description: '🏆 1st Place — AI-powered VS Code extension with RAG pipeline', href: '/projects/doppelganger', keywords: 'doppelganger azure ai code assistant hackathon 1st place vscode extension rag chromadb groq llm typescript' },
    { type: 'project', title: 'Yaritu — Premium Fashion & Jewelry', description: 'High-performance luxury fashion showcase platform', href: '/projects/yaritu', keywords: 'yaritu fashion jewelry wedding showcase next.js mongodb aws cloudinary' },
    { type: 'project', title: 'Shyara Gold', description: 'Full-stack jewelry e-commerce platform', href: '/projects/shyara-gold', keywords: 'shyara gold jewelry ecommerce react vite node express mongodb cloudinary' },
    { type: 'project', title: 'Tattoo Studio', description: 'Membership & loyalty rewards platform', href: '/projects/tattoo-studio', keywords: 'tattoo studio membership loyalty rewards points vip react node jwt mongodb' },
    { type: 'project', title: 'HireLens — AI Resume Optimizer', description: 'Multi-agent AI platform for resume analysis', href: '/projects/hirelens', keywords: 'hirelens ai resume optimization multi agent llm gemini groq next.js typescript mongodb redis hackathon' },
    { type: 'project', title: 'YouTube Shorts Auto-Scroller', description: 'Chrome extension for auto-scrolling YouTube Shorts', href: '/projects/youtube-shorts-auto-scroller', keywords: 'youtube shorts auto scroller chrome extension manifest v3 javascript' },
    { type: 'project', title: 'EatClub Clone', description: 'Pixel-perfect food delivery website clone', href: '/projects/eatclub-clone', keywords: 'eatclub clone food delivery html css javascript responsive' },
    { type: 'project', title: 'Rolls-Royce Clone', description: 'Luxury car website clone with animations', href: '/projects/rolls-royce-clone', keywords: 'rolls royce clone luxury car css animations html javascript' },
    { type: 'project', title: 'Libas Clone', description: 'Fashion e-commerce clone', href: '/projects/libas-clone', keywords: 'libas clone fashion ecommerce html css javascript grid' },
    { type: 'project', title: 'Snake Game', description: 'Classic arcade game with Canvas API', href: '/projects/snake-game', keywords: 'snake game javascript html5 canvas arcade game loop' },

    // About / Bio
    { type: 'info', title: 'Full Stack Developer', description: 'MERN Stack — React, Node.js, Express, MongoDB', href: '/aboutme', keywords: 'full stack developer mern stack role job developer engineer' },
    { type: 'info', title: 'Education', description: 'B.Tech from Rai University — CGPA: 9.4/10', href: '/aboutme', keywords: 'education btech bachelor technology rai university cgpa 9.4' },
    { type: 'info', title: 'Hackathon Wins', description: '🏆 1st Place at Doppelganger Build Sprint, Finalist at CHARUSAT Hacks', href: '/projects/doppelganger', keywords: 'hackathon wins 1st place winner achievement doppelganger charusat openpools' },
];
