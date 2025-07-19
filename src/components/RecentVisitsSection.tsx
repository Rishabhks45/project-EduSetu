import React from 'react';
import { Clock, FileText, Video, BookOpen, ExternalLink, Trash2 } from 'lucide-react';

interface RecentVisit {
  id: string;
  title: string;
  type: 'notes' | 'video' | 'pyq';
  subject: string;
  url: string;
  visitedAt: string;
  thumbnail?: string;
  duration?: string;
}

const RecentVisitsSection: React.FC = () => {
  // Sample data - in a real app, this would come from localStorage or user session
  const recentVisits: RecentVisit[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      type: 'notes',
      subject: 'Computer Science • Semester 4',
      url: '/notes/data-structures-complete',
      visitedAt: '2 hours ago',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'
    },
    {
      id: '2',
      title: 'Machine Learning Algorithms Explained',
      type: 'video',
      subject: 'Computer Science • Semester 6',
      url: '/videos/ml-algorithms',
      visitedAt: '1 day ago',
      duration: '45:30',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    },
    {
      id: '3',
      title: 'Database Management Systems PYQ 2023',
      type: 'pyq',
      subject: 'Information Technology • Semester 3',
      url: '/pyqs/dbms-2023',
      visitedAt: '2 days ago',
      thumbnail: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg'
    },
    {
      id: '4',
      title: 'Operating Systems Comprehensive Guide',
      type: 'notes',
      subject: 'Computer Science • Semester 4',
      url: '/notes/operating-systems',
      visitedAt: '3 days ago',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'
    },
    {
      id: '5',
      title: 'Network Security Fundamentals',
      type: 'video',
      subject: 'Computer Science • Semester 7',
      url: '/videos/network-security',
      visitedAt: '1 week ago',
      duration: '1:12:45',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes':
        return <BookOpen size={16} className="text-blue-600" />;
      case 'video':
        return <Video size={16} className="text-red-600" />;
      case 'pyq':
        return <FileText size={16} className="text-green-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'video':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pyq':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleRemoveVisit = (id: string) => {
    // In a real app, this would update localStorage or make an API call
    console.log('Removing visit:', id);
  };

  const clearAllVisits = () => {
    // In a real app, this would clear localStorage or make an API call
    console.log('Clearing all recent visits');
  };

  if (recentVisits.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Clock size={24} className="text-primary-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Recently Visited</h2>
              <p className="text-gray-600 mt-1">Continue where you left off</p>
            </div>
          </div>
          
          <button
            onClick={clearAllVisits}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white transition-colors"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {recentVisits.map((visit) => (
            <div
              key={visit.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary-200"
            >
              {/* Thumbnail */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={visit.thumbnail}
                  alt={visit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Type Badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(visit.type)}`}>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(visit.type)}
                    <span className="capitalize">{visit.type}</span>
                  </div>
                </div>

                {/* Duration for videos */}
                {visit.type === 'video' && visit.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {visit.duration}
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveVisit(visit.id);
                  }}
                  className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                  {visit.title}
                </h3>
                
                <p className="text-xs text-gray-600 mb-3">
                  {visit.subject}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {visit.visitedAt}
                  </span>
                  
                  <a
                    href={visit.url}
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/history"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View Full History</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentVisitsSection;