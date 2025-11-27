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
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // 🔹 FETCH PRODUITS
  // -------------------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://marocstar-back.vercel.app/product");

      if (!res.ok) throw new Error(`Erreur ${res.status}`);

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de récupérer les produits',
      });
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
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------------
  // 🔹 HANDLE FORM INPUT
  // -------------------------------
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

  // -------------------------------
  // 🔹 OPEN MODAL
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
      setPreview(product.image ? `https://marocstar-back.vercel.app${product.image}` : null);
      setEditId(product._id);
    } else {
      setForm({ name: "", description: "", prix: "", stock: "", category: "", image: null });
      setPreview(null);
      setEditId(null);
    }
    setShowModal(true);
  };

  // -------------------------------
  // 🔹 CLOSE MODAL
  // -------------------------------
  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", description: "", prix: "", stock: "", category: "", image: null });
    setPreview(null);
    setEditId(null);
  };

  // -------------------------------
  // 🔹 VALIDATION
  // -------------------------------
  const validateForm = () => {
    if (!form.name.trim()) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Nom requis' });
      return false;
    }
    if (!form.prix || parseFloat(form.prix) <= 0) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Prix invalide' });
      return false;
    }
    if (!form.stock || parseInt(form.stock) < 0) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Stock invalide' });
      return false;
    }
    return true;
  };

  // -------------------------------
  // 🔹 SUBMIT FORM (FIXED)
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("prix", parseFloat(form.prix));
      formData.append("stock", parseInt(form.stock));
      formData.append("category", form.category);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `https://marocstar-back.vercel.app/product/${editId}`
        : "https://marocstar-back.vercel.app/product";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      // ----------- FIX ICI -----------
      // Lecture body une seule fois
      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }
      // --------------------------------

      if (!response.ok) {
        throw new Error(result.message || `Erreur ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: editId ? 'Produit modifié' : 'Produit ajouté',
        timer: 1500
      });

      closeModal();
      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur serveur',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 🔹 DELETE
  // -------------------------------
  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: 'Supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`https://marocstar-back.vercel.app/product/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Erreur suppression");

      Swal.fire({
        icon: 'success',
        title: 'Supprimé',
        timer: 1500
      });

      fetchProducts();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: error.message });
    }
  };


  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec animation */}
        <div className="text-center mb-8">
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
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Chargement...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouveau Produit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg">
              <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-semibold">Chargement des produits...</span>
            </div>
          </div>
        )}

        {/* Cartes des produits */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Image du produit */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image ? `https://marocstar-back.vercel.app${product.image}` : '/placeholder-image.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTZhZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPsKbSW1hZ2Ugbm9uIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
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
                      {product.category || 'Non catégorisé'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description || 'Aucune description'}
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
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1 disabled:opacity-50"
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
        )}

        {/* Message vide */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-red-100">
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
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
              >
                Ajouter le premier produit
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Canvas */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header du modal */}
            <div className="bg-gradient-to-r from-red-500 to-green-500 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editId ? '✏️ Modifier le Produit' : '➕ Nouveau Produit'}
                </h2>
                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="text-white hover:text-red-200 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 disabled:opacity-50"
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
                    disabled={loading}
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 disabled:opacity-50"
                    placeholder="Nom du produit"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Catégorie</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 disabled:opacity-50"
                    placeholder="Catégorie"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Prix (DH) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="prix"
                    value={form.prix}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 disabled:opacity-50"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Stock *</label>
                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 disabled:opacity-50"
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
                  disabled={loading}
                  className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 disabled:opacity-50"
                  placeholder="Description du produit..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Image du Produit {!editId && '*'}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  disabled={loading}
                  className="w-full border-2 border-green-200 rounded-xl p-3 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all duration-300 disabled:opacity-50"
                />
                <p className="text-xs text-gray-500">
                  {editId ? "Laisser vide pour conserver l'image actuelle" : "Image requise pour les nouveaux produits"}
                </p>
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
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-semibold transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editId ? 'Modification...' : 'Ajout...'}
                    </>
                  ) : (
                    <>
                      {editId ? '💾 Enregistrer' : '➕ Ajouter'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}