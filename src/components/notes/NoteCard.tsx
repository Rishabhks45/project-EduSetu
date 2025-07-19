import React, { useState } from 'react';
import { Download, Eye, Star, Clock, User, FileText, Award, Bookmark, Share2, ExternalLink, Crown, CheckCircle, Building, School, GraduationCap, MapPin } from 'lucide-react';
import type { Note } from './NotesPage';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getCategoryIcon = () => {
    switch (note.category) {
      case 'board':
        return <Building size={16} className="text-blue-600" />;
      case 'university':
        return <School size={16} className="text-green-600" />;
      case 'exam':
        return <GraduationCap size={16} className="text-purple-600" />;
      case 'state':
        return <MapPin size={16} className="text-orange-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getCategoryColor = () => {
    switch (note.category) {
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

  const getCategoryInfo = () => {
    switch (note.category) {
      case 'board':
        return note.board;
      case 'university':
        return note.university;
      case 'exam':
        return note.exam;
      case 'state':
        return note.state;
      default:
        return '';
    }
  };

  const getNoteTypeIcon = () => {
    switch (note.noteType) {
      case 'lecture':
        return <FileText size={14} className="text-blue-600" />;
      case 'summary':
        return <FileText size={14} className="text-green-600" />;
      case 'reference':
        return <Bookmark size={14} className="text-purple-600" />;
      case 'assignment':
        return <Award size={14} className="text-orange-600" />;
      case 'lab':
        return <FileText size={14} className="text-red-600" />;
      default:
        return <FileText size={14} className="text-gray-600" />;
    }
  };

  const getDifficultyColor = () => {
    switch (note.difficulty) {
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

  const handleDownload = () => {
    console.log('Downloading note:', note.id);
    // In a real app, this would trigger the download
  };

  const handleView = () => {
    window.location.href = `/notes/${note.id}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: note.description,
        url: window.location.href + `/${note.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `/${note.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary-200">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={note.thumbnail}
          alt={note.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {note.isPremium && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Crown size={12} />
              PREMIUM
            </span>
          )}
          {note.isVerified && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle size={12} />
              VERIFIED
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor()}`}>
          <div className="flex items-center gap-1">
            {getCategoryIcon()}
            <span className="capitalize">{note.category}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isBookmarked
                ? 'bg-yellow-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-full backdrop-blur-sm transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Download size={14} />
              {note.downloadCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {note.viewCount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{note.rating}</span>
            <span className="text-xs text-gray-500">({note.totalRatings})</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {note.title}
        </h3>
        
        {/* Subject and Course */}
        <div className="text-sm text-gray-600 mb-3">
          <p className="font-medium">{note.subject}</p>
          <p>{note.course} {note.semester && `• ${note.semester}`}</p>
        </div>

        {/* Category Info */}
        {getCategoryInfo() && (
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            {getCategoryIcon()}
            <span>{getCategoryInfo()}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {note.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User size={12} />
              {note.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatDate(note.uploadDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
              {getNoteTypeIcon()}
              <span className="capitalize">{note.noteType}</span>
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
              {note.difficulty}
            </span>
          </div>
        </div>

        {/* File Info */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <span>{note.pages} pages</span>
          <span>{note.fileSize}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleView}
            className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <Eye size={16} />
            <span>View</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <Download size={16} />
          </button>
          
          <button
            onClick={() => window.open(`/notes/${note.id}`, '_blank')}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;