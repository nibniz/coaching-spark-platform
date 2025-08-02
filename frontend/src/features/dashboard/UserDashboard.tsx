import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useAuthGuard } from "@/shared/hooks/useAuthGuard";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  Calendar,
  MessageSquare,
  Search,
  BookOpen,
  Star,
  Clock,
  CheckCircle,
  LogOut,
  Bell,
  Plus,
  TrendingUp,
  Target,
  Users
} from "lucide-react";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";

const UserDashboard = () => {
  const { user, isLoading: authLoading, isAuthenticated } = useAuthGuard();
  const { logout } = useAuth();

  // Show loading while auth is being checked
  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    </div>;
  }

  // Show loading if not authenticated (will redirect via useAuthGuard)
  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>;
  }

  // Check if user has user role - if not, show access denied but don't redirect
  if (user && user.role !== 'user') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              This dashboard is only available for users. You are logged in as a {user.role}.
            </p>
            <Link to="/mentor-dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Go to Mentor Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Sarah Johnson",
      mentorAvatar: "SJ",
      session: "Career Strategy Planning",
      date: "Today",
      time: "2:00 PM",
      duration: "90 min",
      status: "confirmed"
    },
    {
      id: 2,
      mentor: "Mike Davis",
      mentorAvatar: "MD",
      session: "1:1 Mentoring Session",
      date: "Dec 16",
      time: "10:00 AM",
      duration: "60 min",
      status: "confirmed"
    }
  ];

  const completedSessions = [
    {
      id: 1,
      mentor: "Emily Chen",
      mentorAvatar: "EC",
      session: "Technical Leadership",
      date: "Dec 8",
      rating: 5,
      feedback: "Excellent guidance on scaling engineering teams. Very practical advice!"
    },
    {
      id: 2,
      mentor: "David Rodriguez",
      mentorAvatar: "DR",
      session: "Interview Preparation",
      date: "Dec 5",
      rating: 5,
      feedback: "Great mock interview session. Helped me land my dream job!"
    }
  ];

  const recommendedMentors = [
    {
      id: 1,
      name: "Lisa Thompson",
      title: "Executive Coach",
      expertise: ["Leadership", "Communication"],
      rating: 4.8,
      avatar: "LT",
      price: 250
    },
    {
      id: 2,
      name: "Alex Kim", 
      title: "Data Science Manager",
      expertise: ["Data Science", "Analytics"],
      rating: 4.9,
      avatar: "AK",
      price: 160
    }
  ];

  const goals = [
    { id: 1, title: "Transition to Product Management", progress: 60, target: "Q1 2025" },
    { id: 2, title: "Improve Leadership Skills", progress: 30, target: "Q2 2025" },
    { id: 3, title: "Build Technical Portfolio", progress: 80, target: "End of 2024" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/user-dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle variant="icon-only" />
              <Link to="/mentors">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Find Mentors
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">{user.avatar}</span>
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground mt-2">Continue your growth journey with expert guidance.</p>
            </div>
            <Link to="/mentors">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Book New Session
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mentors Connected</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sessions">My Sessions</TabsTrigger>
              <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
              <TabsTrigger value="discover">Discover Mentors</TabsTrigger>
              <TabsTrigger value="history">Session History</TabsTrigger>
            </TabsList>

            <TabsContent value="sessions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold">{session.mentorAvatar}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{session.mentor}</h4>
                            <p className="text-sm text-muted-foreground">{session.session}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>{session.date} at {session.time}</span>
                              <span>•</span>
                              <span>{session.duration}</span>
                              <Badge variant="secondary" className="ml-2">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {session.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Goals & Progress</CardTitle>
                  <CardDescription>Track your professional development journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {goals.map((goal) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{goal.title}</h4>
                          <div className="text-sm text-muted-foreground">Target: {goal.target}</div>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">{goal.progress}% complete</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discover" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Mentors</CardTitle>
                  <CardDescription>Based on your goals and interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recommendedMentors.map((mentor) => (
                      <div key={mentor.id} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold">{mentor.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{mentor.name}</h4>
                            <p className="text-sm text-muted-foreground">{mentor.title}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{mentor.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {mentor.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">${mentor.price}/hr</span>
                          <Link to={`/mentor/${mentor.id}`}>
                            <Button size="sm">View Profile</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Sessions</CardTitle>
                  <CardDescription>Your mentoring session history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedSessions.map((session) => (
                      <div key={session.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                              <span className="text-primary-foreground font-bold text-sm">{session.mentorAvatar}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{session.mentor}</h4>
                              <p className="text-sm text-muted-foreground">{session.session}</p>
                              <p className="text-xs text-muted-foreground">{session.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= session.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{session.feedback}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;