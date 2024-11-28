'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{error.message[0].toUpperCase() + error.message.slice(1)}. Please try again later</h2>
      <button onClick={() => router.push('/')}>Go to main page</button>
    </div>
  );
}
