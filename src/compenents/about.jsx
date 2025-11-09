import React from 'react';

export default function About()  {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50 py-12">
      {/* Hero Section About */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 pt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                Notre Histoire
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez la passion derrière <span className="text-red-600 font-semibold">Zellige Star</span>, 
              où l'artisanat marocain rencontre l'innovation moderne
            </p>
          </div>
        </div>
      </section>

      {/* Section Mission et Vision */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10">
                <img 
                  src="logo.png" 
                  alt="Artisanat Marocain" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Cadre décoratif */}
                <div className="absolute -inset-4 border-2 border-red-500/30 rounded-2xl transform rotate-3"></div>
                <div className="absolute -inset-6 border-2 border-green-500/30 rounded-2xl transform -rotate-2"></div>
              </div>
              
              {/* Badges décoratifs */}
              <div className="absolute -top-6 -left-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg">
                <span className="font-bold">★ Depuis 2015 ★</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg">
                <span className="font-bold">🎯 100% Authentique</span>
              </div>
            </div>

            {/* Texte Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-8 shadow-lg border border-red-100">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Notre <span className="text-red-600">Mission</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Chez <span className="font-semibold text-green-600">Zellige Star</span>, nous nous engageons à préserver 
                  et promouvoir le riche patrimoine artisanal marocain à travers des produits 
                  souvenirs modernes et authentiques.
                </p>
                <ul className="space-y-4">
                  {[
                    "Préserver les techniques artisanales traditionnelles",
                    "Offrir des produits de qualité supérieure",
                    "Supporter les artisans locaux marocains",
                    "Innovation dans le design tout en respectant la tradition"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos <span className="text-green-600">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chaque aspect de notre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Authenticité",
                description: "Produits 100% marocains fabriqués avec des matériaux locaux et techniques traditionnelles",
                color: "red"
              },
              {
                icon: "💎",
                title: "Qualité",
                description: "Contrôle qualité rigoureux pour garantir la durabilité et l'excellence de chaque produit",
                color: "green"
              },
              {
                icon: "🌱",
                title: "Durabilité",
                description: "Engagement envers des pratiques écologiques et le support des communautés artisanales",
                color: "red"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-l-4 ${
                  value.color === 'red' ? 'border-red-600' : 'border-green-600'
                }`}
              >
                <div className={`w-16 h-16 ${
                  value.color === 'red' ? 'bg-red-100' : 'bg-green-100'
                } rounded-full flex items-center justify-center mb-6 text-2xl`}>
                  {value.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  value.color === 'red' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Section Chiffres */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "8+", label: "Ans d'Expérience" },
                { number: "500+", label: "Produits Uniques" },
                { number: "10K+", label: "Clients Satisfaits" },
                { number: "50+", label: "Artisans Partners" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
                  <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Prêt à Découvrir l'<span className="text-red-600">Art</span> Marocain ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et apportez une touche d'authenticité marocaine à votre style
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Voir Notre Collection
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105">
              Contactez-Nous
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
