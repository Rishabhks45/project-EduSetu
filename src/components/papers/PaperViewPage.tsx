import React, { useState } from 'react';
import { Download, Eye, Star, Calendar, Building, Award, MapPin, Share2, Bookmark, ArrowLeft, FileText, Clock, Users, ThumbsUp, MessageCircle, Flag, ExternalLink, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface PaperData {
  id: string;
  title: string;
  code: string;
  subject: string;
  year: string;
  category: 'board' | 'university' | 'exam' | 'state';
  institution: string;
  duration: string;
  maxMarks: string;
  examDate: string;
  downloadCount: number;
  viewCount: number;
  rating: number;
  totalRatings: number;
  fileSize: string;
  pages: number;
  description: string;
  tags: string[];
  pdfUrl: string;
  relatedPapers: Array<{
    id: string;
    title: string;
    year: string;
    subject: string;
  }>;
}

const PaperViewPage: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2023');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Sample paper data - in a real app, this would be fetched based on URL params
  const paperData: PaperData = {
    id: 'cs101-2023-du',
    title: 'Introduction to Computer Science - Final Examination',
    code: 'CS101',
    subject: 'Computer Science',
    year: '2023',
    category: 'university',
    institution: 'Delhi University',
    duration: '3 hours',
    maxMarks: '100',
    examDate: 'May 15, 2023',
    downloadCount: 2845,
    viewCount: 15420,
    rating: 4.7,
    totalRatings: 234,
    fileSize: '2.4 MB',
    pages: 8,
    description: 'Final examination paper for Introduction to Computer Science course covering fundamental concepts including programming basics, data structures, algorithms, and computer systems.',
    tags: ['Programming', 'Data Structures', 'Algorithms', 'Computer Systems', 'Final Exam'],
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    relatedPapers: [
      { id: '1', title: 'CS101 Mid-Term 2023', year: '2023', subject: 'Computer Science' },
      { id: '2', title: 'CS101 Final 2022', year: '2022', subject: 'Computer Science' },
      { id: '3', title: 'CS102 Final 2023', year: '2023', subject: 'Advanced Computer Science' },
      { id: '4', title: 'CS101 Final 2021', year: '2021', subject: 'Computer Science' }
    ]
  };

  // Available years for this paper
  const availableYears = ['2024', '2023', '2022', '2021', '2020'];

  const getCategoryIcon = () => {
    switch (paperData.category) {
      case 'board':
        return <Building className="text-primary-600" size={20} />;
      case 'university':
        return <Building className="text-primary-600" size={20} />;
      case 'exam':
        return <Award className="text-primary-600" size={20} />;
      case 'state':
        return <MapPin className="text-primary-600" size={20} />;
      default:
        return <FileText className="text-primary-600" size={20} />;
    }
  };

  const getCategoryLabel = () => {
    switch (paperData.category) {
      case 'board':
        return 'Board Paper';
      case 'university':
        return 'University Paper';
      case 'exam':
        return 'Competitive Exam';
      case 'state':
        return 'State Paper';
      default:
        return 'Paper';
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          
          // Create download link
          const link = document.createElement('a');
          link.href = paperData.pdfUrl;
          link.download = `${paperData.code}_${paperData.year}_${paperData.institution.replace(/\s+/g, '_')}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleViewFile = () => {
    setShowViewer(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: paperData.title,
        text: paperData.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to user's bookmarks
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // In a real app, this would submit the rating to the backend
    console.log('Rating submitted:', rating);
  };

  const handleReport = () => {
    // In a real app, this would open a report dialog
    alert('Report functionality would be implemented here');
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    // In a real app, this would fetch the paper for the selected year
    console.log('Loading paper for year:', year);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Papers</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Paper Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {paperData.code}
                    </span>
                    <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full flex items-center gap-1">
                      {getCategoryIcon()}
                      {getCategoryLabel()}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {paperData.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {paperData.description}
                  </p>
                </div>
              </div>

              {/* Year Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Year
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                        selectedYear === year
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium text-gray-800">{selectedYear}</div>
                  <div className="text-xs text-gray-500">Year</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium text-gray-800">{paperData.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium text-gray-800">{paperData.maxMarks}</div>
                  <div className="text-xs text-gray-500">Max Marks</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <FileText className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium text-gray-800">{paperData.pages} pages</div>
                  <div className="text-xs text-gray-500">Length</div>
                </div>
              </div>

              {/* Institution and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Building className="text-blue-600" size={20} />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{paperData.institution}</div>
                    <div className="text-xs text-gray-500">Institution</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <FileText className="text-green-600" size={20} />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{paperData.subject}</div>
                    <div className="text-xs text-gray-500">Subject</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {paperData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isDownloading ? (
                    <>
                      <div className="absolute inset-0 bg-primary-700 transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                      <span className="relative z-10">Downloading... {downloadProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download PDF
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleViewFile}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Eye size={18} />
                  View File
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <Share2 size={18} />
                  Share
                </button>
                
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isBookmarked
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>

            {/* File Viewer */}
            {showViewer && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Paper Preview</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(paperData.pdfUrl, '_blank')}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Open in New Tab</span>
                    </button>
                    <button
                      onClick={() => setShowViewer(false)}
                      className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm">Close</span>
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src={paperData.pdfUrl}
                    className="w-full h-96 md:h-[600px]"
                    title="Paper Preview"
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Having trouble viewing the file? Try downloading it or opening in a new tab.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                    <button
                      onClick={() => window.open(paperData.pdfUrl, '_blank')}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={16} />
                      Open in New Tab
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Comments & Reviews</h2>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {showComments ? 'Hide' : 'Show'} Comments
                </button>
              </div>

              {/* Rating Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Rate this paper</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className={`transition-colors ${
                          star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star size={20} className={star <= userRating ? 'fill-current' : ''} />
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <span className="text-sm text-gray-600">
                      You rated this {userRating} star{userRating !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {showComments && (
                <div className="space-y-4">
                  {/* Sample Comments */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">A</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-800">Anonymous User</span>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          Great paper! Very helpful for exam preparation. The questions cover all important topics.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <ThumbsUp size={12} />
                            <span>5</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <MessageCircle size={12} />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-700">S</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-800">Student123</span>
                          <span className="text-xs text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          The difficulty level is appropriate for the course. Would recommend for practice.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <ThumbsUp size={12} />
                            <span>3</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <MessageCircle size={12} />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="pt-4">
                    <textarea
                      placeholder="Add your comment..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={handleReport}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                      >
                        <Flag size={12} />
                        Report Issue
                      </button>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Paper Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Paper Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="text-gray-600" size={16} />
                    <span className="text-sm text-gray-700">Downloads</span>
                  </div>
                  <span className="font-medium text-gray-800">{paperData.downloadCount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="text-gray-600" size={16} />
                    <span className="text-sm text-gray-700">Views</span>
                  </div>
                  <span className="font-medium text-gray-800">{paperData.viewCount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm text-gray-700">Rating</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">{paperData.rating}/5</div>
                    <div className="text-xs text-gray-500">({paperData.totalRatings} reviews)</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="text-gray-600" size={16} />
                    <span className="text-sm text-gray-700">File Size</span>
                  </div>
                  <span className="font-medium text-gray-800">{paperData.fileSize}</span>
                </div>
              </div>
            </div>

            {/* Related Papers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Papers</h3>
              
              <div className="space-y-3">
                {paperData.relatedPapers.map((paper) => (
                  <a
                    key={paper.id}
                    href={`/papers/${paper.id}`}
                    className="block p-3 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                      {paper.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{paper.year}</span>
                      <span>•</span>
                      <span>{paper.subject}</span>
                    </div>
                  </a>
                ))}
              </div>
              
              <button className="w-full mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm">
                View More Related Papers
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors">
                  <Users className="text-gray-600" size={16} />
                  <span className="text-sm text-gray-700">Join Study Group</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors">
                  <MessageCircle className="text-gray-600" size={16} />
                  <span className="text-sm text-gray-700">Ask Question</span>
                </button>
                
                <button 
                  onClick={handleReport}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  <Flag className="text-gray-600" size={16} />
                  <span className="text-sm text-gray-700">Report Issue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperViewPage;