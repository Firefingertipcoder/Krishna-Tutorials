import React from 'react';
import { PageId, Topper, Testimonial } from '../types';
import { TOPPERS_DATA, TESTIMONIALS_DATA } from '../data/websiteData';
import { 
  Award, 
  BookOpen, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Star,
  Quote,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeSectionProps {
  onPageChange: (page: PageId) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onPageChange }) => {
  // Take first 4 toppers for home summary
  const homeToppers: Topper[] = TOPPERS_DATA.slice(0, 4);
  // Take testimonials for display
  const homeTestimonials: Testimonial[] = TESTIMONIALS_DATA;

  const highlights = [
    {
      title: "Experienced Faculty",
      description: "Learn from premium trainers, research experts, and CA mentors with 15+ years of institutional teaching experience.",
      icon: Award,
      color: "bg-indigo-50/70 text-indigo-700 border-indigo-100/60"
    },
    {
      title: "Regular Tests",
      description: "Weekend topic tests, mid-term examinations, and 5 full-length Board simulation prelims with thorough feedback.",
      icon: CheckCircle2,
      color: "bg-sky-50/70 text-sky-700 border-sky-100/60"
    },
    {
      title: "Study Material",
      description: "Meticulously curated chapter-wise books, formula reference sheets, solved worksheets, and previous years' question banks.",
      icon: BookOpen,
      color: "bg-blue-50/70 text-blue-700 border-blue-100/60"
    },
    {
      title: "Parent Updates",
      description: "Immediate WhatsApp notifications for attendance status, weekly test marks analytics, and organized monthly meetings.",
      icon: Smartphone,
      color: "bg-teal-50/70 text-teal-700 border-teal-100/60"
    },
    {
      title: "Performance Tracking",
      description: "State-of-the-art interactive digital performance scorecards tracking individual progress trends across semesters.",
      icon: TrendingUp,
      color: "bg-cyan-50/70 text-cyan-700 border-cyan-100/60"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#002240] to-[#003B65] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Abstract modern geometry background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-sky-400 blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            {/* Admissions Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-450/20 text-sky-300 font-bold text-xs uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Official Academic Session 2026-27
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-sky-100 to-teal-100 bg-clip-text text-transparent font-display drop-shadow-md">
              Krishna Tutorials
            </h1>

            {/* Visually stunning responsive image placeholder section */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-gradient-to-br from-indigo-950/40 via-blue-900/20 to-teal-900/10 p-1">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900/40 flex items-center justify-center p-6 group">
                {/* Graphic design accent masks to acts as a professional illustration banner */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-650/30 via-indigo-650/25 to-teal-500/30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.25),transparent_50%)]"></div>
                
                {/* Technical lines/circles overlays */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full border border-sky-400/20 flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-400/30"></div>
                </div>
                <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-teal-450/10 blur-xl"></div>

                {/* Display elegant vector illustrations */}
                <div className="z-10 text-center space-y-3 p-4">
                  <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-sky-300 via-sky-400 to-teal-300 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                    <GraduationCap size={28} className="text-slate-950 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-black uppercase bg-gradient-to-r from-sky-300 to-teal-200 bg-clip-text text-transparent tracking-widest block font-display">Academic Center of Excellence</span>
                  <div className="h-[2.5px] w-16 bg-gradient-to-r from-sky-400 to-teal-300 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Quote container below featuring beautiful font pairing and attracting layouts */}
            <div className="border-l-4 border-transparent p-[1px] bg-gradient-to-b from-sky-450 to-teal-450 rounded-r-xl">
              <div className="bg-slate-950/20 backdrop-blur-sm pl-4 pr-3 py-3 space-y-1.5 rounded-r-xl">
                <div className="text-[10px] font-black text-sky-300 tracking-widest uppercase block font-display">💡 GUIDING DIRECTIVE</div>
                <blockquote className="text-lg md:text-xl italic font-display font-medium text-slate-100 tracking-normal leading-relaxed">
                  "Education is not the learning of facts, but the training of the mind to think."
                </blockquote>
                <cite className="text-xs font-semibold text-slate-400 block tracking-wide font-sans not-italic">
                  — Albert Einstein
                </cite>
              </div>
            </div>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light">
              We focus on building rock-solid concepts, high discipline, and comprehensive board preparation to secure your child&apos;s ultimate academic success.
            </p>

            {/* CTA Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onPageChange('admissions')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg transition-transform duration-100 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Enquire Now
                <ArrowRight size={18} />
              </button>

              <a
                href="tel:9930304555"
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-6 py-4 font-bold text-base transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500 text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 block text-left">TALK TO COUNSELOR</div>
                  <div className="text-white tracking-wide">9930304555</div>
                </div>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-slate-850 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="text-3xl font-black text-sky-400">22+</div>
                <div className="text-xs text-slate-400">Years of Trust</div>
              </div>
              <div>
                <div className="text-3xl font-black text-teal-300">98.4%</div>
                <div className="text-xs text-slate-400">Board Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-400">500+</div>
                <div className="text-xs text-slate-400">Toppers Produced</div>
              </div>
            </div>

          </div>

          {/* Interactive Hero Box */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 space-y-6 shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 p-3 bg-sky-500/20 text-sky-300 text-[10px] font-bold rounded-bl-xl rounded-tr-xl">
                LAST 12 SEATS
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2.5">
                <ShieldCheck className="text-emerald-400 shrink-0" />
                Secure Early-Bird Waiver
              </h3>
              <p className="text-sm text-slate-300">
                Register interest today to get standard study bundles and an additional **10% scholarship assessment discount** on our offline batches.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-sky-400 w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm">Batch starting 15th June 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-sky-400 w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm">Special batches for ICSE &amp; CBSE systems</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-sky-400 w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm">Convenient timings aligned with school / junior college</span>
                </div>
              </div>

              <button
                onClick={() => onPageChange('admissions')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                Calculate My Scholarship Way
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. CORE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase text-sky-650 tracking-wider">Our Core Pillars</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Krishna Tutorials Leads Academic Preparation
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-base md:text-lg">
            We provide an end-to-end disciplined learning environment combining premium resources, seasoned tutors, and intensive evaluation models.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {highlights.map((hlt) => {
            const Icon = hlt.icon;
            return (
              <div 
                key={hlt.title}
                className="bg-white rounded-xl p-5 border border-slate-105 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg w-fit ${hlt.color} border`}>
                    <Icon size={20} className="stroke-[2.5]" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{hlt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{hlt.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DYNAMIC TRANSITION BANNER */}
      <section className="bg-gradient-to-r from-slate-950 via-[#00203f] to-[#01355c] py-12 px-4 shadow-inner relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -left-10 top-0 w-40 h-40 bg-teal-400 rounded-full blur-2xl"></div>
          <div className="absolute -right-10 bottom-0 w-40 h-40 bg-sky-500 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-tr from-sky-400 to-teal-300 text-slate-950 rounded-2xl hidden sm:block shadow-lg">
              <GraduationCap size={28} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white via-sky-100 to-teal-105 bg-clip-text text-transparent">Are you tracking your study statistics online?</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">Access real-time dynamic scores, homework drills, and daily progress analytics with student roll number credentials on our portal.</p>
            </div>
          </div>
          <button
            onClick={() => onPageChange('portal')}
            className="w-full sm:w-auto bg-gradient-to-r from-sky-400 to-teal-300 hover:from-sky-500 hover:to-teal-400 text-slate-950 text-xs font-black tracking-wider uppercase py-3.5 px-7 rounded-xl shadow-lg transition-transform duration-100 hover:scale-[1.02] active:scale-95 text-center cursor-pointer"
          >
            Check Student Progress →
          </button>
        </div>
      </section>

      {/* 4. TOPPER SECTION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <span className="text-sm font-black text-[#003B65] uppercase tracking-wide">Merit List Achievements</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Our Proud Toppers (SSC &amp; HSC Boards)</h2>
          </div>
          <button
            onClick={() => onPageChange('results')}
            className="text-[#003B65] font-extrabold hover:text-sky-600 text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            View Full Toppers Gallery
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeToppers.map((tp, idx) => (
            <div 
              key={tp.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm relative hover:shadow-md transition-all duration-200"
            >
              {/* Badge for Top Rankers */}
              <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                {tp.score}
              </div>

              {/* Head Gradient Color */}
              <div className="h-2 bg-gradient-to-r from-sky-500 to-indigo-600"></div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full font-bold text-white flex items-center justify-center bg-gradient-to-tr from-[#003B65] to-blue-500 shadow-inner">
                    {tp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 leading-tight">{tp.name}</h4>
                    <p className="text-xs text-sky-600 font-semibold">{tp.class}</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-50 pt-3">
                  {tp.rank && (
                    <div className="text-xs font-bold text-[#003B65] flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 stroke-amber-500" />
                      {tp.rank}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 italic">
                    &ldquo;{tp.achievements}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-sm font-black text-[#003B65] tracking-wide uppercase">Real Parent &amp; Student Diaries</span>
            <h2 className="text-3xl font-extrabold text-slate-900">What People Say About Krishna</h2>
            <div className="w-12 h-0.5 bg-sky-600 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeTestimonials.map((ts) => (
              <div 
                key={ts.id}
                className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(ts.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>

                  {/* Body Text */}
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed italic relative">
                    <Quote size={28} className="absolute -top-3 -left-3 text-slate-100 -z-0 opacity-40 shrink-0 transform scale-x-[-1]" />
                    <span className="relative z-10">&ldquo;{ts.content}&rdquo;</span>
                  </p>

                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm md:text-base">{ts.name}</h4>
                    <p className="text-xs text-slate-500">
                      {ts.role} {ts.relationName ? ` - ${ts.relationName}` : `(${ts.class} Student)`}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {ts.class}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. BRANCH & ADMISSION CONTACT CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#003B65] to-indigo-950 rounded-3xl p-6 md:p-12 text-white relative overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block bg-sky-550/15 border border-sky-400/20 text-sky-305 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Convenient Central Branch
            </span>
            <h2 className="text-2xl md:text-3xl font-black">Visit Our Classroom &amp; Experience the Quality</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-sky-300 w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-base text-white">Main Branch Location:</h4>
                  <p className="text-sm text-slate-350">
                    Opp. BDD 96, Ambedkar Bhavan, 1st Floor, Mumbai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex gap-2">
                  <div className="p-2 bg-white/10 rounded-lg text-white">
                    <Phone size={16} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Immediate Helpline Helpline:</h4>
                  <p className="text-sm text-slate-300">
                    Call: <span className="font-black text-sky-300">9930304555</span> or <span className="font-black text-sky-300">022-XXXXXXX</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onPageChange('contact')}
                className="bg-white text-[#003B65] hover:bg-slate-50 font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Get Exact Directions
              </button>
              <button
                onClick={() => onPageChange('admissions')}
                className="bg-emerald-500 hover:bg-emerald-600 font-extrabold text-sm px-6 py-3 rounded-xl text-white transition-all shadow-md cursor-pointer"
              >
                Schedule Classroom Visit
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-sky-300">Quick Counseling Desk</h3>
            <p className="text-xs text-slate-300">
              Classes fill up rapidly upon board result announcements. Drop your contact details now, and our administrative coordinator Prof. Mishra will revert within 2 hours.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); onPageChange('admissions'); }} className="space-y-3">
              <input 
                type="text" 
                placeholder="Student Name"
                required
                className="w-full bg-white/10 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
              <input 
                type="tel" 
                placeholder="Parent Mobile Number" 
                required
                pattern="[0-9]{10}"
                className="w-full bg-white/10 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
              <select className="w-full bg-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-400">
                <option value="10th">Class targeting: 10th Board</option>
                <option value="12th">Class targeting: 12th Science / Commerce</option>
                <option value="7th-9th">Class targeting: 7th to 9th Standard</option>
              </select>
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg text-xs tracking-wide transition-all uppercase cursor-pointer"
              >
                Send Request Callback
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};
