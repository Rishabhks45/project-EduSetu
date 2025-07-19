import React, { useState } from 'react';
import { 
  Users, FileText, Video, BarChart3, Settings, GraduationCap, Plus, Search, Filter, 
  Menu, X, Bell, Home, Upload, Eye, Download, Star, Edit, Trash2, ChevronRight, 
  Calendar, Activity, Clock, Award, TrendingUp, BookOpen, Play, MessageCircle,
  Target, PieChart, LineChart, UserCheck, AlertCircle, CheckCircle, Globe,
  Bookmark, Share2, Heart, ThumbsUp, MessageSquare, Send, Paperclip, Smile,
  MoreVertical, ArrowUp, ArrowDown, Zap, Brain, Timer, Trophy, Medal,
  Lightbulb, Coffee, Flame, Sparkles, Rocket, Crown, Shield, Diamond
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  course: string;
  totalQuizzes: number;
  averageScore: number;
  timeSpent: number;
  lastActive: string;
  strengths: string[];
  weaknesses: string[];
  trend: 'up' | 'down' | 'stable';
}

interface ContentItem {
  id: string;
  title: string;
  type: 'notes' | 'video' | 'quiz' | 'assignment';
  subject: string;
  status: 'published' | 'draft' | 'pending';
  views: number;
  downloads: number;
  rating: number;
  uploadDate: string;
  thumbnail: string;
  engagement: number;
}

interface QuizAnalytics {
  id: string;
  title: string;
  totalAttempts: number;
  averageScore: number;
  averageTime: number;
  completionRate: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Array<{
    id: string;
    question: string;
    correctRate: number;
    averageTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
}

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(5);

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: Home, badge: null },
    { id: 'students', label: 'Student Progress', icon: Users, badge: '24' },
    { id: 'content', label: 'My Content', icon: FileText, badge: '12' },
    { id: 'quizzes', label: 'Quiz Analytics', icon: Target, badge: '8' },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3, badge: null },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: '3' },
    { id: 'calendar', label: 'Schedule', icon: Calendar, badge: '2' },
    { id: 'resources', label: 'Resources', icon: BookOpen, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const stats = [
    { 
      label: 'Active Students', 
      value: '247', 
      change: '+12%', 
      icon: Users, 
      color: 'text-blue-600', 
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      description: 'Students enrolled in your courses'
    },
    { 
      label: 'Content Items', 
      value: '89', 
      change: '+8%', 
      icon: FileText, 
      color: 'text-green-600', 
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      description: 'Total uploaded materials'
    },
    { 
      label: 'Quiz Completion', 
      value: '94%', 
      change: '+5%', 
      icon: Target, 
      color: 'text-purple-600', 
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      description: 'Average completion rate'
    },
    { 
      label: 'Avg. Performance', 
      value: '87%', 
      change: '+3%', 
      icon: TrendingUp, 
      color: 'text-yellow-600', 
      bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      description: 'Student average scores'
    }
  ];

  const studentProgress: StudentProgress[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      course: 'Computer Science',
      totalQuizzes: 12,
      averageScore: 92,
      timeSpent: 45,
      lastActive: '2 hours ago',
      strengths: ['Algorithms', 'Data Structures'],
      weaknesses: ['Database Design'],
      trend: 'up'
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      course: 'Computer Science',
      totalQuizzes: 10,
      averageScore: 78,
      timeSpent: 32,
      lastActive: '1 day ago',
      strengths: ['Programming'],
      weaknesses: ['Algorithms', 'Math'],
      trend: 'stable'
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      course: 'Computer Science',
      totalQuizzes: 15,
      averageScore: 85,
      timeSpent: 52,
      lastActive: '3 hours ago',
      strengths: ['Database Design', 'Web Development'],
      weaknesses: ['Algorithms'],
      trend: 'up'
    }
  ];

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Introduction to Data Structures',
      type: 'notes',
      subject: 'Computer Science',
      status: 'published',
      views: 1234,
      downloads: 567,
      rating: 4.8,
      uploadDate: '2024-01-15',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      engagement: 89
    },
    {
      id: '2',
      title: 'Algorithm Complexity Analysis',
      type: 'video',
      subject: 'Computer Science',
      status: 'published',
      views: 892,
      downloads: 0,
      rating: 4.6,
      uploadDate: '2024-01-12',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      engagement: 76
    },
    {
      id: '3',
      title: 'Binary Trees Quiz',
      type: 'quiz',
      subject: 'Computer Science',
      status: 'published',
      views: 456,
      downloads: 0,
      rating: 4.9,
      uploadDate: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
      engagement: 94
    }
  ];

  const quizAnalytics: QuizAnalytics[] = [
    {
      id: '1',
      title: 'Data Structures Fundamentals',
      totalAttempts: 156,
      averageScore: 87,
      averageTime: 25,
      completionRate: 94,
      difficulty: 'medium',
      questions: [
        {
          id: 'q1',
          question: 'What is the time complexity of binary search?',
          correctRate: 92,
          averageTime: 45,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          question: 'Implement a balanced BST insertion',
          correctRate: 67,
          averageTime: 180,
          difficulty: 'hard'
        },
        {
          id: 'q3',
          question: 'Explain hash table collision resolution',
          correctRate: 78,
          averageTime: 120,
          difficulty: 'medium'
        }
      ]
    }
  ];

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    studentActivity: [45, 52, 48, 61, 55, 67, 43],
    contentViews: [120, 145, 132, 178, 165, 189, 98],
    quizCompletions: [23, 28, 25, 34, 31, 37, 19]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={16} className="text-green-600" />;
      case 'down':
        return <ArrowDown size={16} className="text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return 'bg-green-500';
    if (engagement >= 70) return 'bg-blue-500';
    if (engagement >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'notes':
        return <BookOpen size={16} className="text-blue-600" />;
      case 'video':
        return <Play size={16} className="text-red-600" />;
      case 'quiz':
        return <Target size={16} className="text-purple-600" />;
      case 'assignment':
        return <FileText size={16} className="text-green-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleContentAction = (action: string, contentId?: string) => {
    switch (action) {
      case 'edit':
        console.log('Edit content:', contentId);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this content?')) {
          console.log('Delete content:', contentId);
        }
        break;
      case 'duplicate':
        console.log('Duplicate content:', contentId);
        break;
      case 'analytics':
        console.log('View analytics for:', contentId);
        break;
    }
  };

  const handleStudentAction = (action: string, studentId: string) => {
    switch (action) {
      case 'message':
        setSelectedStudent(studentId);
        setShowMessageModal(true);
        break;
      case 'progress':
        console.log('View detailed progress for:', studentId);
        break;
      case 'assign':
        console.log('Assign content to:', studentId);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-16'} bg-white shadow-2xl border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg">Teacher Portal</h2>
                  <p className="text-blue-100 text-sm">Content & Analytics</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:scale-102'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeTab === item.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <item.icon size={18} />
              </div>
              {sidebarOpen && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                alt={user?.name}
                className="w-12 h-12 rounded-xl border-2 border-white shadow-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Crown size={12} className="text-yellow-500" />
                  <span className="text-xs text-yellow-600 font-medium">Teacher</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}! Ready to inspire minds today?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Upload size={18} />
                  Upload Content
                </button>
                <button 
                  onClick={() => setShowQuizModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Target size={18} />
                  Create Quiz
                </button>
              </div>
              <button className="relative p-3 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all duration-200">
                <Bell size={22} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className={`${stat.bgColor} p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <stat.icon size={28} />
                        </div>
                        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <TrendingUp size={14} />
                          <span className="text-sm font-bold">{stat.change}</span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-white/90 font-medium mb-1">{stat.label}</div>
                      <div className="text-white/70 text-sm">{stat.description}</div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  </div>
                ))}
              </div>

              {/* Enhanced Analytics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Activity Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Weekly Activity</h3>
                      <p className="text-gray-600">Student engagement and content performance</p>
                    </div>
                    <div className="flex gap-2">
                      {(['week', 'month', 'year'] as const).map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            selectedPeriod === period
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-80 relative">
                    <div className="flex items-end justify-between h-full gap-4">
                      {weeklyData.labels.map((label, index) => {
                        const studentActivity = weeklyData.studentActivity[index];
                        const contentViews = weeklyData.contentViews[index];
                        const quizCompletions = weeklyData.quizCompletions[index];
                        const maxValue = Math.max(...weeklyData.studentActivity, ...weeklyData.contentViews);
                        
                        return (
                          <div key={index} className="flex flex-col items-center gap-2 flex-1">
                            <div className="flex gap-1 items-end h-64">
                              <div
                                className="bg-gradient-to-t from-blue-400 to-blue-500 rounded-t-lg min-w-[12px] hover:from-blue-500 hover:to-blue-600 transition-all duration-200 cursor-pointer shadow-lg"
                                style={{ height: `${(studentActivity / maxValue) * 100}%` }}
                                title={`Student Activity: ${studentActivity}`}
                              />
                              <div
                                className="bg-gradient-to-t from-green-400 to-green-500 rounded-t-lg min-w-[12px] hover:from-green-500 hover:to-green-600 transition-all duration-200 cursor-pointer shadow-lg"
                                style={{ height: `${(contentViews / maxValue) * 100}%` }}
                                title={`Content Views: ${contentViews}`}
                              />
                              <div
                                className="bg-gradient-to-t from-purple-400 to-purple-500 rounded-t-lg min-w-[12px] hover:from-purple-500 hover:to-purple-600 transition-all duration-200 cursor-pointer shadow-lg"
                                style={{ height: `${(quizCompletions / maxValue) * 100}%` }}
                                title={`Quiz Completions: ${quizCompletions}`}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-600">{label}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center gap-6 mt-6 justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-600">Student Activity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-600">Content Views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-600">Quiz Completions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => setShowUploadModal(true)}
                      className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 hover:scale-105 border border-blue-200"
                    >
                      <div className="p-3 bg-blue-500 rounded-xl text-white shadow-lg">
                        <Upload size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Upload Content</div>
                        <div className="text-sm text-gray-600">Add new study materials</div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 ml-auto" />
                    </button>

                    <button 
                      onClick={() => setShowQuizModal(true)}
                      className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 hover:scale-105 border border-purple-200"
                    >
                      <div className="p-3 bg-purple-500 rounded-xl text-white shadow-lg">
                        <Target size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Create Quiz</div>
                        <div className="text-sm text-gray-600">Design interactive assessments</div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 ml-auto" />
                    </button>

                    <button 
                      onClick={() => setActiveTab('students')}
                      className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 hover:scale-105 border border-green-200"
                    >
                      <div className="p-3 bg-green-500 rounded-xl text-white shadow-lg">
                        <Users size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">View Students</div>
                        <div className="text-sm text-gray-600">Monitor student progress</div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 ml-auto" />
                    </button>

                    <button 
                      onClick={() => setActiveTab('analytics')}
                      className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-xl transition-all duration-200 hover:scale-105 border border-yellow-200"
                    >
                      <div className="p-3 bg-yellow-500 rounded-xl text-white shadow-lg">
                        <BarChart3 size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">View Analytics</div>
                        <div className="text-sm text-gray-600">Detailed performance insights</div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 ml-auto" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity and Top Performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Content Performance */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Recent Content</h3>
                    <button 
                      onClick={() => setActiveTab('content')}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:scale-105 transition-all duration-200"
                    >
                      View All
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {contentItems.slice(0, 3).map((content) => (
                      <div key={content.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-102 border border-gray-100">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shadow-md">
                          <img
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getContentTypeIcon(content.type)}
                            <h4 className="font-semibold text-gray-900 truncate">{content.title}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Eye size={12} />
                              {content.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-400 fill-current" />
                              {content.rating}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getEngagementColor(content.engagement)}`}></div>
                              <span>{content.engagement}% engagement</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Students */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Top Performers</h3>
                    <button 
                      onClick={() => setActiveTab('students')}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:scale-105 transition-all duration-200"
                    >
                      View All
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {studentProgress
                      .sort((a, b) => b.averageScore - a.averageScore)
                      .slice(0, 3)
                      .map((student, index) => (
                        <div key={student.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-102 border border-gray-100">
                          <div className="relative">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-12 h-12 rounded-xl border-2 border-white shadow-lg object-cover"
                            />
                            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                            }`}>
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 truncate">{student.name}</h4>
                              {getTrendIcon(student.trend)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPerformanceColor(student.averageScore)}`}>
                                {student.averageScore}%
                              </span>
                              <span>{student.totalQuizzes} quizzes</span>
                              <span>{formatTime(student.timeSpent)} spent</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-8">
              {/* Student Management Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Progress</h2>
                  <p className="text-gray-600">Monitor and support your students' learning journey</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                    <MessageCircle size={18} />
                    Message All
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                    <FileText size={18} />
                    Export Report
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search students by name or course..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
                      <Filter size={18} />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Student Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentProgress.map((student) => (
                  <div key={student.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Student Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-16 h-16 rounded-xl border-3 border-white shadow-lg object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{student.name}</h3>
                            <p className="text-blue-100">{student.course}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {getTrendIcon(student.trend)}
                              <span className="text-sm">{student.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Student Stats */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{student.averageScore}%</div>
                          <div className="text-sm text-blue-800 font-medium">Avg Score</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <div className="text-2xl font-bold text-green-600 mb-1">{student.totalQuizzes}</div>
                          <div className="text-sm text-green-800 font-medium">Quizzes</div>
                        </div>
                      </div>

                      {/* Strengths and Weaknesses */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <Zap size={14} className="text-green-500" />
                            Strengths
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {student.strengths.map((strength, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                                {strength}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <Target size={14} className="text-orange-500" />
                            Areas to Improve
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {student.weaknesses.map((weakness, index) => (
                              <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                                {weakness}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleStudentAction('message', student.id)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={16} />
                          Message
                        </button>
                        <button 
                          onClick={() => handleStudentAction('progress', student.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <BarChart3 size={16} />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="space-y-8">
              {/* Quiz Analytics Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Analytics</h2>
                  <p className="text-gray-600">Detailed insights into quiz performance and question analysis</p>
                </div>
                <button 
                  onClick={() => setShowQuizModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create New Quiz
                </button>
              </div>

              {/* Quiz Overview Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {quizAnalytics.map((quiz) => (
                  <div key={quiz.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Quiz Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Target size={24} />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                        <p className="text-purple-100">{quiz.totalAttempts} attempts</p>
                      </div>
                    </div>

                    {/* Quiz Stats */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <div className="text-2xl font-bold text-green-600 mb-1">{quiz.averageScore}%</div>
                          <div className="text-sm text-green-800 font-medium">Avg Score</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{quiz.completionRate}%</div>
                          <div className="text-sm text-blue-800 font-medium">Completion</div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Average Time</span>
                          <span className="text-sm text-gray-600">{formatTime(quiz.averageTime)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Questions</span>
                          <span className="text-sm text-gray-600">{quiz.questions.length}</span>
                        </div>
                      </div>

                      {/* Question Analysis Preview */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Brain size={14} className="text-purple-500" />
                          Question Performance
                        </h4>
                        <div className="space-y-2">
                          {quiz.questions.slice(0, 2).map((question) => (
                            <div key={question.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-gray-600 truncate flex-1 mr-2">
                                  {question.question}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(question.difficulty)}`}>
                                  {question.difficulty}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-600">
                                <span>{question.correctRate}% correct</span>
                                <span>{formatTime(question.averageTime / 60)} avg</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    question.correctRate >= 80 ? 'bg-green-500' :
                                    question.correctRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${question.correctRate}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
                        <BarChart3 size={16} />
                        View Detailed Analytics
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Question Analysis */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Timer size={28} className="text-purple-500" />
                  Question Timing Analysis
                </h3>
                
                <div className="space-y-6">
                  {quizAnalytics[0]?.questions.map((question, index) => (
                    <div key={question.id} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                              Q{index + 1}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{question.question}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Correct Rate */}
                        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                          <div className="text-2xl font-bold text-green-600 mb-1">{question.correctRate}%</div>
                          <div className="text-sm text-gray-600 font-medium">Correct Rate</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${question.correctRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Average Time */}
                        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round(question.averageTime)}s</div>
                          <div className="text-sm text-gray-600 font-medium">Avg Time</div>
                          <div className="flex items-center justify-center gap-1 mt-2">
                            <Timer size={14} className="text-blue-500" />
                            <span className="text-xs text-gray-500">
                              {question.averageTime < 60 ? 'Fast' : question.averageTime < 120 ? 'Average' : 'Slow'}
                            </span>
                          </div>
                        </div>

                        {/* Performance Category */}
                        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                          <div className="flex items-center justify-center mb-2">
                            {question.correctRate >= 80 ? (
                              <Trophy size={24} className="text-yellow-500" />
                            ) : question.correctRate >= 60 ? (
                              <Medal size={24} className="text-gray-500" />
                            ) : (
                              <Target size={24} className="text-red-500" />
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-600">
                            {question.correctRate >= 80 ? 'Excellent' : 
                             question.correctRate >= 60 ? 'Good' : 'Needs Review'}
                          </div>
                        </div>
                      </div>

                      {/* Insights */}
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb size={16} className="text-blue-600" />
                          <span className="text-sm font-semibold text-blue-800">Insights</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          {question.correctRate < 60 
                            ? "This question may need clarification or additional explanation in class."
                            : question.averageTime > 120
                            ? "Students are taking longer than expected. Consider providing time management tips."
                            : "Students are performing well on this question. Good job!"
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!['overview', 'students', 'quizzes'].includes(activeTab) && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <Settings size={48} className="text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                This section is under development. Advanced features and enhanced functionality coming soon!
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  Request Feature
                </button>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload New Content</h3>
                <p className="text-gray-600">Share knowledge with your students</p>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center group">
                  <BookOpen size={32} className="mx-auto mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-gray-900">Upload Notes</div>
                  <div className="text-sm text-gray-600">PDF, DOC, PPT</div>
                </button>
                <button className="p-6 border-2 border-dashed border-red-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-center group">
                  <Video size={32} className="mx-auto mb-3 text-red-500 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-gray-900">Upload Video</div>
                  <div className="text-sm text-gray-600">MP4, AVI, MOV</div>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter content title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                    rows={4}
                    placeholder="Describe your content"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  console.log('Uploading content...');
                  setShowUploadModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                Upload Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Creation Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Quiz</h3>
                <p className="text-gray-600">Design an interactive assessment for your students</p>
              </div>
              <button 
                onClick={() => setShowQuizModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time Limit</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-200"
                  rows={3}
                  placeholder="Describe what this quiz covers"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Questions</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Number of questions"
                    min="1"
                    max="50"
                  />
                </div>
              </div>

              {/* Quiz Settings */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-purple-600" />
                  Quiz Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Randomize questions</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Show results immediately</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Allow multiple attempts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Track time per question</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowQuizModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  console.log('Creating quiz...');
                  setShowQuizModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;