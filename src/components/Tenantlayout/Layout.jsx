"use client";

import { useState } from 'react';
import TenantHeader from '../tenant-component/header/Tenantheader';
import TenantSidebar from '../tenant-component/sidebar/Tenantsidebar';
import styles from './Layout.module.scss';

const TenantLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`${styles.layout} hide-on-print`}>
    {/* Sidebar (fixed width) */}
    <TenantSidebar />
  
    {/* Main Content Area */}
    <div className={styles.mainContent}>
      {/* Header (fixed height) */}
      <TenantHeader />
  
      {/* Page Content */}
      <main className={styles.content}>
        {children}
      </main>
    </div>
  </div>
  );
};

export default TenantLayout;