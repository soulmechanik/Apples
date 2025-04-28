'use client';
import { useState, useEffect } from 'react';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiFilter, 
  FiRefreshCw,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiUser
} from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../../components/Tenantlayout/Layout';
import styles from './tenantmaintenance.module.scss';

const MAX_DESCRIPTION_LENGTH = 20;

const statusConfig = {
  Unread: { 
    color: '#ef4444', 
    bgColor: '#fee2e2',
    icon: <FiAlertCircle />,
  },
  'In Progress': { 
    color: '#f59e0b', 
    bgColor: '#fef3c7',
    icon: <FiClock />,
  },
  Completed: { 
    color: '#10b981', 
    bgColor: '#d1fae5',
    icon: <FiCheckCircle />,
  }
};

const categories = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Appliances',
  'Structural',
  'Pest Control',
  'Other'
];

export default function TenantMaintenanceDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    category: '',
    description: '',
    urgency: 'Normal'
  });

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/maintenance/tenant', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Handle 404 if tenant record not found
      if (error.response?.status === 404) {
        setRequests([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5001/api/maintenance/create',
        newRequest,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowCreateForm(false);
      setNewRequest({
        category: '',
        description: '',
        urgency: 'Normal'
      });
      fetchRequests();
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => { 
    fetchRequests(); 
  }, []);

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(req => req.status === filter);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>My Maintenance Requests</h1>
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

              <button 
                onClick={() => setShowCreateForm(true)}
                className={styles.newRequestButton}
              >
                <FiPlus className={styles.plusIcon} />
                <span>New Request</span>
              </button>
            </div>
          </div>
        </div>

        {/* Create Request Modal */}
        {showCreateForm && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.modalHeader}>
                <h2>Create Maintenance Request</h2>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className={styles.closeButton}
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleCreateRequest} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={newRequest.category}
                    onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="urgency">Urgency</label>
                  <select
                    id="urgency"
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    placeholder="Describe the issue in detail..."
                    rows={5}
                    required
                  />
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    onClick={() => setShowCreateForm(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className={styles.submitButton}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

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
              <button 
                onClick={() => setShowCreateForm(true)}
                className={styles.emptyStateButton}
              >
                <FiPlus className={styles.plusIcon} />
                Create your first request
              </button>
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
                            {request.property?.name || 'Unnamed Property'}
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
                        {request.urgency && (
                          <span className={`${styles.urgency} ${styles[request.urgency.toLowerCase()]}`}>
                            {request.urgency}
                          </span>
                        )}
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

                      {request.landlordComments && (
                        <div className={styles.commentsSection}>
                          <h4 className={styles.commentsHeader}>Landlord's Response:</h4>
                          <p className={styles.commentsText}>{request.landlordComments}</p>
                        </div>
                      )}
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.statusDisplay}>
                        {statusConfig[request.status]?.icon}
                        <span>Status: {request.status}</span>
                      </div>
                      <span className={styles.updatedText}>
                        Last updated: {new Date(request.updatedAt).toLocaleDateString()}
                      </span>
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