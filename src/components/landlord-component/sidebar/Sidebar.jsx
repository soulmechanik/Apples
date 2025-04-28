"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import { 
  FiHome, 
  FiLayers, 
  FiTool, 
  FiDollarSign, 
  FiUsers, 
  FiBell, 
  FiSettings, 
  FiHelpCircle,
  FiChevronRight,
  FiMenu
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, Badge } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { 
      path: "/landlord/overview", 
      icon: <FiHome size={20} />, 
      label: "Overview",
      match: (path) => path === "/landlord/overview"
    },
    { 
      path: "/landlord/properties", 
      icon: <FiLayers size={20} />, 
      label: "Properties",
      match: (path) => path.startsWith("/landlord/properties")
    },
    { 
      path: "/landlord/maintenancerequests", 
      icon: <FiTool size={20} />, 
      label: "Maintenance",
      match: (path) => path.startsWith("/landlord/maintenancerequests")
    },
    { 
      path: "/landlord/transactions", 
      icon: <FiDollarSign size={20} />, 
      label: "Rent Payments",
      match: (path) => path.startsWith("/landlord/transactions")
    },
    { 
      path: "/landlord/tenants", 
      icon: <FiUsers size={20} />, 
      label: "My Tenants",
      match: (path) => path.startsWith("/landlord/tenants")
    },
    { 
      path: "/landlord/notifications", 
      icon: <FiBell size={20} />, 
      label: "Notifications",
      notificationCount: 3,
      match: (path) => path.startsWith("/landlord/notifications")
    },
    { 
      path: "/landlord/settings", 
      icon: <FiSettings size={20} />, 
      label: "Settings",
      match: (path) => path.startsWith("/landlord/settings")
    },
    { 
      path: "/landlord/help", 
      icon: <FiHelpCircle size={20} />, 
      label: "Help Center",
      match: (path) => path.startsWith("/help")
    } 
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <motion.aside 
      className={styles.sidebar}
      initial={{ width: isMobile ? 80 : 280 }}
      animate={{ 
        width: collapsed || isMobile ? 80 : 280,
        transition: { type: "spring", damping: 20 }
      }}
    >
      <div className={styles.sidebarHeader}>
        <AnimatePresence>
          {!collapsed && !isMobile ? (
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <span className={styles.logoPrimary}>FOREM</span>
              <span className={styles.logoSecondary}>S</span>
            </motion.div>
          ) : (
            <motion.div 
              className={styles.collapsedLogo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              F
            </motion.div>
          )}
        </AnimatePresence>
        
        <button className={styles.collapseButton} onClick={toggleSidebar}>
          <FiMenu size={20} />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul>
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            
            return (
              <Tooltip 
                key={item.path}
                title={collapsed || isMobile ? item.label : ''} 
                placement="right"
                arrow
              >
                <motion.li 
                  className={`${isActive ? styles.active : ""}`}
                  onHoverStart={() => setHoveredItem(item.path)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ backgroundColor: "rgba(122, 90, 248, 0.08)" }}
                >
                  <Link href={item.path} className={styles.navLink}>
                    <div className={styles.iconWrapper}>
                      <div className={`${styles.icon} ${isActive ? styles.activeIcon : ""}`}>
                        {item.icon}
                        {item.notificationCount && (
                          <Badge 
                            badgeContent={item.notificationCount} 
                            color="primary"
                            className={styles.badge}
                          />
                        )}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {(!collapsed && !isMobile) && (
                        <motion.span 
                          className={styles.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                        >
                          {item.label}
                          {isActive && (
                            <motion.div 
                              className={styles.activePulse}
                              layoutId="activePulse"
                            />
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div 
                        className={styles.activeIndicator}
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    {hoveredItem === item.path && (!collapsed && !isMobile) && (
                      <motion.div 
                        className={styles.hoverChevron}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <FiChevronRight size={16} />
                      </motion.div>
                    )}
                  </Link>
                </motion.li>
              </Tooltip>
            );
          })}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <div className={styles.avatarInitial}>JD</div>
            <div className={styles.userStatus} />
          </div>
          
          <AnimatePresence>
            {(!collapsed && !isMobile) && (
              <motion.div 
                className={styles.userInfo}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <span className={styles.userName}>John Doe</span>
                <span className={styles.userRole}>Landlord</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;