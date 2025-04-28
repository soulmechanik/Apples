"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../../../components/layout/layout";
import styles from "./requestRent.module.scss";
import { 
  FaMoneyBillWave, 
  FaCalendar, 
  FaStickyNote, 
  FaUniversity, 
  FaCreditCard,
  FaExclamationTriangle,
  FaSpinner,
  FaUser,
  FaArrowLeft,
  FaTools
} from "react-icons/fa";

const RequestRent = () => {
  const { tenantId } = useParams();
  const router = useRouter();
  const [tenant, setTenant] = useState(null);
  const [landlordBank, setLandlordBank] = useState(null);
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [formattedServiceCharge, setFormattedServiceCharge] = useState("");
  const [rentDuration, setRentDuration] = useState("");
  const [rentStartDate, setRentStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantAndBankDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token missing.");

        const [tenantResponse, bankResponse] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/tenant/details/${tenantId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/bank-details`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        ]);

        if (!tenantResponse.ok) {
          throw new Error(await tenantResponse.text() || "Failed to fetch tenant details");
        }

        if (!bankResponse.ok) {
          throw new Error(await bankResponse.text() || "Failed to fetch bank details");
        }

        const [tenantData, bankData] = await Promise.all([
          tenantResponse.json(),
          bankResponse.json()
        ]);

        setTenant(tenantData);
        setLandlordBank(bankData);
      } catch (err) {
        setError({
          type: "general",
          message: err.message || "Failed to load details"
        });
      }
    };

    if (tenantId) fetchTenantAndBankDetails();
  }, [tenantId]);

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    return new Intl.NumberFormat('en-NG').format(Number(numericValue));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setAmount(value.replace(/\D/g, ""));
    setFormattedAmount(formattedValue);
  };

  const handleServiceChargeChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setServiceCharge(value.replace(/\D/g, ""));
    setFormattedServiceCharge(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!amount || !serviceCharge || !rentDuration || !rentStartDate) {
      setError({
        type: "validation",
        message: "Please fill in all required fields including service charge"
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/request-rent", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          tenantId, 
          amount: parseFloat(amount),
          serviceCharge: parseFloat(serviceCharge),
          rentDuration, 
          rentStartDate,
          description 
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Request failed");
      }

      alert("Rent request sent successfully!");
      setTimeout(() => router.push("/landlord/transactions"), 1500);
    } catch (err) {
      setError({
        type: err.message.includes("Amount exceeds") ? "limit" : "general",
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <FaArrowLeft /> Back
        </button>
        
        <div className={styles.header}>
          <h1 className={styles.title}>
            Request Rent Payment
          </h1>
          <p className={styles.subtitle}>Create a payment request for your tenant</p>
        </div>

        {error && (
          <div className={`${styles.errorCard} ${error.type === 'limit' ? styles.limitError : ''}`}>
            <FaExclamationTriangle className={styles.errorIcon} />
            <div className={styles.errorContent}>
              <h3>
                {error.type === 'limit' 
                  ? 'Payment Limit Exceeded' 
                  : error.type === 'validation' 
                    ? 'Missing Information' 
                    : 'Error Occurred'}
              </h3>
              <p>{error.message}</p>
              {error.type === 'limit' && (
                <div className={styles.errorActions}>
                  <button 
                    className={styles.errorButton}
                    onClick={() => {
                      setError(null);
                      document.getElementById("amountInput")?.focus();
                    }}
                  >
                    Adjust Amount
                  </button>
                  <a 
                    href="https://wa.me/2348094793447" 
                    className={styles.errorContact}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaUniversity className={styles.whatsappIcon} /> Contact Support
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {loading && !tenant ? (
          <div className={styles.loader}>
            <FaSpinner className={styles.spinner} />
            <p>Loading tenant details...</p>
          </div>
        ) : tenant ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <FaUser className={styles.sectionIcon} /> Tenant Information
              </h2>
              <div className={styles.inputGroup}>
                <label>Tenant Name</label>
                <div className={styles.readOnlyField}>{tenant.user?.name || "N/A"}</div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <FaMoneyBillWave className={styles.sectionIcon} /> Payment Details
              </h2>
              
              <div className={styles.inputRow}>
                <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
                  <label htmlFor="amountInput">
                    Base Rent (₦)
                  </label>
                  <div className={styles.amountInputContainer}>
                    <span className={styles.currencySymbol}>₦</span>
                    <input
                      id="amountInput"
                      type="text"
                      value={formattedAmount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      className={styles.amountInput}
                      required
                    />
                  </div>
                </div>

                <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
                  <label htmlFor="serviceChargeInput">
                    <FaTools className={styles.inlineIcon} /> Service Charge (₦)
                  </label>
                  <div className={styles.amountInputContainer}>
                    <span className={styles.currencySymbol}>₦</span>
                    <input
                      id="serviceChargeInput"
                      type="text"
                      value={formattedServiceCharge}
                      onChange={handleServiceChargeChange}
                      placeholder="0.00"
                      className={styles.amountInput}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.feeNote}>
                <p>Forems software fee: <strong>₦20,000</strong> will be added automatically</p>
              </div>

              <div className={styles.inputRow}>
                <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
                  <label htmlFor="duration">
                    Rent Duration
                  </label>
                  <select
                    id="duration"
                    value={rentDuration}
                    onChange={(e) => setRentDuration(e.target.value)}
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="Annual">Annual</option>
                    <option value="Bi-Annual">Bi-Annual (6 months)</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
                  <label htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={rentStartDate}
                    onChange={(e) => setRentStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., Rent for Q1 2024, including maintenance fee"
                  rows={4}
                />
              </div>
            </div>

            {landlordBank && (
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <FaUniversity className={styles.sectionIcon} /> Payment Destination
                </h2>
                <div className={styles.bankCard}>
                  <div className={styles.bankDetail}>
                    <div className={styles.bankIconContainer}>
                      <FaUniversity className={styles.bankIcon} />
                    </div>
                    <div className={styles.bankText}>
                      <p className={styles.bankLabel}>Bank Name</p>
                      <p className={styles.bankValue}>{landlordBank.bankName}</p>
                    </div>
                  </div>
                  <div className={styles.bankDetail}>
                    <div className={styles.bankIconContainer}>
                      <FaCreditCard className={styles.bankIcon} />
                    </div>
                    <div className={styles.bankText}>
                      <p className={styles.bankLabel}>Account Number</p>
                      <p className={styles.bankValue}>{landlordBank.accountNumber}</p>
                    </div>
                  </div>
                  <div className={styles.bankDetail}>
                    <div className={styles.bankIconContainer}>
                      <FaUser className={styles.bankIcon} />
                    </div>
                    <div className={styles.bankText}>
                      <p className={styles.bankLabel}>Account Name</p>
                      <p className={styles.bankValue}>{landlordBank.accountHolderName}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className={styles.buttonSpinner} /> Processing...
                  </>
                ) : (
                  "Send Payment Request"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.loader}>
            <FaSpinner className={styles.spinner} />
            <p>Loading tenant details...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RequestRent;