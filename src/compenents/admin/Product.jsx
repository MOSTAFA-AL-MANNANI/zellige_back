import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Products() {
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

  // 🔹 Récupérer les produits
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://marocstar-back.vercel.app/product");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Échec de la récupération des produits',
        confirmButtonColor: '#dc2626',
        background: '#ffffff',
        color: '#1f2937'
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Recherche de produits
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Gérer les changements de formulaire
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Ouvrir le modal
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
      setPreview(`https://marocstar-back.vercel.app${product.image}`);
      setEditId(product._id);
    } else {
      setForm({ name: "", description: "", prix: "", stock: "", category: "", image: null });
      setPreview(null);
      setEditId(null);
    }
    setShowModal(true);
  };

  // 🔹 Fermer le modal
  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", description: "", prix: "", stock: "", category: "", image: null });
    setPreview(null);
    setEditId(null);
  };

  // 🔹 Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `https://marocstar-back.vercel.app/product/${editId}`
        : "https://marocstar-back.vercel.app/product";

      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      await fetch(url, { method, body: formData });
      
      Swal.fire({
        icon: 'success',
        title: editId ? 'Modifié !' : 'Ajouté !',
        text: editId ? 'Produit modifié avec succès' : 'Produit ajouté avec succès',
        confirmButtonColor: '#16a34a',
        background: '#ffffff',
        color: '#1f2937',
        timer: 2000
      });

      closeModal();
      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Échec de la sauvegarde du produit',
        confirmButtonColor: '#dc2626',
        background: '#ffffff',
        color: '#1f2937'
      });
    }
  };

  // 🔹 Supprimer un produit
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
      background: '#ffffff',
      color: '#1f2937'
    });

    if (result.isConfirmed) {
      try {
        await fetch(`https://marocstar-back.vercel.app/product/${id}`, { method: "DELETE" });
        
        Swal.fire({
          icon: 'success',
          title: 'Supprimé !',
          text: 'Produit supprimé avec succès',
          confirmButtonColor: '#16a34a',
          background: '#ffffff',
          color: '#1f2937',
          timer: 2000
        });
        
        fetchProducts();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Échec de la suppression du produit',
          confirmButtonColor: '#dc2626',
          background: '#ffffff',
          color: '#1f2937'
        });
      }
    }
  };

  return (
    
    <div className="py-20 min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec animation */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-4">
            🛍️ Gestion des Produits
          </h1>
          <p className="text-gray-600 text-lg">Gérez votre inventaire en toute simplicité</p>
        </div>

        {/* Barre de contrôle */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 border border-red-100 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="🔍 Rechercher un produit ou catégorie..."
                className="w-full p-4 pl-12 border-2 border-green-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Bouton d'ajout */}
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouveau Produit
            </button>
          </div>
        </div>

        {/* Cartes des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Image du produit */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`https://marocstar-back.vercel.app${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {product.stock} unités
                  </span>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-4">
                <div className="mb-3">
                  <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    {product.prix} DH
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message vide */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-red-100 animate-pulse">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {searchTerm ? 'Aucun produit trouvé' : 'Aucun produit disponible'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Commencez par ajouter votre premier produit'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Ajouter le premier produit
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Canvas */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform scale-95 hover:scale-100 transition-transform duration-300">
            {/* Header du modal */}
            <div className="bg-gradient-to-r from-red-500 to-green-500 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editId ? '✏️ Modifier le Produit' : '➕ Nouveau Produit'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-red-200 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Nom du Produit *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                    placeholder="Nom du produit"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Catégorie</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                    placeholder="Catégorie"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Prix (DH) *</label>
                  <input
                    type="number"
                    name="prix"
                    value={form.prix}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                    placeholder="Quantité"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                  placeholder="Description du produit..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Image du Produit</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all duration-300"
                />
              </div>

              {/* Aperçu de l'image */}
              {preview && (
                <div className="text-center p-4 border-2 border-dashed border-green-200 rounded-xl bg-green-50">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Aperçu de l'image :</p>
                  <img
                    src={preview}
                    alt="Aperçu"
                    className="w-32 h-32 object-cover mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Actions du formulaire */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-semibold transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {editId ? '💾 Enregistrer' : '➕ Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
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