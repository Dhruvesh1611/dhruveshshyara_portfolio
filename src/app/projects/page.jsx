'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, motionValue } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { allProjects } from '@/data/projectsData';


const categories = ['All', 'Fullstack', 'UI/UX', 'Frontend', 'Backend', 'Extension', 'App'];

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

    return (
        <Link href={`/projects/${project.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}>
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

                    <div className="project-hover-overlay">
                        <div className="hover-content">
                            <span className="hover-text">CLICK FOR MORE DESCRIPTION & DETAILS</span>
                            <span className="hover-arrow">→</span>
                        </div>
                    </div>
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
        </Link>
    );
};

const ProjectsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? allProjects
        : activeCategory === 'Extension'
            ? allProjects.filter(p => p.category === 'Extension' || p.category === 'Browser Extension')
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
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
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
            `}</style>
        </>
    );
};

export default ProjectsPage;
