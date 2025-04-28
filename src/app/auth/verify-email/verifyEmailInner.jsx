'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const VerifyEmailInner = () => {
  const [status, setStatus] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/verify-email/${token}`);
          setStatus(response.data.msg);
          setTimeout(() => router.push('/login'), 3000);
        } catch (err) {
          setStatus('Error verifying email.');
        }
      };
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div>
      {status ? <p>{status}</p> : <p>Verifying email...</p>}
    </div>
  );
};

export default VerifyEmailInner;
