import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_NAME } from '../constants';
import { getCookie } from 'cookies-next';

interface DecodedToken {
  userEmail: string;
  userRoles: string[];
  exp: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie(TOKEN_NAME);
    if (token) {
      try {
        const decoded = jwtDecode(token as string) as DecodedToken;
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const hasRole = (roles: string[]) => {
    if (!user) return false;
    return roles.some(role => user.userRoles.includes(role));
  };

  return { user, loading, hasRole };
};
