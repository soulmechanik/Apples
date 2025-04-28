"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "../../../../components/layout/layout";
import styles from "./transactionsreceipt.module.scss";
import { Skeleton } from "@mui/material";

const TransactionReceipt = () => {
  const { rentRequestId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [receiptData, setReceiptData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/rentrequest/${rentRequestId}`
        );
        const data = await response.json();

        if (response.ok) {
          setReceiptData(data);
        } else {
          throw new Error(data.message || "Failed to fetch receipt");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching rent request:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentRequest();
  }, [rentRequestId]);

  const handlePrint = () => {
    window.print();
  };

  // Helper functions
  const formatAmount = (amount) => {
    return amount ? `₦${amount.toLocaleString()}` : "₦0";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <h2>Error Loading Receipt</h2>
          <p>{error}</p>
          <button className={styles.backButton} onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className={styles.printhide}>
      <div className={styles.receiptContainer}>
        <div className={styles.receipt}>
          <div className={styles.header}>
            <div className={styles.companyInfo}>
              <h1>{loading ? <Skeleton width={150} height={30} /> : "FOREMS"}</h1>
              <p>{loading ? <Skeleton width={200} /> : "Property Management Software"}</p>
              <p>
                {loading ? (
                  <Skeleton width={250} />
                ) : (
                  "www.forems.africa | hello@forems.africa | 09150980633"
                )}
              </p>
            </div>
            <div className={styles.logo}>
              {loading ? (
                <Skeleton variant="rectangular" width={80} height={80} />
              ) : (
                <Image src="/Artboard.png" alt="Forems Logo" width={200} height={70} />
              )}
            </div>
          </div>

          <h2 className={styles.receiptTitle}>
            {loading ? <Skeleton width={180} height={30} /> : "RENT RECEIPT"}
          </h2>

          <div className={styles.infoSection}>
            <div className={styles.infoBlock}>
              <h3>PROPERTY INFORMATION</h3>
              <p>
                <span>Property Name</span>{" "}
                {loading ? (
                  <Skeleton width={250} />
                ) : (
                  receiptData?.tenant?.propertyName || "N/A"
                )}
              </p>
              <p>
                <span>Property Address:</span>{" "}
                {loading ? (
                  <Skeleton width={300} />
                ) : (
                  receiptData?.tenant?.propertyAddress || "N/A"
                )}
              </p>
              <p>
                <span>Unit:</span>{" "}
                {loading ? (
                  <Skeleton width={250} />
                ) : (
                  receiptData?.tenant?.roomDescription || "N/A"
                )}
              </p>
          
              <p>
                <span>Property ID:</span>{" "}
                {loading ? (
                  <Skeleton width={250} />
                ) : (
                  receiptData?.tenant?.propertyUniqueID || "N/A"
                )}
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h3>TENANT INFORMATION</h3>
              <p>
                <span>Name:</span>{" "}
                {loading ? (
                  <Skeleton width={180} />
                ) : (
                  receiptData?.tenant?.name || "N/A"
                )}
              </p>
              <p>
                <span>Email:</span>{" "}
                {loading ? (
                  <Skeleton width={220} />
                ) : (
                  receiptData?.tenant?.email || "N/A"
                )}
              </p>
              <p>
                <span>Phone:</span>{" "}
                {loading ? (
                  <Skeleton width={180} />
                ) : (
                  receiptData?.tenant?.phoneNumber || "N/A"
                )}
              </p>
            </div>
          </div>

          <div className={styles.rentPeriod}>
            <p>
              <span>Rent Period:</span>{" "}
              {loading ? (
                <Skeleton width={300} />
              ) : (
                `${formatDate(receiptData?.rentPeriod?.start)} - ${formatDate(
                  receiptData?.rentPeriod?.end
                )}`
              )}
            </p>
            <p>
              <span>Duration:</span>{" "}
              {loading ? (
                <Skeleton width={150} />
              ) : (
                receiptData?.rentDuration || "N/A"
              )}
            </p>
          </div>

          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Base Rent</td>
                <td>
                  {loading ? (
                    <Skeleton width={120} />
                  ) : (
                    formatAmount(receiptData?.paymentDetails?.baseRent)
                  )}
                </td>
              </tr>
              <tr>
                <td>Service Charge</td>
                <td>
                  {loading ? (
                    <Skeleton width={120} />
                  ) : (
                    formatAmount(receiptData?.paymentDetails?.serviceCharge)
                  )}
                </td>
              </tr>
              <tr>
                <td>Forems Software Fee</td>
                <td>
                  {loading ? (
                    <Skeleton width={120} />
                  ) : (
                    formatAmount(receiptData?.paymentDetails?.foremsCharge)
                  )}
                </td>
              </tr>
              <tr className={styles.totalRow}>
                <td>Total Amount Paid</td>
                <td>
                  {loading ? (
                    <Skeleton width={120} />
                  ) : (
                    formatAmount(receiptData?.paymentDetails?.totalAmount)
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {receiptData?.description && (
            <div className={styles.notes}>
              <h3>Notes</h3>
              <p>{receiptData.description}</p>
            </div>
          )}

          <div className={styles.signature}>
            <p>
              {loading ? (
                <Skeleton width={150} />
              ) : (
                "Signed By Management"
              )}
            </p>
            <h3>{loading ? <Skeleton width={100} /> : "FOREMS"}</h3>
          </div>

          <div className={styles.footer}>
            <p>
              {loading ? (
                <Skeleton width={250} />
              ) : (
                "Powered by: PropTech Softwares | RC: 8102335"
              )}
            </p>
          </div>

          <div className={styles.buttonContainer}>
            {loading ? (
              <>
                <Skeleton variant="rectangular" width={120} height={40} />
                <Skeleton variant="rectangular" width={150} height={40} />
              </>
            ) : (
              <>
                <button
                  className={styles.backButton}
                  onClick={() => router.back()}
                >
                  Go Back
                </button>
                <button
                  className={styles.printButton}
                  onClick={handlePrint}
                >
                  Print Receipt
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionReceipt;