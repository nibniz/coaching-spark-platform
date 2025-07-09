import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Product Manager at Meta",
      expertise: ["Product Strategy", "Team Leadership", "Career Growth"],
      rating: 4.9,
      reviews: 127,
      hourlyRate: 150,
      location: "San Francisco, CA",
      sessions: 500,
      responseTime: "< 2 hours",
      image: "SJ",
      verified: true,
      description: "10+ years helping professionals transition into tech leadership roles. Former PM at Google, now at Meta.",
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "Mike Davis",
      title: "Serial Entrepreneur & Business Coach",
      expertise: ["Startup Strategy", "Fundraising", "Business Development"],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 200,
      location: "New York, NY",
      sessions: 300,
      responseTime: "< 1 hour",
      image: "MD",
      verified: true,
      description: "Built and sold 3 companies. Now helping entrepreneurs scale from idea to $10M+ revenue.",
      languages: ["English"]
    },
    {
      id: 3,
      name: "Emily Chen",
      title: "VP of Engineering at Stripe",
      expertise: ["Technical Leadership", "Engineering Management", "System Design"],
      rating: 4.9,
      reviews: 156,
      hourlyRate: 180,
      location: "Seattle, WA",
      sessions: 420,
      responseTime: "< 3 hours",
      image: "EC",
      verified: true,
      description: "15+ years in tech. Led engineering teams from 5 to 200+ engineers. Expert in scaling technical organizations.",
      languages: ["English", "Mandarin"]
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Career Transition Coach",
      expertise: ["Career Change", "Interview Prep", "Personal Branding"],
      rating: 4.7,
      reviews: 98,
      hourlyRate: 120,
      location: "Austin, TX",
      sessions: 350,
      responseTime: "< 4 hours",
      image: "DR",
      verified: true,
      description: "Helped 500+ professionals make successful career transitions. Former recruiter at top tech companies.",
      languages: ["English", "Portuguese"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Executive Coach & Leadership Consultant",
      expertise: ["Executive Presence", "Leadership Development", "Communication"],
      rating: 4.8,
      reviews: 142,
      hourlyRate: 250,
      location: "Boston, MA",
      sessions: 600,
      responseTime: "< 2 hours",
      image: "LT",
      verified: true,
      description: "20+ years coaching C-level executives. Former McKinsey consultant specializing in leadership transformation.",
      languages: ["English", "French"]
    },
    {
      id: 6,
      name: "Alex Kim",
      title: "Data Science Manager at Netflix",
      expertise: ["Data Science", "Machine Learning", "Analytics"],
      rating: 4.9,
      reviews: 73,
      hourlyRate: 160,
      location: "Los Angeles, CA",
      sessions: 280,
      responseTime: "< 3 hours",
      image: "AK",
      verified: true,
      description: "PhD in Statistics, 8+ years in data science. Led ML initiatives that generated $100M+ in revenue.",
      languages: ["English", "Korean"]
    }
  ];

  const categories = [
    "All Categories",
    "Career Development",
    "Leadership & Management",
    "Entrepreneurship",
    "Technical Skills",
    "Data & Analytics",
    "Product Management",
    "Personal Development"
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === "All Categories" ||
                           mentor.expertise.some(exp => exp.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>
            
            <nav className="flex items-center space-x-4">
              <Link to="/signup/user">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup/mentor">
                <Button>Become a Mentor</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold">Find Your Perfect Mentor</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover expert mentors who can guide your growth and accelerate your success.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, expertise, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-lg">{mentor.image}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg leading-tight">{mentor.name}</CardTitle>
                      {mentor.verified && (
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <CardDescription className="text-sm mt-1">
                      {mentor.title}
                    </CardDescription>
                    <div className="flex items-center space-x-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                      <span className="text-sm text-muted-foreground">({mentor.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {mentor.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>${mentor.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{mentor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Link to={`/mentor/${mentor.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Link to={`/book/${mentor.id}`} className="flex-1">
                    <Button className="w-full">
                      Book Session
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <Search className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">No mentors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all categories.
              </p>
              <Button onClick={() => {setSearchQuery(""); setSelectedCategory("");}}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;