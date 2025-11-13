import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 📥 Charger les messages depuis le backend
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Erreur chargement contacts", error);
      Swal.fire("❌ Erreur", "Impossible de charger les contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 📧 Fonction pour répondre à un message
  const handleReply = async (email, name) => {
    const { value: text } = await Swal.fire({
      title: `Répondre à ${name}`,
      input: "textarea",
      inputLabel: "Message de réponse",
      inputPlaceholder: "Tapez votre réponse ici...",
      inputAttributes: {
        rows: 6
      },
      showCancelButton: true,
      confirmButtonText: "Envoyer la réponse",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg',
        cancelButton: 'rounded-lg'
      }
    });

    if (text) {
      try {
        await axios.post("http://localhost:3000/contact/reply", {
          email: email,
          subject: "Réponse - Zellige Star",
          message: text,
        });

        Swal.fire({
          title: "✅ Réponse envoyée",
          text: "Votre réponse a été envoyée avec succès !",
          icon: "success",
          confirmButtonColor: "#16a34a",
          customClass: {
            popup: 'rounded-2xl'
          }
        });
      } catch (err) {
        Swal.fire({
          title: "❌ Erreur",
          text: "Échec de l'envoi de l'email",
          icon: "error",
          confirmButtonColor: "#dc2626",
          customClass: {
            popup: 'rounded-2xl'
          }
        });
      }
    }
  };

  // 🗑️ Supprimer un contact
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Supprimer le message de ${name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      customClass: {
        popup: 'rounded-2xl'
      }
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/contact/${id}`);
        Swal.fire({
          title: "✅ Supprimé !",
          text: "Le message a été supprimé avec succès.",
          icon: "success",
          confirmButtonColor: "#16a34a",
          customClass: {
            popup: 'rounded-2xl'
          }
        });
        fetchContacts();
      } catch (error) {
        Swal.fire({
          title: "❌ Erreur",
          text: "Impossible de supprimer le message",
          icon: "error",
          confirmButtonColor: "#dc2626",
          customClass: {
            popup: 'rounded-2xl'
          }
        });
      }
    }
  };

  // 🔍 Filtrage des contacts
  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.object?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              Messages des Clients
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Gérez les demandes et messages de vos clients
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-envelope text-red-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">{contacts.length}</div>
            <div className="text-gray-600">Messages totaux</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-clock text-green-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {contacts.filter(c => !c.replied).length}
            </div>
            <div className="text-gray-600">En attente</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-check-circle text-red-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {contacts.filter(c => c.replied).length}
            </div>
            <div className="text-gray-600">Répondu</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-users text-green-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {new Set(contacts.map(c => c.email)).size}
            </div>
            <div className="text-gray-600">Clients uniques</div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Rechercher un message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 outline-none"
              />
              <i className="fas fa-search absolute left-4 top-3 text-gray-400"></i>
            </div>
            
            <button
              onClick={fetchContacts}
              className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Actualiser
            </button>
          </div>
        </div>

        {/* Liste des messages */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-inbox text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun message trouvé</h3>
              <p className="text-gray-600">
                {searchTerm ? "Aucun message ne correspond à votre recherche." : "Aucun message reçu pour le moment."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Client</th>
                    <th className="px-6 py-4 text-left font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left font-semibold">Sujet</th>
                    <th className="px-6 py-4 text-left font-semibold">Message</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr 
                      key={contact._id} 
                      className="hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                      onClick={() => setSelectedContact(selectedContact?._id === contact._id ? null : contact)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-green-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user text-gray-600"></i>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{contact.name}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(contact.createdAt || contact.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-700">
                            <i className="fas fa-envelope text-red-500 mr-2 w-4"></i>
                            <span className="text-sm">{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-gray-700">
                              <i className="fas fa-phone text-green-500 mr-2 w-4"></i>
                              <span className="text-sm">{contact.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {contact.object}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-gray-700 line-clamp-2">
                            {contact.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReply(contact.email, contact.name);
                            }}
                            className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                            title="Répondre"
                          >
                            <i className="fas fa-reply"></i>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(contact._id, contact.name);
                            }}
                            className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                            title="Supprimer"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedContact(selectedContact?._id === contact._id ? null : contact);
                            }}
                            className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                            title="Voir les détails"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Détails du message sélectionné */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Détails du message</h3>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                    <div className="bg-gray-50 rounded-lg p-3">{selectedContact.name}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="bg-gray-50 rounded-lg p-3">{selectedContact.email}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {selectedContact.phone || "Non renseigné"}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        {selectedContact.object}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                    {selectedContact.description}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleReply(selectedContact.email, selectedContact.name)}
                    className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <i className="fas fa-reply mr-2"></i>
                    Répondre
                  </button>
                  
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}