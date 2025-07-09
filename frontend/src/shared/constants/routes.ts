export const ROUTES = {
  HOME: '/',
  MENTORS: '/mentors',
  MENTOR_PROFILE: '/mentor/:id',
  BOOK_SESSION: '/book/:id',
  SIGNUP_MENTOR: '/signup/mentor',
  SIGNUP_USER: '/signup/user',
  LOGIN: '/login',
  MENTOR_DASHBOARD: '/mentor-dashboard',
  USER_DASHBOARD: '/user-dashboard',
} as const;

export const createMentorProfileRoute = (id: string) => `/mentor/${id}`;
export const createBookSessionRoute = (id: string) => `/book/${id}`; 