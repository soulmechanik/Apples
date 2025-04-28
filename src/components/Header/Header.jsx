"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Close, ArrowRight } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import logoImage from '../../../public/logofinal.png'

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Foremspay', path: '/foremspay' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blogs', path: '/blogs' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Animated Logo */}
        <motion.div 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Link href="/" className={styles.logo}>
    <span className={styles.logoIcon}>
      <Image
        src={logoImage}
        alt="Forems logo"
        width={240} // Adjusted for balance
        height={50} // Scaled proportionally
        className="rounded-xl"
      />
    </span>
  </Link>
</motion.div>


        {/* Desktop Navigation with Hover Effects */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <motion.li 
                key={item.path}
                className={styles.navItem}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={item.path} 
                  className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.linkText}>{item.name}</span>
                  <AnimatePresence>
                    {hoveredItem === index && (
                      <motion.span 
                        className={styles.hoverIndicator}
                        layoutId="navHover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.ctaContainer}
        >
          <Link href="/demo" className={styles.ctaButton}>
            Get Demo <ArrowRight className={styles.ctaIcon} />
          </Link>
        </motion.div>

        {/* Mobile Menu Button with Animation */}
        <motion.button 
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <Close className={styles.menuIcon} />
          ) : (
            <Menu className={styles.menuIcon} />
          )}
        </motion.button>

        {/* Mobile Navigation with Full-screen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                className={styles.mobileOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div 
                className={styles.mobileNav}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className={styles.mobileNavHeader}>
                  <Link href="/" className={styles.mobileLogo} onClick={() => setIsOpen(false)}>
                    Forems<span>Inc</span>
                  </Link>
                </div>
                
                <ul className={styles.mobileNavList}>
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.path}
                      className={styles.mobileNavItem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link 
                        href={item.path} 
                        className={`${styles.mobileNavLink} ${pathname === item.path ? styles.active : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className={styles.mobileLinkText}>{item.name}</span>
                        {pathname === item.path && (
                          <motion.span 
                            className={styles.mobileActiveIndicator}
                            layoutId="mobileActive"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <div className={styles.mobileCta}>
                  <Link href="/demo" className={styles.mobileCtaButton} onClick={() => setIsOpen(false)}>
                    Get Started <ArrowRight className={styles.mobileCtaIcon} />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;