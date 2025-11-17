"use client";

import { useState } from "react";
import styles from "./Header.module.css";
import '../../app/globals.css';
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.siteHeader}>
            <div className={`container ${styles.headerContainer}`}>
                <Link href="/" className={styles.logoLink} onClick={closeMenu}>
                    <img 
                        src="https://www.nummerplade.net/images/logo-nummerplade-net.png" 
                        alt="Nummerplade.net Logo" 
                        className={styles.logo} 
                    />
                </Link>
                
                <button 
                    className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <ul className={styles.navList}>
                         
                        <li><Link href="#" onClick={closeMenu}>Om Os</Link></li>
                        <li><Link href="#" onClick={closeMenu}>Kontakt</Link></li>
                    </ul>
                </nav>
                
                {isMenuOpen && (
                    <div 
                        className={styles.overlay} 
                        onClick={closeMenu}
                    ></div>
                )}
            </div>
        </header>
    );
}