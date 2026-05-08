'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

// Semester-wise journey data
const journeyData = [
    {
        id: 1,
        semester: '1st Semester',
        period: 'Foundations of Web & Programming',
        highlights: [
            'Programming Logic — Mastered logic building & problem-solving with C/C++',
            'Modern Frontend — Built responsive UIs using HTML5, CSS3 & ES6+ JavaScript',
            'Advanced JavaScript — Deep-dived into Closures, Prototypal Inheritance & Async patterns',
            'Design & Version Control — Learned UI/UX with Figma, collaboration with Git & GitHub',
        ],
        description: 'Laid a rock-solid foundation by learning programming logic from scratch with C/C++, then quickly moved into the web world — crafting responsive interfaces with HTML5, CSS3 and modern JavaScript. Explored advanced JS concepts like closures, prototypal inheritance and asynchronous programming. Also picked up design thinking through Figma and adopted Git & GitHub for professional version control workflows.',
        image: '/png/clogo.png',
    },
    {
        id: 2,
        semester: '2nd Semester',
        period: 'Modern Web Frameworks & OOPs',
        highlights: [
            'Frontend Engineering — Built dynamic SPAs using React.js with component architecture',
            'Backend Development — Engineered scalable server-side logic with Node.js & Express.js',
            'Database Management — Worked with MongoDB (NoSQL) & Redis (high-performance caching)',
            'OOP Mastery — Polymorphism, Inheritance & Encapsulation in C++',
        ],
        description: 'Leveled up into modern full-stack development. Built dynamic Single Page Applications with React.js, then engineered scalable backend services using Node.js and Express.js. Specialized in NoSQL databases — MongoDB for document storage and Redis for blazing-fast caching. Simultaneously strengthened core OOP concepts like Polymorphism, Inheritance and Encapsulation in C++.',
        image: '/png/reactlogo.png',
    },
    {
        id: 3,
        semester: '3rd Semester',
        period: 'Architecture & Data Structures',
        highlights: [
            'Advanced Web Tech — Full-stack apps with Next.js (App Router & Server Components)',
            'DSA — Linked Lists, Stacks, Queues, Searching & Sorting algorithms in C/C++',
            'Database Systems — Relational DB design, Normalization & complex SQL (DBMS)',
            'Core Java — JVM architecture, multi-threaded programming & strong Java foundation',
        ],
        description: 'Entered the world of production-grade architecture. Developed SEO-friendly, full-stack applications using Next.js with App Router and Server Components. Simultaneously sharpened problem-solving by implementing complex data structures and algorithms — Linked Lists, Stacks, Queues, and various Searching/Sorting techniques in C/C++. Gained deep understanding of Relational Database design, Normalization, and complex SQL querying. Also built a strong foundation in Core Java including JVM internals and multi-threaded programming.',
        image: '/png/nextlogo.png',
    },
    {
        id: 4,
        semester: '4th Semester',
        period: 'Enterprise Applications & Infrastructure',
        highlights: [
            'Advance Java — Enterprise apps with Servlets, JSP & JDBC for DB connectivity',
            'DevOps & Cloud — CI/CD pipelines, containerization & scalable cloud infrastructure',
            'Operating Systems — Process Scheduling, Memory Management, Deadlocks & System Calls',
            'System Design — Software Project Management & Agile methodologies',
        ],
        description: 'Stepping into enterprise-level engineering. Building robust applications using Servlets, JSP, and JDBC for seamless database connectivity. Exploring DevOps practices — CI/CD pipelines, containerization with Docker, and managing scalable infrastructure on cloud platforms. Deepening knowledge of Operating Systems including process scheduling, memory management, deadlocks, and system calls. Mastering Software Project Management and Agile methodologies to lead technical development cycles effectively.',
        image: '/png/node.png',
    },
];

// Education data
const educationData = [
    {
        id: 1,
        degree: '10th Standard',
        school: 'Nutan Vidhyapith,Mahuva',
        year: '2019',
        percentage: '96 pr',
        board: 'GSEB',
        image: '/png/10th-education.jpg',
    },
    {
        id: 2,
        degree: '12th Standard (Science)',
        school: 'P.P.Savani chaitanya vidhyasankul',
        year: '2021',
        percentage: '71%',
        board: 'GSEB',
        image: '/png/12th-education.jpg',
    },
    {
        id: 3,
        degree: 'B.Tech in Computer Science',
        school: 'Rai University',
        year: '2021 - Present',
        percentage: 'CGPA: 9.4/10',
        board: 'Final Year',
        image: '/png/college-education.jpg',
    },
];

// Single semester full-page component
const SemesterPage = ({ item, setActiveItem, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveItem(item);
        }
    }, [isInView, item, setActiveItem]);

    return (
        <div ref={ref} className="semester-full-page">
            <div className="semester-left">
                <motion.span
                    className="semester-period"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {item.period}
                </motion.span>
                <motion.h2
                    className="semester-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {item.semester}
                </motion.h2>
                <motion.ul
                    className="semester-highlights"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {item.highlights.map((point, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                        >
                            {point}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
            <div className="semester-right">
                <motion.div
                    className="semester-description-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <p>{item.description}</p>
                </motion.div>
            </div>
        </div>
    );
};

const AboutMePage = () => {
    const [activeItem, setActiveItem] = useState(journeyData[0]);
    const [activeEdu, setActiveEdu] = useState(educationData[0]);
    const [emailCopied, setEmailCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('dhruvesh.shyara.cg@gmail.com');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <>
            <Navbar />
            <div className="bg-decorations">
                <div className="blob blob-2"></div>
            </div>
            <main className="page-container">
                {/* Hero Section */}
                <section className="full-page-hero">
                    <div className="hero-glow"></div>
                    <div className="hero-content">
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            ABOUT ME
                        </motion.h1>
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            GET TO KNOW MORE ABOUT
                        </motion.span>
                        <motion.p
                            className="hero-bottom-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            who i am.
                        </motion.p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="about-intro-section">
                    <div className="intro-content">
                        <motion.span
                            className="intro-label"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            A LITTLE ABOUT ME
                        </motion.span>
                        <motion.h2
                            className="intro-heading"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Nice to meet you. I'm <span className="name-highlight">Dhruvesh</span>
                        </motion.h2>
                        <motion.p
                            className="intro-text"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            I transform complex ideas into high-speed, scalable web products. As an engineering-driven developer, I focus on the entire stack—prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
                        </motion.p>
                        <motion.p
                            className="intro-text"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            My philosophy is simple: build things that last. I help startups and businesses bridge the gap between concept and reality with code that performs.
                        </motion.p>
                    </div>
                    <div className="intro-image">
                        <motion.div
                            className="image-frame"
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/png/dhruvesh-home-avatar.png"
                                alt="Dhruvesh"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ── Digital Presence Hub ── */}
                <section className="hub-section">
                    <motion.div
                        className="hub-header"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="hub-eyebrow">FIND ME EVERYWHERE</span>
                        <h2 className="hub-title">Digital <span className="hub-title-accent">Presence</span></h2>
                        <p className="hub-subtitle">All my links, stats, and socials — in one place.</p>
                    </motion.div>

                    <div className="hub-grid">

                        {/* — GitHub Card (large) — */}
                        <motion.a
                            href="https://github.com/Dhruvesh1611"
                            target="_blank" rel="noopener noreferrer"
                            className="hub-card hub-card--github hub-card--large"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--github">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">GitHub</p>
                                        <p className="hub-card-handle">@Dhruvesh1611</p>
                                    </div>
                                    <span className="hub-card-arrow">↗</span>
                                </div>
                                <div className="hub-card-body">
                                    <div className="hub-stats-row">
                                        <div className="hub-stat"><span className="hub-stat-num">49</span><span className="hub-stat-label">Repos</span></div>
                                        <div className="hub-stat"><span className="hub-stat-num">77</span><span className="hub-stat-label">Followers</span></div>
                                        <div className="hub-stat"><span className="hub-stat-num">140</span><span className="hub-stat-label">Following</span></div>
                                    </div>
                                </div>
                                <div className="hub-commit-graph">
                                    <img
                                        src="https://ghchart.rshah.org/7c3aed/Dhruvesh1611"
                                        alt="GitHub Contribution Graph"
                                        className="commit-graph-img"
                                        loading="lazy"
                                    />
                                    <span className="commit-graph-label">Contribution Graph</span>
                                </div>
                            </div>
                            <div className="hub-card-glow hub-card-glow--github" />
                        </motion.a>

                        {/* — LinkedIn Card — */}
                        <motion.a
                            href="https://linkedin.com/in/dhruveshshyara"
                            target="_blank" rel="noopener noreferrer"
                            className="hub-card hub-card--linkedin"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--linkedin">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">LinkedIn</p>
                                        <p className="hub-card-handle">Dhruvesh Shyara</p>
                                    </div>
                                    <span className="hub-card-arrow">↗</span>
                                </div>
                                <div className="linkedin-status">
                                    <span className="linkedin-dot" />
                                    <span className="linkedin-status-text">Open to Work</span>
                                </div>
                                <div className="linkedin-skills">
                                    <span className="linkedin-tag">MERN Stack</span>
                                    <span className="linkedin-tag">Full Stack Developer</span>
                                    <span className="linkedin-tag">React.js</span>
                                </div>
                                <div className="hub-badge hub-badge--blue">Connect with me →</div>
                            </div>
                            <div className="hub-card-glow hub-card-glow--linkedin" />
                        </motion.a>

                        {/* — LeetCode Card — */}
                        <motion.a
                            href="https://leetcode.com/u/Dhruvesh1611/"
                            target="_blank" rel="noopener noreferrer"
                            className="hub-card hub-card--leetcode"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--leetcode">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">LeetCode</p>
                                        <p className="hub-card-handle">@Dhruvesh1611</p>
                                    </div>
                                    <span className="hub-card-arrow">↗</span>
                                </div>
                                <div className="leetcode-stats">
                                    <div className="leetcode-ring">
                                        <svg viewBox="0 0 36 36" className="ring-svg">
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffa116" strokeWidth="3" strokeDasharray="71 29" strokeLinecap="round" strokeDashoffset="25" />
                                        </svg>
                                        <span className="ring-label">70.61%<br /><small>Acceptance</small></span>
                                    </div>
                                    <div className="leetcode-counts">
                                        <div className="lc-count lc-easy"><span>Easy</span><b>113</b></div>
                                        <div className="lc-count lc-medium"><span>Medium</span><b>22</b></div>
                                        <div className="lc-count lc-hard"><span>Hard</span><b>2</b></div>
                                    </div>
                                </div>
                            </div>
                            <div className="hub-card-glow hub-card-glow--leetcode" />
                        </motion.a>

                        {/* — YouTube Card — */}
                        <motion.a
                            href="https://www.youtube.com/@dhruveshshyara1611"
                            target="_blank" rel="noopener noreferrer"
                            className="hub-card hub-card--youtube"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--youtube">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">YouTube</p>
                                        <p className="hub-card-handle">@dhruveshshyara1611</p>
                                    </div>
                                    <span className="hub-card-arrow">↗</span>
                                </div>
                                <div className="yt-content-tags">
                                    <span className="yt-tag">🎥 Dev Tutorials</span>
                                    <span className="yt-tag">💡 Project Walkthroughs</span>
                                    <span className="yt-tag">🧠 DSA Solutions</span>
                                </div>
                                <div className="yt-mini-player">
                                    <div className="yt-play-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                    <div className="yt-wave-bars">
                                        <span className="yt-bar" style={{animationDelay: '0s'}} />
                                        <span className="yt-bar" style={{animationDelay: '0.15s'}} />
                                        <span className="yt-bar" style={{animationDelay: '0.3s'}} />
                                        <span className="yt-bar" style={{animationDelay: '0.45s'}} />
                                        <span className="yt-bar" style={{animationDelay: '0.6s'}} />
                                    </div>
                                    <span className="yt-live-text">Content Creator</span>
                                </div>
                                <div className="hub-badge hub-badge--red">Subscribe →</div>
                            </div>
                            <div className="hub-card-glow hub-card-glow--youtube" />
                        </motion.a>

                        {/* — Email Card — */}
                        <motion.div
                            className="hub-card hub-card--email"
                            onClick={handleCopyEmail}
                            style={{ cursor: 'pointer' }}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--email">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">Email</p>
                                        <p className="hub-card-handle" style={{ fontSize: '1.1rem' }}>dhruvesh.shyara.cg@gmail.com</p>
                                    </div>
                                </div>
                                <div className="email-visual">
                                    <div className="email-envelope">
                                        <div className="email-line" style={{width: '80%'}} />
                                        <div className="email-line" style={{width: '60%'}} />
                                        <div className="email-line" style={{width: '40%'}} />
                                    </div>
                                    <p className="email-hint">Available for freelance & collaboration</p>
                                </div>
                                <AnimatePresence mode="wait">
                                    {emailCopied ? (
                                        <motion.div key="copied" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="hub-copy-feedback">
                                            ✓ Copied!
                                        </motion.div>
                                    ) : (
                                        <motion.div key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hub-badge hub-badge--green">
                                            Click to copy →
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="hub-card-glow hub-card-glow--email" />
                        </motion.div>

                        {/* — Resume Card — */}
                        <motion.a
                            href="https://drive.google.com/file/d/1Hk6RZF-T9-8Za_laaa_eo-TO3yBqNonT/view?usp=drive_link"
                            target="_blank" rel="noopener noreferrer"
                            className="hub-card hub-card--resume"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--resume">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">Resume</p>
                                        <p className="hub-card-handle">View / Download</p>
                                    </div>
                                    <span className="hub-card-arrow">↗</span>
                                </div>
                                <div className="resume-preview">
                                    <div className="resume-mini">
                                        <div className="resume-mini-header" />
                                        <div className="resume-mini-line" style={{width: '70%'}} />
                                        <div className="resume-mini-line" style={{width: '90%'}} />
                                        <div className="resume-mini-line" style={{width: '55%'}} />
                                        <div className="resume-mini-line" style={{width: '80%'}} />
                                    </div>
                                    <div className="resume-highlights">
                                        <span className="resume-hl-tag">B.Tech CSE</span>
                                        <span className="resume-hl-tag">MERN Stack</span>
                                        <span className="resume-hl-tag">Full Stack</span>
                                    </div>
                                </div>
                                <div className="hub-badge hub-badge--indigo">Open Resume →</div>
                            </div>
                            <div className="hub-card-glow hub-card-glow--resume" />
                        </motion.a>

                        {/* — Instagram Card — */}
                        <motion.a
                            href="https://www.instagram.com/mr_shyara/"
                            target="_blank" rel="noopener noreferrer"
                            className="hub-card hub-card--instagram"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className="hub-card-inner">
                                <div className="hub-card-top">
                                    <div className="hub-icon-wrap hub-icon-wrap--instagram">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                                    </div>
                                    <div>
                                        <p className="hub-card-label">Instagram</p>
                                        <p className="hub-card-handle">@dhruveshshyara1611</p>
                                    </div>
                                    <span className="hub-card-arrow">↗</span>
                                </div>
                                <p className="hub-card-desc">Personal life, dev journey & behind the scenes</p>
                            </div>
                            <div className="hub-card-glow hub-card-glow--instagram" />
                        </motion.a>

                        {/* — Quote / Motto Card — */}
                        <motion.div
                            className="hub-card hub-card--motto"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="hub-card-inner">
                                <span className="hub-quote-mark">"</span>
                                <p className="hub-quote-text">Build things that matter. Ship fast. Learn faster.</p>
                                <span className="hub-quote-author">— Dhruvesh Shyara</span>
                            </div>
                            <div className="hub-card-glow hub-card-glow--motto" />
                        </motion.div>

                    </div>
                </section>

                {/* My Journey Section - Pinned Scrollytelling */}
                <section className="journey-scrolly-container">

                    <div className="journey-sticky-wrapper">
                        <div className="journey-scroll-content">
                            <motion.h2
                                className="section-heading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                MY JOURNEY
                            </motion.h2>

                            {/* Timeline Dots */}
                            <div className="journey-timeline">
                                <div className="timeline-line">
                                    <div className="timeline-progress" style={{ width: `${((activeItem.id - 1) / (journeyData.length - 1)) * 100}%` }} />
                                </div>
                                {journeyData.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`timeline-dot ${activeItem.id === item.id ? 'active' : ''} ${activeItem.id > item.id ? 'completed' : ''}`}
                                    >
                                        <span className="timeline-dot-label">Sem {item.id}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="scrolly-grid">
                                {/* Left Side: Semester & Points */}
                                <div className="scrolly-left">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeItem.id}
                                            initial={{ opacity: 0, x: -80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 80 }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                        >
                                            <span className="semester-period">{activeItem.period}</span>
                                            <h3 className="semester-title">{activeItem.semester}</h3>
                                            <ul className="semester-highlights">
                                                {activeItem.highlights.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Sticky Right: Animated Semester Description */}
                                <div className="scrolly-sticky-image">
                                    <div className="sticky-image-fixed">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeItem.id}
                                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                className="sticky-image-container sticky-desc-container"
                                            >
                                                <div className="sticky-desc-box" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderRadius: '24px', width: '100%', maxWidth: '620px', height: 'auto', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', margin: '0 auto', padding: '40px 35px', color: 'rgba(235,240,255,0.95)', fontWeight: 400, fontSize: 'clamp(1.2rem, 1.6vw, 1.8rem)', textAlign: 'left', lineHeight: 1.8, boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                                                    <span style={{ color: 'var(--color-light-purple)', fontFamily: 'var(--font-fira-code)', fontSize: '1.2rem', marginBottom: '15px', display: 'block', letterSpacing: '2px', fontWeight: 600 }}>OVERVIEW</span>
                                                    {activeItem.description}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Right Side: Detailed Description (REMOVED, only sticky description remains) */}
                            </div>

                            {/* Scroll Down Arrow Indicator */}
                            <div className="journey-indicators">
                                <div className="scroll-down-arrow">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12L16 20L24 12" stroke="#cf59e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Remove the small description at the bottom of the journey section */}

                            {/* Remove the small bottom text (description) under the journey section */}
                        </div>
                    </div>

                    {/* Scroll Triggers (invisible divs to drive the sticky state) */}
                    <div className="scroll-triggers" style={{ position: 'relative', top: '-50vh' }}>
                        {journeyData.map((item) => (
                            <div
                                key={item.id}
                                className="scroll-trigger-segment"
                                ref={(el) => {
                                    if (!el) return;
                                    const observer = new IntersectionObserver(
                                        ([entry]) => {
                                            if (entry.isIntersecting) setActiveItem(item);
                                        },
                                        { threshold: 0.5 }
                                    );
                                    observer.observe(el);
                                }}
                            ></div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="education-scrolly-container">
                    <div className="education-sticky-wrapper">
                        <div className="education-scroll-content">
                            <motion.h2
                                className="section-heading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                EDUCATION
                            </motion.h2>

                            <div className="scrolly-grid">
                                {/* Left Side: Education Details */}
                                <div className="scrolly-left">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeEdu.id}
                                            initial={{ opacity: 0, x: -80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 80 }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                        >
                                            <span className="edu-year">{activeEdu.year}</span>
                                            <h3 className="edu-degree">{activeEdu.degree}</h3>
                                            <h4 className="edu-school">{activeEdu.school}</h4>
                                            <div className="edu-result-badge">
                                                <span className="edu-board">{activeEdu.board}</span>
                                                <span className="edu-percentage">{activeEdu.percentage}</span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Vertical Education Timeline */}
                                <div className="edu-timeline-vertical">
                                    <div className="edu-timeline-line">
                                        <div className="edu-timeline-progress" style={{ height: `${((activeEdu.id - 1) / (educationData.length - 1)) * 100}%` }} />
                                    </div>
                                    {educationData.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`edu-timeline-dot ${activeEdu.id === item.id ? 'active' : ''} ${activeEdu.id > item.id ? 'completed' : ''}`}
                                        >
                                            <span className="edu-timeline-dot-label">{item.degree.split(' ')[0]}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Sticky Right: Education Image */}
                                <div className="scrolly-sticky-image">
                                    <div className="sticky-image-fixed">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeEdu.id}
                                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 1.1, rotate: -2 }}
                                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                className="sticky-image-container"
                                            >
                                                <div className="edu-image-frame">
                                                    <Image
                                                        src={activeEdu.image}
                                                        alt={activeEdu.degree}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Scroll Down Arrow Indicator */}
                            <div className="journey-indicators">
                                <div className="scroll-down-arrow">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12L16 20L24 12" stroke="#cf59e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Triggers */}
                    <div className="scroll-triggers">
                        {educationData.map((item) => (
                            <div
                                key={item.id}
                                className="scroll-trigger-segment"
                                ref={(el) => {
                                    if (!el) return;
                                    const observer = new IntersectionObserver(
                                        ([entry]) => {
                                            if (entry.isIntersecting) setActiveEdu(item);
                                        },
                                        { threshold: 0.5 }
                                    );
                                    observer.observe(el);
                                }}
                            ></div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                /* ══════════════════════════════
                   HUB SECTION — Premium Redesign
                ══════════════════════════════ */
                .hub-section {
                    padding: 140px 7% 120px;
                    background: linear-gradient(180deg, #020206 0%, #060310 50%, #000 100%);
                    position: relative;
                    overflow: hidden;
                }

                /* Ambient glow background */
                .hub-section::before {
                    content: '';
                    position: absolute;
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 900px;
                    height: 600px;
                    background: radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                }

                .hub-header {
                    text-align: center;
                    margin-bottom: 80px;
                    position: relative;
                    z-index: 1;
                }

                .hub-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-family: var(--font-fira-code), monospace;
                    font-size: 1.1rem;
                    letter-spacing: 5px;
                    color: rgba(168, 85, 247, 0.8);
                    margin-bottom: 20px;
                    text-transform: uppercase;
                }

                .hub-eyebrow::before,
                .hub-eyebrow::after {
                    content: '';
                    display: block;
                    width: 40px;
                    height: 1px;
                    background: rgba(168, 85, 247, 0.4);
                }

                .hub-title {
                    font-family: var(--font-outfit), sans-serif;
                    font-size: 6rem;
                    font-weight: 800;
                    letter-spacing: -3px;
                    line-height: 1;
                    margin-bottom: 20px;
                    color: #fff;
                }

                .hub-title-accent {
                    background: linear-gradient(130deg, #a855f7 0%, #818cf8 50%, #c084fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hub-subtitle {
                    font-size: 1.6rem;
                    color: rgba(255, 255, 255, 0.35);
                    font-weight: 300;
                    letter-spacing: 0.3px;
                }

                /* ── Grid ── */
                .hub-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: minmax(200px, auto);
                    gap: 16px;
                    position: relative;
                    z-index: 1;
                }

                /* ── Base Card ── */
                .hub-card {
                    position: relative;
                    background: rgba(12, 10, 20, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    border-radius: 24px;
                    overflow: hidden;
                    text-decoration: none;
                    color: #fff;
                    display: block;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    transition: border-color 0.35s ease, transform 0.25s ease, box-shadow 0.35s ease;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.04);
                }

                .hub-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 24px;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, transparent 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }

                .hub-card:hover {
                    border-color: rgba(255, 255, 255, 0.14);
                    box-shadow: 0 16px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.07);
                }

                /* Platform-specific hover border tints */
                .hub-card--github:hover { border-color: rgba(255, 255, 255, 0.18); }
                .hub-card--linkedin:hover { border-color: rgba(10, 102, 194, 0.4); }
                .hub-card--leetcode:hover { border-color: rgba(255, 161, 22, 0.35); }
                .hub-card--youtube:hover { border-color: rgba(255, 40, 40, 0.35); }
                .hub-card--email:hover { border-color: rgba(52, 211, 153, 0.35); }
                .hub-card--resume:hover { border-color: rgba(99, 102, 241, 0.4); }
                .hub-card--instagram:hover { border-color: rgba(228, 64, 95, 0.35); }

                .hub-card--large {
                    grid-column: span 2;
                    grid-row: span 2;
                }

                /* ── Card Inner ── */
                .hub-card-inner {
                    position: relative;
                    z-index: 2;
                    padding: 32px 34px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                /* ── Card Top Row ── */
                .hub-card-top {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .hub-card-arrow {
                    margin-left: auto;
                    font-size: 1.6rem;
                    color: rgba(255, 255, 255, 0.2);
                    transition: transform 0.3s ease, color 0.3s ease;
                    flex-shrink: 0;
                }

                .hub-card:hover .hub-card-arrow {
                    transform: translate(3px, -3px);
                    color: rgba(255, 255, 255, 0.7);
                }

                .hub-card-label {
                    font-size: 1.05rem;
                    font-weight: 600;
                    font-family: var(--font-fira-code), monospace;
                    color: rgba(255, 255, 255, 0.35);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 3px;
                }

                .hub-card-handle {
                    font-size: 1.7rem;
                    font-weight: 700;
                    color: #fff;
                    font-family: var(--font-outfit), sans-serif;
                    line-height: 1.2;
                }

                .hub-card-desc {
                    font-size: 1.4rem;
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.65;
                    font-weight: 300;
                }

                /* ── Global override: strip browser default link colors from hub cards ── */
                :global(.hub-card),
                :global(.hub-card *) {
                    text-decoration: none !important;
                    color: inherit !important;
                }

                :global(.hub-card-handle) {
                    color: #ffffff !important;
                }

                :global(.hub-card-label) {
                    color: rgba(255, 255, 255, 0.35) !important;
                }

                :global(.hub-card-desc) {
                    color: rgba(255, 255, 255, 0.4) !important;
                }

                :global(.hub-stat-num) {
                    color: unset !important;
                }

                :global(.commit-graph-label) {
                    font-size: 1.05rem;
                    color: rgba(255, 255, 255, 0.25) !important;
                    font-family: var(--font-fira-code), monospace;
                    letter-spacing: 1px;
                    text-decoration: none !important;
                }

                /* ── Icon Wraps ── */
                .hub-icon-wrap {
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .hub-icon-wrap--github {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.12);
                }
                .hub-icon-wrap--linkedin {
                    background: rgba(10, 102, 194, 0.2);
                    color: #4da3ff;
                    border: 1px solid rgba(10, 102, 194, 0.25);
                }
                .hub-icon-wrap--leetcode {
                    background: rgba(255, 161, 22, 0.15);
                    color: #ffa116;
                    border: 1px solid rgba(255, 161, 22, 0.2);
                }
                .hub-icon-wrap--youtube {
                    background: rgba(255, 40, 40, 0.15);
                    color: #ff4444;
                    border: 1px solid rgba(255, 40, 40, 0.2);
                }
                .hub-icon-wrap--email {
                    background: rgba(52, 211, 153, 0.13);
                    color: #34d399;
                    border: 1px solid rgba(52, 211, 153, 0.18);
                }
                .hub-icon-wrap--resume {
                    background: rgba(99, 102, 241, 0.18);
                    color: #a5b4fc;
                    border: 1px solid rgba(99, 102, 241, 0.22);
                }
                .hub-icon-wrap--instagram {
                    background: rgba(228, 64, 95, 0.15);
                    color: #f06292;
                    border: 1px solid rgba(228, 64, 95, 0.2);
                }

                /* ── Badge ── */
                .hub-badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 10px 18px;
                    border-radius: 100px;
                    font-size: 1.3rem;
                    font-weight: 600;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                    width: fit-content;
                    margin-top: auto;
                    transition: background 0.3s ease, border-color 0.3s ease;
                }

                .hub-card:hover .hub-badge {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.18);
                    color: rgba(255, 255, 255, 0.85);
                }

                .hub-badge--red {
                    color: #ff6666;
                    border-color: rgba(255, 60, 60, 0.2);
                    background: rgba(255, 60, 60, 0.07);
                }

                .hub-card:hover .hub-badge--red {
                    background: rgba(255, 60, 60, 0.12);
                    border-color: rgba(255, 60, 60, 0.35);
                    color: #ff8888;
                }

                .hub-badge--white {
                    color: #fff;
                    border-color: rgba(255, 255, 255, 0.18);
                    background: rgba(255, 255, 255, 0.07);
                }

                .hub-copy-feedback {
                    display: inline-flex;
                    align-items: center;
                    padding: 10px 18px;
                    border-radius: 100px;
                    font-size: 1.3rem;
                    font-weight: 700;
                    background: rgba(52, 211, 153, 0.12);
                    border: 1px solid rgba(52, 211, 153, 0.3);
                    color: #34d399;
                    width: fit-content;
                    margin-top: auto;
                }

                /* ── Badge Variants ── */
                .hub-badge--blue {
                    color: #4da3ff;
                    border-color: rgba(10, 102, 194, 0.25);
                    background: rgba(10, 102, 194, 0.08);
                }
                .hub-card:hover .hub-badge--blue {
                    background: rgba(10, 102, 194, 0.15);
                    border-color: rgba(10, 102, 194, 0.4);
                    color: #7bbfff;
                }
                .hub-badge--green {
                    color: #34d399;
                    border-color: rgba(52, 211, 153, 0.2);
                    background: rgba(52, 211, 153, 0.07);
                }
                .hub-card:hover .hub-badge--green {
                    background: rgba(52, 211, 153, 0.12);
                    border-color: rgba(52, 211, 153, 0.35);
                    color: #5ee8b7;
                }
                .hub-badge--indigo {
                    color: #a5b4fc;
                    border-color: rgba(99, 102, 241, 0.22);
                    background: rgba(99, 102, 241, 0.08);
                }
                .hub-card:hover .hub-badge--indigo {
                    background: rgba(99, 102, 241, 0.15);
                    border-color: rgba(99, 102, 241, 0.4);
                    color: #c4b5fd;
                }

                /* ── LinkedIn Card Enhancements ── */
                .linkedin-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 14px;
                    background: rgba(52, 211, 153, 0.06);
                    border: 1px solid rgba(52, 211, 153, 0.12);
                    border-radius: 100px;
                    width: fit-content;
                }
                .linkedin-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #34d399;
                    animation: pulse-dot 2s ease-in-out infinite;
                    flex-shrink: 0;
                }
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5); }
                    50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
                }
                .linkedin-status-text {
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #34d399;
                    font-family: var(--font-fira-code), monospace;
                    letter-spacing: 0.5px;
                }
                .linkedin-skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .linkedin-tag {
                    padding: 6px 14px;
                    border-radius: 8px;
                    font-size: 1.15rem;
                    font-weight: 500;
                    background: rgba(10, 102, 194, 0.08);
                    border: 1px solid rgba(10, 102, 194, 0.15);
                    color: rgba(255, 255, 255, 0.55);
                    font-family: var(--font-fira-code), monospace;
                }

                /* ── YouTube Card Enhancements ── */
                .yt-content-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .yt-tag {
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 1.15rem;
                    font-weight: 500;
                    background: rgba(255, 40, 40, 0.06);
                    border: 1px solid rgba(255, 40, 40, 0.12);
                    color: rgba(255, 255, 255, 0.55);
                }
                .yt-mini-player {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    background: rgba(255, 40, 40, 0.05);
                    border: 1px solid rgba(255, 40, 40, 0.1);
                    border-radius: 12px;
                }
                .yt-play-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255, 40, 40, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ff4444;
                    flex-shrink: 0;
                }
                .yt-wave-bars {
                    display: flex;
                    align-items: flex-end;
                    gap: 3px;
                    height: 24px;
                }
                .yt-bar {
                    width: 4px;
                    border-radius: 2px;
                    background: linear-gradient(to top, #ff4444, #ff8888);
                    animation: yt-wave 1.2s ease-in-out infinite;
                }
                @keyframes yt-wave {
                    0%, 100% { height: 6px; }
                    50% { height: 20px; }
                }
                .yt-live-text {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.35);
                    font-family: var(--font-fira-code), monospace;
                    letter-spacing: 0.5px;
                    margin-left: auto;
                }

                /* ── Email Card Enhancements ── */
                .email-visual {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .email-envelope {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    flex: 1;
                }
                .email-line {
                    height: 3px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, rgba(52, 211, 153, 0.2) 0%, rgba(52, 211, 153, 0.05) 100%);
                }
                .email-hint {
                    font-size: 1.2rem;
                    color: rgba(255, 255, 255, 0.35);
                    font-weight: 400;
                    line-height: 1.5;
                }

                /* ── Resume Card Enhancements ── */
                .resume-preview {
                    display: flex;
                    gap: 18px;
                    align-items: flex-start;
                }
                .resume-mini {
                    width: 70px;
                    padding: 10px 8px;
                    background: rgba(99, 102, 241, 0.06);
                    border: 1px solid rgba(99, 102, 241, 0.12);
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    flex-shrink: 0;
                }
                .resume-mini-header {
                    height: 8px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #a5b4fc, #818cf8);
                    width: 60%;
                    margin-bottom: 2px;
                }
                .resume-mini-line {
                    height: 3px;
                    border-radius: 1px;
                    background: rgba(99, 102, 241, 0.2);
                }
                .resume-highlights {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .resume-hl-tag {
                    padding: 5px 12px;
                    border-radius: 6px;
                    font-size: 1.1rem;
                    font-weight: 500;
                    background: rgba(99, 102, 241, 0.07);
                    border: 1px solid rgba(99, 102, 241, 0.12);
                    color: rgba(255, 255, 255, 0.5);
                    font-family: var(--font-fira-code), monospace;
                    width: fit-content;
                }

                /* ── GitHub Stats ── */
                .hub-stats-row {
                    display: flex;
                    gap: 32px;
                    padding: 20px 0;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .hub-stat {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .hub-stat-num {
                    font-size: 2.8rem;
                    font-weight: 800;
                    font-family: var(--font-outfit), sans-serif;
                    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }

                .hub-stat-label {
                    font-size: 1.05rem;
                    color: rgba(255, 255, 255, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-family: var(--font-fira-code), monospace;
                }

                /* ── Commit Graph ── */
                .hub-commit-graph {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .commit-graph-img {
                    width: 100%;
                    border-radius: 10px;
                    opacity: 0.9;
                    filter: brightness(1.2) saturate(1.3);
                }

                .commit-graph-label {
                    font-size: 1.05rem;
                    color: rgba(255, 255, 255, 0.25);
                    font-family: var(--font-fira-code), monospace;
                    letter-spacing: 1px;
                }

                /* ── LeetCode Ring ── */
                .leetcode-stats {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    margin-top: 8px;
                }

                .leetcode-ring {
                    position: relative;
                    width: 90px;
                    height: 90px;
                    flex-shrink: 0;
                }

                .ring-svg {
                    width: 90px;
                    height: 90px;
                    transform: rotate(-90deg);
                }

                .ring-label {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 1.2rem;
                    font-weight: 800;
                    text-align: center;
                    line-height: 1.2;
                    color: #ffa116;
                    font-family: var(--font-outfit), sans-serif;
                }

                .ring-label small {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.35);
                    font-weight: 400;
                    font-family: var(--font-fira-code), monospace;
                }

                .leetcode-counts {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .lc-count {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.4rem;
                }

                .lc-count span {
                    color: rgba(255, 255, 255, 0.35);
                    font-family: var(--font-fira-code), monospace;
                    font-size: 1.2rem;
                    min-width: 60px;
                }

                .lc-count b { font-weight: 800; font-size: 1.6rem; }
                .lc-easy b { color: #34d399; }
                .lc-medium b { color: #ffa116; }
                .lc-hard b { color: #ff6b6b; }

                /* ── Quote Card ── */
                .hub-quote-mark {
                    font-size: 5rem;
                    font-family: Georgia, serif;
                    color: rgba(168, 85, 247, 0.25);
                    line-height: 0.5;
                    display: block;
                    margin-bottom: 8px;
                }

                .hub-quote-text {
                    font-size: 2rem;
                    font-weight: 600;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.8);
                    font-family: var(--font-outfit), sans-serif;
                    flex: 1;
                }

                .hub-quote-author {
                    font-size: 1.2rem;
                    color: rgba(255, 255, 255, 0.25);
                    font-family: var(--font-fira-code), monospace;
                    margin-top: 4px;
                    display: block;
                    letter-spacing: 1px;
                }

                /* ── Glow Overlays ── */
                .hub-card-glow {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                    border-radius: 24px;
                }

                .hub-card:hover .hub-card-glow { opacity: 1; }

                .hub-card-glow--github {
                    background: radial-gradient(circle at 10% 90%, rgba(255,255,255,0.04) 0%, transparent 55%);
                }
                .hub-card-glow--linkedin {
                    background: radial-gradient(circle at 10% 90%, rgba(10, 102, 194, 0.1) 0%, transparent 60%);
                }
                .hub-card-glow--leetcode {
                    background: radial-gradient(circle at 10% 90%, rgba(255, 161, 22, 0.1) 0%, transparent 60%);
                }
                .hub-card-glow--youtube {
                    background: radial-gradient(circle at 10% 90%, rgba(255, 40, 40, 0.1) 0%, transparent 60%);
                }
                .hub-card-glow--email {
                    background: radial-gradient(circle at 10% 90%, rgba(52, 211, 153, 0.1) 0%, transparent 60%);
                }
                .hub-card-glow--resume {
                    background: radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.12) 0%, transparent 60%);
                }
                .hub-card-glow--instagram {
                    background: radial-gradient(circle at 10% 90%, rgba(228, 64, 95, 0.1) 0%, transparent 60%);
                }
                .hub-card-glow--motto {
                    background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.07) 0%, transparent 70%);
                }

                /* ── Responsive ── */
                @media (max-width: 1100px) {
                    .hub-grid { grid-template-columns: repeat(2, 1fr); }
                    .hub-card--large { grid-column: span 2; grid-row: span 1; }
                    .hub-title { font-size: 4.5rem; }
                }

                @media (max-width: 640px) {
                    .hub-section { padding: 80px 5% 80px; }
                    .hub-grid { grid-template-columns: 1fr; gap: 12px; }
                    .hub-card--large { grid-column: span 1; }
                    .hub-title { font-size: 3.2rem; letter-spacing: -1.5px; }
                    .hub-stat-num { font-size: 2.2rem; }
                    .hub-card-handle { font-size: 1.5rem; }
                    .hub-card-inner { padding: 24px; }
                }



                .bg-decorations {
                    position: fixed;
                    inset: 0;
                    z-index: -1;
                    overflow: hidden;
                    pointer-events: none;
                }

                /* Intro Section */
                .about-intro-section {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    padding: 100px 10%;
                    align-items: center;
                }

                .intro-label {
                    font-size: 1.3rem;
                    letter-spacing: 0.3em;
                    color: #888;
                    font-family: var(--font-fira-code);
                    margin-bottom: 20px;
                    display: block;
                }

                .intro-heading {
                    font-size: 5rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 30px;
                }

                .name-highlight {
                    font-family: var(--font-playfair), serif;
                    font-style: italic;
                    background: linear-gradient(135deg, #a855f7, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                 .intro-text {
                    font-size: 1.9rem;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 28px;
                    font-weight: 300;
                }

                .intro-content {
                    font-size: 2rem;
                    color: #f2f2f2;
                }

                @media (max-width: 768px) {
                    .intro-text {
                        font-size: 1.5rem;
                        line-height: 1.7;
                    }
                    .intro-content {
                        font-size: 1.3rem;
                    }
                }

                .intro-image {
                    position: relative;
                    height: 500px;
                }

                .image-frame {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 2px solid rgba(255,255,255,0.1);
                }

                /* Journey Scrollytelling Styles */
                .journey-scrolly-container {
                    position: relative;
                    background: #000;
                }

                .journey-sticky-wrapper {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .journey-scroll-content {
                    width: 100%;
                    padding: 0 10%;
                }

                .section-heading {
                    font-size: 10rem;
                    font-weight: 900;
                    margin-bottom: 80px;
                    letter-spacing: -2px;
                    text-align: left;
                    font-family: var(--font-outfit), sans-serif;
                    text-transform: uppercase;
                }

                .scrolly-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 100px;
                    align-items: center;
                }

                .semester-period {
                    font-size: 1.6rem;
                    color: var(--color-light-purple);
                    font-family: var(--font-fira-code);
                    margin-bottom: 15px;
                    display: block;
                }

                .semester-title {
                    font-size: 4.5rem;
                    font-weight: 800;
                    margin-bottom: 30px;
                    font-family: var(--font-outfit), sans-serif;
                }

                .semester-highlights {
                    list-style: none;
                    padding: 0;
                }

                .semester-highlights li {
                    font-size: 1.6rem;
                    color: rgba(255, 255, 255, 0.7);
                    padding: 10px 0;
                    padding-left: 30px;
                    position: relative;
                    line-height: 1.5;
                }

                .semester-highlights li::before {
                    content: '→';
                    position: absolute;
                    left: 0;
                    color: var(--color-light-purple);
                }

                .semester-desc-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 30px;
                    padding: 60px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }

                .semester-desc-card p {
                    font-size: 2rem;
                    line-height: 1.8;
                    color: #aaa;
                    margin: 0;
                }

                /* Journey Timeline */
                .journey-timeline {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    margin-bottom: 50px;
                    padding: 0 40px;
                }

                .timeline-line {
                    position: absolute;
                    left: 40px;
                    right: 40px;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 3px;
                    background: rgba(255, 255, 255, 0.08);
                    border-radius: 3px;
                    z-index: 0;
                    overflow: hidden;
                }

                .timeline-progress {
                    height: 100%;
                    background: linear-gradient(90deg, #a855f7, #cf59e6);
                    border-radius: 3px;
                    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 0;
                }

                .timeline-dot {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    cursor: default;
                }

                .timeline-dot::before {
                    content: '';
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #222;
                    border: 3px solid rgba(255, 255, 255, 0.15);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: none;
                }

                .timeline-dot.completed::before {
                    background: #a855f7;
                    border-color: #a855f7;
                    box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
                }

                .timeline-dot.active::before {
                    background: #cf59e6;
                    border-color: #cf59e6;
                    box-shadow: 0 0 15px rgba(207, 89, 230, 0.7), 0 0 40px rgba(207, 89, 230, 0.3), 0 0 60px rgba(207, 89, 230, 0.15);
                    transform: scale(1.3);
                    animation: dotPulse 2s ease-in-out infinite;
                }

                @keyframes dotPulse {
                    0%, 100% { box-shadow: 0 0 15px rgba(207, 89, 230, 0.7), 0 0 40px rgba(207, 89, 230, 0.3); transform: scale(1.3); }
                    50% { box-shadow: 0 0 25px rgba(207, 89, 230, 0.9), 0 0 60px rgba(207, 89, 230, 0.5); transform: scale(1.45); }
                }

                .timeline-dot-label {
                    font-size: 1.2rem;
                    color: rgba(255, 255, 255, 0.3);
                    font-family: var(--font-fira-code);
                    font-weight: 500;
                    transition: color 0.5s ease;
                    white-space: nowrap;
                }

                .timeline-dot.active .timeline-dot-label {
                    color: #cf59e6;
                    text-shadow: 0 0 10px rgba(207, 89, 230, 0.5);
                }

                .timeline-dot.completed .timeline-dot-label {
                    color: #a855f7;
                }

                .journey-indicators {
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 15px;
                }

                .scroll-down-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: bounceDown 1.5s infinite;
                }
                @keyframes bounceDown {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(12px); }
                }

                .scroll-triggers {
                    position: relative;
                    z-index: 10;
                }

                .scroll-trigger-segment {
                    height: 100vh;
                    pointer-events: none;
                }

                /* Education Section */
                .education-section {
                    padding: 150px 10%;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .education-timeline {
                    max-width: 900px;
                    margin: 80px auto 0;
                    position: relative;
                }

                .education-timeline::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
                }

                .education-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 80px;
                    position: relative;
                }

                .edu-dot {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: var(--color-light-purple);
                    border-radius: 50%;
                    border: 4px solid #000;
                    z-index: 2;
                }

                .edu-content {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    padding: 40px;
                    width: 450px;
                    text-align: center;
                    transition: border-color 0.3s ease;
                }

                .edu-content:hover {
                    border-color: var(--color-light-purple);
                }

                .edu-year {
                    font-size: 1.5rem;
                    color: var(--color-light-purple);
                    font-family: var(--font-fira-code);
                    margin-bottom: 12px;
                    display: block;
                }

                .edu-degree {
                    font-size: 2.6rem;
                    font-weight: 800;
                    margin-bottom: 10px;
                }

                .edu-school {
                    font-size: 1.8rem;
                    color: #fff;
                    margin-bottom: 15px;
                    opacity: 0.8;
                }

                .edu-result {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .edu-board, .edu-percentage {
                    font-size: 1.6rem;
                    color: #888;
                }

                .edu-percentage {
                    color: var(--color-light-purple);
                    font-weight: 700;
                }

                /* Education Scrollytelling */
                .education-scrolly-container {
                    position: relative;
                    background: #000;
                }

                .education-sticky-wrapper {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .education-scroll-content {
                    width: 100%;
                    padding: 0 10%;
                }

                .edu-result-badge {
                    display: inline-flex;
                    gap: 20px;
                    padding: 15px 30px;
                    background: rgba(168, 85, 247, 0.1);
                    border: 1px solid rgba(168, 85, 247, 0.2);
                    border-radius: 100px;
                    margin-top: 20px;
                }

                .education-scrolly-container .scrolly-grid {
                    grid-template-columns: 1fr auto 1fr;
                }

                /* Vertical Education Timeline */
                .edu-timeline-vertical {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    padding: 20px 0;
                    min-height: 300px;
                }

                .edu-timeline-line {
                    position: absolute;
                    top: 20px;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 3px;
                    background: rgba(255, 255, 255, 0.08);
                    border-radius: 3px;
                    z-index: 0;
                    overflow: hidden;
                }

                .edu-timeline-progress {
                    width: 100%;
                    background: linear-gradient(180deg, #a855f7, #cf59e6);
                    border-radius: 3px;
                    transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                .edu-timeline-dot {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 12px;
                    cursor: default;
                }

                .edu-timeline-dot::before {
                    content: '';
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #222;
                    border: 3px solid rgba(255, 255, 255, 0.15);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: none;
                    flex-shrink: 0;
                }

                .edu-timeline-dot.completed::before {
                    background: #a855f7;
                    border-color: #a855f7;
                    box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
                }

                .edu-timeline-dot.active::before {
                    background: #cf59e6;
                    border-color: #cf59e6;
                    box-shadow: 0 0 15px rgba(207, 89, 230, 0.7), 0 0 40px rgba(207, 89, 230, 0.3), 0 0 60px rgba(207, 89, 230, 0.15);
                    transform: scale(1.3);
                    animation: eduDotPulse 2s ease-in-out infinite;
                }

                @keyframes eduDotPulse {
                    0%, 100% { box-shadow: 0 0 15px rgba(207, 89, 230, 0.7), 0 0 40px rgba(207, 89, 230, 0.3); transform: scale(1.3); }
                    50% { box-shadow: 0 0 25px rgba(207, 89, 230, 0.9), 0 0 60px rgba(207, 89, 230, 0.5); transform: scale(1.45); }
                }

                .edu-timeline-dot-label {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.3);
                    font-family: var(--font-fira-code);
                    font-weight: 500;
                    transition: color 0.5s ease;
                    white-space: nowrap;
                }

                .edu-timeline-dot.active .edu-timeline-dot-label {
                    color: #cf59e6;
                    text-shadow: 0 0 10px rgba(207, 89, 230, 0.5);
                }

                .edu-timeline-dot.completed .edu-timeline-dot-label {
                    color: #a855f7;
                }

                .edu-image-frame {
                    width: 100%;
                    height: 70%;
                    position: relative;
                    border-radius: 30px;
                    overflow: hidden;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                }

                .education-scrolly-container .scrolly-sticky-image {
                    height: 500px;
                    width: 100%;
                    max-width: 700px;
                }

                .education-scrolly-container .sticky-image-container {
                    width: 100%;
                    height: 100%;
                }

                @media (max-width: 1024px) {
                    .scrolly-grid { gap: 50px; }
                    .about-intro-section { gap: 50px; padding: 80px 5%; }
                }

                @media (max-width: 768px) {
                    .about-intro-section {
                        grid-template-columns: 1fr;
                        padding: 60px 5%;
                        gap: 40px;
                    }
                    .intro-heading { font-size: 3rem; text-align: center; }
                    .intro-label { text-align: center; }
                    .intro-text { text-align: center; font-size: 1.5rem; line-height: 1.7; }
                    .intro-content { font-size: 1.3rem; text-align: center; }
                    .intro-image { height: 350px; }
                    .section-heading { 
                        font-size: 4rem; 
                        letter-spacing: -1px; 
                        margin-bottom: 40px; 
                        text-align: center;
                    }
                    .journey-timeline {
                        padding: 0 10px;
                        margin-bottom: 30px;
                    }
                    .timeline-line {
                        left: 10px;
                        right: 10px;
                    }
                    .timeline-dot::before {
                        width: 14px;
                        height: 14px;
                    }
                    .timeline-dot-label {
                        font-size: 1rem;
                    }
                    .scrolly-grid { 
                        grid-template-columns: 1fr; 
                        text-align: center;
                        gap: 30px;
                    }
                    .education-scrolly-container .scrolly-grid {
                        grid-template-columns: 1fr;
                    }
                    .edu-timeline-vertical {
                        flex-direction: row;
                        min-height: auto;
                        padding: 0 10px;
                        margin-bottom: 25px;
                    }
                    .edu-timeline-line {
                        top: 50%;
                        bottom: auto;
                        left: 10px;
                        right: 10px;
                        transform: translateY(-50%);
                        width: auto;
                        height: 3px;
                    }
                    .edu-timeline-progress {
                        height: 100% !important;
                        width: 0;
                        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .edu-timeline-dot {
                        flex-direction: column;
                        gap: 8px;
                    }
                    .edu-timeline-dot::before {
                        width: 14px;
                        height: 14px;
                    }
                    .edu-timeline-dot-label {
                        font-size: 0.9rem;
                    }
                    .semester-title { font-size: 3rem; }
                    .semester-period { text-align: center; }
                    .semester-highlights { display: inline-block; text-align: left; }
                    .semester-desc-card { padding: 30px; }
                    .semester-desc-card p { font-size: 1.6rem; }
                    .education-timeline::before { left: 0; transform: none; }
                    .edu-dot { left: 0; transform: translateX(-50%); }
                    .education-item { justify-content: flex-start; }
                    .edu-content { width: 100%; margin-left: 30px; text-align: left; }
                    .edu-degree { font-size: 2.2rem; }
                    .edu-school { font-size: 1.5rem; }
                    .edu-year { text-align: center; }
                    .edu-result-badge { margin-left: auto; margin-right: auto; }
                    .journey-scroll-content { padding: 0 5%; }
                    .education-scroll-content { padding: 0 5%; }
                    .full-page-hero { height: 70vh; }
                    .hero-subtitle { font-size: 1rem !important; letter-spacing: 0.2em !important; }
                }

                @media (max-width: 480px) {
                    .intro-heading { font-size: 2.5rem; }
                    .intro-text { font-size: 1.3rem; }
                    .section-heading { font-size: 3rem; margin-bottom: 30px; }
                    .semester-title { font-size: 2.5rem; }
                    .journey-timeline {
                        padding: 0 5px;
                        margin-bottom: 20px;
                    }
                    .timeline-line {
                        left: 5px;
                        right: 5px;
                    }
                    .timeline-dot::before {
                        width: 12px;
                        height: 12px;
                        border-width: 2px;
                    }
                    .timeline-dot-label {
                        font-size: 0.85rem;
                    }
                    .semester-highlights li { font-size: 1.5rem; padding: 8px 0; padding-left: 25px; }
                    .intro-image { height: 280px; }
                    .full-page-hero { height: 55vh; }
                    .about-intro-section { padding: 40px 4%; }
                    .edu-degree { font-size: 1.8rem; }
                    .edu-school { font-size: 1.3rem; }
                    .edu-board, .edu-percentage { font-size: 1.3rem; }
                    .edu-result-badge { padding: 10px 20px; gap: 15px; }
                    .edu-timeline-vertical {
                        padding: 0 5px;
                    }
                    .edu-timeline-line {
                        left: 5px;
                        right: 5px;
                    }
                    .edu-timeline-dot::before {
                        width: 12px;
                        height: 12px;
                        border-width: 2px;
                    }
                    .edu-timeline-dot-label {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutMePage;
