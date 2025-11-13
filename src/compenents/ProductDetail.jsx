import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft, FaTag, FaBox, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, FaRecycle } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(item => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Animation de confirmation
    const button = document.getElementById('add-to-cart-btn');
    button.classList.add('bg-green-600');
    setTimeout(() => {
      button.classList.remove('bg-green-600');
      button.classList.add('bg-red-600');
    }, 1000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Animation coeur
    const heart = document.getElementById('favorite-btn');
    heart.classList.add('scale-125');
    setTimeout(() => heart.classList.remove('scale-125'), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Produit non trouvé</h3>
          <button 
            onClick={() => navigate(-1)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300"
          >
            <FaArrowLeft className="inline mr-2" />
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Images simulées (dans un vrai projet, vous auriez plusieurs images)
  const productImages = [
    product.image,
    product.image, // Remplacez par d'autres images si disponibles
    product.image,
    product.image
  ];

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 py-8 px-4">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 hover:text-red-600 transition duration-300"
          >
            <FaArrowLeft className="text-lg" />
            <span>Retour</span>
          </button>
          <span>/</span>
          <span>Produits</span>
          <span>/</span>
          <span className="text-red-600 font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-2xl transition duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Gallery */}
          <div className="lg:w-1/2 p-8">
            <div className="mb-4 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={`http://localhost:3000${productImages[selectedImage]}`}
                alt={product.name}
                className="w-full h-96 object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-4 justify-center">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition duration-300 ${
                    selectedImage === index 
                      ? 'border-red-600 scale-110' 
                      : 'border-gray-300 hover:border-red-400'
                  }`}
                >
                  <img
                    src={`http://localhost:3000${img}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 p-8 bg-gradient-to-b from-white to-gray-50">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <FaTag className="mr-1" />
                {product.category}
              </span>
              <div className="flex space-x-3">
                <button
                  id="favorite-btn"
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full transition duration-300 transform ${
                    isFavorite 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <FaHeart className={isFavorite ? 'fill-current' : ''} />
                </button>
                <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition duration-300">
                  <FaShare />
                </button>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="fill-current" />
                ))}
              </div>
              <span className="text-gray-500">(4.8 · 124 avis)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-red-600">
                  {product.prix} DH
                </span>
                <span className="text-lg text-gray-500 line-through">{(product.prix * 1.2).toFixed(2)} DH</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  -20%
                </span>
              </div>
              <p className="text-green-600 font-semibold mt-2 flex items-center">
                <FaTruck className="mr-2" />
                Livraison gratuite
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">Quantité :</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition duration-300 text-gray-600"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition duration-300 text-gray-600"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500">Stock disponible: 50</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <button
                id="add-to-cart-btn"
                onClick={() => addToCart(product)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <FaShoppingCart />
                <span>Ajouter au panier</span>
              </button>
              
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-3">
                <FaBox />
                <span>Acheter maintenant</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-gray-600">
                <FaTruck className="text-red-600 text-xl" />
                <div>
                  <p className="font-semibold">Livraison rapide</p>
                  <p className="text-sm">2-3 jours</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <FaShieldAlt className="text-green-600 text-xl" />
                <div>
                  <p className="font-semibold">Garantie</p>
                  <p className="text-sm">2 ans</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <FaRecycle className="text-blue-600 text-xl" />
                <div>
                  <p className="font-semibold">Retour facile</p>
                  <p className="text-sm">30 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Description détaillée */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaBox className="mr-3 text-red-600" />
            Description détaillée
          </h3>
          <div className="prose prose-lg text-gray-600">
            <p>
              {product.description} Ce produit exceptionnel allie qualité supérieure et design élégant, 
              parfait pour répondre à tous vos besoins. Fabriqué avec des matériaux de première qualité 
              pour assurer durabilité et satisfaction.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <FaStar className="text-red-600 mr-3" />
                Matériaux de haute qualité
              </li>
              <li className="flex items-center">
                <FaStar className="text-red-600 mr-3" />
                Design marocain authentique
              </li>
              <li className="flex items-center">
                <FaStar className="text-red-600 mr-3" />
                Fabriqué artisanalement
              </li>
            </ul>
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaTag className="mr-3 text-green-600" />
            Caractéristiques
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Catégorie</span>
              <span className="font-semibold text-gray-800">{product.category}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Référence</span>
              <span className="font-semibold text-gray-800">PROD-{product._id?.slice(-8)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Livraison</span>
              <span className="font-semibold text-green-600">Gratuite</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Disponibilité</span>
              <span className="font-semibold text-green-600">En stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}