import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  CheckCircle,
  CreditCard,
  Star
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/shared/utils/lib/utils";

const BookSession = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [goals, setGoals] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Mock data - in a real app, this would come from an API
  const mentor = {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager at Meta",
    image: "SJ",
    rating: 4.9,
    reviews: 127,
    verified: true
  };

  const sessionTypes = [
    {
      name: "1:1 Mentoring Session",
      duration: "60 minutes",
      price: 150,
      description: "Deep dive into your specific challenges with personalized guidance."
    },
    {
      name: "Resume & Portfolio Review",
      duration: "45 minutes", 
      price: 100,
      description: "Comprehensive review with detailed feedback and improvements."
    },
    {
      name: "Mock Interview Session",
      duration: "60 minutes",
      price: 120,
      description: "Practice interviews with real-world scenarios and feedback."
    },
    {
      name: "Career Strategy Planning",
      duration: "90 minutes",
      price: 200,
      description: "Develop a comprehensive career plan with actionable steps."
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const selectedSessionDetails = sessionTypes.find(s => s.name === selectedSession);

  const handleBooking = () => {
    // In a real app, this would handle the booking process
    console.log("Booking details:", {
      mentorId: id,
      sessionType: selectedSession,
      date: selectedDate,
      time: selectedTime,
      goals,
      name,
      email
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to={`/mentor/${id}`} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Profile</span>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Book a Session</h1>
            <p className="text-muted-foreground">
              Schedule your mentoring session with {mentor.name}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mentor Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">{mentor.image}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{mentor.name}</h3>
                        {mentor.verified && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-muted-foreground">{mentor.title}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Type */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Choose Session Type</CardTitle>
                  <CardDescription>
                    Select the type of session that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessionTypes.map((session, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-colors",
                        selectedSession === session.name 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedSession(session.name)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="font-medium">{session.name}</h4>
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
                          <p className="text-sm text-muted-foreground">{session.description}</p>
                        </div>
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                          selectedSession === session.name ? "border-primary" : "border-muted-foreground"
                        )}>
                          {selectedSession === session.name && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Date and Time */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Select Date & Time</CardTitle>
                  <CardDescription>
                    Choose when you'd like to have your session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Time (PST)</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Personal Information</CardTitle>
                  <CardDescription>
                    Tell us about yourself and your goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goals">What are your goals for this session?</Label>
                    <Textarea 
                      id="goals"
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      placeholder="Tell us what you'd like to achieve in this session..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedSessionDetails && (
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">{selectedSessionDetails.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedSessionDetails.duration}</p>
                      </div>
                      
                      {selectedDate && selectedTime && (
                        <div>
                          <h4 className="font-medium">Date & Time</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(selectedDate, "EEEE, MMMM d, yyyy")}
                          </p>
                          <p className="text-sm text-muted-foreground">{selectedTime} PST</p>
                        </div>
                      )}

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total</span>
                          <span className="text-lg font-bold">${selectedSessionDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleBooking}
                    disabled={!selectedSession || !selectedDate || !selectedTime || !name || !email}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    You'll be redirected to our secure payment processor. 
                    No charges until session is confirmed.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">What happens next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Your booking request will be sent to {mentor.name}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>You'll receive confirmation within 24 hours</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Meeting link will be sent before the session</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSession;