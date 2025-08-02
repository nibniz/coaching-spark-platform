import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { SearchBar } from '@/shared/components/ui/SearchBar';
import { 
  WellnessInstructors, 
  YogaPrograms, 
  WellnessEvents,
  defaultWellnessInstructors,
  defaultYogaPrograms,
  defaultWellnessEvents
} from '@/shared/components/ui/WellnessFeatures';
import { Header } from '@/shared/components/layout/Header';
import { 
  Filter, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Heart,
  Activity,
  Leaf
} from 'lucide-react';

const WellnessPage = () => {
  const [activeTab, setActiveTab] = useState('instructors');
  const [searchQuery, setSearchQuery] = useState('');

  const wellnessSearchSuggestions = [
    { id: '1', text: 'Yoga Classes', type: 'skill' as const, count: 1200 },
    { id: '2', text: 'Nutrition Coaching', type: 'skill' as const, count: 900 },
    { id: '3', text: 'Mindfulness', type: 'skill' as const, count: 1100 },
    { id: '4', text: 'Fitness Training', type: 'skill' as const, count: 800 },
    { id: '5', text: 'Sarah Chen', type: 'mentor' as const, count: 127 },
    { id: '6', text: 'Michael Rodriguez', type: 'mentor' as const, count: 89 }
  ];

  const popularWellnessSearches = [
    'Yoga Classes',
    'Health Coaching',
    'Mindfulness',
    'Nutrition',
    'Fitness Training',
    'Wellness Events'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter the results
  };

  const stats = [
    { label: 'Health Instructors', value: '1800+', icon: Heart },
    { label: 'Yoga Programs', value: '500+', icon: Activity },
    { label: 'Wellness Events', value: '200+', icon: Calendar },
    { label: 'Happy Clients', value: '50k+', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showNavigation={true} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit mx-auto">
                🧘 Health & Wellness
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                Transform Your Life Through{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Wellness
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with expert health instructors, join transformative yoga programs, 
                and participate in life-changing wellness events.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              placeholder="Search for yoga, nutrition, fitness, or wellness instructors..."
              suggestions={wellnessSearchSuggestions}
              popularSearches={popularWellnessSearches}
              onSearch={handleSearch}
              className="mb-8"
            />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="instructors" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Instructors</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Programs</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="instructors" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Health & Wellness Instructors</h2>
                  <p className="text-muted-foreground mt-2">
                    Connect with certified experts in yoga, nutrition, fitness, and holistic wellness.
                  </p>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <WellnessInstructors instructors={defaultWellnessInstructors} />
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Yoga & Wellness Programs</h2>
                  <p className="text-muted-foreground mt-2">
                    Join structured programs designed to transform your mind, body, and spirit.
                  </p>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <YogaPrograms programs={defaultYogaPrograms} />
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Wellness Events & Workshops</h2>
                  <p className="text-muted-foreground mt-2">
                    Participate in transformative events, workshops, and retreats.
                  </p>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <WellnessEvents events={defaultWellnessEvents} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands who are already transforming their lives through expert wellness guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Find Wellness Instructor
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-600">
                Join Wellness Program
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessPage; 