import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ vérifier si produit existe déjà
  const existingProduct = existingCart.find(item => item._id === product._id);

  if (existingProduct) {
    // 🧩 produit existe → augmenter la quantité
    existingProduct.quantity += 1;
  } else {
    // 🆕 nouveau produit → ajouter avec quantité = 1
    existingCart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));
  alert("Produit ajouté au panier ✅");
};


  if (!product) return <p className="p-6">جارٍ التحميل...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      <img
        src={`http://localhost:3000${product.image}`}
        alt={product.name}
        className="w-full md:w-1/2 h-auto object-cover rounded"
      />
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-red-600 font-bold text-xl">{product.prix} DH</p>
        <p className="text-green-600 font-medium">الفئة: {product.category}</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={addToCart}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🛒 إضافة للسلة
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            العودة
          </button>
        </div>
      </div>
    </div>
  );
}
