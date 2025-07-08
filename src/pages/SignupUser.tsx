import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useState } from "react";

const SignupUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentRole: "",
    experience: "",
    goals: "",
    interests: "",
    agreedToTerms: false
  });

  const benefits = [
    {
      icon: Target,
      title: "Achieve your goals faster",
      description: "Get personalized guidance from experts who've been where you want to go"
    },
    {
      icon: TrendingUp,
      title: "Accelerate your career",
      description: "Learn from successful professionals and avoid common pitfalls"
    },
    {
      icon: Users,
      title: "Build valuable connections",
      description: "Network with industry leaders and expand your professional circle"
    },
    {
      icon: Zap,
      title: "Flexible learning",
      description: "Schedule sessions that fit your timeline and learning style"
    }
  ];

  const experiencelevels = [
    "Student",
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6-10 years)",
    "Executive Level (10+ years)"
  ];

  const interestAreas = [
    "Career Development",
    "Leadership & Management",
    "Entrepreneurship",
    "Product Management",
    "Software Engineering",
    "Data Science",
    "Marketing & Growth",
    "Sales & Business Development",
    "Design & UX",
    "Finance & Investing",
    "Operations & Strategy",
    "Personal Development",
    "Industry Transition",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User signup:", formData);
    // In a real app, this would handle the signup process
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Want to mentor instead?</span>
              <Link to="/signup/mentor">
                <Button variant="outline">Become a Mentor</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">
                  Accelerate Your Growth with{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Expert Mentorship
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connect with experienced professionals who can guide your career, 
                  help you develop new skills, and accelerate your path to success.
                </p>
              </div>

              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Success Story</h3>
                <blockquote className="text-muted-foreground italic">
                  "My mentor helped me transition from marketing to product management. 
                  Within 6 months, I landed a PM role at a Fortune 500 company with a 
                  40% salary increase. The personalized guidance was invaluable."
                </blockquote>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">JS</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Jessica Smith</div>
                    <div className="text-xs text-muted-foreground">Product Manager at Microsoft</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Signup Form */}
            <Card>
              <CardHeader>
                <CardTitle>Start Your Growth Journey</CardTitle>
                <CardDescription>
                  Create your account to connect with expert mentors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Professional Background</h3>
                    <div className="space-y-2">
                      <Label htmlFor="currentRole">Current Role/Title</Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) => handleInputChange("currentRole", e.target.value)}
                        placeholder="e.g., Software Developer, Marketing Manager, Student"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experiencelevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Goals and Interests */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Goals & Interests</h3>
                    <div className="space-y-2">
                      <Label htmlFor="interests">Areas of Interest</Label>
                      <Select value={formData.interests} onValueChange={(value) => handleInputChange("interests", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="What would you like guidance on?" />
                        </SelectTrigger>
                        <SelectContent>
                          {interestAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">What are your goals?</Label>
                      <Textarea
                        id="goals"
                        value={formData.goals}
                        onChange={(e) => handleInputChange("goals", e.target.value)}
                        placeholder="Tell us what you'd like to achieve with mentorship..."
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked.toString())}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!formData.agreedToTerms}
                  >
                    Create Account
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary hover:underline">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;