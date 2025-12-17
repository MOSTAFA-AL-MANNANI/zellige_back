import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaTimes, FaTag, FaBox, FaDollarSign, FaWarehouse } from "react-icons/fa";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    prix: "",
    stock: "",
    category: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // 🔹 FETCH PRODUITS
  // -------------------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/product");
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erreur", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // -------------------------------
  // 🔹 SEARCH
  // -------------------------------
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------------
  // 🔹 HANDLE FORM INPUT
  // -------------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // -------------------------------
  // 🔹 OPEN MODAL (Add / Edit)
  // -------------------------------
  const openModal = (product = null) => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        prix: product.prix,
        stock: product.stock,
        category: product.category,
        image: null,
      });
      setPreview(product.image || null);
      setEditId(product._id);
    } else {
      setForm({ name: "", description: "", prix: "", stock: "", category: "", image: null });
      setPreview(null);
      setEditId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", description: "", prix: "", stock: "", category: "", image: null });
    setPreview(null);
    setEditId(null);
  };

  // -------------------------------
  // 🔹 OPEN DETAIL MODAL
  // -------------------------------
  const openDetail = (product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
  };
  const closeDetail = () => {
    setShowDetailModal(false);
    setDetailProduct(null);
  };

  // -------------------------------
  // 🔹 VALIDATION
  // -------------------------------
  const validateForm = () => {
    if (!form.name.trim()) return Swal.fire({ icon: "error", title: "Erreur", text: "Nom requis" });
    if (!form.prix || parseFloat(form.prix) <= 0)
      return Swal.fire({ icon: "error", title: "Erreur", text: "Prix invalide" });
    if (!form.stock || parseInt(form.stock) < 0)
      return Swal.fire({ icon: "error", title: "Erreur", text: "Stock invalide" });
    return true;
  };

  // -------------------------------
  // 🔹 SUBMIT FORM
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("prix", form.prix);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      if (form.image instanceof File) formData.append("image", form.image);

      const method = editId ? "PUT" : "POST";
      const url = editId ? `http://localhost:3000/product/${editId}` : `http://localhost:3000/product`;

      const res = await fetch(url, { method, body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Erreur serveur");

      Swal.fire({ 
        icon: "success", 
        title: editId ? "Produit modifié" : "Produit ajouté",
        showConfirmButton: false,
        timer: 1500,
        background: '#10b981',
        color: 'white'
      });
      closeModal();
      fetchProducts();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erreur", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 🔹 DELETE PRODUCT
  // -------------------------------
  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Supprimer ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/product/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      Swal.fire({ 
        icon: "success", 
        title: "Supprimé",
        showConfirmButton: false,
        timer: 1500,
        background: '#ef4444',
        color: 'white'
      });
      fetchProducts();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erreur", text: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Produits</h1>
          <p className="text-gray-600">Administrez votre catalogue de produits</p>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-1/2 lg:w-2/5">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit ou catégorie..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaPlus />
            <span className="font-semibold">Ajouter produit</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-200"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={product.image || "/placeholder-image.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category || "Non catégorisé"}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-emerald-500" />
                    <span className="font-bold text-xl text-gray-900">{product.prix} DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaWarehouse className="text-blue-500" />
                    <span className={`font-semibold ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock} en stock
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white py-2.5 rounded-xl hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <FaEdit />
                    <span className="font-medium">Modifier</span>
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2.5 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <FaTrash />
                    <span className="font-medium">Supprimer</span>
                  </button>
                  <button
                    onClick={() => openDetail(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <FaEye />
                    <span className="font-medium">Voir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">
              <FaBox />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}

        {/* MODAL ADD / EDIT */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editId ? "Modifier Produit" : "Ajouter Produit"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Catégorie"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prix (DH)</label>
                    <input
                      type="number"
                      name="prix"
                      placeholder="Prix"
                      value={form.prix}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      value={form.stock}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    placeholder="Description détaillée du produit..."
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors duration-300">
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="w-full cursor-pointer"
                      accept="image/*"
                    />
                    <p className="text-sm text-gray-500 mt-2">Glissez-déposez ou cliquez pour télécharger</p>
                  </div>
                </div>

                {preview && (
                  <div className="flex justify-center">
                    <img 
                      src={preview} 
                      alt="preview" 
                      className="w-48 h-48 object-cover rounded-xl shadow-md border border-gray-200" 
                    />
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3.5 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3.5 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-[1.02] font-medium"
                  >
                    {editId ? "Mettre à jour" : "Créer produit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DETAIL */}
        {showDetailModal && detailProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{detailProduct.name}</h2>
                    <div className="inline-flex items-center gap-1 mt-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                      <FaTag size={12} />
                      {detailProduct.category || "Non catégorisé"}
                    </div>
                  </div>
                  <button
                    onClick={closeDetail}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <img 
                  src={detailProduct.image} 
                  alt={detailProduct.name} 
                  className="w-full h-64 object-cover rounded-xl mb-6 border border-gray-200" 
                />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <p className="text-gray-800">{detailProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <FaDollarSign className="text-emerald-500" />
                        <h3 className="text-sm font-medium text-gray-500">Prix</h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{detailProduct.prix} DH</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <FaBox className="text-blue-500" />
                        <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                      </div>
                      <p className={`text-2xl font-bold ${detailProduct.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                        {detailProduct.stock} unités
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={closeDetail}
                    className="w-full mt-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3.5 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-medium"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}