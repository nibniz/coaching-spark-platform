# Frontend Reorganization - MentorMatch Platform

## Overview
The frontend has been reorganized into a feature-based architecture for better maintainability, scalability, and developer experience.

## New Folder Structure

```
src/
├── app/                    # Main app configuration
│   ├── providers/         # Context providers (Auth, Query, etc.)
│   ├── routes/           # Route definitions
│   └── layout/           # App layout components (Home, NotFound)
├── features/             # Feature-based modules
│   ├── auth/            # Authentication feature
│   │   ├── contexts/    # Auth context
│   │   └── Login.tsx    # Login page
│   ├── mentors/         # Mentor discovery & profiles
│   │   ├── Mentors.tsx  # Mentor listing page
│   │   └── MentorProfile.tsx # Individual mentor profile
│   ├── sessions/        # Session booking & management
│   │   └── BookSession.tsx # Session booking page
│   ├── dashboard/       # User & mentor dashboards
│   │   ├── UserDashboard.tsx # User dashboard
│   │   └── MentorDashboard.tsx # Mentor dashboard
│   └── onboarding/      # Registration flows
│       ├── SignupUser.tsx # User registration
│       └── SignupMentor.tsx # Mentor registration
├── shared/              # Shared components & utilities
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Shadcn/ui components
│   │   └── layout/     # Layout components (Header, etc.)
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── constants/      # App constants (routes, categories, etc.)
├── styles/             # Global styles & themes
└── assets/            # Static assets
```

## Key Changes

### 1. Feature-Based Organization
- **auth/**: Authentication-related functionality
- **mentors/**: Mentor discovery and profile management
- **sessions/**: Session booking and management
- **dashboard/**: User and mentor dashboards
- **onboarding/**: Registration flows

### 2. Shared Resources
- **components/**: Reusable UI components
- **types/**: TypeScript interfaces and types
- **constants/**: Application constants and configuration
- **hooks/**: Custom React hooks
- **utils/**: Utility functions and helpers

### 3. App Configuration
- **providers/**: Context providers and app-level state
- **routes/**: Centralized route definitions
- **layout/**: App-level layout components

## Benefits

1. **Better Organization**: Related functionality is grouped together
2. **Easier Navigation**: Developers can quickly find relevant code
3. **Scalability**: New features can be added without cluttering existing code
4. **Reusability**: Shared components and utilities are clearly separated
5. **Maintainability**: Changes to specific features are isolated

## Migration Status

### ✅ Completed
- [x] Created new folder structure
- [x] Moved existing files to new locations
- [x] Created shared types and constants
- [x] Created reusable layout components
- [x] Updated App.tsx to use new structure

### 🔄 In Progress
- [ ] Update import paths in all files
- [ ] Fix TypeScript/linter errors
- [ ] Test all functionality
- [ ] Update documentation

### 📋 Next Steps
1. Update all import statements to use new paths
2. Fix any broken imports or references
3. Test the application to ensure everything works
4. Update any documentation or README files
5. Consider adding feature-specific README files

## Import Paths

### Old Paths (to be updated)
```typescript
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
```

### New Paths
```typescript
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { cn } from "@/shared/utils/utils";
```

## Notes
- The reorganization maintains all existing functionality
- All routes and features remain the same
- The new structure is more scalable for future development
- Shared components can now be easily reused across features 