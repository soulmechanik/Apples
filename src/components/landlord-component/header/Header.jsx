import React, { useState } from "react";
import styles from "./Header.module.scss";
import { FaSearch, FaBell, FaUserCircle, FaChevronDown, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Badge, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className={styles.header}>
      {/* Logo or brand name - optional */}
      {!isMobile && (
        <div className={styles.brand}>
          <span className={styles.brandName}>YourBrand</span>
        </div>
      )}
      
      {/* Search Bar */}
      <div className={`${styles.searchContainer} ${searchOpen ? styles.searchOpen : ''}`}>
        {isMobile && searchOpen ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.searchBar}
            >
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search properties, invoices, etc."
                className={styles.searchInput}
              />
              <IconButton onClick={toggleSearch} className={styles.closeSearch}>
                <FaTimes />
              </IconButton>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            {!isMobile && (
              <div className={styles.searchBar}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search properties, invoices, etc."
                  className={styles.searchInput}
                />
              </div>
            )}
            {isMobile && (
              <IconButton onClick={toggleSearch} className={styles.searchButton}>
                <FaSearch />
              </IconButton>
            )}
          </>
        )}
      </div>

      {/* Right Side: Notifications and User Profile */}
      <div className={styles.rightSection}>
        {/* Notifications */}
        <IconButton className={styles.notificationButton}>
          <Badge badgeContent={3} color="primary">
            <FaBell className={styles.notificationIcon} />
          </Badge>
        </IconButton>

        {/* User Profile */}
        <div className={styles.userProfile} onClick={handleMenuOpen}>
          <FaUserCircle className={styles.userIcon} />
          {!isMobile && (
            <>
              <span className={styles.userName}>John Doe</span>
              <FaChevronDown className={styles.dropdownIcon} />
            </>
          )}
        </div>
        
        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.userMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;