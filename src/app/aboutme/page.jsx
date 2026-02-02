'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

// Semester-wise journey data
const journeyData = [
    {
        id: 1,
        semester: '1st Semester',
        period: 'Aug 2021 - Dec 2021',
        highlights: ['C Programming Basics', 'Introduction to Algorithms', 'Mathematics Foundation'],
        description: 'Started my B.Tech journey with the fundamentals. Learned C programming from scratch, understood basic data structures like arrays and loops, and built a strong foundation in engineering mathematics. Created my first "Hello World" program and felt the excitement of coding.',
        image: '/png/clogo.png',
    },
    {
        id: 2,
        semester: '2nd Semester',
        period: 'Jan 2022 - May 2022',
        highlights: ['C++ & OOP Concepts', 'Data Structures', 'Problem Solving'],
        description: 'Transitioned to Object-Oriented Programming with C++. Mastered concepts like classes, inheritance, and polymorphism. Started solving problems on coding platforms and developed logical thinking skills.',
        image: '/png/cpplogo.png',
    },
    {
        id: 3,
        semester: '3rd Semester',
        period: 'Aug 2022 - Dec 2022',
        highlights: ['HTML, CSS, JavaScript', 'Frontend Basics', 'Git & GitHub'],
        description: 'Discovered web development! Built my first websites using HTML and CSS, then added interactivity with JavaScript. Learned version control with Git and started contributing to open source.',
        image: '/png/htmllogo.png',
    },
    {
        id: 4,
        semester: '4th Semester',
        period: 'Jan 2023 - May 2023',
        highlights: ['React.js', 'Node.js Basics', 'REST APIs'],
        description: 'Dived into modern frameworks. Built dynamic single-page applications with React, understood component-based architecture, and created my first backend API with Node.js and Express.',
        image: '/png/reactlogo.png',
    },
];

// Education data
const educationData = [
    {
        id: 1,
        degree: '10th Standard',
        school: 'Nutan Vidhyapith,Mahuva',
        year: '2019',
        percentage: '96 pr',
        board: 'GSEB',
        image: '/png/10th-education.jpg',
    },
    {
        id: 2,
        degree: '12th Standard (Science)',
        school: 'P.P.Savani chaitanya vidhyasankul',
        year: '2021',
        percentage: '71%',
        board: 'GSEB',
        image: '/png/12th-education.jpg',
    },
    {
        id: 3,
        degree: 'B.Tech in Computer Science',
        school: 'Rai University',
        year: '2021 - Present',
        percentage: 'CGPA: 9.4/10',
        board: 'Final Year',
        image: '/png/college-education.jpg',
    },
];

// Single semester full-page component
const SemesterPage = ({ item, setActiveItem, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveItem(item);
        }
    }, [isInView, item, setActiveItem]);

    return (
        <div ref={ref} className="semester-full-page">
            <div className="semester-left">
                <motion.span
                    className="semester-period"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {item.period}
                </motion.span>
                <motion.h2
                    className="semester-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {item.semester}
                </motion.h2>
                <motion.ul
                    className="semester-highlights"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {item.highlights.map((point, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                        >
                            {point}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
            <div className="semester-right">
                <motion.div
                    className="semester-description-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <p>{item.description}</p>
                </motion.div>
            </div>
        </div>
    );
};

const AboutMePage = () => {
    const [activeItem, setActiveItem] = useState(journeyData[0]);
    const [activeEdu, setActiveEdu] = useState(educationData[0]);

    return (
        <>
            <Navbar />
            <div className="bg-decorations">
                <div className="blob blob-2"></div>
            </div>
            <main className="page-container">
                {/* Hero Section */}
                <section className="full-page-hero">
                    <div className="hero-glow"></div>
                    <div className="hero-content">
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            ABOUT ME
                        </motion.h1>
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            GET TO KNOW MORE ABOUT
                        </motion.span>
                        <motion.p
                            className="hero-bottom-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            who i am.
                        </motion.p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="about-intro-section">
                    <div className="intro-content">
                        <motion.span
                            className="intro-label"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            A LITTLE ABOUT ME
                        </motion.span>
                        <motion.h2
                            className="intro-heading"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Nice to meet you. I'm <span className="name-highlight">Dhruvesh</span>
                        </motion.h2>
                        <motion.p
                            className="intro-text"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            I transform complex ideas into high-speed, scalable web products. As an engineering-driven developer, I focus on the entire stack—prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
                        </motion.p>
                        <motion.p
                            className="intro-text"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            My philosophy is simple: build things that last. I help startups and businesses bridge the gap between concept and reality with code that performs.
                        </motion.p>
                    </div>
                    <div className="intro-image">
                        <motion.div
                            className="image-frame"
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/png/dhruvesh-home-avatar2.png"
                                alt="Dhruvesh"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* My Journey Section - Pinned Scrollytelling */}
                <section className="journey-scrolly-container">
                    <div className="journey-sticky-wrapper">
                        <div className="journey-scroll-content">
                            <motion.h2
                                className="section-heading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                MY JOURNEY
                            </motion.h2>

                            <div className="scrolly-grid">
                                {/* Left Side: Semester & Points */}
                                <div className="scrolly-left">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeItem.id}
                                            initial={{ opacity: 0, x: -80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 80 }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                        >
                                            <span className="semester-period">{activeItem.period}</span>
                                            <h3 className="semester-title">{activeItem.semester}</h3>
                                            <ul className="semester-highlights">
                                                {activeItem.highlights.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Sticky Right: Animated Semester Description */}
                                <div className="scrolly-sticky-image">
                                    <div className="sticky-image-fixed">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeItem.id}
                                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                className="sticky-image-container sticky-desc-container"
                                            >
                                                <div className="sticky-desc-box" style={{ border: '2px solid var(--color-light-purple)', background: '#0a0a0a', borderRadius: '24px', width: '620px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', padding: '20px', color: 'var(--color-light-blue)', fontWeight: 500, fontSize: '2.1rem', textAlign: 'center', lineHeight: 1.5 }}>
                                                    {activeItem.description}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Right Side: Detailed Description (REMOVED, only sticky description remains) */}
                            </div>

                            {/* Scroll Down Arrow Indicator */}
                            <div className="journey-indicators">
                                <div className="scroll-down-arrow">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12L16 20L24 12" stroke="#cf59e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Remove the small description at the bottom of the journey section */}

                            {/* Remove the small bottom text (description) under the journey section */}
                        </div>
                    </div>

                    {/* Scroll Triggers (invisible divs to drive the sticky state) */}
                    <div className="scroll-triggers" style={{ position: 'relative', top: '-50vh' }}>
                        {journeyData.map((item) => (
                            <div
                                key={item.id}
                                className="scroll-trigger-segment"
                                ref={(el) => {
                                    if (!el) return;
                                    const observer = new IntersectionObserver(
                                        ([entry]) => {
                                            if (entry.isIntersecting) setActiveItem(item);
                                        },
                                        { threshold: 0.5 }
                                    );
                                    observer.observe(el);
                                }}
                            ></div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="education-scrolly-container">
                    <div className="education-sticky-wrapper">
                        <div className="education-scroll-content">
                            <motion.h2
                                className="section-heading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                EDUCATION
                            </motion.h2>

                            <div className="scrolly-grid">
                                {/* Left Side: Education Details */}
                                <div className="scrolly-left">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeEdu.id}
                                            initial={{ opacity: 0, x: -80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 80 }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                        >
                                            <span className="edu-year">{activeEdu.year}</span>
                                            <h3 className="edu-degree">{activeEdu.degree}</h3>
                                            <h4 className="edu-school">{activeEdu.school}</h4>
                                            <div className="edu-result-badge">
                                                <span className="edu-board">{activeEdu.board}</span>
                                                <span className="edu-percentage">{activeEdu.percentage}</span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Sticky Right: Education Image */}
                                <div className="scrolly-sticky-image">
                                    <div className="sticky-image-fixed">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeEdu.id}
                                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 1.1, rotate: -2 }}
                                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                className="sticky-image-container"
                                            >
                                                <div className="edu-image-frame">
                                                    <Image
                                                        src={activeEdu.image}
                                                        alt={activeEdu.degree}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Scroll Down Arrow Indicator */}
                            <div className="journey-indicators">
                                <div className="scroll-down-arrow">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12L16 20L24 12" stroke="#cf59e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Triggers */}
                    <div className="scroll-triggers">
                        {educationData.map((item) => (
                            <div
                                key={item.id}
                                className="scroll-trigger-segment"
                                ref={(el) => {
                                    if (!el) return;
                                    const observer = new IntersectionObserver(
                                        ([entry]) => {
                                            if (entry.isIntersecting) setActiveEdu(item);
                                        },
                                        { threshold: 0.5 }
                                    );
                                    observer.observe(el);
                                }}
                            ></div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .bg-decorations {
                    position: fixed;
                    inset: 0;
                    z-index: -1;
                    overflow: hidden;
                    pointer-events: none;
                }

                /* Intro Section */
                .about-intro-section {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    padding: 100px 10%;
                    align-items: center;
                }

                .intro-label {
                    font-size: 1.3rem;
                    letter-spacing: 0.3em;
                    color: #888;
                    font-family: var(--font-fira-code);
                    margin-bottom: 20px;
                    display: block;
                }

                .intro-heading {
                    font-size: 5rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 30px;
                }

                .name-highlight {
                    font-family: var(--font-playfair), serif;
                    font-style: italic;
                    background: linear-gradient(135deg, #a855f7, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .intro-text {
                    font-size: 2.1rem;
                    line-height: 2.1;
                    color: #f2f2f2;
                    margin-bottom: 28px;
                }

                .intro-content {
                    font-size: 2rem;
                    color: #f2f2f2;
                }

                @media (max-width: 768px) {
                    .intro-text {
                        font-size: 1.5rem;
                        line-height: 1.7;
                    }
                    .intro-content {
                        font-size: 1.3rem;
                    }
                }

                .intro-image {
                    position: relative;
                    height: 500px;
                }

                .image-frame {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 2px solid rgba(255,255,255,0.1);
                }

                /* Journey Scrollytelling Styles */
                .journey-scrolly-container {
                    position: relative;
                    background: #000;
                }

                .journey-sticky-wrapper {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .journey-scroll-content {
                    width: 100%;
                    padding: 0 10%;
                }

                .section-heading {
                    font-size: 12rem;
                    font-weight: 900;
                    margin-bottom: 80px;
                    letter-spacing: -3px;
                    text-align: center;
                    font-family: var(--font-anton), sans-serif;
                    text-transform: uppercase;
                }

                .scrolly-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 100px;
                    align-items: center;
                }

                .semester-period {
                    font-size: 1.6rem;
                    color: var(--color-light-purple);
                    font-family: var(--font-fira-code);
                    margin-bottom: 15px;
                    display: block;
                }

                .semester-title {
                    font-size: 5rem;
                    font-weight: 900;
                    margin-bottom: 30px;
                }

                .semester-highlights {
                    list-style: none;
                    padding: 0;
                }

                .semester-highlights li {
                    font-size: 1.8rem;
                    color: #ccc;
                    padding: 12px 0;
                    padding-left: 30px;
                    position: relative;
                }

                .semester-highlights li::before {
                    content: '→';
                    position: absolute;
                    left: 0;
                    color: var(--color-light-purple);
                }

                .semester-desc-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 30px;
                    padding: 60px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }

                .semester-desc-card p {
                    font-size: 2rem;
                    line-height: 1.8;
                    color: #aaa;
                    margin: 0;
                }

                .journey-indicators {
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 15px;
                }

                .scroll-down-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: bounceDown 1.5s infinite;
                }
                @keyframes bounceDown {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(12px); }
                }

                .scroll-triggers {
                    position: relative;
                    z-index: 10;
                }

                .scroll-trigger-segment {
                    height: 100vh;
                    pointer-events: none;
                }

                /* Education Section */
                .education-section {
                    padding: 150px 10%;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .education-timeline {
                    max-width: 900px;
                    margin: 80px auto 0;
                    position: relative;
                }

                .education-timeline::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
                }

                .education-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 80px;
                    position: relative;
                }

                .edu-dot {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: var(--color-light-purple);
                    border-radius: 50%;
                    border: 4px solid #000;
                    z-index: 2;
                }

                .edu-content {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    padding: 40px;
                    width: 450px;
                    text-align: center;
                    transition: border-color 0.3s ease;
                }

                .edu-content:hover {
                    border-color: var(--color-light-purple);
                }

                .edu-year {
                    font-size: 1.5rem;
                    color: var(--color-light-purple);
                    font-family: var(--font-fira-code);
                    margin-bottom: 12px;
                    display: block;
                }

                .edu-degree {
                    font-size: 2.6rem;
                    font-weight: 800;
                    margin-bottom: 10px;
                }

                .edu-school {
                    font-size: 1.8rem;
                    color: #fff;
                    margin-bottom: 15px;
                    opacity: 0.8;
                }

                .edu-result {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .edu-board, .edu-percentage {
                    font-size: 1.6rem;
                    color: #888;
                }

                .edu-percentage {
                    color: var(--color-light-purple);
                    font-weight: 700;
                }

                /* Education Scrollytelling */
                .education-scrolly-container {
                    position: relative;
                    background: #000;
                }

                .education-sticky-wrapper {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .education-scroll-content {
                    width: 100%;
                    padding: 0 10%;
                }

                .edu-result-badge {
                    display: inline-flex;
                    gap: 20px;
                    padding: 15px 30px;
                    background: rgba(168, 85, 247, 0.1);
                    border: 1px solid rgba(168, 85, 247, 0.2);
                    border-radius: 100px;
                    margin-top: 20px;
                }

                .edu-image-frame {
                    width: 100%;
                    height: 70%;
                    position: relative;
                    border-radius: 30px;
                    overflow: hidden;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                }

                .education-scrolly-container .scrolly-sticky-image {
                    height: 500px;
                    width: 100%;
                    max-width: 700px;
                }

                .education-scrolly-container .sticky-image-container {
                    width: 100%;
                    height: 100%;
                }

                @media (max-width: 1024px) {
                    .scrolly-grid { gap: 50px; }
                }

                @media (max-width: 768px) {
                    .about-intro-section {
                        grid-template-columns: 1fr;
                        padding: 80px 5%;
                        gap: 40px;
                    }
                    .intro-heading { font-size: 3.5rem; }
                    .intro-image { height: 350px; }
                    .section-heading { font-size: 6rem; letter-spacing: -1px; margin-bottom: 40px; }
                    .scrolly-grid { 
                        grid-template-columns: 1fr; 
                        text-align: center;
                        gap: 40px;
                    }
                    .semester-title { font-size: 3.5rem; }
                    .semester-highlights { display: inline-block; text-align: left; }
                    .semester-desc-card { padding: 30px; }
                    .semester-desc-card p { font-size: 1.6rem; }
                    .education-timeline::before { left: 0; transform: none; }
                    .edu-dot { left: 0; transform: translateX(-50%); }
                    .education-item { justify-content: flex-start; }
                    .edu-content { width: 100%; margin-left: 30px; text-align: left; }
                    
                    /* Improve sticky sections on mobile */
                    .journey-sticky-wrapper,
                    .education-sticky-wrapper {
                        height: auto;
                        min-height: 100vh;
                    }
                    
                    .journey-scroll-content,
                    .education-scroll-content {
                        padding: 40px 5%;
                    }
                    
                    /* Make sticky description box responsive */
                    .sticky-desc-box {
                        width: 100% !important;
                        height: auto !important;
                        min-height: 280px;
                        padding: 30px 20px !important;
                        font-size: 1.8rem !important;
                    }
                    
                    .scrolly-sticky-image {
                        position: relative !important;
                        width: 100% !important;
                    }
                    
                    .sticky-image-fixed {
                        position: relative !important;
                        top: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                    }
                    
                    .edu-image-frame {
                        height: 300px;
                    }
                }
                
                @media (max-width: 500px) {
                    .section-heading {
                        font-size: 4.5rem;
                        margin-bottom: 30px;
                    }
                    
                    .intro-heading {
                        font-size: 2.8rem;
                    }
                    
                    .semester-title {
                        font-size: 2.8rem;
                    }
                    
                    .semester-period,
                    .edu-year {
                        font-size: 1.4rem;
                    }
                    
                    .semester-highlights li {
                        font-size: 1.6rem;
                    }
                    
                    .sticky-desc-box {
                        font-size: 1.6rem !important;
                        padding: 25px 18px !important;
                    }
                    
                    .edu-degree {
                        font-size: 2.2rem;
                    }
                    
                    .edu-school {
                        font-size: 1.6rem;
                    }
                    
                    .edu-image-frame {
                        height: 250px;
                    }
                    
                    .journey-scroll-content,
                    .education-scroll-content {
                        padding: 30px 5%;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutMePage;
