"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExpandMore,
  ExpandLess,
  HelpOutline,
  Search,
  SmartToy
} from '@mui/icons-material';
import styles from './Faq.module.scss';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);

  const faqItems = [
    {
        "question": "Is your software free for landlords?",
        "answer": "Yes, our software is completely free for landlords to use. We offer a range of features and tools to help you manage your rental properties efficiently, without any subscription fees or charges.",
        "category": "Pricing"
        },
        {
        "question": "How does your software help with rent collection?",
        "answer": "Our software streamlines rent collection and payment processing, allowing you to easily track and manage rent payments from tenants. With automated reminders and notifications, you can ensure timely payments and reduce the risk of late or missed payments.",
        "category": "Landlord"
        },
        {
        "question": "What maintenance tracking features do you offer?",
        "answer": "Our software includes a comprehensive maintenance tracking system, allowing you to easily report and track maintenance requests, assign tasks to maintenance staff, and monitor progress. This helps ensure that maintenance issues are resolved promptly and efficiently.",
        "category": "Maintenance"
        },
        {
        "question": "How do you screen tenants?",
        "answer": "We conduct comprehensive background checks on potential tenants, including credit checks, employment verification, rental history, and reference checks. This helps ensure that you rent to reliable and trustworthy tenants.",
        "category": "Tenants"
        },
        {
        "question": "Is your software compliant with Nigerian laws?",
        "answer": "Yes, our software is designed to comply with Nigerian laws and regulations, including the Landlord and Tenant Act. We regularly update our software to ensure that it remains compliant with changing laws and regulations.",
        "category": "Legal"
        },
        {
        "question": "Can I pay rent in Naira?",
        "answer": "Yes, our software allows you to pay rent in Naira, with secure online payment options and automated receipts. We also provide real-time exchange rate updates to ensure that payments are accurate and up-to-date.",
        "category": "Payments"
        }
        
        
  ];

  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={styles.sectionTitle}>
          <HelpOutline className={styles.titleIcon} />
          Frequently Asked Questions
        </h2>
        
        <div className={styles.searchBar}>
          <div className={styles.searchInput}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.button
            className={styles.aiButton}
            onClick={() => setShowAIChat(!showAIChat)}
            whileHover={{ scale: 1.05 }}
          >
            <SmartToy className={styles.aiIcon} />
            Ask Alex AI
          </motion.button>
        </div>

        <div className={styles.faqGrid}>
          {/* Categories sidebar */}
          <div className={styles.categorySidebar}>
            <h3>Categories</h3>
            <ul>
              {['All', ...new Set(faqItems.map(item => item.category))].map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>

          {/* FAQ Items */}
          <div className={styles.faqItems}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div 
                  key={index} 
                  className={styles.faqItem}
                  onClick={() => toggleQuestion(index)}
                >
                  <div className={styles.question}>
                    <span className={styles.categoryBadge}>{item.category}</span>
                    <h3>{item.question}</h3>
                    {activeIndex === index ? (
                      <ExpandLess className={styles.expandIcon} />
                    ) : (
                      <ExpandMore className={styles.expandIcon} />
                    )}
                  </div>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        className={styles.answer}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{item.answer}</p>
                        <button className={styles.followUpButton}>
                          Need more details?
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No FAQs match your search.</p>
                <button onClick={() => setSearchQuery('')}>Clear search</button>
              </div>
            )}
          </div>
        </div>

        {/* AI Chat Panel */}
        <AnimatePresence>
          {showAIChat && (
            <motion.div
              className={styles.aiChatPanel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className={styles.aiHeader}>
                <h3>Alex AI Assistant</h3>
                <p>Ask me anything about property management</p>
              </div>
              <div className={styles.aiMessages}>
                <div className={styles.aiMessage}>
                  <div className={styles.aiAvatar}>A</div>
                  <div className={styles.messageContent}>
                    Hi! I'm Alex, your property law AI assistant. How can I help you today?
                  </div>
                </div>
              </div>
              <div className={styles.aiInput}>
                <input 
                  type="text" 
                  placeholder="Type your question..." 
                />
                <button>Send</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQ;