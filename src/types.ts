export type PageId =
  | 'home'
  | 'about'
  | 'courses'
  | 'results'
  | 'gallery'
  | 'admissions'
  | 'contact';

export interface Topper {
  id: string;
  name: string;
  score: string; // e.g., "98.4%"
  class: string; // e.g., "10th SSC", "12th Science"
  rank?: string; // e.g., "1st in Ward", "Mumbai Rank 3"
  year: string;  // e.g., "2024-25"
  achievements?: string;
  avatarSeed: string; // seed for generating beautiful avatars or illustration
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent';
  relationName?: string; // e.g. "Parent of Rohan (10th)"
  content: string;
  rating: number;
  class: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  features: string[];
  duration: string;
  frequency: string;
  targetAudience: string;
  baseFee: number;
}

export interface StudentProfile {
  rollNo: string;
  name: string;
  grade: string;
  parentName: string;
  contactNo: string;
  attendance: {
    present: number;
    total: number;
    percentage: number;
    history: { date: string; status: 'Present' | 'Absent' }[];
  };
  marks: {
    subject: string;
    midTerm: number;
    prelim1: number;
    prelim2: number;
    finalExpected: number;
  }[];
  studyHours: {
    week: string;
    hours: number;
  }[];
  remarks: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'classroom' | 'events' | 'ceremonies' | 'activities';
  description: string;
  imageColor: string; // beautiful custom gradient background or representation
  iconName: string; // Lucide icon identifier
}

export interface FacultyMember {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  speciality: string;
  imageColor: string;
}

export interface EnquireMessage {
  name: string;
  phone: string;
  grade: string;
  message: string;
  submittedAt: string;
}
