"use client";

import { motion } from 'framer-motion';
import { Notifications, AccountCircle, Search, ExpandMore } from '@mui/icons-material';
import styles from './tenantheader.module.scss';

const TenantHeader = () => {
  return (
    <header className={styles.header}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search properties, documents..."
          className={styles.searchInput}
        />
        <div className={styles.searchBorder}></div>
      </div>

      {/* Right Controls */}
      <div className={styles.controls}>
        {/* Notifications */}
        <motion.div 
          className={styles.notificationBadge}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Notifications className={styles.notificationIcon} />
          <span className={styles.badgeCount}>3</span>
        </motion.div>

        {/* User Profile */}
        <motion.div 
          className={styles.userProfile}
          whileHover={{ backgroundColor: 'rgba(122, 90, 248, 0.1)' }}
        >
          <div className={styles.avatar}>
            <AccountCircle className={styles.avatarIcon} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Sarah Johnson</span>
            <span className={styles.userEmail}>sarah@example.com</span>
          </div>
          <ExpandMore className={styles.dropdownIcon} />
        </motion.div>
      </div>
    </header>
  );
};

export default TenantHeader;