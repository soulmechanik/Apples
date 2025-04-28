"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Layout from '../../../../components/Tenantlayout/Layout';
import styles from "./rentpaymentreceipt.module.scss";
import { Skeleton } from "@mui/material";

const TransactionReceipt = () => {
  const { rentRequestId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [receiptData, setReceiptData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/tenant/receipt/${rentRequestId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(response.status === 404 
            ? 'Receipt not found' 
            : 'Failed to fetch receipt');
        }

        const { data } = await response.json();
        setReceiptData(data);
      } catch (err) {
        setError(err.message);
        console.error("Receipt fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceiptData();
  }, [rentRequestId]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={styles.receiptContainer}>
      {error ? (
        <div className={styles.errorContainer}>
          <h2>Error Loading Receipt</h2>
          <p>{error}</p>
          <button 
            className={styles.backButton} 
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className={styles.receipt}>
          {/* Watermark Background */}
          <div className={styles.watermark}>FOREMS</div>
          
          {/* Header Section */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.logo}>
                {loading ? (
                  <Skeleton variant="circular" width={80} height={80} />
                ) : (
                  <Image 
                    src="/Artboard.png" 
                    alt="Forems Logo" 
                    width={120} 
                    height={50} 
                    priority
                  />
                )}
              </div>
              <div className={styles.receiptMeta}>
                <h1>{loading ? <Skeleton width={180} /> : "RENT PAYMENT RECEIPT"}</h1>
                <p className={styles.receiptId}>
                  {loading ? <Skeleton width={200} /> : `Receipt #: ${receiptData?.receiptId}`}
                </p>
                <p className={styles.receiptDate}>
                  {loading ? <Skeleton width={150} /> : `Issued: ${formatDate(receiptData?.receiptDate)}`}
                </p>
              </div>
            </div>
            <div className={styles.headerRight}>
              <h2>FOREMS</h2>
              <p>Property Management Services</p>
              <p>www.forems.africa</p>
              <p>hello@forems.africa</p>
              <p>09150980633</p>
            </div>
          </header>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Main Content */}
          <main className={styles.content}>
            {/* Property & Tenant Info */}
            <section className={styles.infoGrid}>
              <div className={styles.infoBlock}>
                <h3>PROPERTY INFORMATION</h3>
                <div className={styles.infoRow}>
                  <span>Address:</span>
                  {loading ? <Skeleton width={180} /> : <p>{receiptData?.propertyAddress}</p>}
                </div>
                <div className={styles.infoRow}>
                  <span>Unit:</span>
                  {loading ? <Skeleton width={120} /> : <p>{receiptData?.roomDescription}</p>}
                </div>
                <div className={styles.infoRow}>
                  <span>Property ID:</span>
                  {loading ? <Skeleton width={150} /> : <p>{receiptData?.propertyUniqueID}</p>}
                </div>
              </div>

              <div className={styles.infoBlock}>
                <h3>TENANT INFORMATION</h3>
                <div className={styles.infoRow}>
                  <span>Name:</span>
                  {loading ? <Skeleton width={180} /> : <p>{receiptData?.tenantName}</p>}
                </div>
                <div className={styles.infoRow}>
                  <span>Email:</span>
                  {loading ? <Skeleton width={180} /> : <p>{receiptData?.tenantEmail}</p>}
                </div>
                <div className={styles.infoRow}>
                  <span>Phone:</span>
                  {loading ? <Skeleton width={120} /> : <p>{receiptData?.tenantPhone}</p>}
                </div>
              </div>
            </section>

            {/* Rent Period */}
            <section className={styles.rentPeriod}>
              <h3>RENTAL PERIOD</h3>
              {loading ? (
                <Skeleton width={300} height={24} />
              ) : (
                <div className={styles.periodDetails}>
                  <p>
                    {formatDate(receiptData?.rentStartDate)} to {formatDate(receiptData?.rentEndDate)}
                  </p>
                  <p className={styles.duration}>
                    Duration: {receiptData?.rentDuration}
                  </p>
                </div>
              )}
            </section>

            {/* Payment Breakdown */}
            <section className={styles.paymentDetails}>
              <h3>PAYMENT DETAILS</h3>
              <table className={styles.paymentTable}>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount (₦)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Base Rent</td>
                    <td>
                      {loading ? (
                        <Skeleton width={80} />
                      ) : (
                        receiptData?.baseRent?.toLocaleString()
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Service Charge</td>
                    <td>
                      {loading ? (
                        <Skeleton width={80} />
                      ) : (
                        receiptData?.serviceCharge?.toLocaleString()
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Forems Software Fee</td>
                    <td>
                      {loading ? (
                        <Skeleton width={80} />
                      ) : (
                        receiptData?.foremsCharge?.toLocaleString()
                      )}
                    </td>
                  </tr>
                  <tr className={styles.totalRow}>
                    <td>Total Paid</td>
                    <td>
                      {loading ? (
                        <Skeleton width={100} />
                      ) : (
                        receiptData?.amount?.toLocaleString()
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Payment Method */}
            <section className={styles.paymentMethod}>
              <div className={styles.methodRow}>
                <span>Payment Method:</span>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <p>{receiptData?.paymentMethod}</p>
                )}
              </div>
              <div className={styles.methodRow}>
                <span>Transaction Reference:</span>
                {loading ? (
                  <Skeleton width={200} />
                ) : (
                  <p>{receiptData?.transactionReference}</p>
                )}
              </div>
            </section>

         
          </main>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.signature}>
             
            </div>
            <div className={styles.footerNote}>
              <p>Thank you for your payment</p>
              <p>Powered by FOREMS</p>
           
            </div>
          </footer>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.backButton} 
              onClick={() => router.back()}
            >
              ← Back to Dashboard
            </button>
            <button 
              className={styles.printButton} 
              onClick={handlePrint}
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionReceipt;