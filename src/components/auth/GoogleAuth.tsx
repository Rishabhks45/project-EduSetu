import React, { useState, useEffect } from 'react';
import { LogIn, User, LogOut } from 'lucide-react';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface GoogleAuthProps {
  onLogin?: (user: GoogleUser) => void;
  onLogout?: () => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Google Client ID - In production, this should be in environment variables
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleAuth;
    document.head.appendChild(script);

    // Check for existing session
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        onLogin?.(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('googleUser');
      }
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initializeGoogleAuth = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      setIsInitialized(true);
    }
  };

  const handleCredentialResponse = (response: any) => {
    setIsLoading(true);
    try {
      // Decode the JWT token to get user information
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const googleUser: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      setUser(googleUser);
      localStorage.setItem('googleUser', JSON.stringify(googleUser));
      onLogin?.(googleUser);
    } catch (error) {
      console.error('Error processing Google login:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!isInitialized || !window.google) {
      alert('Google authentication is not ready. Please try again in a moment.');
      return;
    }

    setIsLoading(true);
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to popup if prompt is not displayed
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: 250,
            text: 'signin_with',
          }
        );
      }
      setIsLoading(false);
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('googleUser');
    
    // Sign out from Google
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    onLogout?.();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Sign out"
        >
          <LogOut size={18} />
          <span className="hidden md:inline text-sm">Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading || !isInitialized}
        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        <span className="text-sm font-medium">
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </span>
      </button>
      
      {/* Hidden button for Google's automatic rendering */}
      <div id="google-signin-button" className="hidden"></div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any;
  }
}

export default GoogleAuth;