"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandlordForm from "./components/LandlordForm";
import TenantForm from "./components/TenantForm";
import styles from "./onboarding.module.scss";

const Onboarding = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasPaidBefore, setHasPaidBefore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("🔄 Fetching user data...");

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("❌ User ID missing in frontend");
          setError("User ID missing. Please log in again.");
          return;
        }

        console.log(`🔍 Fetching user with ID: ${userId}`);

        const response = await fetch(`http://localhost:5001/api/auth/user?userId=${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`❌ Failed to fetch user: ${await response.text()}`);
        }

        const data = await response.json();
        console.log("✅ User data received:", data);

        setUser(data);

        if (data?.onboarding) {
          console.log("🔀 User already onboarded. Redirecting...");
          router.push(data.role === "Landlord" ? "/landlord/overview" : "/tenant/dashboard");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error.message);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const calculateRentEndDate = (startDate, duration) => {
    const date = new Date(startDate);
    switch (duration) {
      case "Annual":
        date.setFullYear(date.getFullYear() + 1);
        break;
      case "Bi-Annual":
        date.setMonth(date.getMonth() + 6);
        break;
      case "Quarterly":
        date.setMonth(date.getMonth() + 3);
        break;
      case "Monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      default:
        break;
    }
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const prepareLandlordPayload = (formData) => ({
    role: user.role,
    onboardingData: {
      nationality: formData.nationality,
      inDiaspora: formData.inDiaspora,
      dateOfBirth: formData.dateOfBirth,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountHolderName: formData.accountHolderName,
      property: formData.property || {},
    },
  });

  const prepareTenantPayload = (formData) => {
    const payload = {
      userId: user._id,
      landlordId: user.landlord,
      propertyUniqueId: formData.propertyUniqueId,
      ethnicGroup: formData.ethnicGroup,
      stateOfOrigin: formData.stateOfOrigin,
      maritalStatus: formData.maritalStatus,
      education: formData.education,
      employment: {
        employerName: formData.employerName,
        employerAddress: formData.employerAddress,
        employerWebsite: formData.employerWebsite,
        employerEmail: formData.employerEmail,
        jobRole: formData.jobRole,
        monthlyIncome: formData.monthlyIncome,
      },
      bankDetails: {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
      },
      roomDescription: formData.roomDescription, // Include roomDescription for all tenants
    };

    if (formData.hasPaidBefore) {
      if (!formData.rentStartDate) {
        throw new Error("Please provide a Rent Start Date.");
      }
      payload.rentStartDate = formData.rentStartDate;
      payload.rentEndDate = calculateRentEndDate(formData.rentStartDate, formData.rentDuration);
      payload.rentDuration = formData.rentDuration;
      payload.rentAmount = formData.rentAmount;
    }

    return {
      role: user.role,
      onboardingData: payload,
    };
  };

  const handleOnboardingComplete = async (formData) => {
    setSubmitting(true);
    setError(null);

    try {
      console.log("🚀 Starting onboarding process...", formData);

      const token = localStorage.getItem("token");

      if (!user) {
        throw new Error("User data is missing.");
      }

      console.log("📩 Submitting onboarding data...");

      const apiEndpoint =
        user.role === "Landlord"
          ? "http://localhost:5001/api/auth/onboarding"
          : "http://localhost:5001/api/tenant/onboarding";

      const requestBody =
        user.role === "Landlord"
          ? prepareLandlordPayload(formData)
          : prepareTenantPayload(formData);

      console.log("📦 Final Payload being sent:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`❌ Onboarding failed: ${errorData.message}`);
      }

      console.log("✅ Onboarding completed successfully!");
      router.push(user.role === "Landlord" ? "/landlord/overview" : "/tenant/dashboard");
    } catch (error) {
      console.error("❌ Error during onboarding process:", error.message);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.onboardingContainer}>
      <h1>Welcome, {user?.name}!</h1>
      <p>We just need a little more information about you to help set up your account.</p>
      {error && <p className={styles.error}>{error}</p>}
      {user?.role === "Landlord" ? (
        <LandlordForm onComplete={handleOnboardingComplete} />
      ) : (
        <TenantForm
          onComplete={handleOnboardingComplete}
          setHasPaidBefore={setHasPaidBefore}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default Onboarding;