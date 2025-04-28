"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../../../../components/layout/layout";
import { useParams } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaMoneyBillWave, FaBriefcase, FaCheckCircle, FaPlayCircle, FaClock } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Import timeline styles
import styles from "./tenantProfile.module.scss";

const TenantProfile = () => {
  const [loading, setLoading] = useState(true);
  const [tenant, setTenant] = useState(null);
  const [rentRequests, setRentRequests] = useState([]); // State for rent requests
  const [error, setError] = useState(null);
  const { tenantId } = useParams();

  useEffect(() => {
    if (!tenantId) {
      setError("Authentication error: Tenant ID not found.");
      setLoading(false);
      return;
    }

    const fetchTenantAndRentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token missing.");
          return;
        }

        // Fetch tenant details
        const tenantResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tenant/details/${tenantId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        

        if (!tenantResponse.ok) {
          throw new Error(`Error ${tenantResponse.status}: ${await tenantResponse.text()}`);
        }

        const tenantData = await tenantResponse.json();
        setTenant(tenantData);

        // Fetch rent requests for the tenant
        const rentResponse = await fetch(`http://localhost:5001/api/rentrequest/tenant/${tenantId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (rentResponse.status === 404) {
          // Handle 404 specifically - it's not an error, just no rent requests
          setRentRequests([]);
        } else if (!rentResponse.ok) {
          throw new Error(`Error ${rentResponse.status}: ${await rentResponse.text()}`);
        } else {
          const rentData = await rentResponse.json();
          setRentRequests(rentData); // Set all rent requests
        }
      } catch (err) {
        setError(err.message || "Failed to fetch tenant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenantAndRentDetails();
  }, [tenantId]);

  // Function to get the icon and color based on rentCycleStatus
  const getStatusIconAndColor = (rentCycleStatus) => {
    switch (rentCycleStatus) {
      case "Active":
        return { icon: <FaPlayCircle />, color: "#7c3aed" }; // Light purple for Active
      case "Completed":
        return { icon: <FaCheckCircle />, color: "#7c3aed" }; // Light purple for Completed
      case "Pending":
        return { icon: <FaClock />, color: "#7c3aed" }; // Light purple for Pending
      default:
        return { icon: <FaClock />, color: "#7c3aed" }; // Default to light purple
    }
  };

  return (
    <Layout>
      <div className={styles.tenantContainer}>
        {loading ? (
          <p className={styles.loading}>Loading tenant details...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          tenant && (
            <div className={styles.tenantProfile}>
              {/* Profile Header */}
              <div className={styles.profileHeader}>
                <div className={styles.profileImage}>
                  <FaUser className={styles.icon} />
                </div>
                <div className={styles.profileInfo}>
                  <h2>{tenant.user?.name}</h2>
                  {/* <p>Tenant ID: {tenant._id}</p> */}
                </div>
              </div>

              {/* Contact Details */}
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <p>{tenant.user?.email}</p>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <p>{tenant.user?.phoneNumber}</p>
                </div>
                <div className={styles.contactItem}>
                  <FaHome className={styles.contactIcon} />
                  <p>{tenant.roomDescription || "N/A"}</p>
                </div>
              </div>

              {/* Other Details (Employment, Bank, Personal Info) */}
              <div className={styles.detailsSection}>
                {/* Employment Details */}
                <div className={styles.detailsBlock}>
                  <h3><FaBriefcase /> Employment Details</h3>
                  <div className={styles.detailsContent}>
                    <p><strong>Employer:</strong> {tenant.employment?.employerName || "N/A"}</p>
                    <p><strong>Email:</strong> {tenant.employment?.employerEmail || "N/A"}</p>
                    <p><strong>Address:</strong> {tenant.employment?.employerAddress || "N/A"}</p>
                    <p><strong>Monthly Salary:</strong> ₦{tenant.employment?.monthlyIncome?.toLocaleString() || "N/A"}</p>
                  </div>
                </div>

                {/* Bank Details */}
                <div className={styles.detailsBlock}>
                  <h3>Bank Details</h3>
                  <div className={styles.detailsContent}>
                    <p><strong>Bank Name:</strong> {tenant.bankDetails?.bankName || "N/A"}</p>
                    <p><strong>Account Number:</strong> {tenant.bankDetails?.accountNumber || "N/A"}</p>
                  </div>
                </div>

                {/* Personal Info */}
                <div className={styles.detailsBlock}>
                  <h3>Personal Info</h3>
                  <div className={styles.detailsContent}>
                    <p><strong>Education:</strong> {tenant.education || "N/A"}</p>
                    <p><strong>Ethnic Group:</strong> {tenant.ethnicGroup || "N/A"}</p>
                    <p><strong>Marital Status:</strong> {tenant.maritalStatus || "N/A"}</p>
                    <p><strong>State of Origin:</strong> {tenant.stateOfOrigin || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Rent Cycles Section */}
              <div className={styles.rentCycles}>
                <h3><FaMoneyBillWave /> Rent Cycles</h3>
                {rentRequests.length > 0 ? (
                  <VerticalTimeline
                    lineColor="#e5e7eb" // Light gray timeline line
                  >
                    {rentRequests.map((request) => {
                      const { icon, color } = getStatusIconAndColor(request.rentCycleStatus);
                      return (
                        <VerticalTimelineElement
                          key={request._id}
                          className="vertical-timeline-element--work"
                          contentStyle={{
                            background: "#ffffff", // White background
                            color: "#1f2937", // Dark gray text
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Subtle shadow
                            borderRadius: "12px", // Rounded corners
                          }}
                          contentArrowStyle={{
                            borderRight: "7px solid #ffffff", // White arrow
                          }}
                          date={`${new Date(request.rentStartDate).toLocaleDateString()} - ${new Date(request.rentEndDate).toLocaleDateString()}`}
                          iconStyle={{
                            background: color, // Light purple icon background
                            color: "#ffffff", // White icon color
                            boxShadow: "0 0 0 4px #ffffff, 0 4px 12px rgba(0, 0, 0, 0.1)", // White border and shadow
                          }}
                          icon={icon} // Icon based on rentCycleStatus
                        >
                          <h4 className="vertical-timeline-element-title">Rent Cycle</h4>
                          <div className={styles.rentDetails}>
                            <p><strong>Amount:</strong> ₦{request.amount?.toLocaleString()}</p>
                            <p><strong>Duration:</strong> {request.rentDuration}</p>
                            <p><strong>Payment Status:</strong> {request.status}</p>
                            {request.status === "paid" && (
                              <p><strong>Paid At:</strong> {new Date(request.paidAt).toLocaleDateString()}</p>
                            )}
                            <p><strong>Tenancy Status:</strong> {request.rentCycleStatus}</p>
                            <p><strong>Payment Method:</strong> {request.paymentMethod}</p>
                            <p><strong>Created At:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                          </div>
                        </VerticalTimelineElement>
                      );
                    })}
                  </VerticalTimeline>
                ) : (
                  <div className={styles.noRentRequests}>
                    <p>No rent cycles found for this tenant.</p>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default TenantProfile;