import React, { useState } from 'react';
import { Video, School, GraduationCap, MapPin, Building, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface VideosSidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  filters: any;
  filterOptions: any;
  onFilterChange: (filterType: string, value: string | boolean) => void;
  onClearFilters: () => void;
}

const VideosSidebar: React.FC<VideosSidebarProps> = ({
  selectedCategory,
  onCategorySelect,
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories']);

  const categories = [
    { id: 'board', name: 'Board Wise', icon: Building, count: 89, description: 'CBSE, ICSE, State Boards' },
    { id: 'university', name: 'University Wise', icon: School, count: 156, description: 'DU, Mumbai Uni, IITs' },
    { id: 'exam', name: 'Exam Wise', icon: GraduationCap, count: 234, description: 'JEE, NEET, GATE' },
    { id: 'state', name: 'State Wise', icon: MapPin, count: 67, description: 'State-specific content' },
  ];

  const filterSections = [
    {
      id: 'content',
      title: 'Content Filters',
      filters: [
        { key: 'videoType', label: 'Video Type', options: filterOptions.videoType },
        { key: 'difficulty', label: 'Difficulty', options: filterOptions.difficulty },
        { key: 'duration', label: 'Duration', options: filterOptions.duration },
        { key: 'author', label: 'Instructor', options: filterOptions.author },
        { key: 'rating', label: 'Rating', options: filterOptions.rating },
      ]
    },
    {
      id: 'quality',
      title: 'Quality Filters',
      filters: [
        { key: 'verified', label: 'Verified Only', type: 'checkbox' },
        { key: 'premium', label: 'Premium Content', type: 'checkbox' },
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection('categories')}
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Filter size={20} />
            Browse Categories
          </h2>
          {isExpanded('categories') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isExpanded('categories') && (
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-colors text-left ${
                  selectedCategory === category.id
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                }`}
              >
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <category.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                </div>
                <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      {filterSections.map((section) => (
        <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div
            className="flex items-center justify-between cursor-pointer mb-4"
            onClick={() => toggleSection(section.id)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
            {isExpanded(section.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {isExpanded(section.id) && (
            <div className="space-y-4">
              {section.filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {filter.label}
                  </label>
                  {filter.type === 'checkbox' ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters[filter.key] || false}
                        onChange={(e) => onFilterChange(filter.key, e.target.checked)}
                        className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{filter.label}</span>
                    </label>
                  ) : (
                    <select
                      value={filters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    >
                      <option value="">All {filter.label}s</option>
                      {filter.options?.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Clear Filters */}
      {Object.values(filters).some(value => value) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            onClick={onClearFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Videos</span>
            <span className="font-semibold text-gray-800">546</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Board Videos</span>
            <span className="font-semibold text-gray-800">89</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">University Lectures</span>
            <span className="font-semibold text-gray-800">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Exam Prep</span>
            <span className="font-semibold text-gray-800">234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">State Content</span>
            <span className="font-semibold text-gray-800">67</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avg. Rating</span>
            <span className="font-semibold text-gray-800">4.7/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosSidebar;