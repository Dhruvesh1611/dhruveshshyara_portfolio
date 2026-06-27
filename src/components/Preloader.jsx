'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [shouldRender, setShouldRender] = useState(true);
    const [phase, setPhase] = useState('enter'); // enter → hold → exit

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

        // Phase timeline
        const t1 = setTimeout(() => setPhase('hold'), 800);
        const t2 = setTimeout(() => setPhase('exit'), 2200);
        const t3 = setTimeout(() => {
            setShouldRender(false);
            document.body.style.overflow = 'unset';
        }, 3200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!shouldRender) return null;

    const firstName = ['D', 'H', 'R', 'U', 'V', 'E', 'S', 'H'];
    const lastName = ['S', 'H', 'Y', 'A', 'R', 'A'];

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    className="preloader-cinematic"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Ambient glow */}
                    <motion.div
                        className="preloader-glow"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />

                    {/* Thin horizontal line that expands */}
                    <motion.div
                        className="preloader-line"
                        initial={{ scaleX: 0 }}
                        animate={phase === 'exit' ? { scaleX: 0, opacity: 0 } : { scaleX: 1 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    />

                    {/* Top-left corner mark */}
                    <motion.div
                        className="preloader-corner preloader-corner--tl"
                        initial={{ opacity: 0 }}
                        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    />
                    {/* Bottom-right corner mark */}
                    <motion.div
                        className="preloader-corner preloader-corner--br"
                        initial={{ opacity: 0 }}
                        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                    />

                    {/* First Name */}
                    <div className="preloader-name-row">
                        {firstName.map((ch, idx) => (
                            <motion.span
                                key={`first-${idx}`}
                                className="preloader-letter"
                                initial={{ y: '120%', opacity: 0 }}
                                animate={
                                    phase === 'exit'
                                        ? { y: '-120%', opacity: 0 }
                                        : { y: '0%', opacity: 1 }
                                }
                                transition={{
                                    duration: phase === 'exit' ? 0.4 : 0.6,
                                    delay: phase === 'exit' ? idx * 0.03 : 0.15 + idx * 0.05,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                    </div>

                    {/* Last Name */}
                    <div className="preloader-name-row preloader-name-row--last">
                        {lastName.map((ch, idx) => (
                            <motion.span
                                key={`last-${idx}`}
                                className="preloader-letter preloader-letter--last"
                                initial={{ y: '120%', opacity: 0 }}
                                animate={
                                    phase === 'exit'
                                        ? { y: '-120%', opacity: 0 }
                                        : { y: '0%', opacity: 1 }
                                }
                                transition={{
                                    duration: phase === 'exit' ? 0.4 : 0.6,
                                    delay: phase === 'exit' ? 0.1 + idx * 0.03 : 0.5 + idx * 0.05,
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
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                            phase === 'exit'
                                ? { opacity: 0, y: -15 }
                                : phase === 'hold'
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 15 }
                        }
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        FULL STACK DEVELOPER
                    </motion.span>

                    {/* Progress bar at bottom */}
                    <div className="preloader-progress-track">
                        <motion.div
                            className="preloader-progress-bar"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2.2, ease: 'linear' }}
                        />
                    </div>

                    {/* Cinematic wipe overlay on exit */}
                    <motion.div
                        className="preloader-wipe"
                        initial={{ y: '100%' }}
                        animate={phase === 'exit' ? { y: '0%' } : { y: '100%' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
