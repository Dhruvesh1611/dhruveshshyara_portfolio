'use client';
import { motion } from 'framer-motion';
import './YouTubeEmbed.css';

export default function YouTubeEmbed({ videoId, title = "Project Explanation" }) {
    if (!videoId) return null;

    return (
        <motion.div
            className="youtube-embed-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="youtube-wrapper">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </motion.div>
    );
}
