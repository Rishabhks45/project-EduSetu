import React, { useState } from 'react';
import { User, Edit, MapPin, GraduationCap, Calendar, Star, Eye, Download, Award, ExternalLink, Linkedin, Github, Globe, Crown, CheckCircle, Heart } from 'lucide-react';

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

interface ProfileHeaderProps {
  user: UserProfile;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isEditing, onEditToggle }) => {
  const [editedUser, setEditedUser] = useState(user);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'crown':
        return <Crown size={16} />;
      case 'check-circle':
        return <CheckCircle size={16} />;
      case 'heart':
        return <Heart size={16} />;
      default:
        return <Award size={16} />;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin size={16} />;
      case 'github':
        return <Github size={16} />;
      case 'website':
        return <Globe size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    console.log('Saving profile changes:', editedUser);
    onEditToggle();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600"></div>
      
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-lg">
                  <Edit size={16} />
                </button>
              )}
            </div>
            
            <div className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-primary-300 focus:border-primary-600 outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                )}
                
                {/* Badges */}
                <div className="flex gap-1">
                  {user.badges.slice(0, 2).map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-1.5 rounded-full ${badge.color}`}
                      title={badge.description}
                    >
                      {getBadgeIcon(badge.icon)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} />
                  {user.course}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {user.institution}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Joined {formatDate(user.joinDate)}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {user.averageRating} ({user.totalRatings} reviews)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 sm:mt-0">
            {isEditing ? (
              <>
                <button
                  onClick={() => onEditToggle()}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={onEditToggle}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          {isEditing ? (
            <textarea
              value={editedUser.bio}
              onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{user.totalUploads}</div>
            <div className="text-sm text-gray-600">Uploads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{user.totalDownloads.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{user.totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{user.averageRating}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Badges and Social Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-200">
          {/* All Badges */}
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-full ${badge.color} border`}
                title={badge.description}
              >
                {getBadgeIcon(badge.icon)}
                <span className="text-sm font-medium">{badge.name}</span>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {Object.entries(user.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title={`Visit ${platform}`}
              >
                {getSocialIcon(platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;