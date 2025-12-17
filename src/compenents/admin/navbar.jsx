import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer le nom de l'admin au chargement
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData && adminData.name) {
      setAdminName(adminData.name);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Navigation items pour l'admin
  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { path: "/admin/products", label: "Produits", icon: "fas fa-tshirt" },
    { path: "/admin/orders", label: "Commandes", icon: "fas fa-shopping-bag" },
    { path: "/admin/contacts", label: "Messages", icon: "fas fa-envelope" },
  ];

  // Vérifier si le lien est actif
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("https://marocstar-back.vercel.app/admins/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        }
      });

      if (response.ok) {
        // Supprimer les données d'admin du localStorage
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        
        // Rediriger vers la page de login
        navigate("/admin/login");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setIsDropdownOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-red-900 to-green-900 shadow-2xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo et Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/admin/dashboard" 
              className="flex items-center group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <i className="fas fa-crown text-white text-lg"></i>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-green-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent">
                  Moroccan Star
                </span>
                <span className="block text-xs text-gray-400 font-medium">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 group ${
                    isActiveLink(item.path)
                      ? 'text-white bg-white/20 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${item.icon} mr-2`}></i>
                  {item.label}
                  {isActiveLink(item.path) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-red-400 to-green-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Section Droite - Profil Admin et Menu Mobile */}
          <div className="flex items-center space-x-4">
            
            {/* Profil Admin - Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-green-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-cog text-white text-sm"></i>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">{adminName || "Administrateur"}</div>
                  <div className="text-gray-400 text-xs">Admin</div>
                </div>
                <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 transform opacity-100 scale-100 transition-all duration-300 origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-semibold text-gray-800">{adminName || "Administrateur"}</div>
                    <div className="text-xs text-gray-500">Administrateur</div>
                  </div>
                  
                  <Link
                    to="/admin/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="fas fa-user-edit text-red-600 mr-3 w-5"></i>
                    Modifier le profil
                  </Link>
                  
                  <Link
                    to="/admin/settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="fas fa-cog text-green-600 mr-3 w-5"></i>
                    Paramètres
                  </Link>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <i className="fas fa-sign-out-alt mr-3 w-5"></i>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>

            {/* Bouton Déconnexion - Mobile */}
            <div className="md:hidden">
              <button
                onClick={handleLogout}
                className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-all duration-300 transform hover:scale-110"
                title="Déconnexion"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
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
          isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200 mt-2">
            <div className="space-y-4">
              
              {/* Profil Admin Mobile */}
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-xl border border-red-100">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-green-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-cog text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{adminName || "Administrateur"}</div>
                  <div className="text-sm text-gray-600">Administrateur</div>
                </div>
              </div>

              {/* Navigation Mobile */}
              <div className="space-y-2">
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
              </div>

              {/* Actions Admin Mobile */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/admin/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-user-edit mr-2"></i>
                    Profil
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-cog mr-2"></i>
                    Paramètres
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de page active */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-green-600"></div>
    </nav>
  );
}