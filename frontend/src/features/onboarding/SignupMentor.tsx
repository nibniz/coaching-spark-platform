import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  CheckCircle,
  Users,
  TrendingUp,
  DollarSign,
  Star
} from "lucide-react";
import { useState } from "react";

const SignupMentor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentTitle: "",
    company: "",
    yearsExperience: "",
    expertise: "",
    bio: "",
    hourlyRate: "",
    agreedToTerms: false
  });

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn $50-500+ per hour",
      description: "Set your own rates and build a sustainable income stream"
    },
    {
      icon: Users,
      title: "Build your personal brand",
      description: "Establish yourself as a thought leader in your industry"
    },
    {
      icon: TrendingUp,
      title: "Flexible schedule",
      description: "Work when you want, from wherever you are"
    },
    {
      icon: Star,
      title: "Make meaningful impact",
      description: "Help others achieve their goals and advance their careers"
    }
  ];

  const expertiseAreas = [
    "Career Development",
    "Leadership & Management",
    "Product Management",
    "Software Engineering",
    "Data Science & Analytics",
    "Marketing & Growth",
    "Sales & Business Development",
    "Entrepreneurship",
    "Design & UX",
    "Finance & Accounting",
    "Operations & Strategy",
    "Human Resources",
    "Consulting",
    "Other"
  ];

  const experienceRanges = [
    "1-2 years",
    "3-5 years", 
    "6-10 years",
    "11-15 years",
    "16+ years"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mentor signup:", formData);
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
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/signup/user">
                <Button variant="outline">Sign In</Button>
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
                  Share Your Expertise,{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Build Your Future
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Join thousands of successful mentors who are turning their knowledge 
                  into impact and income. Start your mentoring journey today.
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
                  "I've been mentoring on MentorMatch for 2 years and it's been incredible. 
                  I've helped over 200 professionals advance their careers while earning 
                  $3,000+ per month in my spare time."
                </blockquote>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">MK</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Michael Kim</div>
                    <div className="text-xs text-muted-foreground">Senior Engineering Manager</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Signup Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create Your Mentor Profile</CardTitle>
                <CardDescription>
                  Fill out your information to get started as a mentor
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
                      <Label htmlFor="currentTitle">Current Job Title</Label>
                      <Input
                        id="currentTitle"
                        value={formData.currentTitle}
                        onChange={(e) => handleInputChange("currentTitle", e.target.value)}
                        placeholder="e.g., Senior Product Manager"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="e.g., Google"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Select value={formData.yearsExperience} onValueChange={(value) => handleInputChange("yearsExperience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expertise">Primary Expertise Area</Label>
                      <Select value={formData.expertise} onValueChange={(value) => handleInputChange("expertise", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your expertise area" />
                        </SelectTrigger>
                        <SelectContent>
                          {expertiseAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Mentoring Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Mentoring Profile</h3>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Tell us about yourself</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Describe your experience and what you can help mentees with..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        placeholder="150"
                        min="25"
                        max="1000"
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Most mentors charge between $50-$300 per hour
                      </p>
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
                    Create Mentor Profile
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Looking to find a mentor instead?{" "}
                      <Link to="/mentors" className="text-primary hover:underline">
                        Browse mentors
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

export default SignupMentor;