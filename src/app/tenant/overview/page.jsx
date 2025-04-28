"use client";
import React, { useState, useEffect } from "react";
import styles from "./overview.module.scss";
import { 
  FaSync, 
  FaMoneyBill, 
  FaHome, 
  FaFileAlt,
  FaChartLine,
  FaTools,
  FaBell,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaIdCard,
  FaUser
} from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import Layout from "../../../components/Tenantlayout/Layout";
import { 
  WidgetsOutlined, 
  ArrowForward,
  ReceiptOutlined,
  PaymentOutlined,
  MailOutline,
  SettingsOutlined
} from "@mui/icons-material";
import { Skeleton, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { format, differenceInDays } from "date-fns";

const TenantOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tenantData, setTenantData] = useState(null);
  const [rentRequests, setRentRequests] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No token found, redirecting to login...");
          return;
        }

        const response = await axios.get("http://localhost:5001/api/tenant/{tenantId}", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { tenant, rentRequests, maintenanceRequests } = response.data;
        
        setTenantData(tenant);
        setRentRequests(rentRequests);
        setMaintenanceRequests(maintenanceRequests);

      } catch (error) {
        console.error("❌ Error fetching tenant data:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenantData();
  }, []);

  // NEW: Improved rent data calculation
  const getRentDisplayData = () => {
    if (!rentRequests || rentRequests.length === 0) {
      return { 
        showCard: false,
        message: "No rent history",
        isValid: false
      };
    }

    // Get all paid requests sorted by payment date (newest first)
    const paidRequests = rentRequests
      .filter(req => req.status === "paid")
      .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));

    if (paidRequests.length === 0) {
      return {
        showCard: false,
        message: "No completed payments",
        isValid: false
      };
    }

    const latestPayment = paidRequests[0];
    const now = new Date();
    const startDate = new Date(latestPayment.rentStartDate);
    const endDate = new Date(latestPayment.rentEndDate);

    let status;
    if (now < startDate) {
      status = "upcoming";
    } else if (now >= startDate && now <= endDate) {
      status = "active";
    } else {
      status = "expired";
    }

    return {
      showCard: true,
      isValid: true,
      amount: latestPayment.amount,
      duration: latestPayment.rentDuration,
      startDate: latestPayment.rentStartDate,
      endDate: latestPayment.rentEndDate,
      paidAt: latestPayment.paidAt,
      status,
      daysRemaining: status === "active" ? differenceInDays(endDate, now) : 0,
      daysExpired: status === "expired" ? differenceInDays(now, endDate) : 0,
      daysUntilStart: status === "upcoming" ? differenceInDays(startDate, now) : 0
    };
  };

  const getActiveLeaseStatus = () => {
    const rentDisplay = getRentDisplayData();
    
    if (!rentDisplay.isValid) {
      return { 
        status: "No Lease Data", 
        color: "var(--error-color)" 
      };
    }

    switch (rentDisplay.status) {
      case "active":
        return { 
          status: "Active", 
          color: "var(--success-color)" 
        };
      case "upcoming":
        return { 
          status: "Upcoming", 
          color: "var(--warning-color)" 
        };
      case "expired":
        return { 
          status: "Expired", 
          color: "var(--error-color)" 
        };
      default:
        return { 
          status: "Inactive", 
          color: "var(--error-color)" 
        };
    }
  };

  const getOpenMaintenanceRequests = () => {
    if (!maintenanceRequests) return 0;
    return maintenanceRequests.filter(req => req.status !== "completed").length;
  };

  const getInProgressMaintenanceRequests = () => {
    if (!maintenanceRequests) return 0;
    return maintenanceRequests.filter(req => req.status === "In Progress").length;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const formatTimeAgo = (date) => {
    if (!date) return "N/A";
    const dateObj = new Date(date);
    const seconds = Math.floor((new Date() - dateObj) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }
    return "Just now";
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return styles.statusCompleted;
      case "pending":
      case "in progress":
        return styles.statusPending;
      case "overdue":
        return styles.statusOverdue;
      default:
        return "";
    }
  };

  const rentDisplay = getRentDisplayData();
  const leaseStatus = getActiveLeaseStatus();
  const openMaintenanceRequests = getOpenMaintenanceRequests();
  const inProgressMaintenanceRequests = getInProgressMaintenanceRequests();

  return (
    <Layout>
      <div className={styles.dashboard}>
        {/* Header with Tabs */}
        <div className={styles.header}>
          <h1>Tenant Dashboard</h1>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "payments" ? styles.active : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "requests" ? styles.active : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryCards}>
          {[
            { 
              icon: <FaHome size={24} />, 
              label: "Current Rent", 
              value: rentDisplay.isValid ? (
                <div className={styles.rentValue}>
                  <div>₦{rentDisplay.amount.toLocaleString()}</div>
                  <div className={styles.rentDuration}>
                    {rentDisplay.duration} • {formatDate(rentDisplay.startDate)} - {formatDate(rentDisplay.endDate)}
                  </div>
                </div>
              ) : rentDisplay.message,
              trend: rentDisplay.isValid ? (
                <div className={styles.rentStatus}>
                  <span className={`
                    ${styles.statusBadge} 
                    ${styles[`status-${rentDisplay.status}`]}
                  `}>
                    {rentDisplay.status.toUpperCase()}
                  </span>
                  {rentDisplay.status === "active" && (
                    <span className={styles.daysRemaining}>
                      {rentDisplay.daysRemaining} days remaining
                    </span>
                  )}
                  {rentDisplay.status === "expired" && (
                    <span className={styles.daysExpired}>
                      Expired {rentDisplay.daysExpired} days ago
                    </span>
                  )}
                  {rentDisplay.status === "upcoming" && (
                    <span className={styles.daysUpcoming}>
                      Starts in {rentDisplay.daysUntilStart} days
                    </span>
                  )}
                </div>
              ) : null,
              color: rentDisplay.isValid ? 
                (rentDisplay.status === "active" ? "var(--success-color)" :
                 rentDisplay.status === "upcoming" ? "var(--warning-color)" :
                 "var(--error-color)") : 
                "var(--gray-500)"
            },
            { 
              icon: <FaFileAlt size={24} />, 
              label: "Lease Status", 
              value: leaseStatus.status,
              color: leaseStatus.color
            },
            { 
              icon: <FaUser size={24} />, 
              label: "User Information", 
              value: tenantData?.userId?.name || "N/A",
              trend: (
                <div className={styles.userInfoContainer}>
                  <div className={styles.userInfoItem}>
                    <span>Email:</span> {tenantData?.userId?.email || "N/A"}
                  </div>
                  <div className={styles.userInfoItem}>
                    <span>Phone:</span> {tenantData?.userId?.phoneNumber || "N/A"}
                  </div>
                </div>
              ),
              color: "var(--info-color)"
            },
          ].map((metric, index) => (
            <div className={styles.card} key={index} style={{ borderTop: `4px solid ${metric.color}` }}>
              {isLoading ? (
                <>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton width={120} height={24} />
                  <Skeleton width={80} height={32} />
                  <Skeleton width={100} height={16} />
                </>
              ) : (
                <>
                  <div className={styles.cardIcon} style={{ color: metric.color }}>
                    {metric.icon}
                  </div>
                  <span className={styles.cardLabel}>{metric.label}</span>
                  <h3 className={styles.cardValue}>{metric.value}</h3>
                  {metric.trend && (
                    <div className={styles.cardTrend}>
                      {metric.trend}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Rest of your component remains the same */}
        {/* Main Content */}
        <div className={styles.content}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Quick Actions Card */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <WidgetsOutlined />
                <h2>Quick Actions</h2>
                <button className={styles.refreshButton}>
                  <FaSync size={14} />
                </button>
              </div>
              <div className={styles.actionsGrid}>
                {isLoading ? (
                  [...Array(4)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" height={100} />
                  ))
                ) : (
                  [
                    { icon: <PaymentOutlined fontSize="large" />, text: 'Pay Rent', action: () => console.log('Pay Rent') },
                    { icon: <FaTools fontSize="large" />, text: 'Request Maintenance', action: () => console.log('Maintenance') },
                    { icon: <MailOutline fontSize="large" />, text: 'Contact Landlord', action: () => console.log('Contact') },
                    { icon: <FaQuestionCircle fontSize="large" />, text: 'Get Help', action: () => console.log('Help') }
                  ].map((action, index) => (
                    <button 
                      className={styles.actionCard} 
                      key={index}
                      onClick={action.action}
                    >
                      <div className={styles.actionIcon}>{action.icon}</div>
                      <span>{action.text}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* My Apartment Card */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaHome />
                <h2>My Apartment</h2>
              </div>
              <div className={styles.propertyDetails}>
                {isLoading ? (
                  <Skeleton variant="rectangular" height={200} />
                ) : (
                  <>
                    <div className={styles.propertyHeader}>
                      <h3>{tenantData?.propertyId?.name || "No property assigned"}</h3>
                      <span className={styles.propertyUnit}>{tenantData?.roomDescription || "No unit specified"}</span>
                    </div>
                    
                    <div className={styles.propertyInfo}>
                      <div className={styles.propertyInfoItem}>
                        <FaMapMarkerAlt className={styles.propertyIcon} />
                        <span>{tenantData?.propertyId?.address || "No address available"}</span>
                      </div>
                      <div className={styles.propertyInfoItem}>
                        <FaIdCard className={styles.propertyIcon} />
                        <span>Property ID: {tenantData?.propertyId?._id || "N/A"}</span>
                      </div>
                      <div className={styles.propertyInfoItem}>
                        <FaUser className={styles.propertyIcon} />
                        <span>Landlord ID: {tenantData?.landlordId || "N/A"}</span>
                      </div>
                    </div>
                    
                    <div className={styles.leaseInfo}>
  <div className={styles.leasePeriod}>
    {rentDisplay.isValid ? (
      <>
        <span>Rent Amount: ₦{rentDisplay.amount.toLocaleString()}</span>
        <span>Rent Duration: {rentDisplay.duration}</span>
        <span>Period: {formatDate(rentDisplay.startDate)} - {formatDate(rentDisplay.endDate)}</span>
      </>
    ) : (
      <>
        <span>Rent Amount: Not available</span>
        <span>Rent Duration: N/A</span>
      </>
    )}
  </div>
  <button className={styles.viewLeaseButton}>
    View Lease Agreement <ArrowForward fontSize="small" />
  </button>
</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Payment Breakdown */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaChartLine />
                <h2>Payment History</h2>
              </div>
              <div className={styles.chartContainer}>
                {isLoading ? (
                  <Skeleton variant="rectangular" height={300} />
                ) : (
                  <>
                    <PieChart
                      series={[{ 
                        data: [
                          { id: 0, value: 75, label: 'Rent', color: '#4e79a7' },
                          { id: 1, value: 15, label: 'Fees', color: '#f28e2b' },
                          { id: 2, value: 10, label: 'Deposits', color: '#e15759' }
                        ],
                        innerRadius: 60,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        cx: 150,
                        cy: 150,
                      }]}
                      width={isMobile ? 300 : 400}
                      height={300}
                      slotProps={{
                        legend: {
                          direction: isMobile ? 'row' : 'column',
                          position: { vertical: 'middle', horizontal: isMobile ? 'bottom' : 'right' },
                          padding: 0,
                          itemMarkWidth: 10,
                          itemMarkHeight: 10,
                          labelStyle: {
                            fontSize: 12,
                          },
                        },
                      }}
                    />
                    <div className={styles.chartSummary}>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Total Paid</span>
                        <span className={styles.summaryValue}>
                          ₦{rentRequests.reduce((sum, req) => sum + (req.status === "paid" ? req.amount : 0), 0).toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>On-time Payments</span>
                        <span className={styles.summaryValue}>
                          {rentRequests.length > 0 
                            ? `${Math.round((rentRequests.filter(req => req.status === "paid").length / rentRequests.length) * 100)}%` 
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recent Payments */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <ReceiptOutlined />
                <h2>Recent Payments</h2>
                <button className={styles.refreshButton}>
                  <FaSync size={14} />
                </button>
              </div>
              <div className={styles.paymentList}>
                {isLoading ? (
                  [...Array(3)].map((_, index) => (
                    <div key={index} className={styles.paymentItem}>
                      <Skeleton variant="rectangular" height={60} />
                    </div>
                  ))
                ) : rentRequests.length > 0 ? (
                  rentRequests
                    .filter(req => req.status === "paid") // Only show paid requests
                    .slice(0, 3)
                    .map((payment) => (
                      <div key={payment._id} className={styles.paymentItem}>
                        <div className={styles.paymentIcon}>
                          <FaMoneyBill />
                        </div>
                        <div className={styles.paymentDetails}>
                          <h4>Rent Payment ({payment.rentDuration})</h4>
                          <p>{formatDate(payment.createdAt)}</p>
                        </div>
                        <div className={styles.paymentAmount}>
                          <span>₦{payment.amount.toLocaleString()}</span>
                          <div className={`${styles.status} ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className={styles.noData}>
                    No payment history available
                  </div>
                )}
              </div>
              <button className={styles.viewAllButton}>
                View All Payments <ArrowForward fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TenantOverview;