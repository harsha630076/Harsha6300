import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthErrorBoundary } from "@/components/AuthErrorBoundary";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import SimpleRegister from "./pages/SimpleRegister";
import Login from "./pages/Login";
import Permissions from "./pages/Permissions";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Recommendations from "./pages/Recommendations";
import Log from "./pages/Log";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import FoodSearch from "./pages/FoodSearch";
import Subscription from "./pages/Subscription";
import AIAssistant from "./pages/AIAssistant";
import Notifications from "./pages/Notifications";
import SignupDetails from "./pages/SignupDetails";
import PhoneOTP from "./pages/PhoneOTP";
import OTPVerification from "./pages/OTPVerification";
import OnboardingQuestions from "./pages/OnboardingQuestions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<SimpleRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/log" element={<ProtectedRoute><Log /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/food-search" element={<ProtectedRoute><FoodSearch /></ProtectedRoute>} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/signup-details" element={<SignupDetails />} />
          <Route path="/phone-otp" element={<PhoneOTP />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route
            path="/onboarding-questions"
            element={<OnboardingQuestions />}
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
