'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import hackathonsData from '@/data/hackathons.json';
import { isValidImageSrc } from '@/lib/imageUtils';

const HackathonsPage = () => {
    const hackathonsList = [
        {
            id: 'charusat',
            title: 'OCEANLAB × CHARUSAT HACKS 2026',
            hours: '48 HOURS',
            subtitle: 'of Ideas, Code & Passion',
            text: <>Built an AI-first SaaS solution,<br />collaborated with amazing people,<br />and created memories for a lifetime.</>,
            photos: [
                { src: "/hackathons/charusat/charusat2.png", top: "7%", left: "12%", rotate: -8, label: "The Vibe" },
                { src: "/hackathons/charusat/charusat3.png", top: "10%", right: "15%", rotate: 7, label: "The Energy" },
                { src: "/hackathons/charusat/charusat1.png", bottom: "12%", left: "14%", rotate: -5, label: "The Team" },
                { src: "/hackathons/charusat/charusat4.png", bottom: "10%", right: "12%", rotate: 8, label: "Moments", aspectRatio: "4/4" }
            ]
        },
        {
            id: 'svnit',
            title: 'SVNIT HACKATHON 2026',
            hours: '36 HOURS',
            subtitle: 'of Innovation & Building',
            text: <>Pushed our limits overnight,<br />learned new tech stacks,<br />and built a product we are proud of.</>,
            photos: [
                { src: "/hackathons/svnit/svnit1.png", top: "8%", left: "15%", rotate: -6, label: "The Build" },
                { src: "/hackathons/svnit/svnit2.png", top: "16%", right: "12%", rotate: 9, label: "The Squad", aspectRatio: "12/8" },
                { src: "/hackathons/svnit/svnit3.png", bottom: "10%", left: "25%", rotate: -4, label: "The Setup" }
            ]
        }
    ];

    const scrollToGallery = () => {
        document.getElementById('collage-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />

            <main className="page-container">
                {/* ── Hero Section ── */}
                <section className="full-page-hero">
                    <div className="hero-glow"></div>
                    <div className="hero-content">
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            MEMORIES &amp; MOMENTS
                        </motion.span>
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        >
                            HACKATHONS
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
                            Snapshots from the builds, the people, and the memories.
                        </motion.p>
                    </div>
                    <motion.div
                        className="hero-scroll-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        onClick={scrollToGallery}
                    >
                        <div className="hero-scroll-mouse"><div className="hero-scroll-wheel" /></div>
                        <span className="hero-scroll-text">SCROLL TO EXPLORE</span>
                    </motion.div>
                </section>

                {/* ── Floating Memory Collage Sections ── */}
                {hackathonsList.map((hackathon, hIndex) => (
                    <section key={hackathon.id} className="collage-section" id={hIndex === 0 ? "collage-section" : `collage-section-${hackathon.id}`}>
                        <div className="collage-container">

                            {/* Center Card */}
                            <motion.div
                                className="center-card"
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, type: "spring", stiffness: 80 }}
                            >
                                <div className="center-card-header">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}><path d="M12 2L2 22h20L12 2z" /></svg>
                                    {hackathon.title}
                                </div>
                                <div className="center-card-title">{hackathon.hours}</div>
                                <div className="center-card-subtitle">{hackathon.subtitle}</div>
                                <p className="center-card-text">
                                    {hackathon.text}
                                </p>
                                <div className="center-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                </div>
                            </motion.div>

                            {/* Floating Photos */}
                            {hackathon.photos.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    className={`collage-photo-wrapper float-anim-${index}`}
                                    style={{
                                        top: photo.top,
                                        bottom: photo.bottom,
                                        left: photo.left,
                                        right: photo.right,
                                        zIndex: 10 + index,
                                        ...(photo.aspectRatio ? { aspectRatio: photo.aspectRatio } : {})
                                    }}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.2, delay: 0.3 + (index * 0.15), type: "spring", stiffness: 60 }}
                                >
                                    <div className="collage-photo" style={{ transform: `rotate(${photo.rotate}deg)` }}>
                                        {isValidImageSrc(photo.src) ? (
                                            <Image src={photo.src} alt={photo.label} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 35vw" />
                                        ) : (
                                            <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                                        )}
                                    </div>

                                    <div className={`handwritten-label label-${index}`}>
                                        <span className="label-text">{photo.label}</span>
                                        <svg className="handdrawn-arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M 20 20 Q 50 80 80 50" fill="transparent" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                            <path d="M 70 40 L 80 50 L 70 60" fill="transparent" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
            <Footer />

            <style jsx>{`


                /* ── Collage Section ── */
                .collage-section {
                    position: relative;
                    width: 100%;
                    background: #050816;
                    overflow: hidden;
                    padding: 80px 0 150px;
                }

                .collage-container {
                    position: relative;
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    min-height: 120vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                /* ── Center Card ── */
                :global(.center-card) {
                    position: relative;
                    z-index: 50;
                    width: 90%;
                    max-width: 460px;
                    background: rgba(10, 15, 35, 0.3);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(59, 130, 246, 0.4);
                    border-radius: 28px;
                    padding: 50px 40px;
                    text-align: center;
                    box-shadow: 0 0 50px rgba(59, 130, 246, 0.15), inset 0 0 20px rgba(59, 130, 246, 0.1);
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
                }

                :global(.center-card:hover) {
                    transform: scale(1.03) !important;
                    box-shadow: 0 0 80px rgba(59, 130, 246, 0.25), inset 0 0 30px rgba(59, 130, 246, 0.15);
                    border-color: rgba(59, 130, 246, 0.6);
                }

                .center-card-header {
                    font-family: var(--font-inter);
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    color: rgba(255,255,255,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 30px;
                }

                .center-card-title {
                    font-family: var(--font-inter);
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: #fff;
                    line-height: 1.1;
                    margin-bottom: 8px;
                    letter-spacing: -0.02em;
                }

                .center-card-subtitle {
                    font-family: var(--font-playfair), serif;
                    font-style: italic;
                    font-size: 1.6rem;
                    color: #60a5fa;
                    margin-bottom: 35px;
                }

                .center-card-text {
                    font-family: var(--font-inter);
                    font-size: 1rem;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.75);
                    margin-bottom: 30px;
                }
                
                .center-card-icon {
                    color: rgba(255,255,255,0.4);
                    transition: color 0.3s ease;
                }
                
                :global(.center-card:hover) .center-card-icon {
                    color: #60a5fa;
                }

                /* ── Floating Photos ── */
                :global(.collage-photo-wrapper) {
                    position: absolute;
                    width: clamp(280px, 28vw, 460px);
                    aspect-ratio: 4/3;
                }

                .collage-photo {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 2px solid rgba(59, 130, 246, 0.3);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(59, 130, 246, 0.1);
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease, border-color 0.5s ease;
                    transform-origin: center;
                }

                :global(.collage-photo-wrapper:hover) .collage-photo {
                    transform: scale(1.05) rotate(0deg) !important;
                    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
                    border-color: rgba(59, 130, 246, 0.7);
                }
                
                :global(.collage-photo-wrapper:hover) {
                    z-index: 100 !important;
                }

                .handwritten-label {
                    position: absolute;
                    font-family: var(--font-passions-conflict), cursive;
                    font-size: 3.2rem;
                    color: #60a5fa;
                    pointer-events: none;
                    text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                }
                
                .handdrawn-arrow {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    color: #60a5fa;
                    filter: drop-shadow(0 2px 5px rgba(59, 130, 246, 0.3));
                }

                /* Specific label positioning */
                .label-0 { bottom: 105%; right: 45%; }
                .label-0 .handdrawn-arrow { transform: scaleX(-1) rotate(-20deg); top: 80%; right: 5%; }

                .label-1 { bottom: 105%; left: 45%; }
                .label-1 .handdrawn-arrow { transform: rotate(10deg); top: 80%; left: 5%; }

                .label-2 { top: 105%; right: 25%; }
                .label-2 .handdrawn-arrow { transform: scaleY(-1) scaleX(-1) rotate(-10deg); bottom: 70%; right: -15%; }

                .label-3 { top: 105%; left: 35%; }
                .label-3 .handdrawn-arrow { transform: scaleY(-1) rotate(10deg); bottom: 70%; left: -15%; }

                /* Floating animations */
                @keyframes float-0 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                @keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                @keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
                @keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }

                :global(.float-anim-0) { animation: float-0 6s ease-in-out infinite; }
                :global(.float-anim-1) { animation: float-1 7s ease-in-out infinite 1s; }
                :global(.float-anim-2) { animation: float-2 5.5s ease-in-out infinite 0.5s; }
                :global(.float-anim-3) { animation: float-3 8s ease-in-out infinite 1.5s; }

                /* Pause float on hover so it doesn't jump */
                :global(.collage-photo-wrapper:hover) {
                    animation-play-state: paused;
                }
                
                @media (max-width: 1024px) {
                    .collage-container {
                        min-height: 150vh;
                    }
                    :global(.collage-photo-wrapper) {
                        width: clamp(200px, 30vw, 300px);
                    }
                }
                
                @media (max-width: 768px) {
                    .hero-section { height: 100svh; min-height: 100svh; }
                    
                    .collage-section { padding: 40px 0 100px; }
                    .collage-container {
                        display: flex;
                        flex-direction: column;
                        min-height: auto;
                        padding: 20px;
                        gap: 80px;
                    }
                    
                    :global(.center-card) {
                        position: relative;
                        order: -1; 
                        width: 100%;
                        max-width: 100%;
                        padding: 40px 20px;
                    }
                    
                    :global(.collage-photo-wrapper) {
                        position: relative;
                        top: auto !important;
                        bottom: auto !important;
                        left: auto !important;
                        right: auto !important;
                        width: 90%;
                        max-width: 400px;
                        margin: 0 auto;
                        animation: none;
                    }
                    
                    .handwritten-label {
                        position: relative;
                        top: auto !important;
                        bottom: auto !important;
                        left: auto !important;
                        right: auto !important;
                        margin-top: 15px;
                        justify-content: center;
                        font-size: 2.5rem;
                    }
                    
                    .handdrawn-arrow {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default HackathonsPage;

