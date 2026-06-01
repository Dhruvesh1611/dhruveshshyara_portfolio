'use client';
import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { allProjects } from '@/data/projectsData';
import { isValidImageSrc } from '@/lib/imageUtils';
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
        ...(project.purpose ? [{ name: "🎯 Project Purpose", id: "purpose" }] : []),
        ...(project.features?.length ? [{ name: "🛍️ Project Checkouts", id: "features" }] : []),
        ...(project.architecture ? [{ name: "🧩 Technology Stack", id: "arch" }] : []),
        ...(project.dataLayer?.length ? [{ name: "📚 Data Layer", id: "datalayer" }] : []),
        ...(project.roadmap?.length ? [{ name: "🚀 Future Roadmap", id: "roadmap" }] : []),
        ...(project.challenges?.length ? [{ name: "🧠 Challenges & Solutions", id: "challenges" }] : []),
        ...(project.projectStructure?.length ? [{ name: "📂 Project Structure", id: "structure" }] : []),
        ...(project.hackathon ? [{ name: "🏆 Hackathon Achievement", id: "hackathon" }] : []),
        ...(project.standoutPoints?.length ? [{ name: "⭐ Standout Features", id: "standout" }] : [])
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
                                                {project.timeline && (
                                                    <span className="meta-badge">
                                                        <strong>TIMELINE:</strong> {project.timeline}
                                                    </span>
                                                )}
                                                {project.role && (
                                                    <span className="meta-badge">
                                                        <strong>ROLE:</strong> {project.role}
                                                    </span>
                                                )}
                                                {project.hackathon && (
                                                    <span className="meta-badge hackathon-meta-badge">
                                                        <strong>{project.hackathon.achievement}</strong>
                                                    </span>
                                                )}
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
                    {project.live && project.live !== "#" && (
                        <Link href={project.live} target="_blank" className="action-button visit-btn">Visit Site</Link>
                    )}
                    <Link href={project.github} target="_blank" className="action-button github-link">GitHub</Link>
                    {project.youtubeVideoId && (
                        <Link href={`https://www.youtube.com/watch?v=${project.youtubeVideoId}`} target="_blank" className="action-button youtube-btn">🎥 Watch Video</Link>
                    )}
                    {project.marketplace && (
                        <Link href={project.marketplace} target="_blank" className="action-button marketplace-btn">VS Code Marketplace</Link>
                    )}
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
                        {isValidImageSrc(project.image) ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                priority
                                sizes="(max-width: 1200px) 100vw, 1000px"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#64748b', fontSize: '1.2rem' }}>No Image Available</div>
                        )}
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

                    {project.purpose && (
                        <section id="purpose" className="detail-article">
                            <h2 className="detail-section-title">🎯 Project Purpose</h2>
                            <div className="detail-text white-space-pre">{project.purpose}</div>
                        </section>
                    )}

                    {project.features?.length > 0 && (
                        <section id="features" className="detail-article">
                            <h2 className="detail-section-title">🛍️ Project Checkouts (Key Highlights)</h2>
                            <ul className="highlights-list">
                                {project.features.map((feature, i) => (
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
                    )}

                    {project.architecture && (
                        <section id="arch" className="detail-article">
                            <h2 className="detail-section-title">🧩 Technology Stack</h2>
                            <div className="arch-grid">
                                {project.architecture.frontend && (
                                    <div className="arch-card">
                                        <h4>Frontend</h4>
                                        <p>{project.architecture.frontend}</p>
                                    </div>
                                )}
                                {project.architecture.backend && (
                                    <div className="arch-card">
                                        <h4>Backend</h4>
                                        <p>{project.architecture.backend}</p>
                                    </div>
                                )}
                                {project.architecture.database && (
                                    <div className="arch-card">
                                        <h4>Cloud & Infrastructure</h4>
                                        <p>{project.architecture.database}</p>
                                    </div>
                                )}
                                {project.architecture.core && (
                                    <div className="arch-card">
                                        <h4>Core Architecture</h4>
                                        <p>{project.architecture.core}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

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

                    {project.roadmap?.length > 0 && (
                        <section id="roadmap" className="detail-article">
                            <h2 className="detail-section-title">🚀 Future Roadmap</h2>
                            <div className="roadmap-items">
                                {project.roadmap.map((step, i) => (
                                    <div key={i} className="roadmap-step">{step}</div>
                                ))}
                            </div>
                        </section>
                    )}

                    {project.challenges?.length > 0 && (
                        <section id="challenges" className="detail-article">
                            <h2 className="detail-section-title">🧠 Challenges & Solutions</h2>
                            <div className="challenges-list">
                                {project.challenges.map((item, i) => (
                                    <div key={i} className="challenge-card">
                                        <div className="challenge-problem">
                                            <strong>Problem:</strong> {item.problem}
                                        </div>
                                        <div className="challenge-solution">
                                            <strong>Solution:</strong> {item.solution}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {project.projectStructure?.length > 0 && (
                        <section id="structure" className="detail-article">
                            <h2 className="detail-section-title">📂 Project Structure</h2>
                            <div className="structure-list">
                                {project.projectStructure.map((item, i) => (
                                    <div key={i} className="structure-item">{item}</div>
                                ))}
                            </div>
                        </section>
                    )}

                    {project.hackathon && (
                        <section id="hackathon" className="detail-article">
                            <h2 className="detail-section-title">🏆 Hackathon Achievement</h2>
                            <div className="hackathon-achievement-card">
                                <div className="hackathon-trophy-header">
                                    <span className="trophy-icon">🏆</span>
                                    <div className="trophy-text">
                                        <h3 className="hackathon-achievement-title">{project.hackathon.achievement}</h3>
                                        <p className="hackathon-event-name">{project.hackathon.eventName} — organized by {project.hackathon.organizer}</p>
                                    </div>
                                </div>

                                <div className="hackathon-meta-grid">
                                    <div className="hackathon-meta-item">
                                        <span className="hackathon-meta-label">Duration</span>
                                        <span className="hackathon-meta-value">{project.hackathon.duration}</span>
                                    </div>
                                    <div className="hackathon-meta-item">
                                        <span className="hackathon-meta-label">Category</span>
                                        <span className="hackathon-meta-value">{project.hackathon.category}</span>
                                    </div>
                                    <div className="hackathon-meta-item">
                                        <span className="hackathon-meta-label">Team</span>
                                        <span className="hackathon-meta-value">{project.hackathon.teamName}</span>
                                    </div>
                                </div>

                                <div className="hackathon-team-section">
                                    <h4 className="hackathon-subtitle">👥 Team Members</h4>
                                    <div className="team-members-grid">
                                        {project.hackathon.teamMembers.map((member, i) => (
                                            <div key={i} className={`team-member-card ${i === 0 ? 'team-member-highlight' : ''}`}>
                                                <span className="team-member-name">{member.name}</span>
                                                <span className="team-member-role">{member.role}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {project.hackathon.mentors && (
                                    <div className="hackathon-mentors">
                                        <h4 className="hackathon-subtitle">🙏 Special Thanks</h4>
                                        <p className="detail-text">{project.hackathon.mentors} — for continuous support, mentorship, and guidance throughout the hackathon journey.</p>
                                    </div>
                                )}

                                {project.hackathon.keyLearnings?.length > 0 && (
                                    <div className="hackathon-learnings">
                                        <h4 className="hackathon-subtitle">✨ Key Learnings</h4>
                                        <ul className="hackathon-learnings-list">
                                            {project.hackathon.keyLearnings.map((learning, i) => (
                                                <li key={i} className="hackathon-learning-item">{learning}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {project.standoutPoints?.length > 0 && (
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
                            {isValidImageSrc(project.image) ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={1200}
                                    height={800}
                                    style={{ objectFit: 'contain', borderRadius: '12px' }}
                                />
                            ) : (
                                <div style={{ width: 400, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#64748b', fontSize: '1.2rem', borderRadius: '12px' }}>No Image Available</div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mobile-action-bar">
                <Link href={project.github} target="_blank" className="action-button github-link" style={{ flex: 1, justifyContent: 'center' }}>View Code</Link>
                {project.youtubeVideoId && (
                    <Link href={`https://www.youtube.com/watch?v=${project.youtubeVideoId}`} target="_blank" className="action-button youtube-btn" style={{ flex: 1, justifyContent: 'center' }}>🎥 Video</Link>
                )}
                {project.live && project.live !== "#" && (
                    <Link href={project.live} target="_blank" className="action-button visit-btn" style={{ flex: 1, justifyContent: 'center' }}>Live Demo</Link>
                )}
            </div>

            <Footer />
        </div>
    );
}
