"use client";
import React, { useState, useEffect } from "react";
import styles from "./rent-history.module.scss";
import { 
  FaMoneyBillWave,
  FaHome,
  FaCalendarAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaDownload
} from "react-icons/fa";
import Layout from "../../../components/Tenantlayout/Layout";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RentHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rentRequests, setRentRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRentHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.warning("Please login to view rent history");
          router.push("/login");
          return;
        }

        const response = await axios.get("http://localhost:5001/api/tenant/rent-history", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.rentRequests) {
          setRentRequests(response.data.rentRequests);
        } else {
          toast.error("No rent requests found");
          setRentRequests([]);
        }
      } catch (error) {
        console.error("Rent history error:", error);
        toast.error(error.response?.data?.message || "Error loading rent history");
        setRentRequests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentHistory();
  }, [router]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return <FaCheckCircle className={styles.statusIconPaid} />;
      case "pending": return <FaHourglassHalf className={styles.statusIconPending} />;
      case "failed": return <FaExclamationTriangle className={styles.statusIconFailed} />;
      default: return <FaHourglassHalf className={styles.statusIconDefault} />;
    }
  };

  const handleDownloadReceipt = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      toast.loading("Preparing receipt...", { toastId: "receipt-loading" });

      const response = await axios.get(
        `http://localhost:5001/api/tenant/receipt/${requestId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rent_receipt_${requestId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Receipt downloaded successfully");
    } catch (error) {
      console.error("Receipt error:", error);
      toast.error(error.response?.data?.message || "Failed to download receipt");
    } finally {
      toast.dismiss("receipt-loading");
    }
  };

  return (
    <Layout>
      <div className={styles.rentHistoryContainer}>
        <div className={styles.header}>
          <h1>Rent Payment History</h1>
          <p className={styles.subtitle}>View and manage your rent payments</p>
        </div>

        {isLoading ? (
          <div className={styles.skeletonContainer}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={styles.rentCardSkeleton}>
                <Skeleton variant="rectangular" height={150} />
              </div>
            ))}
          </div>
        ) : rentRequests.length === 0 ? (
          <div className={styles.emptyState}>
            <FaMoneyBillWave size={48} className={styles.emptyIcon} />
            <h3>No Rent Payments Found</h3>
            <p>You haven't made any rent payments yet</p>
          </div>
        ) : (
          <div className={styles.rentCardsContainer}>
            {rentRequests.map((request) => (
              <div key={request._id} className={styles.rentCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.apartmentInfo}>
                    <FaHome className={styles.apartmentIcon} />
                    <span>{request.propertyId?.name || "My Apartment"}</span>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[`statusBadge${request.status}`]}`}>
                    {getStatusIcon(request.status)}
                    <span>{request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || "Unknown"}</span>
                  </div>
                </div>

                <div className={styles.rentDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Amount:</span>
                    <span className={styles.detailValue}>₦{request.amount?.toLocaleString() || "0"}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Duration:</span>
                    <span className={styles.detailValue}>{request.rentDuration || "N/A"}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <FaCalendarAlt className={styles.detailIcon} />
                    <span>
                      {formatDate(request.rentStartDate)} - {formatDate(request.rentEndDate)}
                    </span>
                  </div>
                  {request.transactionReference && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Reference:</span>
                      <span className={styles.detailValue}>{request.transactionReference}</span>
                    </div>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  {request.status === "pending" ? (
                    <a
                      href={request.paymentLink || "#"}
                      className={styles.payButton}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !request.paymentLink && e.preventDefault()}
                    >
                      <FaMoneyBillWave />
                      Pay Now
                    </a>
                  ) : (
                    <button
                    className={styles.receiptButton}
                    onClick={() => router.push(`/tenant/receipt/${request._id}`)}
                  >
                    <FaDownload />
                    Download Receipt
                  </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RentHistoryPage;