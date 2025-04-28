"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./overview.module.scss";
import { FaMoneyBill, FaBuilding, FaUsers, FaChartBar, FaTools } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import Layout from "@/components/layout/layout";
import { Skeleton } from "@mui/material";
import axios from "axios";

const LandlordOverview = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalTenants, setTotalTenants] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [vacancyRate, setVacancyRate] = useState(0);

  const handleQuickAction = (action) => {
    switch(action) {
      case 'maintenance':
        router.push('/landlord/maintenancerequests');
        break;
      case 'properties':
        router.push('/landlord/properties');
        break;
      case 'rent':
        router.push('/landlord/tenants');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchLandlordData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No token found, redirecting to login...");
          return;
        }

        // Fetch properties and tenants count
        const propertiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/by-landlord`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const propertiesData = propertiesResponse.data;
        console.log("✅ Fetched Landlord Properties Data:", propertiesData);

        if (!propertiesData.properties || !Array.isArray(propertiesData.properties)) {
          console.error("❌ Unexpected properties API response format:", propertiesData);
          return;
        }

        setTotalProperties(propertiesData.properties.length);

        // Calculate total tenants and vacancy rate
        const tenantsCount = propertiesData.properties.reduce(
          (total, property) => total + (property.tenants || 0), 
          0
        );
        setTotalTenants(tenantsCount);
        
        const totalUnits = propertiesData.properties.reduce(
          (total, property) => total + (property.units || 0), 
          0
        );
        setVacancyRate(totalUnits > 0 ? Math.round(((totalUnits - tenantsCount) / totalUnits) * 100) : 0);

        // Fetch total revenue
        const revenueResponse = await axios.get("http://localhost:5001/api/landlord/revenue", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const revenueData = revenueResponse.data;
        console.log("💰 Total Revenue Data:", revenueData);
        setTotalRevenue(revenueData.totalRevenue || 0);

      } catch (error) {
        console.error("❌ Error fetching landlord data:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLandlordData();
  }, []);

  return (
    <Layout>
      <div className={styles.dashboard}>
        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          {[
            { 
              icon: <FaBuilding size={24} />, 
              label: "Total Properties", 
              value: totalProperties,
              trend: "5% from last month",
              color: styles.blueMetric
            },
            { 
              icon: <FaUsers size={24} />, 
              label: "Occupied Units", 
              value: totalTenants,
              trend: "From All properties",
              color: styles.greenMetric
            },
            { 
              icon: <FaChartBar size={24} />, 
              label: "Total Revenue", 
              value: `₦${totalRevenue.toLocaleString()}`,
           
              color: styles.purpleMetric
            },
           
          ].map((metric, index) => (
            <div className={`${styles.metricCard} ${metric.color}`} key={index}>
              <div className={styles.metricIcon}>{metric.icon}</div>
              <div className={styles.metricContent}>
                <h3>{isLoading ? <Skeleton width={120} /> : metric.value}</h3>
                <p>{metric.label}</p>
                <span className={styles.metricTrend}>
                  {isLoading ? <Skeleton width={80} /> : metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className={styles.dashboardContent}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionsGrid}>
                {[
                  {
                    icon: <FaTools size={20} />,
                    title: "Maintenance Request",
                    action: "maintenance",
                    color: styles.blueAction
                  },
                  {
                    icon: <FaBuilding size={20} />,
                    title: "Manage Properties",
                    action: "properties",
                    color: styles.greenAction
                  },
                  {
                    icon: <FaMoneyBill size={20} />,
                    title: "View All tenants",
                    action: "rent",
                    color: styles.purpleAction
                  }
                ].map((action, index) => (
                  <div 
                    className={`${styles.actionCard} ${action.color}`}
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <div className={styles.actionIcon}>{action.icon}</div>
                    <h4>{action.title}</h4>
                    <div className={styles.actionHoverEffect}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Chart */}
            <div className={styles.analyticsSection}>
              <h2 className={styles.sectionTitle}>Portfolio Analytics</h2>
              <div className={styles.chartContainer}>
                {isLoading ? (
                  <Skeleton variant="rectangular" height={300} />
                ) : (
                  <PieChart
                    series={[{
                      data: [
                        { id: 0, value: totalProperties, label: 'Properties', color: '#7a5af8' },
                        { id: 1, value: totalTenants, label: 'Occupied', color: '#10b981' },
                        { id: 2, value: vacancyRate, label: 'Vacancy', color: '#f59e0b' }
                      ],
                      innerRadius: 60,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 5,
                    }]}
                    width={400}
                    height={300}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Recent Activity */}
            <div className={styles.activitySection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <button className={styles.viewAllButton}>View All</button>
              </div>
              <div className={styles.activityList}>
                {isLoading ? (
                  [...Array(4)].map((_, index) => (
                    <div className={styles.activityItem} key={index}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <div className={styles.activityContent}>
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <img src="/images/activity-empty.svg" alt="No recent activity" />
                    <p>No recent activity to display</p>
                    <small>Your recent actions will appear here</small>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className={styles.performanceSection}>
              <h2 className={styles.sectionTitle}>Performance Metrics</h2>
              <div className={styles.metricsGridSmall}>
                {[
                  { label: "Collection Rate", value: "98%", trend: "up" },
                  { label: "Maintenance Response", value: "24h", trend: "down" },
                  { label: "Tenant Satisfaction", value: "4.8/5", trend: "up" },
                  { label: "Renewal Rate", value: "85%", trend: "steady" }
                ].map((metric, index) => (
                  <div className={styles.smallMetric} key={index}>
                    <h4>{metric.label}</h4>
                    <div className={styles.metricValue}>
                      <span>{metric.value}</span>
                      <span className={`${styles.trendIndicator} ${styles[metric.trend]}`}>
                        {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandlordOverview;