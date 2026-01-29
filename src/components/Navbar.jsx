'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Portfolio', href: '/' },
        { name: 'AboutMe', href: '/aboutme' },
        { name: 'Projects', href: '/projects' },
        { name: 'Certificates', href: '/certificates' },
        { name: 'Explanation', href: '/explanation' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        if (href.startsWith('/#')) return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header>
            {/* Desktop Navbar */}
            <nav className="navbar" id="navbar">
                <div className="hey">Hey!</div>
                <div className="logo" tabIndex={0} aria-label="dhruvesh shyara logo">
                    <div className="logo-top">
                        <Image src="/png/nav-avatar.png" alt="avatar" width={60} height={60} id="nav-avatar" />
                    </div>
                </div>
                <div className="navbar-tabs" id="navbar-tabs">
                    <ul className="navbar-tabs-ul">
                        {navItems.map((item, index) => (
                            <motion.li
                                key={item.name}
                                className={`${item.name.toLowerCase()} ${isActive(item.href) ? 'activeThistab' : ''}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Link href={item.href} aria-label={`${item.name} menu button`}>
                                    {'</'}{item.name}{'>'}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Hamburger Menu (Mobile) */}
            <div className="hamburger" id="hamburger">
                <div className="hamburgerbase">
                    <button id="hamburger-button" onClick={toggleMenu} tabIndex={0} aria-label="Menu Button">
                        <span className={`burger-bar ${isOpen ? 'hamburger-animation1' : ''}`} id="burger-bar1"></span>
                        <span className={`burger-bar ${isOpen ? 'hamburger-animation2' : ''}`} id="burger-bar2"></span>
                        <span className={`burger-bar ${isOpen ? 'hamburger-animation3' : ''}`} id="burger-bar3"></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
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
    );
};

export default Navbar;
