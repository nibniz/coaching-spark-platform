import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router-dom";
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
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Find the perfect mentor using AI-powered matching based on your goals and expertise needs."
    },
    {
      icon: Shield,
      title: "Verified Experts",
      description: "All mentors are thoroughly vetted with verified credentials and authentic reviews."
    },
    {
      icon: Calendar,
      title: "Flexible Booking",
      description: "Schedule sessions that fit your timeline with integrated calendar and payment processing."
    },
    {
      icon: MessageSquare,
      title: "Ongoing Support",
      description: "Get continuous guidance through direct messaging and progress tracking tools."
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Logo + Navigation */}
            <div className="flex items-center space-x-8 -ml-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-base">M</span>
                </div>
                <span className="text-2xl font-bold">MentorMatch</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/mentors" className="text-foreground hover:text-primary transition-colors">
                  Find Mentors
                </Link>
                <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
                <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/resources" className="text-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </nav>
            </div>

            {/* Right side: Action buttons + Mobile menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="border border-primary text-primary hover:text-primary px-4 py-2 rounded-full transition-colors">
                  Login
                </Link>
                <Link to="/signup/mentor">
                  <Button className="rounded-full">Become a Mentor</Button>
                </Link>
              </div>

              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              <Link to="/mentors" className="block text-foreground hover:text-primary transition-colors">
                Find Mentors
              </Link>
              <Link to="/how-it-works" className="block text-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="block text-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/about" className="block text-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/resources" className="block text-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link to="/login" className="block border border-primary text-primary hover:text-primary px-4 py-2 rounded-full transition-colors text-center">
                Login
              </Link>
              <Link to="/signup/mentor" className="block">
                <Button className="w-full rounded-full">Become a Mentor</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary-glow/10">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="space-y-8 w-full">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit">
                  🚀 Launch Your Growth Journey
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Connect with{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Expert Mentors
                  </span>{" "}
                  Who Accelerate Your Success
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Whether you're seeking career guidance, skill development, or life coaching, 
                  find verified experts who understand your goals and provide personalized guidance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/mentors">
                  <Button size="lg" className="w-full sm:w-auto">
                    Find Your Mentor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/signup/mentor">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Play className="mr-2 h-4 w-4" />
                    Become a Mentor
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4 justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Expert Mentors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-muted-foreground">Sessions Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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