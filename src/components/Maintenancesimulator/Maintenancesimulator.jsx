"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Build,
  Plumbing,
  ElectricalServices,
  AcUnit,
  PestControl,
  CheckCircle,
  Schedule,
  ArrowForward
} from '@mui/icons-material';
import styles from './Maintenancesimulator.module.scss';

const MaintenanceSimulator = () => {
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [trackingId, setTrackingId] = useState(null);

  const issues = [
    { id: 1, name: 'Plumbing', icon: <Plumbing />, examples: ['Leaky faucet', 'Clogged drain', 'Running toilet'] },
    { id: 2, name: 'Electrical', icon: <ElectricalServices />, examples: ['Outlet not working', 'Light fixture issue', 'Circuit breaker'] },
    { id: 3, name: 'HVAC', icon: <AcUnit />, examples: ['AC not cooling', 'Heater not working', 'Thermostat issue'] }, // Updated icon
    { id: 4, name: 'Structural', icon: <Build />, examples: ['Broken window', 'Door not latching', 'Flooring damage'] },
    { id: 5, name: 'Pest Control', icon: <PestControl />, examples: ['Rodents', 'Insects', 'Wildlife'] }
  ];

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setTrackingId(`MT-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep(3);
    }, 1500);
  };

  const resetSimulator = () => {
    setStep(1);
    setSelectedIssue(null);
    setTrackingId(null);
  };

  return (
    <section className={styles.simulatorSection}>
      <div className={styles.simulatorContainer}>
        <h2 className={styles.sectionTitle}>
          Maintenance Request Simulator
          <span className={styles.subtitle}>Experience our streamlined process</span>
        </h2>

        <div className={styles.simulatorCard}>
          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`${styles.step} ${i === step ? styles.active : i < step ? styles.completed : ''}`}
              >
                {i < step ? <CheckCircle /> : i}
              </div>
            ))}
          </div>

          {/* Step 1: Issue Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.stepContent}
            >
              <h3>What type of issue are you experiencing?</h3>
              <div className={styles.issueGrid}>
                {issues.map((issue) => (
                  <motion.button
                    key={issue.id}
                    className={`${styles.issueCard} ${selectedIssue?.id === issue.id ? styles.selected : ''}`}
                    onClick={() => setSelectedIssue(issue)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.issueIcon}>{issue.icon}</div>
                    <span>{issue.name}</span>
                  </motion.button>
                ))}
              </div>
              <button
                className={styles.nextButton}
                disabled={!selectedIssue}
                onClick={() => setStep(2)}
              >
                Next <ArrowForward />
              </button>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.stepContent}
            >
              <h3>Describe your {selectedIssue.name} issue</h3>
              
              <div className={styles.commonIssues}>
                <p>Common {selectedIssue.name} issues:</p>
                <ul>
                  {selectedIssue.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>

              <textarea
                className={styles.issueDescription}
                placeholder="Provide details (e.g., location, severity)"
                rows={4}
              />

              <div className={styles.photoUpload}>
                <label>
                  <input type="file" accept="image/*" />
                  <span>+ Add Photos</span>
                </label>
              </div>

              <div className={styles.buttonGroup}>
                <button 
                  className={styles.backButton}
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className={styles.submitButton}
                  onClick={handleSubmit}
                >
                  Submit Request
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.stepContent}
            >
              <div className={styles.successCheckmark}>
                <CheckCircle />
              </div>
              <h3>Request Submitted Successfully!</h3>
              <p className={styles.trackingId}>
                Tracking ID: <span>{trackingId}</span>
              </p>
              
              <div className={styles.nextSteps}>
                <div className={styles.nextStep}>
                  <Schedule />
                  <div>
                    <h4>What's Next?</h4>
                    <p>Vendor will contact you within 2 hours</p>
                  </div>
                </div>
              </div>

              <button
                className={styles.newRequestButton}
                onClick={resetSimulator}
              >
                Submit Another Request
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSimulator;