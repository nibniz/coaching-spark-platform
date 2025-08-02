import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'user';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuth = useRef(false);

  // Check for existing session on mount - only run once
  useEffect(() => {
    // Prevent multiple auth checks
    if (hasCheckedAuth.current) {
      setIsLoading(false);
      return;
    }
    
    if (user) {
      setIsLoading(false);
      return;
    }
    
    hasCheckedAuth.current = true;
    
    // Add a flag to prevent multiple simultaneous auth checks
    let isChecking = false;
    
    const checkAuth = async () => {
      if (isChecking) {
        return;
      }
      
      isChecking = true;
      const token = localStorage.getItem('mentormatch-token');
      const savedUser = localStorage.getItem('mentormatch-user');
      
      if (token && savedUser) {
        try {
          // Verify token with backend
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData.data.id,
              name: `${userData.data.first_name} ${userData.data.last_name}`,
              email: userData.data.email,
              role: userData.data.role,
              avatar: userData.data.avatar_url || userData.data.first_name.charAt(0) + userData.data.last_name.charAt(0)
            });
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('mentormatch-token');
            localStorage.removeItem('mentormatch-user');
          }
        } catch (error) {
          // ALWAYS use saved user data as fallback - never clear storage automatically
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            } catch (parseError) {
              // Only clear if we can't parse the saved data
              localStorage.removeItem('mentormatch-token');
              localStorage.removeItem('mentormatch-user');
            }
          }
        }
      }
      setIsLoading(false);
      isChecking = false;
    };

    checkAuth();
  }, []); // Empty dependency array - only run once on mount

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.data.user;
        const token = data.data.token;
        
        const user: User = {
          id: userData.id,
          name: `${userData.first_name} ${userData.last_name}`,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar_url || userData.first_name.charAt(0) + userData.last_name.charAt(0)
        };

        setUser(user);
        localStorage.setItem('mentormatch-token', token);
        localStorage.setItem('mentormatch-user', JSON.stringify(user));
        return true;
      } else {
        const errorData = await response.json();
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mentormatch-token');
    localStorage.removeItem('mentormatch-user');
  };

  const setUserData = (userData: User) => {
    setUser(userData);
    localStorage.setItem('mentormatch-user', JSON.stringify(userData));
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    setUser: setUserData,
    isLoading
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};