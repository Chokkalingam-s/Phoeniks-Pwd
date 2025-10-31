// Mock API Service for PWD Student App

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock UDID Verification
export const verifyUDID = async (udid) => {
  await delay(1000);
  
  if (!udid || udid.length < 10) {
    throw new Error('Invalid UDID format');
  }
  
  return {
    success: true,
    user: {
      id: '1',
      name: 'Rajesh Kumar',
      udid: udid,
      disability: 'Visual Impairment',
      disabilityPercentage: 40,
      location: 'Mumbai, Maharashtra',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@example.com',
      joinedDate: '2025-01-15'
    }
  };
};

// Mock Schemes Data
export const getSchemes = async (filters = {}) => {
  await delay(800);
  
  const allSchemes = [
    {
      id: 1,
      name: 'PM-DAKSH Yojana',
      shortDescription: 'Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi scheme for skill development',
      fullDescription: 'The PM-DAKSH scheme aims at skill development of marginalized persons like SC, OBC, Economically Backward Classes (EBCs), De-notified, Nomadic, Semi-Nomadic tribes, Safai Karamcharis through Up-Skilling/Re-Skilling/Training.',
      eligibility: ['Visual Impairment', 'Hearing Impairment', 'Locomotor Disability'],
      category: 'Government',
      deadline: '2025-11-15',
      daysLeft: 15,
      amount: '₹50,000',
      provider: 'Ministry of Social Justice and Empowerment',
      link: 'https://socialjustice.gov.in/schemes',
      isEligible: true
    },
    {
      id: 2,
      name: 'National Scholarship Portal (NSP)',
      shortDescription: 'Pre-matric and post-matric scholarships for students with disabilities',
      fullDescription: 'NSP provides scholarships to students pursuing various courses from Class 9 to Post Graduation. It includes Pre-Matric Scholarship, Post-Matric Scholarship, and Merit-cum-Means Scholarship.',
      eligibility: ['All Disabilities'],
      category: 'Government',
      deadline: '2025-12-30',
      daysLeft: 60,
      amount: '₹1,20,000/year',
      provider: 'National Scholarship Portal',
      link: 'https://scholarships.gov.in',
      isEligible: true
    },
    {
      id: 3,
      name: 'Disability Scholarship by Maharashtra Government',
      shortDescription: 'State-level financial assistance for PWD students in Maharashtra',
      fullDescription: 'Financial assistance for students with disabilities pursuing education in Maharashtra. Covers tuition fees, maintenance allowance, and other educational expenses.',
      eligibility: ['Visual Impairment', 'Locomotor Disability', 'Hearing Impairment'],
      category: 'State',
      deadline: '2025-11-30',
      daysLeft: 30,
      amount: '₹25,000',
      provider: 'Maharashtra Social Welfare Department',
      link: '#',
      isEligible: true
    },
    {
      id: 4,
      name: 'Skill India Digital Free Training',
      shortDescription: 'Free digital skill training for PWD individuals',
      fullDescription: 'Skill India offers free digital literacy and vocational training programs specifically designed for persons with disabilities. Includes certification upon completion.',
      eligibility: ['All Disabilities'],
      category: 'NGO',
      deadline: '2025-12-15',
      daysLeft: 45,
      amount: 'Free',
      provider: 'Skill India',
      link: 'https://www.skillindia.gov.in',
      isEligible: true
    },
    {
      id: 5,
      name: 'Samarthya - Assistive Devices Grant',
      shortDescription: 'Financial support for purchasing assistive devices',
      fullDescription: 'Provides financial assistance for purchasing assistive devices like wheelchairs, hearing aids, Braille equipment, screen readers, and other mobility/accessibility aids.',
      eligibility: ['Locomotor Disability', 'Visual Impairment', 'Hearing Impairment'],
      category: 'Government',
      deadline: '2025-11-20',
      daysLeft: 20,
      amount: '₹15,000',
      provider: 'DEPwD',
      link: '#',
      isEligible: false
    }
  ];
  
  return allSchemes;
};

// Mock Resources Data
export const getResources = async () => {
  await delay(600);
  
  return [
    {
      id: 1,
      title: 'Excel Basics with Screen Reader (NVDA)',
      organization: 'Saksham Skill Development Center',
      type: 'video',
      duration: '30 mins',
      views: 245,
      progress: 80,
      thumbnail: 'https://via.placeholder.com/300x180/21808d/ffffff?text=Excel+Tutorial',
      uploadedBy: 'Teacher Priya Sharma',
      uploadedDate: '2025-10-15',
      description: 'Learn Microsoft Excel basics using NVDA screen reader. Covers cells, rows, columns, formulas, and shortcuts.',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Braille Literacy - Complete Audio Guide',
      organization: 'National Association for the Blind',
      type: 'audio',
      duration: '45 mins',
      downloads: 120,
      progress: 0,
      thumbnail: 'https://via.placeholder.com/300x180/21808d/ffffff?text=Braille+Guide',
      uploadedBy: 'Teacher Amit Verma',
      uploadedDate: '2025-10-10',
      description: 'Comprehensive audio guide to learning Braille reading and writing. Covers Grade 1 and Grade 2 Braille.',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Indian Sign Language (ISL) - Basic Conversations',
      organization: 'Deaf Way Foundation',
      type: 'video',
      duration: '25 mins',
      views: 189,
      progress: 0,
      thumbnail: 'https://via.placeholder.com/300x180/21808d/ffffff?text=ISL+Tutorial',
      uploadedBy: 'Teacher Neha Kapoor',
      uploadedDate: '2025-10-20',
      description: 'Learn basic conversational Indian Sign Language. Includes greetings, introductions, and common phrases.',
      difficulty: 'Beginner'
    },
    {
      id: 4,
      title: 'Data Entry Skills for Employment',
      organization: 'Enable India',
      type: 'video',
      duration: '40 mins',
      views: 567,
      progress: 45,
      thumbnail: 'https://via.placeholder.com/300x180/21808d/ffffff?text=Data+Entry',
      uploadedBy: 'Teacher Rajiv Menon',
      uploadedDate: '2025-09-25',
      description: 'Professional data entry training covering typing speed, accuracy, MS Word, MS Excel, and industry standards.',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: 'Resume Building for PWD Job Seekers',
      organization: 'JobsForAll',
      type: 'document',
      pages: 12,
      downloads: 340,
      progress: 100,
      thumbnail: 'https://via.placeholder.com/300x180/21808d/ffffff?text=Resume+Guide',
      uploadedBy: 'Teacher Kavita Singh',
      uploadedDate: '2025-10-05',
      description: 'Step-by-step guide to creating professional resumes. Includes templates, examples, and tips for PWD candidates.',
      difficulty: 'Beginner'
    }
  ];
};

// Mock Organizations Data
export const getOrganizations = async (location = '') => {
  await delay(700);
  
  return [
    {
      id: 1,
      name: 'Saksham Skill Development Center',
      distance: '2.5 km',
      address: 'Andheri East, Mumbai, Maharashtra 400069',
      courses: ['Computer Literacy', 'Braille Training', 'Employability Skills', 'Data Entry'],
      facilities: ['Screen Readers', 'Accessible Classrooms', 'Braille Lab', 'Assistive Technology'],
      rating: 4.5,
      studentsEnrolled: 145,
      successRate: '78%',
      established: '2018',
      contact: '+91 98765 12345',
      verificationStatus: 'Verified',
      disabilitySupport: ['Visual Impairment', 'Hearing Impairment', 'Locomotor Disability']
    },
    {
      id: 2,
      name: 'Enable India Training Institute',
      distance: '5.0 km',
      address: 'Powai, Mumbai, Maharashtra 400076',
      courses: ['Digital Marketing', 'Web Development', 'Customer Service', 'Accounting'],
      facilities: ['Sign Language Interpreters', 'Wheelchair Ramps', 'Accessible Washrooms', 'Lift'],
      rating: 4.8,
      studentsEnrolled: 230,
      successRate: '85%',
      established: '2015',
      contact: '+91 98765 67890',
      verificationStatus: 'Verified',
      disabilitySupport: ['All Disabilities']
    },
    {
      id: 3,
      name: 'National Association for the Blind - Mumbai',
      distance: '7.2 km',
      address: 'Worli, Mumbai, Maharashtra 400018',
      courses: ['Braille Reading & Writing', 'Mobility Training', 'Computer Training', 'Music'],
      facilities: ['Braille Library', 'Tactile Maps', 'Audio Books', 'Mobility Training Ground'],
      rating: 4.7,
      studentsEnrolled: 189,
      successRate: '82%',
      established: '1952',
      contact: '+91 98765 11111',
      verificationStatus: 'Verified',
      disabilitySupport: ['Visual Impairment']
    },
    {
      id: 4,
      name: 'Deaf Way Vocational Center',
      distance: '3.8 km',
      address: 'Bandra West, Mumbai, Maharashtra 400050',
      courses: ['Tailoring', 'Baking & Confectionery', 'Graphic Design', 'Mobile Repairing'],
      facilities: ['Sign Language Classes', 'Video-based Learning', 'Vibration Alert Systems'],
      rating: 4.3,
      studentsEnrolled: 98,
      successRate: '71%',
      established: '2019',
      contact: '+91 98765 22222',
      verificationStatus: 'Verified',
      disabilitySupport: ['Hearing Impairment']
    }
  ];
};

// Mock Portfolio Data
export const getPortfolioData = async (userId) => {
  await delay(500);
  
  return {
    user: {
      name: 'Rajesh Kumar',
      udid: 'MH-04-WB-12345678',
      disability: 'Visual Impairment (40%)',
      location: 'Mumbai, Maharashtra',
      email: 'rajesh.kumar@example.com',
      phone: '+91 98765 43210',
      availability: 'Available for Employment',
      profilePhoto: 'https://via.placeholder.com/150/21808d/ffffff?text=RK'
    },
    skills: [
      {
        id: 1,
        name: 'Microsoft Excel',
        proficiency: 85,
        level: 'Advanced',
        verified: true,
        verificationMethod: 'Live Assessment',
        certificateId: 'CERT-001',
        achievedDate: '2025-04-15'
      },
      {
        id: 2,
        name: 'Data Entry',
        proficiency: 90,
        level: 'Expert',
        verified: true,
        verificationMethod: 'Timed Test',
        certificateId: 'CERT-002',
        achievedDate: '2025-03-20'
      },
      {
        id: 3,
        name: 'Screen Reader (NVDA)',
        proficiency: 95,
        level: 'Expert',
        verified: true,
        verificationMethod: 'Practical Demo',
        certificateId: 'CERT-003',
        achievedDate: '2025-02-10'
      },
      {
        id: 4,
        name: 'Braille Reading',
        proficiency: 75,
        level: 'Intermediate',
        verified: true,
        verificationMethod: 'Assessment',
        certificateId: 'CERT-004',
        achievedDate: '2025-01-25'
      }
    ],
    certificates: [
      {
        id: 'CERT-001',
        name: 'Digital Literacy Certificate',
        issuedBy: 'Saksham Skill Development Center',
        issuedDate: '2025-02-28',
        verified: true,
        blockchainHash: '0x7f8a9b...'
      },
      {
        id: 'CERT-002',
        name: 'Microsoft Excel - Advanced',
        issuedBy: 'Enable India',
        issuedDate: '2025-04-15',
        verified: true,
        blockchainHash: '0x3c5d6e...'
      },
      {
        id: 'CERT-003',
        name: 'Assistive Technology Proficiency',
        issuedBy: 'National Association for the Blind',
        issuedDate: '2025-03-10',
        verified: true,
        blockchainHash: '0x1a2b3c...'
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Excel Budget Tracker for NGO',
        description: 'Created comprehensive budget tracking system using Excel with macros and formulas',
        duration: '1 month',
        skills: ['Excel', 'Data Analysis'],
        completedDate: '2025-04-10'
      }
    ],
    testimonials: [
      {
        id: 1,
        from: 'Priya Sharma',
        role: 'Computer Instructor',
        organization: 'Saksham Skill Development Center',
        rating: 5,
        text: 'Rajesh is an exceptional learner. His proficiency with screen readers and Excel is remarkable. Highly recommend for data entry roles.',
        date: '2025-04-20'
      }
    ],
    stats: {
      portfolioCompleteness: 85,
      profileViews: 47,
      certificatesEarned: 3,
      skillsAcquired: 4
    }
  };
};

// Mock Applications
export const getMyApplications = async () => {
  await delay(600);
  
  return [
    {
      id: 1,
      organizationName: 'Saksham Skill Development Center',
      courseName: 'Data Entry Professional Course',
      appliedDate: '2025-10-20',
      status: 'Approved',
      joiningDate: '2025-11-05',
      message: 'Your application has been approved. Please visit the center on 5th November for orientation.'
    },
    {
      id: 2,
      organizationName: 'Enable India Training Institute',
      courseName: 'Web Development Basics',
      appliedDate: '2025-10-25',
      status: 'Pending',
      message: 'Your application is under review. You will hear back within 5 working days.'
    }
  ];
};

// Submit Application
export const submitApplication = async (applicationData) => {
  await delay(1000);
  
  return {
    success: true,
    applicationId: 'APP-' + Date.now(),
    message: 'Application submitted successfully! You will be notified within 3-5 working days.'
  };
};

export default {
  verifyUDID,
  getSchemes,
  getResources,
  getOrganizations,
  getPortfolioData,
  getMyApplications,
  submitApplication
};
