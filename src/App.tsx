import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./hooks/useAuth";
import ShopHome from "./pages/ShopHome";
import ProductPage from "./pages/ProductPage";
import AddressPage from "./pages/AddressPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLayout from "./components/admin/AdminLayout";

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
              {/* Shop routes */}
              <Route path="/" element={<ShopHome />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/address" element={<AddressPage />} />
              <Route path="/order-summary" element={<OrderSummaryPage />} />
              <Route path="/payment" element={<CheckoutPaymentPage />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
              <Route path="/admin/banners" element={<AdminLayout><AdminBanners /></AdminLayout>} />
              <Route path="/admin/coupons" element={<AdminLayout><AdminCoupons /></AdminLayout>} />
              <Route path="/admin/notifications" element={<AdminLayout><AdminNotifications /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
