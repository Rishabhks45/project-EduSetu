import React, { useState } from 'react';
import { Play, Eye, Star, Clock, User, Video, Crown, CheckCircle, Building, School, GraduationCap, MapPin, Bookmark, Share2, ExternalLink } from 'lucide-react';
import type { VideoData } from './VideosPage';

interface VideosListViewProps {
  video: VideoData;
}

const VideosListView: React.FC<VideosListViewProps> = ({ video }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getCategoryIcon = () => {
    switch (video.category) {
      case 'board':
        return <Building size={16} className="text-blue-600" />;
      case 'university':
        return <School size={16} className="text-green-600" />;
      case 'exam':
        return <GraduationCap size={16} className="text-purple-600" />;
      case 'state':
        return <MapPin size={16} className="text-orange-600" />;
      default:
        return <Video size={16} className="text-gray-600" />;
    }
  };

  const getCategoryColor = () => {
    switch (video.category) {
      case 'board':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'university':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'exam':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'state':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getVideoTypeIcon = () => {
    switch (video.videoType) {
      case 'lecture':
        return <Video size={14} className="text-blue-600" />;
      case 'tutorial':
        return <Play size={14} className="text-green-600" />;
      case 'explanation':
        return <Video size={14} className="text-purple-600" />;
      case 'practice':
        return <Video size={14} className="text-orange-600" />;
      case 'review':
        return <Video size={14} className="text-red-600" />;
      default:
        return <Video size={14} className="text-gray-600" />;
    }
  };

  const getDifficultyColor = () => {
    switch (video.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleWatch = () => {
    window.location.href = `/videos/${video.id}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href + `/${video.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `/${video.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-red-200">
      <div className="flex gap-6">
        {/* Thumbnail */}
        <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-xs font-medium border ${getCategoryColor()}`}>
            <div className="flex items-center gap-1">
              {getCategoryIcon()}
              <span className="capitalize hidden sm:inline">{video.category}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded-full p-2">
              <Play size={16} className="text-red-600 ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-2">
                {video.isPremium && (
                  <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Crown size={10} />
                    PREMIUM
                  </span>
                )}
                {video.isVerified && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} />
                    VERIFIED
                  </span>
                )}
                <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {getVideoTypeIcon()}
                  <span className="capitalize">{video.videoType}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
                  {video.difficulty}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1 group-hover:text-red-700 transition-colors">
                {video.title}
              </h3>
              
              {/* Subject and Course */}
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">{video.subject}</span>
                <span className="mx-2">•</span>
                <span>{video.course}</span>
                {video.semester && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{video.semester}</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>

              {/* Chapters Preview */}
              {video.chapters.length > 0 && (
                <div className="text-xs text-gray-500 mb-3">
                  <span className="font-medium">{video.chapters.length} chapters</span>
                  <span className="mx-2">•</span>
                  <span>{video.chapters[0].title}</span>
                  {video.chapters.length > 1 && <span> & more</span>}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {video.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {video.tags.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{video.tags.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col items-end gap-2 ml-4">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">{video.rating}</span>
                <span className="text-xs text-gray-500">({video.totalRatings})</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Eye size={12} />
                {video.viewCount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <User size={12} />
                {video.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {formatDate(video.uploadDate)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
              >
                <Share2 size={16} />
              </button>
              
              <button
                onClick={handleWatch}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <Play size={14} />
                <span className="hidden sm:inline">Watch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosListView;