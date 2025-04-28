'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiHome, FiPlus, FiChevronDown } from 'react-icons/fi';
import styles from './tenants.module.scss';
import Layout from '@/components/layout/layout';

const TenantsDashboard = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [expandedProperties, setExpandedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/landlord/tenants', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const { data } = await res.json();
        setProperties(data);
        if (data.length > 0) {
          setExpandedProperties([data[0].propertyId]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleProperty = (propertyId) => {
    setExpandedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  if (loading) return (
    <div className={styles.loadingState}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading your properties...</p>
    </div>
  );

  return (
    <Layout>
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Tenant Management</h1>
          <p>Manage all tenants across your properties</p>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={styles.primaryButton}
        >
          <FiPlus /> Advertise Vacancy
        </motion.button>
      </header>

      <div className={styles.propertyCards}>
        {properties.map(property => (
          <motion.div 
            key={property.propertyId}
            className={styles.propertyCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className={styles.propertyHeader}
              onClick={() => toggleProperty(property.propertyId)}
            >
              <div className={styles.propertyInfo}>
                <div className={styles.propertyIcon}>
                  <FiHome />
                </div>
                <div>
                  <h2>{property.propertyName}</h2>
                  <p>{property.address}</p>
                </div>
              </div>
              <div className={styles.propertyMeta}>
                <span className={styles.tenantCount}>
                  {property.tenants.length} {property.tenants.length === 1 ? 'tenant' : 'tenants'}
                </span>
                <motion.div
                  animate={{ rotate: expandedProperties.includes(property.propertyId) ? 180 : 0 }}
                >
                  <FiChevronDown />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {expandedProperties.includes(property.propertyId) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.tenantSection}
                >
                  {property.tenants.length > 0 ? (
                    <div className={styles.tenantsGrid}>
                      {property.tenants.map(tenant => (
                        <motion.div
                          key={tenant.tenantId}
                          whileHover={{ y: -3 }}
                          className={styles.tenantCard}
                        >
                          <div className={styles.tenantAvatar}>
                            {tenant.userDetails.name.charAt(0)}
                          </div>
                          <div className={styles.tenantDetails}>
                            <h3>{tenant.userDetails.name}</h3>
                            <p className={styles.roomTag}>{tenant.roomDescription}</p>
                            <div className={styles.tenantContact}>
                              <span><FiMail /> {tenant.userDetails.email}</span>
                              <span><FiPhone /> {tenant.userDetails.phoneNumber}</span>
                            </div>
                          </div>
                          <div className={styles.tenantActions}>
                            <button 
                              className={styles.secondaryButton}
                              onClick={() => router.push(`/landlord/tenants/details/${tenant.tenantId}`)}
                            >
                              View Profile
                            </button>
                            <button 
                              className={styles.primaryButtonSmall}
                              onClick={() => router.push(`/landlord/request-rent/${tenant.tenantId}`)}
                            >
                              Request Rent
                            </button>
                            <button 
                              className={styles.deletebutton}
                              onClick={() => router.push(`/landlord/request-rent/${tenant.tenantId}`)}
                            >
                          Remove 
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIllustration}>
                        <FiUser size={48} />
                      </div>
                      <h3>No tenants in this property</h3>
                      <p>Advertise to find qualified tenants for {property.propertyName}</p>
                      <button className={styles.primaryButtonSmall}>
                        <FiPlus /> Advertise Vacancy
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default TenantsDashboard;