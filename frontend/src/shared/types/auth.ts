export interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'user';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
} 