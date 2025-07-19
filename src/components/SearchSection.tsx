import React, { useState } from 'react';
import { Search, School, GraduationCap } from 'lucide-react';

const SearchSection: React.FC = () => {
  const [institutionType, setInstitutionType] = useState('');
  const [board, setBoard] = useState('');
  const [course, setCourse] = useState('');
  const [university, setUniversity] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  
  // Sample data - in a real app, these would be fetched from an API
  const boards = ['CBSE', 'ICSE', 'State Board'];
  const courses = ['Engineering', 'Medical', 'Arts', 'Commerce', 'Science'];
  const universities = ['Delhi University', 'Mumbai University', 'Bangalore University'];
  const classes = ['Class 10', 'Class 11', 'Class 12'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
  const subjects = {
    'School': {
      'CBSE': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
      'ICSE': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Applications'],
      'State Board': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Information Technology']
    },
    'University': {
      'Engineering': ['Database Systems', 'Computer Networks', 'Operating Systems', 'Data Structures'],
      'Medical': ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology'],
      'Arts': ['History', 'Political Science', 'Economics', 'Sociology'],
      'Commerce': ['Accounting', 'Business Studies', 'Economics', 'Statistics'],
      'Science': ['Physics', 'Chemistry', 'Mathematics', 'Biology']
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build search parameters
    const searchParams = new URLSearchParams();
    
    if (institutionType) searchParams.append('type', institutionType.toLowerCase());
    if (board) searchParams.append('board', board);
    if (course) searchParams.append('course', course);
    if (university) searchParams.append('university', university);
    if (semester) searchParams.append('semester', semester);
    if (subject) searchParams.append('subject', subject);
    if (schoolClass) searchParams.append('class', schoolClass);
    
    // Redirect to search results page
    window.location.href = `/search?${searchParams.toString()}`;
  };

  const resetFields = (type: string) => {
    setInstitutionType(type);
    setBoard('');
    setCourse('');
    setUniversity('');
    setSemester('');
    setSubject('');
    setSchoolClass('');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Find Your Study Materials
        </h2>
        
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Select your institution type and find relevant study materials tailored to your needs.
        </p>
        
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <button
                type="button"
                onClick={() => resetFields('School')}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border ${
                  institutionType === 'School'
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <School size={24} />
                <span className="font-medium">School</span>
              </button>
              
              <button
                type="button"
                onClick={() => resetFields('University')}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border ${
                  institutionType === 'University'
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <GraduationCap size={24} />
                <span className="font-medium">University</span>
              </button>
            </div>

            {institutionType === 'School' && (
              <>
                <div>
                  <label htmlFor="board" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Board
                  </label>
                  <select
                    id="board"
                    value={board}
                    onChange={(e) => {
                      setBoard(e.target.value);
                      setSubject('');
                    }}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">-- Select Board --</option>
                    {boards.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Class
                  </label>
                  <select
                    id="class"
                    value={schoolClass}
                    onChange={(e) => setSchoolClass(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">-- Select Class --</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {institutionType === 'University' && (
              <>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course
                  </label>
                  <select
                    id="course"
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      setSubject('');
                    }}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    Select University
                  </label>
                  <select
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">-- Select University --</option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Semester
                  </label>
                  <select
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">-- Select Semester --</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {((institutionType === 'School' && board) || (institutionType === 'University' && course)) && (
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Subject
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">-- Select Subject --</option>
                  {institutionType === 'School' && board && 
                    subjects.School[board as keyof typeof subjects.School].map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))
                  }
                  {institutionType === 'University' && course && 
                    subjects.University[course as keyof typeof subjects.University].map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))
                  }
                </select>
              </div>
            )}
            
            <button
              type="submit"
              disabled={
                !institutionType || 
                (institutionType === 'School' && (!board || !schoolClass)) || 
                (institutionType === 'University' && (!course || !university || !semester)) || 
                !subject
              }
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Search size={20} />
              <span>Search Resources</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;