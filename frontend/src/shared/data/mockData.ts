export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  role: 'mentor' | 'instructor' | 'coach';
  category: string;
  subcategories: string[];
  specialty: string;
  rating: number;
  experience: string;
  languages: string[];
  price: number;
  isOnline: boolean;
  isCertified: boolean;
  location: string;
  bio: string;
  skills: string[];
  education: string[];
  certifications: string[];
  availability: string[];
  totalSessions: number;
  totalStudents: number;
  responseTime: string;
  verified: boolean;
}

export interface Program {
  id: string;
  title: string;
  instructor: Mentor;
  category: string;
  subcategory: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  type: string;
  description: string;
  price: number;
  rating: number;
  participants: number;
  maxParticipants: number;
  isLive: boolean;
  isRecorded: boolean;
  thumbnail: string;
  tags: string[];
  startDate?: string;
  endDate?: string;
  schedule: string[];
  materials: string[];
  requirements: string[];
}

export interface Event {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  date: string;
  time: string;
  location: string;
  type: 'Workshop' | 'Retreat' | 'Class' | 'Seminar' | 'Challenge' | 'Webinar';
  instructor: Mentor;
  price: number;
  capacity: number;
  registered: number;
  description: string;
  tags: string[];
  isOnline: boolean;
  isInPerson: boolean;
  isHybrid: boolean;
  requirements: string[];
  agenda: string[];
  materials: string[];
  cancellationPolicy: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  mentorCount: number;
  programCount: number;
  eventCount: number;
  subcategories: string[];
  popularSkills: string[];
}

// Categories Data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Career Development',
    slug: 'career-development',
    icon: '💼',
    description: 'Advance your career with expert guidance',
    color: '#3B82F6',
    mentorCount: 2500,
    programCount: 180,
    eventCount: 45,
    subcategories: ['Leadership', 'Management', 'Career Transition', 'Interview Prep', 'Skill Development'],
    popularSkills: ['Leadership', 'Project Management', 'Communication', 'Strategic Planning', 'Team Building']
  },
  {
    id: '2',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    icon: '🧘',
    description: 'Yoga, fitness, nutrition, and holistic health',
    color: '#10B981',
    mentorCount: 1800,
    programCount: 220,
    eventCount: 60,
    subcategories: ['Yoga', 'Fitness', 'Nutrition', 'Mindfulness', 'Holistic Health'],
    popularSkills: ['Yoga', 'Nutrition', 'Fitness Training', 'Meditation', 'Wellness Coaching']
  },
  {
    id: '3',
    name: 'Leadership',
    slug: 'leadership',
    icon: '👑',
    description: 'Develop leadership skills and executive presence',
    color: '#8B5CF6',
    mentorCount: 1600,
    programCount: 150,
    eventCount: 35,
    subcategories: ['Executive Leadership', 'Team Leadership', 'Strategic Leadership', 'Change Management'],
    popularSkills: ['Strategic Thinking', 'Decision Making', 'Influence', 'Conflict Resolution', 'Vision Setting']
  },
  {
    id: '4',
    name: 'Technical Skills',
    slug: 'technical-skills',
    icon: '💻',
    description: 'Master programming, design, and technical skills',
    color: '#06B6D4',
    mentorCount: 3200,
    programCount: 300,
    eventCount: 80,
    subcategories: ['Programming', 'Design', 'Data Science', 'DevOps', 'Cybersecurity'],
    popularSkills: ['JavaScript', 'Python', 'React', 'UI/UX Design', 'Machine Learning']
  },
  {
    id: '5',
    name: 'Events & Workshops',
    slug: 'events-workshops',
    icon: '🎪',
    description: 'Live events, workshops, and group sessions',
    color: '#F59E0B',
    mentorCount: 900,
    programCount: 120,
    eventCount: 200,
    subcategories: ['Workshops', 'Retreats', 'Conferences', 'Meetups', 'Challenges'],
    popularSkills: ['Event Planning', 'Public Speaking', 'Workshop Facilitation', 'Networking']
  },
  {
    id: '6',
    name: 'Personal Growth',
    slug: 'personal-growth',
    icon: '🌱',
    description: 'Transform your mindset and habits',
    color: '#EF4444',
    mentorCount: 2100,
    programCount: 160,
    eventCount: 50,
    subcategories: ['Mindset', 'Habits', 'Productivity', 'Self-Discovery', 'Life Purpose'],
    popularSkills: ['Goal Setting', 'Time Management', 'Mindfulness', 'Personal Development', 'Habit Formation']
  }
];

// Mock Mentors Data
export const mentors: Mentor[] = [
  // Career Development Mentors
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'mentor',
    category: 'career-development',
    subcategories: ['Leadership', 'Career Transition'],
    specialty: 'Executive Career Coaching',
    rating: 4.9,
    experience: '15+ years',
    languages: ['English', 'Spanish'],
    price: 200,
    isOnline: true,
    isCertified: true,
    location: 'New York, NY',
    bio: 'Former Fortune 500 executive helping professionals transition to leadership roles.',
    skills: ['Leadership Development', 'Career Strategy', 'Executive Coaching', 'Interview Preparation'],
    education: ['MBA - Harvard Business School', 'BA - Stanford University'],
    certifications: ['ICF Certified Coach', 'Gallup Strengths Coach'],
    availability: ['Mon-Fri 9AM-6PM EST', 'Sat 10AM-2PM EST'],
    totalSessions: 1250,
    totalStudents: 450,
    responseTime: '2 hours',
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'MC',
    role: 'mentor',
    category: 'career-development',
    subcategories: ['Management', 'Skill Development'],
    specialty: 'Product Management & Strategy',
    rating: 4.8,
    experience: '12+ years',
    languages: ['English', 'Mandarin'],
    price: 180,
    isOnline: true,
    isCertified: true,
    location: 'San Francisco, CA',
    bio: 'Senior Product Manager at Google with expertise in scaling products and teams.',
    skills: ['Product Strategy', 'Team Management', 'Data Analysis', 'User Research'],
    education: ['MS - Stanford University', 'BS - UC Berkeley'],
    certifications: ['Certified Scrum Master', 'Google Product Management'],
    availability: ['Mon-Fri 6PM-9PM PST', 'Weekends'],
    totalSessions: 890,
    totalStudents: 320,
    responseTime: '4 hours',
    verified: true
  },

  // Health & Wellness Mentors
  {
    id: '3',
    name: 'Sarah Chen',
    avatar: 'SC',
    role: 'instructor',
    category: 'health-wellness',
    subcategories: ['Yoga', 'Mindfulness'],
    specialty: 'Yoga & Mindfulness',
    rating: 4.9,
    experience: '8+ years',
    languages: ['English', 'Mandarin'],
    price: 120,
    isOnline: true,
    isCertified: true,
    location: 'Los Angeles, CA',
    bio: 'Certified yoga instructor specializing in mindfulness and stress relief.',
    skills: ['Vinyasa Yoga', 'Meditation', 'Stress Management', 'Breathwork'],
    education: ['RYT-500 Yoga Certification', 'Mindfulness Teacher Training'],
    certifications: ['RYT-500', 'Mindfulness-Based Stress Reduction'],
    availability: ['Mon-Sun 6AM-8PM PST'],
    totalSessions: 2100,
    totalStudents: 850,
    responseTime: '1 hour',
    verified: true
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    avatar: 'MR',
    role: 'instructor',
    category: 'health-wellness',
    subcategories: ['Fitness', 'Nutrition'],
    specialty: 'Fitness & Nutrition',
    rating: 4.8,
    experience: '12+ years',
    languages: ['English', 'Spanish'],
    price: 150,
    isOnline: true,
    isCertified: true,
    location: 'Miami, FL',
    bio: 'Personal trainer and nutritionist helping clients achieve their health goals.',
    skills: ['Strength Training', 'Nutrition Planning', 'Weight Loss', 'Sports Nutrition'],
    education: ['BS - Exercise Science', 'MS - Nutrition'],
    certifications: ['NASM Certified Personal Trainer', 'Precision Nutrition Coach'],
    availability: ['Mon-Fri 6AM-8PM EST', 'Sat 8AM-4PM EST'],
    totalSessions: 1800,
    totalStudents: 620,
    responseTime: '3 hours',
    verified: true
  },

  // Leadership Mentors
  {
    id: '5',
    name: 'Emma Thompson',
    avatar: 'ET',
    role: 'coach',
    category: 'leadership',
    subcategories: ['Executive Leadership', 'Strategic Leadership'],
    specialty: 'Executive Leadership Coaching',
    rating: 4.9,
    experience: '20+ years',
    languages: ['English'],
    price: 300,
    isOnline: true,
    isCertified: true,
    location: 'Chicago, IL',
    bio: 'Former CEO helping executives develop strategic leadership skills.',
    skills: ['Strategic Planning', 'Executive Coaching', 'Change Management', 'Board Relations'],
    education: ['MBA - Northwestern Kellogg', 'BA - University of Chicago'],
    certifications: ['ICF Master Certified Coach', 'Marshall Goldsmith Coach'],
    availability: ['Mon-Fri 8AM-6PM CST'],
    totalSessions: 950,
    totalStudents: 280,
    responseTime: '24 hours',
    verified: true
  },

  // Technical Skills Mentors
  {
    id: '6',
    name: 'David Kim',
    avatar: 'DK',
    role: 'mentor',
    category: 'technical-skills',
    subcategories: ['Programming', 'Data Science'],
    specialty: 'Full-Stack Development & AI',
    rating: 4.7,
    experience: '10+ years',
    languages: ['English', 'Korean'],
    price: 160,
    isOnline: true,
    isCertified: true,
    location: 'Seattle, WA',
    bio: 'Senior Software Engineer at Microsoft with expertise in AI and cloud technologies.',
    skills: ['JavaScript', 'Python', 'React', 'Machine Learning', 'AWS'],
    education: ['MS - Computer Science', 'BS - Engineering'],
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
    availability: ['Mon-Fri 7PM-10PM PST', 'Weekends'],
    totalSessions: 1100,
    totalStudents: 380,
    responseTime: '6 hours',
    verified: true
  }
];

// Mock Programs Data
export const programs: Program[] = [
  // Career Development Programs
  {
    id: '1',
    title: 'Executive Leadership Accelerator',
    instructor: mentors[4], // Emma Thompson
    category: 'career-development',
    subcategory: 'Leadership',
    level: 'Advanced',
    duration: '12 weeks',
    type: 'Coaching Program',
    description: 'Intensive program for senior leaders to develop executive presence and strategic thinking.',
    price: 2500,
    rating: 4.9,
    participants: 25,
    maxParticipants: 30,
    isLive: true,
    isRecorded: true,
    thumbnail: '/programs/executive-leadership.jpg',
    tags: ['Leadership', 'Executive', 'Strategy', 'Coaching'],
    startDate: '2025-02-01',
    endDate: '2025-04-25',
    schedule: ['Weekly 1:1 sessions', 'Bi-weekly group workshops', 'Monthly assessments'],
    materials: ['Leadership assessment', 'Strategic planning templates', 'Executive communication guide'],
    requirements: ['5+ years management experience', 'Current leadership role', 'Commitment to 12-week program']
  },

  // Health & Wellness Programs
  {
    id: '2',
    title: '30-Day Yoga Transformation',
    instructor: mentors[2], // Sarah Chen
    category: 'health-wellness',
    subcategory: 'Yoga',
    level: 'Beginner',
    duration: '30 days',
    type: 'Yoga Program',
    description: 'Transform your life with daily yoga practice and mindfulness techniques.',
    price: 99,
    rating: 4.8,
    participants: 150,
    maxParticipants: 200,
    isLive: true,
    isRecorded: true,
    thumbnail: '/programs/yoga-transformation.jpg',
    tags: ['Yoga', 'Mindfulness', 'Transformation', 'Daily Practice'],
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    schedule: ['Daily 30-minute sessions', 'Weekly Q&A sessions', 'Monthly progress check-ins'],
    materials: ['Yoga mat guide', 'Meditation audio', 'Progress tracker'],
    requirements: ['No experience required', 'Yoga mat', 'Quiet space for practice']
  },

  // Technical Skills Programs
  {
    id: '3',
    title: 'Full-Stack Web Development Bootcamp',
    instructor: mentors[5], // David Kim
    category: 'technical-skills',
    subcategory: 'Programming',
    level: 'Beginner',
    duration: '16 weeks',
    type: 'Coding Bootcamp',
    description: 'Learn modern web development from HTML/CSS to React and Node.js.',
    price: 1200,
    rating: 4.7,
    participants: 45,
    maxParticipants: 50,
    isLive: true,
    isRecorded: true,
    thumbnail: '/programs/web-development.jpg',
    tags: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    startDate: '2025-01-20',
    endDate: '2025-05-10',
    schedule: ['3 sessions per week', 'Weekend workshops', 'Project reviews'],
    materials: ['Code editor setup', 'Project templates', 'Reference materials'],
    requirements: ['Basic computer skills', 'Commitment to 20+ hours/week', 'Laptop with 8GB RAM']
  }
];

// Mock Events Data
export const events: Event[] = [
  // Career Development Events
  {
    id: '1',
    title: 'Career Transition Workshop',
    category: 'career-development',
    subcategory: 'Career Transition',
    date: '2025-01-25',
    time: '2:00 PM - 5:00 PM',
    location: 'Online',
    type: 'Workshop',
    instructor: mentors[0], // Sarah Johnson
    price: 75,
    capacity: 50,
    registered: 35,
    description: 'Learn strategies for successful career transitions and job search techniques.',
    tags: ['Career Change', 'Job Search', 'Networking', 'Resume Building'],
    isOnline: true,
    isInPerson: false,
    isHybrid: false,
    requirements: ['Current resume', 'Career goals outline'],
    agenda: ['Career assessment', 'Resume optimization', 'Networking strategies', 'Interview preparation'],
    materials: ['Resume template', 'Networking guide', 'Interview questions'],
    cancellationPolicy: 'Full refund up to 48 hours before event'
  },

  // Health & Wellness Events
  {
    id: '2',
    title: 'Mindfulness Retreat Weekend',
    category: 'health-wellness',
    subcategory: 'Mindfulness',
    date: '2025-02-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Mountain View Resort, CA',
    type: 'Retreat',
    instructor: mentors[2], // Sarah Chen
    price: 299,
    capacity: 20,
    registered: 18,
    description: 'A transformative weekend of mindfulness, yoga, and nature connection.',
    tags: ['Mindfulness', 'Yoga', 'Nature', 'Retreat'],
    isOnline: false,
    isInPerson: true,
    isHybrid: false,
    requirements: ['Yoga mat', 'Comfortable clothing', 'Open mind'],
    agenda: ['Morning meditation', 'Yoga sessions', 'Nature walks', 'Group discussions'],
    materials: ['Meditation guide', 'Yoga sequences', 'Journal'],
    cancellationPolicy: '50% refund up to 2 weeks before event'
  },

  // Technical Skills Events
  {
    id: '3',
    title: 'AI & Machine Learning Conference',
    category: 'technical-skills',
    subcategory: 'Data Science',
    date: '2025-03-10',
    time: '9:00 AM - 5:00 PM',
    location: 'San Francisco Convention Center',
    type: 'Conference',
    instructor: mentors[5], // David Kim
    price: 150,
    capacity: 200,
    registered: 165,
    description: 'Explore the latest trends in AI and machine learning with industry experts.',
    tags: ['AI', 'Machine Learning', 'Data Science', 'Technology'],
    isOnline: false,
    isInPerson: true,
    isHybrid: true,
    requirements: ['Basic programming knowledge', 'Laptop for workshops'],
    agenda: ['Keynote speeches', 'Technical workshops', 'Networking sessions', 'Panel discussions'],
    materials: ['Conference materials', 'Workshop code', 'Networking guide'],
    cancellationPolicy: 'Full refund up to 1 week before event'
  }
];

// Search and Filter Functions
export const searchMentors = (query: string, category?: string, role?: string): Mentor[] => {
  let results = mentors;

  // Filter by category
  if (category) {
    results = results.filter(mentor => mentor.category === category);
  }

  // Filter by role
  if (role) {
    results = results.filter(mentor => mentor.role === role);
  }

  // Search by query
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(mentor => 
      mentor.name.toLowerCase().includes(searchTerm) ||
      mentor.specialty.toLowerCase().includes(searchTerm) ||
      mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      mentor.subcategories.some(sub => sub.toLowerCase().includes(searchTerm))
    );
  }

  return results;
};

export const searchPrograms = (query: string, category?: string, level?: string): Program[] => {
  let results = programs;

  // Filter by category
  if (category) {
    results = results.filter(program => program.category === category);
  }

  // Filter by level
  if (level) {
    results = results.filter(program => program.level === level);
  }

  // Search by query
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(program => 
      program.title.toLowerCase().includes(searchTerm) ||
      program.description.toLowerCase().includes(searchTerm) ||
      program.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      program.instructor.name.toLowerCase().includes(searchTerm)
    );
  }

  return results;
};

export const searchEvents = (query: string, category?: string, type?: string): Event[] => {
  let results = events;

  // Filter by category
  if (category) {
    results = results.filter(event => event.category === category);
  }

  // Filter by type
  if (type) {
    results = results.filter(event => event.type === type);
  }

  // Search by query
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      event.instructor.name.toLowerCase().includes(searchTerm)
    );
  }

  return results;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getPopularSkills = (category?: string): string[] => {
  if (category) {
    const cat = categories.find(c => c.slug === category);
    return cat?.popularSkills || [];
  }
  return categories.flatMap(c => c.popularSkills).slice(0, 10);
}; 