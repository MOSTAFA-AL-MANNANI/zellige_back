import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 🧠 Charger le panier et gérer le scroll
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(storedCart.length);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.length);
    };

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.length);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigation items
  const navItems = [
    { path: "/", label: "Accueil", icon: "fas fa-home" },
    { path: "/about", label: "À Propos", icon: "fas fa-info-circle" },
    { path: "/products", label: "Produits", icon: "fas fa-tshirt" },
    { path: "/contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' 
        : 'bg-gradient-to-r from-red-500 via-white to-green-500 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center group"
          >
            <div className="relative">
              <div className="w-12 h-12  rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-green-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            </div>
            <span className={`ml-3 text-2xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm transition-all duration-500 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}>
              Moroccan Star
            </span>
          </Link>

          {/* Liens Desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group ${
                    isActiveLink(item.path)
                      ? 'text-white bg-gradient-to-r from-red-600 to-green-600 shadow-lg'
                      : 'text-gray-800 hover:text-white hover:bg-black/10'
                  }`}
                >
                  <i className={`${item.icon} mr-2`}></i>
                  {item.label}
                  {isActiveLink(item.path) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Panier + menu mobile */}
          <div className="flex items-center space-x-4">
            {/* Icône Panier */}
            <Link to="/cart" className="relative group">
              <button className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg' 
                  : 'bg-white/90 text-gray-900 shadow-md hover:bg-white'
              }`}>
                <i className="fas fa-shopping-cart text-lg"></i>
              </button>

              {/* Badge dynamique */}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center transform group-hover:scale-125 transition-all duration-300 shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Bouton Menu Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg' 
                    : 'bg-white/90 text-gray-900 shadow-md hover:bg-white'
                }`}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-3' : ''
                  }`}></span>
                  <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-3' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-2 group ${
                    isActiveLink(item.path)
                      ? 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg'
                      : 'text-gray-800 hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50'
                  }`}
                >
                  <i className={`${item.icon} mr-3 text-lg w-6 text-center ${
                    isActiveLink(item.path) ? 'text-white' : 'text-red-600'
                  }`}></i>
                  {item.label}
                  {isActiveLink(item.path) && (
                    <i className="fas fa-chevron-right ml-auto animate-pulse"></i>
                  )}
                </Link>
              ))}
              
              {/* Section Panier Mobile */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <i className="fas fa-shopping-cart mr-3"></i>
                    Mon Panier
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-white text-red-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar pour le scroll */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-green-600 transform origin-left scale-x-0 transition-transform duration-200"
           style={{ transform: `scaleX(${isScrolled ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) : 0})` }}>
      </div>
    </nav>
  );
}