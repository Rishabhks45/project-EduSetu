import React, { useState } from 'react';
import { Clock, FileText, Video, BookOpen, Search, Filter, Calendar, Trash2, Download, Eye, Star, User, ChevronLeft, ChevronRight, Grid, List, SortAsc, SortDesc } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  type: 'notes' | 'video' | 'pyq';
  subject: string;
  course: string;
  url: string;
  visitedAt: string;
  visitCount: number;
  lastVisited: string;
  thumbnail: string;
  duration?: string;
  author: string;
  rating: number;
  downloadCount?: number;
  viewCount: number;
}

const HistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'recent' | 'frequent' | 'title' | 'type'>('recent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample history data
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      type: 'notes',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science • Semester 4',
      url: '/notes/data-structures-complete',
      visitedAt: '2024-01-20T14:30:00Z',
      visitCount: 8,
      lastVisited: '2 hours ago',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      author: 'Dr. Sarah Johnson',
      rating: 4.8,
      downloadCount: 2845,
      viewCount: 15420
    },
    {
      id: '2',
      title: 'Machine Learning Algorithms Explained',
      type: 'video',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science • Semester 6',
      url: '/videos/ml-algorithms',
      visitedAt: '2024-01-19T16:45:00Z',
      visitCount: 3,
      lastVisited: '1 day ago',
      duration: '2:45:30',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      author: 'Prof. Michael Chen',
      rating: 4.9,
      viewCount: 32150
    },
    {
      id: '3',
      title: 'Database Management Systems PYQ 2023',
      type: 'pyq',
      subject: 'Information Technology',
      course: 'Information Technology • Semester 3',
      url: '/pyqs/dbms-2023',
      visitedAt: '2024-01-18T10:15:00Z',
      visitCount: 5,
      lastVisited: '2 days ago',
      thumbnail: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
      author: 'University Board',
      rating: 4.7,
      downloadCount: 3568,
      viewCount: 12340
    },
    // Add more sample items for demonstration
    ...Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 4}`,
      title: `Sample Content ${i + 4}`,
      type: ['notes', 'video', 'pyq'][i % 3] as 'notes' | 'video' | 'pyq',
      subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'][i % 5],
      course: 'Sample Course',
      url: `/content/${i + 4}`,
      visitedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      visitCount: Math.floor(Math.random() * 10) + 1,
      lastVisited: `${Math.floor(Math.random() * 30) + 1} days ago`,
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      author: `Author ${i + 4}`,
      rating: 4.0 + Math.random(),
      downloadCount: Math.floor(Math.random() * 5000) + 100,
      viewCount: Math.floor(Math.random() * 20000) + 1000
    }))
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredItems = () => {
    let filtered = historyItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = !selectedType || item.type === selectedType;
      
      const matchesDate = !selectedDate || (() => {
        const itemDate = new Date(item.visitedAt);
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        switch (selectedDate) {
          case 'today':
            return itemDate.toDateString() === today.toDateString();
          case 'yesterday':
            return itemDate.toDateString() === yesterday.toDateString();
          case 'week':
            return itemDate >= weekAgo;
          case 'month':
            return itemDate >= monthAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesType && matchesDate;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'recent':
          comparison = new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime();
          break;
        case 'frequent':
          comparison = b.visitCount - a.visitCount;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  };

  const filteredItems = getFilteredItems();
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      console.log('Deleting items:', selectedItems);
      setSelectedItems([]);
      // In a real app, this would make an API call to delete the items
    }
  };

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      console.log('Clearing all history');
      // In a real app, this would make an API call to clear all history
    }
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Clock size={32} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Browse History</h1>
              <p className="text-gray-600 mt-1">Track and manage your learning journey</p>
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
                placeholder="Search your history..."
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
                <option value="notes">Notes</option>
                <option value="video">Videos</option>
                <option value="pyq">PYQs</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Bulk Actions */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
                </span>
              </div>

              {selectedItems.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Delete Selected
                </button>
              )}

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
                  <option value="recent">Most Recent</option>
                  <option value="frequent">Most Frequent</option>
                  <option value="title">Title</option>
                  <option value="type">Type</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                >
                  {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                </button>
              </div>

              {/* Clear All */}
              <button
                onClick={clearAllHistory}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} items
          </p>
          
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* History Items */}
        {currentItems.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="absolute top-3 left-3 w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded z-10"
                      />
                      
                      <div className="h-32 overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(item.type)}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </div>

                      {item.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-gray-600 mb-3">
                        {item.course}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>Visited {item.visitCount} times</span>
                        <span>{item.lastVisited}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{item.rating.toFixed(1)}</span>
                        </div>
                        
                        <a
                          href={item.url}
                          className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                        >
                          View Again
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {currentItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                      />
                      
                      <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                                <div className="flex items-center gap-1">
                                  {getTypeIcon(item.type)}
                                  <span className="capitalize">{item.type}</span>
                                </div>
                              </span>
                              {item.duration && (
                                <span className="text-xs text-gray-500">{item.duration}</span>
                              )}
                            </div>
                            
                            <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                              {item.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {item.course}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500 ml-4">
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span>{item.rating.toFixed(1)}</span>
                            </div>
                            
                            {item.downloadCount && (
                              <div className="flex items-center gap-1">
                                <Download size={14} />
                                <span>{item.downloadCount.toLocaleString()}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{item.viewCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {item.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {formatDate(item.visitedAt)}
                            </span>
                            <span>Visited {item.visitCount} times</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => console.log('Remove from history:', item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                            
                            <a
                              href={item.url}
                              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                            >
                              View Again
                            </a>
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
              <Clock size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No history found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedType || selectedDate
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'Start exploring content to build your learning history.'}
            </p>
            {(searchQuery || selectedType || selectedDate) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('');
                  setSelectedDate('');
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

export default HistoryPage;