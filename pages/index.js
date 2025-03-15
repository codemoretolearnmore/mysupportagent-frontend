import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Index Page
 * Redirects users to the Ticket Upload page.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/upload');
  }, [router]);

  return <p>Redirecting to upload page...</p>;
}
