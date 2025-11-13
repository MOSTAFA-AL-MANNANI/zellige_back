import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  // Couleurs marocaines
  const colors = {
    primary: {
      red: "#C1272D",
      green: "#006233",
      gold: "#D4AF37",
      lightGold: "#F4E4A6",
      cream: "#F8F5E6"
    }
  };

  // ✅ Récupérer les commandes depuis le backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url =
        filterStatus === "all"
          ? "http://localhost:3000/orders"
          : `http://localhost:3000/orders/status/${filterStatus}`;
      const response = await axios.get(url);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire("❌ Erreur", "Une erreur s'est produite lors de la récupération des commandes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  // ✅ Mettre à jour le statut de la commande
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/orders/${id}/status`, {
        status: newStatus,
      });
      Swal.fire("✅ Succès", "Statut de la commande mis à jour avec succès", "success");
      fetchOrders();
    } catch (error) {
      console.error(error);
      Swal.fire("❌ Erreur", "Impossible de mettre à jour le statut", "error");
    }
  };

  const statuses = [
    { value: "pending", label: "En attente", color: "bg-yellow-500" },
    { value: "processing", label: "En traitement", color: "bg-blue-500" },
    { value: "shipped", label: "Expédiée", color: "bg-purple-500" },
    { value: "delivered", label: "Livrée", color: "bg-green-600" },
    { value: "cancelled", label: "Annulée", color: "bg-red-500" },
  ];

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.color : "bg-gray-500";
  };

  const getStatusLabel = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-rose-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">⏳ Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="p-10 bg-gradient-to-br from-rose-50 to-emerald-50 min-h-screen">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📦 Gestion des Commandes
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto rounded-full"></div>
      </div>

      {/* Contrôles */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Boutons de vue */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-3 rounded-xl transition duration-300 ${
                  viewMode === "table" 
                    ? "bg-red-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📊 Tableau
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 rounded-xl transition duration-300 ${
                  viewMode === "grid" 
                    ? "bg-green-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🏠 Grille
              </button>
            </div>
          </div>

          {/* Bouton d'actualisation */}
          <button
            onClick={fetchOrders}
            className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Actualiser
          </button>
        </div>
      </div>

      {/* Affichage des commandes */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Aucune commande trouvée</h3>
          <p className="text-gray-500">Aucune commande ne correspond aux critères de filtrage</p>
        </div>
      ) : viewMode === "table" ? (
        /* Vue Tableau */
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl transition duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-green-600 text-white">
                  <th className="px-6 py-4 text-right font-semibold">Client</th>
                  <th className="px-6 py-4 text-right font-semibold">Produits</th>
                  <th className="px-6 py-4 text-right font-semibold">Prix Total</th>
                  <th className="px-6 py-4 text-right font-semibold">Statut</th>
                  <th className="px-6 py-4 text-right font-semibold">Date de Création</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr 
                    key={order._id} 
                    className="hover:bg-gradient-to-r hover:from-rose-50 hover:to-emerald-50 transition duration-300 group"
                  >
                    <td className="px-6 py-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 group-hover:text-red-600 transition duration-300">
                          {order.clientId?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.clientId?.email || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.products.map((p, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm">
                            <span className="text-red-500">🛍️</span>
                            <span className="text-gray-700">{p.productId?.name || "Produit supprimé"}</span>
                            <span className="text-gray-500">× {p.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600 text-lg">
                        {order.totalPrice} DH
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-2 rounded-full text-white text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        value={order.status}
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Vue Grille */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-l-4 border-red-600"
            >
              {/* En-tête de la carte */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Commande #{order._id.slice(-6)}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              {/* Informations client */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">{order.clientId?.name || "N/A"}</p>
                <p className="text-sm text-gray-500">{order.clientId?.email || "N/A"}</p>
              </div>

              {/* Produits */}
              <div className="mb-4 space-y-2">
                <h4 className="font-semibold text-gray-700 mb-2">📦 Produits:</h4>
                {order.products.map((p, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{p.productId?.name || "Produit supprimé"}</span>
                    <span className="text-gray-500">× {p.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Prix et actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-green-600 text-xl">
                  {order.totalPrice} DH
                </span>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  value={order.status}
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistiques rapides */}
      {orders.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Résumé des Commandes</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statuses.map((status) => (
              <div key={status.value} className="text-center p-3 rounded-lg bg-gray-50">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${status.color}`}></div>
                <p className="text-sm text-gray-600">{status.label}</p>
                <p className="font-bold text-gray-800">
                  {orders.filter(order => order.status === status.value).length}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}