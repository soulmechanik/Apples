'use client';
import { FiMail, FiBell, FiClock, FiZap, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './notifications.module.scss';
import Layout from '@/components/layout/layout';

export default function NotificationsPage() {
  const features = [
    {
      icon: <FiZap className={styles.featureIcon} />,
      title: "Lightning Fast",
      description: "Real-time notifications when we launch"
    },
    {
      icon: <FiTrendingUp className={styles.featureIcon} />,
      title: "Growth Focused",
      description: "Features designed to scale your business"
    },
    {
      icon: <FiClock className={styles.featureIcon} />,
      title: "24/7 Monitoring",
      description: "Important alerts never missed"
    }
  ];

  return (
    <Layout>
      <div className={styles.notificationsContainer}>
        {/* Hero Section */}
        <motion.section 
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.heroContent}>
            <FiMail className={styles.heroIcon} />
            <h1>Stay <span className={styles.highlight}>Connected</span></h1>
            <p className={styles.subtitle}>
              We are currently using email notifications while we build something extraordinary
            </p>
          </div>
        </motion.section>

        {/* Transition Message */}
        <motion.section
          className={styles.transitionMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.messageContent}>
            <FiClock className={styles.messageIcon} />
            <h2>Next Generation Alerts Coming Next Month</h2>
            <p className={styles.middle}>
              As a fast-growing startup, we're working tirelessly to bring you 
              <strong> integrated in-platform notifications</strong> in our next release. 
              We appreciate your patience as we build this specifically for your needs as landlords.
            </p>
            <div className={styles.promiseGrid}>
              <div className={styles.promiseCard}>
                <div className={styles.promiseNumber}>1</div>
                <h3>Priority Development</h3>
                <p>This feature is at the top of our roadmap</p>
              </div>
              <div className={styles.promiseCard}>
                <div className={styles.promiseNumber}>2</div>
                <h3>Tailored For You</h3>
                <p>Built specifically for property managers</p>
              </div>
              <div className={styles.promiseCard}>
                <div className={styles.promiseNumber}>3</div>
                <h3>Seamless Transition</h3>
                <p>We'll guide you through the new system</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <section className={styles.features}>
          <h2>What to Expect in Our Next Version</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coming Soon Banner */}
        <motion.section
          className={styles.comingSoon}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.comingSoonContent}>
            <FiBell className={styles.bellIcon} />
            <h2>Excited for our new notification system?</h2>
            <p>We'll notify you the moment it's ready!</p>
            <motion.button
              className={styles.notifyButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              We will Keep You Updated
            </motion.button>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}