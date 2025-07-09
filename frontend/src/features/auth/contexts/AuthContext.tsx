import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mentormatch-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would call an API
    if (password === 'password123') {
      let mockUser: User;
      
      if (email === 'mentor@demo.com') {
        mockUser = {
          id: '1',
          name: 'Sarah Johnson',
          email: 'mentor@demo.com',
          role: 'mentor',
          avatar: 'SJ'
        };
      } else if (email === 'user@demo.com') {
        mockUser = {
          id: '2',
          name: 'John Smith',
          email: 'user@demo.com',
          role: 'user',
          avatar: 'JS'
        };
      } else {
        return false;
      }

      setUser(mockUser);
      localStorage.setItem('mentormatch-user', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mentormatch-user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};