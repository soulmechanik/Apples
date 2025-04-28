"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Email, 
  Phone, 
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  ArrowUpward
} from '@mui/icons-material';
import styles from './Footer.module.scss';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      {/* Decorative Top Border */}
      <div className={styles.footerBorder}></div>
      
      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        {/* Footer Grid */}
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <motion.div 
            className={styles.brandColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className={styles.footerLogo}>
              <span className={styles.logoIcon}>✦</span>
              <span className={styles.logoText}>
                <span>Forems</span>
                <span className={styles.logoAccent}>Inc</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Revolutionizing property management with cutting-edge technology and exceptional service.
            </p>
            <div className={styles.socialLinks}>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className={styles.socialLink}
              >
                <Facebook className={styles.socialIcon} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className={styles.socialLink}
              >
                <Twitter className={styles.socialIcon} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className={styles.socialLink}
              >
                <LinkedIn className={styles.socialIcon} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className={styles.socialLink}
              >
                <Instagram className={styles.socialIcon} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className={styles.linksColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/" className={styles.footerLink}>Home</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/about" className={styles.footerLink}>About Us</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/features" className={styles.footerLink}>Features</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/blog" className={styles.footerLink}>Blog</Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div 
            className={styles.linksColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.columnTitle}>Solutions</h3>
            <ul className={styles.linkList}>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/solutions/landlords" className={styles.footerLink}>For Landlords</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/solutions/tenants" className={styles.footerLink}>For Tenants</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/solutions/agents" className={styles.footerLink}>For Agents</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/solutions/developers" className={styles.footerLink}>For Developers</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/solutions/student-housing" className={styles.footerLink}>Student Housing</Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className={styles.contactColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.columnTitle}>Contact Us</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Email className={styles.contactIcon} />
                <a href="mailto:hello@forems.africa" className={styles.contactLink}>
                hello@forems.africa
                </a>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <a href="tel:+2348094793447" className={styles.contactLink}>
                  08094793447
                </a>
              </li>
              <li className={styles.contactItem}>
                <LocationOn className={styles.contactIcon} />
                <span className={styles.contactText}>
                 Lagos, Nigeria 
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div 
          className={styles.newsletter}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.newsletterTitle}>Stay Updated</h3>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter for the latest updates and features.
          </p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={styles.newsletterInput}
              required
            />
            <motion.button 
              type="submit" 
              className={styles.newsletterButton}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Forems. All rights reserved.
        </div>
        <div className={styles.legalLinks}>
          <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
          <Link href="/cookies" className={styles.legalLink}>Cookie Policy</Link>
        </div>
        <motion.button 
          className={styles.backToTop}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUpward className={styles.backToTopIcon} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;