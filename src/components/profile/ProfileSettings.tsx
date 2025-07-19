import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Globe, Eye, EyeOff, Save, AlertCircle, CheckCircle, Trash2, Download, Palette, Monitor, Smartphone, Moon, Sun, Zap, BarChart3, Clock, Target, TrendingUp, Award, Calendar, Activity } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  institution: string;
  course: string;
  semester: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

interface ProfileSettingsProps {
  user: UserProfile;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'privacy' | 'notifications' | 'appearance' | 'analytics' | 'data'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    institution: user.institution,
    course: user.course,
    semester: user.semester,
    linkedin: user.socialLinks.linkedin || '',
    github: user.socialLinks.github || '',
    website: user.socialLinks.website || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showStats: true,
    allowMessages: true,
    showActivity: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    uploadApproval: true,
    newComments: true,
    newRatings: true,
    weeklyDigest: false,
    marketingEmails: false,
    pushNotifications: true,
    desktopNotifications: false
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    accentColor: 'blue',
    fontSize: 'medium',
    compactMode: false,
    animations: true,
    autoPlayVideos: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Sample quiz analytics data
  const quizAnalytics = {
    totalQuizzes: 45,
    averageScore: 78.5,
    totalTimeSpent: '24h 35m',
    streakDays: 12,
    weeklyProgress: [65, 72, 78, 81, 75, 83, 79],
    subjectPerformance: [
      { subject: 'Mathematics', score: 85, timeSpent: '8h 20m', questionsAnswered: 156 },
      { subject: 'Physics', score: 78, timeSpent: '6h 45m', questionsAnswered: 134 },
      { subject: 'Chemistry', score: 72, timeSpent: '5h 30m', questionsAnswered: 98 },
      { subject: 'Biology', score: 81, timeSpent: '4h 20m', questionsAnswered: 87 }
    ],
    recentQuizzes: [
      { id: '1', title: 'Calculus Basics', score: 85, timeSpent: '12m 30s', date: '2024-01-20', questions: 15 },
      { id: '2', title: 'Organic Chemistry', score: 72, timeSpent: '18m 45s', date: '2024-01-19', questions: 20 },
      { id: '3', title: 'Mechanics', score: 90, timeSpent: '15m 20s', date: '2024-01-18', questions: 18 },
      { id: '4', title: 'Cell Biology', score: 78, timeSpent: '14m 10s', date: '2024-01-17', questions: 16 }
    ],
    questionTiming: [
      { questionId: '1', question: 'What is the derivative of x²?', timeSpent: 45, difficulty: 'easy', correct: true },
      { questionId: '2', question: 'Solve the integral ∫x dx', timeSpent: 78, difficulty: 'medium', correct: true },
      { questionId: '3', question: 'Find the limit as x approaches 0', timeSpent: 120, difficulty: 'hard', correct: false },
      { questionId: '4', question: 'Calculate the area under the curve', timeSpent: 95, difficulty: 'medium', correct: true }
    ]
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'account', label: 'Security', icon: Lock, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'privacy', label: 'Privacy', icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'appearance', label: 'Appearance', icon: Palette, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 'data', label: 'Data & Export', icon: Download, color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const validateProfile = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (profileData.linkedin && !profileData.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'Invalid LinkedIn URL';
    }

    if (profileData.github && !profileData.github.includes('github.com')) {
      newErrors.github = 'Invalid GitHub URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving profile:', profileData);
      setSuccessMessage('Profile updated successfully!');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Changing password');
      setSuccessMessage('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ general: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (settingsType: string, settings: any) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Saving ${settingsType}:`, settings);
      setSuccessMessage('Settings updated successfully!');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ general: 'Failed to update settings. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    alert('Data export will be sent to your email within 24 hours.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Enhanced Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
            <h2 className="text-xl font-bold mb-2">Settings</h2>
            <p className="text-primary-100 text-sm">Customize your experience</p>
          </div>
          
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeSection === section.id
                    ? `${section.bgColor} ${section.color} shadow-md scale-105`
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  activeSection === section.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <section.icon size={18} />
                </div>
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Success Message */}
          {successMessage && (
            <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <span className="text-green-800 font-medium">{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <span className="text-red-800 font-medium">{errors.general}</span>
            </div>
          )}

          <div className="p-8">
            {/* Profile Information */}
            {activeSection === 'profile' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
                    <User size={32} className="text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Profile Information</h2>
                  <p className="text-gray-600">Update your personal information and social links</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={profileData.institution}
                        onChange={(e) => setProfileData({ ...profileData, institution: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all"
                        placeholder="Your institution name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Course
                      </label>
                      <input
                        type="text"
                        value={profileData.course}
                        onChange={(e) => setProfileData({ ...profileData, course: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all"
                        placeholder="Your course/program"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all resize-none"
                        rows={6}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Globe size={20} className="text-blue-600" />
                        Social Links
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            value={profileData.linkedin}
                            onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                              errors.linkedin ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                          {errors.linkedin && (
                            <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            GitHub Profile
                          </label>
                          <input
                            type="url"
                            value={profileData.github}
                            onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                              errors.github ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="https://github.com/yourusername"
                          />
                          {errors.github && (
                            <p className="mt-1 text-sm text-red-600">{errors.github}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Personal Website
                          </label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    <Save size={20} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Account Security */}
            {activeSection === 'account' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-green-50 rounded-2xl mb-4">
                    <Lock size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Account Security</h2>
                  <p className="text-gray-600">Manage your password and security settings</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Current Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 pr-12 transition-all ${
                            errors.currentPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 pr-12 transition-all ${
                            errors.newPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 pr-12 transition-all ${
                            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    <Lock size={20} />
                    {isLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-purple-50 rounded-2xl mb-4">
                    <Shield size={32} className="text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Privacy Settings</h2>
                  <p className="text-gray-600">Control who can see your information and activity</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Visibility</h3>
                    <div className="space-y-4">
                      {[
                        { value: 'public', label: 'Public', description: 'Anyone can view your profile', icon: Globe },
                        { value: 'registered', label: 'Registered Users', description: 'Only registered users can view your profile', icon: User },
                        { value: 'private', label: 'Private', description: 'Only you can view your profile', icon: Lock }
                      ].map((option) => (
                        <label key={option.value} className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-white/50 transition-colors">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option.value}
                            checked={privacySettings.profileVisibility === option.value}
                            onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                            className="mt-1 w-5 h-5 text-purple-600 focus:ring-purple-500 border-gray-300"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <option.icon size={20} className="text-purple-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.description}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'showEmail', label: 'Show Email Address', description: 'Allow others to see your email address', icon: Mail },
                      { key: 'showStats', label: 'Show Statistics', description: 'Display your upload and engagement statistics', icon: BarChart3 },
                      { key: 'allowMessages', label: 'Allow Messages', description: 'Let other users send you messages', icon: Bell },
                      { key: 'showActivity', label: 'Show Activity', description: 'Display your recent activity and uploads', icon: Activity }
                    ].map((setting) => (
                      <div key={setting.key} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-50 rounded-xl">
                            <setting.icon size={20} className="text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 mb-2">{setting.label}</div>
                            <div className="text-sm text-gray-600 mb-4">{setting.description}</div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={privacySettings[setting.key as keyof typeof privacySettings] as boolean}
                                onChange={(e) => setPrivacySettings({ ...privacySettings, [setting.key]: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleSaveSettings('privacy', privacySettings)}
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    <Save size={20} />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-yellow-50 rounded-2xl mb-4">
                    <Bell size={32} className="text-yellow-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Notification Settings</h2>
                  <p className="text-gray-600">Choose what notifications you want to receive</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email', icon: Mail },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications', icon: Bell },
                    { key: 'uploadApproval', label: 'Upload Approval', description: 'Get notified when uploads are approved', icon: CheckCircle },
                    { key: 'newComments', label: 'New Comments', description: 'Notifications for new comments', icon: Bell },
                    { key: 'newRatings', label: 'New Ratings', description: 'Get notified when someone rates your content', icon: Award },
                    { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive weekly activity summary', icon: Calendar },
                    { key: 'marketingEmails', label: 'Marketing Emails', description: 'Updates about features and promotions', icon: Mail },
                    { key: 'desktopNotifications', label: 'Desktop Notifications', description: 'Show notifications on desktop', icon: Monitor }
                  ].map((setting) => (
                    <div key={setting.key} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-yellow-200 transition-all duration-200 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-50 rounded-xl group-hover:bg-yellow-100 transition-colors">
                          <setting.icon size={20} className="text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 mb-2">{setting.label}</div>
                          <div className="text-sm text-gray-600 mb-4">{setting.description}</div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                              onChange={(e) => setNotificationSettings({ ...notificationSettings, [setting.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-yellow-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleSaveSettings('notifications', notificationSettings)}
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    <Save size={20} />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-pink-50 rounded-2xl mb-4">
                    <Palette size={32} className="text-pink-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Appearance</h2>
                  <p className="text-gray-600">Customize how the app looks and feels</p>
                </div>

                <div className="space-y-8">
                  {/* Theme Selection */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                      <Sun size={24} className="text-pink-600" />
                      Theme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: 'Light', icon: Sun, preview: 'bg-white border-gray-200' },
                        { value: 'dark', label: 'Dark', icon: Moon, preview: 'bg-gray-900 border-gray-700' },
                        { value: 'auto', label: 'Auto', icon: Monitor, preview: 'bg-gradient-to-r from-white to-gray-900' }
                      ].map((theme) => (
                        <label key={theme.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="theme"
                            value={theme.value}
                            checked={appearanceSettings.theme === theme.value}
                            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, theme: e.target.value })}
                            className="sr-only peer"
                          />
                          <div className="p-6 border-2 rounded-xl peer-checked:border-pink-500 peer-checked:bg-pink-50 hover:border-pink-300 transition-all">
                            <div className={`w-full h-20 rounded-lg mb-4 border-2 ${theme.preview}`}></div>
                            <div className="flex items-center gap-3">
                              <theme.icon size={20} className="text-pink-600" />
                              <span className="font-semibold text-gray-800">{theme.label}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Accent Color</h3>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                      {[
                        { value: 'blue', color: 'bg-blue-500' },
                        { value: 'green', color: 'bg-green-500' },
                        { value: 'purple', color: 'bg-purple-500' },
                        { value: 'pink', color: 'bg-pink-500' },
                        { value: 'red', color: 'bg-red-500' },
                        { value: 'yellow', color: 'bg-yellow-500' },
                        { value: 'indigo', color: 'bg-indigo-500' },
                        { value: 'teal', color: 'bg-teal-500' }
                      ].map((color) => (
                        <label key={color.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="accentColor"
                            value={color.value}
                            checked={appearanceSettings.accentColor === color.value}
                            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                            className="sr-only peer"
                          />
                          <div className={`w-12 h-12 rounded-xl ${color.color} peer-checked:ring-4 peer-checked:ring-offset-2 peer-checked:ring-gray-300 hover:scale-110 transition-all`}></div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'compactMode', label: 'Compact Mode', description: 'Use less spacing for more content', icon: Smartphone },
                      { key: 'animations', label: 'Animations', description: 'Enable smooth animations and transitions', icon: Zap },
                      { key: 'autoPlayVideos', label: 'Auto-play Videos', description: 'Automatically play videos when visible', icon: Monitor }
                    ].map((setting) => (
                      <div key={setting.key} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-pink-200 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-pink-50 rounded-xl">
                            <setting.icon size={20} className="text-pink-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 mb-2">{setting.label}</div>
                            <div className="text-sm text-gray-600 mb-4">{setting.description}</div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={appearanceSettings[setting.key as keyof typeof appearanceSettings] as boolean}
                                onChange={(e) => setAppearanceSettings({ ...appearanceSettings, [setting.key]: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pink-500"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleSaveSettings('appearance', appearanceSettings)}
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    <Save size={20} />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Enhanced Analytics */}
            {activeSection === 'analytics' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-indigo-50 rounded-2xl mb-4">
                    <BarChart3 size={32} className="text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Analytics</h2>
                  <p className="text-gray-600">Track your progress and performance insights</p>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Target size={24} />
                      <span className="text-blue-100 text-sm font-medium">Total</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{quizAnalytics.totalQuizzes}</div>
                    <div className="text-blue-100 text-sm">Quizzes Completed</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp size={24} />
                      <span className="text-green-100 text-sm font-medium">Average</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{quizAnalytics.averageScore}%</div>
                    <div className="text-green-100 text-sm">Score</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Clock size={24} />
                      <span className="text-purple-100 text-sm font-medium">Total</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{quizAnalytics.totalTimeSpent}</div>
                    <div className="text-purple-100 text-sm">Time Spent</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Award size={24} />
                      <span className="text-orange-100 text-sm font-medium">Current</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{quizAnalytics.streakDays}</div>
                    <div className="text-orange-100 text-sm">Day Streak</div>
                  </div>
                </div>

                {/* Weekly Progress Chart */}
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <TrendingUp size={24} className="text-indigo-600" />
                    Weekly Progress
                  </h3>
                  <div className="h-64 flex items-end justify-between gap-4">
                    {quizAnalytics.weeklyProgress.map((score, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div className="text-sm font-medium text-gray-600">{score}%</div>
                        <div
                          className="bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg w-full transition-all hover:from-indigo-600 hover:to-indigo-500"
                          style={{ height: `${(score / 100) * 200}px` }}
                        />
                        <div className="text-xs text-gray-500">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Performance */}
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <BarChart3 size={24} className="text-indigo-600" />
                    Subject Performance
                  </h3>
                  <div className="space-y-6">
                    {quizAnalytics.subjectPerformance.map((subject, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-800">{subject.subject}</h4>
                          <span className={`text-2xl font-bold ${getScoreColor(subject.score)}`}>
                            {subject.score}%
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-gray-500">Time Spent</div>
                            <div className="font-semibold text-gray-800">{subject.timeSpent}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">Questions</div>
                            <div className="font-semibold text-gray-800">{subject.questionsAnswered}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">Accuracy</div>
                            <div className="font-semibold text-gray-800">{Math.round((subject.score / 100) * 100)}%</div>
                          </div>
                        </div>
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                            style={{ width: `${subject.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Timing Analysis */}
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <Clock size={24} className="text-indigo-600" />
                    Question Timing Analysis
                  </h3>
                  <div className="space-y-4">
                    {quizAnalytics.questionTiming.map((question, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 mb-2">{question.question}</h4>
                            <div className="flex items-center gap-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                                {question.difficulty}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                question.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {question.correct ? 'Correct' : 'Incorrect'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">{formatTime(question.timeSpent)}</div>
                            <div className="text-sm text-gray-500">Time Spent</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              question.timeSpent <= 60 ? 'bg-green-500' :
                              question.timeSpent <= 120 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((question.timeSpent / 180) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>Fast (0-60s)</span>
                          <span>Average (60-120s)</span>
                          <span>Slow (120s+)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Quizzes */}
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <Activity size={24} className="text-indigo-600" />
                    Recent Quiz Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quizAnalytics.recentQuizzes.map((quiz, index) => (
                      <div key={index} className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-800">{quiz.title}</h4>
                          <span className={`text-xl font-bold ${getScoreColor(quiz.score)}`}>
                            {quiz.score}%
                          </span>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time Spent:</span>
                            <span className="font-medium text-gray-800">{quiz.timeSpent}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Questions:</span>
                            <span className="font-medium text-gray-800">{quiz.questions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium text-gray-800">{quiz.date}</span>
                          </div>
                        </div>
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${quiz.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data & Export */}
            {activeSection === 'data' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-red-50 rounded-2xl mb-4">
                    <Download size={32} className="text-red-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Data & Export</h2>
                  <p className="text-gray-600">Manage your data and account deletion</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-blue-100 rounded-2xl">
                        <Download size={32} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-blue-800">Export Your Data</h3>
                        <p className="text-blue-700">Download a complete copy of all your data</p>
                      </div>
                    </div>
                    <p className="text-blue-700 mb-6">
                      Get a comprehensive export including uploads, comments, quiz results, analytics, and activity history in JSON format.
                    </p>
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      <Download size={20} />
                      Export All Data
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-red-100 rounded-2xl">
                        <Trash2 size={32} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-red-800">Delete Account</h3>
                        <p className="text-red-700">Permanently remove your account and all data</p>
                      </div>
                    </div>
                    <p className="text-red-700 mb-6">
                      This action cannot be undone. All your uploads, comments, analytics, and personal data will be permanently deleted.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      <Trash2 size={20} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;