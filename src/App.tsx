import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import BookSession from "./pages/BookSession";
import SignupMentor from "./pages/SignupMentor";
import SignupUser from "./pages/SignupUser";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/book/:id" element={<BookSession />} />
          <Route path="/signup/mentor" element={<SignupMentor />} />
          <Route path="/signup/user" element={<SignupUser />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
