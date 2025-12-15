import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

import Checkout from "./routes/Checkout";
import AdminRoute from "./routes/AdminRoute";

import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import UserAdmin from "./pages/admin/UserAdmin";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin */}
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminLayout>
        <ProductsAdmin />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminLayout>
        <OrdersAdmin />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminLayout>
        <UserAdmin />
      </AdminLayout>
    </AdminRoute>
  }
/>

      </Routes>
      </>
  );
}

export default App;
