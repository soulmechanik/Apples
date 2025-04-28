"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./forgot-password.module.scss";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (data.message === 'Password reset link sent to your email') {
        setSuccess('Password reset link sent to your email');
        setError(null);
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      setError('Failed to send password reset link');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    <Header/>
    <div className={styles.loginPage}>
      <div className={styles.particles}>
        <div className={styles.particlesFallback} />
      </div>

      <motion.div 
        className={styles.contentWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.authCard}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
        >
          <div className={styles.logoHeader}>
            <div className={styles.logoContainer}>
              <span className={styles.logoIcon}>✦</span>
              <span className={styles.logoText}>FOREMS</span>
            </div>
            <motion.p className={styles.tagline}>
              Reset your account password
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className={styles.authForm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
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
              {success && (
                <motion.div
                  className={styles.successMessage}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.formInput}
                placeholder=" "
              />
              <label htmlFor="email" className={styles.inputLabel}>
                Email Address
              </label>
              <div className={styles.inputUnderline} />
            </div>

            <motion.button
              type="submit"
              className={styles.loginButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.spinner}>
                  <svg viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5"></circle>
                  </svg>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </motion.form>

          <div className={styles.formFooter}>
            <a href="/auth/login" className={styles.footerLink}>
              Remember your password? Sign in
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
    <Footer/>

    </>
  );
};

export default ForgotPassword;