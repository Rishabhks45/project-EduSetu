import React, { useState } from 'react';
import { Search, Filter, Grid, List, SortAsc, SortDesc, Eye, Download, Star, Edit, Trash2, MoreVertical, Calendar, FileText, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface Upload {
  id: string;
  title: string;
  type: 'notes' | 'pyq';
  subject: string;
  course: string;
  category: string;
  uploadDate: string;
  status: 'published' | 'pending' | 'rejected';
  views: number;
  downloads: number;
  rating: number;
  totalRatings: number;
  thumbnail: string;
  fileSize: string;
  tags: string[];
}

interface UserUploadsProps {
  userId: string;
}

const UserUploads: React.FC<UserUploadsProps> = ({ userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample uploads data
  const uploads: Upload[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      type: 'notes',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      category: 'University',
      uploadDate: '2024-01-20',
      status: 'published',
      views: 2845,
      downloads: 1234,
      rating: 4.8,
      totalRatings: 156,
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      fileSize: '15.2 MB',
      tags: ['Data Structures', 'Algorithms', 'Programming']
    },
    {
      id: '2',
      title: 'Database Management Systems PYQ 2023',
      type: 'pyq',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      category: 'University',
      uploadDate: '2024-01-18',
      status: 'published',
      views: 1890,
      downloads: 892,
      rating: 4.6,
      totalRatings: 89,
      thumbnail: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
      fileSize: '8.5 MB',
      tags: ['DBMS', 'SQL', 'Database']
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals',
      type: 'notes',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      category: 'University',
      uploadDate: '2024-01-15',
      status: 'pending',
      views: 0,
      downloads: 0,
      rating: 0,
      totalRatings: 0,
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      fileSize: '22.1 MB',
      tags: ['Machine Learning', 'AI', 'Python']
    },
    // Add more sample uploads
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 4}`,
      title: `Sample Upload ${i + 4}`,
      type: i % 2 === 0 ? 'notes' : 'pyq' as 'notes' | 'pyq',
      subject: ['Physics', 'Chemistry', 'Mathematics'][i % 3],
      course: 'Sample Course',
      category: 'University',
      uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: ['published', 'pending', 'rejected'][i % 3] as 'published' | 'pending' | 'rejected',
      views: Math.floor(Math.random() * 5000),
      downloads: Math.floor(Math.random() * 2000),
      rating: 4.0 + Math.random(),
      totalRatings: Math.floor(Math.random() * 200),
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      fileSize: `${Math.floor(Math.random() * 20) + 5}.${Math.floor(Math.random() * 9)} MB`,
      tags: ['Sample', 'Education']
    }))
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'notes' ? <BookOpen size={16} /> : <FileText size={16} />;
  };

  const getFilteredUploads = () => {
    let filtered = uploads.filter(upload => {
      const matchesSearch = upload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           upload.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           upload.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = !filterStatus || upload.status === filterStatus;
      const matchesType = !filterType || upload.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'newest':
          comparison = new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
          break;
        case 'popular':
          comparison = b.views - a.views;
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  };

  const filteredUploads = getFilteredUploads();
  const totalPages = Math.ceil(filteredUploads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUploads = filteredUploads.slice(startIndex, endIndex);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === currentUploads.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentUploads.map(upload => upload.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    setSelectedItems([]);
  };

  const handleEdit = (id: string) => {
    console.log('Editing upload:', id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this upload?')) {
      console.log('Deleting upload:', id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="Search your uploads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Types</option>
              <option value="notes">Notes</option>
              <option value="pyq">PYQs</option>
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
                checked={selectedItems.length === currentUploads.length && currentUploads.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
              </span>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
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
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
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
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredUploads.length)} of {filteredUploads.length} uploads
        </p>
        
        {totalPages > 1 && (
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Uploads Display */}
      {currentUploads.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUploads.map((upload) => (
                <div key={upload.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(upload.id)}
                      onChange={() => handleSelectItem(upload.id)}
                      className="absolute top-3 left-3 w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded z-10"
                    />
                    
                    <div className="h-32 overflow-hidden">
                      <img
                        src={upload.thumbnail}
                        alt={upload.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                      {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                    </div>

                    {/* Actions Menu */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="relative">
                        <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center gap-1 text-xs text-gray-600">
                        {getTypeIcon(upload.type)}
                        {upload.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-600">{upload.subject}</span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {upload.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(upload.uploadDate)}
                      </span>
                      <span>{upload.fileSize}</span>
                    </div>

                    {upload.status === 'published' && (
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {upload.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download size={12} />
                          {upload.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          {upload.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(upload.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(upload.id)}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentUploads.map((upload) => (
                <div key={upload.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(upload.id)}
                      onChange={() => handleSelectItem(upload.id)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    />
                    
                    <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={upload.thumbnail}
                        alt={upload.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                              {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              {getTypeIcon(upload.type)}
                              {upload.type.toUpperCase()}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">
                            {upload.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {upload.subject} • {upload.course}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 ml-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(upload.uploadDate)}
                          </span>
                          
                          {upload.status === 'published' && (
                            <>
                              <span className="flex items-center gap-1">
                                <Eye size={14} />
                                {upload.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download size={14} />
                                {upload.downloads}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-400 fill-current" />
                                {upload.rating.toFixed(1)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {upload.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {upload.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{upload.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(upload.id)}
                            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDelete(upload.id)}
                            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
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
                onClick={() => setCurrentPage(currentPage - 1)}
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
                        onClick={() => setCurrentPage(page as number)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
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
            <FileText size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No uploads found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterStatus || filterType
              ? 'Try adjusting your filters to find what you\'re looking for.'
              : 'You haven\'t uploaded any materials yet. Start sharing your knowledge!'}
          </p>
          {(searchQuery || filterStatus || filterType) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('');
                setFilterType('');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserUploads;