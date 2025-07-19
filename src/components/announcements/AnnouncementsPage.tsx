import React, { useState } from 'react';
import { Bell, Calendar, ExternalLink, AlertTriangle, Upload, Info, ChevronRight, Filter, Clock, Search, SortAsc, SortDesc, ChevronLeft, Grid, List, Bookmark, Share2, Eye, User } from 'lucide-react';

interface AnnouncementData {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'upload' | 'info' | 'urgent' | 'event' | 'maintenance';
  description: string;
  fullContent: string;
  isImportant: boolean;
  readTime: string;
  category: string;
  author: string;
  views: number;
  isRead: boolean;
  tags: string[];
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

const AnnouncementsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'important' | 'popular'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  // Sample announcements data
  const announcements: AnnouncementData[] = [
    {
      id: '1',
      title: "Mid-Semester Examination Schedule Released",
      date: "2024-01-20T10:00:00Z",
      type: "exam",
      description: "The mid-semester examination schedule for all courses has been published. Students are advised to check their exam dates, venues, and reporting times.",
      fullContent: "The mid-semester examination schedule for all courses has been published. Students are advised to check their exam dates, venues, and reporting times. Make sure to carry your admit cards and valid ID proof. The examination will be conducted in offline mode following all safety protocols. Students should report to their respective examination centers 30 minutes before the scheduled time.",
      isImportant: true,
      readTime: "2 min",
      category: "Academic",
      author: "Academic Office",
      views: 2847,
      isRead: false,
      tags: ["Exams", "Schedule", "Important", "Academic"],
      attachments: [
        { name: "Exam_Schedule_2024.pdf", url: "/files/exam-schedule.pdf", type: "pdf" },
        { name: "Exam_Guidelines.pdf", url: "/files/exam-guidelines.pdf", type: "pdf" }
      ]
    },
    {
      id: '2',
      title: "New Video Lecture Series: Advanced Algorithms",
      date: "2024-01-18T14:30:00Z",
      type: "upload",
      description: "A comprehensive video lecture series on Advanced Algorithms has been uploaded covering dynamic programming, graph algorithms, and optimization techniques.",
      fullContent: "We are excited to announce the release of a comprehensive video lecture series on Advanced Algorithms. This series covers dynamic programming, graph algorithms, and optimization techniques with practical examples and real-world applications. The lectures are designed for students in their final year of computer science programs and include hands-on coding exercises. Each video comes with downloadable code samples and practice problems.",
      isImportant: false,
      readTime: "1 min",
      category: "Content",
      author: "Dr. Sarah Johnson",
      views: 1523,
      isRead: true,
      tags: ["Videos", "Algorithms", "Computer Science", "Programming"],
      attachments: [
        { name: "Algorithm_Notes.pdf", url: "/files/algorithm-notes.pdf", type: "pdf" },
        { name: "Code_Samples.zip", url: "/files/code-samples.zip", type: "zip" }
      ]
    },
    {
      id: '3',
      title: "System Maintenance Scheduled",
      date: "2024-01-17T09:00:00Z",
      type: "maintenance",
      description: "The platform will undergo scheduled maintenance on Sunday from 2:00 AM to 5:00 AM IST. Some features may be temporarily unavailable.",
      fullContent: "We will be performing scheduled maintenance on our platform this Sunday from 2:00 AM to 5:00 AM IST to improve system performance and security. During this time, some features may be temporarily unavailable including video streaming, file downloads, and user authentication. We apologize for any inconvenience this may cause and appreciate your patience as we work to enhance your learning experience.",
      isImportant: false,
      readTime: "1 min",
      category: "Technical",
      author: "IT Support Team",
      views: 892,
      isRead: true,
      tags: ["Maintenance", "System", "Downtime", "Technical"]
    },
    {
      id: '4',
      title: "Urgent: Assignment Submission Deadline Extended",
      date: "2024-01-16T16:45:00Z",
      type: "urgent",
      description: "Due to technical issues with the submission portal, the deadline for Computer Networks assignment has been extended by 48 hours.",
      fullContent: "Due to unexpected technical issues with our submission portal that occurred earlier today, we are extending the deadline for the Computer Networks assignment by 48 hours. The new deadline is March 17, 2024, at 11:59 PM. We sincerely apologize for any inconvenience caused and appreciate your understanding. If you have already submitted your assignment, no further action is required.",
      isImportant: true,
      readTime: "1 min",
      category: "Academic",
      author: "Prof. Michael Chen",
      views: 3421,
      isRead: false,
      tags: ["Urgent", "Assignment", "Deadline", "Extension"]
    },
    {
      id: '5',
      title: "Annual Tech Fest 2024 Registration Open",
      date: "2024-01-15T11:20:00Z",
      type: "event",
      description: "Registration is now open for the Annual Tech Fest 2024. Participate in coding competitions, hackathons, and technical workshops.",
      fullContent: "We are thrilled to announce that registration for the Annual Tech Fest 2024 is now open! This year's fest promises to be bigger and better with exciting coding competitions, 48-hour hackathons, technical workshops, and guest lectures from industry experts. Students from all departments are encouraged to participate. Early bird registration is available until February 1st with special discounts. Don't miss this opportunity to showcase your skills and learn from the best in the industry.",
      isImportant: false,
      readTime: "3 min",
      category: "Events",
      author: "Student Activities Committee",
      views: 1876,
      isRead: true,
      tags: ["Event", "Tech Fest", "Competition", "Registration", "Hackathon"]
    },
    // Add more sample announcements
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      title: `Sample Announcement ${i + 6}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      type: ['exam', 'upload', 'info', 'urgent', 'event', 'maintenance'][i % 6] as any,
      description: `This is a sample announcement description for announcement ${i + 6}.`,
      fullContent: `This is the full content for sample announcement ${i + 6}. It contains more detailed information about the announcement.`,
      isImportant: Math.random() > 0.7,
      readTime: `${Math.floor(Math.random() * 5) + 1} min`,
      category: ['Academic', 'Content', 'Technical', 'Events'][i % 4],
      author: `Author ${i + 6}`,
      views: Math.floor(Math.random() * 5000) + 100,
      isRead: Math.random() > 0.3,
      tags: ['Sample', 'Announcement', 'Information']
    }))
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <Calendar size={18} className="text-warning-600" />;
      case 'upload':
        return <Upload size={18} className="text-success-600" />;
      case 'info':
        return <Info size={18} className="text-info-600" />;
      case 'urgent':
        return <AlertTriangle size={18} className="text-error-600" />;
      case 'event':
        return <Calendar size={18} className="text-purple-600" />;
      case 'maintenance':
        return <Info size={18} className="text-gray-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-warning-50 text-warning-800 border-warning-200 hover:bg-warning-100';
      case 'upload':
        return 'bg-success-50 text-success-800 border-success-200 hover:bg-success-100';
      case 'info':
        return 'bg-info-50 text-info-800 border-info-200 hover:bg-info-100';
      case 'urgent':
        return 'bg-error-50 text-error-800 border-error-200 hover:bg-error-100';
      case 'event':
        return 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100';
      case 'maintenance':
        return 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'exam':
        return 'Exam Notice';
      case 'upload':
        return 'New Content';
      case 'info':
        return 'Information';
      case 'urgent':
        return 'Urgent';
      case 'event':
        return 'Event';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Notice';
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

  const getFilteredAnnouncements = () => {
    let filtered = announcements.filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           announcement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = !selectedType || announcement.type === selectedType;
      const matchesCategory = !selectedCategory || announcement.category === selectedCategory;
      const matchesReadStatus = !showUnreadOnly || !announcement.isRead;

      return matchesSearch && matchesType && matchesCategory && matchesReadStatus;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'newest':
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case 'oldest':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'important':
          comparison = (b.isImportant ? 1 : 0) - (a.isImportant ? 1 : 0);
          break;
        case 'popular':
          comparison = b.views - a.views;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  };

  const filteredAnnouncements = getFilteredAnnouncements();
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);

  const handleBookmark = (id: string) => {
    setBookmarkedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleShare = (announcement: AnnouncementData) => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.description,
        url: window.location.href + `/${announcement.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `/${announcement.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const markAsRead = (id: string) => {
    // In a real app, this would make an API call to mark the announcement as read
    console.log('Marking as read:', id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const typeOptions = [
    { value: 'exam', label: 'Exam Notices' },
    { value: 'upload', label: 'New Content' },
    { value: 'info', label: 'Information' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'event', label: 'Events' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const categoryOptions = [
    { value: 'Academic', label: 'Academic' },
    { value: 'Content', label: 'Content' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Events', label: 'Events' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Bell size={32} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">All Announcements</h1>
              <p className="text-gray-600 mt-1">Stay updated with the latest information and notices</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Types</option>
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Unread Filter */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Show unread only</span>
              </label>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="important">Important First</option>
                  <option value="popular">Most Popular</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                >
                  {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAnnouncements.length)} of {filteredAnnouncements.length} announcements
          </p>
          
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Announcements Display */}
        {currentAnnouncements.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {currentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`relative p-6 rounded-xl border transition-all duration-200 cursor-pointer group ${getTypeStyles(announcement.type)} ${
                      !announcement.isRead ? 'ring-2 ring-primary-200' : ''
                    }`}
                    onClick={() => markAsRead(announcement.id)}
                  >
                    {announcement.isImportant && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        IMPORTANT
                      </div>
                    )}

                    {!announcement.isRead && (
                      <div className="absolute top-3 left-3 w-3 h-3 bg-primary-500 rounded-full"></div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-white shadow-sm">
                        {getTypeIcon(announcement.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                                {getTypeLabel(announcement.type)}
                              </span>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                                {announcement.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-current transition-colors">
                              {announcement.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm opacity-75 ml-4">
                            <Clock size={14} />
                            <span>{formatDate(announcement.date)}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm leading-relaxed mb-4 opacity-90">
                          {announcement.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs opacity-75">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {announcement.readTime} read
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye size={12} />
                              {announcement.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {announcement.author}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(announcement.id);
                              }}
                              className={`p-2 rounded-lg transition-colors ${
                                bookmarkedItems.includes(announcement.id)
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-white/50 hover:bg-white'
                              }`}
                            >
                              <Bookmark size={14} className={bookmarkedItems.includes(announcement.id) ? 'fill-current' : ''} />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(announcement);
                              }}
                              className="p-2 bg-white/50 hover:bg-white rounded-lg transition-colors"
                            >
                              <Share2 size={14} />
                            </button>
                            
                            <button className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
                              <span>Read More</span>
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {currentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${
                      !announcement.isRead ? 'border-l-4 border-l-primary-500' : ''
                    }`}
                    onClick={() => markAsRead(announcement.id)}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {!announcement.isRead && (
                          <div className="w-3 h-3 bg-primary-500 rounded-full mb-2"></div>
                        )}
                        <div className="p-3 rounded-full bg-gray-50">
                          {getTypeIcon(announcement.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {announcement.isImportant && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  IMPORTANT
                                </span>
                              )}
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                                {getTypeLabel(announcement.type)}
                              </span>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                                {announcement.category}
                              </span>
                            </div>
                            
                            <h3 className="font-semibold text-xl text-gray-800 mb-2">
                              {announcement.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4">
                              {announcement.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {announcement.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Attachments */}
                            {announcement.attachments && announcement.attachments.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {announcement.attachments.map((attachment, index) => (
                                    <a
                                      key={index}
                                      href={attachment.url}
                                      className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1 rounded-lg"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ExternalLink size={12} />
                                      {attachment.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2 ml-4">
                            <span className="text-sm text-gray-500">{formatDate(announcement.date)}</span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Eye size={14} />
                              <span>{announcement.views}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {announcement.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {announcement.readTime} read
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(announcement.id);
                              }}
                              className={`p-2 rounded-lg transition-colors ${
                                bookmarkedItems.includes(announcement.id)
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                              }`}
                            >
                              <Bookmark size={16} className={bookmarkedItems.includes(announcement.id) ? 'fill-current' : ''} />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(announcement);
                              }}
                              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                            >
                              <Share2 size={16} />
                            </button>
                            
                            <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                              <span>Read Full</span>
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="px-3 py-2 text-gray-500">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page as number)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bell size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedType || selectedCategory || showUnreadOnly
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'No announcements are available at the moment.'}
            </p>
            {(searchQuery || selectedType || selectedCategory || showUnreadOnly) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('');
                  setSelectedCategory('');
                  setShowUnreadOnly(false);
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;