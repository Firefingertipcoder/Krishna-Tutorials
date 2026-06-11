import { Course, Topper, GalleryItem, StudentProfile } from '../types';
import { 
  COURSES_DATA, 
  TOPPERS_DATA, 
  GALLERY_DATA, 
  STUDENT_PROFILES 
} from '../data/websiteData';

// Dynamic Announcements Type
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Urgent' | 'General' | 'Exam' | 'Holiday';
  createdAt: number;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface EnrollmentApplication {
  id?: string;
  studentName: string;
  guardianName: string;
  phone: string;
  email: string;
  courseId: string;
  grade: string;
  customNotes: string;
  createdAt: string;
}

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Semester Term Diagnostics & Revision Exercises',
    content: 'Review exams are beginning on coming Wednesday. Relevant syllabus schedules and reference boards have been dispatched.',
    date: 'June 07, 2026',
    category: 'Exam',
    createdAt: Date.now() - 3600000 * 24
  },
  {
    id: 'ann-2',
    title: 'Admissions Open: Merit Scholarship & Counselor Slots Available',
    content: 'Scholarship waivers assessment programs are open. Parents can block counseling sessions via Contact Forms directly.',
    date: 'June 05, 2026',
    category: 'Urgent',
    createdAt: Date.now() - 3600000 * 48
  }
];

// Helper to safely write to localStorage
const isBrowser = typeof window !== 'undefined';
function getLocalItem<T>(key: string, backup: T): T {
  if (!isBrowser) return backup;
  const item = localStorage.getItem(key);
  if (!item) return backup;
  try {
    return JSON.parse(item) as T;
  } catch {
    return backup;
  }
}

function setLocalItem<T>(key: string, val: T): void {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(val));
}

// Initialize cached databases inside localStorage
const KEY_COURSES = 'kt_db_courses';
const KEY_ANNOUNCEMENTS = 'kt_db_announcements';
const KEY_GALLERY = 'kt_db_gallery';
const KEY_TOPPERS = 'kt_db_toppers';
const KEY_STUDENTS = 'kt_db_students';
const KEY_INQUIRIES = 'kt_db_inquiries';
const KEY_APPLICATIONS = 'kt_db_applications';

// Quick init logic helper
function ensureLocalStorageSeeded() {
  if (!isBrowser) return;
  if (!localStorage.getItem(KEY_COURSES)) setLocalItem(KEY_COURSES, COURSES_DATA);
  if (!localStorage.getItem(KEY_TOPPERS)) setLocalItem(KEY_TOPPERS, TOPPERS_DATA);
  if (!localStorage.getItem(KEY_GALLERY)) setLocalItem(KEY_GALLERY, GALLERY_DATA);
  if (!localStorage.getItem(KEY_STUDENTS)) setLocalItem(KEY_STUDENTS, STUDENT_PROFILES);
  if (!localStorage.getItem(KEY_ANNOUNCEMENTS)) setLocalItem(KEY_ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
  if (!localStorage.getItem(KEY_INQUIRIES)) setLocalItem(KEY_INQUIRIES, [] as ContactInquiry[]);
  if (!localStorage.getItem(KEY_APPLICATIONS)) setLocalItem(KEY_APPLICATIONS, [] as EnrollmentApplication[]);
}

// --- 1. COURSES SERVICE ---
export async function getCourses(): Promise<Course[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<Course[]>(KEY_COURSES, COURSES_DATA);
}

export async function saveCourse(course: Course): Promise<void> {
  ensureLocalStorageSeeded();
  const list = await getCourses();
  const idx = list.findIndex(c => c.id === course.id);
  if (idx !== -1) {
    list[idx] = course;
  } else {
    list.push(course);
  }
  setLocalItem(KEY_COURSES, list);
}

// --- 2. ANNOUNCEMENTS SERVICE ---
export async function getAnnouncements(): Promise<Announcement[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<Announcement[]>(KEY_ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
}

export async function addAnnouncement(ann: Omit<Announcement, 'id' | 'createdAt'>): Promise<void> {
  ensureLocalStorageSeeded();
  const list = await getAnnouncements();
  const newId = 'ann-' + Math.random().toString(36).substr(2, 9);
  const fullAnn: Announcement = {
    ...ann,
    id: newId,
    createdAt: Date.now()
  };
  list.unshift(fullAnn);
  setLocalItem(KEY_ANNOUNCEMENTS, list);
}

export async function deleteAnnouncement(id: string): Promise<void> {
  ensureLocalStorageSeeded();
  const list = await getAnnouncements();
  const filtered = list.filter(a => a.id !== id);
  setLocalItem(KEY_ANNOUNCEMENTS, filtered);
}

// --- 3. GALLERY SERVICE ---
export async function getGalleryItems(): Promise<GalleryItem[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<GalleryItem[]>(KEY_GALLERY, GALLERY_DATA);
}

export async function addGalleryItem(item: GalleryItem): Promise<void> {
  ensureLocalStorageSeeded();
  const list = await getGalleryItems();
  list.push(item);
  setLocalItem(KEY_GALLERY, list);
}

// --- 4. TOPPERS & TESTIMONIALS ---
export async function getToppers(): Promise<Topper[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<Topper[]>(KEY_TOPPERS, TOPPERS_DATA);
}

export async function saveTopper(top: Topper): Promise<void> {
  ensureLocalStorageSeeded();
  const list = await getToppers();
  const idx = list.findIndex(t => t.id === top.id);
  if (idx !== -1) {
    list[idx] = top;
  } else {
    list.push(top);
  }
  setLocalItem(KEY_TOPPERS, list);
}

// --- 5. VISITOR LEADS (INQUIRIES & APPLICATIONS) ---
export async function createContactInquiry(inquiry: Omit<ContactInquiry, 'id'>): Promise<string> {
  ensureLocalStorageSeeded();
  const list = getLocalItem<ContactInquiry[]>(KEY_INQUIRIES, []);
  const idStr = 'inq-' + Math.random().toString(36).substr(2, 9);
  const fullInquiry = { ...inquiry, id: idStr };
  list.unshift(fullInquiry);
  setLocalItem(KEY_INQUIRIES, list);
  return idStr;
}

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<ContactInquiry[]>(KEY_INQUIRIES, []);
}

export async function createEnrollmentApplication(appData: Omit<EnrollmentApplication, 'id'>): Promise<string> {
  ensureLocalStorageSeeded();
  const list = getLocalItem<EnrollmentApplication[]>(KEY_APPLICATIONS, []);
  const idStr = 'app-' + Math.random().toString(36).substr(2, 9);
  const fullApp = { ...appData, id: idStr };
  list.unshift(fullApp);
  setLocalItem(KEY_APPLICATIONS, list);
  return idStr;
}

export async function getEnrollmentApplications(): Promise<EnrollmentApplication[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<EnrollmentApplication[]>(KEY_APPLICATIONS, []);
}

// --- 6. STUDENT PORTAL DATA ---
export async function getStudentProfileByRoll(rollNo: string): Promise<StudentProfile | null> {
  ensureLocalStorageSeeded();
  const cleanRoll = rollNo.trim().toUpperCase();
  const list = getLocalItem<StudentProfile[]>(KEY_STUDENTS, STUDENT_PROFILES);
  const matched = list.find(p => p.rollNo.toUpperCase() === cleanRoll);
  return matched || null;
}

export async function saveStudentProfile(profile: StudentProfile): Promise<void> {
  ensureLocalStorageSeeded();
  const cleanRoll = profile.rollNo.trim().toUpperCase();
  const list = getLocalItem<StudentProfile[]>(KEY_STUDENTS, STUDENT_PROFILES);
  const idx = list.findIndex(p => p.rollNo.toUpperCase() === cleanRoll);
  if (idx !== -1) {
    list[idx] = profile;
  } else {
    list.push(profile);
  }
  setLocalItem(KEY_STUDENTS, list);
}

export async function getAllStudents(): Promise<StudentProfile[]> {
  ensureLocalStorageSeeded();
  return getLocalItem<StudentProfile[]>(KEY_STUDENTS, STUDENT_PROFILES);
}

// Retrain exact API to avoid breaking App.tsx call but keep it as a neat empty-op
export async function seedInitialDatabaseIfEmpty() {
  ensureLocalStorageSeeded();
  console.log("Local browser dataset successfully synchronized.");
}
