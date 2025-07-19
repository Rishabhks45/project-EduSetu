export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'teacher';
  avatar?: string;
  institution?: string;
  department?: string;
  subjects?: string[];
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: 'admin' | 'user' | 'teacher';
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
  institution?: string;
  department?: string;
  subjects?: string[];
}