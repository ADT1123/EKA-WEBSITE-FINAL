import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Aboutpage from "./pages/Aboutpage";
import CartPage from "./pages/CartPage";
import CheckoutPage from './pages/CheckoutPage';
import ProjectsPage from "./pages/OurProjects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* 🔴 CartProvider MUST wrap routes that use cart */}
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/About" element={<Aboutpage />} />
            {/* keep custom routes above 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
