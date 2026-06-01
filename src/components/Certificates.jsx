'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import certificatesData from '@/data/certificates.json';
import { isValidImageSrc } from '@/lib/imageUtils';

const certificates = [...certificatesData]
    .filter(c => c.status === 'published' && c.featured)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

const CertificateTextSection = ({ cert, setActiveCert, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-45% 0px -45% 0px"
    });

    useEffect(() => {
        if (isInView) {
            setActiveCert(cert);
        }
    }, [isInView, cert, setActiveCert]);

    return (
        <div ref={ref} className="project-text-section">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Inline image for mobile - hidden on desktop */}
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="mobile-project-image-link">
                    <motion.div
                        className="mobile-project-image mobile-cert-image"
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="project-image-box" style={{ border: '2px solid var(--color-light-purple)' }}>
                            {isValidImageSrc(cert.image) ? (
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    sizes="(max-width: 998px) 90vw, 1px"
                                    style={{ objectFit: 'contain', padding: '20px', background: '#0a0a0a' }}
                                    className="project-display-img"
                                />
                            ) : (
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#64748b', fontSize: '1rem' }}>No Image</div>
                            )}
                            <div className="project-hover-overlay">
                                <div className="hover-content">
                                    <span className="hover-text">VIEW CERTIFICATE</span>
                                    <span className="hover-arrow">→</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </a>

                <span className="project-number">{cert.issuer} | {cert.date}</span>
                <h2 className="project-title-display">{cert.title}</h2>
                <p className="project-desc-display">{cert.description}</p>
                {isLast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginTop: '50px' }}
                    >
                        <Link href="/certificates" className="view-more-btn">
                            View All Certificates →
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

const Certificates = () => {
    const [activeCert, setActiveCert] = useState(certificates[0]);

    return (
        <section className="projects-scrolly-container" id="certificates" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="projects-header-wrapper">
                <motion.h1
                    className="projects-main-heading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    AWARDS
                </motion.h1>
            </div>

            <div className="scrolly-layout">
                {/* Left: Certificate Texts */}
                <div className="scrolly-left-content">
                    {certificates.map((cert, index) => (
                        <CertificateTextSection
                            key={cert.id}
                            cert={cert}
                            setActiveCert={setActiveCert}
                            isLast={index === certificates.length - 1}
                        />
                    ))}
                </div>

                {/* Right: Sticky Visual */}
                <div className="scrolly-right-visual">
                    <div className="sticky-image-fixed">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCert.id}
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="sticky-image-container"
                            >
                                <a
                                    href={activeCert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-image-box"
                                    style={{ border: '2px solid var(--color-light-purple)', display: 'block', position: 'relative' }}
                                >
                                    {isValidImageSrc(activeCert.image) ? (
                                        <Image
                                            src={activeCert.image}
                                            alt={activeCert.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: 'contain', padding: '20px', background: '#0a0a0a' }}
                                            className="project-display-img"
                                        />
                                    ) : (
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#64748b', fontSize: '1rem' }}>No Image</div>
                                    )}
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
                                </a>
                                <div className="image-overlay-glow" style={{ background: 'radial-gradient(circle, var(--color-light-blue) 0%, transparent 70%)' }}></div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
