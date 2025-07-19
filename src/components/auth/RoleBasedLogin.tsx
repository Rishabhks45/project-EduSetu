import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowLeft, Shield, GraduationCap, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RoleBasedLogin: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const demoCredentials = [
    {
      role: 'admin' as const,
      title: 'Administrator',
      email: 'admin@edunotes.com',
      password: 'admin123',
      icon: Shield,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Full system access'
    },
    {
      role: 'teacher' as const,
      title: 'Teacher',
      email: 'teacher@edunotes.com',
      password: 'teacher123',
      icon: GraduationCap,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Content management'
    },
    {
      role: 'user' as const,
      title: 'Student',
      email: 'student@edunotes.com',
      password: 'student123',
      icon: User,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Learning access'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      
      // The AuthContext will handle role-based redirection
      window.location.href = '/';
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleDemoLogin = async (credentials: typeof demoCredentials[0]) => {
    setLoginError('');
    
    try {
      await login({
        email: credentials.email,
        password: credentials.password,
        role: credentials.role
      });
      
      // Redirect based on role
      switch (credentials.role) {
        case 'admin':
          window.location.href = '/admin/dashboard';
          break;
        case 'teacher':
          window.location.href = '/teacher/dashboard';
          break;
        case 'user':
          window.location.href = '/';
          break;
      }
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const fillCredentials = (credentials: typeof demoCredentials[0]) => {
    setFormData({
      ...formData,
      email: credentials.email,
      password: credentials.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <a
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </a>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-primary-600">
            <div className="p-3 bg-primary-100 rounded-full">
              <LogIn size={32} />
            </div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome back to EduNotes
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your study materials and continue learning
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          {/* Error Message */}
          {(error || loginError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} className="text-red-600" />
              <span className="text-red-800">{error || loginError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Sign in</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Try Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {demoCredentials.map((credentials) => (
                <div key={credentials.role} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <credentials.icon size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{credentials.title}</h4>
                        <p className="text-xs text-gray-500">{credentials.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-3 space-y-1">
                    <div>Email: <span className="font-mono">{credentials.email}</span></div>
                    <div>Password: <span className="font-mono">{credentials.password}</span></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => fillCredentials(credentials)}
                      className="flex-1 px-3 py-2 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Fill Form
                    </button>
                    <button
                      onClick={() => handleDemoLogin(credentials)}
                      disabled={isLoading}
                      className={`flex-1 px-3 py-2 text-xs text-white rounded-md transition-colors disabled:opacity-50 ${credentials.color}`}
                    >
                      {isLoading ? 'Signing in...' : 'Quick Login'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to EduNotes?</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/register"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Create new account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedLogin;