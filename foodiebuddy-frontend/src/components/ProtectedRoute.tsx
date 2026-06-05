'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [token, router, pathname]);

  if (!token) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
