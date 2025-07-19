import React, { useState } from 'react';
import { TrendingUp, Download, Clock, Eye, Star, BookOpen, Video, FileText, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface ContentCardProps {
  id: string;
  title: string;
  subject: string;
  type: 'notes' | 'video' | 'pyq';
  downloads: number;
  views: number;
  date: string;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
  thumbnail: string;
  duration?: string;
  author: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  id,
  title, 
  subject, 
  type, 
  downloads, 
  views,
  date,
  rating,
  isNew = false,
  isTrending = false,
  thumbnail,
  duration,
  author
}) => {
  const getTypeIcon = () => {
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

  const getTypeColor = () => {
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

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary-200">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {isTrending && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={12} />
              HOT
            </span>
          )}
        </div>

        {/* Type Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor()}`}>
          <div className="flex items-center gap-1">
            {getTypeIcon()}
            <span className="capitalize">{type}</span>
          </div>
        </div>

        {/* Duration for videos */}
        {type === 'video' && duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Play size={10} />
            {duration}
          </div>
        )}

        {/* Play overlay for videos */}
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded-full p-3">
              <Play size={24} className="text-primary-600 ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Download size={14} />
              {downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {views.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">
          {subject}
        </p>

        <p className="text-gray-500 text-xs mb-4">
          By {author}
        </p>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            {date}
          </span>
          
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            {type === 'video' ? 'Watch' : 'View'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'new'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems: ContentCardProps[] = [
    {
      id: '1',
      title: "Complete Data Structures & Algorithms Course",
      subject: "Computer Science • Semester 4",
      type: "video",
      downloads: 2845,
      views: 15420,
      date: "2 days ago",
      rating: 4.8,
      isNew: true,
      isTrending: true,
      thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      duration: "2:45:30",
      author: "Dr. Sarah Johnson"
    },
    {
      id: '2',
      title: "Machine Learning Comprehensive Notes with Examples",
      subject: "Computer Science • Semester 6",
      type: "notes",
      downloads: 1879,
      views: 8650,
      date: "1 week ago",
      rating: 4.7,
      isTrending: true,
      thumbnail: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
      author: "Prof. Michael Chen"
    },
    {
      id: '3',
      title: "Database Management Systems Final Exam 2024",
      subject: "Information Technology • Semester 3",
      type: "pyq",
      downloads: 3568,
      views: 12340,
      date: "3 days ago",
      rating: 4.9,
      isNew: true,
      thumbnail: "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg",
      author: "University Board"
    },
    {
      id: '4',
      title: "Operating Systems Deep Dive Tutorial Series",
      subject: "Computer Science • Semester 4",
      type: "video",
      downloads: 2023,
      views: 9870,
      date: "2 weeks ago",
      rating: 4.6,
      thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      duration: "1:30:45",
      author: "Tech Academy"
    },
    {
      id: '5',
      title: "Network Security Fundamentals Guide",
      subject: "Computer Science • Semester 7",
      type: "notes",
      downloads: 1456,
      views: 6780,
      date: "1 month ago",
      rating: 4.5,
      thumbnail: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
      author: "Dr. Alex Kumar"
    },
    {
      id: '6',
      title: "Software Engineering Previous Year Papers Collection",
      subject: "Computer Science • Semester 5",
      type: "pyq",
      downloads: 2890,
      views: 11200,
      date: "5 days ago",
      rating: 4.8,
      isNew: true,
      thumbnail: "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg",
      author: "University Board"
    }
  ];

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'trending':
        return featuredItems.filter(item => item.isTrending);
      case 'new':
        return featuredItems.filter(item => item.isNew);
      default:
        return featuredItems;
    }
  };

  const filteredItems = getFilteredItems();
  const itemsPerSlide = 3;
  const maxSlides = Math.ceil(filteredItems.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return filteredItems.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp size={24} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Featured Content</h2>
                <p className="text-gray-600 mt-1">Discover the most popular study materials</p>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {[
              { key: 'all', label: 'All Content', count: featuredItems.length },
              { key: 'trending', label: 'Trending', count: featuredItems.filter(item => item.isTrending).length },
              { key: 'new', label: 'New', count: featuredItems.filter(item => item.isNew).length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setCurrentSlide(0);
                }}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentItems().map((item) => (
              <ContentCard key={item.id} {...item} />
            ))}
          </div>

          {/* Navigation Arrows */}
          {maxSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {maxSlides > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <button className="bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
            Explore All Resources
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;