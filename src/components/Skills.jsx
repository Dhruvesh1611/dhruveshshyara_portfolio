'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import skillsData from '@/data/skills.json';
import { isValidImageSrc } from '@/lib/imageUtils';

const Skills = () => {
    const skills = [...skillsData].sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <section className="skills-section-container" id="skills">
            <div className="skills-section">
                <div className="section-heading">
                    <motion.h1
                        className="projects-main-heading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                        tabIndex={0}
                        aria-label="skills heading"
                    >
                        SKILLS
                    </motion.h1>
                    <p className="sectionHeadingP"></p>
                </div>

                <div className="frontend-dev-section">
                    <motion.h3
                        className="frontend-dev-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        tabIndex={0}
                        aria-label="As a frontend a developer these are the skills i have"
                    >
                        Technical Skills
                    </motion.h3>

                    <ul className="tech-stack-wrapper">
                        {skills.map((skill, index) => (
                            <motion.li
                                key={skill.name}
                                className="tech-stack-box"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {isValidImageSrc(skill.icon) ? (
                                    <Image
                                        src={skill.icon}
                                        alt={skill.name}
                                        width={50}
                                        height={50}
                                        className={`tech-stack-logo ${skill.invert ? 'needtobeinvert' : ''}`}
                                    />
                                ) : (
                                    <div
                                        className="tech-stack-logo"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'rgba(99, 102, 241, 0.15)',
                                            borderRadius: '12px',
                                            color: '#a78bfa',
                                            fontWeight: 700,
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {skill.name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                )}
                                <span className="tooltip">{skill.name}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Skills;
