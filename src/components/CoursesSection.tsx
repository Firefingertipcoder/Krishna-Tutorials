import React, { useState, useEffect } from 'react';
import { Course, PageId } from '../types';
import { COURSES_DATA } from '../data/websiteData';
import { getCourses } from '../lib/dbService';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  Search, 
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Building2
} from 'lucide-react';

interface CoursesSectionProps {
  onPageChange: (page: PageId) => void;
  setSelectedCourseId: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onPageChange, setSelectedCourseId }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [activeTab, setActiveTab] = useState<'all' | 'middle' | 'boards' | 'science' | 'commerce'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getCourses().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setCourses(loaded);
      }
    });
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'middle', label: '7th - 9th Standard' },
    { id: 'boards', label: '10th Board SSC' },
    { id: 'science', label: '11th & 12th Science' },
    { id: 'commerce', label: 'Commerce Stream' }
  ] as const;

  const handleEnquireCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    onPageChange('admissions');
  };

  const filteredCourses = courses.filter(course => {
    // Tab Filter
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'middle' && (course.id.includes('std-7') || course.id.includes('std-8') || course.id.includes('std-9'))) ||
      (activeTab === 'boards' && course.id.includes('std-10')) ||
      (activeTab === 'science' && (course.id.includes('std-11-science') || course.id.includes('std-12-science'))) ||
      (activeTab === 'commerce' && course.id.includes('commerce'));

    // Search Filter
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subjects.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase text-sky-650 tracking-wider flex items-center justify-center gap-1.5">
          <GraduationCap size={16} />
          Academic Catalogs
        </span>
        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-sky-850 to-teal-805 bg-clip-text text-transparent tracking-tight leading-none">
          Courses Built for Academic Dominance
        </h1>
        <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-base md:text-lg">
          Explore our tailored programs aligned with ICSE, CBSE, and Maharashtra State Board (SSC/HSC) configurations for 7th to 12th standards.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-slate-950 via-[#00203f] to-[#01355c] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white bg-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search subjects or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

      </div>

      {/* Courses Display Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative overflow-hidden"
            >
              
              {/* Highlight Tag */}
              {course.id.includes('std-10') && (
                <div className="absolute top-0 right-0 py-1.5 px-4 bg-amber-500 text-white font-extrabold text-[10px] tracking-widest uppercase rounded-bl-3xl shadow-sm">
                  ★ MOST POPULAR BATCH
                </div>
              )}

              {/* Class Title & Info */}
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <div className="text-sky-650 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <BookmarkCheck size={14} />
                    Active Enrollment Session 2026-27
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Subject Badge Matrix */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Subjects Taught:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.subjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-semibold text-[#003B65] bg-blue-50/75 border border-blue-100 rounded-lg"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 border-t border-slate-50 pt-4">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Key Program Offerings:</span>
                  <ul className="space-y-2">
                    {course.features.map((ft, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-snug">
                        <CheckCircle2 className="text-emerald-500 w-4 h-4 mt-0.5 shrink-0" />
                        <span>{ft}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Course Meta Grid & Actions */}
              <div className="space-y-4 border-t border-slate-50 pt-6 mt-8">
                
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50/75 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-500" />
                    <div>
                      <span className="text-[9px] text-slate-450 uppercase block font-bold">DURATION</span>
                      <span className="font-bold text-slate-850">{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-500" />
                    <div>
                      <span className="text-[9px] text-slate-450 uppercase block font-bold">SCHEDULE</span>
                      <span className="font-bold text-slate-850">{course.frequency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-center sm:text-left self-start sm:self-center">
                    <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wide">SCHOLARSHIP STATUS</span>
                    <span className="font-black text-xl text-emerald-600 block">
                      Waivers up to 80%
                    </span>
                    <span className="text-[10px] text-[#003B65] font-medium block mt-0.5 pointer-events-none">
                      Available via Merit Assessment
                    </span>
                  </div>

                  <button
                    onClick={() => handleEnquireCourse(course.id)}
                    className="w-full sm:w-auto bg-[#003B65] hover:bg-sky-905 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow hover:shadow-md flex items-center justify-center gap-1.5 active:scale-97 cursor-pointer"
                  >
                    Calculate Scholarship Waiver
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 max-w-xl mx-auto">
          <BookOpen className="text-slate-350 w-12 h-12 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No batch programs found matching search</h3>
          <p className="text-xs text-slate-550 italic">Try searching standard words such as &quot;Physics&quot;, &quot;Boards&quot;, &quot;SSC&quot; or resetting the filter category tabs.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveTab('all'); }} 
            className="text-xs font-bold bg-[#003B65] text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Reset Catalog FILTERS
          </button>
        </div>
      )}

      {/* Core Note Section */}
      <section className="bg-gradient-to-br from-[#003B65] to-blue-900 text-white p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center justify-between shadow-md">
        <div className="space-y-1 md:max-w-2xl">
          <h4 className="font-extrabold text-lg flex items-center gap-1.5 text-sky-305">
            <Sparkles size={18} className="text-yellow-400" />
            Special Siblings / Merit Scholarship Package
          </h4>
          <p className="text-xs text-slate-200 font-light leading-relaxed">
            Krishna Tutorials extends special fee concessions to children of defense personnel, state-level athletes, top performers in board mock assessment exams, and siblings of ex-Krsihna rankers. Contact our front desk or use the admissions form to request personalized estimates!
          </p>
        </div>
        <button
          onClick={() => onPageChange('contact')}
          className="bg-white hover:bg-slate-50 text-[#003B65] text-xs font-extrabold py-3.5 px-6 rounded-xl shrink-0 transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          Book 1-on-1 counselor meet
        </button>
      </section>

    </div>
  );
};
