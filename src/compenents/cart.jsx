import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // ✅ S'assurer que chaque produit a une quantité par défaut = 1
    const initializedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(initializedCart);
  }, []);

  // ✅ Mettre à jour la quantité d’un produit
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, quantity || 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 🔔 Actualiser le compteur du panier (Navbar)
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ❌ Supprimer un produit
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 🔔 Actualiser le compteur du panier
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 🧹 Supprimer tout le panier
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");

    // 🔔 Actualiser le compteur du panier
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 💰 Calculer le total
  const total = cart.reduce(
    (sum, item) => sum + item.prix * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-red-600">🛒 Mon Panier</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Votre panier est vide 😢</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white shadow-md rounded-lg p-4 justify-between hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:3000${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.prix} MAD</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value))
                  }
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Total + boutons */}
          <div className="text-right mt-6 space-y-3">
            <p className="text-xl font-semibold">
              Total: <span className="text-green-600">{total} MAD</span>
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Vider le panier
              </button>

              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all">
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
