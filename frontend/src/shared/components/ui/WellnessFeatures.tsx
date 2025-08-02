import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Heart, 
  Activity, 
  Leaf,
  Play,
  BookOpen,
  Video,
  Music
} from 'lucide-react';

interface WellnessInstructor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  experience: string;
  languages: string[];
  price: number;
  isOnline: boolean;
  isCertified: boolean;
  skills: string[];
}

interface YogaProgram {
  id: string;
  title: string;
  instructor: any; // Using any to match the new data structure
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  type: string;
  description: string;
  price: number;
  rating: number;
  participants: number;
  isLive: boolean;
  thumbnail: string;
}

interface WellnessEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  instructor: any; // Using any to match the new data structure
  price: number;
  capacity: number;
  registered: number;
  description: string;
  tags: string[];
  isOnline: boolean;
}

interface WellnessFeaturesProps {
  instructors?: WellnessInstructor[];
  programs?: YogaProgram[];
  events?: WellnessEvent[];
  className?: string;
}

export const WellnessInstructors: React.FC<{ instructors: WellnessInstructor[] }> = ({ instructors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instructors.map((instructor) => (
        <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">{instructor.avatar}</span>
                </div>
                <div>
                  <CardTitle className="text-lg">{instructor.name}</CardTitle>
                  <CardDescription>{instructor.specialty}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{instructor.rating}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{instructor.experience}</span>
              <Badge variant={instructor.isOnline ? "default" : "secondary"}>
                {instructor.isOnline ? "Online" : "In-Person"}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {instructor.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">${instructor.price}/hr</span>
              <Button size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Book Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const YogaPrograms: React.FC<{ programs: YogaProgram[] }> = ({ programs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center">
            <Play className="w-12 h-12 text-primary" />
          </div>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{program.title}</CardTitle>
                <CardDescription>{program.instructor.name}</CardDescription>
              </div>
              <Badge variant="outline">{program.level}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{program.participants}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{program.type}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{program.rating}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {program.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">${program.price}</span>
              <Button size="sm" variant={program.isLive ? "default" : "outline"}>
                {program.isLive ? "Join Live" : "Start Program"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const WellnessEvents: React.FC<{ events: WellnessEvent[] }> = ({ events }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.instructor.name}</CardDescription>
              </div>
              <Badge variant="outline">{event.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{event.isOnline ? "Online Event" : event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{event.registered}/{event.capacity} registered</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {event.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">${event.price}</span>
              <Button size="sm" disabled={event.registered >= event.capacity}>
                {event.registered >= event.capacity ? "Full" : "Register"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Default data for wellness features
export const defaultWellnessInstructors: WellnessInstructor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    specialty: 'Yoga & Mindfulness',
    rating: 4.9,
    experience: '8+ years',
    languages: ['English', 'Mandarin'],
    price: 120,
    isOnline: true,
    isCertified: true,
    specialties: ['Vinyasa', 'Meditation', 'Stress Relief']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: 'MR',
    specialty: 'Fitness & Nutrition',
    rating: 4.8,
    experience: '12+ years',
    languages: ['English', 'Spanish'],
    price: 150,
    isOnline: true,
    isCertified: true,
    specialties: ['Strength Training', 'Nutrition', 'Weight Loss']
  },
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'ET',
    specialty: 'Holistic Wellness',
    rating: 4.9,
    experience: '10+ years',
    languages: ['English'],
    price: 140,
    isOnline: true,
    isCertified: true,
    specialties: ['Ayurveda', 'Energy Healing', 'Life Coaching']
  }
];

export const defaultYogaPrograms: YogaProgram[] = [
  {
    id: '1',
    title: 'Morning Flow Yoga',
    instructor: 'Sarah Chen',
    level: 'Beginner',
    duration: '45 min',
    type: 'Vinyasa',
    description: 'Start your day with energy and intention through this dynamic morning flow.',
    price: 25,
    rating: 4.8,
    participants: 45,
    isLive: true,
    thumbnail: '/yoga-morning.jpg'
  },
  {
    id: '2',
    title: 'Restorative Evening',
    instructor: 'Emma Thompson',
    level: 'All Levels',
    duration: '60 min',
    type: 'Restorative',
    description: 'Unwind and restore with gentle poses and deep relaxation techniques.',
    price: 20,
    rating: 4.9,
    participants: 32,
    isLive: false,
    thumbnail: '/yoga-evening.jpg'
  },
  {
    id: '3',
    title: 'Power Yoga Challenge',
    instructor: 'Michael Rodriguez',
    level: 'Advanced',
    duration: '90 min',
    type: 'Power',
    description: 'Build strength and flexibility with this intensive power yoga session.',
    price: 35,
    rating: 4.7,
    participants: 28,
    isLive: true,
    thumbnail: '/yoga-power.jpg'
  }
];

export const defaultWellnessEvents: WellnessEvent[] = [
  {
    id: '1',
    title: 'Mindfulness Retreat Weekend',
    date: 'Jan 15-17, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'Mountain View Resort',
    type: 'Retreat',
    instructor: 'Sarah Chen',
    price: 299,
    capacity: 20,
    registered: 18,
    description: 'A transformative weekend of mindfulness, yoga, and nature connection.',
    tags: ['Mindfulness', 'Yoga', 'Nature', 'Retreat'],
    isOnline: false
  },
  {
    id: '2',
    title: 'Nutrition Workshop',
    date: 'Jan 20, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    type: 'Workshop',
    instructor: 'Michael Rodriguez',
    price: 49,
    capacity: 50,
    registered: 35,
    description: 'Learn the fundamentals of healthy eating and meal planning.',
    tags: ['Nutrition', 'Health', 'Workshop'],
    isOnline: true
  },
  {
    id: '3',
    title: '30-Day Wellness Challenge',
    date: 'Feb 1-28, 2025',
    time: 'Daily',
    location: 'Online',
    type: 'Challenge',
    instructor: 'Emma Thompson',
    price: 79,
    capacity: 100,
    registered: 67,
    description: 'Transform your life with daily wellness practices and community support.',
    tags: ['Challenge', 'Wellness', 'Community', 'Transformation'],
    isOnline: true
  }
]; 