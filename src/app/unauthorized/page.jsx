import Link from 'next/link';
import { LockOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import styles from './unauthorized.module.scss';

const UnauthorizedPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <LockOutlined className={styles.icon} />
      </div>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.message}>
        It looks like you're lost, but that's fine. It happens to the best of us.
      </p>
      <p className={styles.explanation}>
        Your session has expired. Please click the link below to log in again.
      </p>
      <Link href="/auth/login" className={styles.loginLink}>
        Click here to log in again 
      </Link>
    </div>
  );
};

export default UnauthorizedPage;