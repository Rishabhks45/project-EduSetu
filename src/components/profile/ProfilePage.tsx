import React, { useState } from 'react';
import { User, Upload, FileText, BookOpen, Star, Eye, Download, Edit, Settings, Award, TrendingUp, Calendar, Plus, Grid, List, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import UploadModal from './UploadModal';
import UserUploads from './UserUploads';
import ProfileStats from './ProfileStats';
import ProfileSettings from './ProfileSettings';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  institution: string;
  course: string;
  semester: string;
  joinDate: string;
  totalUploads: number;
  totalDownloads: number;
  totalViews: number;
  averageRating: number;
  totalRatings: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  }>;
  socialLinks: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'uploads' | 'stats' | 'settings'>('uploads');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data - in a real app, this would come from authentication context
  const userProfile: UserProfile = {
    id: 'user123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Computer Science student passionate about sharing knowledge and helping fellow students succeed. Specializing in algorithms, data structures, and machine learning.',
    institution: 'Delhi University',
    course: 'B.Tech Computer Science',
    semester: 'Semester 6',
    joinDate: '2023-08-15',
    totalUploads: 24,
    totalDownloads: 15420,
    totalViews: 45230,
    averageRating: 4.7,
    totalRatings: 892,
    badges: [
      {
        id: '1',
        name: 'Top Contributor',
        description: 'Uploaded 20+ high-quality materials',
        icon: 'crown',
        color: 'text-yellow-600 bg-yellow-100'
      },
      {
        id: '2',
        name: 'Verified Creator',
        description: 'All uploads verified by moderators',
        icon: 'check-circle',
        color: 'text-green-600 bg-green-100'
      },
      {
        id: '3',
        name: 'Community Helper',
        description: 'Highly rated by community',
        icon: 'heart',
        color: 'text-red-600 bg-red-100'
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      website: 'https://sarahjohnson.dev'
    }
  };

  const tabs = [
    { id: 'uploads', label: 'My Uploads', icon: Upload, count: userProfile.totalUploads },
    { id: 'stats', label: 'Statistics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleUploadSuccess = () => {
    setShowUploadModal(false);
    // In a real app, this would refresh the uploads data
    console.log('Upload successful, refreshing data...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader 
          user={userProfile} 
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
        />

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Quick Actions</h2>
                <p className="text-gray-600">Manage your study materials and profile</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                >
                  <Plus size={18} />
                  Upload Material
                </button>
                
                <button
                  onClick={() => setActiveTab('stats')}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <TrendingUp size={18} />
                  View Stats
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'uploads' && (
            <UserUploads userId={userProfile.id} />
          )}
          
          {activeTab === 'stats' && (
            <ProfileStats user={userProfile} />
          )}
          
          {activeTab === 'settings' && (
            <ProfileSettings user={userProfile} />
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadModal
            onClose={() => setShowUploadModal(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;