'use client';
import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { allProjects } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import './ProjectDetail.css';

export default function ProjectPage({ params }) {
    const { slug } = use(params);
    const project = allProjects.find(p => p.slug === slug);

    const [activeSection, setActiveSection] = useState('overview');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    if (!project) {
        notFound();
    }

    const navItems = [
        { name: "Project Overview", id: "overview" },
        ...(project.youtubeVideoId ? [{ name: "🎥 Video Explanation", id: "video" }] : []),
        { name: "🎯 Project Purpose", id: "purpose" },
        { name: "🛍️ Project Checkouts", id: "features" },
        { name: "🧩 Technology Stack", id: "arch" },
        { name: "📚 Data Layer", id: "datalayer" },
        { name: "🚀 Future Roadmap", id: "roadmap" },
        { name: "⭐ Standout Features", id: "standout" }
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [navItems]);

    return (
        <div className="project-detail-container">
            <Navbar />

            <nav className="breadcrumb-nav">
                {/* <Link href="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <Link href="/projects">Work</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{project.title}</span> */}
            </nav>

            <header className="detail-header">
                <div className="header-left">
                    <div className="metadata-badges">
                        <span className="meta-badge">
                            <strong>TIME:</strong> {project.timeTaken || "8 Weeks"}
                        </span>
                        <span className="meta-badge">
                            <strong>ROLE:</strong> {project.role || "Lead Developer"}
                        </span>
                    </div>
                    <motion.h1
                        className="project-large-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p className="project-one-liner">{project.subtitle || project.description}</motion.p>
                </div>
                <div className="header-right">
                    <Link href={project.live} target="_blank" className="action-button visit-btn">Visit Site</Link>
                    <Link href={project.github} target="_blank" className="action-button github-link">GitHub</Link>
                </div>
            </header>

            <div className="detail-main-layout">
                <main className="detail-content-side">
                    <motion.div
                        className="project-main-visual"
                        onClick={() => setIsLightboxOpen(true)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            priority
                            sizes="(max-width: 1200px) 100vw, 1000px"
                            style={{ objectFit: 'cover' }}
                        />
                    </motion.div>

                    <section id="overview" className="detail-article">
                        <h2 className="detail-section-title">Project Overview</h2>
                        <div className="detail-text white-space-pre">{project.detailedDescription}</div>
                    </section>

                    {project.youtubeVideoId && (
                        <section id="video" className="detail-article">
                            <h2 className="detail-section-title">🎥 Video Explanation</h2>
                            <YouTubeEmbed videoId={project.youtubeVideoId} title={`${project.title} - Explanation`} />
                        </section>
                    )}

                    <section id="purpose" className="detail-article">
                        <h2 className="detail-section-title">🎯 Project Purpose</h2>
                        <div className="detail-text white-space-pre">{project.purpose}</div>
                    </section>

                    <section id="features" className="detail-article">
                        <h2 className="detail-section-title">🛍️ Project Checkouts (Key Highlights)</h2>
                        <ul className="highlights-list">
                            {(project.features || []).map((feature, i) => (
                                <li key={i} className="highlight-item">
                                    <span className="highlight-icon">{feature.icon}</span>
                                    <div className="highlight-text-content">
                                        <h4 className="highlight-title">{feature.title}</h4>
                                        <p className="detail-text" style={{ marginTop: '5px' }}>{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="arch" className="detail-article">
                        <h2 className="detail-section-title">🧩 Technology Stack</h2>
                        <div className="arch-grid">
                            <div className="arch-card">
                                <h4>Frontend</h4>
                                <p>{project.architecture?.frontend}</p>
                            </div>
                            <div className="arch-card">
                                <h4>Backend</h4>
                                <p>{project.architecture?.backend}</p>
                            </div>
                            <div className="arch-card">
                                <h4>Cloud & Infrastructure</h4>
                                <p>{project.architecture?.database}</p>
                            </div>
                        </div>
                    </section>

                    {project.dataLayer && (
                        <section id="datalayer" className="detail-article">
                            <h2 className="detail-section-title">📚 Data Layer</h2>
                            <ul className="roadmap-list">
                                {project.dataLayer.map((point, i) => (
                                    <li key={i} className="roadmap-step">{point}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section id="roadmap" className="detail-article">
                        <h2 className="detail-section-title">🚀 Future Roadmap</h2>
                        <div className="roadmap-items">
                            {(project.roadmap || []).map((step, i) => (
                                <div key={i} className="roadmap-step">{step}</div>
                            ))}
                        </div>
                    </section>

                    {project.standoutPoints && (
                        <section id="standout" className="detail-article">
                            <h2 className="detail-section-title">⭐ Why This Project Stands Out</h2>
                            <ul className="highlights-list standout-grid">
                                {project.standoutPoints.map((point, i) => (
                                    <li key={i} className="highlight-item standout-card">
                                        <span className="highlight-icon">✔️</span>
                                        <span className="detail-text" style={{ fontWeight: 600 }}>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>

                <aside className="detail-sidebar">
                    <div className="on-this-page-card">
                        <h3 className="nav-title">ON THIS PAGE</h3>
                        <nav className="side-nav-links">
                            {navItems.map(item => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`side-link ${activeSection === item.id ? 'active' : ''}`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>
            </div>

            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1200}
                                height={800}
                                style={{ objectFit: 'contain', borderRadius: '12px' }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mobile-action-bar">
                <Link href={project.github} target="_blank" className="action-button github-link" style={{ flex: 1, justifyContent: 'center' }}>View Code</Link>
                <Link href={project.live} target="_blank" className="action-button visit-btn" style={{ flex: 1, justifyContent: 'center' }}>Live Demo</Link>
            </div>

            <Footer />
        </div>
    );
}
