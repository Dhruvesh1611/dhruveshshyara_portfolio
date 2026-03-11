'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const allCertificates = [
    {
        id: 1,
        name: "CSS Basic",
        issuer: "HackerRank",
        year: "2025",
        description: "Certified in CSS fundamentals including layouts, selectors, styling techniques, and responsive design principles.",
        link: "https://www.hackerrank.com/certificates/e72e9d42799c",
        image: "/certificates/css-basic.png",
    },
    {
        id: 2,
        name: "JavaScript (Basic)",
        issuer: "HackerRank",
        year: "2025",
        description: "Certified in JavaScript basics covering core language features, DOM manipulation, and fundamental programming concepts.",
        link: "https://www.hackerrank.com/certificates/065ed799b22f",
        image: "/certificates/javascript-basic.png",
    },
    {
        id: 3,
        name: "Node (Basic)",
        issuer: "HackerRank",
        year: "2025",
        description: "Certified in Node.js fundamentals including server-side JavaScript, modules, and asynchronous programming.",
        link: "https://www.hackerrank.com/certificates/ceb3ab163e6d",
        image: "/certificates/node-basic.png",
    },
    {
        id: 4,
        name: "Problem Solving (Basic)",
        issuer: "HackerRank",
        year: "2025",
        description: "Certified in problem solving fundamentals covering data structures, algorithms, and computational thinking.",
        link: "https://www.hackerrank.com/certificates/0625153f0783",
        image: "/certificates/problem-solving-basic.png",
    },
    {
        id: 5,
        name: "Frontend Developer (React)",
        issuer: "HackerRank",
        year: "2025",
        description: "Certified Frontend Developer with React, skilled in building modern, responsive web applications.",
        link: "https://www.hackerrank.com/certificates/cc7dcbd6558a",
        image: "/certificates/frontend-developer-react.png",
    },
    {
        id: 6,
        name: "Azure Services (Basics)",
        issuer: "SimpliLearn",
        year: "2025",
        description: "Completed Azure Services Basics, demonstrating proficiency in cloud infrastructure, deployment, and management.",
        link: "https://simpli-web.app.link/e/N5LenkEbDTb",
        image: "/certificates/azure-services-basics.png",
    },
    {
        id: 7,
        name: "Amazon DocumentDB",
        issuer: "SimpliLearn",
        year: "2025",
        description: "Certified in Amazon DocumentDB, covering managed NoSQL database service compatible with MongoDB workloads.",
        link: "https://simpli-web.app.link/e/uPhDpKxwETb",
        image: "/certificates/amazon-documentdb.png",
    },
    {
        id: 8,
        name: "Gateway Load Balancer",
        issuer: "SimpliLearn",
        year: "2025",
        description: "Certified in Gateway Load Balancer concepts, covering network traffic distribution and high availability patterns.",
        link: "https://simpli-web.app.link/e/sq0S9jMwETb",
        image: "/certificates/gateway-load-balancer.png",
    }
];

const CertTextSection = ({ cert, setActiveCert }) => {
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
                {/* Inline image for mobile */}
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="mobile-project-image-link">
                    <motion.div
                        className="mobile-project-image mobile-cert-image"
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="project-image-box" style={{ border: '2px solid var(--color-light-purple)' }}>
                            <Image
                                src={cert.image}
                                alt={cert.name}
                                fill
                                sizes="(max-width: 998px) 90vw, 1px"
                                style={{ objectFit: 'contain', padding: '20px', background: '#0a0a0a' }}
                                className="project-display-img"
                            />
                            <div className="project-hover-overlay">
                                <div className="hover-content">
                                    <span className="hover-text">VIEW CERTIFICATE</span>
                                    <span className="hover-arrow">→</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </a>

                <span className="project-number">{cert.issuer} | {cert.year}</span>
                <h2 className="project-title-display">{cert.name}</h2>
                <p className="project-desc-display">{cert.description}</p>
            </motion.div>
        </div>
    );
};

const CertificatesPage = () => {
    const [activeCert, setActiveCert] = useState(allCertificates[0]);

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
                            Awards
                        </motion.h1>
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            VERIFIED SKILLS & ACHIEVEMENTS
                        </motion.span>
                        <motion.p
                            className="hero-bottom-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            my certifications.
                        </motion.p>
                    </div>
                </section>

                <section className="projects-scrolly-container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="scrolly-layout">
                        {/* Left: Certificate Texts */}
                        <div className="scrolly-left-content">
                            {allCertificates.map((cert) => (
                                <CertTextSection
                                    key={cert.id}
                                    cert={cert}
                                    setActiveCert={setActiveCert}
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
                                            <Image
                                                src={activeCert.image}
                                                alt={activeCert.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                style={{ objectFit: 'contain', padding: '20px', background: '#0a0a0a' }}
                                                className="project-display-img"
                                            />
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

                @media (max-width: 768px) {
                    .full-page-hero { height: 70vh; }
                    .hero-subtitle { font-size: 1rem !important; letter-spacing: 0.2em !important; }
                }

                @media (max-width: 480px) {
                    .full-page-hero { height: 60vh; }
                }
            `}</style>
        </>
    );
};

export default CertificatesPage;
