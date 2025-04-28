"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./login.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Particles.js configuration
const particlesConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ["#7a5af8", "#10b981"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1 }
    },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#7a5af8",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    }
  },
  retina_detect: true
};

// SVG Icons
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LoadingSpinner = () => (
  <div className={styles.spinner}>
    <svg viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
    </svg>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const [pageRef, pageInView] = useInView({ threshold: 0.1 });

  // Initialize particles
  useEffect(() => {
    if (pageInView) controls.start("visible");
  }, [controls, pageInView]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initParticles = async () => {
        try {
          await import("particles.js");
          if (window.particlesJS) {
            window.particlesJS("particles-js", particlesConfig);
          }
        } catch (error) {
          console.log("Particles loading animation instead");
        }
      };
      initParticles();
      
      return () => {
        if (window.pJSDom?.[0]?.pJS?.fn?.vendors?.destroy) {
          window.pJSDom[0].pJS.fn.vendors.destroy();
        }
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { 
        email, 
        password 
      });
    
  
      if (response.status === 200) {
        const { token, user } = response.data;
        if (!user.role || !user.id) throw new Error("Invalid user data");

        // Store auth data
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);
        Cookies.set("userId", user.id, { expires: 1 });
        Cookies.set("role", user.role, { expires: 1 });

        // Redirect
        if (!user.onboarding) return router.push("/onboarding");
        switch (user.role.toLowerCase()) {
          case "tenant": return router.push("/tenant/overview");
          case "landlord": return router.push("/landlord/overview");
          case "manager": return router.push("/manager/overview");
          default: throw new Error("Invalid role");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 10 } }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, boxShadow: "0 5px 15px -5px rgba(122, 90, 248, 0.5)" },
    tap: { scale: 0.98 },
    loading: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }
  };

  return (

    <>

    <Header/>
    <div className={styles.loginPage} ref={pageRef}>

    
      <div id="particles-js" className={styles.particles} />
      
      <motion.div 
        className={styles.contentWrapper}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.div 
          className={styles.authCard}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { type: "spring" } }
          }}
        >
         <motion.div className={styles.logoHeader} variants={itemVariants}>
      <motion.div 
        className={styles.logo}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <span className={styles.logoGradient}> F✦REMS</span>
      </motion.div>
      <motion.p className={styles.tagline} variants={itemVariants}>
        Property solutions for modern Nigeria
      </motion.p>
    </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className={styles.authForm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className={styles.inputGroup} variants={itemVariants}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.formInput}
                placeholder=" "
              />
              <label className={styles.inputLabel}>Email Address</label>
              <div className={styles.inputUnderline} />
            </motion.div>

            <motion.div className={styles.inputGroup} variants={itemVariants}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.formInput}
                placeholder=" "
              />
              <label className={styles.inputLabel}>Password</label>
              <div className={styles.inputUnderline} />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className={styles.loginButton}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                animate={isLoading ? "loading" : "rest"}
              >
                {isLoading ? <LoadingSpinner /> : (
                  <>Sign In <ArrowRightIcon /></>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          <motion.div className={styles.formFooter} variants={itemVariants}>
            <a href="/auth/forgot-password" className={styles.footerLink}>
              Forgot password?
            </a>
            <span className={styles.footerDivider}>•</span>
            <a href="/auth/register" className={styles.footerLink}>
              Create account
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.visualPanel}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.5 } }
          }}
        >
          <div className={styles.visualCard}>
            <h3 className={styles.visualTitle}>
              <span>Streamlined</span> Property Management
            </h3>
            <ul className={styles.visualList}>
              <li>Automated rent collection</li>
              <li>Real-time financial tracking</li>
              <li>Maintenance request system</li>
            </ul>
          </div>
          <div className={styles.dataVisualization}>
            <svg viewBox="0 0 500 200">
              <path d="M0,150 C100,50 150,180 250,100 S400,150 500,50" 
                stroke="#7a5af8" strokeWidth="3" fill="none" />
              <path d="M0,100 C100,180 150,70 250,150 S400,80 500,180" 
                stroke="#10b981" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>

<Footer/>

    </>
  );
};

export default Login;