'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, motionValue } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { isValidImageSrc } from '@/lib/imageUtils';
import certificatesData from '@/data/certificates.json';

// Read from the admin-managed JSON, show ALL published certificates on this page
const allCertificates = [...certificatesData]
    .filter(c => c.status === 'published')
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map(c => ({
        id: c.id,
        name: c.title,
        issuer: c.issuer,
        year: c.date,
        link: c.link,
        image: c.image,
        description: c.description,
        featured: c.featured,
        category: c.category || 'Skill',
    }));

const CertificateCard = ({ cert }) => {
    const x = motionValue(0);
    const y = motionValue(0);

    const rotateX = useTransform(y, [-150, 150], [10, -10]);
    const rotateY = useTransform(x, [-150, 150], [-10, 10]);

    const springConfig = { damping: 20, stiffness: 300 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

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
            className="cert-card-premium"
        >
            <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-image-wrapper"
                style={{ display: 'block', textDecoration: 'none' }}
                variants={{
                    hidden: { opacity: 0, scale: 0.92, y: 20 },
                    show: {
                        opacity: 1, scale: 1, y: 0,
                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
                }}
            >
                <motion.div
                    style={{ y: springImgY, scale: 1.1 }}
                    className="cert-img-container"
                >
                    {isValidImageSrc(cert.image) ? (
                        <Image
                            src={cert.image}
                            alt={cert.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'contain', padding: '40px' }}
                        />
                    ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#64748b', fontSize: '1rem' }}>No Image</div>
                    )}
                </motion.div>

                <div className="project-hover-overlay">
                    <div className="hover-content">
                        <span className="hover-text">VIEW CERTIFICATE</span>
                        <div className="view-button-premium">
                            <span>VIEW</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="cert-date-tag">{cert.year}</div>
            </motion.a>

            <motion.div
                className="cert-content"
                variants={{
                    hidden: { opacity: 0, y: 25 },
                    show: {
                        opacity: 1, y: 0,
                        transition: { duration: 0.5, ease: "easeOut" }
                    }
                }}
            >
                <motion.h3
                    className="cert-title"
                    variants={{
                        show: { y: 0 },
                        hover: { y: -5 }
                    }}
                >
                    {cert.name}
                </motion.h3>
                <p className="cert-issuer">{cert.issuer}</p>
            </motion.div>
        </motion.div>
    );
};

const categories = ['All', 'Skill Certificates', 'Hackathon Certificates'];

const CertificatesPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredCertificates = activeCategory === 'All'
        ? allCertificates
        : activeCategory === 'Skill Certificates'
            ? allCertificates.filter(c => c.category === 'Skill')
            : allCertificates.filter(c => c.category === 'Hackathon');

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
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            VERIFIED SKILLS &amp; ACHIEVEMENTS
                        </motion.span>
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        >
                            Awards
                        </motion.h1>
                        <motion.div
                            className="hero-flare"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                            style={{ transformOrigin: 'center' }}
                        >
                            <div className="hero-flare-dot" />
                        </motion.div>
                        <motion.p
                            className="hero-bottom-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            my certifications.
                        </motion.p>
                    </div>
                    <motion.div
                        className="hero-scroll-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        onClick={() => document.querySelector('.certs-grid-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <div className="hero-scroll-mouse"><div className="hero-scroll-wheel" /></div>
                        <span className="hero-scroll-text">SCROLL TO EXPLORE</span>
                    </motion.div>
                </section>

                <section className="certs-grid-section">
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

                    <div className="certs-grid">
                        <AnimatePresence mode='popLayout'>
                            {filteredCertificates.length > 0 ? (
                                filteredCertificates.map((cert) => (
                                    <CertificateCard key={cert.id} cert={cert} />
                                ))
                            ) : (
                                <motion.div
                                    className="coming-soon-card"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '32px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}
                                >
                                    <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '10px' }}>Nothing here yet</h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '1.2rem' }}>Check back later for updates to this category.</p>
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




                .hero-subtitle {
                    display: block;
                    font-size: 1.8rem;
                    letter-spacing: 0.6em;
                    color: #fff;
                    font-family: var(--font-fira-code);
                    opacity: 0.8;
                }

                .certs-grid-section {
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

                .certs-grid {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 40px !important;
                    width: 100% !important;
                }

                :global(.cert-card-premium) {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                    width: 100% !important;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    transform-style: preserve-3d;
                }

                :global(.cert-image-wrapper) {
                    height: 350px;
                    position: relative;
                    overflow: hidden;
                    background: #111;
                    transform-style: preserve-3d;
                }

                :global(.cert-img-container) {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                :global(.cert-overlay) {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                :global(.cert-date-tag) {
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

                :global(.cert-content) {
                    padding: 40px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                :global(.cert-title) {
                    font-size: 2.8rem;
                    font-weight: 800;
                    color: #fff;
                    margin: 0;
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                }

                :global(.cert-issuer) {
                    font-size: 1.6rem;
                    color: var(--color-light-purple);
                    font-family: var(--font-fira-code);
                    margin: 0;
                }

                @media (max-width: 1400px) {
                    .certs-grid { 
                        grid-template-columns: repeat(3, 1fr) !important; 
                        gap: 30px !important;
                    }
                    :global(.cert-image-wrapper) { height: 320px; }
                }

                @media (max-width: 1200px) {
                    .certs-grid { 
                        grid-template-columns: repeat(2, 1fr) !important; 
                    }
                    :global(.cert-image-wrapper) { height: 280px; }
                    :global(.cert-title) { font-size: 2.4rem; }
                }

                @media (max-width: 768px) {
                    .certs-grid { 
                        grid-template-columns: 1fr !important; 
                        gap: 25px !important;
                    }
                    :global(.cert-image-wrapper) { height: 250px; }
                    :global(.cert-title) { font-size: 2.2rem; }
                    :global(.cert-content) { padding: 20px; gap: 10px; }
                    :global(.cert-issuer) { font-size: 1.3rem; }
                    :global(.cert-date-tag) { top: 15px; left: 15px; padding: 6px 14px; font-size: 1rem; }
                    .hero-subtitle { font-size: 1rem !important; letter-spacing: 0.2em !important; }
                }

                @media (max-width: 480px) {
                    .certs-grid { gap: 20px !important; }
                    :global(.cert-image-wrapper) { height: 200px; }
                    :global(.cert-title) { font-size: 1.8rem; }
                    :global(.cert-content) { padding: 16px; }
                    :global(.cert-issuer) { font-size: 1.2rem; }
                }
            `}</style>
        </>
    );
};

export default CertificatesPage;
