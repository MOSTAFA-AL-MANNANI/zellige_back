import React, { useState } from 'react';

export default function Contact (){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    object: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('✅ Message envoyé avec succès !');
        setFormData({
          name: '',
          email: '',
          phone: '',
          object: '',
          description: ''
        });
      } else {
        setSubmitMessage('❌ Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      setSubmitMessage('❌ Erreur de connexion au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              Contactez-Nous
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions sur nos produits marocains
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulaire de Contact */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Envoyez-nous un <span className="text-red-600">Message</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Remplissez le formulaire et nous vous répondrons dans les plus brefs délais
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Téléphone et Objet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="+212 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="object" className="block text-sm font-semibold text-gray-700 mb-2">
                    Objet *
                  </label>
                  <select
                    id="object"
                    name="object"
                    value={formData.object}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Sélectionnez un objet</option>
                    <option value="information">Information produit</option>
                    <option value="commande">Commande</option>
                    <option value="livraison">Livraison</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
              </div>

              {/* Bouton Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer le Message'
                )}
              </button>

              {/* Message de statut */}
              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-semibold ${
                  submitMessage.includes('✅') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Carte et Informations de Contact */}
          <div className="space-y-8">
            
            {/* Carte Google Maps */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-red-100 to-green-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Notre Boutique</h3>
                  <p className="text-gray-600">Marrakech, Maroc</p>
                  <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                    Voir sur Google Maps
                  </button>
                </div>
              </div>
            </div>

            {/* Informations de Contact */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Nos <span className="text-green-600">Coordonnées</span>
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: 'fa-solid fa-envelope',
                    title: 'Email',
                    content: 'contact@zelligestar.ma',
                    color: 'red'
                  },
                  {
                    icon: 'fa-solid fa-phone',
                    title: 'Téléphone',
                    content: '+212 5XX-XXXXXX',
                    color: 'green'
                  },
                  {
                    icon: 'fa-solid fa-hourglass-clock',
                    title: 'Horaires',
                    content: 'Lun - Ven: 9h - 18h\nSam: 10h - 16h',
                    color: 'red'
                  },
                  {
                    icon: 'fa-solid fa-location-dot',
                    title: 'Adresse',
                    content: '123 Avenue Mohammed VI\nMarrakech 40000, Maroc',
                    color: 'green'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${
                      item.color === 'red' ? 'bg-red-100' : 'bg-green-100'
                    } rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xl"><i class={item.icon}></i></span>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        item.color === 'red' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Réseaux Sociaux */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'Facebook', icon: 'fa-brands fa-facebook', color: 'blue' },
                    { name: 'Instagram', icon: 'fa-brands fa-instagram', color: 'pink' },
                    { name: 'Twitter', icon: 'fa-brands fa-square-twitter', color: 'blue' },
                    { name: 'YouTube', icon: 'fa-brands fa-youtube', color: 'red' }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors duration-300 transform hover:scale-110"
                      title={social.name}
                    >
                      <span className="text-xl"><i class={social.icon}></i></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

