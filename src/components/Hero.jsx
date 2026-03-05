'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
    const nameFirst = "DHRUVESH";
    const nameLast = "SHYARA.";
    const greeting = "Namaste(); I'm";

    const letterAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.03 },
        }),
    };

    const handleResumeClick = () => {
        window.open('https://drive.google.com/file/d/1TCuMvk8GpC6dyOXG2l4mPnnNzuXmkBac/view', '_blank');
    };

    return (
        <section className="landing-page-container" id="home">
            <div className="blob"></div>

            <div className="text-content">
                <motion.article
                    id="hello-friend"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {greeting.split('').map((char, i) => (
                        <motion.p
                            key={i}
                            className="jello"
                            custom={i}
                            variants={letterAnimation}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ color: '#03e6ff', scale: 1.1 }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.p>
                    ))}
                </motion.article>

                <motion.article
                    id="name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {nameFirst.split('').map((char, i) => (
                        <motion.p
                            key={i}
                            className="jello"
                            whileHover={{ color: '#03e6ff', scale: 1.1 }}
                        >
                            {char}
                        </motion.p>
                    ))}
                    &nbsp;
                    {nameLast.split('').map((char, i) => (
                        <motion.p
                            key={i + nameFirst.length}
                            className="jello"
                            whileHover={{ color: '#03e6ff', scale: 1.1 }}
                        >
                            {char}
                        </motion.p>
                    ))}
                </motion.article>

                <motion.article
                    id="work"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div>
                        <p className="jello">I</p>
                    </div>
                    <div>
                        {'design'.split('').map((c, i) => (
                            <p key={i} className="jello">{c}</p>
                        ))}
                    </div>
                    <div>
                        <p className="jello">&</p>
                    </div>
                    <div>
                        {'code'.split('').map((c, i) => (
                            <p key={i} className="jello">{c}</p>
                        ))}
                    </div>
                    <div>
                        {'for'.split('').map((c, i) => (
                            <p key={i} className="jello">{c}</p>
                        ))}
                    </div>
                    <div>
                        {'web.'.split('').map((c, i) => (
                            <p key={i} className="jello">{c}</p>
                        ))}
                    </div>
                </motion.article>

                <motion.p
                    id="info-para"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Full Stack Developer (MERN) with a passion for building scalable web apps and modern UIs.
                    <br /><br />
                    I value clean code, robust backend, and seamless user experience.
                </motion.p>

                <motion.div
                    className="contact-btn-div"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <button className="letsTalkBtn" onClick={handleResumeClick}>
                        <p className="letsTalkBtn-text">Resume</p>
                        <span className="letsTalkBtn-BG"></span>
                    </button>
                </motion.div>
            </div>

            <motion.div
                className="home-avatar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Image
                    src="/png/nav-avatar.png"
                    alt="Dhruvesh Home Avatar"
                    width={400}
                    height={400}
                    style={{
                        borderRadius: '50%',
                        boxShadow: '0 4px 32px #3a8bfd88',
                        objectFit: 'cover',
                        background: '#000',
                    }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
