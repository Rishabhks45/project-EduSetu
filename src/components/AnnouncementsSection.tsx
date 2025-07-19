import React, { useState } from 'react';
import { Bell, Calendar, ExternalLink, AlertTriangle, Upload, Info, ChevronRight, Filter, Clock } from 'lucide-react';

interface AnnouncementProps {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'upload' | 'info' | 'urgent';
  description: string;
  isImportant?: boolean;
  readTime?: string;
  category: string;
}

const Announcement: React.FC<AnnouncementProps> = ({ 
  id, 
  title, 
  date, 
  type, 
  description, 
  isImportant = false,
  readTime,
  category
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'exam':
        return 'bg-warning-50 text-warning-800 border-warning-200 hover:bg-warning-100';
      case 'upload':
        return 'bg-success-50 text-success-800 border-success-200 hover:bg-success-100';
      case 'info':
        return 'bg-info-50 text-info-800 border-info-200 hover:bg-info-100';
      case 'urgent':
        return 'bg-error-50 text-error-800 border-error-200 hover:bg-error-100';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'exam':
        return <Calendar size={18} className="text-warning-600" />;
      case 'upload':
        return <Upload size={18} className="text-success-600" />;
      case 'info':
        return <Info size={18} className="text-info-600" />;
      case 'urgent':
        return <AlertTriangle size={18} className="text-error-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'exam':
        return 'Exam Notice';
      case 'upload':
        return 'New Content';
      case 'info':
        return 'Information';
      case 'urgent':
        return 'Urgent';
      default:
        return 'Notice';
    }
  };

  return (
    <div className={`relative p-6 rounded-xl border transition-all duration-200 cursor-pointer group ${getTypeStyles()}`}>
      {isImportant && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          IMPORTANT
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-white shadow-sm">
          {getTypeIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                  {getTypeLabel()}
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                  {category}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-current transition-colors">
                {title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75 ml-4">
              <Clock size={14} />
              <span>{date}</span>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed mb-4 opacity-90">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs opacity-75">
              {readTime && (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {readTime} read
                </span>
              )}
            </div>
            
            <button className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
              <span>Read More</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const announcements: AnnouncementProps[] = [
    {
      id: '1',
      title: "Mid-Semester Examination Schedule Released",
      date: "2 days ago",
      type: "exam",
      description: "The mid-semester examination schedule for all courses has been published. Students are advised to check their exam dates, venues, and reporting times. Make sure to carry your admit cards and valid ID proof.",
      isImportant: true,
      readTime: "2 min",
      category: "Academic"
    },
    {
      id: '2',
      title: "New Video Lecture Series: Advanced Algorithms",
      date: "1 week ago",
      type: "upload",
      description: "A comprehensive video lecture series on Advanced Algorithms has been uploaded. The series covers dynamic programming, graph algorithms, and optimization techniques with practical examples.",
      readTime: "1 min",
      category: "Content"
    },
    {
      id: '3',
      title: "System Maintenance Scheduled",
      date: "3 days ago",
      type: "info",
      description: "The platform will undergo scheduled maintenance on Sunday from 2:00 AM to 5:00 AM IST. Some features may be temporarily unavailable during this period. We apologize for any inconvenience.",
      readTime: "1 min",
      category: "Technical"
    },
    {
      id: '4',
      title: "Urgent: Assignment Submission Deadline Extended",
      date: "5 hours ago",
      type: "urgent",
      description: "Due to technical issues with the submission portal, the deadline for Computer Networks assignment has been extended by 48 hours. New deadline: March 15, 2024, 11:59 PM.",
      isImportant: true,
      readTime: "1 min",
      category: "Academic"
    },
    {
      id: '5',
      title: "New Study Materials Added for Semester 6",
      date: "4 days ago",
      type: "upload",
      description: "Fresh study materials including notes, previous year questions, and reference books have been added for all Semester 6 subjects. Access them from your dashboard.",
      readTime: "2 min",
      category: "Content"
    }
  ];

  const filterOptions = [
    { key: 'all', label: 'All Notices', count: announcements.length },
    { key: 'exam', label: 'Exams', count: announcements.filter(a => a.type === 'exam').length },
    { key: 'upload', label: 'New Content', count: announcements.filter(a => a.type === 'upload').length },
    { key: 'urgent', label: 'Urgent', count: announcements.filter(a => a.type === 'urgent').length }
  ];

  const filteredAnnouncements = activeFilter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.type === activeFilter);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Bell size={24} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Announcements & Notices</h2>
                <p className="text-gray-600 mt-1">Stay updated with the latest information</p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {filterOptions.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeFilter === filter.key
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeFilter === filter.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredAnnouncements.map((announcement) => (
            <Announcement key={announcement.id} {...announcement} />
          ))}
        </div>
        
        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
            <span>View All Announcements</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;