'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Simplified page transition: do a gentle fade-in on navigation
// Avoid using AnimatePresence with "wait" to prevent a temporary blank page
const PageTransition = ({ children }) => {
    const pathname = usePathname();

    // Scroll to top whenever the pathname changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ minHeight: '100vh' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
