'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { allProjects } from '@/data/projectsData';

const featuredProjects = allProjects.slice(0, 4);

const ProjectTextSection = ({ project, setActiveProject, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-45% 0px -45% 0px"
    });

    useEffect(() => {
        if (isInView) {
            setActiveProject(project);
        }
    }, [isInView, project, setActiveProject]);

    return (
        <div ref={ref} className="project-text-section">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <span className="project-number">0{project.id}</span>
                <h2 className="project-title-display">{project.title}</h2>
                <p className="project-desc-display">{project.description}</p>
                <div className="project-tags-flex">
                    {project.tags.map((tag) => (
                        <span key={tag} className="project-tag-item">{tag}</span>
                    ))}
                </div>
                {isLast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginTop: '50px' }}
                    >
                        <Link href="/projects" className="view-more-btn">
                            View All Projects →
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const [activeProject, setActiveProject] = useState(featuredProjects[0]);

    return (
        <section className="projects-scrolly-container" id="projects">
            <div className="projects-header-wrapper">
                <motion.h1
                    className="projects-main-heading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    WORKS
                </motion.h1>
            </div>

            <div className="scrolly-layout">
                {/* Left: Project Texts */}
                <div className="scrolly-left-content">
                    {featuredProjects.map((project, index) => (
                        <ProjectTextSection
                            key={project.id}
                            project={project}
                            setActiveProject={setActiveProject}
                            isLast={index === featuredProjects.length - 1}
                        />
                    ))}
                </div>

                {/* Right: Sticky Visual */}
                <div className="scrolly-right-visual">
                    <div className="sticky-image-fixed">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotate: -2 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="sticky-image-container"
                            >
                                <Link href={`/projects/${activeProject.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                    <div className="project-image-box">
                                        <Image
                                            src={activeProject.image}
                                            alt={activeProject.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: 'cover' }}
                                            className="project-display-img"
                                            onError={(e) => {
                                                e.target.src = '/projects/yaritu.png';
                                            }}
                                        />
                                        <div className="project-hover-overlay">
                                            <div className="hover-content">
                                                <span className="hover-text">CLICK FOR MORE DESCRIPTION & DETAILS</span>
                                                <span className="hover-arrow">→</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image-overlay-glow"></div>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;