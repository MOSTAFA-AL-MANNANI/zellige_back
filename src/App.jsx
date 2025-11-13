import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./compenents/ProductList";
import ProductDetail from "./compenents/ProductDetail";
import Home from "./compenents/home";
import About from "./compenents/about";
import Contact from "./compenents/contact";
import Footer from "./compenents/footer";
import AdminLogin from "./compenents/login";
import AdminContacts from "./compenents/admin/contact";
import Products from "./compenents/admin/Product";
import Navbar from "./compenents/navbar";
import Cart from "./compenents/cart";
import Checkout from "./compenents/Checkout";
import OrdersAdmin from "./compenents/admin/order";
import DashboardAdmin from "./compenents/admin/dashbord";
import ProtectedRoute from "./compenents/ProtectedRoute";
import AdminNavbar from "./compenents/admin/navbar";

// Composant pour gérer l'affichage conditionnel des navbars
function NavbarHandler() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && 
                      location.pathname !== '/admin/login';

  return isAdminRoute ? <AdminNavbar /> : <Navbar />;
}

function App() {
  return (
    <Router>
      {/* Navbar conditionnelle */}
      <NavbarHandler />
      
      <Routes>
        {/* Routes publiques - Affichent Navbar normale */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Route de login admin - Affiche Navbar normale */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Routes admin protégées - Affichent AdminNavbar */}
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/contacts" 
          element={
            <ProtectedRoute>
              <AdminContacts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute>
              <OrdersAdmin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {/* Footer - Ne s'affiche pas sur les routes admin */}
      <FooterConditional />
    </Router>
  );
}

// Composant pour afficher le footer conditionnellement
function FooterConditional() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && 
                      location.pathname !== '/admin/login';
  
  return isAdminRoute ? null : <Footer />;
}

export default App;