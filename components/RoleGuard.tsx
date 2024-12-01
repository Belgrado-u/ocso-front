'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { hasRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !hasRole(allowedRoles)) {
      router.push('/unauthorized');
    }
  }, [loading, hasRole, allowedRoles, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole(allowedRoles)) {
    return null;
  }

  return <>{children}</>;
};
