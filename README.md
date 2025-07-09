# Coaching Spark Platform

A comprehensive mentoring and coaching platform that connects learners with expert mentors.

## Project Structure

```
coaching-spark-platform/
├── frontend/              # Frontend React application
│   ├── src/              # Source code
│   │   ├── app/          # App configuration & routing
│   │   ├── features/     # Feature-based modules
│   │   ├── shared/       # Shared components & utilities
│   │   └── assets/       # Static assets
│   ├── public/           # Public assets
│   └── package.json      # Frontend dependencies
├── README.md             # This file
└── .gitignore           # Git ignore rules
```

## Features

### For Learners
- **Mentor Discovery**: Browse and search for expert mentors
- **Session Booking**: Schedule 1:1 mentoring sessions
- **Progress Tracking**: Monitor your learning goals
- **Session History**: Review past sessions and feedback

### For Mentors
- **Profile Management**: Create and manage your mentor profile
- **Session Management**: Handle bookings and schedules
- **Earnings Dashboard**: Track your income and analytics
- **Review System**: Receive and manage student feedback

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Shadcn/ui** + Radix UI for components
- **Tailwind CSS** for styling
- **React Hook Form** for forms
- **Zod** for validation

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Frontend Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Organization

The frontend follows a feature-based architecture:

- **`app/`** - App-level configuration, providers, and routing
- **`features/`** - Feature modules (auth, mentors, sessions, dashboard, onboarding)
- **`shared/`** - Reusable components, utilities, types, and constants

This organization makes the codebase more maintainable and scalable.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
