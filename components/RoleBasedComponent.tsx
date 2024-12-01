'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from 'cookies-next';
import { TOKEN_NAME } from '@/constants';

interface RoleBasedComponentProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

interface DecodedToken {
  userEmail: string;
  userRoles: string[];
  exp: number;
}

export const RoleBasedComponent = ({ children, allowedRoles }: RoleBasedComponentProps) => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const token = getCookie(TOKEN_NAME);
    if (token) {
      try {
        const decoded = jwtDecode(token as string) as DecodedToken;
        const hasRequiredRole = allowedRoles.some(role => 
          decoded.userRoles.includes(role)
        );
        setHasAccess(hasRequiredRole);
      } catch (error) {
        console.error('Error decoding token:', error);
        setHasAccess(false);
      }
    }
  }, [allowedRoles]);

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};
