"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Key, 
  ManageAccounts, 
  School, 
  MonetizationOn,
  ArrowForward,
  Dashboard,
  Receipt,
  AccountBalance,
  VerifiedUser,
  Home,
  Apartment,
  LocationCity,
  BarChart,
  PieChart,
  ShowChart,
  Gavel,
  Description,
  Balance,
  PlayCircle,
  SupportAgent
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import MaintenanceSimulator from '../Maintenancesimulator/Maintenancesimulator';
import FAQ from '../Faq/Faq'

const Hero = () => {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Initialize particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.1,
      direction: Math.random() * Math.PI * 2
    }));

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(122, 90, 248, ${particle.size / 4})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();

    return () => cancelAnimationFrame(animateParticles);
  }, []);

  const handleLogin = (role) => router.push(`/auth/login?role=${role}`);
  const handleBrowse = (type) => router.push(`/search/${type}`);

  return (
    <div className={styles.heroContainer}>
      <canvas ref={canvasRef} className={styles.particleCanvas} />

      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.heroBadge}>
                <span>Next-Gen Property Technology</span>
              </div>

              <h1 className={styles.heroTitle}>
                <span>The Best platform for</span>
                <span className={styles.heroHighlight}>Property Management</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Collect rent, manage tenants, and maintenance requests all in one place— for free.
              </p>

              <div className={styles.heroActions}>
                <motion.button 
                  className={styles.primaryButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/auth/login')}
                >
                  <span>Login to Dashboard</span>
                  <ArrowForward className={styles.arrowIcon} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Dashboard Visualization */}
          <div className={styles.dashboardVisual}>
            <div className={styles.platformMockup}>
              <div className={styles.screenHeader}>
                <div className={styles.logoMark}>PM</div>
                <span>Dashboard</span>
              </div>

              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <BarChart className={styles.metricIcon} />
                  <div>
                    <span className={styles.metricValue}>98%</span>
                    <span className={styles.metricLabel}>Occupancy</span>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <PieChart className={styles.metricIcon} />
                  <div>
                    <span className={styles.metricValue}>$42K</span>
                    <span className={styles.metricLabel}>Monthly Revenue</span>
                  </div>
                </div>

                <div className={styles.chartContainer}>
                  <ShowChart className={styles.chartIcon} />
                  <div className={styles.chartLine}></div>
                </div>
              </div>

              <div className={styles.propertyGrid}>
                {[1, 2, 3].map((item) => (
                  <div key={item} className={styles.propertyCard}>
                    <div className={styles.propertyImage}></div>
                    <div className={styles.propertyInfo}>
                      <span>Property #{item}</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pathway Cards */}
        <section className={styles.pathwaysSection}>
          <h2 className={styles.sectionTitle}>Start Your Journey</h2>

          <div className={styles.pathwayCards}>
            <div 
              className={styles.pathwayCard}
              onClick={() => handleLogin('landlord')}
            >
              <div className={styles.cardIllustration}>
                <Dashboard className={styles.cardIcon} />
              </div>
              <h3>Landlord Portal</h3>
              <p>AI-powered tools to maximize ROI and streamline operations</p>
              <div className={styles.enterButton}>
                Explore Tools <ArrowForward />
              </div>
            </div>

            <div 
              className={styles.pathwayCard}
              onClick={() => handleLogin('tenant')}
            >
              <div className={styles.cardIllustration}>
                <Key className={styles.cardIcon} />
              </div>
              <h3>Tenant Experience</h3>
              <p>Smart search, virtual tours, and frictionless renting</p>
              <div className={styles.enterButton}>
                Find Your Home <ArrowForward />
              </div>
            </div>

            <div 
              className={styles.pathwayCard}
              onClick={() => handleLogin('property-manager')}
            >
              <div className={styles.cardIllustration}>
                <ManageAccounts className={styles.cardIcon} />
              </div>
              <h3>Management Suite</h3>
              <p>Enterprise-grade tools for portfolio optimization</p>
              <div className={styles.enterButton}>
                Access Dashboard <ArrowForward />
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Simulator */}
        <section className={styles.maintenanceSection}>
          <h2 className={styles.sectionTitle}>Experience Stress-Free Maintenance</h2>
          <div className={styles.simulatorContainer}>
            <MaintenanceSimulator/>
          </div>
        </section>



        {/* Alex AI Property Law Expert */}
        <section className={styles.aiLawSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Gavel className={styles.sectionIcon} />
              Meet Alex – Your AI Property Law Expert
            </h2>
            <p className={styles.sectionSubtitle}>
              Avoid costly legal mistakes with real-time compliance analysis
            </p>
          </div>

          <div className={styles.aiLawGrid}>
            <div className={styles.aiLawCard}>
              <div className={styles.aiLawIcon}>
                <Description />
              </div>
              <h3>Instant Law Matching</h3>
              <p>Get relevant clauses from local housing laws in seconds</p>
            </div>

            <div className={styles.aiLawCard}>
              <div className={styles.aiLawIcon}>
                <Balance />
              </div>
              <h3>Compliance Alerts</h3>
              <p>Flagged 12,000+ non-compliant lease clauses last year</p>
            </div>

            <div className={styles.aiLawDemo}>
              {videoPlaying ? (
                <div className={styles.videoContainer}>
                  <div className={styles.videoPlaceholder}>
                    <p>Alex AI in action demo</p>
                  </div>
                </div>
              ) : (
                <button 
                  className={styles.demoTrigger}
                  onClick={() => setVideoPlaying(true)}
                >
                  <PlayCircle className={styles.playIcon} />
                  <span>See Alex analyze a lease</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Financial Hub */}
        <section className={styles.financialHub}>
          <div className={styles.hubCard}>
            <div className={styles.hubVisual}>
              <MonetizationOn className={styles.hubIcon} />
            </div>
            <div className={styles.hubContent}>
              <h3>Financial Ecosystem</h3>
              <p>
                Integrated rent financing, automated collections, and 
                predictive cash flow analytics in one platform.
              </p>
              <button
                className={styles.hubButton}
                onClick={() => router.push('/financial-solutions')}
              >
                Explore Financial Tools
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <h2 className={styles.sectionTitle}>Trusted by 500+ Tenants</h2>
          <div className={styles.testimonialGrid}>
            <FAQ/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
