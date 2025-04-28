"use client";

import React from 'react';
import styles from './declutter.module.scss';
import { FaBoxOpen, FaRocket, FaShoppingCart, FaHandHoldingUsd, FaRecycle } from 'react-icons/fa';
import Layout from '../../../components/Tenantlayout/Layout';
import { motion } from 'framer-motion';

const DeclutterPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className={styles.hero}
        >
          <div className={styles.heroIcon}>
            <FaBoxOpen />
          </div>
          <h1>Less Clutter. More Life.</h1>
          <p className={styles.heroText}>
            A smart way to sell what you don’t need — and discover affordable gems from people living just around you.
          </p>
          <div className={styles.badge}>
            <FaRocket /> <span>Launching soon on your dashboard</span>
          </div>
        </motion.section>

        {/* Why Declutter Section */}
        <section className={styles.whySection}>
          <h2>Why Declutter?</h2>
          <div className={styles.whyGrid}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className={styles.card}
            >
              <FaShoppingCart className={styles.cardIcon} />
              <h3>Shop Smart</h3>
              <p>Get quality items at amazing prices — directly from people like you.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }} 
              className={styles.card}
            >
              <FaHandHoldingUsd className={styles.cardIcon} />
              <h3>Sell Easily</h3>
              <p>Turn unused stuff into extra cash — quickly, safely, right from your dashboard.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }} 
              className={styles.card}
            >
              <FaRecycle className={styles.cardIcon} />
              <h3>Keep It Sustainable</h3>
              <p>Less waste. More reuse. Decluttering is good for your wallet — and the planet.</p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }} 
          className={styles.ctaSection}
        >
          <h2>Coming Soon to Your Tenant Portal</h2>
          <p className={styles.ctaText}>
            We're making it ridiculously easy to buy & sell within your community. No stress. No strangers from the internet. Just safe, local, affordable deals.
          </p>
          <div className={styles.launchInfo}>
            <FaRocket />
            <span>Rolling out in {new Date().toLocaleString('default', { month: 'long' })}</span>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default DeclutterPage;
