import React from 'react';

export default function Footer ()  {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-red-900 to-green-900 text-white">
      {/* Section Principale du Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1 - Logo et Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold text-lg">
                  <img src="logo.png" className='w-12' alt="" />
                </span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent">
                Moroccan Star
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre destination premium pour les produits souvenirs marocains authentiques. 
              Nous célébrons l'artisanat traditionnel avec une touche moderne.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: 'fab fa-facebook-f', name: 'Facebook', url: '#' },
                { icon: 'fab fa-instagram', name: 'Instagram', url: '#' },
                { icon: 'fab fa-twitter', name: 'Twitter', url: '#' },
                { icon: 'fab fa-linkedin-in', name: 'LinkedIn', url: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                  title={social.name}
                >
                  <i className={`${social.icon} text-white`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Liens Rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <i className="fas fa-link text-red-500 mr-2 text-sm"></i>
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', url: '/', icon: 'fas fa-home' },
                { name: 'À Propos', url: '/about', icon: 'fas fa-info-circle' },
                { name: 'Nos Produits', url: '/products', icon: 'fas fa-tshirt' },
                { name: 'Collections', url: '/collections', icon: 'fas fa-gem' },
                { name: 'Promotions', url: '/sales', icon: 'fas fa-tag' },
                { name: 'Nouveautés', url: '/new', icon: 'fas fa-fire' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <i className={`${link.icon} text-green-500 mr-3 text-xs w-4`}></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Catégories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <i className="fas fa-th-large text-green-500 mr-2 text-sm"></i>
              Catégories
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'T-shirts Marocains', url: '/category/tshirts', icon: 'fas fa-tshirt' },
                { name: 'Caps Traditionnelles', url: '/category/caps', icon: 'fas fa-hat-cowboy' },
                { name: 'Accessoires', url: '/category/accessories', icon: 'fas fa-ring' },
                { name: 'Décoration', url: '/category/decor', icon: 'fas fa-home' },
                { name: 'Cadeaux', url: '/category/gifts', icon: 'fas fa-gift' },
                { name: 'Collections Limitées', url: '/category/limited', icon: 'fas fa-crown' }
              ].map((category, index) => (
                <li key={index}>
                  <a
                    href={category.url}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <i className={`${category.icon} text-red-500 mr-3 text-xs w-4`}></i>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <i className="fas fa-phone-alt text-red-500 mr-2 text-sm"></i>
              Contactez-Nous
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-map-marker-alt text-white text-xs"></i>
                </div>
                <div>
                  <p className="text-gray-300">123 Avenue Mohammed VI</p>
                  <p className="text-gray-300">Marrakech 40000, Maroc</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-white text-xs"></i>
                </div>
                <a href="tel:+212522123456" className="text-gray-300 hover:text-white transition-colors duration-300">
                  +212 522-123456
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-white text-xs"></i>
                </div>
                <a href="mailto:contact@Marocstar.ma" className="text-gray-300 hover:text-white transition-colors duration-300">
                  contact@Marocstar.ma
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-white text-xs"></i>
                </div>
                <div>
                  <p className="text-gray-300">Lun - Ven: 9h - 18h</p>
                  <p className="text-gray-300">Sam: 10h - 16h</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white flex items-center">
                <i className="fas fa-newspaper text-green-400 mr-2"></i>
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-gray-600 rounded-l-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                />
                <button className="bg-gradient-to-r from-red-600 to-green-600 px-4 py-2 rounded-r-lg hover:from-red-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
                  <i className="fas fa-paper-plane text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section de Séparation */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Méthodes de Paiement */}
          <div className="py-6">
            <h4 className="text-center text-sm font-semibold mb-4 text-gray-300 flex items-center justify-center">
              <i className="fas fa-credit-card text-red-400 mr-2"></i>
              Méthodes de Paiement Acceptées
            </h4>
            <div className="flex justify-center space-x-4">
              {[
                { icon: 'fab fa-cc-visa', name: 'Visa' },
                { icon: 'fab fa-cc-mastercard', name: 'Mastercard' },
                { icon: 'fab fa-cc-paypal', name: 'PayPal' },
                { icon: 'fas fa-money-bill-wave', name: 'Espèces' },
                { icon: 'fas fa-mobile-alt', name: 'Mobile Money' }
              ].map((payment, index) => (
                <div key={index} className="w-10 h-6 bg-white/10 rounded flex items-center justify-center" title={payment.name}>
                  <i className={`${payment.icon} text-white text-sm`}></i>
                </div>
              ))}
            </div>
          </div>

          {/* Bas du Footer */}
          <div className="py-6 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm flex items-center">
                <i className="fas fa-copyright mr-2 text-red-400"></i>
                2024 <span className="text-red-400 mx-1">Moroccan Star</span>. Tous droits réservés.
              </div>
              
              <div className="flex space-x-6 text-sm">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-shield-alt mr-2 text-green-400"></i>
                  Confidentialité
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-file-contract mr-2 text-red-400"></i>
                  Conditions
                </a>
                <a href="/shipping" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-shipping-fast mr-2 text-green-400"></i>
                  Livraison
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Retour en Haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-green-600 rounded-full shadow-lg flex items-center justify-center hover:from-red-700 hover:to-green-700 transition-all duration-300 transform hover:scale-110 z-50"
        title="Retour en haut"
      >
        <i className="fas fa-chevron-up text-white"></i>
      </button>
    </footer>
  );
};
