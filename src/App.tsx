import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReportPage from "./pages/ReportPage";
import AdoptPage from "./pages/AdoptPage";
import AdoptDetailsPage from "./pages/AdoptDetailsPage";
import VeterinaryPage from "./pages/VeterinaryPage";
import CommunityPage from "./pages/CommunityPage";
import Shop from "./pages/shop";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./components/CartContext"; 
import CartPage from "./pages/CartPage";

// Create the query client
const queryClient = new QueryClient();

function App() {
  const { theme } = useTheme();

  return (
    <div className="dark"> {/* Force dark theme */}
      {/* Wrap everything inside AuthProvider and CartProvider */}
      <AuthProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/adopt" element={<AdoptPage />} />
                    <Route path="/adopt/:id" element={<AdoptDetailsPage />} />
                    <Route path="/veterinary" element={<VeterinaryPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/cart" element={<CartPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </QueryClientProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
