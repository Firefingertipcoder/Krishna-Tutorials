import React, { useState } from 'react';
import { Logo } from './Logo';
import { PageId } from '../types';
import { 
  Menu, 
  X, 
  Phone, 
  GraduationCap, 
  Home, 
  Info, 
  BookOpen, 
  Award, 
  Image, 
  ClipboardList, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'about', label: 'About Us', icon: <Info size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'results', label: 'Results', icon: <Award size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'portal', label: 'Portal', icon: <GraduationCap size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'admissions', label: 'Admissions', icon: <ClipboardList size={14} className="transition-transform group-hover:scale-110" /> },
    { id: 'contact', label: 'Contact Us', icon: <MessageSquare size={14} className="transition-transform group-hover:scale-110" /> },
  ];

  const handleNavClick = (id: PageId) => {
    onPageChange(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2 text-left focus:outline-none cursor-pointer group active:scale-98 transition-transform"
            >
              <Logo size="sm" showTagline={true} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-1 py-1 bg-slate-50/70 border border-slate-100/50 rounded-2xl">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative group px-3 py-2 text-xs xl:text-sm font-semibold rounded-xl transition-all duration-305 flex items-center gap-1.5 cursor-pointer select-none ${
                    isActive 
                      ? 'text-[#003B65] font-extrabold' 
                      : 'text-slate-650 hover:text-[#003B65] hover:bg-slate-100/40'
                  }`}
                >
                  <span className={`transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-sky-600'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-sky-50 border border-sky-100/30 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Call and Enquire Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="tel:9930304555"
              className="group flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100/50 rounded-xl transition-all duration-200"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden xl:block" />
              <Phone size={13} className="stroke-[2.5] text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span className="font-mono tracking-wide">9930304555</span>
            </a>

            <button
              onClick={() => handleNavClick('admissions')}
              className="group flex items-center gap-1.5 bg-[#003B65] text-white hover:bg-[#002240] px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer font-display"
            >
              <span>Enquire</span>
              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center lg:hidden gap-2">
            <a
              href="tel:9930304555"
              className="flex items-center gap-1 p-2 text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100/40 rounded-xl font-mono"
            >
              <Phone size={12} className="text-emerald-600" />
              9930304555
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-[#003B65] hover:bg-slate-50 border border-transparent hover:border-slate-150 transition-all focus:outline-none"
            >
              {isOpen ? <X size={20} className="stroke-[2.5]" /> : <Menu size={20} className="stroke-[2.5]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden border-t border-slate-100 bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 bg-slate-50/50">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'text-white bg-[#003B65] shadow-sm shadow-[#003B65]/10'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    <span className={isActive ? 'text-sky-300' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-150 flex flex-col gap-3">
                <a
                  href="tel:9930304555"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold bg-emerald-50 text-emerald-800 text-sm border border-emerald-100 font-mono tracking-wide"
                >
                  <Phone size={14} className="text-emerald-600" />
                  Call Hotline: 9930304555
                </a>
                <button
                  onClick={() => handleNavClick('admissions')}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-black bg-[#003B65] text-white text-sm shadow-md cursor-pointer font-display"
                >
                  <Sparkles size={14} className="text-sky-300" />
                  Apply / Enquiry Form
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
