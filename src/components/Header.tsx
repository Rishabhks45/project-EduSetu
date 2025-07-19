import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, User, LogIn, Bell, Settings, LogOut } from 'lucide-react';
import { Link } from './ui/Link';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      default:
        return '/profile';
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'text-red-600 bg-red-100';
      case 'teacher':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <BookOpen size={24} />
            <span>EduNotes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/pyqs" className="nav-link">PYQs</Link>
            <Link href="/notes" className="nav-link">Notes</Link>
            <Link href="/videos" className="nav-link">Videos</Link>
            <Link href="/announcements" className="nav-link">Announcements</Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User size={16} className="text-primary-600" />
                    </div>
                  )}
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-800">{user.name}</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor()}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <a
                        href={getDashboardLink()}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings size={16} />
                        {user.role === 'admin' ? 'Admin Dashboard' : 
                         user.role === 'teacher' ? 'Teacher Dashboard' : 'Profile'}
                      </a>
                      
                      {user.role !== 'admin' && (
                        <a
                          href="/history"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Bell size={16} />
                          History
                        </a>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogIn size={20} />
                  <span>Sign In</span>
                </Link>
                
                <Link 
                  href="/register" 
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <User size={20} />
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white mt-4 p-4 rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/pyqs" className="nav-link">PYQs</Link>
              <Link href="/notes" className="nav-link">Notes</Link>
              <Link href="/videos" className="nav-link">Videos</Link>
              <Link href="/announcements" className="nav-link">Announcements</Link>
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 p-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full border border-gray-300"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <User size={16} className="text-primary-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-800">{user.name}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor()}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={getDashboardLink()}
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Settings size={18} />
                      {user.role === 'admin' ? 'Admin Dashboard' : 
                       user.role === 'teacher' ? 'Teacher Dashboard' : 'Profile'}
                    </Link>
                    
                    {user.role !== 'admin' && (
                      <Link 
                        href="/history"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
                      >
                        <Bell size={18} />
                        History
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors w-full text-left"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <LogIn size={18} />
                      Sign In
                    </Link>
                    
                    <Link 
                      href="/register" 
                      className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors w-fit"
                    >
                      <User size={18} />
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;