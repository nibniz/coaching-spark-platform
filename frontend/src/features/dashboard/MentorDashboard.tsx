import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { 
  Calendar,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Clock,
  CheckCircle,
  Settings,
  LogOut,
  Bell,
  Eye,
  Edit
} from "lucide-react";

const MentorDashboard = () => {
  const { user, logout } = useAuth();

  if (!user || user.role !== 'mentor') {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    {
      title: "Total Earnings",
      value: "$3,240",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Sessions This Month",
      value: "18",
      change: "+22%",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "New Messages",
      value: "7",
      change: "+3",
      icon: MessageSquare,
      color: "text-purple-600"
    },
    {
      title: "Profile Views",
      value: "142",
      change: "+18%",
      icon: Eye,
      color: "text-orange-600"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      student: "Mike Chen",
      session: "Career Strategy Planning",
      date: "Today",
      time: "2:00 PM",
      duration: "90 min",
      amount: "$200"
    },
    {
      id: 2,
      student: "Jennifer Lopez",
      session: "1:1 Mentoring Session",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      amount: "$150"
    },
    {
      id: 3,
      student: "David Kim",
      session: "Mock Interview Session",
      date: "Dec 15",
      time: "3:00 PM",
      duration: "60 min",
      amount: "$120"
    }
  ];

  const recentReviews = [
    {
      id: 1,
      student: "Alex Thompson",
      rating: 5,
      comment: "Sarah's guidance was invaluable for my career transition. Highly recommend!",
      date: "2 days ago"
    },
    {
      id: 2,
      student: "Maria Garcia",
      rating: 5,
      comment: "Excellent session on product strategy. Clear, actionable advice.",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>
            
            <div className="flex items-center space-x-4">
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
              <p className="text-muted-foreground mt-2">Here's what's happening with your mentoring business.</p>
            </div>
            <div className="flex space-x-3">
              <Link to={`/mentor/1`}>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </Link>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted/30`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
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
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{session.student}</h4>
                            <p className="text-sm text-muted-foreground">{session.session}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>{session.date} at {session.time}</span>
                              <span>•</span>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{session.amount}</div>
                          <Button size="sm" className="mt-2">
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

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>Feedback from your recent sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{review.student}</span>
                            <div className="flex items-center">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Sessions Completed</span>
                      <span className="font-semibold">18</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Hours Mentored</span>
                      <span className="font-semibold">22.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Rating</span>
                      <span className="font-semibold">4.9 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Rate</span>
                      <span className="font-semibold">98%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Sessions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1:1 Mentoring</span>
                      <Badge variant="secondary">12 sessions</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Career Strategy</span>
                      <Badge variant="secondary">4 sessions</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mock Interviews</span>
                      <Badge variant="secondary">2 sessions</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your mentor profile and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Update Pricing & Services
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Availability Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;