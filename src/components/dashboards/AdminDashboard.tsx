import React, { useState } from 'react';
import { 
  Users, FileText, Video, BarChart3, Settings, Shield, AlertTriangle, TrendingUp, 
  Eye, Download, Star, Plus, Search, Filter, Menu, X, Bell, Home, Database,
  UserCheck, UserX, Edit, Trash2, ChevronRight, Calendar, Activity, Globe,
  Lock, Mail, Phone, MapPin, Building, GraduationCap, Award, Clock, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, badge: null },
    { id: 'users', label: 'User Management', icon: Users, badge: '12' },
    { id: 'content', label: 'Content Management', icon: FileText, badge: '5' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'system', label: 'System Health', icon: Activity, badge: '2' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    { id: 'security', label: 'Security', icon: Lock, badge: '1' },
    { id: 'reports', label: 'Reports', icon: Database, badge: null }
  ];

  const stats = [
    { label: 'Total Users', value: '12,847', change: '+12%', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Content Items', value: '8,392', change: '+8%', icon: FileText, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Video Hours', value: '2,847', change: '+15%', icon: Video, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Monthly Revenue', value: '$24,891', change: '+23%', icon: TrendingUp, color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  ];

  const recentUsers = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'user', 
      status: 'active', 
      joinDate: '2024-01-20',
      lastLogin: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'teacher', 
      status: 'active', 
      joinDate: '2024-01-19',
      lastLogin: '1 day ago',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    { 
      id: '3', 
      name: 'Bob Wilson', 
      email: 'bob@example.com', 
      role: 'user', 
      status: 'pending', 
      joinDate: '2024-01-18',
      lastLogin: 'Never',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const recentContent = [
    { 
      id: '1', 
      title: 'Advanced Physics Notes', 
      author: 'Dr. Smith', 
      type: 'notes', 
      status: 'published', 
      views: 1234,
      uploadDate: '2024-01-20',
      category: 'Physics'
    },
    { 
      id: '2', 
      title: 'Chemistry Lab Video', 
      author: 'Prof. Johnson', 
      type: 'video', 
      status: 'pending', 
      views: 0,
      uploadDate: '2024-01-19',
      category: 'Chemistry'
    },
    { 
      id: '3', 
      title: 'Math PYQ 2024', 
      author: 'Admin', 
      type: 'pyq', 
      status: 'published', 
      views: 856,
      uploadDate: '2024-01-18',
      category: 'Mathematics'
    }
  ];

  const systemAlerts = [
    { id: '1', type: 'warning', message: 'Server storage is 85% full', time: '2 hours ago', severity: 'medium' },
    { id: '2', type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '4 hours ago', severity: 'low' },
    { id: '3', type: 'error', message: 'Failed login attempts detected', time: '6 hours ago', severity: 'high' }
  ];

  const handleUserAction = (action: string, userId?: string) => {
    switch (action) {
      case 'add':
        setShowUserModal(true);
        break;
      case 'edit':
        console.log('Edit user:', userId);
        setShowUserModal(true);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this user?')) {
          console.log('Delete user:', userId);
        }
        break;
      case 'activate':
        console.log('Activate user:', userId);
        break;
      case 'deactivate':
        console.log('Deactivate user:', userId);
        break;
      case 'bulk-delete':
        if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          console.log('Bulk delete users:', selectedUsers);
          setSelectedUsers([]);
        }
        break;
    }
  };

  const handleContentAction = (action: string, contentId?: string) => {
    switch (action) {
      case 'approve':
        console.log('Approve content:', contentId);
        break;
      case 'reject':
        console.log('Reject content:', contentId);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this content?')) {
          console.log('Delete content:', contentId);
        }
        break;
      case 'feature':
        console.log('Feature content:', contentId);
        break;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">Admin Panel</h2>
                  <p className="text-xs text-gray-500">System Control</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
              alt={user?.name}
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon size={24} className={stat.color} />
                      </div>
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* System Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${
                      alert.type === 'error' ? 'bg-red-50 border-red-200' :
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className={
                          alert.type === 'error' ? 'text-red-600' :
                          alert.type === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        } />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-xs text-gray-500">{alert.time}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity} priority
                            </span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                    <button 
                      onClick={() => handleUserAction('add')}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Add User
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border border-gray-300"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{user.lastLogin}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Content</h3>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      Manage Content
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentContent.map((content) => (
                      <div key={content.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {content.type === 'video' ? <Video size={16} /> : 
                           content.type === 'notes' ? <FileText size={16} /> : 
                           <FileText size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{content.title}</p>
                          <p className="text-sm text-gray-600">by {content.author}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(content.status)}`}>
                            {content.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{content.views} views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* User Management Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <p className="text-gray-600">Manage all users and their permissions</p>
                </div>
                <button 
                  onClick={() => handleUserAction('add')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add User
                </button>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter size={16} />
                      Filter
                    </button>
                    {selectedUsers.length > 0 && (
                      <button 
                        onClick={() => handleUserAction('bulk-delete')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                        Delete ({selectedUsers.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(recentUsers.map(u => u.id));
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, user.id]);
                                } else {
                                  setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                }
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border border-gray-300"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleUserAction('edit', user.id)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                              >
                                <Edit size={16} />
                              </button>
                              {user.status === 'active' ? (
                                <button 
                                  onClick={() => handleUserAction('deactivate', user.id)}
                                  className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                                >
                                  <UserX size={16} />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleUserAction('activate', user.id)}
                                  className="text-green-600 hover:text-green-900 p-1 rounded"
                                >
                                  <UserCheck size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => handleUserAction('delete', user.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Content Management Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Content Management</h2>
                  <p className="text-gray-600">Review and manage all platform content</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Bulk Approve
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Bulk Reject
                  </button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentContent.map((content) => (
                  <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(content.status)}`}>
                        {content.status}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{content.type}</span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{content.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">by {content.author}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{content.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Views:</span>
                        <span>{content.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Upload Date:</span>
                        <span>{content.uploadDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {content.status === 'pending' ? (
                        <>
                          <button 
                            onClick={() => handleContentAction('approve', content.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleContentAction('reject', content.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleContentAction('feature', content.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Feature
                          </button>
                          <button 
                            onClick={() => handleContentAction('delete', content.id)}
                            className="px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!['overview', 'users', 'content'].includes(activeTab) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Settings size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h3>
              <p className="text-gray-600 mb-6">
                This section is under development. Advanced features coming soon!
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Request Feature
              </button>
            </div>
          )}
        </main>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="user">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  console.log('Creating user...');
                  setShowUserModal(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;