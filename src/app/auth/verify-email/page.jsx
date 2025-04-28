'use client';

import { Suspense } from 'react';
import VerifyEmailInner from './verifyEmailInner';

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailInner />
    </Suspense>
  );
};

export default VerifyEmail;
