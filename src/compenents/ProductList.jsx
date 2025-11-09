import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(""); // ✅ message visuel après ajout

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  // ✅ Ajouter au panier
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Vérifier si le produit existe déjà
    const existingProduct = existingCart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Augmente la quantité
    } else {
      existingCart.push({ ...product, quantity: 1 }); // Ajout avec quantité initiale
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // ✅ Affichage message visuel temporaire
    setMessage(`✅ ${product.name} ajouté au panier !`);

    // 🔄 Recharger la page après 1 seconde pour mise à jour visuelle
    setTimeout(() => {
      setMessage("");
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">🛍️ Liste des Produits</h2>

      {/* ✅ Message de confirmation */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center font-medium transition-all">
          {message}
        </div>
      )}

      {/* ✅ Liste des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <img
              src={`http://localhost:3000${p.image}`}
              alt={p.name}
              className="h-48 w-full object-cover mb-3 rounded-lg"
            />
            <h3 className="text-lg font-bold mb-1">{p.name}</h3>
            <p className="text-red-600 font-semibold mb-2">{p.prix} MAD</p>

            <div className="flex justify-between mt-auto">
              <Link
                to={`/product/${p._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all"
              >
                التفاصيل
              </Link>
              <button
                onClick={() => addToCart(p)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-all"
              >
                🛒 Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
