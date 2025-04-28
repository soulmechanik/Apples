"use client";
import React from 'react';
import styles from './Notifications.module.scss';
import { FaBell, FaEnvelope, FaTools, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from '../../../components/Tenantlayout/Layout';

const NotificationsPage = () => {
  return (
    <Layout>
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <div className={styles.iconCircle}>
          <FaBell className={styles.headerIcon} />
        </div>
        <h1>Your Notifications</h1>
        <p>Stay updated with important alerts</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={styles.noticeCard}
      >
        <div className={styles.noticeIcon}>
          <FaEnvelope />
        </div>
        <div className={styles.noticeContent}>
          <h3>Email Notifications Active</h3>
          <p>
            We're currently using email for all notifications. 
            Please check your inbox (and spam folder) for important updates.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={styles.upgradeCard}
      >
        <div className={styles.upgradeIcon}>
          <FaTools />
        </div>
        <div className={styles.upgradeContent}>
          <h3>Exciting Upgrade Coming!</h3>
          <p>
            We're building an advanced notification system as part of next month's 
            platform update. You'll get real-time alerts without relying on email.
          </p>
          <div className={styles.comingSoon}>
            <FaCalendarAlt />
            <span>Launching next month</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className={styles.actionCard}
      >
        <h3>Think you missed something?</h3>
        <p>All your notifications are sent to your registered email address</p>
       
      </motion.div>
    </div>
    </Layout>
  );
};

export default NotificationsPage;