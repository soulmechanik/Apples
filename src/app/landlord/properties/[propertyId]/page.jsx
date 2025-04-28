"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Layout from "../../../../components/layout/layout";
import styles from "./propertyDetails.module.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, Skeleton } from "@mui/material";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${propertyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("📩 API Response:", data); // ✅ Debugging log

        setProperty({
          ...data.property, // ✅ Ensure we use `data.property`
          tenants: data.tenants || [], // ✅ Ensure tenants is always an array
          totalMaintenanceRequests: data.totalMaintenanceRequests || 0,
          totalRevenue: data.totalRevenue || 0,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load property details. Please try again.");
        console.error("❌ Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return (
      <Layout>
        <div className={styles.container}>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="rectangular" width="100%" height={300} />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.container}>
          <h2 className={styles.title}>{error}</h2>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className={styles.container}>
          <h2 className={styles.title}>Property Not Found</h2>
        </div>
      </Layout>
    );
  }

  console.log("📌 Property ID in PropertyDetails:", property._id); // ✅ Debugging log

  return (
    <Layout>
      <div className={styles.container}>
        {/* Property Details Card */}
        <div className={styles.propertyCard}>
          <img src={property.image || "/default-property.jpeg"} alt={property.name} className={styles.propertyImage} />
          <div className={styles.propertyInfo}>
            <h2>{property.name}</h2>
            <div className={styles.infoRow}>
              <InfoCard label="Property Name" value={property.name} />
              <InfoCard label="Address" value={property.address} />
              <InfoCard label="Property Unique ID" value={property.propertyUniqueID} />
            </div>
          </div>
        </div>

        {/* Tenants List */}
        <div className={styles.tenantsSection}>
          <div className={styles.addTenantBtnContainer}>
            <Button
              variant="contained"
              className={styles.addTenantBtn}
              onClick={() => router.push(`/landlord/properties/${property._id}/invite-tenant`)}
            >
              Add Tenant
            </Button>
          </div>
          <h3 className={styles.tenantsListHeader}>Tenants List</h3>

          <div className={styles.tenantsHeader}>
            <span>Tenant Name</span>
            <span>Unit</span>
            <span>Email</span>
            <span>Action</span>
          </div>

          <div className={styles.tenantsContainer}>
            {property.tenants.length > 0 ? (
              property.tenants.map((tenant) => (
                <TenantRow key={tenant._id} tenant={tenant} propertyId={property._id} router={router} />
              ))
            ) : (
              <p>No tenants found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

/* 🎯 Reusable Info Card */
const InfoCard = ({ label, value }) => (
  <div className={styles.infoCard}>
    <strong>{label}:</strong> {value}
  </div>
);

/* 🎯 Reusable Tenant Row */
const TenantRow = ({ tenant, propertyId, router }) => {
  return (

  
    <div className={styles.tenantRow}>
      <span>{tenant.userId?.name || "N/A"}</span>
      <span>{tenant.roomDescription || "N/A"}</span>
      <span>{tenant.userId?.email || "N/A"}</span>
      <div className={styles.tenantActions}>
        <Button
          variant="outlined"
          className={styles.checkTenantBtn}
          onClick={() => router.push(`/landlord/tenants/details/${tenant._id}`)}
        >
          Profile
        </Button>
        <Button
          variant="contained"
          className={styles.requestRentBtn}
          onClick={() => router.push(`/landlord/request-rent/${tenant._id}`)}
        >
          Request Rent
        </Button>
        <Button  
          variant="contained"
          className={styles.delete}
          onClick={() => console.log(`Deleting ${tenant.userId?.name || "N/A"}`)}
        >
          DELETE
        </Button>
      </div>
    </div>

    
  );

 
};

export default PropertyDetails;