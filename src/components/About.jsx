'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section className="abt" id="about">
            {/* Big section heading */}
            <div className="abt-section-heading">
                <motion.h1
                    className="projects-main-heading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    ABOUT
                </motion.h1>
            </div>

            {/* Window dots decoration */}
            <div className="abt-dots">
                <span></span><span></span><span></span>
            </div>

            <div className="abt-wrapper">
                {/* ── LEFT COLUMN ── */}
                <div className="abt-left">
                    <motion.div
                        className="abt-label-row"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="abt-label">GET TO KNOW ME</span>
                        <div className="abt-label-line"></div>
                    </motion.div>

                    <motion.h1
                        className="abt-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Hi! I&apos;m <span className="abt-name">Dhruvesh Shyara</span>
                    </motion.h1>

                    <motion.h2
                        className="abt-role"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="abt-code-tag">&lt;/&gt;</span>{' '}
                        Full Stack Developer{' '}
                        <span className="abt-code-tag">(MERN)</span>
                    </motion.h2>

                    <motion.p
                        className="abt-intro"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        With a passion for building scalable web applications<br />
                        and modern user interfaces.
                    </motion.p>

                    {/* ── Info Card ── */}
                    <motion.div
                        className="abt-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                    >
                        <div className="abt-card-row">
                            <div className="abt-card-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/></svg>
                            </div>
                            <span className="abt-card-label">Role</span>
                            <span className="abt-card-sep">|</span>
                            <span className="abt-card-val">Full Stack Developer | MERN Stack Developer</span>
                        </div>
                        <div className="abt-card-row">
                            <div className="abt-card-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </div>
                            <span className="abt-card-label">Email</span>
                            <span className="abt-card-sep">|</span>
                            <span className="abt-card-val">dhruvesh.shyara.cg@gmail.com</span>
                        </div>
                        <div className="abt-card-row">
                            <div className="abt-card-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <span className="abt-card-label">Phone</span>
                            <span className="abt-card-sep">|</span>
                            <span className="abt-card-val">+91-9327595429</span>
                        </div>
                        <div className="abt-card-row">
                            <div className="abt-card-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            </div>
                            <span className="abt-card-label">Links</span>
                            <span className="abt-card-sep">|</span>
                            <span className="abt-card-val">
                                <a href="https://github.com/Dhruvesh1611" target="_blank" rel="noreferrer" className="abt-link">GitHub</a>
                                {' | '}
                                <a href="https://linkedin.com/in/dhruveshshyara" target="_blank" rel="noreferrer" className="abt-link">LinkedIn</a>
                            </span>
                        </div>
                        <div className="abt-card-row">
                            <div className="abt-card-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>
                            </div>
                            <span className="abt-card-label">Education</span>
                            <span className="abt-card-sep">|</span>
                            <span className="abt-card-val">
                                Bachelor of Technology (Rai University)<br />
                                CGPA: 9.4/10
                            </span>
                        </div>
                    </motion.div>

                    <motion.p
                        className="abt-body"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                    >
                        I enjoy working on both frontend and backend, and love to solve
                        real-world problems with code. My main focus is on{' '}
                        <span className="abt-hl">React</span>,{' '}
                        <span className="abt-hl">Next.js</span>,{' '}
                        <span className="abt-hl">Node.js</span>, and{' '}
                        <span className="abt-hl">MongoDB</span>.
                    </motion.p>

                    <motion.p
                        className="abt-body abt-body--last"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Always eager to learn new technologies and contribute to open source.
                    </motion.p>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="abt-right">
                    {/* Quote */}
                    <motion.div
                        className="abt-quote"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        <div className="abt-quote-mark">❝</div>
                        <p className="abt-quote-text">
                            Code is not just<br />
                            what I write,<br />
                            it&apos;s how I think.
                        </p>
                        <div className="abt-quote-line"></div>
                        <div className="abt-quote-dot"></div>
                    </motion.div>

                    {/* Photo */}
                    <motion.div
                        className="abt-photo-wrap"
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Image
                            src="/png/image1.png"
                            alt="Dhruvesh Shyara"
                            width={600}
                            height={800}
                            className="abt-photo"
                        />
                        <div className="abt-photo-fade"></div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="abt-stats"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        <div className="abt-stat">
                            <div className="abt-stat-top">
                                <span className="abt-stat-icon">&lt;/&gt;</span>
                                <span className="abt-stat-num">2+</span>
                            </div>
                            <span className="abt-stat-label">Years Coding</span>
                        </div>
                        <div className="abt-stat">
                            <div className="abt-stat-top">
                                <span className="abt-stat-icon">🚀</span>
                                <span className="abt-stat-num">10+</span>
                            </div>
                            <span className="abt-stat-label">Projects</span>
                        </div>
                        <div className="abt-stat">
                            <div className="abt-stat-top">
                                <span className="abt-stat-icon">🏆</span>
                                <span className="abt-stat-num">5+</span>
                            </div>
                            <span className="abt-stat-label">Technologies</span>
                        </div>
                        <div className="abt-stat">
                            <div className="abt-stat-top">
                                <span className="abt-stat-icon">👤</span>
                                <span className="abt-stat-num">100%</span>
                            </div>
                            <span className="abt-stat-label">Dedication</span>
                        </div>
                    </motion.div>

                    <motion.a
                        href="#projects"
                        className="abt-cta"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        style={{ marginTop: '20px' }}
                    >
                        View My Work <span className="abt-cta-arrow">↗</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default About;
