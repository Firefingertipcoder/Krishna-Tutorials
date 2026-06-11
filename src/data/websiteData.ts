import { Course, FacultyMember, StudentProfile, Topper, Testimonial, GalleryItem } from '../types';

export const FACULTY_DATA: FacultyMember[] = [
  {
    name: "Prof. K. R. Mishra",
    role: "Founder & Academic Director",
    qualification: "M.Sc. (Physics), B.Ed.",
    experience: "22+ Years",
    speciality: "Physics & Applied Mathematics",
    imageColor: "from-blue-600 to-indigo-800"
  },
  {
    name: "Faculty Name",
    role: "Senior Department Lead",
    qualification: "Teacher Qualifications",
    experience: "10+ Years",
    speciality: "Department Subjects speciality",
    imageColor: "from-emerald-600 to-teal-800"
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: "course-1",
    title: "Secondary Program (CBSE / ICSE / Board)",
    description: "Brief concept summary here. Standardized teaching layout built for future scholastic success.",
    subjects: ["Mathematics", "Science", "English"],
    features: [
      "Concept-oriented interactive classes",
      "Regular testing regime",
      "Parents feedback tracking system"
    ],
    duration: "1 Year Program",
    frequency: "3 Days a week (2 hrs/day)",
    targetAudience: "Primary target students standard.",
    baseFee: 15000
  },
  {
    id: "course-2",
    title: "Higher Preparatory (Science / Commerce)",
    description: "Foundational mastery series for top grades and professional competitive examinations.",
    subjects: ["Advanced Physics", "Chemistry", "Mathematics"],
    features: [
      "Intensive concept mapping lectures",
      "All syllabus coverage on-schedule",
      "Personal academic tutoring boards"
    ],
    duration: "2 Year Program",
    frequency: "5 Days a week",
    targetAudience: "Aspirants preparing for competitive boards.",
    baseFee: 30000
  }
];

export const TOPPERS_DATA: Topper[] = [
  {
    id: "top-1",
    name: "Topper Student Name",
    score: "99.2%",
    class: "10th Board (SSC)",
    rank: "State Rank 1",
    year: "2025-26",
    achievements: "Brief highlights of score or top subjects performance records.",
    avatarSeed: "student-1"
  },
  {
    id: "top-2",
    name: "Scholastic Ranker Name",
    score: "98.5%",
    class: "12th Science",
    rank: "Percentile Ranker",
    year: "2025-26",
    achievements: "Acheivements description details here.",
    avatarSeed: "student-2"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Guardian Name",
    role: "Parent",
    relationName: "Parent of Student (Class)",
    content: "Genuine feedback and reviews comments describing class experience, counselors feedback or report reviews.",
    rating: 5,
    class: "Board Program"
  },
  {
    id: "test-2",
    name: "Alumni Name",
    role: "Student",
    content: "Honest student reflection describing quality of lecture notes, mock examinations drills or mentors support here.",
    rating: 5,
    class: "Science Program"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gall-1",
    title: "Tutoring Sessions Chamber",
    category: "classroom",
    description: "Classrooms overview description highlighting amenities and visual teaching projectors.",
    imageColor: "from-blue-550 to-indigo-700",
    iconName: "MonitorPlay"
  },
  {
    id: "gall-2",
    title: "Annual Merit Felicitation",
    category: "ceremonies",
    description: "Ceremonies description highlighting topper awards, medallions, and scholarship distributions.",
    imageColor: "from-amber-500 to-yellow-650",
    iconName: "Trophy"
  }
];

export const STUDY_TIME_SCHEDULE = [
  { week: "Mon", hours: 4.0 },
  { week: "Tue", hours: 4.5 },
  { week: "Wed", hours: 4.0 },
  { week: "Thu", hours: 5.0 },
  { week: "Fri", hours: 4.8 },
  { week: "Sat", hours: 6.0 },
  { week: "Sun", hours: 7.0 }
];

export const STUDENT_PROFILES: StudentProfile[] = [
  {
    rollNo: "KT1001",
    name: "Sample Student Name",
    grade: "10th SSC Core Batch",
    parentName: "Guardian Name",
    contactNo: "9000000000",
    attendance: {
      present: 45,
      total: 50,
      percentage: 90.0,
      history: [
        { date: "2026-06-01", status: "Present" },
        { date: "2026-06-02", status: "Present" }
      ]
    },
    marks: [
      { subject: "Mathematics", midTerm: 85, prelim1: 90, prelim2: 92, finalExpected: 95 },
      { subject: "Science Core", midTerm: 80, prelim1: 85, prelim2: 90, finalExpected: 94 }
    ],
    studyHours: [
      { week: "Mon", hours: 4.0 },
      { week: "Tue", hours: 4.5 },
      { week: "Wed", hours: 4.0 },
      { week: "Thu", hours: 5.0 },
      { week: "Fri", hours: 4.8 },
      { week: "Sat", hours: 6.0 },
      { week: "Sun", hours: 7.0 }
    ],
    remarks: "Progress feedback commentary goes here. Suggest specific exam drills and key chapters for revision."
  }
];
