"use client";
import React from 'react';
import styles from './rentloan.module.scss';
import { FaHandHoldingUsd, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Layout from '../../../components/Tenantlayout/Layout'

const RentLoanPage = () => {
  const handleApplyNow = () => {
    window.open('https://forms.gle/mQBUDRkJ89m6Wabx7', '_blank');
  };

  return (
    <Layout>
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.iconContainer}>
          <FaHandHoldingUsd className={styles.icon} />
        </div>
        <h1>Rent Loan Assistance</h1>
        <p className={styles.subtitle}>Get temporary financial support when you need it most</p>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <h2>Simple, Fast Relief</h2>
          <ul className={styles.benefitsList}>
            <li>
              <FaCheckCircle className={styles.checkIcon} />
              <span>Quick application process</span>
            </li>
            <li>
              <FaCheckCircle className={styles.checkIcon} />
              <span>Flexible repayment options</span>
            </li>
            <li>
              <FaCheckCircle className={styles.checkIcon} />
              <span>No hidden fees</span>
            </li>
          </ul>

          <button 
            onClick={handleApplyNow}
            className={styles.ctaButton}
          >
            Apply Now <FaArrowRight className={styles.arrowIcon} />
          </button>

          <p className={styles.note}>
            Approval subject to verification. Funds disbursed within 2 business days.
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default RentLoanPage;