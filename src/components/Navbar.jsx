'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CommandPalette from './CommandPalette';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/aboutme' },
        { name: 'Work', href: '/projects' },
        { name: 'Certificates', href: '/certificates' },
        { name: 'Explanation', href: '/explanation' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    // Cmd+K keyboard shortcut to toggle command palette
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCmdOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <header>
                {/* ── Desktop Floating Pill Navbar ── */}
                <motion.nav
                    className="navbar"
                    id="navbar"
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                >
                    {/* Nav Links */}
                    <div className="nav-links" id="nav-links">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`nav-link ${isActive(item.href) ? 'nav-link--active' : ''}`}
                                aria-label={`${item.name} page`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="nav-divider" />

                    {/* Command Palette Button */}
                    <button
                        className="nav-icon-btn nav-cmd-btn"
                        onClick={() => setCmdOpen(true)}
                        aria-label="Open command palette"
                        title="Links & Search (⌘K)"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </motion.nav>

                {/* ── Hamburger Menu (Mobile) ── */}
                <div className="hamburger" id="hamburger">
                    <div className="hamburgerbase">
                        <button id="hamburger-button" onClick={toggleMenu} tabIndex={0} aria-label="Menu Button">
                            <span className={`burger-bar ${isOpen ? 'hamburger-animation1' : ''}`} id="burger-bar1"></span>
                            <span className={`burger-bar ${isOpen ? 'hamburger-animation2' : ''}`} id="burger-bar2"></span>
                            <span className={`burger-bar ${isOpen ? 'hamburger-animation3' : ''}`} id="burger-bar3"></span>
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                <div className={`mobiletogglemenu ${isOpen ? 'show-toggle-menu' : ''}`} id="mobiletogglemenu">
                    <ul className="mobile-navbar-tabs-ul" id="mobile-ul">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className={`mobile-navbar-tabs-li ${item.name.toLowerCase()} ${isActive(item.href) ? 'activeThismobiletab' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href={item.href} tabIndex={0} aria-label={`${item.name} menu button`}>
                                    {'</'}{item.name}{'>'}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>

            {/* ── Command Palette (Portal-level) ── */}
            <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
        </>
    );
};

export default Navbar;
