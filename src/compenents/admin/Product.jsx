import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      const res = await fetch("https://marocstar-back.vercel.app/product"); // تعديل حسب رابط السيرفر
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
      const url = editId ? `https://marocstar-back.vercel.app/product/${editId}` : `https://marocstar-back.vercel.app/product`;

      const res = await fetch(url, { method, body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Erreur serveur");

      Swal.fire({ icon: "success", title: editId ? "Produit modifié" : "Produit ajouté", timer: 1500 });
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`https://marocstar-back.vercel.app/product/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      Swal.fire({ icon: "success", title: "Supprimé", timer: 1500 });
      fetchProducts();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erreur", text: error.message });
    }
  };

  return (
    <div className="py-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Rechercher..."
            className="border rounded-lg p-3 w-1/2 focus:ring-2 focus:ring-indigo-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => openModal()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Ajouter produit
          </button>
        </div>

        {/* PRODUITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="font-bold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600 truncate">{product.description}</p>
              <p className="font-semibold mt-1">{product.prix} DH</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openModal(product)}
                  className="flex-1 bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => openDetail(product)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL ADD / EDIT */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4">{editId ? "Modifier Produit" : "Ajouter Produit"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Catégorie"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={form.prix}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input type="file" name="image" onChange={handleChange} className="w-full" />
              {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover mt-2" />}
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={closeModal} className="flex-1 bg-gray-400 text-white py-2 rounded">
                  Annuler
                </button>
                <button type="submit" className="flex-1 bg-green-500 text-white py-2 rounded">
                  {editId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETAIL */}
      {showDetailModal && detailProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{detailProduct.name}</h2>
            <img src={detailProduct.image} alt={detailProduct.name} className="w-full h-64 object-cover rounded" />
            <p className="mt-2">{detailProduct.description}</p>
            <p className="mt-2 font-semibold">{detailProduct.prix} DH</p>
            <p className="mt-2">Stock: {detailProduct.stock}</p>
            <p className="mt-2">Catégorie: {detailProduct.category}</p>
            <button
              onClick={closeDetail}
              className="mt-4 bg-gray-400 text-white py-2 rounded w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
