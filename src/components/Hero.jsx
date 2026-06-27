'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Hero = () => {
    const canvasRef = useRef(null);

    /* ── Star Particles Canvas ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animId;
        let stars = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initStars();
        };

        const initStars = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            stars = Array.from({ length: 80 }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.3,
                opacity: Math.random() * 0.6 + 0.1,
                speed: Math.random() * 0.0008 + 0.0003,
                phase: Math.random() * Math.PI * 2,
            }));
        };

        const draw = (time) => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            stars.forEach((s) => {
                const flicker = Math.sin(time * s.speed + s.phase) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180, 200, 255, ${s.opacity * flicker})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        resize();
        animId = requestAnimationFrame(draw);
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section className="hero-section" id="home">
            {/* ── Star particles ── */}
            {/* <canvas ref={canvasRef} className="hero-stars-canvas" /> */}

            {/* ── Cosmic nebula / smoke effects ── */}
            <div className="hero-nebula hero-nebula--left" />
            <div className="hero-nebula hero-nebula--right" />
            <div className="hero-nebula hero-nebula--center" />



            {/* ─── Profile Image with Rings ─── */}
            <motion.div
                className="hero-photo-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Centered glow behind image */}
                {/* <div className="hero-photo-glow" /> */}

                {/* Concentric rings — perfectly centered */}
                {/* <div className="hero-ring hero-ring--outer" />
                <div className="hero-ring hero-ring--inner" /> */}

                {/* Profile photo */}
                <div className="hero-photo-wrapper">
                    <Image
                        src="/png/image.png"
                        alt="Dhruvesh Shyara"
                        width={650}
                        height={700}
                        priority
                        className="hero-photo"
                    />
                </div>

                {/* Bottom cinematic fade */}
                {/* <div className="hero-photo-fade" /> */}
            </motion.div>

            {/* ── HTML TEXT OVERLAY (Matches Baked Image Text) ── */}
            <div className="hero-content-overlay">

                {/* ── LEFT SIDE ── */}
                <div className="hero-content-left">
                    <div className="hero-vertical-text">SCROLL TO EXPLORE</div>

                    <motion.p
                        className="hero-eyebrow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        HELLO, I&apos;M
                    </motion.p>

                    <motion.h1
                        className="hero-main-name"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Dhruvesh
                    </motion.h1>

                    <motion.div
                        className="hero-divider"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    />

                    <motion.h2
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        FULL STACK DEVELOPER
                    </motion.h2>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        I craft clean, efficient and<br />
                        impactful digital experiences<br />
                        that solve real-world problems.
                    </motion.p>

                    <motion.a
                        href="#projects"
                        className="hero-view-work"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                    >
                        VIEW MY WORK <span className="arrow">→</span>
                    </motion.a>

                    <motion.div
                        className="hero-quote-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <div className="quote-icon">“</div>
                        <p>
                            Code is not just<br />
                            what I write,<br />
                            it&apos;s how I think.
                        </p>
                    </motion.div>
                </div>

                {/* ── RIGHT SIDE ── */}
                <div className="hero-content-right">

                    <motion.div
                        className="hero-mission"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <span className="star-icon">✦</span>
                        <p>
                            BUILDING DIGITAL<br />
                            EXPERIENCES<br />
                            THAT MATTER.
                        </p>
                    </motion.div>

                    <motion.div
                        className="hero-divider hero-divider--right"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    />

                    <motion.div
                        className="hero-specialties"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <h3 className="specialty-title">SPECIALIZING IN <span>-</span></h3>
                        <ul className="specialty-list">
                            <li><span className="dot">•</span> FRONTEND DEVELOPMENT</li>
                            <li><span className="dot">•</span> BACKEND DEVELOPMENT</li>
                            <li><span className="dot">•</span> UI/UX DESIGN</li>
                            <li><span className="dot">•</span> DATABASE DESIGN</li>
                            <li><span className="dot">•</span> API INTEGRATION</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="hero-divider hero-divider--right"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    />

                    <motion.div
                        className="hero-availability"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <p>
                            AVAILABLE FOR<br />
                            OPPORTUNITIES <span className="status-dot"></span>
                        </p>
                        <div className="hero-signature">Dhruvesh</div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
