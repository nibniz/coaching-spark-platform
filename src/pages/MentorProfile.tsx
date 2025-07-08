import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft,
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  Calendar,
  MessageSquare,
  Globe,
  Award,
  BookOpen,
  TrendingUp
} from "lucide-react";

const MentorProfile = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const mentor = {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager at Meta",
    company: "Meta",
    expertise: ["Product Strategy", "Team Leadership", "Career Growth", "User Research", "Data Analysis"],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 150,
    location: "San Francisco, CA",
    sessions: 500,
    responseTime: "< 2 hours",
    image: "SJ",
    verified: true,
    languages: ["English", "Spanish"],
    timezone: "PST (UTC-8)",
    aboutMe: "I'm a seasoned product manager with over 10 years of experience in the tech industry. I've led product teams at Google and now Meta, where I focus on building products that connect billions of people. My passion is helping aspiring product managers and professionals navigate their career growth and develop the skills needed to succeed in tech leadership roles.",
    experience: [
      {
        role: "Senior Product Manager",
        company: "Meta",
        duration: "2020 - Present",
        description: "Leading product strategy for Instagram's creator economy features. Grew creator monetization by 300% year-over-year."
      },
      {
        role: "Product Manager",
        company: "Google",
        duration: "2017 - 2020",
        description: "Managed YouTube's recommendation algorithms and user engagement features. Led cross-functional team of 12 engineers and designers."
      },
      {
        role: "Associate Product Manager",
        company: "Spotify",
        duration: "2015 - 2017",
        description: "Worked on music discovery features and personalization algorithms. Contributed to 25% increase in user engagement."
      }
    ],
    education: [
      {
        degree: "MBA",
        school: "Stanford Graduate School of Business",
        year: "2015"
      },
      {
        degree: "BS Computer Science",
        school: "UC Berkeley",
        year: "2013"
      }
    ],
    achievements: [
      "Led product that reached 100M+ users",
      "Speaker at ProductCon, Mind the Product",
      "Product Manager of the Year 2021 - Meta",
      "Published 15+ articles on product strategy"
    ],
    mentorshipAreas: [
      "Product Strategy & Roadmapping",
      "Career Transition into Product Management",
      "Technical Leadership for Non-Technical PMs",
      "Team Building & Management",
      "Stakeholder Communication",
      "Data-Driven Decision Making"
    ],
    sessionTypes: [
      {
        name: "1:1 Mentoring Session",
        duration: "60 minutes",
        price: 150,
        description: "Deep dive into your specific challenges with personalized guidance and actionable advice."
      },
      {
        name: "Resume & Portfolio Review",
        duration: "45 minutes", 
        price: 100,
        description: "Comprehensive review of your resume and portfolio with detailed feedback and improvement suggestions."
      },
      {
        name: "Mock Interview Session",
        duration: "60 minutes",
        price: 120,
        description: "Practice product management interviews with real-world scenarios and immediate feedback."
      },
      {
        name: "Career Strategy Planning",
        duration: "90 minutes",
        price: 200,
        description: "Develop a comprehensive career plan with milestones, skill development, and networking strategies."
      }
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Mike Chen",
      role: "Software Engineer",
      rating: 5,
      date: "2 weeks ago",
      content: "Sarah's guidance was invaluable in helping me transition from engineering to product management. Her practical advice and industry insights made all the difference. Highly recommend!"
    },
    {
      id: 2,
      name: "Jennifer Lopez",
      role: "Product Designer",
      date: "1 month ago",
      rating: 5,
      content: "Incredible mentor! Sarah helped me understand the strategic side of product management and how to work effectively with engineering teams. Her experience at top tech companies really shows."
    },
    {
      id: 3,
      name: "David Kim",
      role: "MBA Student",
      rating: 5,
      date: "6 weeks ago",
      content: "Sarah's interview prep session was fantastic. She provided real interview questions from FAANG companies and helped me structure my responses. Got offers from 3 companies after our sessions!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/mentors" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Mentors</span>
            </Link>
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-2xl">{mentor.image}</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h1 className="text-2xl font-bold">{mentor.name}</h1>
                        {mentor.verified && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground">{mentor.title}</p>
                      <p className="text-primary font-medium">{mentor.company}</p>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{mentor.sessions} sessions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{mentor.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>About Me</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {mentor.aboutMe}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Mentorship Areas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {mentor.mentorshipAreas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Key Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mentor.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mentor.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{exp.role}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span className="font-medium text-primary">{exp.company}</span>
                            <span>•</span>
                            <span>{exp.duration}</span>
                          </div>
                          <p className="text-muted-foreground">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mentor.education.map((edu, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.school}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{edu.year}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">{review.name}</span>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{review.role}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[1,2,3,4,5].map((star) => (
                                  <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-6">
                <div className="grid gap-4">
                  {mentor.sessionTypes.map((session, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold">{session.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{session.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>${session.price}</span>
                              </div>
                            </div>
                          </div>
                          <Link to={`/book/${mentor.id}?session=${session.name}`}>
                            <Button>Book Now</Button>
                          </Link>
                        </div>
                        <p className="text-muted-foreground">{session.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>
                  Get personalized guidance from {mentor.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">${mentor.hourlyRate}</div>
                  <div className="text-sm text-muted-foreground">per hour</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>{mentor.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{mentor.timezone}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link to={`/book/${mentor.id}`}>
                    <Button className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Session
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">{mentor.responseTime}</div>
                  <div className="text-sm text-muted-foreground">Average response time</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;