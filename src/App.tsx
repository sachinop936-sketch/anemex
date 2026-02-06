import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import ShopHome from "./pages/ShopHome";
import ProductPage from "./pages/ProductPage";
import AddressPage from "./pages/AddressPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ShopHome />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/address" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
              <Route path="/order-summary" element={<ProtectedRoute><OrderSummaryPage /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><CheckoutPaymentPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
