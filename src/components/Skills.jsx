'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Skills = () => {
    const skills = [
        { name: 'React.js', icon: '/png/reactlogo.png' },
        { name: 'Next.js', icon: '/png/nextlogo.png' },
        { name: 'HTML5', icon: '/png/htmllogo.png' },
        { name: 'CSS3', icon: '/png/csslogo.png' },
        { name: 'JavaScript (ES6+)', icon: '/png/jslogo.png' },
        { name: 'Node.js', icon: '/png/node.png' },
        { name: 'C', icon: '/png/clogo.png' },
        { name: 'C++', icon: '/png/cpplogo.png' },
        { name: 'Git', icon: '/png/gitlogo.png' },
        { name: 'GitHub', icon: '/png/githublogo.png', invert: true },
        { name: 'UI/UX Design (Figma)', icon: '/png/figmalogo.png' },
        { name: 'Canva', icon: '/png/canvalogo.png' },
    ];

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
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    width={50}
                                    height={50}
                                    className={`tech-stack-logo ${skill.invert ? 'needtobeinvert' : ''}`}
                                />
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
