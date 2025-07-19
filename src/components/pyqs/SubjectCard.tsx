import React from 'react';
import { FileText, ChevronRight, Calendar, Building, Award, MapPin } from 'lucide-react';

interface SubjectCardProps {
  code: string;
  name: string;
  university?: string;
  years: string[];
  category: string;
  board?: string;
  exam?: string;
  state?: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  code, 
  name, 
  university, 
  years, 
  category, 
  board, 
  exam, 
  state 
}) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'board':
        return <Building className="text-primary-600" size={16} />;
      case 'university':
        return <Building className="text-primary-600" size={16} />;
      case 'exam':
        return <Award className="text-primary-600" size={16} />;
      case 'state':
        return <MapPin className="text-primary-600" size={16} />;
      default:
        return <FileText className="text-primary-600" size={16} />;
    }
  };

  const getCategoryInfo = () => {
    switch (category) {
      case 'board':
        return board;
      case 'university':
        return university;
      case 'exam':
        return exam;
      case 'state':
        return state;
      default:
        return university;
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case 'board':
        return 'Board';
      case 'university':
        return 'University';
      case 'exam':
        return 'Exam';
      case 'state':
        return 'State';
      default:
        return 'Institution';
    }
  };

  const handleViewPapers = () => {
    // Generate a sample paper ID based on the subject data
    const paperId = `${code.toLowerCase()}-2023-${category}`;
    window.location.href = `/papers/${paperId}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-primary-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {code}
            </span>
            <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded capitalize">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h3>
        </div>
        <div className="p-2 rounded-full bg-primary-50 ml-4">
          <FileText className="text-primary-600" size={20} />
        </div>
      </div>

      {getCategoryInfo() && (
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          {getCategoryIcon()}
          <span>{getCategoryLabel()}: {getCategoryInfo()}</span>
        </div>
      )}

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <h4 className="text-sm font-medium text-gray-700">Available Years:</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <span
              key={year}
              className="px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded border border-primary-200"
            >
              {year}
            </span>
          ))}
        </div>
      </div>

      <button 
        onClick={handleViewPapers}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
      >
        <span>View Papers</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default SubjectCard;