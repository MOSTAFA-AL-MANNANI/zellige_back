import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import Swal from "sweetalert2";

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get("https://marocstar-back.vercel.app/dashboard/stats");
      setStats(response.data.stats);
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire("❌ Erreur", "Une erreur s'est produite lors du chargement des statistiques", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Couleurs marocaines - Rouge et Vert
  const colors = {
    primary: {
      red: "#C1272D", // Rouge marocain
      green: "#006233", // Vert marocain
      gold: "#D4AF37", // Or
      lightGold: "#F4E4A6", // Or clair
      cream: "#F8F5E6" // Crème
    }
  };

  const statusColors = {
    "En attente": colors.primary.gold,
    "Confirmé": colors.primary.green,
    "Expédié": "#3b82f6",
    "Livré": colors.primary.red,
    "Annulé": "#6b7280"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg bg-gradient-to-br from-rose-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl">⏳ Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-rose-50 to-emerald-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-xl text-red-600 font-semibold">Échec du chargement des statistiques</p>
          <button 
            onClick={fetchStats}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const chartData = Object.entries(stats.ordersByStatus).map(([status, count]) => ({
    status,
    count,
    color: statusColors[status] || colors.primary.red
  }));

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 p-6">
      {/* En-tête */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📊 Tableau de Bord Administratif
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto rounded-full"></div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Carte Produits */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-red-600 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Produits Totaux</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-red-600">📦</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Gestion des produits</p>
          </div>
        </div>

        {/* Carte Clients */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-green-600 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Clients Inscrits</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-green-600">👥</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Base de clients</p>
          </div>
        </div>

        {/* Carte Commandes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-yellow-500 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Commandes Totales</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-yellow-600">📋</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Toutes les commandes</p>
          </div>
        </div>

        {/* Carte Ventes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-purple-600 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Chiffre d'Affaires</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalSales} DH</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-purple-600">💰</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Revenu total</p>
          </div>
        </div>
      </div>

      {/* Graphique des commandes par statut */}
      <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            📈 Commandes par Statut
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Statuts des commandes</span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="status" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#4b5563' }}
              />
              <YAxis 
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#4b5563' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                itemStyle={{ color: colors.primary.red }}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Légende des statuts */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-600">{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pied de page décoratif */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-gray-500 text-sm mt-2">Tableau de bord mis à jour en temps réel</p>
      </div>
    </div>
  );
}