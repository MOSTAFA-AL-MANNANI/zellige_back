import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Composant Counter animé
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      const startValue = 0;
      const endValue = end;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold">
      {count}{suffix}
    </div>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50">
      {/* Hero Section About */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                Notre Histoire
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-green-600 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez la passion derrière <span className="text-red-600 font-semibold">Maroc Star</span>, 
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
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                {/* Cadre décoratif */}
                <div className="absolute -inset-4 border-2 border-red-500/30 rounded-2xl transform rotate-3 animate-pulse"></div>
                <div className="absolute -inset-6 border-2 border-green-500/30 rounded-2xl transform -rotate-2 animate-pulse delay-1000"></div>
              </div>
              
              {/* Badges décoratifs */}
              <div className="absolute -top-6 -left-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="font-bold">★ Depuis 2015 ★</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="font-bold">🎯 100% Authentique</span>
              </div>
            </div>

            {/* Texte Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-8 shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Notre <span className="text-red-600">Mission</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Chez <span className="font-semibold text-green-600">Maroc Star</span>, nous nous engageons à préserver 
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
                    <li 
                      key={index} 
                      className="flex items-center text-gray-700 transform hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-md">
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
                color: "red",
                delay: 0
              },
              {
                icon: "💎",
                title: "Qualité",
                description: "Contrôle qualité rigoureux pour garantir la durabilité et l'excellence de chaque produit",
                color: "green",
                delay: 200
              },
              {
                icon: "🌱",
                title: "Durabilité",
                description: "Engagement envers des pratiques écologiques et le support des communautés artisanales",
                color: "red",
                delay: 400
              }
            ].map((value, index) => (
              <ValueCard 
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
                delay={value.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Chiffres avec Animations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { number: 8, suffix: "+", label: "Ans d'Expérience", delay: 0 },
                { number: 500, suffix: "+", label: "Produits Uniques", delay: 300 },
                { number: 10000, suffix: "+", label: "Clients Satisfaits", delay: 600 },
                { number: 50, suffix: "+", label: "Artisans Partners", delay: 900 }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="space-y-3 transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-white/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg">
                    <AnimatedCounter 
                      end={stat.number} 
                      suffix={stat.suffix} 
                      duration={2000}
                    />
                  </div>
                  <div className="text-white/90 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
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
}

// Composant pour les cartes de valeurs
const ValueCard = ({ icon, title, description, color, delay }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform ${
        inView 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-10 opacity-0 scale-95'
      } p-8 border-l-4 ${
        color === 'red' ? 'border-red-600' : 'border-green-600'
      } hover:-translate-y-2`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 ${
        color === 'red' ? 'bg-red-100' : 'bg-green-100'
      } rounded-full flex items-center justify-center mb-6 text-2xl transform hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-bold mb-4 ${
        color === 'red' ? 'text-red-600' : 'text-green-600'
      }`}>
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
};