'use client';
import { FiHeadphones, FiMessageSquare, FiClock, FiZap, FiShield, FiLifeBuoy } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './help.module.scss';
import Layout from '@/components/layout/layout';

export default function HelpPage() {
  const supportFeatures = [
    {
      icon: <FiZap className={styles.featureIcon} />,
      title: "Instant Response",
      description: "Average reply time under 3 minutes via WhatsApp"
    },
    {
      icon: <FiClock className={styles.featureIcon} />,
      title: "24/7 Availability",
      description: "Real human support anytime, day or night"
    },
    {
      icon: <FiShield className={styles.featureIcon} />,
      title: "Priority Assistance",
      description: "Landlords get bumped to the front of the queue"
    }
  ];

  const helpTopics = [
    "Maintenance request emergencies",
    "Tenant management issues",
    "Payment processing help",
    "Property listing optimization",
    "Document verification",
    "System troubleshooting"
  ];

  return (
    <Layout>
    <div className={styles.helpContainer}>
      {/* Hero Section */}
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       <div className={styles.heroContent}>
  <FiHeadphones className={styles.heroIcon} />
  <h1>We're Here For You <span className={styles.highlight}>24/7</span></h1>
  <p>
    FOREMS support team is always on standby to resolve your issues. 
    Get WhatsApp replies in under 3 minutes, anytime you need help.
  </p>
  <motion.a
    href="https://wa.me/message/LBRBV4RR6OWSI1"
    className={styles.ctaButton}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <FiMessageSquare />
    Chat Now on WhatsApp
  </motion.a>
</div>
      </motion.section>

      {/* Features Grid */}
      <section className={styles.features}>
        {supportFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Help Topics */}
      <section className={styles.topics}>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          How We Can Help
        </motion.h2>
        <div className={styles.topicGrid}>
          {helpTopics.map((topic, index) => (
            <motion.div
              key={topic}
              className={styles.topicItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.05) }}
            >
              <FiLifeBuoy className={styles.topicIcon} />
              <span>{topic}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency Banner */}
      <motion.section
        className={styles.emergency}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className={styles.emergencyContent}>
          <h3>Urgent Issue?</h3>
          <p>Call our emergency hotline for immediate assistance</p>
          <a href="tel:+2348094793447" className={styles.emergencyButton}>
            Call Now: 08094793447
          </a>
        </div>
      </motion.section>
    </div>
    </Layout>
  );
}