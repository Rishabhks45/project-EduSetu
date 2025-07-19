import React, { useState } from 'react';
import { Search, Filter, BookOpen, Download, Eye, Star, Clock, User, Grid, List, SortAsc, SortDesc, ChevronLeft, ChevronRight } from 'lucide-react';
import NotesSidebar from './NotesSidebar';
import NoteCard from './NoteCard';
import NotesListView from './NotesListView';

export interface Note {
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
  downloadCount: number;
  viewCount: number;
  rating: number;
  totalRatings: number;
  fileSize: string;
  pages: number;
  uploadDate: string;
  lastUpdated: string;
  thumbnail: string;
  category: 'board' | 'university' | 'exam' | 'state';
  noteType: 'lecture' | 'summary' | 'reference' | 'assignment' | 'lab';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isVerified: boolean;
  isPremium: boolean;
}

const NotesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating' | 'downloads'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    board: '',
    university: '',
    exam: '',
    state: '',
    subject: '',
    course: '',
    semester: '',
    noteType: '',
    difficulty: '',
    author: '',
    rating: '',
    verified: false,
    premium: false
  });

  // Sample notes data with category-based organization (expanded for pagination)
  const notes: Note[] = [
    {
      id: '1',
      title: 'CBSE Class 12 Physics Complete Notes',
      subject: 'Physics',
      course: 'Class 12',
      semester: '',
      university: '',
      board: 'CBSE',
      exam: '',
      state: '',
      author: 'Dr. Sarah Johnson',
      description: 'Comprehensive physics notes covering all chapters for CBSE Class 12 including mechanics, thermodynamics, optics, and modern physics with solved examples.',
      tags: ['Physics', 'CBSE', 'Class 12', 'Mechanics', 'Thermodynamics', 'Optics'],
      downloadCount: 5245,
      viewCount: 28750,
      rating: 4.8,
      totalRatings: 256,
      fileSize: '15.2 MB',
      pages: 345,
      uploadDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      category: 'board',
      noteType: 'lecture',
      difficulty: 'intermediate',
      isVerified: true,
      isPremium: false
    },
    {
      id: '2',
      title: 'Delhi University Computer Science Semester 4 Notes',
      subject: 'Computer Science',
      course: 'B.Tech Computer Science',
      semester: 'Semester 4',
      university: 'Delhi University',
      board: '',
      exam: '',
      state: 'Delhi',
      author: 'Prof. Michael Chen',
      description: 'Complete study material for DU Computer Science covering Data Structures, Algorithms, Database Management, and Operating Systems.',
      tags: ['Computer Science', 'Data Structures', 'Algorithms', 'DBMS', 'Operating Systems'],
      downloadCount: 3890,
      viewCount: 18420,
      rating: 4.9,
      totalRatings: 203,
      fileSize: '22.1 MB',
      pages: 420,
      uploadDate: '2024-01-10',
      lastUpdated: '2024-01-18',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      category: 'university',
      noteType: 'lecture',
      difficulty: 'advanced',
      isVerified: true,
      isPremium: true
    },
    // Add more sample notes to demonstrate pagination
    ...Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 3}`,
      title: `Sample Note ${i + 3}`,
      subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'][i % 5],
      course: 'Sample Course',
      semester: `Semester ${(i % 8) + 1}`,
      university: ['Delhi University', 'Mumbai University', 'Bangalore University'][i % 3],
      board: ['CBSE', 'ICSE', 'State Board'][i % 3],
      exam: ['JEE', 'NEET', 'GATE'][i % 3],
      state: ['Delhi', 'Maharashtra', 'Karnataka'][i % 3],
      author: `Author ${i + 3}`,
      description: `Sample description for note ${i + 3}`,
      tags: ['Sample', 'Education', 'Learning'],
      downloadCount: Math.floor(Math.random() * 5000) + 100,
      viewCount: Math.floor(Math.random() * 20000) + 1000,
      rating: 4.0 + Math.random(),
      totalRatings: Math.floor(Math.random() * 300) + 50,
      fileSize: `${Math.floor(Math.random() * 20) + 5}.${Math.floor(Math.random() * 9)} MB`,
      pages: Math.floor(Math.random() * 400) + 50,
      uploadDate: '2024-01-01',
      lastUpdated: '2024-01-01',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      category: ['board', 'university', 'exam', 'state'][i % 4] as const,
      noteType: ['lecture', 'summary', 'reference', 'assignment', 'lab'][i % 5] as const,
      difficulty: ['beginner', 'intermediate', 'advanced'][i % 3] as const,
      isVerified: Math.random() > 0.5,
      isPremium: Math.random() > 0.7
    }))
  ];

  const filterOptions = {
    board: ['CBSE', 'ICSE', 'Maharashtra State Board', 'Karnataka State Board', 'Tamil Nadu State Board'],
    university: ['Delhi University', 'Mumbai University', 'Bangalore University', 'IIT Bombay', 'IIT Delhi', 'IIT Madras'],
    exam: ['JEE Main', 'JEE Advanced', 'NEET', 'GATE', 'CAT', 'UPSC', 'SSC'],
    state: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan'],
    subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'],
    course: ['Class 10', 'Class 11', 'Class 12', 'B.Tech Computer Science', 'B.Tech Engineering', 'JEE Preparation', 'NEET Preparation', 'GATE Preparation'],
    semester: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    noteType: ['lecture', 'summary', 'reference', 'assignment', 'lab'],
    difficulty: ['beginner', 'intermediate', 'advanced'],
    author: ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Priya Sharma', 'Prof. Rajesh Kumar', 'Dr. Alex Thompson', 'Ms. Lisa Anderson', 'Prof. David Wilson', 'Dr. Emily Rodriguez'],
    rating: ['4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars']
  };

  const getFilteredNotes = () => {
    let filtered = notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           note.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || note.category === selectedCategory;
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        switch (key) {
          case 'rating':
            const minRating = parseInt(value.charAt(0));
            return note.rating >= minRating;
          case 'verified':
            return !value || note.isVerified;
          case 'premium':
            return !value || note.isPremium;
          default:
            return note[key as keyof Note] === value;
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
        case 'downloads':
          comparison = b.downloadCount - a.downloadCount;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  };

  const filteredNotes = getFilteredNotes();
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotes = filteredNotes.slice(startIndex, endIndex);

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
      noteType: '',
      difficulty: '',
      author: '',
      rating: '',
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

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getActiveFilters = () => {
    switch (selectedCategory) {
      case 'board':
        return ['board', 'subject', 'course'];
      case 'university':
        return ['university', 'course', 'semester'];
      case 'exam':
        return ['exam', 'subject'];
      case 'state':
        return ['state', 'subject', 'course'];
      default:
        return [];
    }
  };

  const getFilterLabel = (filterType: string) => {
    const labels = {
      board: 'Board',
      university: 'University',
      exam: 'Exam',
      state: 'State',
      subject: 'Subject',
      course: 'Course',
      semester: 'Semester',
      noteType: 'Note Type',
      difficulty: 'Difficulty',
      author: 'Author',
      rating: 'Rating'
    };
    return labels[filterType as keyof typeof labels] || filterType;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <BookOpen size={32} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Study Notes</h1>
              <p className="text-gray-600 mt-1">Comprehensive study materials organized by category</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <NotesSidebar
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
                  placeholder="Search notes by title, description, tags, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>

              {/* Dynamic Filters */}
              {selectedCategory && getActiveFilters().length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Filter size={18} className="text-gray-600" />
                      <h3 className="font-medium text-gray-800">Filters</h3>
                    </div>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {getActiveFilters().map((filterType) => (
                      <div key={filterType}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {getFilterLabel(filterType)}
                        </label>
                        <select
                          value={filters[filterType as keyof typeof filters]}
                          onChange={(e) => handleFilterChange(filterType, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="">All {getFilterLabel(filterType)}s</option>
                          {filterOptions[filterType as keyof typeof filterOptions]?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Active Filters Display */}
                  {Object.entries(filters).some(([_, value]) => value) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) => {
                          if (!value) return null;
                          return (
                            <span
                              key={key}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                            >
                              {getFilterLabel(key)}: {typeof value === 'boolean' ? 'Yes' : value}
                              <button
                                onClick={() => handleFilterChange(key, key === 'verified' || key === 'premium' ? false : '')}
                                className="ml-1 hover:text-primary-900"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

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

                  {/* Mobile Filters Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>
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
                      <option value="downloads">Most Downloaded</option>
                    </select>
                    <button
                      onClick={toggleSortOrder}
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
                Showing {startIndex + 1}-{Math.min(endIndex, filteredNotes.length)} of {filteredNotes.length} notes
                {selectedCategory && (
                  <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded">
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

            {/* Notes Display */}
            {currentNotes.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {currentNotes.map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {currentNotes.map((note) => (
                      <NotesListView key={note.id} note={note} />
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
                  <BookOpen size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                {Object.values(filters).some(value => value) && (
                  <button
                    onClick={clearFilters}
                    className="text-primary-600 hover:text-primary-700 font-medium"
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

export default NotesPage;