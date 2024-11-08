import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/public/HomePage";
import OrdersPage from "./pages/public/orders/OrdersPage";
import OrderDetailsPage from "./pages/public/orders/orderDetails/OrderDetailPage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
