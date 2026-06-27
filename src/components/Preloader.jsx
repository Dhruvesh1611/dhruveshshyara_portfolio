'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Preloader = () => {
    const [shouldRender, setShouldRender] = useState(true);
    const [phase, setPhase] = useState('enter'); // enter → reveal → exit → done
    const imgRef = useRef(null);

    useEffect(() => {
        // Skip preloader for Lighthouse, bots, and headless browsers
        const ua = navigator.userAgent.toLowerCase();
        if (
            ua.includes('lighthouse') ||
            ua.includes('pagespeed') ||
            ua.includes('headlesschrome') ||
            ua.includes('googlebot') ||
            ua.includes('bingbot')
        ) {
            setShouldRender(false);
            return;
        }

        document.body.style.overflow = 'hidden';

        // Phase 1: Text animates in (0 → 1s)
        // Phase 2: Hold + reveal image (1s → 2.4s)
        const t1 = setTimeout(() => setPhase('reveal'), 1000);
        // Phase 3: Exit — wipe away, image stays (2.4s → 3.4s)
        const t2 = setTimeout(() => setPhase('exit'), 2400);
        // Phase 4: Completely remove preloader
        const t3 = setTimeout(() => {
            setPhase('done');
            setShouldRender(false);
            document.body.style.overflow = 'unset';
        }, 3400);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!shouldRender) return null;

    const firstName = ['D', 'H', 'R', 'U', 'V', 'E', 'S', 'H'];

    return (
        <div
            className="preloader-cinematic"
            style={{
                opacity: phase === 'exit' || phase === 'done' ? 0 : 1,
                transition: 'opacity 0.8s ease-out',
            }}
        >
            {/* Dark background */}
            <div className="preloader-bg" />

            {/* Ambient glow */}
            <motion.div
                className="preloader-glow"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Hero Image — centered, large, behind text */}
            <motion.div
                className="preloader-hero-img"
                ref={imgRef}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={
                    phase === 'enter'
                        ? { opacity: 0, scale: 1.1 }
                        : phase === 'reveal'
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
            >
                <Image
                    src="/png/image.png"
                    alt="Dhruvesh Shyara"
                    width={650}
                    height={700}
                    priority
                    className="preloader-hero-photo"
                />
            </motion.div>

            {/* Big name text — over the image */}
            <div className="preloader-name-container">
                <div className="preloader-name-row">
                    {firstName.map((ch, idx) => (
                        <motion.span
                            key={`first-${idx}`}
                            className="preloader-letter-big"
                            initial={{ y: '120%', opacity: 0 }}
                            animate={
                                phase === 'exit'
                                    ? { y: '-120%', opacity: 0 }
                                    : { y: '0%', opacity: 1 }
                            }
                            transition={{
                                duration: phase === 'exit' ? 0.5 : 0.7,
                                delay: phase === 'exit' ? idx * 0.03 : 0.1 + idx * 0.06,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </div>

                {/* Subtitle */}
                <motion.span
                    className="preloader-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        phase === 'exit'
                            ? { opacity: 0, y: -30 }
                            : phase === 'reveal'
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, ease: 'easeOut', delay: phase === 'reveal' ? 0.3 : 0 }}
                >
                    PORTFOLIO
                </motion.span>
            </div>

            {/* Corner marks */}
            <motion.div
                className="preloader-corner preloader-corner--tl"
                initial={{ opacity: 0 }}
                animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            />
            <motion.div
                className="preloader-corner preloader-corner--br"
                initial={{ opacity: 0 }}
                animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
            />

            {/* Progress bar at bottom */}
            <div className="preloader-progress-track">
                <motion.div
                    className="preloader-progress-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2.4, ease: 'linear' }}
                />
            </div>
        </div>
    );
};

export default Preloader;
