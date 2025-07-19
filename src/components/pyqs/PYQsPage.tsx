import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Sidebar from './Sidebar';
import SubjectCard from './SubjectCard';

const PYQsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    board: '',
    university: '',
    exam: '',
    state: '',
    class: '',
    course: '',
    year: ''
  });

  // Sample data - in a real app, this would come from an API
  const filterOptions = {
    board: ['CBSE', 'ICSE', 'State Board', 'NIOS', 'IB'],
    university: ['Delhi University', 'Mumbai University', 'Bangalore University', 'Pune University', 'Chennai University'],
    exam: ['JEE Main', 'JEE Advanced', 'NEET', 'GATE', 'CAT', 'UPSC', 'SSC'],
    state: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan'],
    class: ['Class 10', 'Class 11', 'Class 12'],
    course: ['Engineering', 'Medical', 'Arts', 'Commerce', 'Science'],
    year: ['2024', '2023', '2022', '2021', '2020', '2019']
  };

  const subjects = [
    {
      code: 'CS101',
      name: 'Introduction to Computer Science',
      university: 'Delhi University',
      years: ['2023', '2022', '2021'],
      category: 'university',
      board: '',
      exam: '',
      state: 'Delhi'
    },
    {
      code: 'MTH201',
      name: 'Advanced Mathematics',
      university: 'Mumbai University',
      years: ['2023', '2022', '2021', '2020'],
      category: 'university',
      board: '',
      exam: '',
      state: 'Maharashtra'
    },
    {
      code: 'PHY301',
      name: 'Quantum Physics',
      university: 'IIT Bombay',
      years: ['2023', '2022'],
      category: 'university',
      board: '',
      exam: 'JEE Advanced',
      state: 'Maharashtra'
    },
    {
      code: 'CBSE-PHY-12',
      name: 'Physics Class 12',
      university: '',
      years: ['2024', '2023', '2022'],
      category: 'board',
      board: 'CBSE',
      exam: '',
      state: ''
    },
    {
      code: 'NEET-BIO',
      name: 'Biology for NEET',
      university: '',
      years: ['2024', '2023', '2022', '2021'],
      category: 'exam',
      board: '',
      exam: 'NEET',
      state: ''
    }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || subject.category === selectedCategory;
    
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return subject[key as keyof typeof subject] === value;
    });

    return matchesSearch && matchesCategory && matchesFilters;
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      board: '',
      university: '',
      exam: '',
      state: '',
      class: '',
      course: '',
      year: ''
    });
  };

  const getActiveFilters = () => {
    switch (selectedCategory) {
      case 'board':
        return ['board', 'class', 'year'];
      case 'university':
        return ['university', 'course', 'year'];
      case 'exam':
        return ['exam', 'year'];
      case 'state':
        return ['state', 'year'];
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
      class: 'Class',
      course: 'Course',
      year: 'Year'
    };
    return labels[filterType as keyof typeof labels] || filterType;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Previous Year Questions
            </h1>

            {/* Search Bar and Filters */}
            <div className="space-y-4 mb-8">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>

              {/* Dynamic Filters */}
              {selectedCategory && getActiveFilters().length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                              {getFilterLabel(key)}: {value}
                              <button
                                onClick={() => handleFilterChange(key, '')}
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
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredSubjects.length} {filteredSubjects.length === 1 ? 'result' : 'results'} found
                {selectedCategory && (
                  <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Wise
                  </span>
                )}
              </p>
            </div>

            {/* Subjects Grid */}
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map((subject, index) => (
                  <SubjectCard key={index} {...subject} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
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

export default PYQsPage;