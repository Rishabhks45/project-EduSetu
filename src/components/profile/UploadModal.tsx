import React, { useState } from 'react';
import { X, Upload, FileText, BookOpen, AlertCircle, CheckCircle, Building, School, GraduationCap, MapPin } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface UploadFormData {
  title: string;
  description: string;
  subject: string;
  course: string;
  semester: string;
  category: 'board' | 'university' | 'exam' | 'state';
  materialType: 'notes' | 'pyq';
  tags: string[];
  institution: string;
  year: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  file: File | null;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    subject: '',
    course: '',
    semester: '',
    category: 'university',
    materialType: 'notes',
    tags: [],
    institution: '',
    year: new Date().getFullYear().toString(),
    difficulty: 'intermediate',
    file: null
  });

  const [errors, setErrors] = useState<Partial<UploadFormData>>({});
  const [tagInput, setTagInput] = useState('');

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English', 'History', 'Economics'];
  const institutions = ['Delhi University', 'Mumbai University', 'Bangalore University', 'IIT Bombay', 'IIT Delhi', 'CBSE', 'ICSE'];
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'board':
        return <Building size={20} className="text-blue-600" />;
      case 'university':
        return <School size={20} className="text-green-600" />;
      case 'exam':
        return <GraduationCap size={20} className="text-purple-600" />;
      case 'state':
        return <MapPin size={20} className="text-orange-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Partial<UploadFormData> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.subject) newErrors.subject = 'Subject is required';
    }

    if (step === 2) {
      if (!formData.institution) newErrors.institution = 'Institution is required';
      if (!formData.year) newErrors.year = 'Year is required';
      if (formData.category === 'university' && !formData.semester) {
        newErrors.semester = 'Semester is required for university materials';
      }
    }

    if (step === 3) {
      if (!formData.file) newErrors.file = 'File is required' as any;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 50 * 1024 * 1024; // 50MB

      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, file: 'Only PDF and Word documents are allowed' as any });
        return;
      }

      if (file.size > maxSize) {
        setErrors({ ...errors, file: 'File size must be less than 50MB' as any });
        return;
      }

      setFormData({ ...formData, file });
      setErrors({ ...errors, file: undefined });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            onSuccess();
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // In a real app, this would upload to a server
    console.log('Uploading material:', formData);
  };

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Title, description, and subject' },
    { number: 2, title: 'Category & Details', description: 'Institution, category, and metadata' },
    { number: 3, title: 'File Upload', description: 'Upload your study material' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Upload Study Material</h2>
            <p className="text-gray-600 mt-1">Share your knowledge with the community</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
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
                <div className="ml-3">
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
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Material Type */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Material Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, materialType: 'notes' })}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                        formData.materialType === 'notes'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <BookOpen size={24} />
                      <div className="text-left">
                        <div className="font-medium">Study Notes</div>
                        <div className="text-sm text-gray-500">Lecture notes, summaries, guides</div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, materialType: 'pyq' })}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                        formData.materialType === 'pyq'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FileText size={24} />
                      <div className="text-left">
                        <div className="font-medium">Previous Year Questions</div>
                        <div className="text-sm text-gray-500">Exam papers, question banks</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter a descriptive title for your material"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., B.Tech Computer Science, Class 12"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    rows={4}
                    placeholder="Describe what this material covers, its key topics, and how it can help other students"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'board', name: 'Board', description: 'CBSE, ICSE, State' },
                    { id: 'university', name: 'University', description: 'College materials' },
                    { id: 'exam', name: 'Competitive', description: 'JEE, NEET, GATE' },
                    { id: 'state', name: 'State', description: 'State-specific' }
                  ].map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.id as any })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                        formData.category === category.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {getCategoryIcon(category.id)}
                      <div className="text-center">
                        <div className="font-medium text-sm">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <select
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.institution ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Institution</option>
                    {institutions.map((institution) => (
                      <option key={institution} value={institution}>{institution}</option>
                    ))}
                  </select>
                  {errors.institution && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.institution}
                    </p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.year ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.year && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.year}
                    </p>
                  )}
                </div>

                {/* Semester (for university) */}
                {formData.category === 'university' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester *
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.semester ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Semester</option>
                      {Array.from({ length: 8 }, (_, i) => (
                        <option key={i + 1} value={`Semester ${i + 1}`}>Semester {i + 1}</option>
                      ))}
                    </select>
                    {errors.semester && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.semester}
                      </p>
                    )}
                  </div>
                )}

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-primary-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Add tags to help others find your material"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File *
                </label>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  formData.file
                    ? 'border-green-300 bg-green-50'
                    : errors.file
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                }`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={48} className={`mx-auto mb-4 ${
                      formData.file ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    {formData.file ? (
                      <div>
                        <p className="text-lg font-medium text-green-800 mb-2">
                          {formData.file.name}
                        </p>
                        <p className="text-sm text-green-600">
                          {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX up to 50MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.file && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.file}
                  </p>
                )}
              </div>

              {/* Upload Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Upload Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Ensure your material is original or properly attributed</li>
                  <li>• Use clear, descriptive titles and descriptions</li>
                  <li>• Add relevant tags to help others discover your content</li>
                  <li>• Make sure the file is readable and well-formatted</li>
                  <li>• Avoid uploading copyrighted material without permission</li>
                </ul>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Uploading...</span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Step {currentStep} of {steps.length}
          </div>
          
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                disabled={isUploading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                disabled={isUploading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload Material'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;