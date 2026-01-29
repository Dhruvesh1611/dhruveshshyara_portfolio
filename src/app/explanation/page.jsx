'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

// Replace these with your actual details or environment variables
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
const CHANNEL_ID = 'UCXiI_tLXSZxwFifSFzvLGgQ'; // Pro-tip: Replace with your actual channel ID

const categories = ['All', 'LeetCode', 'Projects', 'Other'];

const VideoCard = ({ video }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10 }}
            className="video-card-premium"
        >
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                <div className="video-thumbnail-wrapper">
                    <Image
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="video-play-overlay">
                        <div className="play-icon-glow">
                            <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
            <div className="video-card-content">
                <span className="video-date">
                    {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
                <h3 className="video-title">{video.snippet.title}</h3>
                <p className="video-description">{video.snippet.description.substring(0, 100)}...</p>
            </div>
        </motion.div>
    );
};

const ExplanationPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchVideos = async () => {
            if (!API_KEY) {
                console.warn('YouTube API Key not found. Please add NEXT_PUBLIC_YOUTUBE_API_KEY to your environment.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`
                );
                const data = await response.json();
                if (data.items) {
                    setVideos(data.items);
                }
            } catch (error) {
                console.error('Error fetching YouTube videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const filteredVideos = videos.filter((video) => {
        if (activeCategory === 'All') return true;
        const title = video.snippet.title.toLowerCase();
        if (activeCategory === 'LeetCode') return title.includes('leetcode') || title.includes('dsa');
        if (activeCategory === 'Projects') return title.includes('project') || title.includes('tutorial');
        if (activeCategory === 'Other') return !title.includes('leetcode') && !title.includes('project');
        return true;
    });

    return (
        <>
            <Navbar />
            <div className="bg-decorations">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <main className="page-container">
                <section className="full-page-hero">
                    <div className="hero-content">
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            EXPLANATIONS
                        </motion.h1>
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            DEEP DIVES INTO CODE & LOGIC
                        </motion.span>
                        <motion.p
                            className="hero-bottom-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            sharing knowledge, one video at a time.
                        </motion.p>
                    </div>
                </section>

                <section className="explanation-grid-section">
                    <div className="filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="loader-premium"></div>
                            <p>Fetching latest videos...</p>
                        </div>
                    ) : (
                        <div className="video-grid">
                            <AnimatePresence mode='popLayout'>
                                {filteredVideos.length > 0 ? (
                                    filteredVideos.map((video) => (
                                        <VideoCard key={video.id.videoId} video={video} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="no-videos-msg"
                                    >
                                        <p>No videos found for this category.</p>
                                        {!API_KEY && (
                                            <p className="debug-msg">Pro-tip: Add your <code>NEXT_PUBLIC_YOUTUBE_API_KEY</code> to see live videos!</p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </section>
            </main>
            <Footer />


        </>
    );
};

export default ExplanationPage;
