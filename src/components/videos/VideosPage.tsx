import React, { useState } from 'react';
import { Search, Filter, Video, Download, Eye, Star, Clock, User, Grid, List, SortAsc, SortDesc, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import VideosSidebar from './VideosSidebar';
import VideoCard from './VideoCard';
import VideosListView from './VideosListView';

export interface VideoData {
  id: string;
  title: string;
  subject: string;
  course: string;
  semester: string;
  university: string;
  board: string;
  exam: string;
  state: string;
  author: string;
  description: string;
  tags: string[];
  viewCount: number;
  rating: number;
  totalRatings: number;
  duration: string;
  uploadDate: string;
  lastUpdated: string;
  thumbnail: string;
  videoUrl: string;
  category: 'board' | 'university' | 'exam' | 'state';
  videoType: 'lecture' | 'tutorial' | 'explanation' | 'practice' | 'review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isVerified: boolean;
  isPremium: boolean;
  chapters: Array<{
    title: string;
    timestamp: string;
  }>;
}

const VideosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating' | 'duration'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    board: '',
    university: '',
    exam: '',
    state: '',
    subject: '',
    course: '',
    semester: '',
    videoType: '',
    difficulty: '',
    author: '',
    rating: '',
    duration: '',
    verified: false,
    premium: false
  });

  // Sample videos data
  const videos: VideoData[] = [
    {
      id: '1',
      title: 'Complete Data Structures & Algorithms Course',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      semester: 'Semester 4',
      university: 'Delhi University',
      board: '',
      exam: '',
      state: 'Delhi',
      author: 'Dr. Sarah Johnson',
      description: 'Comprehensive course covering all fundamental data structures and algorithms with practical implementations and real-world examples.',
      tags: ['Data Structures', 'Algorithms', 'Programming', 'Computer Science', 'Coding'],
      viewCount: 45230,
      rating: 4.8,
      totalRatings: 892,
      duration: '8:45:30',
      uploadDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'university',
      videoType: 'lecture',
      difficulty: 'intermediate',
      isVerified: true,
      isPremium: false,
      chapters: [
        { title: 'Introduction to Data Structures', timestamp: '0:00' },
        { title: 'Arrays and Linked Lists', timestamp: '1:30:00' },
        { title: 'Stacks and Queues', timestamp: '3:15:00' },
        { title: 'Trees and Graphs', timestamp: '5:00:00' },
        { title: 'Sorting Algorithms', timestamp: '6:45:00' }
      ]
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals Explained',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      semester: 'Semester 6',
      university: 'Mumbai University',
      board: '',
      exam: '',
      state: 'Maharashtra',
      author: 'Prof. Michael Chen',
      description: 'Deep dive into machine learning concepts, algorithms, and practical applications with hands-on examples.',
      tags: ['Machine Learning', 'AI', 'Python', 'Data Science', 'Algorithms'],
      viewCount: 32150,
      rating: 4.9,
      totalRatings: 567,
      duration: '6:20:15',
      uploadDate: '2024-01-10',
      lastUpdated: '2024-01-18',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'university',
      videoType: 'lecture',
      difficulty: 'advanced',
      isVerified: true,
      isPremium: true,
      chapters: [
        { title: 'Introduction to ML', timestamp: '0:00' },
        { title: 'Supervised Learning', timestamp: '1:45:00' },
        { title: 'Unsupervised Learning', timestamp: '3:30:00' },
        { title: 'Neural Networks', timestamp: '4:50:00' }
      ]
    },
    {
      id: '3',
      title: 'JEE Physics Complete Preparation',
      subject: 'Physics',
      course: 'JEE Preparation',
      semester: '',
      university: '',
      board: '',
      exam: 'JEE Main',
      state: '',
      author: 'Dr. Priya Sharma',
      description: 'Complete physics preparation for JEE Main and Advanced with solved examples and practice problems.',
      tags: ['JEE', 'Physics', 'Mechanics', 'Thermodynamics', 'Optics'],
      viewCount: 78940,
      rating: 4.7,
      totalRatings: 1234,
      duration: '12:30:45',
      uploadDate: '2024-01-08',
      lastUpdated: '2024-01-16',
      thumbnail: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'exam',
      videoType: 'tutorial',
      difficulty: 'advanced',
      isVerified: true,
      isPremium: false,
      chapters: [
        { title: 'Mechanics', timestamp: '0:00' },
        { title: 'Thermodynamics', timestamp: '3:00:00' },
        { title: 'Waves and Optics', timestamp: '6:15:00' },
        { title: 'Modern Physics', timestamp: '9:30:00' }
      ]
    },
    // Add more sample videos to demonstrate pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 4}`,
      title: `Sample Video ${i + 4}`,
      subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology'][i % 4],
      course: 'Sample Course',
      semester: `Semester ${(i % 8) + 1}`,
      university: ['Delhi University', 'Mumbai University', 'Bangalore University'][i % 3],
      board: '',
      exam: '',
      state: ['Delhi', 'Maharashtra', 'Karnataka'][i % 3],
      author: `Instructor ${i + 4}`,
      description: `Sample description for video ${i + 4}`,
      tags: ['Sample', 'Education', 'Learning'],
      viewCount: Math.floor(Math.random() * 50000) + 1000,
      rating: 4.0 + Math.random(),
      totalRatings: Math.floor(Math.random() * 500) + 50,
      duration: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
      uploadDate: '2024-01-01',
      lastUpdated: '2024-01-01',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'university' as const,
      videoType: 'lecture' as const,
      difficulty: ['beginner', 'intermediate', 'advanced'][i % 3] as const,
      isVerified: Math.random() > 0.5,
      isPremium: Math.random() > 0.7,
      chapters: [
        { title: 'Introduction', timestamp: '0:00' },
        { title: 'Main Content', timestamp: '1:00:00' }
      ]
    }))
  ];

  const filterOptions = {
    board: ['CBSE', 'ICSE', 'Maharashtra State Board', 'Karnataka State Board'],
    university: ['Delhi University', 'Mumbai University', 'Bangalore University', 'IIT Bombay'],
    exam: ['JEE Main', 'JEE Advanced', 'NEET', 'GATE', 'CAT'],
    state: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
    subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    course: ['B.Tech Computer Science', 'B.Tech Engineering', 'JEE Preparation', 'NEET Preparation'],
    semester: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'],
    videoType: ['lecture', 'tutorial', 'explanation', 'practice', 'review'],
    difficulty: ['beginner', 'intermediate', 'advanced'],
    author: ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Priya Sharma'],
    rating: ['4+ Stars', '3+ Stars', '2+ Stars'],
    duration: ['< 1 hour', '1-3 hours', '3-6 hours', '6+ hours']
  };

  const getFilteredVideos = () => {
    let filtered = videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           video.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || video.category === selectedCategory;
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        switch (key) {
          case 'rating':
            const minRating = parseInt(value.charAt(0));
            return video.rating >= minRating;
          case 'duration':
            const durationHours = parseFloat(video.duration.split(':')[0]);
            switch (value) {
              case '< 1 hour': return durationHours < 1;
              case '1-3 hours': return durationHours >= 1 && durationHours < 3;
              case '3-6 hours': return durationHours >= 3 && durationHours < 6;
              case '6+ hours': return durationHours >= 6;
              default: return true;
            }
          case 'verified':
            return !value || video.isVerified;
          case 'premium':
            return !value || video.isPremium;
          default:
            return video[key as keyof VideoData] === value;
        }
      });

      return matchesSearch && matchesCategory && matchesFilters;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'newest':
          comparison = new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
          break;
        case 'popular':
          comparison = b.viewCount - a.viewCount;
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'duration':
          const aDuration = parseFloat(a.duration.split(':')[0]) * 60 + parseFloat(a.duration.split(':')[1]);
          const bDuration = parseFloat(b.duration.split(':')[0]) * 60 + parseFloat(b.duration.split(':')[1]);
          comparison = bDuration - aDuration;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  };

  const filteredVideos = getFilteredVideos();
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      board: '',
      university: '',
      exam: '',
      state: '',
      subject: '',
      course: '',
      semester: '',
      videoType: '',
      difficulty: '',
      author: '',
      rating: '',
      duration: '',
      verified: false,
      premium: false
    });
    setCurrentPage(1);
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
            <div className="p-3 bg-red-100 rounded-xl">
              <Video size={32} className="text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Video Lectures</h1>
              <p className="text-gray-600 mt-1">Learn from expert instructors with comprehensive video content</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <VideosSidebar
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {/* Search Bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search videos by title, description, tags, or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
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
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    >
                      <option value="newest">Newest</option>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="duration">Duration</option>
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

            {/* Results Count and Pagination Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredVideos.length)} of {filteredVideos.length} videos
                {selectedCategory && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-sm rounded">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Wise
                  </span>
                )}
              </p>
              
              {totalPages > 1 && (
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Videos Display */}
            {currentVideos.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {currentVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {currentVideos.map((video) => (
                      <VideosListView key={video.id} video={video} />
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
                                  ? 'bg-red-600 text-white'
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
                  <Video size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                {Object.values(filters).some(value => value) && (
                  <button
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;