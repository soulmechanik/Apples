"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import styles from "./properties.module.scss";
import { FiHome, FiUsers, FiPlus, FiMapPin, FiLayers, FiSettings, FiDollarSign } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { Tooltip } from "@mui/material";

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalTenants, setTotalTenants] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("❌ No token found");
          return;
        }

        const response = await axios.get("http://localhost:5001/api/properties/by-landlord", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        console.log("✅ Fetched Properties Data:", data);

        if (!data.properties || !Array.isArray(data.properties)) {
          console.error("❌ Unexpected API response format");
          return;
        }

        setProperties(data.properties);
        setTotalProperties(data.properties.length);

        const { tenantsCount, totalRevenue } = data.properties.reduce(
          (acc, property) => ({
            tenantsCount: acc.tenantsCount + (property.tenants || 0),
            totalRevenue: acc.totalRevenue + (property.monthlyRent * (property.tenants || 0) || 0)
          }),
          { tenantsCount: 0, totalRevenue: 0 }
        );

        setTotalTenants(tenantsCount);
        setTotalRevenue(totalRevenue);
      } catch (error) {
        console.error("❌ Error fetching properties:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const propertyTypes = {
    residential: { color: "#7a5af8", icon: <FiHome /> },
    commercial: { color: "#10b981", icon: <FiLayers /> },
    industrial: { color: "#f59e0b", icon: <FiSettings /> }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Property Portfolio</h1>
          <Tooltip title="Add new property" arrow>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="properties/new" className={styles.addButton}>
                <FiPlus /> New Property
              </Link>
            </motion.div>
          </Tooltip>
        </div>

        {/* Metrics Dashboard */}
        <div className={styles.metricsDashboard}>
          {loading ? (
            [...Array(3)].map((_, index) => (
              <div key={index} className={styles.metricCard}>
                <Skeleton variant="rounded" width="100%" height={120} />
              </div>
            ))
          ) : (
            <>
              <motion.div 
                className={styles.metricCard}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.metricIcon} style={{ background: "rgba(122, 90, 248, 0.1)" }}>
                  <FiHome size={24} color="#7a5af8" />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricLabel}>Total Properties</span>
                  <span className={styles.metricValue}>{totalProperties}</span>
                </div>
              </motion.div>

              <motion.div 
                className={styles.metricCard}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.metricIcon} style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                  <FiUsers size={24} color="#10b981" />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricLabel}>Total Tenants</span>
                  <span className={styles.metricValue}>{totalTenants}</span>
                </div>
              </motion.div>

              {/* <motion.div 
                className={styles.metricCard}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.metricIcon} style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                  <FiDollarSign size={24} color="#f59e0b" />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricLabel}>Total Revenue</span>
                  <span className={styles.metricValue}>{formatCurrency(totalRevenue)}</span>
                </div>
              </motion.div> */}
            </>
          )}
        </div>

        {/* Property Grid */}
        <div className={styles.propertyGrid}>
          {loading
            ? [...Array(4)].map((_, index) => (
                <div key={index} className={styles.propertyCardSkeleton}>
                  <Skeleton variant="rounded" width="100%" height={280} />
                </div>
              ))
            : properties.map((property) => {
                const propertyRevenue = property.monthlyRent * (property.tenants || 0) || 0;
                return (
                  <motion.div 
                    key={property._id}
                    className={styles.propertyCard}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(property._id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div 
                      className={styles.propertyImage}
                      style={{ 
                        background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('/default-property.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className={styles.propertyType} style={{ 
                        background: propertyTypes[property.type]?.color || '#7a5af8'
                      }}>
                        {propertyTypes[property.type]?.icon || <FiHome />}
                        <span>{property.type}</span>
                      </div>
                    </div>

                    <div className={styles.propertyDetails}>
                      <div className={styles.propertyHeader}>
                        <h3>{property.name}</h3>
                        <div className={styles.propertyLocation}>
                          <FiMapPin size={14} />
                          <span>{property.state}</span>
                        </div>
                      </div>

                      <div className={styles.propertyStats}>
                        <div className={styles.statItem}>
                          <FiUsers size={16} />
                          <span>{property.tenants || 0} tenants</span>
                        </div>
                        {/* <div className={styles.statItem}>
                          <FiDollarSign size={16} />
                          <span>{formatCurrency(propertyRevenue)}/mo</span>
                        </div> */}
                      </div>

                      <AnimatePresence>
                        {hoveredCard === property._id && (
                          <motion.div 
                            className={styles.propertyActions}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            <Link 
                              href={`/landlord/properties/${property._id}`} 
                              className={styles.manageButton}
                            >
                              Manage Property
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </Layout>
  );
};

export default Properties;