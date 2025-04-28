import Head from 'next/head';
import styles from './foremspay.module.scss';
import Header from '../../components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function Foremspay() {
  return (
    <>
      <Head>
        <title>Foremspay | Rent Assistance & Property Funding</title>
        <meta name="description" content="Financial solutions for Nigerian tenants and landlords" />
      </Head>

      <div className={styles.heroContainer}>
       <Header/>
        <div className={styles.mainContent}>
          {/* ===== HERO SECTION ===== */}
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span>A Forems Solution</span>
              </div>
              
              <h1 className={styles.heroTitle}>
                <span>Rent Relief & Renovation</span>
                <span className={styles.heroHighlight}>Funding for Nigerians</span>
              </h1>
              
              <p className={styles.heroSubtitle}>
                For tenants struggling with payments and landlords needing property upgrades. 
                We bridge the gap with flexible solutions.
              </p>
              
              <div className={styles.heroActions}>
                <a href="https://forms.gle/Q9ZMzfyvVHfUfcfSA" target="_blank" rel="noopener noreferrer" className={`${styles.primaryButton} ${styles.purpleButton}`}>
                  Apply for Rent Assistance
                  <span className={styles.arrowIcon}>→</span>
                </a>
                <a href="https://forms.gle/Q9ZMzfyvVHfUfcfSA" target="_blank" rel="noopener noreferrer" className={`${styles.primaryButton} ${styles.emeraldButton}`}>
                  Landlord Funding
                  <span className={styles.arrowIcon}>→</span>
                </a>
              </div>
            </div>

            <div className={styles.dashboardVisual}>
              <div className={styles.platformMockup}>
                <div className={styles.screenHeader}>
                  <div className={styles.logoMark}>FP</div>
                  <h3>Foremspay Dashboard</h3>
                </div>
                
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>👨‍👩‍👦</div>
                    <div>
                      <span className={styles.metricValue}>12,500+</span>
                      <span className={styles.metricLabel}>Tenants Helped</span>
                    </div>
                  </div>
                  
                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>🏠</div>
                    <div>
                      <span className={styles.metricValue}>₦850M</span>
                      <span className={styles.metricLabel}>Funds Disbursed</span>
                    </div>
                  </div>
                  
                  <div className={styles.chartContainer}>
                    <div className={styles.chartIcon}>📈</div>
                    <div className={styles.chartLine}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== PROBLEM SECTION ===== */}
          <section className={styles.problemSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>⚠️</span>
                The Nigerian Housing Challenge
              </h2>
              <p className={styles.sectionSubtitle}>
                68% of tenants face rent payment delays while 42% of properties need urgent upgrades
              </p>
            </div>

            <div className={styles.problemGrid}>
              <div className={styles.problemCard}>
                <div className={styles.problemIcon}>💸</div>
                <h3>Tenant Struggles</h3>
                <p>Unexpected job loss or medical bills shouldn't mean eviction. We provide breathing room.</p>
              </div>
              
              <div className={styles.problemCard}>
                <div className={styles.problemIcon}>🏚️</div>
                <h3>Landlord Frustrations</h3>
                <p>Dilapidated properties lose quality tenants. We fund renovations to increase value.</p>
              </div>
              
              <div className={styles.problemCard}>
                <div className={styles.problemIcon}>📉</div>
                <h3>Economic Impact</h3>
                <p>Poor housing drags down communities. Our solutions create stability.</p>
              </div>
            </div>
          </section>

          {/* ===== HOW IT WORKS ===== */}
          <section className={styles.howItWorks}>
            <h2 className={styles.sectionTitle}>How Foremspay Works</h2>
            
            <div className={styles.flowCard}>
              <div className={styles.flowVisual}>
                <div className={styles.flowIcon}>👨‍💼</div>
              </div>
              <div className={styles.flowContent}>
                <h3>For Tenants</h3>
                <ol>
                  <li>Apply in 5 minutes</li>
                  <li>Get approved within 48hrs</li>
                  <li>We pay your landlord directly</li>
                  <li>Repay flexibly over 6-12 months</li>
                </ol>
                <a href="https://forms.gle/Q9ZMzfyvVHfUfcfSA" target="_blank" rel="noopener noreferrer" className={styles.flowButton}>Apply Now</a>
              </div>
            </div>
            
            <div className={`${styles.flowCard} ${styles.landlordFlow}`}>
              <div className={styles.flowVisual}>
                <div className={styles.flowIcon}>🏗️</div>
              </div>
              <div className={styles.flowContent}>
                <h3>For Landlords</h3>
                <ol>
                  <li>Submit renovation request</li>
                  <li>Property inspection</li>
                  <li>Funds disbursed to contractors</li>
                  <li>Repay from rental income</li>
                </ol>
                <a href="https://forms.gle/Q9ZMzfyvVHfUfcfSA" target="_blank" rel="noopener noreferrer" className={styles.flowButton}>Request Funding</a>
              </div>
            </div>
          </section>

          {/* ===== TESTIMONIALS ===== */}
          <section className={styles.testimonials}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            
            <div className={styles.testimonialGrid}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialIllustration}>
                  <span className={styles.testimonialIcon}>😊</span>
                </div>
                <h3>"Saved From Eviction"</h3>
                <p>
                  "When I lost my job, Foremspay covered 6 months of rent 
                  while I got back on my feet. The flexible repayment saved me."
                </p>
                <div className={styles.readMore}>
                  Read full story <span>→</span>
                </div>
              </div>
              
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialIllustration}>
                  <span className={styles.testimonialIcon}>💰</span>
                </div>
                <h3>"Transformed My Property"</h3>
                <p>
                  "With their renovation loan, I upgraded from a 'face-me-I-face-you' 
                  to modern studios that now rent for 3x more."
                </p>
                <div className={styles.readMore}>
                  Read full story <span>→</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== FINAL CTA ===== */}
          <section className={styles.finalCTA}>
            <h2 className={styles.ctaTitle}>
              Ready to <span className={styles.heroHighlight}>Transform</span> Your Housing Journey?
            </h2>
            <div className={styles.ctaButtons}>
              <a href="https://forms.gle/Q9ZMzfyvVHfUfcfSA" target="_blank" rel="noopener noreferrer" className={`${styles.primaryButton} ${styles.purpleButton}`}>
                I'm a Tenant
              </a>
              <a href="https://forms.gle/Q9ZMzfyvVHfUfcfSA" target="_blank" rel="noopener noreferrer" className={`${styles.primaryButton} ${styles.emeraldButton}`}>
                I'm a Landlord
              </a>
            </div>
          </section>

          <Footer/>
        </div>
      </div>
    </>
  );
}