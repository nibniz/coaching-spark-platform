import { Routes, Route } from "react-router-dom";
import HomePage from "@/app/layout/Index";
import NotFound from "@/app/layout/NotFound";
import Mentors from "@/features/mentors/Mentors";
import MentorProfile from "@/features/mentors/MentorProfile";
import BookSession from "@/features/sessions/BookSession";
import SignupMentor from "@/features/onboarding/SignupMentor";
import SignupUser from "@/features/onboarding/SignupUser";
import OnboardingQuestionnaire from "@/features/onboarding/OnboardingQuestionnaire";
import Login from "@/features/auth/Login";
import MentorDashboard from "@/features/dashboard/MentorDashboard";
import UserDashboard from "@/features/dashboard/UserDashboard";
import MentorProfileSettings from "@/features/dashboard/MentorProfileSettings";
import SearchPage from "@/features/search/SearchPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentor/:id" element={<MentorProfile />} />
      <Route path="/book/:id" element={<BookSession />} />
      <Route path="/signup/mentor" element={<SignupMentor />} />
      <Route path="/signup/user" element={<SignupUser />} />
      <Route path="/onboarding" element={<OnboardingQuestionnaire />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/mentor-profile-settings" element={<MentorProfileSettings />} />
      <Route path="/search" element={<SearchPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}; 