"use client";
import React from 'react';
import styles from './support.module.scss';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from '../../../components/Tenantlayout/Layout';

const SupportPage = () => {
  const contactMethods = [
    {
      icon: <FaWhatsapp className={styles.icon} />,
      title: "WhatsApp",
      description: "Instant messaging support",
      action: () => window.open('https://wa.me/message/LBRBV4RR6OWSI1', '_blank'),
      label: "Chat Now",
      accentColor: "#25D366" // WhatsApp green
    },
    {
      icon: <FaEnvelope className={styles.icon} />,
      title: "Email",
      description: "Response within 24 hours",
      action: () => window.location.href = 'mailto:hello@forems.africa',
      label: "hello@forems.africa",
      accentColor: "#EA4335" // Gmail red
    },
    {
      icon: <FaPhoneAlt className={styles.icon} />,
      title: "Call Us",
      description: "9AM–5PM, Monday to Friday",
      action: () => window.location.href = 'tel:08094793447',
      label: "080 9479 3447",
      accentColor: "#2563EB" // Blue
    }
  ];

  return (
    <Layout>
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.hero}
      >
        <div className={styles.iconCircle}>
          <FaHeadset className={styles.heroIcon} />
        </div>
        <h1>How Can We Help?</h1>
        <p>Reach out via your preferred channel</p>
      </motion.div>

      <div className={styles.cardsContainer}>
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={styles.card}
            onClick={method.action}
            style={{ "--accent-color": method.accentColor }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                {method.icon}
              </div>
              <h3>{method.title}</h3>
            </div>
            <p className={styles.description}>{method.description}</p>
            <div className={styles.cta}>
              {method.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default SupportPage;