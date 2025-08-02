import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/layout/Header";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect } from "react";
import { SearchBar } from "@/shared/components/ui/SearchBar";
import { ServiceCategories } from "@/shared/components/ui/ServiceCategories";
import { TrustIndicators, CompactTrustIndicators } from "@/shared/components/ui/TrustIndicators";
import { HeroCarousel, defaultCarouselSlides } from "@/shared/components/ui/HeroCarousel";
import { 
  WellnessInstructors, 
  YogaPrograms, 
  WellnessEvents
} from "@/shared/components/ui/WellnessFeatures";
import { categories, mentors, programs, events, getPopularSkills } from "@/shared/data/mockData";
import { 
  Search, 
  Users, 
  Calendar, 
  MessageSquare, 
  Star, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Target,
  Globe
} from "lucide-react";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Search suggestions and popular searches
  const searchSuggestions = [
    { id: '1', text: 'Career Development', type: 'category' as const, count: 2500 },
    { id: '2', text: 'Health & Wellness', type: 'category' as const, count: 1800 },
    { id: '3', text: 'Yoga Classes', type: 'skill' as const, count: 1200 },
    { id: '4', text: 'Leadership Skills', type: 'skill' as const, count: 1600 },
    { id: '5', text: 'Nutrition Coaching', type: 'skill' as const, count: 900 },
    { id: '6', text: 'Mindfulness', type: 'skill' as const, count: 1100 },
    { id: '7', text: 'Sarah Chen', type: 'mentor' as const, count: 127 },
    { id: '8', text: 'Michael Rodriguez', type: 'mentor' as const, count: 89 },
    { id: '9', text: 'Emma Thompson', type: 'mentor' as const, count: 156 }
  ];

  const popularSearches = getPopularSkills();

  // Handle search
  const handleSearch = (query: string) => {
    navigate(`/search?search=${encodeURIComponent(query)}`);
  };

  // Redirect logged-in users to their dashboard
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'mentor') {
        navigate('/mentor-dashboard', { replace: true });
      } else {
        navigate('/user-dashboard', { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Our smart algorithm matches you with the perfect mentor based on your goals, experience, and preferences."
    },
    {
      icon: Shield,
      title: "Verified Experts",
      description: "All mentors are thoroughly vetted with verified credentials, background checks, and authentic reviews."
    },
    {
      icon: Target,
      title: "Goal-Focused Sessions",
      description: "Every session is tailored to your specific goals with actionable plans and measurable progress tracking."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with mentors from top companies worldwide, available 24/7 across all time zones."
    }
  ];

  const mentorBenefits = [
    "Build your professional brand and credibility",
    "Generate consistent leads and income",
    "Access powerful analytics and insights",
    "Connect with motivated learners worldwide"
  ];

  const userBenefits = [
    "Find verified experts in any field",
    "Get personalized guidance for your goals",
    "Book flexible sessions that fit your schedule",
    "Track your progress and growth"
  ];

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't show home page if user is already logged in
  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Header 
        showAuthButtons={!user} 
        showUserMenu={!!user}
        showNavigation={true}
        logoLink={user ? (user.role === 'mentor' ? '/mentor-dashboard' : '/user-dashboard') : undefined}
      />

      {/* Hero Carousel Section */}
      <HeroCarousel 
        slides={defaultCarouselSlides}
        autoPlay={true}
        autoPlayInterval={6000}
        showNavigation={true}
        showIndicators={true}
      >
        {/* Search Bar Overlay */}
        <div className="mt-8">
          <SearchBar
            placeholder="What do you want to learn?"
            suggestions={searchSuggestions}
            popularSearches={popularSearches}
            onSearch={handleSearch}
            className="mb-6"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mentors">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 border-2 border-white">
                Browse All Mentors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup/mentor">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary">
                <Play className="mr-2 h-4 w-4" />
                Become a Mentor
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-8 pt-6 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-sm text-white/80">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-sm text-white/80">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-sm text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* Service Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Popular Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular mentoring categories and find the perfect expert for your goals.
            </p>
          </div>

          <ServiceCategories 
            categories={categories}
            className="mb-12"
          />

          <div className="text-center">
            <Link to="/mentors">
              <Button variant="outline" size="lg">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wellness Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Health & Wellness
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your life with expert health instructors, yoga programs, and wellness events.
            </p>
          </div>

          {/* Wellness Instructors */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Featured Health Instructors</h3>
              <Link to="/mentors?category=health-wellness">
                <Button variant="outline">
                  View All Instructors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <WellnessInstructors instructors={mentors.filter(m => m.category === 'health-wellness')} />
          </div>

          {/* Yoga Programs */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Yoga & Wellness Programs</h3>
              <Link to="/programs">
                <Button variant="outline">
                  Browse All Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <YogaPrograms programs={programs.filter(p => p.category === 'health-wellness')} />
          </div>

          {/* Wellness Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Upcoming Events & Workshops</h3>
              <Link to="/events">
                <Button variant="outline">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <WellnessEvents events={events.filter(e => e.category === 'health-wellness')} />
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <TrustIndicators />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Choose MentorMatch?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've built the most comprehensive platform to connect ambitious learners 
              with expert mentors who can guide their growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with mentoring in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Find Your Mentor</h3>
              <p className="text-muted-foreground">
                Search through our verified experts and find the perfect mentor for your goals.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Book a Session</h3>
              <p className="text-muted-foreground">
                Choose your preferred time slot and book a session with secure payment.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Start Learning</h3>
              <p className="text-muted-foreground">
                Connect with your mentor and begin your personalized learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Mentors & Users Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Mentors */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">For Mentors</Badge>
                <h3 className="text-3xl font-bold">
                  Turn Your Expertise Into Impact & Income
                </h3>
                <p className="text-lg text-muted-foreground">
                  Join thousands of successful mentors who are building their professional 
                  brand while helping others achieve their goals.
                </p>
              </div>

              <div className="space-y-4">
                {mentorBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/signup/mentor">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Mentoring Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* For Users */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">For Learners</Badge>
                <h3 className="text-3xl font-bold">
                  Accelerate Your Growth With Expert Guidance
                </h3>
                <p className="text-lg text-muted-foreground">
                  Connect with verified mentors who have walked your path and can 
                  provide the insights you need to reach your goals faster.
                </p>
              </div>

              <div className="space-y-4">
                {userBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/mentors">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Find Your Mentor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands who are already transforming their careers and lives 
              through expert mentorship. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/mentors">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Find a Mentor
                </Button>
              </Link>
              <Link to="/signup/mentor">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold">MentorMatch</span>
              </div>
              <p className="text-muted-foreground">
                Connecting ambitious learners with expert mentors worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">For Learners</h4>
              <div className="space-y-2 text-sm">
                <Link to="/mentors" className="block text-muted-foreground hover:text-primary">
                  Find Mentors
                </Link>
                <Link to="/how-it-works" className="block text-muted-foreground hover:text-primary">
                  How It Works
                </Link>
                <Link to="/pricing" className="block text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">For Mentors</h4>
              <div className="space-y-2 text-sm">
                <Link to="/signup/mentor" className="block text-muted-foreground hover:text-primary">
                  Become a Mentor
                </Link>
                <Link to="/mentor-resources" className="block text-muted-foreground hover:text-primary">
                  Resources
                </Link>
                <Link to="/success-stories" className="block text-muted-foreground hover:text-primary">
                  Success Stories
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="/help" className="block text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MentorMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;