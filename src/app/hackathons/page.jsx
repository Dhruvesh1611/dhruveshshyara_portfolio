'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import hackathonsData from '@/data/hackathons.json';
import { isValidImageSrc } from '@/lib/imageUtils';

const HackathonsPage = () => {
    const photos = [...hackathonsData]
        .filter(h => h.status === 'published')
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const scrollToGallery = () => {
        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />

            <main className="page-container">
                {/* ── Hero Section ── */}
                <section className="hack-hero">
                    <div className="hack-hero-bg-glow" />

                    <motion.span
                        className="hack-hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        MEMORIES &amp; MOMENTS
                    </motion.span>

                    <motion.h1
                        className="hack-hero-title"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    >
                        HACKATHONS
                    </motion.h1>

                    <motion.div
                        className="hack-hero-flare"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    >
                        <div className="hack-hero-flare-dot" />
                    </motion.div>

                    <motion.p
                        className="hack-hero-bottom-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Snapshots from the builds, the people, and the memories.
                    </motion.p>

                    <motion.div
                        className="hack-hero-scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        onClick={scrollToGallery}
                    >
                        <div className="hack-scroll-mouse">
                            <div className="hack-scroll-wheel" />
                        </div>
                        <span className="hack-scroll-text">SCROLL TO EXPLORE</span>
                    </motion.div>
                </section>

                {/* ── Gallery Section ── */}
                <section className="gallery-section" id="gallery">
                    <div className="gallery-grid">
                        {photos.length > 0 ? (
                            photos.map((photo, index) => (
                                <motion.div 
                                    key={photo.id || index} 
                                    className="gallery-item"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.08 }}
                                >
                                    {isValidImageSrc(photo.image) ? (
                                        <Image src={photo.image} alt={photo.title || "Hackathon memory"} fill style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>No Image</div>
                                    )}
                                    <div className="gallery-overlay">
                                        <h3 className="gallery-title">{photo.title}</h3>
                                        {photo.date && <p className="gallery-date">{photo.date}</p>}
                                        {photo.description && <p className="gallery-desc">{photo.description}</p>}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className="coming-soon-card"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '32px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}
                            >
                                <h3 style={{ fontSize: '2rem', color: '#fff', margin: '0 0 10px 0' }}>No photos yet</h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '1.2rem', margin: 0 }}>Check back later for hackathon memories!</p>
                            </motion.div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .hack-hero {
                    width: 100%;
                    height: 100vh;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                    background: #030508;
                    padding: 0 5%;
                    margin-top: -90px;
                    padding-top: 90px;
                }

                .hack-hero-bg-glow {
                    position: absolute;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 65%);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 0;
                }

                :global(.hack-hero-subtitle) {
                    font-size: 1.3rem;
                    letter-spacing: 0.5em;
                    color: rgba(255, 255, 255, 0.5);
                    font-family: var(--font-fira-code);
                    text-transform: uppercase;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 1;
                }

                :global(.hack-hero-title) {
                    font-size: 16vw;
                    font-weight: 900;
                    line-height: 0.9;
                    margin: 0;
                    letter-spacing: 0.02em;
                    color: #fff;
                    text-transform: uppercase;
                    font-family: var(--font-anton), sans-serif;
                    position: relative;
                    z-index: 1;
                    text-shadow: 0 0 80px rgba(59, 130, 246, 0.15);
                }

                :global(.hack-hero-flare) {
                    position: relative;
                    width: 280px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.8) 40%, rgba(147, 197, 253, 1) 50%, rgba(59, 130, 246, 0.8) 60%, transparent 100%);
                    margin: 35px auto 0;
                    z-index: 1;
                    transform-origin: center;
                }

                .hack-hero-flare-dot {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 20px 6px rgba(147, 197, 253, 0.8), 0 0 60px 15px rgba(59, 130, 246, 0.4);
                }

                :global(.hack-hero-bottom-text) {
                    font-family: var(--font-playfair), serif;
                    font-style: italic;
                    font-size: clamp(1.3rem, 2.5vw, 2.2rem);
                    margin-top: 40px;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 400;
                    position: relative;
                    z-index: 1;
                }

                :global(.hack-hero-scroll) {
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    z-index: 1;
                }

                .hack-scroll-mouse {
                    width: 24px;
                    height: 38px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 14px;
                    position: relative;
                    display: flex;
                    justify-content: center;
                }

                .hack-scroll-wheel {
                    width: 3px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 3px;
                    margin-top: 8px;
                    animation: scrollPulse 2s infinite ease-in-out;
                }

                @keyframes scrollPulse {
                    0%, 100% { opacity: 1; transform: translateY(0); }
                    50% { opacity: 0.3; transform: translateY(6px); }
                }

                .hack-scroll-text {
                    font-size: 0.7rem;
                    letter-spacing: 0.3em;
                    color: rgba(255, 255, 255, 0.35);
                    font-family: var(--font-fira-code);
                }

                /* ── Gallery ── */
                .gallery-section {
                    padding: 100px 5% 150px;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                    width: 100%;
                }

                :global(.gallery-item) {
                    position: relative;
                    width: 100%;
                    height: 300px;
                    border-radius: 16px;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
                }

                :global(.gallery-item:hover) {
                    transform: scale(1.02);
                    box-shadow: 0 20px 50px rgba(59, 130, 246, 0.15);
                    border-color: rgba(59, 130, 246, 0.3);
                }

                :global(.gallery-item:hover) :global(.gallery-overlay) {
                    opacity: 1;
                }

                :global(.gallery-overlay) {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 24px;
                    z-index: 2;
                }

                :global(.gallery-title) {
                    color: #fff;
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                }

                :global(.gallery-date) {
                    color: rgba(147, 197, 253, 0.9);
                    font-size: 1rem;
                    font-family: var(--font-fira-code);
                    margin: 0 0 10px 0;
                }

                :global(.gallery-desc) {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.95rem;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                @media (max-width: 768px) {
                    .hack-hero { height: 100svh; min-height: 100svh; }
                    :global(.hack-hero-subtitle) { font-size: 0.9rem; letter-spacing: 0.25em; }
                    :global(.hack-hero-bottom-text) { font-size: 1.1rem; margin-top: 30px; }
                    :global(.hack-hero-flare) { width: 180px; }
                    :global(.hack-hero-scroll) { bottom: 30px; }
                    .gallery-section { padding: 60px 5% 100px; }
                    .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
                    :global(.gallery-item) { height: 250px; }
                    :global(.gallery-title) { font-size: 1.3rem; }
                    :global(.gallery-desc) { font-size: 0.85rem; -webkit-line-clamp: 2; }
                    :global(.gallery-overlay) { opacity: 1; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); }
                }
            `}</style>
        </>
    );
};

export default HackathonsPage;
