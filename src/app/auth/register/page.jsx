"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import styles from "./Register.module.scss";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "Landlord",
    propertyID: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    lessThan8Chars: true,
    noNumber: true,
    noCapitalLetter: true,
    noSpecialChar: true,
    containsSpace: true,
    passwordsDoNotMatch: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      validatePassword(value, name);
    }
  };

  const validatePassword = (value, field) => {
    setPasswordErrors(prev => {
      const newErrors = { ...prev };
      
      if (field === "password") {
        newErrors.lessThan8Chars = value.length < 8;
        newErrors.noNumber = !/\d/.test(value);
        newErrors.noCapitalLetter = !/[A-Z]/.test(value);
        newErrors.noSpecialChar = !/[^A-Za-z0-9]/.test(value);
        newErrors.containsSpace = /\s/.test(value);
      }

      if (field === "confirmPassword") {
        newErrors.passwordsDoNotMatch = value !== formData.password;
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(passwordErrors).some(error => error)) {
      setMessage({ text: "Please fix password errors", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, 
        formData
      );
      setMessage({ text: response.data.message, type: "success" });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Registration failed", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
   <Header/>
    <div className={styles.container}>
      <Particles
        id="register-particles"
        init={particlesInit}
        options={{
          background: { color: { value: "#0f172a" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } }
          },
          particles: {
            color: { value: "#6366f1" },
            links: {
              color: "#818cf8",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1
            },
            move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              speed: 2,
              straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } }
          },
          detectRetina: true
        }}
      />

      <motion.div 
        className={styles.formWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join our platform today</p>
        </div>

        <AnimatePresence>
          {message.text && (
            <motion.div
              className={`${styles.message} ${styles[message.type]}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>

            <div className={styles.inputGroup}>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className={styles.passwordSection}>
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
              />
            </div>

            <div className={styles.passwordRules}>
              <h4>Password Requirements:</h4>
              <ul>
                <li className={!passwordErrors.lessThan8Chars ? styles.valid : ""}>
                  {passwordErrors.lessThan8Chars ? "✕" : "✓"} 8+ characters
                </li>
                <li className={!passwordErrors.noNumber ? styles.valid : ""}>
                  {passwordErrors.noNumber ? "✕" : "✓"} Contains number
                </li>
                <li className={!passwordErrors.noCapitalLetter ? styles.valid : ""}>
                  {passwordErrors.noCapitalLetter ? "✕" : "✓"} Uppercase letter
                </li>
                <li className={!passwordErrors.noSpecialChar ? styles.valid : ""}>
                  {passwordErrors.noSpecialChar ? "✕" : "✓"} Special character
                </li>
                <li className={!passwordErrors.containsSpace ? styles.valid : ""}>
                  {passwordErrors.containsSpace ? "✕" : "✓"} No spaces
                </li>
                <li className={!passwordErrors.passwordsDoNotMatch ? styles.valid : ""}>
                  {passwordErrors.passwordsDoNotMatch ? "✕" : "✓"} Passwords match
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.roleSection}>
            <div className={styles.inputGroup}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Landlord">Landlord</option>
                <option value="Tenant">Tenant</option>
                <option value="PropertyManager">Property Manager</option>
              </select>
            </div>

            {formData.role === "Tenant" && (
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="propertyID"
                  value={formData.propertyID}
                  onChange={handleChange}
                  required
                  placeholder="Property ID (FRMS-XXXXXX)"
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.spinner} />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account? <a href="/auth/login">Sign In</a>
        </div>
      </motion.div>
    </div>
    <Footer/>

    </>
  );
};

export default RegisterForm;