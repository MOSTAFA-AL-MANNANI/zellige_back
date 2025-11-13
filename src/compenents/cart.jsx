import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initializedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(initializedCart);
    setIsLoading(false);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, quantity || 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const incrementQuantity = (id) => {
    const item = cart.find(item => item._id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id) => {
    const item = cart.find(item => item._id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.prix * item.quantity,
    0
  );

  const itemsCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              Mon Panier
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {cart.length === 0 
              ? "Votre panier vous attend 🌟" 
              : `${itemsCount} article${itemsCount > 1 ? 's' : ''} dans votre panier`}
          </p>
        </div>

        {cart.length === 0 ? (
          // Panier Vide
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Panier Vide</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explorez notre collection de produits marocains authentiques et trouvez des trésors qui vous ressemblent.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-red-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-store mr-3"></i>
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          // Panier avec Articles
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Liste des Articles */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={`http://localhost:3000${item.image}`}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-md"
                      />
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Détails Produit */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-semibold text-lg mb-3">
                        {item.prix} MAD
                      </p>
                      
                      {/* Contrôle Quantité */}
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-gray-700 font-medium">Quantité:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => decrementQuantity(item._id)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <i className="fas fa-minus text-gray-600 text-xs"></i>
                          </button>
                          
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                              updateQuantity(item._id, parseInt(e.target.value) || 1)
                            }
                            className="w-16 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          
                          <button
                            onClick={() => incrementQuantity(item._id)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-200"
                          >
                            <i className="fas fa-plus text-gray-600 text-xs"></i>
                          </button>
                        </div>
                      </div>

                      {/* Sous-total */}
                      <div className="text-lg font-semibold text-gray-800">
                        Sous-total: <span className="text-red-600">{item.prix * item.quantity} MAD</span>
                      </div>
                    </div>

                    {/* Bouton Supprimer */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200 p-2"
                      title="Supprimer l'article"
                    >
                      <i className="fas fa-trash-alt mr-2"></i>
                      <span className="hidden sm:inline">Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé de Commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <i className="fas fa-receipt text-green-600 mr-3"></i>
                  Résumé
                </h3>

                {/* Détails Prix */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total ({itemsCount} article{itemsCount > 1 ? 's' : ''})</span>
                    <span>{total} MAD</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-red-600">{total} MAD</span>
                    </div>
                  </div>
                </div>

                {/* Boutons d'Action */}
                <div className="space-y-4">
                  <Link
                    to="/checkout"
                    className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    <i className="fas fa-lock mr-3"></i>
                    Commander Maintenant
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full border-2 border-red-600 text-red-600 py-3 px-6 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <i className="fas fa-trash-alt mr-3"></i>
                    Vider le Panier
                  </button>

                  <Link
                    to="/products"
                    className="w-full border-2 border-green-600 text-green-600 py-3 px-6 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <i className="fas fa-arrow-left mr-3"></i>
                    Continuer les Achats
                  </Link>
                </div>

                {/* Sécurité */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                      <span>Paiement Sécurisé</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-truck text-red-600 mr-2"></i>
                      <span>Livraison Rapide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Produits Recommandés (Section Optionnelle) */}
        {cart.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Produits <span className="text-green-600">Recommandés</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg p-4 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-full h-32 bg-gradient-to-br from-red-100 to-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <i className="fas fa-gift text-3xl text-gray-400"></i>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Produit Recommandé {item}</h4>
                  <p className="text-red-600 font-bold mb-3">99 MAD</p>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300">
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}