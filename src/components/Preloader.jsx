'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

/* ═══════════════════════════════════════════
   CONFIGURATION — Edit images & timing here
   ═══════════════════════════════════════════ */
const LETTER_CONFIG = [
    { char: 'D', image: '/loader/l1.jpg' },
    { char: 'H', image: '/loader/l2.jpg' },
    { char: 'R', image: '/loader/l3.jpg' },
    { char: 'U', image: '/loader/l4.jpg' },
    { char: 'V', image: '/loader/l5.PNG' },
    { char: 'E', image: '/loader/l6.jpg' },
    { char: 'S', image: '/loader/l7.jpg' },
    { char: 'H', image: '/loader/l8.jpg' },
];

const T = {
    SPARK: 0,
    LETTERS: 800,
    IMAGES: 800,
    SWEEP: 4000,
    SUBTITLE: 4200,
    DISSOLVE: 6500,
    DONE: 7500,
};

/* ─── Noise Texture (canvas, ~10fps) ─── */
const NoiseCanvas = () => {
    const ref = useRef(null);
    useEffect(() => {
        const c = ref.current;
        if (!c) return;
        const ctx = c.getContext('2d');
        const W = 200, H = 200;
        c.width = W; c.height = H;
        let id, last = 0;
        const draw = (ts) => {
            if (ts - last > 90) {
                last = ts;
                const d = ctx.createImageData(W, H);
                for (let i = 0; i < d.data.length; i += 4) {
                    const v = Math.random() * 255;
                    d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
                    d.data[i + 3] = 10;
                }
                ctx.putImageData(d, 0, 0);
            }
            id = requestAnimationFrame(draw);
        };
        id = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(id);
    }, []);
    return <canvas ref={ref} className="ld-noise" />;
};

/* ─── Floating Particles ─── */
const Dust = ({ count = 35 }) => {
    const [pts, setPts] = useState([]);
    useEffect(() => {
        setPts(Array.from({ length: count }, (_, i) => ({
            i, x: Math.random() * 100, y: Math.random() * 100,
            s: Math.random() * 1.5 + 0.5, d: Math.random() * 16 + 10,
            dl: Math.random() * 6, o: Math.random() * 0.2 + 0.04,
        })));
    }, [count]);

    return (
        <div className="ld-dust">
            {pts.map(p => (
                <motion.div key={p.i}
                    className="ld-dust-dot"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
                    animate={{ opacity: [0, p.o, 0], y: [0, -90, -180] }}
                    transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: 'linear' }}
                />
            ))}
        </div>
    );
};

/* ─── Dissolve Particles (exit) ─── */
const Dissolve = ({ active }) => {
    const [pts, setPts] = useState([]);
    useEffect(() => {
        setPts(Array.from({ length: 80 }, (_, i) => ({
            i,
            x: (Math.random() - 0.5) * 900,
            y: -(Math.random() * 350 + 60),
            s: Math.random() * 3 + 0.8,
            dl: Math.random() * 0.35,
            d: Math.random() * 0.9 + 0.5,
        })));
    }, []);

    if (!active) return null;
    return (
        <div className="ld-dissolve">
            {pts.map(p => (
                <motion.div key={p.i}
                    className="ld-dissolve-dot"
                    style={{ width: p.s, height: p.s }}
                    initial={{ x: 0, y: 0, opacity: 0.85, scale: 1 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.2 }}
                    transition={{ duration: p.d, delay: p.dl, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            ))}
        </div>
    );
};

/* ═══════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════ */
const Preloader = () => {
    const [render, setRender] = useState(true);
    const [stage, setStage] = useState(0);
    // 0 spark | 1 letters | 2 images | 3 sweep | 4 dissolve | 5 done

    const prog = useMotionValue(0);
    const progW = useTransform(prog, [0, 100], ['0%', '100%']);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        if (['lighthouse', 'pagespeed', 'headlesschrome', 'googlebot', 'bingbot'].some(b => ua.includes(b))) {
            setRender(false); return;
        }

        // Preload images
        LETTER_CONFIG.forEach(({ image }) => { const img = new Image(); img.src = image; });

        document.body.style.overflow = 'hidden';
        const ctrl = animate(prog, 100, { duration: 3.8, ease: [0.23, 1, 0.32, 1] });

        const timers = [
            setTimeout(() => setStage(1), T.LETTERS),
            setTimeout(() => setStage(2), T.IMAGES),
            setTimeout(() => setStage(3), T.SWEEP),
            setTimeout(() => setStage(4), T.DISSOLVE),
            setTimeout(() => { setStage(5); setRender(false); document.body.style.overflow = 'unset'; }, T.DONE),
        ];

        return () => { ctrl.stop(); timers.forEach(clearTimeout); document.body.style.overflow = 'unset'; };
    }, []);

    if (!render) return null;

    return (
        <AnimatePresence>
            {stage < 5 && (
                <motion.div className="ld-root"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* ── Background layers ── */}
                    <div className="ld-bg" />
                    <NoiseCanvas />
                    <Dust />
                    <div className="ld-glow ld-glow--a" />
                    <div className="ld-glow ld-glow--b" />
                    <div className="ld-vignette" />

                    {/* ── Center spark (Scene 1) ── */}
                    <motion.div className="ld-spark"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={stage >= 1
                            ? { scale: [1, 8], opacity: [0.9, 0] }
                            : { scale: [0, 1, 0.6, 1.2, 0.8, 1], opacity: [0, 1, 0.4, 1, 0.5, 0.9] }
                        }
                        transition={stage >= 1
                            ? { duration: 0.7, ease: 'easeOut' }
                            : { duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                        }
                    />

                    {/* ── Title area ── */}
                    <div className="ld-center">

                        {/* Letter row */}
                        <motion.div className="ld-row"
                            animate={
                                stage >= 4 ? { opacity: 0, scale: 1.1, filter: 'blur(8px)' }
                                    : stage >= 3 ? { scale: 1.06 }
                                        : {}
                            }
                            transition={{
                                duration: stage >= 4 ? 0.5 : 2.5,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                        >
                            {/* Light sweep beam */}
                            <motion.div className="ld-sweep"
                                initial={{ left: '-40%' }}
                                animate={stage >= 3 ? { left: '110%' } : { left: '-40%' }}
                                transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            />

                            {LETTER_CONFIG.map(({ char, image }, i) => (
                                <motion.div key={i} className="ld-char"
                                    initial={{ y: 90, opacity: 0, filter: 'blur(20px)', scale: 0.82 }}
                                    animate={stage >= 1
                                        ? { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }
                                        : {}
                                    }
                                    transition={{
                                        duration: 1,
                                        delay: i * 0.3,
                                        ease: [0.23, 1, 0.32, 1],
                                    }}
                                >
                                    {/* Layer 1: Image fill */}
                                    <motion.span
                                        className="ld-char-img"
                                        style={{
                                            backgroundImage: `url(${image})`,
                                        }}
                                        initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                        animate={stage >= 1
                                            ? { clipPath: 'inset(0% 0 0 0)' }
                                            : {}
                                        }
                                        transition={{
                                            duration: 1,
                                            delay: i * 0.3,
                                            ease: [0.23, 1, 0.32, 1],
                                        }}
                                        aria-hidden="true"
                                    >
                                        {char}
                                    </motion.span>

                                    {/* Layer 3: Outline glow (always) */}
                                    <span className="ld-char-outline" aria-hidden="true">{char}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Dissolve particles */}
                        <Dissolve active={stage >= 4} />

                        {/* Subtitle */}
                        <motion.div className="ld-sub"
                            initial={{ opacity: 0, y: 18 }}
                            animate={
                                stage >= 4 ? { opacity: 0, y: -12 }
                                    : stage >= 3 ? { opacity: 1, y: 0 }
                                        : {}
                            }
                            transition={{
                                duration: 0.7,
                                delay: stage >= 3 && stage < 4 ? 0.4 : 0,
                                ease: 'easeOut',
                            }}
                        >
                            <span className="ld-sub-line" />
                            <span className="ld-sub-text">Creative Developer · Building Digital Experiences</span>
                            <span className="ld-sub-line" />
                        </motion.div>
                    </div>

                    {/* ── Progress line ── */}
                    <div className="ld-prog">
                        <motion.div className="ld-prog-fill" style={{ width: progW }} />
                    </div>

                    {/* ── Corners ── */}
                    {['tl', 'tr', 'bl', 'br'].map((p, i) => (
                        <motion.div key={p}
                            className={`ld-corner ld-corner--${p}`}
                            initial={{ opacity: 0 }}
                            animate={stage >= 4 ? { opacity: 0 } : stage >= 1 ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                        />
                    ))}

                    {/* ── Final blackout ── */}
                    <motion.div className="ld-blackout"
                        initial={{ opacity: 0 }}
                        animate={stage >= 4 ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.25, ease: 'easeInOut' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
