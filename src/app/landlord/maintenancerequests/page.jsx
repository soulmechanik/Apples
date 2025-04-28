'use client';
import { useState, useEffect } from 'react';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiFilter, 
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiUser,
  FiLock
} from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/layout';
import styles from './maintenance.module.scss';

const MAX_DESCRIPTION_LENGTH = 20;

const statusConfig = {
  Unread: { 
    color: '#ef4444', 
    bgColor: '#fee2e2',
    icon: <FiAlertCircle />,
    nextOptions: ['In Progress', 'Completed']
  },
  'In Progress': { 
    color: '#f59e0b', 
    bgColor: '#fef3c7',
    icon: <FiClock />,
    nextOptions: ['Completed']
  },
  Completed: { 
    color: '#10b981', 
    bgColor: '#d1fae5',
    icon: <FiCheckCircle />,
    nextOptions: []
  }
};

export default function MaintenanceDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/by-landlord`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRequests(response.data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusChange = async (requestId, currentStatus, newStatus) => {
    if (!statusConfig[currentStatus].nextOptions.includes(newStatus)) {
      console.warn(`Invalid status transition: ${currentStatus} → ${newStatus}`);
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/${requestId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => { fetchRequests(); }, []);

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(req => req.status === filter);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Maintenance Requests</h1>
            <div className={styles.controls}>
              <div className={styles.filterGroup}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="All">All Requests</option>
                  {Object.keys(statusConfig).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <button 
                onClick={() => {
                  setRefreshing(true);
                  fetchRequests();
                }}
                className={styles.refreshButton}
                disabled={refreshing}
              >
                <FiRefreshCw className={`${styles.refreshIcon} ${refreshing ? styles.spinning : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.requestGrid}>
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine}></div>
              </div>
            ))
          ) : filteredRequests.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FiHome />
              </div>
              <p>No maintenance requests found</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {filteredRequests.map(request => {
                const words = request.description.split(' ');
                const shouldTruncate = words.length > MAX_DESCRIPTION_LENGTH;
                const isExpanded = expandedDescriptions[request._id];
                const displayText = shouldTruncate && !isExpanded 
                  ? words.slice(0, MAX_DESCRIPTION_LENGTH).join(' ') + '...' 
                  : request.description;

                return (
                  <motion.div
                    key={request._id}
                    className={styles.requestCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className={styles.cardHeader}
                      style={{ backgroundColor: statusConfig[request.status]?.bgColor }}
                    >
                      <div className={styles.headerLeft}>
                        <div className={styles.propertyInfo}>
                          <FiHome className={styles.propertyIcon} />
                          <span className={styles.propertyName}>
                            {request.propertyId?.name || 'Unnamed Property'}
                          </span>
                        </div>
                        <div 
                          className={styles.statusBadge}
                          style={{ color: statusConfig[request.status]?.color }}
                        >
                          {statusConfig[request.status]?.icon}
                          <span>{request.status}</span>
                        </div>
                      </div>
                      <span className={styles.date}>
                        {new Date(request.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.categoryRow}>
                        <span className={styles.category}>{request.category}</span>
                      </div>
                      
                      <div className={styles.descriptionContainer}>
                        <p className={styles.description}>
                          {displayText}
                        </p>
                        {shouldTruncate && (
                          <button 
                            onClick={() => toggleDescription(request._id)}
                            className={styles.seeMoreButton}
                          >
                            {isExpanded ? (
                              <>
                                <span>See Less</span>
                                <FiChevronUp />
                              </>
                            ) : (
                              <>
                                <span>See More</span>
                                <FiChevronDown />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className={styles.tenantInfo}>
                        <FiUser className={styles.tenantIcon} />
                        <span className={styles.tenantLabel}>Reported by:</span>
                        <span className={styles.tenantName}>
                          {request.tenantId?.name || 'Unknown Tenant'}
                        </span>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      {request.status === 'Completed' ? (
                        <div className={styles.completedStatus}>
                          <FiLock className={styles.lockIcon} />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <select
                          value={request.status}
                          onChange={(e) => handleStatusChange(
                            request._id, 
                            request.status, 
                            e.target.value
                          )}
                          className={styles.statusSelect}
                          style={{ 
                            borderColor: statusConfig[request.status]?.color,
                            color: statusConfig[request.status]?.color
                          }}
                        >
                          <option value={request.status} disabled>
                            {request.status}
                          </option>
                          {statusConfig[request.status].nextOptions.map(status => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </Layout>
  );
}