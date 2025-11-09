import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* صفحات المستخدم */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/cart" element={<Cart />} />

        {/* صفحات الادمن */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
      </Routes>
    </Router>
  );
}

export default App;
