import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus, Calendar, MapPin, GraduationCap, Building, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import GoogleAuth from './GoogleAuth';

interface RegisterFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  
  // Academic Information
  institution: string;
  institutionType: 'school' | 'university' | 'other';
  course: string;
  semester: string;
  year: string;
  board: string;
  
  // Account Information
  username: string;
  password: string;
  confirmPassword: string;
  
  // Preferences
  interests: string[];
  bio: string;
  
  // Terms
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    institution: '',
    institutionType: 'university',
    course: '',
    semester: '',
    year: new Date().getFullYear().toString(),
    board: '',
    username: '',
    password: '',
    confirmPassword: '',
    interests: [],
    bio: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interestInput, setInterestInput] = useState('');

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic personal details' },
    { number: 2, title: 'Academic Info', description: 'Educational background' },
    { number: 3, title: 'Account Setup', description: 'Username and password' },
    { number: 4, title: 'Preferences', description: 'Interests and bio' }
  ];

  const institutionTypes = [
    { value: 'school', label: 'School', icon: Building },
    { value: 'university', label: 'University/College', icon: GraduationCap },
    { value: 'other', label: 'Other', icon: Building }
  ];

  const boards = ['CBSE', 'ICSE', 'State Board', 'IB', 'NIOS'];
  const institutions = [
    'Delhi University', 'Mumbai University', 'Bangalore University', 'IIT Bombay', 'IIT Delhi',
    'CBSE Schools', 'ICSE Schools', 'State Board Schools', 'Private Institutions'
  ];
  const courses = [
    'B.Tech Computer Science', 'B.Tech Engineering', 'MBBS', 'B.Sc', 'B.Com', 'B.A',
    'M.Tech', 'MBA', 'Class 10', 'Class 11', 'Class 12', 'JEE Preparation', 'NEET Preparation'
  ];
  const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  const subjectInterests = [
    'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English',
    'History', 'Geography', 'Economics', 'Political Science', 'Psychology', 'Philosophy',
    'Engineering', 'Medicine', 'Business', 'Arts', 'Literature', 'Music', 'Sports'
  ];

  const validateStep = (step: number) => {
    const newErrors: Partial<RegisterFormData> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (formData.phoneNumber && !/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Invalid phone number format';
      }
    }

    if (step === 2) {
      if (!formData.institution) newErrors.institution = 'Institution is required';
      if (!formData.course) newErrors.course = 'Course is required';
      if (formData.institutionType === 'school' && !formData.board) {
        newErrors.board = 'Board is required for school students';
      }
    }

    if (step === 3) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 4) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions' as any;
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

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', {
        ...formData,
        registrationDate: new Date(),
        isActive: true
      });
      
      // Redirect to success page or login
      window.location.href = '/login?registered=true';
    } catch (error) {
      setErrors({ email: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = (user: any) => {
    console.log('Google registration/login successful:', user);
    window.location.href = '/';
  };

  const handleGoogleLogout = () => {
    console.log('Google logout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
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
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-primary-600">
            <div className="p-3 bg-primary-100 rounded-full">
              <UserPlus size={32} />
            </div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Join EduNotes Community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start your learning journey with thousands of students worldwide
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          {/* Google Sign Up - Primary CTA */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Registration</h3>
              <p className="text-sm text-gray-600">Create your account instantly with Google</p>
            </div>
            <div className="flex justify-center">
              <GoogleAuth onLogin={handleGoogleLogin} onLogout={handleGoogleLogout} />
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or create account with email</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle size={20} />
                    ) : (
                      <span className="font-medium">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[400px]">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter your first name"
                        />
                        <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter your last name"
                        />
                        <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email address"
                        />
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter phone number (optional)"
                        />
                        <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        />
                        <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                  
                  {/* Institution Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Institution Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {institutionTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange('institutionType', type.value)}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                            formData.institutionType === type.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <type.icon size={24} />
                          <span className="font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.institution}
                          onChange={(e) => handleInputChange('institution', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.institution ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Institution</option>
                          {institutions.map((institution) => (
                            <option key={institution} value={institution}>{institution}</option>
                          ))}
                        </select>
                        <Building className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.institution && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.institution}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course/Program *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.course}
                          onChange={(e) => handleInputChange('course', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.course ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Course</option>
                          {courses.map((course) => (
                            <option key={course} value={course}>{course}</option>
                          ))}
                        </select>
                        <GraduationCap className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.course && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.course}
                        </p>
                      )}
                    </div>

                    {formData.institutionType === 'school' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Board *
                        </label>
                        <select
                          value={formData.board}
                          onChange={(e) => handleInputChange('board', e.target.value)}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.board ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Board</option>
                          {boards.map((board) => (
                            <option key={board} value={board}>{board}</option>
                          ))}
                        </select>
                        {errors.board && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.board}
                          </p>
                        )}
                      </div>
                    )}

                    {formData.institutionType === 'university' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Semester
                        </label>
                        <select
                          value={formData.semester}
                          onChange={(e) => handleInputChange('semester', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select Semester</option>
                          {semesters.map((semester) => (
                            <option key={semester} value={semester}>{semester}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Account Setup */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Setup</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Choose a unique username"
                        />
                        <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.username}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                            errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Create a strong password"
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
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
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
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences & Interests</h3>
                  
                  {/* Interests */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Interests
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.interests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                        >
                          {interest}
                          <button
                            type="button"
                            onClick={() => removeInterest(interest)}
                            className="hover:text-primary-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Add your interests"
                      />
                      <button
                        type="button"
                        onClick={addInterest}
                        className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjectInterests.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => {
                            if (!formData.interests.includes(subject)) {
                              setFormData({
                                ...formData,
                                interests: [...formData.interests, subject]
                              });
                            }
                          }}
                          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                        >
                          + {subject}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio (Optional)
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      rows={4}
                      placeholder="Tell us a bit about yourself and your academic goals..."
                    />
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
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
                        *
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.agreeToTerms}
                      </p>
                    )}

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.subscribeNewsletter}
                        onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Subscribe to our newsletter for updates and study tips
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
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
              
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
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

export default RegisterForm;