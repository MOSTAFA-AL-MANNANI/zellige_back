import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Champs requis",
        text: "Veuillez saisir l'email et le mot de passe",
        confirmButtonColor: '#dc2626',
        background: '#ffffff'
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/admins/login", {
        email,
        password,
      });

      // ✅ Sauvegarder le token dans localStorage
      localStorage.setItem("adminToken", res.data.token);

      Swal.fire({
        icon: "success",
        title: "Connexion réussie !",
        text: "Bienvenue dans le panneau d'administration",
        confirmButtonColor: '#16a34a',
        background: '#ffffff',
        timer: 2000,
        showConfirmButton: false
      });

      // 🔄 Redirection après un délai
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Une erreur est survenue lors de la connexion";
      
      Swal.fire({
        icon: "error",
        title: "Erreur de connexion",
        text: errorMessage,
        confirmButtonColor: '#dc2626',
        background: '#ffffff'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Animation de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Carte de connexion */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-500 overflow-hidden">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-red-500 to-green-500 p-6 text-center">
<div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
  <img className="w-18 h-16" src="/logo.png" alt="Logo" />
</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Administration
            </h1>
            <p className="text-red-100 text-sm">
              Accès sécurisé au panneau de gestion
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {/* Champ Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Adresse Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-12 border-2 border-green-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white placeholder-gray-400"
                  placeholder="votre@email.com"
                  disabled={loading}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 border-2 border-green-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white placeholder-gray-400"
                  placeholder="Votre mot de passe"
                  disabled={loading}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transform transition-all duration-300 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Se connecter</span>
                </div>
              )}
            </button>

            {/* Informations de sécurité */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                🔒 Accès réservé aux administrateurs autorisés
              </p>
            </div>
          </form>
        </div>

        {/* Message de bienvenue */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 animate-pulse">
            Bienvenue dans l'interface d'administration
          </p>
        </div>
      </div>

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}