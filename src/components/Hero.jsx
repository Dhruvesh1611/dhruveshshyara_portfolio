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

            {/* ─── Main Heading ─── */}
            <motion.div
                className="hero-heading-wrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="hero-heading">
                    <span className="hero-heading-line">Transforming Ideas Into</span>
                    <span className="hero-heading-line">
                        Stunning <span className="hero-heading-accent">Web</span> Experiences
                    </span>
                </h1>
            </motion.div>

            {/* ─── Profile Image with Rings ─── */}
            <motion.div
                className="hero-photo-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Centered glow behind image */}
                <div className="hero-photo-glow" />

                {/* Concentric rings — perfectly centered */}
                <div className="hero-ring hero-ring--outer" />
                <div className="hero-ring hero-ring--inner" />

                {/* Profile photo */}
                <div className="hero-photo-wrapper">
                    <Image
                        src="/png/dhruvesh-professional.png"
                        alt="Dhruvesh Shyara"
                        width={750}
                        height={900}
                        priority
                        className="hero-photo"
                    />
                </div>

                {/* Bottom cinematic fade */}
                <div className="hero-photo-fade" />
            </motion.div>
        </section>
    );
};

export default Hero;
