import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import SearchSection from './components/SearchSection';
import RecentVisitsSection from './components/RecentVisitsSection';
import FeaturedContent from './components/FeaturedContent';
import AnnouncementsSection from './components/AnnouncementsSection';
import Footer from './components/Footer';
import RoleBasedLogin from './components/auth/RoleBasedLogin';
import RoleBasedRegister from './components/auth/RoleBasedRegister';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PYQsPage from './components/pyqs/PYQsPage';
import PaperViewPage from './components/papers/PaperViewPage';
import NotesPage from './components/notes/NotesPage';
import VideosPage from './components/videos/VideosPage';
import HistoryPage from './components/history/HistoryPage';
import AnnouncementsPage from './components/announcements/AnnouncementsPage';
import ProfilePage from './components/profile/ProfilePage';
import SearchResultsPage from './components/search/SearchResultsPage';

function App() {
  const currentPath = window.location.pathname;

  return (
    <AuthProvider>
      {currentPath === '/login' && <RoleBasedLogin />}
      
      {currentPath === '/register' && <RoleBasedRegister />}
      
      {currentPath === '/admin/dashboard' && (
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      )}
      
      {currentPath === '/teacher/dashboard' && (
        <ProtectedRoute requiredRole="teacher">
          <TeacherDashboard />
        </ProtectedRoute>
      )}

      {currentPath === '/search' && (
        <div className="min-h-screen">
          <Header />
          <SearchResultsPage />
          <Footer />
        </div>
      )}

      {currentPath === '/profile' && (
        <ProtectedRoute>
          <div className="min-h-screen">
            <Header />
            <ProfilePage />
            <Footer />
          </div>
        </ProtectedRoute>
      )}

      {currentPath === '/pyqs' && (
        <div className="min-h-screen">
          <Header />
          <PYQsPage />
          <Footer />
        </div>
      )}

      {currentPath === '/notes' && (
        <div className="min-h-screen">
          <Header />
          <NotesPage />
          <Footer />
        </div>
      )}

      {currentPath === '/videos' && (
        <div className="min-h-screen">
          <Header />
          <VideosPage />
          <Footer />
        </div>
      )}

      {currentPath === '/history' && (
        <ProtectedRoute>
          <div className="min-h-screen">
            <Header />
            <HistoryPage />
            <Footer />
          </div>
        </ProtectedRoute>
      )}

      {currentPath === '/announcements' && (
        <div className="min-h-screen">
          <Header />
          <AnnouncementsPage />
          <Footer />
        </div>
      )}

      {currentPath.startsWith('/papers/') && (
        <div className="min-h-screen">
          <Header />
          <PaperViewPage />
          <Footer />
        </div>
      )}

      {currentPath === '/' && (
        <div className="min-h-screen">
          <Header />
          <main>
            <Hero />
            <CategorySection />
            <SearchSection />
            <RecentVisitsSection />
            <FeaturedContent />
            <AnnouncementsSection />
          </main>
          <Footer />
        </div>
      )}
    </AuthProvider>
  );
}

export default App;