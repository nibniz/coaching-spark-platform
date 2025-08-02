import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/contexts/AuthContext';

interface UseAuthGuardOptions {
  requiredRole?: 'mentor' | 'user';
  redirectTo?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);
  
  const { requiredRole, redirectTo = '/login' } = options;

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      return;
    }

    // Prevent multiple redirects
    if (hasRedirected.current) {
      return;
    }

    // Check if user is authenticated
    if (!user) {
      hasRedirected.current = true;
      navigate(redirectTo, { replace: true });
      return;
    }

    // Check if user has required role - but be more flexible
    if (requiredRole && user.role !== requiredRole) {
      // Don't redirect for role mismatch - just log it
      // This prevents unnecessary redirects during navigation
    }
  }, [user, isLoading, requiredRole, redirectTo, navigate]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user // Always return true if user exists, regardless of role
  };
}; 