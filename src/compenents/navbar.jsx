import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 🧠 Charger le panier au montage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(storedCart.length);

    // ✅ Écouter les changements de localStorage (dans d'autres onglets)
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.length);
    };
    window.addEventListener("storage", handleStorageChange);

    // ✅ Écouter un événement personnalisé (dans la même page)
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.length);
    };
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <nav className="relative bg-gradient-to-r from-red-500 via-white to-green-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group">
            <img className="w-14 h-12" src="logo.png" alt="Zellige Star Logo" />
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-red-900 to-green-800 bg-clip-text text-transparent drop-shadow-sm">
              Zellige Star
            </span>
          </div>

          {/* Liens Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/products" className="nav-link">Produit</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
          </div>

          {/* Panier + menu mobile */}
          <div className="flex items-center">
            <div className="relative group">
              <Link to="/cart">
                <button className="p-2 rounded-full text-gray-900 hover:text-red-500 hover:bg-black/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </Link>

              {/* ✅ Badge dynamique */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Menu mobile */}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
              >
                <svg className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-sm rounded-b-lg mx-4 shadow-lg">
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/about" className="mobile-link">About</Link>
          <Link to="/products" className="mobile-link">Produit</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
