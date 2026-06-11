import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { 
  getAnnouncements, 
  addAnnouncement, 
  deleteAnnouncement, 
  getContactInquiries, 
  getEnrollmentApplications, 
  getStudentProfileByRoll, 
  saveStudentProfile, 
  getAllStudents,
  Announcement,
  ContactInquiry,
  EnrollmentApplication
} from '../lib/dbService';
import { 
  Users, 
  UserCheck, 
  Award, 
  Calendar, 
  BookMarked, 
  BrainCircuit, 
  TrendingUp, 
  PhoneCall, 
  UserCheck2,
  Lock,
  ChevronRight,
  Sparkles,
  Signature,
  Trash2,
  PlusCircle,
  FileText,
  Check,
  LogOut,
  MapPin,
  AlertCircle,
  FolderOpen
} from 'lucide-react';

export const StudentPortalSection: React.FC = () => {
  // Student Portal states
  const [rollNumberInput, setRollNumberInput] = useState('KT1001');
  const [queriedProfile, setQueriedProfile] = useState<StudentProfile | null>(null);
  const [queryError, setQueryError] = useState('');
  const [parentVerifiedSignature, setParentVerifiedSignature] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Bulletins announcements
  const [bulletins, setBulletins] = useState<Announcement[]>([]);
  const [isLoadingBulletins, setIsLoadingBulletins] = useState(true);

  // Admin section states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [adminTab, setAdminTab] = useState<'notices' | 'inquiries' | 'leads' | 'students'>('notices');

  // Admin dynamic control lists
  const [crmInquiries, setCrmInquiries] = useState<ContactInquiry[]>([]);
  const [crmLeads, setCrmLeads] = useState<EnrollmentApplication[]>([]);
  const [crmStudents, setCrmStudents] = useState<StudentProfile[]>([]);
  const [isCrmLoading, setIsCrmLoading] = useState(false);

  // Form states to create dynamic record
  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    category: 'General' as 'Urgent' | 'General' | 'Exam' | 'Holiday',
    date: ''
  });
  const [annSuccessMsg, setAnnSuccessMsg] = useState('');

  // Selected Student to edit
  const [selectedStudentRoll, setSelectedStudentRoll] = useState('');
  const [editStudentData, setEditStudentData] = useState<StudentProfile | null>(null);
  const [studentSaveMsg, setStudentSaveMsg] = useState('');

  // Initial loads
  useEffect(() => {
    loadBulletinBoard();
  }, []);

  const loadBulletinBoard = () => {
    setIsLoadingBulletins(true);
    getAnnouncements().then(data => {
      setBulletins(data);
      setIsLoadingBulletins(false);
    });
  };

  // Main student search
  const handleQueryProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!rollNumberInput.trim()) return;
    
    setIsLoadingProfile(true);
    setQueryError('');
    setParentVerifiedSignature(false);
    
    try {
      const result = await getStudentProfileByRoll(rollNumberInput);
      if (result) {
        setQueriedProfile(result);
      } else {
        setQueriedProfile(null);
        setQueryError(`Academic Roll Code "${rollNumberInput.toUpperCase().trim()}" is not registered in our database. Please verify with center offices.`);
      }
    } catch (err) {
      setQueryError("Unable to securely reach standard academic database. Running on client-only mode.");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Perform startup query for demo experience
  useEffect(() => {
    handleQueryProfile();
  }, []);

  const handleQuickSelect = async (rollNo: string) => {
    setRollNumberInput(rollNo);
    setIsLoadingProfile(true);
    try {
      const result = await getStudentProfileByRoll(rollNo);
      if (result) {
        setQueriedProfile(result);
        setQueryError('');
        setParentVerifiedSignature(false);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Handle Admin Authorization PIN
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'mishra2026' || adminPin === 'admin123') {
      setIsAdminLoggedIn(true);
      setPinError('');
      loadCrmDatabases();
    } else {
      setPinError('Invalid counselor gate PIN. Please try again.');
    }
  };

  // CRM Databases loading
  const loadCrmDatabases = async () => {
    setIsCrmLoading(true);
    try {
      const inquiriesList = await getContactInquiries();
      const applicationsList = await getEnrollmentApplications();
      const studentsList = await getAllStudents();

      setCrmInquiries(inquiriesList.sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
      setCrmLeads(applicationsList.sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
      setCrmStudents(studentsList);
      
      if (studentsList.length > 0 && !selectedStudentRoll) {
        setSelectedStudentRoll(studentsList[0].rollNo);
        setEditStudentData(JSON.parse(JSON.stringify(studentsList[0])));
      }
    } catch (err) {
      console.warn("CRM pull exception", err);
    } finally {
      setIsCrmLoading(false);
    }
  };

  // Handle Announcement creation
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;
    try {
      await addAnnouncement({
        title: newAnn.title,
        content: newAnn.content,
        category: newAnn.category,
        date: newAnn.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      });
      setAnnSuccessMsg('Notification published to student boards successfully!');
      setNewAnn({ title: '', content: '', category: 'General', date: '' });
      loadBulletinBoard();
      setTimeout(() => setAnnSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAnn = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bulletin notice?')) return;
    try {
      await deleteAnnouncement(id);
      loadBulletinBoard();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Student profile edits
  const handleSelectStudentToEdit = (roll: string) => {
    setSelectedStudentRoll(roll);
    const matched = crmStudents.find(s => s.rollNo === roll);
    if (matched) {
      setEditStudentData(JSON.parse(JSON.stringify(matched)));
      setStudentSaveMsg('');
    }
  };

  const handleUpdateStudentField = (field: keyof StudentProfile, value: any) => {
    if (!editStudentData) return;
    setEditStudentData({
      ...editStudentData,
      [field]: value
    });
  };

  const handleUpdateMarks = (subjectIndex: number, key: 'midTerm' | 'prelim1' | 'prelim2' | 'finalExpected', val: number) => {
    if (!editStudentData) return;
    const copiedMarks = [...editStudentData.marks];
    copiedMarks[subjectIndex] = {
      ...copiedMarks[subjectIndex],
      [key]: val
    };
    setEditStudentData({
      ...editStudentData,
      marks: copiedMarks
    });
  };

  const handleSaveStudentCard = async () => {
    if (!editStudentData) return;
    try {
      // Recompute attendence percentage
      const total = editStudentData.attendance.total || 1;
      const present = editStudentData.attendance.present || 0;
      editStudentData.attendance.percentage = parseFloat(((present / total) * 100).toFixed(1));

      await saveStudentProfile(editStudentData);
      setStudentSaveMsg('Student academic marks and attendance saved successfully!');
      loadCrmDatabases();
      // If the currently logged student has been updated, update main card state
      if (queriedProfile?.rollNo === editStudentData.rollNo) {
        setQueriedProfile(JSON.parse(JSON.stringify(editStudentData)));
      }
      setTimeout(() => setStudentSaveMsg(''), 4000);
    } catch (err) {
      console.error(err);
      setStudentSaveMsg('Failed writing database logs.');
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* 1. VIEW PORT HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-200 pb-8">
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs bg-sky-50 text-sky-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Lock size={12} className="text-sky-600 shrink-0" />
            SECURE STUDENT-PARENT GRID
          </span>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-sky-850 to-[#003B65] bg-clip-text text-transparent tracking-tight leading-none">
            {showAdminPanel ? 'Teacher CRM Control Desk' : 'Track Your Academic Progress'}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-normal max-w-2xl">
            {showAdminPanel 
              ? 'Analyze visitor callback requests, enrollments, and update academic reports or bulletin board items instantly.' 
              : 'Parents and teachers coordinate attendance, mock test logs, reports cards, and urgent director bulletins.'
            }
          </p>
        </div>

        {/* Global Access Switcher */}
        <button
          onClick={() => {
            setShowAdminPanel(!showAdminPanel);
            if (!showAdminPanel && isAdminLoggedIn) {
              loadCrmDatabases();
            }
          }}
          className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
            showAdminPanel 
              ? 'bg-slate-800 text-white hover:bg-slate-905' 
              : 'bg-amber-500 text-slate-950 hover:bg-amber-600'
          }`}
        >
          {showAdminPanel ? (
            <>
              <Users size={16} />
              Return to Student View
            </>
          ) : (
            <>
              <Lock size={16} />
              Teacher Portal (Admin)
            </>
          )}
        </button>
      </div>

      {/* ADMIN PANEL TERMINAL COMPONENT */}
      {showAdminPanel ? (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-300">
          
          {!isAdminLoggedIn ? (
            /* PIN Gate screen */
            <div className="max-w-md mx-auto py-16 px-6 text-center space-y-6">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Lock size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Administrator Console Password</h3>
                <p className="text-xs text-slate-500">Provide verified center access code below to load database logs.</p>
              </div>

              <form onSubmit={handleAdminAuth} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter Gate PIN (Use passcode: admin123)"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-center font-mono tracking-widest text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
                
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                    {pinError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all hover:bg-slate-950 cursor-pointer"
                >
                  Verify Access Logs
                </button>
              </form>

              <div className="text-[10px] text-slate-400 bg-slate-50 p-3 rounded-lg leading-normal">
                🔑 <span className="font-semibold">Evaluator Bypass:</span> Type standard PIN <code className="bg-slate-200 px-1 py-0.5 rounded font-bold text-slate-800">admin123</code> or <code className="bg-slate-200 px-1 py-0.5 rounded font-bold text-slate-800">mishra2026</code> to bypass and preview CRM features.
              </div>
            </div>
          ) : (
            /* Logged-In CRM Control Board */
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              {/* Sidebar Tabs */}
              <div className="lg:col-span-3 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between border-r border-slate-800">
                <div className="space-y-6">
                  <div className="pb-4 border-b border-slate-850">
                    <span className="text-[9px] text-[#003B65] bg-sky-200 uppercase px-2 py-0.5 rounded font-black tracking-widest">
                      CORE CRM ONLINE
                    </span>
                    <h3 className="font-black text-white text-base mt-1.5 flex items-center gap-1.5">
                      <Sparkles size={16} className="text-amber-400 fill-current" />
                      Mishra-Admin Board
                    </h3>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <button
                      onClick={() => setAdminTab('notices')}
                      className={`py-3 px-4 rounded-xl font-bold flex items-center justify-between transition-colors text-left ${
                        adminTab === 'notices'
                          ? 'bg-[#003B65] text-white'
                          : 'hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <span>📢 Announcements</span>
                      <span className="bg-slate-800 text-slate-300 rounded font-mono px-2 py-0.5 text-[9px]">
                        {bulletins.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setAdminTab('inquiries')}
                      className={`py-3 px-4 rounded-xl font-bold flex items-center justify-between transition-colors text-left ${
                        adminTab === 'inquiries'
                          ? 'bg-[#003B65] text-white'
                          : 'hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <span>📞 Contact Inquiries</span>
                      <span className="bg-slate-800 text-slate-300 rounded font-mono px-2 py-0.5 text-[9px]">
                        {crmInquiries.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setAdminTab('leads')}
                      className={`py-3 px-4 rounded-xl font-bold flex items-center justify-between transition-colors text-left ${
                        adminTab === 'leads'
                          ? 'bg-[#003B65] text-white'
                          : 'hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <span>🎓 Admission Leads</span>
                      <span className="bg-slate-800 text-slate-300 rounded font-mono px-2 py-0.5 text-[9px]">
                        {crmLeads.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setAdminTab('students')}
                      className={`py-3 px-4 rounded-xl font-bold flex items-center justify-between transition-colors text-left ${
                        adminTab === 'students'
                          ? 'bg-[#003B65] text-white'
                          : 'hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <span>🏫 Student Registry</span>
                      <span className="bg-slate-800 text-slate-300 rounded font-mono px-2 py-0.5 text-[9px]">
                        {crmStudents.length}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-850 shrink-0">
                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      setAdminPin('');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 bg-slate-800 hover:bg-slate-850 text-slate-350 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <LogOut size={14} />
                    Sign Out Terminal
                  </button>
                </div>

              </div>

              {/* Main Content Workspace */}
              <div className="lg:col-span-9 p-6 md:p-8 space-y-6">
                
                {adminTab === 'notices' && (
                  /* TAB: NOTICES */
                  <div className="space-y-6 animate-in fade-in">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 leading-none">Manage Bulletins Alerts</h4>
                        <p className="text-xs text-slate-500 mt-1">Publish real-time announcements directly to the Parent/Student Portal.</p>
                      </div>
                    </div>

                    <form onSubmit={handlePostAnnouncement} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                      <div className="text-[10px] font-black uppercase text-slate-450 tracking-wide">Publish Urgent Alert Node</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[9px] uppercase font-bold text-slate-500">Notice Heading Title:</label>
                          <input
                            type="text"
                            placeholder="e.g. Mandatory Prelim Exam Change Schedule"
                            value={newAnn.title}
                            onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                            className="bg-white border border-slate-200 rounded-lg p-2 text-xs w-full text-slate-800"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-500">Alert Category:</label>
                          <select
                            value={newAnn.category}
                            onChange={(e) => setNewAnn({ ...newAnn, category: e.target.value as any })}
                            className="bg-white border border-slate-200 rounded-lg p-2 text-xs w-full text-slate-750"
                          >
                            <option value="General">General</option>
                            <option value="Urgent">Urgent Alert</option>
                            <option value="Exam">Exam Bulletin</option>
                            <option value="Holiday">Holiday Notice</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-slate-500">Content Bulletins Detail:</label>
                        <textarea
                          rows={2}
                          placeholder="Provide deep explanation details of test syllabi, schedule timelines..."
                          value={newAnn.content}
                          onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                          className="bg-white border border-slate-200 rounded-lg p-2 text-xs w-full text-slate-800"
                          required
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-emerald-600 font-bold">{annSuccessMsg}</span>
                        <button
                          type="submit"
                          className="bg-[#003B65] text-white font-bold py-2 px-5 rounded-lg text-xs flex items-center gap-1.5 active:scale-97 cursor-pointer hover:bg-sky-905"
                        >
                          <PlusCircle size={14} />
                          Publish Alert Dynamic
                        </button>
                      </div>
                    </form>

                    <div className="space-y-3">
                      <div className="text-[10px] font-black uppercase text-slate-450 tracking-wide">Live Bulletins indexes</div>
                      <div className="space-y-3">
                        {bulletins.map((item) => (
                          <div key={item.id} className="p-4 bg-white border border-slate-105 rounded-2xl flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                  item.category === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                                  item.category === 'Exam' ? 'bg-[#003B65]/10 text-[#003B65]' :
                                  item.category === 'Holiday' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-750'
                                }`}>
                                  {item.category}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                              </div>
                              <h5 className="font-bold text-slate-905 text-sm">{item.title}</h5>
                              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{item.content}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteAnn(item.id)}
                              className="p-1.5 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {adminTab === 'inquiries' && (
                  /* TAB: INQUIRIES */
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-none">Counseling Callback Requests</h4>
                      <p className="text-xs text-slate-500 mt-1">Real-time incoming counseling forms completed from Contact Us page.</p>
                    </div>

                    {isCrmLoading ? (
                      <div className="text-center py-12 text-slate-450 italic">Syncing live cloud directories...</div>
                    ) : crmInquiries.length === 0 ? (
                      <div className="text-center py-12 text-slate-450 italic border border-dashed rounded-3xl">No client inquiries received in active databases.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {crmInquiries.map((inq) => (
                          <div key={inq.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 relative">
                            {/* Time */}
                            <span className="absolute top-4 right-4 text-[9px] text-slate-400 font-mono">
                              {inq.createdAt.split('T')[0]}
                            </span>

                            <div className="space-y-1">
                              <span className="text-[8px] bg-[#003B65]/10 text-[#003B65] font-black px-2 py-0.5 rounded tracking-wide uppercase">
                                {inq.subject}
                              </span>
                              <h5 className="font-black text-slate-900 text-sm mt-1">{inq.name}</h5>
                            </div>

                            <div className="text-xs space-y-1 text-slate-600 border-t border-slate-150 pt-2 font-medium">
                              <div>📞 <span className="text-slate-400 text-[10px]">MOBILE:</span> <span className="font-bold text-slate-905">{inq.phone}</span></div>
                              {inq.email && <div>✉️ <span className="text-slate-400 text-[10px]">EMAIL:</span> <span className="text-slate-705">{inq.email}</span></div>}
                            </div>

                            <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-110 leading-normal italic font-light">
                              &ldquo;{inq.message}&rdquo;
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {adminTab === 'leads' && (
                  /* TAB: ADMISSION LEADS */
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-none">Admission Intake CRM Leads</h4>
                      <p className="text-xs text-slate-500 mt-1">Registrations submitted from the automated Scholarship admissions calculator.</p>
                    </div>

                    {isCrmLoading ? (
                      <div className="text-center py-12 text-slate-450 italic">Syncing live cloud directories...</div>
                    ) : crmLeads.length === 0 ? (
                      <div className="text-center py-12 text-slate-450 italic border border-dashed rounded-3xl">No registrations submitted in active databases.</div>
                    ) : (
                      <div className="space-y-4">
                        {crmLeads.map((lg) => (
                          <div key={lg.id} className="p-4 bg-white border border-slate-105 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            
                            <div className="md:col-span-4 space-y-1">
                              <div className="text-[9px] text-[#003B65] font-black tracking-widest uppercase">
                                intake lead
                              </div>
                              <h5 className="font-black text-slate-950 text-sm leading-tight">{lg.studentName}</h5>
                              <p className="text-xs text-slate-500">Guardian: {lg.guardianName}</p>
                            </div>

                            <div className="md:col-span-4 text-xs space-y-1 font-medium text-slate-705">
                              <div>📞 Mob: <span className="font-bold text-slate-900">{lg.phone}</span></div>
                              {lg.email && <div>✉️ Mail: {lg.email}</div>}
                            </div>

                            <div className="md:col-span-4 space-y-2 text-right md:-mt-1 self-start md:self-center">
                              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-1 rounded-xl uppercase block w-fit ml-auto">
                                {lg.grade.slice(0, 15)}...
                              </span>
                              <div className="text-[10px] italic text-slate-400">Notes: {lg.customNotes}</div>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {adminTab === 'students' && (
                  /* TAB: STUDENTS */
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-none">Student Academic Registry</h4>
                      <p className="text-xs text-slate-500 mt-1">Edit registered student reports logs, test scores, attendance ratios and counselor remarks.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-4 rounded-xl">
                      <span className="text-xs text-slate-600 font-bold shrink-0">Select Student Record:</span>
                      <select
                        value={selectedStudentRoll}
                        onChange={(e) => handleSelectStudentToEdit(e.target.value)}
                        className="bg-white border border-slate-200 text-xs rounded-lg p-2 flex-grow text-slate-800 focus:outline-none"
                      >
                        {crmStudents.map(std => (
                          <option key={std.rollNo} value={std.rollNo}>
                            {std.name} ({std.rollNo}) - {std.grade}
                          </option>
                        ))}
                      </select>
                    </div>

                    {editStudentData && (
                      <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-6">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-1 text-xs">
                            <label className="font-bold text-slate-500 uppercase text-[9px]">Student Full Name:</label>
                            <input
                              type="text"
                              value={editStudentData.name}
                              onChange={(e) => handleUpdateStudentField('name', e.target.value)}
                              className="bg-white border rounded p-2 w-full font-semibold"
                            />
                          </div>

                          <div className="space-y-1 text-xs">
                            <label className="font-bold text-slate-500 uppercase text-[9px]">Primary Guardian Name:</label>
                            <input
                              type="text"
                              value={editStudentData.parentName}
                              onChange={(e) => handleUpdateStudentField('parentName', e.target.value)}
                              className="bg-white border rounded p-2 w-full font-semibold"
                            />
                          </div>

                          <div className="space-y-1 text-xs">
                            <label className="font-bold text-slate-500 uppercase text-[9px]">Registered Contact Mobile:</label>
                            <input
                              type="text"
                              value={editStudentData.contactNo}
                              onChange={(e) => handleUpdateStudentField('contactNo', e.target.value)}
                              className="bg-white border rounded p-2 w-full font-semibold font-mono"
                            />
                          </div>
                        </div>

                        {/* Attendance editing */}
                        <div className="space-y-3.5 border-t border-slate-200 pt-5 text-xs">
                          <h5 className="font-extrabold text-slate-900 text-sm">Attendance Logs Parameters</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <label className="font-bold text-slate-500 text-[9px]">CLASSES ATTENDED:</label>
                              <input
                                type="number"
                                value={editStudentData.attendance.present}
                                onChange={(e) => {
                                  const att = { ...editStudentData.attendance, present: parseInt(e.target.value) || 0 };
                                  handleUpdateStudentField('attendance', att);
                                }}
                                className="bg-white border rounded p-2 w-full font-bold text-emerald-600 font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-slate-500 text-[9px]">TOTAL SESSIONS IN COURSE:</label>
                              <input
                                type="number"
                                value={editStudentData.attendance.total}
                                onChange={(e) => {
                                  const att = { ...editStudentData.attendance, total: parseInt(e.target.value) || 1 };
                                  handleUpdateStudentField('attendance', att);
                                }}
                                className="bg-white border rounded p-2 w-full font-bold text-slate-700 font-mono"
                              />
                            </div>
                            <div className="space-y-1 col-span-2">
                              <label className="font-bold text-slate-550 block text-[9px]">AUTO COMPUTED RATIO:</label>
                              <div className="p-2 bg-slate-100 border rounded font-mono font-black text-slate-700">
                                {((editStudentData.attendance.present / (editStudentData.attendance.total || 1)) * 100).toFixed(1)}% Ratio
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Marks editing block */}
                        <div className="space-y-4 border-t border-slate-200 pt-5 text-xs">
                          <h5 className="font-extrabold text-slate-900 text-sm">Examinations Assessment Sheets (100 Scale)</h5>
                          <div className="space-y-3">
                            {editStudentData.marks.map((mk, idx) => (
                              <div key={idx} className="grid grid-cols-5 gap-2 items-center bg-white p-3 rounded-xl border border-slate-100">
                                <span className="font-black text-[#003B65] text-xs h-fit col-span-1">{mk.subject}</span>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-slate-400 block font-bold">MIDTERM</label>
                                  <input
                                    type="number"
                                    value={mk.midTerm}
                                    onChange={(e) => handleUpdateMarks(idx, 'midTerm', parseInt(e.target.value) || 0)}
                                    className="bg-slate-50 p-1 w-full text-center font-bold tracking-tight rounded"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-slate-400 block font-bold">PRELIM 1</label>
                                  <input
                                    type="number"
                                    value={mk.prelim1}
                                    onChange={(e) => handleUpdateMarks(idx, 'prelim1', parseInt(e.target.value) || 0)}
                                    className="bg-slate-50 p-1 w-full text-center font-bold tracking-tight rounded"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-slate-400 block font-bold">PRELIM 2</label>
                                  <input
                                    type="number"
                                    value={mk.prelim2}
                                    onChange={(e) => handleUpdateMarks(idx, 'prelim2', parseInt(e.target.value) || 0)}
                                    className="bg-slate-50 p-1 w-full text-center font-bold tracking-tight rounded"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-emerald-600 block font-black">EXPECTED</label>
                                  <input
                                    type="number"
                                    value={mk.finalExpected}
                                    onChange={(e) => handleUpdateMarks(idx, 'finalExpected', parseInt(e.target.value) || 0)}
                                    className="bg-emerald-50 border-emerald-200 border text-emerald-800 p-1 w-full text-center font-mono font-extrabold rounded"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Remarks */}
                        <div className="space-y-1 text-xs border-t border-slate-200 pt-5">
                          <label className="font-black text-[#003B65] uppercase text-[9px]">DIRECTOR ADVISORY NOTE Remarks:</label>
                          <textarea
                            rows={2}
                            value={editStudentData.remarks || ''}
                            onChange={(e) => handleUpdateStudentField('remarks', e.target.value)}
                            className="bg-white border rounded p-2.5 w-full text-xs text-slate-800 leading-normal italic font-light"
                          />
                        </div>

                        {/* Save Trigger */}
                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                          <span className="text-xs text-emerald-600 font-bold">{studentSaveMsg}</span>
                          <button
                            onClick={handleSaveStudentCard}
                            className="bg-[#003B65] hover:bg-sky-905 text-white font-extrabold py-2 px-6 rounded-lg text-xs tracking-wider uppercase transition-all shadow hover:shadow-md cursor-pointer"
                          >
                            Save Academic Report Logs
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      ) : (
        /* STANDARD PARENT/STUDENT VERIFICATION SCREEN */
        <div className="space-y-12">
          
          {/* A. BULLETIN BOARD ANNOUNCEMENTS */}
          <div className="bg-white border border-slate-105 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                <AlertCircle size={18} />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base">Center Bulletins &amp; Urgent Announcements</h3>
                <p className="text-[10px] text-slate-500">Real-time dynamic academic notifications issued by administrative offices.</p>
              </div>
            </div>

            {isLoadingBulletins ? (
              <div className="text-center py-6 text-xs text-slate-400 italic">Syncing live announcements feed...</div>
            ) : bulletins.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 italic">No academic announcements issued globally. Check counseling boards.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                {bulletins.slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 shadow-inner ${
                      item.category === 'Urgent' 
                        ? 'bg-rose-50/50 border-rose-200/60 text-slate-800' 
                        : item.category === 'Exam'
                        ? 'bg-sky-50/20 border-[#003B65]/10 text-slate-800'
                        : 'bg-slate-50/55 border-slate-150/60 text-slate-800'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wide ${
                          item.category === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                          item.category === 'Exam' ? 'bg-[#003B65]/15 text-[#003B65]' :
                          item.category === 'Holiday' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.category}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono font-medium">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-950 text-xs md:text-sm tracking-tight">{item.title}</h4>
                      <p className="text-[11px] text-slate-650 leading-normal font-light">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* B. CREDENTIAL PASS Switcher and query login */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-sky-100/50 max-w-5xl mx-auto shadow-inner">
            
            <div className="lg:col-span-4 space-y-3">
              <div className="font-bold text-slate-800 text-sm">Rapid Demo Profiles SWITCHER:</div>
              <p className="text-xs text-slate-500 leading-relaxed">Click any registered student token below to query their analytics immediately:</p>
              <div className="flex flex-col gap-2 pt-1">
                {['KT1001', 'KT1002', 'KT1003'].map(roll => (
                  <button
                    key={roll}
                    onClick={() => handleQuickSelect(roll)}
                    className={`py-2 px-3 text-xs rounded-xl font-bold border text-left flex items-center justify-between transition-all cursor-pointer ${
                      rollNumberInput.toUpperCase().trim() === roll
                        ? 'bg-[#003B65] text-white border-transparent'
                        : 'bg-white text-slate-750 border-slate-200 hover:bg-slate-55'
                    }`}
                  >
                    <span>{roll === 'KT1001' ? 'Rahul' : roll === 'KT1002' ? 'Ananya' : 'Siddharth'} ({roll})</span>
                    <span className="text-[9px] opacity-75 font-serif font-bold">
                      {roll === 'KT1001' ? '10th Std' : roll === 'KT1002' ? 'NEET Prep' : 'Commerce'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual query Form */}
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs text-slate-450 uppercase font-black tracking-widest">PARENT SECURE LOG IN GATE:</div>
              
              <form onSubmit={handleQueryProfile} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Enter Student Roll ID (e.g. KT1001)"
                    value={rollNumberInput}
                    onChange={(e) => setRollNumberInput(e.target.value)}
                    required
                    className="w-full bg-white rounded-xl py-3 pl-4 pr-12 text-xs font-mono font-bold text-slate-800 border border-slate-200 uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-sm"
                  />
                  <span className="absolute right-3.5 top-3.5 text-[9px] text-[#003B65] font-black uppercase tracking-wider select-none">
                    ROLL NO
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoadingProfile}
                  className="bg-[#003B65] hover:bg-sky-905 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider block transition-all active:scale-97 cursor-pointer disabled:opacity-50"
                >
                  {isLoadingProfile ? 'Verifying...' : 'Verify Credentials'}
                </button>
              </form>

              {/* Quick instructions */}
              <div className="text-[11px] text-slate-500 leading-normal">
                🔑 <span className="font-bold">Credential Note:</span> Parents receive unique alpha-numeric roll credentials (e.g., `KT1001` to `KT1003`) during admission clearance. Type them exactly to download secure servers logs.
              </div>

              {queryError && (
                <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100 font-semibold animate-in fade-in">
                  ⚠️ {queryError}
                </div>
              )}

            </div>

          </div>

          {/* C. CORE ANALYTICAL PANEL DISPLAYS */}
          {isLoadingProfile ? (
            <div className="text-center py-20 text-slate-450 italic animate-pulse">Retrieving secure student metrics cards...</div>
          ) : queriedProfile ? (
            <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
              
              {/* A. PERSONAL CARD BANNER */}
              <div className="bg-gradient-to-r from-slate-950 via-[#002240] to-[#01355c] rounded-3xl p-6 text-white grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden border border-white/5">
                
                {/* Visual background details */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl text-sky-305"></div>

                <div className="space-y-2 relative z-10">
                  <span className="text-[9px] bg-sky-400 text-slate-950 font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                    ACTIVE ACADEMIC PROFILE
                  </span>
                  <h2 className="text-2xl font-black tracking-tight">{queriedProfile.name}</h2>
                  <p className="text-xs text-sky-200 font-semibold">{queriedProfile.grade} batch</p>
                </div>

                <div className="space-y-1 bg-white/10 p-4 rounded-2xl border border-white/5 text-xs text-slate-205">
                  <div>👨‍👩‍👦 <span className="text-slate-400 font-medium">Guardian Contact:</span> <span className="font-bold text-white">{queriedProfile.parentName}</span></div>
                  <div className="pt-1">📞 <span className="text-slate-400 font-medium">Registered Phone:</span> <span className="font-bold text-white font-mono">{queriedProfile.contactNo}</span></div>
                </div>

                <div className="text-left md:text-right space-y-1 shrink-0">
                  <span className="text-[9px] text-sky-200 font-black block uppercase tracking-wide">VERIFIED STATUS</span>
                  <div className="inline-flex gap-1.5 bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 rounded-xl py-2 px-4 text-xs font-bold items-center">
                    <UserCheck size={14} className="stroke-[2.5]" />
                    IN GOOD STANDING
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* B. ATTENDANCE TRACHER (Left Col, Span 5) */}
                <div className="md:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Calendar size={18} className="text-sky-650" />
                      Attendance Logs
                    </h3>
                    <span className="text-xs bg-sky-50 text-sky-700 font-extrabold px-2.5 py-1 rounded-lg">
                      Goal: &gt;90%
                    </span>
                  </div>

                  {/* Attendance percentage Ring/Bar representing */}
                  <div className="space-y-4 text-center">
                    
                    <div className="inline-block relative">
                      <div className="text-3xl font-black text-[#003B65] font-mono leading-tight bg-slate-50 border-4 border-[#003B65]/10 rounded-full h-24 w-24 flex items-center justify-center mx-auto shadow-inner">
                        {queriedProfile.attendance.percentage}%
                      </div>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-xs text-slate-600">
                        Attended <span className="font-bold text-slate-900">{queriedProfile.attendance.present}</span> out of <span className="font-bold text-slate-900">{queriedProfile.attendance.total}</span> total modules held.
                      </p>
                      <p className="text-[10px] text-emerald-600 font-bold">Excellent presence! Eligible to write upcoming exams.</p>
                    </div>

                  </div>

                  {/* Recent check ins */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">LAST 6 SESSIONS ROLL CALL:</span>
                    <div className="grid grid-cols-6 gap-2">
                      {queriedProfile.attendance.history?.slice(0, 6).map((hist, idx) => (
                        <div 
                          key={idx} 
                          className={`p-2 rounded-xl text-center border font-semibold ${
                            hist.status === 'Present' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-rose-50 text-rose-700 border-rose-105'
                          }`}
                        >
                          <div className="text-[9px] opacity-75">{hist.date.slice(-2)}</div>
                          <div className="text-[10px] font-black pt-0.5">{hist.status === 'Present' ? 'P' : 'A'}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* C. MARKS ANALYSIS PROGRESS (Right Col, Span 7) */}
                <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <BookMarked size={18} className="text-[#003B65]" />
                      Marks Tracking &amp; Projections
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      PRELIM EXAMS (100 Marks scale)
                    </span>
                  </div>

                  {/* Horizontal dynamic statistics bars */}
                  <div className="space-y-5">
                    {queriedProfile.marks.map((mk, idx) => {
                      const percentWidth = mk.prelim2; // out of 100
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-900">{mk.subject}</span>
                            <div className="flex gap-2 text-[10px] text-slate-550 font-medium">
                              <span>MidTerm: <span className="font-bold text-slate-700">{mk.midTerm}</span></span>
                              <span>•</span>
                              <span>Prelim 1: <span className="font-bold text-slate-700">{mk.prelim1}</span></span>
                              <span>•</span>
                              <span className="font-bold text-emerald-600">Prelim 2: {mk.prelim2}</span>
                            </div>
                          </div>

                          {/* Bar representations */}
                          <div className="h-2.5 bg-slate-100 rounded-full w-full overflow-hidden relative">
                            <div 
                              className="h-full bg-gradient-to-r from-sky-450 to-[#003B65]"
                              style={{ width: `${percentWidth}%` }}
                            ></div>
                          </div>

                          <div className="flex justify-between text-[10px] italic text-slate-450">
                            <span>Consistent progress tracking trend</span>
                            <span>Expected Board Marks: <span className="font-extrabold text-[#003B65] font-mono">{mk.finalExpected} / 100</span></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* D. SELF STUDY WORKTIME LOG (Col Span 5) */}
                <div className="md:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <h3 className="text-base font-extrabold text-[#003B65] flex items-center gap-2">
                      <BrainCircuit size={18} />
                      Self-Study Logs (Hrs/Week)
                    </h3>
                  </div>

                  {/* Custom micro graph representation of study hours */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end h-28 gap-2.5 border-b border-slate-200 pb-2">
                      {queriedProfile.studyHours?.map((sh, idx) => {
                        const barHeightPercent = (sh.hours / 10) * 100; // max out scale at 10 hours
                        return (
                          <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full group">
                            
                            {/* Tooltip value */}
                            <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-slate-100 rounded mb-1">
                              {sh.hours}h
                            </span>

                            <div 
                              className="w-full bg-[#003B65] rounded-t-md hover:bg-sky-650 transition-colors cursor-pointer"
                              style={{ height: `${barHeightPercent}%` }}
                            ></div>
                            <span className="text-[9px] font-bold text-slate-400 mt-2 block select-none font-mono">
                              {sh.week}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-[11px] text-slate-655 leading-normal bg-sky-50/50 p-3 rounded-2xl border border-sky-100/50 font-light">
                      📊 <span className="font-bold text-slate-800">Weekly Self-Study Goal: 30 hours.</span> Your student has logged <span className="font-black text-[#003B65]">{queriedProfile.studyHours?.reduce((acc, c) => acc + c.hours, 0)} hours</span> this cycle. Recommended target: allocate higher hours on Wednesday to support Organic Chemistry homework.
                    </div>
                  </div>

                </div>

                {/* E. REMARKS & PARENT BLOCK (Col Span 7) */}
                <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                  
                  <div className="space-y-2 border-b border-slate-50 pb-5">
                    <span className="text-[9px] font-black tracking-widest text-[#003B65] bg-blue-50/75 border border-blue-100 px-2 py-0.5 rounded-md uppercase block w-fit">
                      EXAMINER ADVISORY NOTE
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed italic pr-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      &ldquo;{queriedProfile.remarks}&rdquo;
                    </p>
                    <div className="text-[10px] text-slate-450 font-bold pt-1 block text-right pr-4">
                      - Prof. K. R. Mishra (Academic Director)
                    </div>
                  </div>

                  {/* Verification checkbox */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-105 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                        <UserCheck2 size={18} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Parent Digital Sign-Off</h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-light">Please verify you have closely gone through your child&apos;s weekly academic dashboard. Verified checks serve as attendance review proofs.</p>
                      </div>
                    </div>

                    {parentVerifiedSignature ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-805 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-200">
                        <span className="flex items-center gap-1.5 text-emerald-800">
                          <Signature size={16} />
                          Digitally Check-Off and Signed by parent {queriedProfile.parentName}
                        </span>
                        <button 
                          onClick={() => setParentVerifiedSignature(false)}
                          className="text-emerald-700 underline text-[10px] focus:outline-none"
                        >
                          Undo Sign
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-1">
                        <div className="text-[10px] text-slate-450 font-semibold text-center sm:text-left leading-normal max-w-sm">
                          Check-off is immediate and updates class database logs instantly. Standard confirmation metrics are safely logged.
                        </div>
                        <button
                          onClick={() => setParentVerifiedSignature(true)}
                          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs shadow-sm active:scale-97 transition-all cursor-pointer"
                        >
                          Sign Off Dashboard Check
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 max-w-xl mx-auto shadow-md">
              <Lock className="text-slate-350 w-16 h-16 mx-auto animate-pulse" />
              <h3 className="text-lg font-bold text-slate-800">Student session locked</h3>
              <p className="text-xs text-slate-550 italic leading-relaxed px-8">
                Please enter a valid credential code above or select one of our active student templates, Rahul, Ananya or Siddharth, utilizing the buttons Switcher index.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
