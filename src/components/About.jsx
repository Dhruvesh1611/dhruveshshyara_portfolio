'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    const handleResumeClick = () => {
        window.open('https://drive.google.com/file/d/1Hk6RZF-T9-8Za_laaa_eo-TO3yBqNonT/view?usp=drive_link', '_blank');
    };

    return (
        <section className="about-section-container" id="about">
            <div className="about-section">
                <div className="section-heading">
                    <motion.h1
                        className="projects-main-heading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        tabIndex={0}
                        aria-label="About me heading"
                    >
                        ABOUT
                    </motion.h1>
                    <p className="sectionHeadingP"></p>
                </div>

                <div className="info-dp-section">
                    <motion.div
                        className="about-info stylish-about-info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p tabIndex={0} className="about-title">
                            Hi! I&apos;m <span className="about-name">Dhruvesh Shyara</span>
                        </p>
                        <p tabIndex={0} className="about-role">
                            Full Stack Developer <span className="about-stack">(MERN)</span>
                        </p>
                        <p tabIndex={0} className="about-desc">
                            With a strong background in building scalable web applications and modern user interfaces.
                        </p>
                        <div className="about-details">
                            <div><b>Role:</b> Full Stack Developer | MERN Stack Developer</div>
                            <div><b>Contact:</b> +91-9327595429 | dhruvesh.shyara.cg@gmail.com</div>
                            <div>
                                <b>Links:</b>{' '}
                                <a href="https://github.com/Dhruvesh1611" target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
                                <a href="https://linkedin.com/in/dhruveshshyara" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </div>
                            <div><b>Education:</b> Bachelor of Technology (Rai University) - CGPA: 9.4/10</div>
                        </div>
                        <p tabIndex={0} className="about-focus">
                            I enjoy working on both frontend and backend, and love to solve real-world problems with code.
                            My main focus is on <span className="about-tech">React, Next.js, Node.js, and MongoDB</span>.
                        </p>
                        <p tabIndex={0} className="about-learn">
                            Always eager to learn new technologies and contribute to open source.
                        </p>

                        <button className="resume-btn" id="resume-btn" onClick={handleResumeClick}>
                            <div className="sign">
                                <svg viewBox="0 0 640 512">
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
                                </svg>
                            </div>
                            <div className="text">Resume</div>
                        </button>
                    </motion.div>

                    <motion.div
                        className="dp"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src="/png/image1.png"
                            alt="Dhruvesh Shyara"
                            width={500}
                            height={700}
                            className="about-avatar-img"
                            tabIndex={0}
                            aria-label="image of Dhruvesh"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
