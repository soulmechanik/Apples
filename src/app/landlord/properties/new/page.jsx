"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/layout";
import styles from "./propertyForm.module.scss";
import axios from "axios";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    address: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
  
      // Decode the token to get landlordId
      const { userId } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      if (!userId) throw new Error("Invalid token data");
  
      const response = await axios.post("http://localhost:5001/api/properties/create", {
        ...formData,
        landlordId: userId, // ✅ Send the actual landlordId
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("✅ Property created:", response.data);
      router.push("/landlord/properties");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create property");
      console.error("❌ Error creating property:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <div className={styles.container}>
        <h2>Add New Property</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="residential">Residential</option>
            <option value="apartment">Apartment</option>
            <option value="commercial">Commercial</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Property"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PropertyForm;
