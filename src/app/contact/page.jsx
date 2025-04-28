import Head from 'next/head';
import styles from './contact.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Foremspay | Get Help with Rent & Renovations</title>
        <meta name="description" content="Reach our team via WhatsApp, email, phone, or meet for a drink" />
      </Head>

      <div className={styles.contactContainer}>
       <Header/>
        
        <div className={styles.mainContent}>
          {/* Hero Section */}
          <section className={styles.contactHero}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroHighlight}>Contact</span> Our Team
            </h1>
            <p className={styles.heroSubtitle}>
              Whether you need rent assistance, renovation funding, or just want to chat about housing solutions - we're here to help.
            </p>
          </section>

          {/* Contact Cards Grid */}
          <div className={styles.contactGrid}>
            {/* WhatsApp Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardIcon} style={{ background: 'rgba(37, 211, 102, 0.2)' }}>
                <span>💬</span>
              </div>
              <h3>WhatsApp Chat</h3>
              <p>Get instant responses from our support team during business hours</p>
              <a 
                href="https://wa.me/message/LBRBV4RR6OWSI1" 
                className={`${styles.contactButton} ${styles.whatsappButton}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat Now
              </a>
            </div>

            {/* Email Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardIcon} style={{ background: 'rgba(122, 90, 248, 0.2)' }}>
                <span>✉️</span>
              </div>
              <h3>Email Us</h3>
              <p>For detailed inquiries or documentation</p>
              <a 
                href="mailto:hello@forems.africa" 
                className={`${styles.contactButton} ${styles.emailButton}`}
              >
            hello@forems.africa
              </a>
            </div>

            {/* Phone Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardIcon} style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                <span>📞</span>
              </div>
              <h3>Call Support</h3>
              <p>Monday-Friday, 9am-5pm WAT</p>
              <a 
                href="tel:+2348094793447" 
                className={`${styles.contactButton} ${styles.phoneButton}`}
              >
                +234 809 4793 447
              </a>
            </div>

            {/* Meetup Card */}
         
          </div>

          {/* Office Location */}
          <div className={styles.officeSection}>
            <h2 className={styles.sectionTitle}>Our Offices</h2>
            <div className={styles.officeCards}>
              <div className={styles.officeCard}>
                <h3>Lagos HQ</h3>
                <p>123 Property Avenue, Victoria Island</p>
                <p>Open: Mon-Fri, 9am-5pm</p>
              </div>
              <div className={styles.officeCard}>
                <h3>Abuja Branch</h3>
                <p>456 Landlord Plaza, Central District</p>
                <p>Open: Mon-Fri, 10am-4pm</p>
              </div>
            </div>
          </div>

          <Footer/>
        </div>
      </div>
    </>
  );
}