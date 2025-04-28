"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Layout.module.scss";
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
  FiMenu,
  FiSearch,
  FiUser,
  FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, Tooltip, IconButton, useMediaQuery, useTheme } from "@mui/material";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <IconButton 
            className={styles.menuButton}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <FiMenu size={20} />
          </IconButton>

          {!isMobile && (
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className={styles.logoPrimary}>FOREM</span>
              <span className={styles.logoSecondary}>S</span>
            </motion.div>
          )}
        </div>

        <div className={styles.searchContainer}>
          {isMobile ? (
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  className={styles.mobileSearch}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <FiSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search properties, invoices, etc."
                  />
                  <IconButton onClick={toggleSearch}>
                    <FiX size={18} />
                  </IconButton>
                </motion.div>
              ) : (
                <IconButton onClick={toggleSearch}>
                  <FiSearch size={20} />
                </IconButton>
              )}
            </AnimatePresence>
          ) : (
            <div className={styles.desktopSearch}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search properties, invoices, etc."
              />
            </div>
          )}
        </div>

        <div className={styles.headerRight}>
          <Tooltip title="Notifications">
            <IconButton className={styles.notificationButton}>
              <Badge badgeContent={3} color="primary">
                <FiBell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <FiUser size={18} />
            </div>
            {!isMobile && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>John Doe</span>
                <span className={styles.userRole}>Landlord</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <motion.aside 
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
        initial={false}
        animate={{
          width: collapsed ? (isMobile ? 0 : 80) : isMobile ? 280 : 256,
          left: isMobile && collapsed ? -280 : 0
        }}
      >
        <div className={styles.sidebarContent}>
          {!collapsed && (
            <div className={styles.sidebarHeader}>
              <div className={styles.logo}>
                <span className={styles.logoPrimary}>FOREM</span>
                <span className={styles.logoSecondary}>S</span>
              </div>
            </div>
          )}

          <nav className={styles.nav}>
            <ul>
              {navItems.map((item) => {
                const isActive = item.match(pathname);
                return (
                  <Tooltip 
                    key={item.path}
                    title={collapsed ? item.label : ''} 
                    placement="right"
                    arrow
                  >
                    <li 
                      className={`${isActive ? styles.active : ''}`}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Link href={item.path} className={styles.navLink}>
                        <div className={styles.iconWrapper}>
                          <div className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`}>
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
                        
                        {!collapsed && (
                          <span className={styles.label}>
                            {item.label}
                          </span>
                        )}

                        {isActive && !collapsed && (
                          <div className={styles.activeIndicator} />
                        )}

                        {hoveredItem === item.path && !collapsed && (
                          <FiChevronRight className={styles.hoverChevron} size={16} />
                        )}
                      </Link>
                    </li>
                  </Tooltip>
                );
              })}
            </ul>
          </nav>

          {!isMobile && (
            <div className={styles.sidebarFooter}>
              <button 
                onClick={toggleSidebar}
                className={styles.collapseButton}
              >
                <FiChevronRight 
                  className={`${styles.collapseIcon} ${collapsed ? styles.rotated : ''}`}
                  size={18}
                />
                {!collapsed && <span>Collapse</span>}
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`${styles.main} ${collapsed ? styles.collapsedMain : ''}`}>
        <div className={styles.content}>
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isMobile && !collapsed && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;