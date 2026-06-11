import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/websiteData';
import { GalleryItem } from '../types';
import { 
  Images, 
  MapPin, 
  Sparkles,
  Trophy,
  Users,
  Compass,
  MonitorPlay,
  FlaskConical,
  BookOpenCheck,
  Expand,
  Maximize2
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'classroom' | 'events' | 'ceremonies' | 'activities'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'classroom', label: 'Classroom Infrastructure' },
    { id: 'events', label: 'Student Meets & Seminars' },
    { id: 'ceremonies', label: 'Award & Felicitation Ceremonies' },
    { id: 'activities', label: 'Scientific & Educational Activities' }
  ] as const;

  // Dynamically map icon names to Lucide icon components
  const getIcon = (name: string) => {
    switch(name) {
      case 'MonitorPlay': return <MonitorPlay size={24} />;
      case 'Trophy': return <Trophy size={24} />;
      case 'FlaskConical': return <FlaskConical size={24} />;
      case 'Users': return <Users size={24} />;
      case 'BookOpenCheck': return <BookOpenCheck size={24} />;
      case 'Compass': return <Compass size={24} />;
      default: return <Images size={24} />;
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase text-sky-655 tracking-wider flex items-center justify-center gap-1.5">
          <Images size={16} />
          Visual Tour
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
          Life at Krishna Tutorials
        </h1>
        <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-base md:text-lg">
          Take a look at our bright smart-class setups, annual topper celebrations, chemistry demonstrations, and parent orientation seminars.
        </p>
      </div>

      {/* 2. FILTER MENU */}
      <div className="flex flex-wrap gap-2.5 justify-center bg-slate-50 p-3 rounded-2xl border border-slate-100 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#003B65] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white bg-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. GRID SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Representational Visual Card Header using Beautiful Gradients */}
              <div className={`h-48 bg-gradient-to-br ${item.imageColor} relative p-6 flex flex-col justify-between text-white overflow-hidden`}>
                
                {/* Visual grid background details */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                
                <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md font-extrabold uppercase tracking-widest text-[9px] w-fit">
                  {item.category}
                </span>

                <div className="flex justify-between items-end relative z-10">
                  <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl text-white">
                    {getIcon(item.iconName)}
                  </div>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="p-2 bg-white text-[#003B65] rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm group-hover:opacity-100 cursor-pointer"
                  >
                    <Maximize2 size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-6 space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Meta marker */}
            <div className="px-6 pb-5 flex items-center gap-1.5 text-slate-400 font-bold text-[9px] uppercase tracking-wide">
              <MapPin size={10} />
              Mumbai Classroom Center
            </div>

          </div>
        ))}
      </div>

      {/* Modal Dialog for expanded view */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-150 animate-in fade-in-50 zoom-in-95 duration-150">
            
            <div className={`h-64 bg-gradient-to-br ${selectedItem.imageColor} relative p-8 flex flex-col justify-between text-white`}>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg font-black uppercase text-[10px] w-fit tracking-wider">
                {selectedItem.category}
              </span>
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full w-fit">
                {getIcon(selectedItem.iconName)}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <span className="text-[10px] text-emerald-600 font-extrabold tracking-widest block">KRISHNA CLASSROOM MEMORIES</span>
              <h3 className="text-xl md:text-2xl font-black text-slate-950">{selectedItem.title}</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{selectedItem.description}</p>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={12} />
                  Ambedkar Bhavan Branch, Mumbai
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-[#003B65] text-white hover:bg-sky-905 text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
