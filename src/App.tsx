import { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { ResultsSection } from './components/ResultsSection';
import { GallerySection } from './components/GallerySection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { ContactSection } from './components/ContactSection';
import { StudentPortalSection } from './components/StudentPortalSection';
import { Logo } from './components/Logo';
import { seedInitialDatabaseIfEmpty } from './lib/dbService';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  Heart,
  CalendarCheck
} from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  useEffect(() => {
    // Run initial data population
    seedInitialDatabaseIfEmpty();
  }, []);

  const renderActiveSection = () => {
    switch (activePage) {
      case 'home':
        return <HomeSection onPageChange={setActivePage} />;
      case 'about':
        return <AboutSection />;
      case 'courses':
        return (
          <CoursesSection 
            onPageChange={setActivePage} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        );
      case 'results':
        return <ResultsSection />;
      case 'portal':
        return <StudentPortalSection />;
      case 'gallery':
        return <GallerySection />;
      case 'admissions':
        return (
          <AdmissionsSection 
            selectedCourseId={selectedCourseId} 
            onClearCourseSelect={() => setSelectedCourseId('')} 
          />
        );
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection onPageChange={setActivePage} />;
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800 antialiased font-sans">
      
      {/* Dynamic Ribbon Banner */}
      <div className="bg-[#002240] text-slate-100 text-xs py-2.5 px-4 text-center border-b border-white/5 relative z-50 flex items-center justify-center gap-2 flex-wrap">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
        <span className="font-bold tracking-wide">📢 Admissions Open for 7th to 12th Science &amp; Commerce (Batch 2026-27).</span>
        <span className="opacity-75">Secure up to 80% Merit Waiver.</span>
        <a 
          href="tel:9930304555" 
          className="font-extrabold text-sky-305 hover:underline flex items-center gap-1.5 ml-2 transition-colors shrink-0"
        >
          <Phone size={12} className="stroke-[3]" />
          Call: 9930304555
        </a>
      </div>

      {/* Navigation Header */}
      <Navbar activePage={activePage} onPageChange={setActivePage} />

      {/* Main Content Sections Section */}
      <main className="flex-grow">
        {renderActiveSection()}
      </main>

      {/* High-Craft Footer section */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        
        {/* Upper footer columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Intro Col */}
          <div className="md:col-span-4 space-y-6">
            <Logo size="sm" showTagline={true} className="brightness-0 invert filter" />
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Since 2015, Krishna Tutorials has been Mumbai&apos;s leading boutique academy coaching science, commerce, and school boards merit rankers. We emphasize conceptual extraction, continuous Sunday diagnostics, and rigid parent analytics coordination.
            </p>
            <div className="flex gap-4 text-xs font-semibold text-sky-400">
              <span className="flex items-center gap-1">
                <CalendarCheck size={14} />
                Est. Session 2015
              </span>
              <span>•</span>
              <span className="text-emerald-400 uppercase font-bold text-[10px]">Academic Excellence</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase">Quick Directory</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-medium">
              <button 
                onClick={() => setActivePage('home')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Home
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('about')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                About Us
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('courses')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Courses
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('results')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Results
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('portal')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Student Portal
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('gallery')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Gallery
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('admissions')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Admissions
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
              <button 
                onClick={() => setActivePage('contact')} 
                className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                Contact Us
                <ArrowUpRight size={10} className="opacity-50" />
              </button>
            </div>
          </div>

          {/* Location & Directions Column */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase">Academic Branch coordinates</h4>
            
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-bold block">Classroom Venue:</span>
                  Opp. BDD 96, Ambedkar Bhavan, 1st Floor, Mumbai
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-bold block font-sans">Admissions Hotline:</span>
                  <a href="tel:9930304555" className="hover:text-white text-emerald-300 font-extrabold text-sm font-mono tracking-wide">
                    9930304555
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-bold block">Communication Inbox:</span>
                  admissions@krishnatutorials.com
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Lower footer copyrights */}
        <div className="border-t border-slate-800 bg-slate-950/40 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              &copy; {currentYear} <span className="text-slate-400">Krishna Tutorials</span>. Expect Great Things. All Rights Reserved.
            </div>
            <div className="flex gap-2.5 items-center">
              <span>Made with dedication in Mumbai</span>
              <Heart size={10} className="text-rose-500 fill-current animate-pulse" />
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}

