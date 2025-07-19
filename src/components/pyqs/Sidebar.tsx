import React from 'react';
import { BookOpen, School, GraduationCap, MapPin } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const categories = [
    { id: 'board', name: 'Board Wise', icon: BookOpen },
    { id: 'university', name: 'University Wise', icon: School },
    { id: 'exam', name: 'Exam Wise', icon: GraduationCap },
    { id: 'state', name: 'State Wise', icon: MapPin },
  ];

  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Browse Categories
      </h2>

      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-50 text-primary-700 border border-primary-200'
                : 'hover:bg-gray-50 text-gray-700 border border-transparent'
            }`}
          >
            <category.icon size={20} />
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Category
          </h3>
          <div className="flex items-center gap-2">
            {categories.find(cat => cat.id === selectedCategory)?.icon && (
              React.createElement(categories.find(cat => cat.id === selectedCategory)!.icon, { size: 16, className: "text-primary-600" })
            )}
            <span className="text-sm text-primary-700 font-medium">
              {categories.find(cat => cat.id === selectedCategory)?.name}
            </span>
          </div>
          <button
            onClick={() => onCategorySelect('')}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;