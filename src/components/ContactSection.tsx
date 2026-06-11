import React, { useState } from 'react';
import { createContactInquiry } from '../lib/dbService';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquareCode,
  Map,
  BadgeCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'admissions',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError('');
    try {
      await createContactInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toISOString()
      });
      setIsSent(true);
    } catch (err) {
      console.error(err);
      setSendError('Unable to transmit your callback request online. Please contact our admission hotline direct.');
    } finally {
      setIsSending(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'admissions',
      message: ''
    });
    setSendError('');
    setIsSent(false);
  };

  const branches = [
    {
      name: "Main Head Office Classroom",
      address: "Opp. BDD 96, Ambedkar Bhavan, 1st Floor, Mumbai",
      phone: "9930304555",
      email: "admissions@krishnatutorials.com",
      timing: "Monday to Sunday (9:00 AM - 8:30 PM)",
      landmark: "Next to Ambedkar Memorial Hall, walkable from Naigaon Metro station"
    }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase text-sky-655 tracking-wider flex items-center justify-center gap-1.5">
          <MessageSquareCode size={16} />
          Communication Terminals
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
          Get in Touch with Our Faculty
        </h1>
        <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-base md:text-lg">
          Do you have specific questions about upcoming science batches, syllabus schedules, or scholarship waivers? Let our team consult you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* 2. CONTACT GENERAL METRIC CARD (Left, Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {branches.map((br, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-[#003B65] to-indigo-950 text-white rounded-3xl p-6 md:p-8 border border-white/5 shadow-lg space-y-6 relative overflow-hidden"
            >
              
              <div className="absolute top-0 right-0 p-3 bg-sky-500/20 text-sky-300 text-[10px] font-bold rounded-bl-xl rounded-tr-xl">
                OPEN CURRENTLY
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold">{br.name}</h3>
                <p className="text-xs text-sky-205">Krishna Tutorials Core Academic Hub</p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-5 text-sm">
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-sky-305 w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">STREET ADDRESS</span>
                    <span className="text-slate-200 leading-normal font-medium">{br.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-sky-305 w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">OFFICIAL COUNSELING LINE</span>
                    <a href="tel:9930304555" className="text-emerald-305 font-black text-base hover:underline">
                      {br.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-sky-305 w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">EMAIL INBOX</span>
                    <a href={`mailto:${br.email}`} className="text-slate-300 hover:underline">
                      {br.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-sky-305 w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">OFFICE WORKING HOURS</span>
                    <span className="text-slate-300 font-medium">{br.timing}</span>
                  </div>
                </div>

              </div>

              {/* Landmark visual helper */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-xs text-slate-300 leading-relaxed">
                📍 <span className="font-bold text-white">Landmark guide:</span> {br.landmark}
              </div>

            </div>
          ))}

          {/* 3. SIMULATED MAP SCHEMATIC DESIGN */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 text-sm md:text-base">
                <Map className="text-sky-650" size={18} />
                Simplified Ambedkar Bhavan Transit Map
              </h4>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 font-bold px-2.5 py-1 rounded-xl uppercase">
                1st Floor Location
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-light">
              We are conveniently located directly opposite BDD Chawl building 96 on Ambedkar road. Commuters can disembark at Naigaon Metro station or catch simple transit lines heading Ambedkar Bhavan.
            </p>

            {/* Simulated Vector Grid representing location coordinates */}
            <div className="h-40 bg-slate-900/5 rounded-2xl border border-slate-150 relative overflow-hidden flex items-center justify-center font-mono">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              
              {/* Simulated landmarks */}
              <div className="absolute top-4 left-6 bg-white p-1 rounded border shadow-sm text-[9px] text-slate-500 font-semibold select-none">
                Naigaon Metro Station (500m)
              </div>
              <div className="absolute bottom-6 left-6 bg-sky-100 border-sky-305 text-sky-850 p-1.5 rounded border font-black text-[9px] uppercase select-none">
                Ambedkar Bhavan road
              </div>
              <div className="absolute top-16 right-16 bg-[#003B65] text-white p-3 rounded-2xl shadow-xl flex flex-col items-center border border-white/20 select-none z-10 animate-bounce">
                <MapPin size={16} className="text-amber-400 fill-current" />
                <span className="text-[10px] font-black uppercase mt-1 leading-none tracking-tight">Krishna Tutorials</span>
                <span className="text-[8px] opacity-75 font-serif font-bold pt-0.5 leading-none">1st Floor Entrance</span>
              </div>
              <div className="absolute bottom-4 right-6 bg-white p-1 rounded border shadow-sm text-[9px] text-slate-500 font-bold select-none">
                BDD Chawl Building 96
              </div>

              <div className="absolute bottom-1 right-2 hover:underline text-[9px] leading-none text-[#003B65] pointer-events-none select-none">
                Clicking expands driving rules
              </div>
            </div>

          </div>

        </div>

        {/* 4. ACTIVE FORM INGESTION (Right, Span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
            
            <div className="pb-4 border-b border-slate-50">
              <h3 className="text-xl font-extrabold text-slate-950">Draft a Counseling Statement</h3>
              <p className="text-xs text-slate-550">We revert to all messages within 2 working hours with direct coordination files.</p>
            </div>

            {isSent ? (
              <div className="py-16 text-center space-y-6 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <BadgeCheck size={36} className="stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900">Message Delivered!</h4>
                  <p className="text-sm text-slate-650 leading-relaxed">
                    Thank you <span className="font-bold text-[#003B65]">{formData.name}</span> for interest. An administration coordinator has logged your callback ticket serial <span className="font-mono bg-slate-100 p-1 rounded text-[#003B65] font-bold">KT-MSG9042</span>.
                  </p>
                  <p className="text-xs text-slate-500 leading-normal">
                    Please expect a highly professional callback from Prof. Mishra at **{formData.phone}** to answer questions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="bg-[#003B65] text-white hover:bg-sky-905 font-bold py-3 px-6 rounded-xl text-xs active:scale-97 cursor-pointer"
                >
                  Send another inquiry message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4.5">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-450 block">Your Name / Guardian Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mrs. Asha Shah"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-550"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-450 block">Mobile Phone Number (10 digit):</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="e.g. 9832291040"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-550"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-450 block">Your E-mail (Optional):</label>
                    <input
                      type="email"
                      placeholder="e.g. asha@yahoo.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-550"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-450 block">Inquiry Category Stream:</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-750 focus:outline-none focus:ring-1 focus:ring-sky-550"
                  >
                    <option value="admissions">Admission rules &amp; Scholarship Waiving inquiries</option>
                    <option value="fees">Installment payments &amp; Scholarship concessions queries</option>
                    <option value="syllabus">ICSE, CBSE or State Board syllabus syllabus</option>
                    <option value="other">Other admin callback requests</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-450 block">Message Details:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide specific notes about standard classes timing queries, or request standard brochure copy..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-550"
                  />
                </div>

                {sendError && (
                  <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-100 rounded-xl font-bold animate-in fade-in">
                    ⚠️ {sendError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-[#003B65] to-blue-900 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wide transition-all shadow hover:shadow-md flex justify-center items-center gap-1.5 active:scale-97 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {isSending ? 'Sending Message...' : 'Deliver Counselor Message Now'}
                  {!isSending && <Send size={14} />}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
