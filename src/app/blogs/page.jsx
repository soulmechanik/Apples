


// const page = () => {
//   return (
//     <div><Header/> 
    
//     </div>
//   )
// }

// export default page

"use client";

import { motion } from 'framer-motion';
import { Article, LinkedIn, HourglassTop } from '@mui/icons-material';
import styles from './Blog.module.scss';
import Header from "@/components/Header/Header"

const Blog = () => {
  return (
    <>
     <Header/>
    <div className={styles.blogContainer}>
      {/* Particle Background (consistent with hero) */}
      <canvas className={styles.particleCanvas} />
      
      <div className={styles.blogContent}>
        {/* Header Section */}
        <motion.section 
          className={styles.blogHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <Article className={styles.badgeIcon} />
            <span>Knowledge Hub</span>
          </div>
          
          <h1 className={styles.title}>
            <span>Our </span>
            <span className={styles.highlight}>Insights</span>
            <span> Are Brewing</span>
          </h1>
          
          <p className={styles.subtitle}>
            We're curating valuable content to help you navigate the property tech landscape.
            Our first articles are currently in production.
          </p>
        </motion.section>

        {/* Coming Soon Section */}
        <section className={styles.comingSoonSection}>
          <div className={styles.comingSoonCard}>
            <div className={styles.comingSoonVisual}>
              <HourglassTop className={styles.comingSoonIcon} />
              <div className={styles.pulseAnimation}></div>
            </div>
            
            <div className={styles.comingSoonContent}>
              <h2>Deep Dive Content Coming Soon</h2>
              <p>
                Our team is working diligently to produce high-quality articles, case studies, 
                and market analyses that will provide real value to property professionals.
              </p>
              <p className={styles.emphasis}>
                Expect thought leadership on:
              </p>
              <ul className={styles.topicList}>
                <li>AI in property management</li>
                <li>Tenant experience innovations</li>
                <li>Regulatory compliance updates</li>
                <li>Investment strategy insights</li>
              </ul>
            </div>
          </div>
        </section>

        {/* LinkedIn CTA */}
        <section className={styles.linkedinSection}>
          <div className={styles.linkedinCard}>
            <div className={styles.linkedinContent}>
              <LinkedIn className={styles.linkedinIcon} />
              <h2>Connect With Us on LinkedIn</h2>
              <p>
                In the meantime, follow our LinkedIn page where we share industry insights,
                company updates, and early access to our research.
              </p>
              <motion.a
                href="https://linkedin.com/company/your-company"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Visit Our LinkedIn
                <span className={styles.externalArrow}>↗</span>
              </motion.a>
            </div>
            <div className={styles.linkedinVisual}>
              <div className={styles.linkedinMockup}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupLogo}>PM</div>
                  <span>LinkedIn Feed</span>
                </div>
                <div className={styles.mockupPost}>
                  <div className={styles.postHeader}>
                    <div className={styles.postAvatar}></div>
                    <div>
                      <span className={styles.postCompany}>Forems</span>
                      <span className={styles.postDate}>3 days ago</span>
                    </div>
                  </div>
                  <p className={styles.postContent}>
                    "How AI is transforming property maintenance workflows - 
                    early findings from our beta program..."
                  </p>
                  <div className={styles.postEngagement}>
                    <span>42 reactions</span>
                    <span>8 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className={styles.newsletterSection}>
          <h2>Get Updates When We Launch</h2>
          <p>Be the first to know when our articles go live</p>
          
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={styles.emailInput}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Notify Me
            </button>
          </form>
        </section>
      </div>
    </div>
    </>
  );
};

export default Blog;