import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adresse: "",
    city: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.prix * (item.quantity || 1), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (cart.length === 0) {
      setMessage("❌ Votre panier est vide !");
      setIsSubmitting(false);
      return;
    }

    try {
      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity || 1,
      }));

      const orderData = {
        ...formData,
        products,
        totalPrice,
      };

      const res = await axios.post("http://localhost:3000/create-order", orderData);

      setMessage("✅ Commande enregistrée avec succès !");
      localStorage.removeItem("cart");
      setFormData({ name: "", email: "", phone: "", adresse: "", city: "" });
      setCart([]);
      
      // 🔔 Actualiser le compteur du panier
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'envoi de la commande !");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              Finaliser la Commande
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Complétez vos informations pour finaliser votre achat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formulaire */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="fas fa-user-circle text-red-600 mr-3"></i>
              Informations Personnelles
            </h2>

            {message && (
              <div
                className={`mb-6 p-4 rounded-xl text-center font-semibold transform transition-all duration-500 ${
                  message.startsWith("✅")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                } ${message ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="flex items-center justify-center">
                  <i className={`fas ${message.startsWith("✅") ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
                  {message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom Complet *
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 outline-none"
                    />
                    <i className="fas fa-user absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 outline-none"
                    />
                    <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+212 XXX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 outline-none"
                    />
                    <i className="fas fa-phone absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville *
                  </label>
                  <div className="relative">
                    <input
                      name="city"
                      placeholder="Votre ville"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 outline-none"
                    />
                    <i className="fas fa-city absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse Complète *
                </label>
                <div className="relative">
                  <textarea
                    name="adresse"
                    placeholder="Votre adresse complète (rue, quartier, code postal...)"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                  ></textarea>
                  <i className="fas fa-map-marker-alt absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>

              {/* Méthode de Livraison */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <i className="fas fa-truck text-green-600 mr-2"></i>
                  Méthode de Livraison
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'standard', name: 'Livraison Standard', price: '30 MAD', time: '3-5 jours', icon: 'fas fa-truck' },
                    { id: 'express', name: 'Livraison Express', price: '60 MAD', time: '1-2 jours', icon: 'fas fa-bolt' }
                  ].map((method) => (
                    <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-red-300 cursor-pointer transition-colors duration-200">
                      <input type="radio" name="delivery" className="text-red-600 focus:ring-red-500 mr-3" defaultChecked={method.id === 'standard'} />
                      <i className={`${method.icon} text-red-600 mr-3`}></i>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.time} • {method.price}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-lock mr-3"></i>
                    Payer Maintenant ({totalPrice} MAD)
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Récapitulatif de la Commande */}
          <div className="space-y-6">
            
            {/* Panier */}
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="fas fa-shopping-bag text-green-600 mr-3"></i>
                Votre Commande
              </h3>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <img
                        src={`http://localhost:3000${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{item.prix} MAD</span>
                          <span>×</span>
                          <span>{item.quantity || 1}</span>
                        </div>
                      </div>
                      <div className="text-green-600 font-semibold">
                        {item.prix * (item.quantity || 1)} MAD
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-600">30 MAD</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-red-600">{totalPrice + 30} MAD</span>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-3xl shadow-lg p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-shield-alt text-red-600 mr-2"></i>
                Paiement Sécurisé
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="fas fa-lock text-green-600 mr-3"></i>
                  <span>Transactions cryptées et sécurisées</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-credit-card text-red-600 mr-3"></i>
                  <span>Multiples méthodes de paiement acceptées</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-truck text-green-600 mr-3"></i>
                  <span>Livraison garantie sous 5 jours</span>
                </div>
              </div>

              {/* Méthodes de Paiement */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-center space-x-4">
                  {['fab fa-cc-visa', 'fab fa-cc-mastercard', 'fab fa-cc-paypal', 'fas fa-university'].map((icon, index) => (
                    <div key={index} className="w-10 h-6 bg-white rounded shadow-sm flex items-center justify-center">
                      <i className={`${icon} text-gray-600`}></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lien Retour */}
            <Link
              to="/cart"
              className="flex items-center justify-center text-red-600 hover:text-red-700 transition-colors duration-200 font-semibold"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Retour au panier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}