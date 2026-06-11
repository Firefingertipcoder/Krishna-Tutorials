import React, { useState } from 'react';
import { TOPPERS_DATA } from '../data/websiteData';
import { Topper } from '../types';
import { 
  Trophy, 
  Sparkles, 
  Star, 
  ChevronRight, 
  Award, 
  GraduationCap, 
  Flame,
  CheckCircle,
  TrendingUp,
  Percent
} from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const [filterClass, setFilterClass] = useState<'all' | '10' | '12_sci' | '12_com'>('all');

  const filteredToppers = TOPPERS_DATA.filter((tp) => {
    if (filterClass === 'all') return true;
    if (filterClass === '10') return tp.class.includes('10th');
    if (filterClass === '12_sci') return tp.class.includes('12th Science') || tp.rank?.includes('JEE') || tp.rank?.includes('CET');
    if (filterClass === '12_com') return tp.class.includes('Commerce');
    return true;
  });

  const boardMetrics = [
    { title: "10th SSC board Pass Rate", rate: "100%", description: "Continuous flawless streak since 2012" },
    { title: "12th Science Success Rate", rate: "98.2%", description: "Premium engineering & medical entries" },
    { title: "12th Commerce Success Rate", rate: "100%", description: "CA aspirants leading board scores" },
    { title: "Students Scoring > 90%", rate: "54%", description: "Over half of our active enrollments score distinction" }
  ];

  const subjectAchievements = [
    { subject: "Book-Keeping & Accountancy", score: "100 / 100", studentName: "Aarti Mehra", class: "12th Commerce" },
    { subject: "Advanced Physics", score: "99 / 100", studentName: "Pratik Deshpande", class: "12th Science" },
    { subject: "Mathematics & Stats", score: "100 / 100", studentName: "Akash Singhania", class: "10th Board" },
    { subject: "General Science", score: "100 / 100", studentName: "Riddhesh K.", class: "10th Board" },
    { subject: "Organic Chemistry", score: "98 / 100", studentName: "Ananya Patel", class: "11th Science" },
    { subject: "Information Technology", score: "99 / 100", studentName: "Riddhi Kothari", class: "12th Science" }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase text-sky-655 tracking-wider flex items-center justify-center gap-1.5">
          <Trophy size={16} className="text-amber-500 animate-bounce" />
          The Hall of Fame
        </span>
        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-sky-850 to-indigo-900 bg-clip-text text-transparent tracking-tight leading-none">
          Proven Excellence Year After Year
        </h1>
        <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-base md:text-lg">
          The ultimate testament to our systematic teaching, rigorous testing, and continuous feedback. Celebrate our record breakers!
        </p>
      </div>

      {/* 2. MERIT METRICS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {boardMetrics.map((met, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-600 w-full"></div>
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block">{met.title}</span>
              <div className="text-3xl md:text-4xl font-black text-[#003B65] flex items-center gap-1">
                {met.rate}
                <TrendingUp size={16} className="text-emerald-500 shrink-0" />
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium italic border-t border-slate-50 pt-2">{met.description}</p>
          </div>
        ))}
      </section>

      {/* 3. INTERACTIVE TOPPERS GALLERY */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Meritorious Toppers Gallery</h2>
            <p className="text-xs text-slate-500">Filters students based on their specific Board streams.</p>
          </div>

          {/* Filter badging */}
          <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-150">
            <button
              onClick={() => setFilterClass('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterClass === 'all' ? 'bg-gradient-to-r from-slate-950 via-[#00203f] to-[#01355c] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Toppers
            </button>
            <button
              onClick={() => setFilterClass('10')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterClass === '10' ? 'bg-gradient-to-r from-slate-950 via-[#00203f] to-[#01355c] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              10th SSC Board
            </button>
            <button
              onClick={() => setFilterClass('12_sci')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterClass === '12_sci' ? 'bg-gradient-to-r from-slate-950 via-[#00203f] to-[#01355c] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12th Science / JEE
            </button>
            <button
              onClick={() => setFilterClass('12_com')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterClass === '12_com' ? 'bg-gradient-to-r from-slate-950 via-[#00203f] to-[#01355c] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Commerce
            </button>
          </div>
        </div>

        {/* Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToppers.map((tp) => (
            <div 
              key={tp.id} 
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                
                <div className="flex items-center gap-4">
                  {/* Styled Avatar representation */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full font-black text-white bg-gradient-to-tr from-[#003B65] to-sky-600 flex items-center justify-center text-lg shadow-md border-2 border-white">
                      {tp.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 text-white border border-white">
                      <Trophy size={10} className="fill-current" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 leading-tight text-base md:text-lg">{tp.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{tp.class} • <span className="text-emerald-600 font-bold">{tp.score}</span></p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-50 pt-3">
                  {tp.rank && (
                    <div className="text-xs font-black text-[#003B65] uppercase flex items-center gap-1.5 bg-blue-50/70 p-1.5 px-3 rounded-lg border border-blue-100 w-fit">
                      <Star size={12} className="fill-amber-400 stroke-amber-500" />
                      {tp.rank}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 italic font-light leading-relaxed">
                    &ldquo;{tp.achievements}&rdquo;
                  </p>
                </div>

              </div>

              {/* Bottom tag */}
              <div className="bg-slate-50 px-6 py-2.5 flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-550">
                <span className="font-bold">SESSION YEAR: {tp.year}</span>
                <span className="text-[#003B65] font-black uppercase tracking-wider">Krishna Alumnus</span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 4. SUBJECT-WISE RECORD BREAKERS */}
      <section className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-950 flex items-center gap-2">
            <Award className="text-[#003B65]" />
            Subject-Wise High Achievements
          </h2>
          <p className="text-xs text-slate-600">The historical peak performances secured by our students inside crucial board evaluations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectAchievements.map((ach, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-2xl border border-slate-101/60 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-[#003B65] font-bold block bg-blue-50/55 border border-blue-100 px-2 py-0.5 rounded-md w-fit">
                  {ach.class}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 tracking-tight leading-tight pt-1">
                  {ach.subject}
                </h4>
                <p className="text-xs text-slate-500">By: <span className="font-semibold text-slate-700">{ach.studentName}</span></p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm text-slate-400 block uppercase font-bold text-[9px]">PEAK SCORE</span>
                <span className="text-md font-black text-rose-600 bg-rose-50/75 border border-rose-100 inline-block px-3 py-1 rounded-xl">
                  {ach.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STUDENT MOTIVATION BOX */}
      <section className="bg-gradient-to-br from-[#003B65] to-indigo-950 p-8 rounded-3xl text-center text-white space-y-6 max-w-4xl mx-auto shadow-md">
        <div className="p-2.5 bg-white/10 rounded-full w-fit mx-auto text-amber-400">
          <Flame size={28} className="fill-current animate-pulse" />
        </div>
        <h3 className="text-xl md:text-2xl font-black">Want to see your name in our next Toppers Billboard study list?</h3>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Our classes are designed in clear sections, providing you targeted learning methods, regular exam reviews, and personal mentoring slots. Secure your seat today and pave your path towards 100/100 standard goals!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="tel:9930304555"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-lg text-xs tracking-wide transition-all uppercase"
          >
            Call Admissions Desk
          </a>
        </div>
      </section>

    </div>
  );
};
