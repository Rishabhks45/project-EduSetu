import React, { useState } from 'react';
import { FileText, Video, Search, TrendingUp, Users, Award, BookOpen, Play, Download, ArrowRight, Star, LogIn, UserPlus } from 'lucide-react';
import GoogleAuth from './auth/GoogleAuth';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search results page with query parameter
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleGoogleLogin = (user: any) => {
    console.log('Google login successful:', user);
    // Redirect to dashboard after successful Google login
    window.location.href = '/';
  };

  const handleGoogleLogout = () => {
    console.log('Google logout');
  };

  const stats = [
    { icon: BookOpen, label: 'Study Materials', value: '10,000+', color: 'text-blue-600' },
    { icon: Video, label: 'Video Lectures', value: '5,000+', color: 'text-red-600' },
    { icon: Users, label: 'Active Students', value: '50,000+', color: 'text-green-600' },
    { icon: Award, label: 'Success Rate', value: '95%', color: 'text-yellow-600' }
  ];

  const quickActions = [
    {
      title: 'Browse Notes',
      description: 'Access comprehensive study notes',
      icon: FileText,
      href: '/notes',
      color: 'bg-blue-600 hover:bg-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Watch Videos',
      description: 'Learn from expert instructors',
      icon: Video,
      href: '/videos',
      color: 'bg-red-600 hover:bg-red-700',
      iconColor: 'text-red-600'
    },
    {
      title: 'Previous Papers',
      description: 'Practice with past exam papers',
      icon: FileText,
      href: '/pyqs',
      color: 'bg-green-600 hover:bg-green-700',
      iconColor: 'text-green-600'
    }
  ];

  const featuredTopics = [
    'Data Structures', 'Machine Learning', 'Physics', 'Chemistry', 'Mathematics', 'Biology'
  ];

  const handleTopicSearch = (topic: string) => {
    window.location.href = `/search?q=${encodeURIComponent(topic)}`;
  };

  return (
    <section className="relative min-h-[700px] flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3769120/pexels-photo-3769120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-secondary-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Ultimate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-100">
                Study Companion
              </span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Access thousands of previous year questions, comprehensive notes, and expert video lectures. 
              Everything you need to excel in your exams, all in one place.
            </p>
          </div>

          {/* Google Sign In CTA */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Get Started in Seconds</h3>
              <div className="flex justify-center">
                <GoogleAuth onLogin={handleGoogleLogin} onLogout={handleGoogleLogout} />
              </div>
              <p className="text-sm opacity-75 mt-3">
                Or <a href="/register" className="underline hover:no-underline">create an account manually</a>
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for notes, videos, or previous year papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 text-gray-800 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200"
                />
                <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Featured Topics */}
            <div className="mt-6">
              <p className="text-sm opacity-75 mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {featuredTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicSearch(topic)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors duration-200 backdrop-blur-sm"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <action.icon size={32} className={action.iconColor} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{action.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/notes"
              className="inline-flex items-center justify-center gap-3 bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FileText size={20} />
              <span>Explore Notes</span>
            </a>
            
            <a
              href="/videos"
              className="inline-flex items-center justify-center gap-3 bg-accent-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Play size={20} />
              <span>Watch Videos</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={16} />
                <span>1M+ Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;