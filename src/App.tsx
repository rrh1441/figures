
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Components
import OnboardingScreen from "./components/onboarding/OnboardingScreen";
import AuthScreen from "./components/auth/AuthScreen";
import HomeScreen from "./components/home/HomeScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import MessagingScreen from "./components/messaging/MessagingScreen";
import MessagingListScreen from "./components/messaging/MessagingListScreen";
import SettingsScreen from "./components/settings/SettingsScreen";

const queryClient = new QueryClient();

// Lock body scrolling for mobile app feel
const LockBodyScroll = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LockBodyScroll />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/messages" element={<MessagingListScreen />} />
          <Route path="/messages/:id" element={<MessagingScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
