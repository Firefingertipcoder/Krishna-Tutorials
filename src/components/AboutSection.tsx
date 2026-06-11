import React from 'react';
import { FACULTY_DATA } from '../data/websiteData';
import { 
  Compass, 
  Target, 
  CheckCircle, 
  Bookmark, 
  BookOpenCheck, 
  Layers, 
  FlameKindling,
  Sparkles,
  UsersRound,
  History
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Interactive Concept Extraction",
      desc: "Every chapter begins from the absolute ground zero. Tutors use intuitive daily life examples, physical instruments, or animated smartboards to demystify complex formulas.",
      icon: Layers,
      color: "from-sky-500 to-blue-600"
    },
    {
      num: "02",
      title: "Rigor Question Drills",
      desc: "Students solve over 100+ meticulously drafted questions per subject chapter. This encompasses textbook problems, past board papers, and high-difficulty olympiad tasks.",
      icon: BookOpenCheck,
      color: "from-blue-600 to-indigo-700"
    },
    {
      num: "03",
      title: "Weekly Assessment Diagnostics",
      desc: "Tests are held every Sunday. Answer papers are reviewed closely to identify systematic misconceptions. Feedback is immediately delivered to parents with analytics.",
      icon: Target,
      color: "from-indigo-600 to-[#003B65]"
    },
    {
      num: "04",
      title: "Direct Board Simulation Prelims",
      desc: "During December/January, we host five sets of exhaustive board exams under rigid three-hour guidelines to stabilize writing speed, formatting, and psychological posture.",
      icon: Compass,
      color: "from-sky-650 to-teal-600"
    }
  ];

  const pillars = [
    {
      title: "11 Years of Proven History",
      desc: "Since 2015, we have coached thousands of central-suburbs students in Mumbai, delivering record-high standard scores yearly."
    },
    {
      title: "Ex-Board Moderator Panels",
      desc: "Our senior faculty base includes veteran paper checkers and board coordinators to advise exact marks scoring keywords."
    },
    {
      title: "Micro-Sized Batches",
      desc: "We strictly cap batch intake numbers to maintain optimal teacher-student visibility and address personalized study gaps."
    },
    {
      title: "Individual Doubt Desks",
      desc: "A daily dedicated doubt resolution workspace is manned by our coaching assistants for students needing manual reviews."
    }
  ];

  return (
    <div className="space-y-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* 1. VISION AND MISSION & CORE STORY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-black uppercase text-sky-650 tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            Nurturing Minds Since 2015
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Empowering Next Generation Achievers to <span className="bg-gradient-to-r from-sky-650 via-blue-700 to-[#003B65] bg-clip-text text-transparent">Expect Great Things</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Krishna Tutorials was founded in Mumbai with a single cohesive vision: to democratize high-difficulty science, commerce, and school boards pedagogy. We believe academic excellence isn&apos;t just genetic; it is the ultimate yield of systematic habits, clear mentorship, and structured hard work.
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Our classrooms feature pristine acoustic clarity, deep subject study modules, and robust parent communication networks. Over a decade, we have evolved from a humble tutorials startup into one of Mumbai&apos;s premium boutique institutes for competitive board and entrance preparations.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-br from-slate-950 via-[#002240] to-[#013c66] text-white p-8 rounded-2xl shadow-xl border border-white/10 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all"></div>
            <div className="p-3 bg-gradient-to-tr from-sky-400 to-teal-300 rounded-xl w-fit text-slate-950 shadow-md">
              <Compass size={24} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black bg-gradient-to-r from-white via-sky-100 to-teal-100 bg-clip-text text-transparent">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              To be the most trusted educational ecosystem, creating self-driven, analytical, and highly ethical leaders who look past traditional memorization to truly conquer subject foundations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-105 space-y-4">
            <div className="p-3 bg-sky-50 rounded-xl w-fit text-[#003B65]">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-[#003B65] font-extrabold">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To design top-tier pedagogy tools, implement exhaustive test schedules, and deploy high-attention faculty teams that turn standard average students into absolute Board merit rankers.
            </p>
          </div>

        </div>
      </section>

      {/* 2. WHY CHOOSE KRISHNA TUTORIALS (Bento Grid Style) */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase text-[#003B65] tracking-wider">The Krishna Competitive Edge</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Why Hundreds of Families Trust Us Every Session</h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pi, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-slate-200 font-sans font-black text-2xl">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">{pi.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pi.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TEACHING METHODOLOGY (Progressive Process Blocks) */}
      <section className="space-y-12 bg-white/45 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-sky-100/50">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase text-[#003B65] tracking-wider">Scientific Pedagogy</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Our 4-Stage Teaching Methodology</h2>
          <p className="text-sm text-slate-600">
            Success does not occur by accident. We deploy a consistent, structured academic framework for every course module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.num} className="bg-white rounded-xl p-6 space-y-4 shadow-sm border border-slate-101/60 relative">
                <span className={`absolute -top-3 right-4 px-2.5 py-1 text-xs font-black text-white bg-gradient-to-r ${st.color} rounded-full shadow-sm`}>
                  Step {st.num}
                </span>
                <div className="p-2 bg-slate-50 w-fit text-[#003B65] rounded-lg">
                  <Icon size={22} className="stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FACULTY INTRODUCTION */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase text-[#003B65] tracking-wider">Academic Luminaries</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Meet Our Expert Faculty Panel</h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
          <p className="text-sm text-slate-600">
            A tutorials center is only as stellar as its mentors. Our senior tutors are highly respected board subject experts in Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACULTY_DATA.map((fc) => (
            <div 
              key={fc.name}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Faculty Card Header Gradient */}
                <div className={`h-28 bg-gradient-to-br ${fc.imageColor} relative p-6 flex flex-col justify-end text-white`}>
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white/90">
                    <UsersRound size={16} />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-sky-200">{fc.role}</span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mt-0.5 leading-tight">{fc.name}</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Qualification</span>
                      <span className="font-semibold text-slate-800">{fc.qualification}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Teaching Exp</span>
                      <span className="font-semibold text-slate-800">{fc.experience}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-4">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold mb-1">Subject Speciality:</span>
                    <p className="text-xs font-medium text-slate-700 bg-sky-50 py-1.5 px-3 rounded-lg border border-sky-100 inline-block">
                      {fc.speciality}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="px-6 pb-5 pt-1.5 flex items-center gap-1.5 text-emerald-600 font-bold text-[10px]">
                <CheckCircle size={12} className="fill-current text-white max-w-full" strokeWidth={3} />
                VERIFIED SENIOR COUNSEL
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
