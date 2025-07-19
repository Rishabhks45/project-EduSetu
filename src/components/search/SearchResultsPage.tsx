import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, SortAsc, SortDesc, ChevronLeft, ChevronRight, BookOpen, Video, FileText, Eye, Download, Star, Clock, User } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'notes' | 'video' | 'pyq';
  subject: string;
  course: string;
  category: string;
  author: string;
  description: string;
  thumbnail: string;
  rating: number;
  views: number;
  downloads?: number;
  duration?: string;
  uploadDate: string;
  tags: string[];
}

const SearchResultsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'popular' | 'rating'>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  // Sample search results data
  const sampleResults: SearchResult[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      type: 'notes',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      category: 'University',
      author: 'Dr. Sarah Johnson',
      description: 'Comprehensive notes covering all fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      rating: 4.8,
      views: 15420,
      downloads: 2845,
      uploadDate: '2024-01-15',
      tags: ['Data Structures', 'Algorithms', 'Programming', 'Computer Science']
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals Video Course',
      type: 'video',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      category: 'University',
      author: 'Prof. Michael Chen',
      description: 'Complete video course covering machine learning algorithms, neural networks, and practical implementations.',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      rating: 4.9,
      views: 32150,
      duration: '6:20:15',
      uploadDate: '2024-01-10',
      tags: ['Machine Learning', 'AI', 'Python', 'Data Science']
    },
    {
      id: '3',
      title: 'Physics Class 12 Previous Year Questions',
      type: 'pyq',
      subject: 'Physics',
      course: 'Class 12',
      category: 'Board',
      author: 'CBSE Board',
      description: 'Collection of previous year physics questions for Class 12 CBSE board examinations.',
      thumbnail: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
      rating: 4.7,
      views: 28940,
      downloads: 5680,
      uploadDate: '2024-01-08',
      tags: ['Physics', 'CBSE', 'Class 12', 'Previous Year Questions']
    },
    {
      id: '4',
      title: 'Mathematics Calculus Tutorial Series',
      type: 'video',
      subject: 'Mathematics',
      course: 'Class 12',
      category: 'Board',
      author: 'Dr. Priya Sharma',
      description: 'Step-by-step calculus tutorials covering limits, derivatives, and integrals with solved examples.',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      rating: 4.6,
      views: 19850,
      duration: '4:15:30',
      uploadDate: '2024-01-12',
      tags: ['Mathematics', 'Calculus', 'Class 12', 'Tutorial']
    },
    {
      id: '5',
      title: 'Chemistry Organic Compounds Notes',
      type: 'notes',
      subject: 'Chemistry',
      course: 'Class 12',
      category: 'Board',
      author: 'Dr. Rajesh Kumar',
      description: 'Detailed notes on organic chemistry covering hydrocarbons, alcohols, aldehydes, and ketones.',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      rating: 4.5,
      views: 12340,
      downloads: 1890,
      uploadDate: '2024-01-14',
      tags: ['Chemistry', 'Organic Chemistry', 'Class 12', 'CBSE']
    },
    {
      id: '6',
      title: 'Biology NEET Preparation Guide',
      type: 'notes',
      subject: 'Biology',
      course: 'NEET Preparation',
      category: 'Exam',
      author: 'Dr. Anita Verma',
      description: 'Comprehensive biology preparation guide for NEET with important topics and practice questions.',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      rating: 4.8,
      views: 45670,
      downloads: 8920,
      uploadDate: '2024-01-05',
      tags: ['Biology', 'NEET', 'Medical Entrance', 'Preparation']
    }
  ];

  useEffect(() => {
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    const type = urlParams.get('type') || '';
    const subject = urlParams.get('subject') || '';
    const board = urlParams.get('board') || '';
    const course = urlParams.get('course') || '';
    const university = urlParams.get('university') || '';

    setSearchQuery(query);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      // Filter results based on search parameters
      let filtered = sampleResults;

      if (query) {
        filtered = filtered.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase()) ||
          result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          result.subject.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (type) {
        // Map institution type to content categories
        if (type === 'school') {
          filtered = filtered.filter(result => result.category === 'Board');
        } else if (type === 'university') {
          filtered = filtered.filter(result => result.category === 'University');
        }
      }

      if (subject) {
        filtered = filtered.filter(result => 
          result.subject.toLowerCase() === subject.toLowerCase()
        );
      }

      if (board || course || university) {
        filtered = filtered.filter(result => 
          result.course.toLowerCase().includes((board || course || university).toLowerCase())
        );
      }

      setResults(filtered);
      setFilteredResults(filtered);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = results;

    if (filterType) {
      filtered = filtered.filter(result => result.type === filterType);
    }

    if (filterSubject) {
      filtered = filtered.filter(result => result.subject === filterSubject);
    }

    // Sort results
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
        case 'relevance':
        default:
          // Simple relevance based on title match
          const aRelevance = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          const bRelevance = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          comparison = bRelevance - aRelevance;
          break;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [results, filterType, filterSubject, sortBy, sortOrder, searchQuery]);

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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  const uniqueSubjects = Array.from(new Set(results.map(result => result.subject)));

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Search size={32} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Search Results</h1>
              <p className="text-gray-600 mt-1">
                {searchQuery ? `Results for "${searchQuery}"` : 'Browse all study materials'}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <form onSubmit={handleNewSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for notes, videos, or previous year papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <button
                type="submit"
                className="absolute right-2 top-1.5 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="">All Types</option>
                <option value="notes">Notes</option>
                <option value="video">Videos</option>
                <option value="pyq">PYQs</option>
              </select>

              {/* Subject Filter */}
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

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
                  <option value="relevance">Relevance</option>
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} of {filteredResults.length} results
          </p>
          
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Results */}
        {currentResults.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentResults.map((result) => (
                  <div key={result.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={result.thumbnail}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)}`}>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(result.type)}
                          <span className="capitalize">{result.type}</span>
                        </div>
                      </div>

                      {result.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {result.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {result.subject} • {result.course}
                      </p>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {result.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {result.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(result.uploadDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {result.views.toLocaleString()}
                          </span>
                          {result.downloads && (
                            <span className="flex items-center gap-1">
                              <Download size={12} />
                              {result.downloads.toLocaleString()}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            {result.rating}
                          </span>
                        </div>
                        
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          {result.type === 'video' ? 'Watch' : 'View'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {currentResults.map((result) => (
                  <div key={result.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex gap-6">
                      <div className="w-32 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)}`}>
                                <div className="flex items-center gap-1">
                                  {getTypeIcon(result.type)}
                                  <span className="capitalize">{result.type}</span>
                                </div>
                              </span>
                            </div>
                            
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                              {result.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {result.subject} • {result.course}
                            </p>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {result.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500 ml-4">
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {result.views.toLocaleString()}
                            </span>
                            {result.downloads && (
                              <span className="flex items-center gap-1">
                                <Download size={14} />
                                {result.downloads.toLocaleString()}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              {result.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {result.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {formatDate(result.uploadDate)}
                            </span>
                            {result.duration && (
                              <span>{result.duration}</span>
                            )}
                          </div>

                          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            {result.type === 'video' ? 'Watch' : 'View'}
                          </button>
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
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `We couldn't find any results for "${searchQuery}". Try adjusting your search terms or filters.`
                : 'Try searching for specific topics, subjects, or content types.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('');
                  setFilterSubject('');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
              <a
                href="/"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;