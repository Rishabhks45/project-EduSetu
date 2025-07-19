import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, ArrowLeft, Shield, GraduationCap, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RoleBasedRegister: React.FC = () => {
  const { register, isLoading, error } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'user' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    department: '',
    subjects: [] as string[],
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    {
      id: 'admin' as const,
      title: 'Administrator',
      description: 'System administration and management',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      note: 'Admin registration requires approval'
    },
    {
      id: 'teacher' as const,
      title: 'Teacher',
      description: 'Content creation and student management',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      note: 'Verify your teaching credentials'
    },
    {
      id: 'user' as const,
      title: 'Student',
      description: 'Access learning materials and resources',
      icon: User,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      note: 'Start learning immediately'
    }
  ];

  const subjects = [
    'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Political Science'
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
      if (selectedRole === 'teacher') {
        if (!formData.institution) newErrors.institution = 'Institution is required for teachers';
        if (!formData.department) newErrors.department = 'Department is required for teachers';
        if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3) || !selectedRole) return;

    try {
      await register({
        ...formData,
        role: selectedRole,
        subjects: selectedRole === 'teacher' ? formData.subjects : undefined
      });
      
      // Redirect based on role
      switch (selectedRole) {
        case 'admin':
          window.location.href = '/admin/dashboard';
          break;
        case 'teacher':
          window.location.href = '/teacher/dashboard';
          break;
        case 'user':
          window.location.href = '/';
          break;
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const addSubject = (subject: string) => {
    if (!formData.subjects.includes(subject)) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subject]
      });
    }
  };

  const removeSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter(s => s !== subject)
    });
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="absolute top-6 left-6">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-100 rounded-full">
                <UserPlus size={48} className="text-primary-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join EduNotes
            </h2>
            <p className="text-xl text-gray-600">
              Choose your role to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${role.borderColor} overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className={`h-32 bg-gradient-to-r ${role.color} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-6">
                    <role.icon size={48} className="text-white" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {role.description}
                  </p>
                  
                  <div className={`${role.bgColor} ${role.textColor} p-3 rounded-lg mb-6`}>
                    <p className="text-sm font-medium">{role.note}</p>
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${role.color} text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200`}
                  >
                    Register as {role.title}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentRole = roles.find(r => r.id === selectedRole)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => setSelectedRole(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Role Selection</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className={`inline-flex p-4 rounded-full ${currentRole.bgColor} mb-4`}>
            <currentRole.icon size={48} className={currentRole.textColor} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Register as {currentRole.title}
          </h2>
          <p className="mt-2 text-gray-600">
            Step {currentStep} of 3
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? `bg-gradient-to-r ${currentRole.color} text-white`
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? `bg-gradient-to-r ${currentRole.color}` : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} className="text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Password */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Create a password"
                  />
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Additional Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {selectedRole === 'teacher' && (
                <>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <div className="relative">
                      <input
                        id="institution"
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                          errors.institution ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your institution name"
                      />
                      <Building className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                    {errors.institution && (
                      <p className="mt-1 text-sm text-red-600">{errors.institution}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      id="department"
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your department"
                    />
                    {errors.department && (
                      <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjects You Teach
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {subject}
                          <button
                            type="button"
                            onClick={() => removeSubject(subject)}
                            className="hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => addSubject(subject)}
                          disabled={formData.subjects.includes(subject)}
                          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-colors text-left"
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    {errors.subjects && (
                      <p className="mt-1 text-sm text-red-600">{errors.subjects}</p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
            <div className="text-sm text-gray-600">
              Step {currentStep} of 3
            </div>
            
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  disabled={isLoading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className={`px-6 py-2 bg-gradient-to-r ${currentRole.color} text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-6 py-2 bg-gradient-to-r ${currentRole.color} text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <UserPlus size={18} />
                  )}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </div>

          {/* Already have account */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedRegister;