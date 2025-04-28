'use client'
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./PaymentSuccess.module.scss";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <div className={styles.paymentSuccessContainer}>
      <div className={styles.paymentSuccessCard}>
        <h1>🎉 Payment Successful!</h1>
        <p>Thank you for your payment. Your transaction has been completed successfully.</p>
        <button
          className={styles.dashboardButton}
          onClick={() => router.push("/tenant/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;