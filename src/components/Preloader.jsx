'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    const [shouldRender, setShouldRender] = useState(true);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        // Always show preloader on every page load (no sessionStorage guard)
        document.body.style.overflow = 'hidden';

        const t1 = setTimeout(() => setAnimateOut(true), 1000);
        const t2 = setTimeout(() => {
            setShouldRender(false);
            document.body.style.overflow = 'unset';
        }, 2000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!shouldRender) return null;

    const letters = ['D', 'H', 'R', 'U', 'V', 'E', 'S', 'H'];

    return (
        <div
            className="preloader"
            style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'all', background: '#000' }}
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                    key={`bar-${i}`}
                    className="preloader-item"
                    style={{ width: '10%', height: '100%', backgroundColor: '#000' }}
                    initial={{ y: 0 }}
                    animate={animateOut ? { y: '100%' } : { y: 0 }}
                    transition={{ delay: animateOut ? i * 0.1 : 0, duration: 0.5 }}
                />
            ))}

            <p className="name-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', overflow: 'hidden', fontSize: '20vw', lineHeight: 1 }}>
                {letters.map((ch, idx) => (
                    <motion.span
                        key={idx}
                        style={{ display: 'inline-block', transform: 'translateY(100%)' }}
                        initial={{ y: '100%' }}
                        animate={animateOut ? { y: 0, opacity: 0 } : { y: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 + idx * 0.05 }}
                    >
                        {ch}
                    </motion.span>
                ))}
            </p>
        </div>
    );
};

export default Preloader;
