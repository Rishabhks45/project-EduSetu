import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demonstration
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@edunotes.com',
    name: 'System Administrator',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    permissions: ['manage_users', 'manage_content', 'view_analytics', 'system_settings', 'moderate_content'],
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'teacher@edunotes.com',
    name: 'Dr. Sarah Johnson',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    institution: 'Delhi University',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
    permissions: ['upload_content', 'manage_own_content', 'view_student_progress', 'grade_assignments'],
    isActive: true,
    createdAt: '2023-02-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'student@edunotes.com',
    name: 'John Smith',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    institution: 'Delhi University',
    permissions: ['view_content', 'download_content', 'submit_assignments', 'view_grades'],
    isActive: true,
    createdAt: '2023-03-01T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('edunotes_user');
        const savedToken = localStorage.getItem('edunotes_token');
        
        if (savedUser && savedToken) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email and validate password
      const user = DEMO_USERS.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Demo password validation - accept the demo passwords
      const validPasswords = {
        'admin@edunotes.com': 'admin123',
        'teacher@edunotes.com': 'teacher123',
        'student@edunotes.com': 'student123'
      };

      if (credentials.password !== validPasswords[credentials.email as keyof typeof validPasswords]) {
        throw new Error('Invalid email or password');
      }

      // Check if role matches (if specified)
      if (credentials.role && user.role !== credentials.role) {
        throw new Error(`Access denied. This account is not registered as ${credentials.role}.`);
      }

      if (!user.isActive) {
        throw new Error('Account is deactivated. Please contact support.');
      }

      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      };

      // Save to localStorage (in real app, use secure token storage)
      localStorage.setItem('edunotes_user', JSON.stringify(updatedUser));
      localStorage.setItem('edunotes_token', 'demo_token_' + Date.now());

      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if user already exists
      const existingUser = DEMO_USERS.find(u => u.email === data.email);
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role || 'user',
        institution: data.institution,
        department: data.department,
        subjects: data.subjects,
        permissions: getDefaultPermissions(data.role || 'user'),
        isActive: true,
        createdAt: new Date().toISOString()
      };

      // In a real app, this would be saved to the database
      DEMO_USERS.push(newUser);

      // Auto-login after registration
      localStorage.setItem('edunotes_user', JSON.stringify(newUser));
      localStorage.setItem('edunotes_token', 'demo_token_' + Date.now());

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('edunotes_user');
    localStorage.removeItem('edunotes_token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const hasPermission = (permission: string): boolean => {
    return authState.user?.permissions.includes(permission) || false;
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!authState.user) return false;
    if (Array.isArray(role)) {
      return role.includes(authState.user.role);
    }
    return authState.user.role === role;
  };

  const getDefaultPermissions = (role: string): string[] => {
    switch (role) {
      case 'admin':
        return ['manage_users', 'manage_content', 'view_analytics', 'system_settings', 'moderate_content'];
      case 'teacher':
        return ['upload_content', 'manage_own_content', 'view_student_progress', 'grade_assignments'];
      case 'user':
      default:
        return ['view_content', 'download_content', 'submit_assignments', 'view_grades'];
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      hasPermission,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};