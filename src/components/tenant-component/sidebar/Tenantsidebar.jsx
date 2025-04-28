"use client";

import { motion } from 'framer-motion';
import { 
  Dashboard, 
  Receipt, 
  HeadsetMic, 
  RequestQuote, 
  Email, 
  Build,

  DeleteOutline,
  DocumentScanner,
  Notifications,
  Star
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './TenantSidebar.module.scss';

const TenantSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', icon: Dashboard, path: '/tenant/overview' },
    { name: 'Rent History', icon: Receipt, path: '/tenant/rent-history' },
    { name: 'Rent Loan', icon: RequestQuote, path: '/tenant/rent-loan' },
    { name: 'Maintenance', icon: Build, path: '/tenant/maintenance' },
    { name: 'Declutter', icon: DeleteOutline, path: '/tenant/declutter' },
    { name: 'Notifications', icon: Notifications, path: '/tenant/notifications' },
    { name: 'Support', icon: HeadsetMic, path: '/tenant/support' }
    
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>✦</span>
        <span className={styles.logoText}>Forems</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <motion.li 
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href={item.path} 
                className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
              >
                <item.icon className={styles.navIcon} />
                <span className={styles.navText}>{item.name}</span>
                {pathname === item.path && (
                  <motion.div 
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Current Property */}
      <div className={styles.currentProperty}>
        <div className={styles.propertyImage}></div>
        <div className={styles.propertyInfo}>
          <h4 className={styles.propertyName}>Sunset Apartments</h4>
          <p className={styles.propertyAddress}>123 Main St, San Francisco</p>
        </div>
      </div>
    </aside>
  );
};

export default TenantSidebar;