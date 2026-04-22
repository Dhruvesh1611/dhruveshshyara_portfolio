'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, motionValue } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { allProjects } from '@/data/projectsData';


const categories = ['All', 'Fullstack', 'UI/UX', 'Extension', 'App', 'Other'];

const ProjectCard = ({ project }) => {
    const x = motionValue(0);
    const y = motionValue(0);

    const rotateX = useTransform(y, [-150, 150], [10, -10]);
    const rotateY = useTransform(x, [-150, 150], [-10, 10]);

    const springConfig = { damping: 20, stiffness: 300 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    // Parallax effect for the image
    const imgY = useTransform(y, [-150, 150], [20, -20]);
    const springImgY = useSpring(imgY, springConfig);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const isFullstack = project.category === 'Fullstack';
    const isUIUX = project.category === 'UI/UX';

    const cardContent = (
        <motion.div
            layout
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX: springRotateX,
                rotateY: springRotateY,
            }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.05
                    }
                },
                hover: {
                    borderColor: "rgba(168, 85, 247, 1)",
                    boxShadow: "0 40px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.2)",
                    transition: { duration: 0.3 }
                }
            }}
            initial="hidden"
            animate="show"
            whileHover="hover"
            exit={{ opacity: 0, scale: 0.9 }}
            className="project-card-premium"
        >
            <motion.div
                className="card-image-wrapper"
                variants={{
                    hidden: { opacity: 0, scale: 0.92, y: 20 },
                    show: {
                        opacity: 1, scale: 1, y: 0,
                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
                }}
            >
                <motion.div
                    style={{ y: springImgY, scale: 1.2 }}
                    className="card-img-container"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                    />
                </motion.div>

                {isFullstack ? (
                    <div className="project-hover-overlay">
                        <div className="hover-content">
                            <span className="hover-text">CLICK FOR MORE DESCRIPTION & DETAILS</span>
                            <span className="hover-arrow">→</span>
                        </div>
                    </div>
                ) : isUIUX ? (
                    <div className="project-hover-overlay project-hover-overlay--buttons">
                        <div className="hover-buttons">
                            <a href={project.figma || '#'} target="_blank" rel="noopener noreferrer" className="hover-btn hover-btn--figma" onClick={(e) => e.stopPropagation()}>
                                <svg viewBox="0 0 38 57" fill="none" width="18" height="27">
                                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                                </svg>
                                <span>View in Figma</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="project-hover-overlay project-hover-overlay--buttons">
                        <div className="hover-buttons">
                            {project.github && project.github !== '#' && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover-btn hover-btn--github" onClick={(e) => e.stopPropagation()}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                                    <span>GitHub</span>
                                </a>
                            )}
                            {project.live && project.live !== '#' && (
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover-btn hover-btn--live" onClick={(e) => e.stopPropagation()}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    <span>Visit Site</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}
                <div className="card-category-tag">{project.category}</div>
            </motion.div>

                <motion.div
                    className="card-content"
                    variants={{
                        hidden: { opacity: 0, y: 25 },
                        show: {
                            opacity: 1, y: 0,
                            transition: { duration: 0.5, ease: "easeOut" }
                        }
                    }}
                >
                    <motion.h3
                        className="card-title"
                        variants={{
                            show: { y: 0 },
                            hover: { y: -5 }
                        }}
                    >
                        {project.title.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0.8 }}
                                variants={{
                                    hover: { opacity: 1, color: "#fff" }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h3>
                    <p className="card-desc">{project.description}</p>
                    <div className="card-footer">
                        <div className="card-tags">
                            {project.tags.map(tag => (
                                <span key={tag} className="card-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
        </motion.div>
    );

    if (isFullstack) {
        return (
            <Link href={`/projects/${project.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

const ProjectsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? allProjects
        : activeCategory === 'Extension'
            ? allProjects.filter(p => p.category === 'Extension' || p.category === 'Browser Extension')
            : activeCategory === 'Other'
                ? allProjects.filter(p => p.category === 'Frontend' || p.category === 'Backend' || p.category === 'Other')
                : allProjects.filter(p => p.category === activeCategory);

    return (
        <>
            <Navbar />
            <div className="bg-decorations">
                <div className="blob blob-2"></div>
            </div>

            <main className="page-container">
                <section className="full-page-hero">
                    <div className="hero-glow"></div>
                    <div className="hero-content">
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            MY WORKS
                        </motion.h1>
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            CRAFTING DIGITAL EXPERIENCES
                        </motion.span>
                        <motion.p
                            className="hero-bottom-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            with passion & code.
                        </motion.p>
                    </div>
                </section>

                <section className="projects-grid-section">
                    <div className="filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="projects-grid">
                        <AnimatePresence mode='popLayout'>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))
                            ) : activeCategory === 'App' ? (
                                <motion.div
                                    className="coming-soon-card"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                >
                                    <div className="coming-soon-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="56" height="56">
                                            <rect x="5" y="2" width="14" height="20" rx="3" />
                                            <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <h3 className="coming-soon-title">In Development</h3>
                                    <p className="coming-soon-text">Mobile app projects are currently being crafted.<br/>Stay tuned for exciting launches.</p>
                                    <div className="coming-soon-dots">
                                        <span className="cs-dot" style={{animationDelay: '0s'}} />
                                        <span className="cs-dot" style={{animationDelay: '0.3s'}} />
                                        <span className="cs-dot" style={{animationDelay: '0.6s'}} />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="coming-soon-card"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <p className="coming-soon-text">No projects found in this category.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .bg-decorations {
                    position: fixed;
                    inset: 0;
                    z-index: -1;
                    overflow: hidden;
                    pointer-events: none;
                }

                .full-page-hero {
                    height: 90vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    text-align: center;
                }



                .hero-subtitle {
                    display: block;
                    font-size: 1.8rem;
                    letter-spacing: 0.6em;
                    color: #fff;
                    font-family: var(--font-fira-code);
                    opacity: 0.8;
                }

                .projects-grid-section {
                    padding: 0 5% 150px;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .filter-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    margin-bottom: 60px;
                }

                .filter-tab {
                    padding: 12px 28px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 1.4rem;
                    font-family: var(--font-fira-code);
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
                }

                .filter-tab:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.2);
                }

                .filter-tab.active {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                    box-shadow: 0 10px 30px rgba(255,255,255,0.2);
                }

                .projects-grid {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 40px !important;
                    width: 100% !important;
                    align-items: stretch;
                }

                :global(.project-card-premium) {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                    width: 100% !important;
                    height: 100%;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    transform-style: preserve-3d;
                }

                :global(.card-image-wrapper) {
                    height: 280px;
                    min-height: 280px;
                    position: relative;
                    overflow: hidden;
                    background: #000;
                    transform-style: preserve-3d;
                }

                :global(.card-img-container) {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                :global(.card-overlay) {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                :global(.card-category-tag) {
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(20px);
                    padding: 10px 24px;
                    border-radius: 100px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    border: 1px solid rgba(255,255,255,0.2);
                    z-index: 4;
                    color: #fff;
                }

                :global(.card-content) {
                    padding: 30px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    min-height: 280px;
                }

                :global(.card-title) {
                    font-size: 2.4rem;
                    font-weight: 900;
                    color: #fff;
                    margin: 0;
                    letter-spacing: -0.02em;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    min-height: 2.8em;
                }

                :global(.card-desc) {
                    font-size: 1.4rem;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.6;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    flex: 1;
                }

                :global(.card-footer) {
                    margin-top: auto;
                }

                :global(.card-tags) {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    max-height: 70px;
                    overflow: hidden;
                }

                :global(.card-tag) {
                    font-size: 1rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                    color: rgba(255,255,255,0.8);
                    font-family: var(--font-fira-code);
                }

                @media (max-width: 1400px) {
                    .projects-grid { 
                        grid-template-columns: repeat(3, 1fr) !important; 
                        gap: 30px !important;
                    }
                    :global(.card-image-wrapper) { height: 260px; min-height: 260px; }
                    :global(.card-content) { min-height: 260px; }
                }

                @media (max-width: 1200px) {
                    .projects-grid { 
                        grid-template-columns: repeat(2, 1fr) !important; 
                    }
                    :global(.card-image-wrapper) { height: 280px; min-height: 280px; }
                    :global(.card-content) { min-height: 260px; }
                }

                @media (max-width: 768px) {
                    .projects-grid { 
                        grid-template-columns: 1fr !important; 
                        gap: 30px !important;
                    }
                    :global(.card-image-wrapper) { height: 280px; min-height: 280px; }
                    :global(.card-content) { min-height: auto; padding: 20px; }
                    :global(.card-title) { font-size: 2rem; min-height: auto; }
                    :global(.card-desc) { font-size: 1.3rem; }
                    :global(.card-category-tag) { top: 15px; left: 15px; padding: 6px 14px; font-size: 1rem; }
                    .full-page-hero { height: 70vh; }
                    .projects-grid-section { padding: 0 4% 100px; }
                    .filter-tabs { gap: 8px; margin-bottom: 40px; }
                    .filter-tab { padding: 8px 16px; font-size: 1.2rem; }
                    .hero-subtitle { font-size: 1rem !important; letter-spacing: 0.2em !important; }
                }

                @media (max-width: 480px) {
                    .projects-grid { gap: 20px !important; }
                    :global(.card-image-wrapper) { height: 220px; min-height: 220px; }
                    :global(.card-content) { padding: 16px; gap: 10px; }
                    :global(.card-title) { font-size: 1.8rem; }
                    :global(.card-desc) { font-size: 1.2rem; -webkit-line-clamp: 2; }
                    :global(.card-tag) { font-size: 0.9rem; padding: 4px 10px; }
                    .full-page-hero { height: 60vh; }
                    .projects-grid-section { padding: 0 3% 80px; }
                    .filter-tabs { gap: 6px; margin-bottom: 30px; }
                    .filter-tab { padding: 6px 12px; font-size: 1.1rem; }
                }

                /* ── Hover Buttons for Non-Fullstack Cards ── */
                :global(.project-hover-overlay--buttons) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                :global(.hover-buttons) {
                    display: flex;
                    gap: 16px;
                    z-index: 10;
                }

                :global(.hover-btn) {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    border-radius: 100px;
                    font-size: 1.4rem;
                    font-weight: 700;
                    font-family: var(--font-fira-code), monospace;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(12px);
                    letter-spacing: 0.5px;
                }

                :global(.hover-btn--github) {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }
                :global(.hover-btn--github:hover) {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: rgba(255, 255, 255, 0.35);
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
                }

                :global(.hover-btn--live) {
                    background: rgba(168, 85, 247, 0.2);
                    color: #c084fc;
                    border-color: rgba(168, 85, 247, 0.3);
                }
                :global(.hover-btn--live:hover) {
                    background: rgba(168, 85, 247, 0.35);
                    border-color: rgba(168, 85, 247, 0.5);
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(168, 85, 247, 0.3);
                }

                @media (max-width: 480px) {
                    :global(.hover-buttons) { gap: 10px; flex-direction: column; }
                    :global(.hover-btn) { padding: 10px 20px; font-size: 1.2rem; }
                }

                /* ── Figma Button ── */
                :global(.hover-btn--figma) {
                    background: rgba(162, 89, 255, 0.15);
                    color: #c4b5fd;
                    border-color: rgba(162, 89, 255, 0.3);
                }
                :global(.hover-btn--figma:hover) {
                    background: rgba(162, 89, 255, 0.3);
                    border-color: rgba(162, 89, 255, 0.5);
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(162, 89, 255, 0.3);
                    color: #e0d5ff;
                }

                /* ── Coming Soon Card ── */
                .coming-soon-card {
                    grid-column: 1 / -1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 100px 40px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 32px;
                    gap: 20px;
                }
                .coming-soon-icon {
                    color: rgba(168, 85, 247, 0.4);
                    margin-bottom: 8px;
                }
                .coming-soon-title {
                    font-size: 3rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #c084fc, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-family: var(--font-outfit), sans-serif;
                    letter-spacing: -0.02em;
                }
                .coming-soon-text {
                    font-size: 1.5rem;
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.7;
                    max-width: 400px;
                }
                .coming-soon-dots {
                    display: flex;
                    gap: 8px;
                    margin-top: 12px;
                }
                .cs-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(168, 85, 247, 0.5);
                    animation: cs-pulse 1.4s ease-in-out infinite;
                }
                @keyframes cs-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
        </>
    );
};


export default ProjectsPage;
