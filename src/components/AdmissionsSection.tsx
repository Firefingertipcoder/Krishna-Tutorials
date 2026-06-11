import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/websiteData';
import { createEnrollmentApplication } from '../lib/dbService';
import { 
  ClipboardCheck, 
  ArrowRight, 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  BadgePercent,
  CalendarDays,
  FileSpreadsheet
} from 'lucide-react';

interface AdmissionsSectionProps {
  selectedCourseId: string;
  onClearCourseSelect: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ 
  selectedCourseId, 
  onClearCourseSelect 
}) => {
  // Form coordinates
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    targetCourseId: selectedCourseId || (COURSES_DATA[0]?.id || ''),
    priorScore: '',
    siblingExStudent: 'no',
    remarks: ''
  });

  // Calculator coordinate
  const [priorScoreCalc, setPriorScoreCalc] = useState('85');
  const [selectedCalcCourseId, setSelectedCalcCourseId] = useState(selectedCourseId || (COURSES_DATA[0]?.id || ''));
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    if (selectedCourseId) {
      setFormData(prev => ({ ...prev, targetCourseId: selectedCourseId }));
      setSelectedCalcCourseId(selectedCourseId);
    }
  }, [selectedCourseId]);

  const activeFormCourse = COURSES_DATA.find(c => c.id === formData.targetCourseId) || COURSES_DATA[0];
  const activeCalcCourse = COURSES_DATA.find(c => c.id === selectedCalcCourseId) || COURSES_DATA[0];

  // Scholarship Math helper
  const calculateWaiver = (score: number) => {
    if (score >= 95) return { rate: 80, text: "Super Ranker merit waiver" };
    if (score >= 90) return { rate: 50, text: "Elite Scholar merit waiver" };
    if (score >= 80) return { rate: 30, text: "Star Achiever support waiver" };
    if (score >= 70) return { rate: 15, text: "Standard academic merit waiver" };
    return { rate: 10, text: "Early-Bird registration discount" };
  };

  const parsedScore = parseFloat(priorScoreCalc) || 0;
  const waiverDetails = calculateWaiver(parsedScore);
  const baseFeeVal = activeCalcCourse.baseFee;
  const waiverPercent = waiverDetails.rate;
  const siblingBonusValue = formData.siblingExStudent === 'yes' ? 5 : 0; // extra 5% Siblings waiver
  const totalWaiverPercent = waiverPercent + siblingBonusValue;

  const discountAmount = Math.round((baseFeeVal * totalWaiverPercent) / 100);
  const finalpayableFee = baseFeeVal - discountAmount;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');
    try {
      await createEnrollmentApplication({
        studentName: formData.studentName,
        guardianName: formData.parentName,
        phone: formData.parentPhone,
        email: formData.parentEmail,
        courseId: formData.targetCourseId,
        grade: activeFormCourse.title,
        customNotes: formData.remarks || `Student previous percentage score: ${formData.priorScore || priorScoreCalc}%`,
        createdAt: new Date().toISOString()
      });
      setIsFormSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmissionError('Oops! Unable to securely map admissions record online. Please reach out to classroom venues.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      studentName: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      targetCourseId: COURSES_DATA[0]?.id || '',
      priorScore: '',
      siblingExStudent: 'no',
      remarks: ''
    });
    setIsFormSubmitted(false);
    setSubmissionError('');
    onClearCourseSelect();
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* 1. VIEWPORT HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase text-sky-655 tracking-wider flex items-center justify-center gap-1.5">
          <ClipboardCheck size={16} />
          Registration Gateways
        </span>
        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-sky-850 to-indigo-900 bg-clip-text text-transparent tracking-tight leading-none">
          Secure Your Student Intake Seat
        </h1>
        <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-base md:text-lg">
          Select your target tutorial modules, estimate automated merit-scholarship brackets, and submit quick documents processing forms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* 2. DYNAMIC SCHOLARSHIP ESTIMATING SLATE */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-gradient-to-br from-slate-950 via-[#002240] to-[#01355c] text-white rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
            
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <div className="p-2 bg-white/10 rounded-xl text-sky-300">
                <Calculator size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Merit Scholarship Estimator</h3>
                <p className="text-[10px] text-slate-350">Waiver brackets automatically computed based on standard percentages</p>
              </div>
            </div>

            {/* Selector Option */}
            <div className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                  Select Classroom Course:
                </label>
                <select
                  value={selectedCalcCourseId}
                  onChange={(e) => setSelectedCalcCourseId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-400"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slider Input percentage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                    Academic Marks Percentage:
                  </label>
                  <span className="font-extrabold text-sky-300 text-sm bg-sky-500/10 px-2 py-0.5 rounded-md">
                    {priorScoreCalc}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={priorScoreCalc}
                  onChange={(e) => setPriorScoreCalc(e.target.value)}
                  className="w-full accent-sky-450 bg-slate-800 rounded-lg appearance-none h-2 cursor-pointer"
                />
                <span className="text-[9px] text-slate-450 block italic">Drag slide node to represent previous classroom / board reports score.</span>
              </div>

              {/* Sibling extra waiver trigger */}
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                <div>
                  <span className="text-xs font-bold block text-white">Siblings / Ex-Student Sibling?</span>
                  <span className="text-[9px] text-slate-350">Extra 5% discount is custom granted on verification.</span>
                </div>
                <select
                  value={formData.siblingExStudent}
                  onChange={(e) => setFormData(prev => ({ ...prev, siblingExStudent: e.target.value }))}
                  className="bg-slate-900 border border-slate-700 text-xs rounded-lg p-1.5 text-slate-100 focus:outline-none"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes (+5%)</option>
                </select>
              </div>

            </div>

            {/* Ledger visual receipts */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 space-y-4">
              <span className="text-[9px] font-black tracking-widest text-[#003B65] bg-sky-200 uppercase px-2 py-0.5 rounded-md block w-fit">
                SCHOLARSHIP ALLOCATION STATEMENT
              </span>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Standard Syllabus Base:</span>
                  <span className="font-semibold text-white">100% Core Course</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Waiver Percentage Applied:</span>
                  <span className="font-mono font-semibold">-{totalWaiverPercent}% Off</span>
                </div>
                <div className="border-t border-slate-850 pt-2.5 flex justify-between font-bold text-sm text-white">
                  <span>Net Tuition Coverage Due:</span>
                  <span className="font-mono text-emerald-400 text-base">{100 - totalWaiverPercent}% of syllabus baseline</span>
                </div>
              </div>

              <div className="border-t border-slate-850 pt-2 text-[9px] text-slate-400 leading-normal">
                💡 <span className="font-bold text-slate-300">Scholarship waiver: {waiverDetails.text} ({waiverPercent}%)</span>
                {siblingBonusValue > 0 && " + Family sibling bonus discount (5%)"}. The estimate is provisional, subject to submission of physical marksheets.
              </div>
            </div>

            {/* Quick criteria box */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-[11px] text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1 text-xs">
                <BadgePercent size={14} className="text-amber-400 shrink-0" />
                Guaranteed Scholarship Matrices
              </div>
              <ul className="space-y-1 text-slate-400 leading-normal list-disc pl-4 font-light">
                <li><span className="font-bold text-slate-300">95%+ score:</span> Flat 80% waiver</li>
                <li><span className="font-bold text-slate-300">90% - 94.9% score:</span> Flat 50% waiver</li>
                <li><span className="font-bold text-slate-300">80% - 89.9% score:</span> Flat 30% waiver</li>
                <li><span className="font-bold text-slate-300">70% - 79.9% score:</span> Flat 15% waiver</li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. CORE SUBMISSION FORM */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
            
            <div className="pb-4 border-b border-slate-50 flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                <FileSpreadsheet size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Enquiry Registration Intake</h3>
                <p className="text-xs text-slate-500">Provide authentic student coordinates to register callback sessions</p>
              </div>
            </div>

            {isFormSubmitted ? (
              <div className="py-12 px-6 text-center space-y-6 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} className="stroke-[2.5] animate-ping duration-1000 absolute h-12 w-12" />
                  <CheckCircle2 size={36} className="stroke-[2.5] relative z-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900">Enquiry Success!</h4>
                  <p className="text-sm text-slate-650 leading-relaxed">
                    Thank you <span className="font-bold text-[#003B65]">{formData.studentName}</span>&apos;s parent for booking. Your application receipt serial is <span className="font-mono bg-slate-100 p-1 rounded font-bold text-[#003B65]">KT-2026-ENQ093</span>.
                  </p>
                  <p className="text-xs text-slate-500">
                    Academic director Prof. Mishra will call you on **{formData.parentPhone}** within 2 hours to finalize physical marks verification and schedule academic briefing schedules.
                  </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed space-y-2 text-left">
                  <span className="font-extrabold text-slate-800 uppercase block">RECORD CONFIRMATION:</span>
                  <div>• Selected stream: <span className="font-semibold text-slate-900">{activeFormCourse.title}</span></div>
                  <div>• Allocated Scholarship Waiver: <span className="font-bold text-emerald-600">{totalWaiverPercent}% Off standard tuition</span></div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleResetForm}
                    className="w-full bg-[#003B65] text-white hover:bg-sky-905 font-bold py-3 px-4 rounded-xl text-xs active:scale-97 transition-all cursor-pointer"
                  >
                    Register another study query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Student Full Name:</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rohan Mishra"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Parent / Guardian Name:</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Anand Mishra"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Parent Mobile (10-Digit):</label>
                    <input 
                      type="tel" 
                      pattern="[0-9]{10}"
                      placeholder="e.g. 9930304555"
                      required
                      value={formData.parentPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, parentPhone: e.target.value }))}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Parent E-mail Address:</label>
                    <input 
                      type="email" 
                      placeholder="e.g. anand@mailbox.com"
                      required
                      value={formData.parentEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Target Class / Stream:</label>
                    <select
                      value={formData.targetCourseId}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, targetCourseId: e.target.value }));
                        setSelectedCalcCourseId(e.target.value); // Sync calculation
                      }}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-750 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    >
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Prior Standard Marks (% / CGPA):</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 88 (Previous Class Percentage)"
                      min="40"
                      max="100"
                      required
                      value={formData.priorScore}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, priorScore: e.target.value }));
                        if (e.target.value) setPriorScoreCalc(e.target.value); // Sync calculation slider
                      }}
                      className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wide block">Specific Aspirations / Academic Gaps:</label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Looking for NEET chemistry coaching; Needs specialized support inside algebra concepts..."
                    value={formData.remarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-150 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal">
                  <input type="checkbox" required defaultChecked className="mt-0.5" />
                  <span>By submitting this registration request, I verify that current coordinates are authentic, and grant permission to Krishna Tutorials administrators to send admission reminders, mock question bulletins, and marksheets updates via phone/WhatsApp.</span>
                </div>

                {submissionError && (
                  <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-100 rounded-xl font-bold animate-in fade-in">
                    ⚠️ {submissionError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#003B65] to-blue-900 text-white font-extrabold py-3.5 px-4 rounded-xl shadow hover:shadow-md hover:scale-[1.01] active:scale-97 text-xs tracking-wider transition-all uppercase flex justify-center items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Confirm Admissions Reservation Inquiry'}
                  {!isSubmitting && <ArrowRight size={14} />}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* 4. SCHOLARSHIP MATRIX GUIDE TABLE */}
      <section className="bg-white/45 backdrop-blur-md border border-sky-100/50 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarDays className="text-[#003B65] shrink-0" />
            Scholarship Allocation &amp; Installments Milestone Matrix
          </h3>
          <p className="text-xs text-slate-600">All student packages follow strict milestone options. Installments, merit waiver and customized structures apply on verification of school reports.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-150 bg-white shadow-inner">
          <table className="w-full text-center border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-150 text-[10px] text-slate-500 font-extrabold uppercase tracking-widest text-left">
                <th className="p-4 text-left">COACHING COURSE</th>
                <th className="p-4 text-center">SYLLABUS COVERAGE</th>
                <th className="p-4 text-center">MAX MERIT DISCOUNTS</th>
                <th className="p-4 text-center">MIN SCHOLARSHIP BOND</th>
                <th className="p-4 text-center">ALLOWED INSTALLMENTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-left">
              {COURSES_DATA.map((c) => {
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-extrabold text-slate-900">{c.title}</td>
                    <td className="p-4 text-center text-slate-600 font-semibold font-sans">Full Academic Syllabus</td>
                    <td className="p-4 text-center font-bold text-emerald-600 uppercase">80% Waiver</td>
                    <td className="p-4 text-center font-bold text-slate-900">20% of Standard Baseline</td>
                    <td className="p-4 text-center text-slate-500 font-medium">3 Equal Milestone Installments</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
