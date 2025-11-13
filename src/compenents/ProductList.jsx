import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye, FaHeart, FaStar, FaSearch, FaFilter, FaSyncAlt } from "react-icons/fa";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [favorites, setFavorites] = useState([]);

  // Charger les produits
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrer et trier les produits
  useEffect(() => {
    let filtered = products;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Tri
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.prix - b.prix;
        case "price-high":
          return b.prix - a.prix;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/product");
      setProducts(response.data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Animation de confirmation
    setMessage(`✅ ${product.name} ajouté au panier !`);
    
    // Reset message après 2 secondes
    setTimeout(() => setMessage(""), 2000);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = ["all", ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 py-8 px-4">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🛍️ Nos Produits
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez notre collection exclusive de produits marocains soigneusement sélectionnés
        </p>
      </div>

      {/* Message de confirmation */}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
            <div className="flex items-center space-x-2">
              <FaShoppingCart />
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Barre de contrôle */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                <option value="all">Toutes les catégories</option>
                {categories.filter(cat => cat !== "all").map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                <option value="name">Trier par nom</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>

              <button
                onClick={fetchProducts}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FaSyncAlt />
                <span>Actualiser</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-red-600">{products.length}</div>
            <div className="text-gray-600 text-sm">Produits totaux</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
            <div className="text-gray-600 text-sm">Catégories</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{favorites.length}</div>
            <div className="text-gray-600 text-sm">Favoris</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {filteredProducts.length}
            </div>
            <div className="text-gray-600 text-sm">Produits filtrés</div>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image du produit */}
                <div className="relative overflow-hidden">
                  <img
                    src={`http://localhost:3000${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -20%
                    </span>
                    {product.category && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {/* Boutons d'action */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button
                      onClick={() => toggleFavorite(product._id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition duration-300 ${
                        favorites.includes(product._id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <FaHeart className={favorites.includes(product._id) ? "fill-current" : ""} />
                    </button>
                    <Link
                      to={`/product/${product._id}`}
                      className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-red-600 transition duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Évaluation */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="fill-current text-sm" />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs">(4.8)</span>
                  </div>

                  {/* Prix */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.prix} DH
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {(product.prix * 1.2).toFixed(0)} DH
                      </span>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-xl text-sm font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-1"
                    >
                      <FaEye className="text-xs" />
                      <span>Détails</span>
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-xl text-sm font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-1"
                    >
                      <FaShoppingCart className="text-xs" />
                      <span>Panier</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pied de page */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🎁 Livraison gratuite à partir de 200 DH
          </h3>
          <p className="text-gray-600">
            Retour gratuit sous 30 jours • Paiement sécurisé • Service client 7j/7
          </p>
        </div>
      </div>
    </div>
  );
}