import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AppHub from "./pages/AppHub";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import KeywordResearch from "./pages/KeywordResearch";
import Reviews from "./pages/Reviews";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import BacklinkGenerator from "./pages/BacklinkGenerator";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app-hub" element={<AppHub />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/keyword-research" element={<KeywordResearch />} />
            <Route path="/backlink-generator" element={<BacklinkGenerator />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/payment" element={<Payment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
