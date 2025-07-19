import React, { useState } from 'react';
import { TrendingUp, Eye, Download, Star, Calendar, Award, Users, FileText, BookOpen, Target, BarChart3, PieChart, Activity } from 'lucide-react';

interface UserProfile {
  totalUploads: number;
  totalDownloads: number;
  totalViews: number;
  averageRating: number;
  totalRatings: number;
}

interface ProfileStatsProps {
  user: UserProfile;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Sample analytics data
  const analyticsData = {
    week: {
      views: [120, 150, 180, 200, 170, 190, 220],
      downloads: [45, 60, 75, 80, 65, 70, 85],
      uploads: [2, 1, 3, 0, 1, 2, 1],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
      views: [1200, 1500, 1800, 2000, 1700, 1900, 2200, 2100, 2300, 2500, 2400, 2600, 2800, 3000, 2900, 3100, 3200, 3400, 3300, 3500, 3600, 3800, 3700, 3900, 4000, 4200, 4100, 4300, 4400, 4500],
      downloads: [450, 600, 750, 800, 650, 700, 850, 820, 900, 950, 920, 980, 1000, 1100, 1050, 1150, 1200, 1250, 1220, 1300, 1350, 1400, 1380, 1450, 1500, 1550, 1520, 1600, 1650, 1700],
      uploads: [2, 1, 3, 0, 1, 2, 1, 2, 1, 0, 3, 2, 1, 2, 0, 1, 3, 2, 1, 0, 2, 1, 3, 2, 1, 0, 2, 1, 2, 3],
      labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`)
    },
    year: {
      views: [15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000],
      downloads: [5000, 6000, 7500, 8500, 9500, 11000, 12500, 13500, 15000, 16500, 17500, 19000],
      uploads: [8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const currentData = analyticsData[selectedPeriod];

  const achievements = [
    {
      id: '1',
      title: 'First Upload',
      description: 'Uploaded your first study material',
      icon: FileText,
      color: 'text-blue-600 bg-blue-100',
      date: '2023-08-15',
      unlocked: true
    },
    {
      id: '2',
      title: '1K Views',
      description: 'Reached 1,000 total views',
      icon: Eye,
      color: 'text-green-600 bg-green-100',
      date: '2023-09-20',
      unlocked: true
    },
    {
      id: '3',
      title: 'Top Rated',
      description: 'Maintained 4.5+ average rating',
      icon: Star,
      color: 'text-yellow-600 bg-yellow-100',
      date: '2023-10-15',
      unlocked: true
    },
    {
      id: '4',
      title: 'Community Helper',
      description: 'Helped 100+ students',
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
      date: '2023-11-10',
      unlocked: true
    },
    {
      id: '5',
      title: '10K Downloads',
      description: 'Reached 10,000 total downloads',
      icon: Download,
      color: 'text-red-600 bg-red-100',
      date: '2024-01-05',
      unlocked: true
    },
    {
      id: '6',
      title: 'Consistent Creator',
      description: 'Upload materials for 6 months straight',
      icon: Target,
      color: 'text-indigo-600 bg-indigo-100',
      date: null,
      unlocked: false
    }
  ];

  const subjectBreakdown = [
    { subject: 'Computer Science', uploads: 12, percentage: 50 },
    { subject: 'Mathematics', uploads: 6, percentage: 25 },
    { subject: 'Physics', uploads: 4, percentage: 17 },
    { subject: 'Chemistry', uploads: 2, percentage: 8 }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'upload',
      title: 'Uploaded "Advanced Algorithms Notes"',
      date: '2 hours ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Reached 1,000 downloads milestone',
      date: '1 day ago',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      id: '3',
      type: 'rating',
      title: 'Received 5-star rating on "Data Structures Guide"',
      date: '2 days ago',
      icon: Star,
      color: 'text-green-600'
    },
    {
      id: '4',
      type: 'upload',
      title: 'Uploaded "Database PYQ 2023"',
      date: '3 days ago',
      icon: FileText,
      color: 'text-blue-600'
    }
  ];

  const getMaxValue = (data: number[]) => Math.max(...data);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="text-blue-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{user.totalUploads}</div>
          <div className="text-sm text-gray-600">Total Uploads</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Eye className="text-green-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+18%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{user.totalViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Download className="text-purple-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+25%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{user.totalDownloads.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Star className="text-yellow-600" size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+0.2</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{user.averageRating}</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views & Downloads Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Views & Downloads</h3>
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 relative">
            {/* Simple bar chart representation */}
            <div className="flex items-end justify-between h-full gap-1">
              {currentData.views.slice(-10).map((views, index) => {
                const downloads = currentData.downloads.slice(-10)[index];
                const maxViews = getMaxValue(currentData.views.slice(-10));
                const maxDownloads = getMaxValue(currentData.downloads.slice(-10));
                
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex gap-1 items-end h-48">
                      <div
                        className="bg-blue-500 rounded-t min-w-[8px]"
                        style={{ height: `${(views / maxViews) * 100}%` }}
                        title={`Views: ${views}`}
                      />
                      <div
                        className="bg-green-500 rounded-t min-w-[8px]"
                        style={{ height: `${(downloads / maxDownloads) * 100}%` }}
                        title={`Downloads: ${downloads}`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {currentData.labels.slice(-10)[index]}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Downloads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Subject Breakdown</h3>
          </div>

          <div className="space-y-4">
            {subjectBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${['blue', 'green', 'purple', 'yellow'][index]}-500`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${['blue', 'green', 'purple', 'yellow'][index]}-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.uploads}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{user.totalUploads}</div>
              <div className="text-sm text-gray-600">Total Materials</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  achievement.unlocked
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-100 bg-gray-25 opacity-60'
                }`}
              >
                <div className={`p-3 rounded-full ${achievement.color}`}>
                  <achievement.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      Unlocked on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.unlocked && (
                  <div className="text-green-600">
                    <Award size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <activity.icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-gray-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Performance Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
            <div className="text-sm text-blue-800 font-medium mb-1">Engagement Rate</div>
            <div className="text-xs text-blue-600">Above average</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">4.7</div>
            <div className="text-sm text-green-800 font-medium mb-1">Quality Score</div>
            <div className="text-xs text-green-600">Excellent</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-sm text-purple-800 font-medium mb-1">Helpfulness</div>
            <div className="text-xs text-purple-600">Highly rated</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Consider uploading more materials in Mathematics to diversify your portfolio</li>
            <li>• Your Computer Science materials are performing exceptionally well</li>
            <li>• Adding more detailed descriptions could improve discoverability</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;