import React, { useEffect, useRef, useState } from 'react';
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
        
        // Easing function pour un effet plus naturel
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
    <div ref={ref} className="text-2xl md:text-3xl font-bold">
      {count}{suffix}
    </div>
  );
};

export default function Home() {
  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-white via-red-50 to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Texte Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Titre Principal */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                  Maroc
                </span>
                <br />
                <span className="text-gray-800">STAR</span>
              </h1>
              
              {/* Sous-titre */}
              <p className="text-xl md:text-2xl text-gray-600 font-light">
                L'Art du 
                <span className="text-red-600 font-semibold"> Maroc </span> 
                dans Votre Style
              </p>
              
              {/* Paragraphe Description */}
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                Découvrez notre collection exclusive de produits souvenirs marocains authentiques. 
                Des <span className="text-green-600 font-semibold">t-shirts</span> élégants, 
                des <span className="text-red-600 font-semibold">caps</span> stylées, 
                et des <span className="text-green-600 font-semibold">accessoires</span> uniques 
                qui célèbrent la richesse culturelle du Maroc. 
                Chaque pièce raconte une histoire, chaque détail respire la tradition.
              </p>
              
              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-700 hover:to-red-800">
                  Découvrir la Collection
                </button>
                
                <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                  Voir les Promotions
                </button>
              </div>
              
              {/* Statistiques Améliorées */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <StatItem 
                  delay={0}
                  number={500}
                  suffix="+"
                  text="Produits Uniques"
                  color="from-red-500 to-red-600"
                  icon="🛍️"
                />
                <StatItem 
                  delay={200}
                  number={2000}
                  suffix="+"
                  text="Clients Satisfaits"
                  color="from-green-500 to-green-600"
                  icon="😊"
                />
                <StatItem 
                  delay={400}
                  number={100}
                  suffix="%"
                  text="Authentique Maroc"
                  color="from-red-500 to-red-600"
                  icon="🌟"
                />
              </div>
            </div>
            
            {/* Image Section */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="logo.png" 
                  alt="Produits Moroccan Star" 
                  className="w-full h-auto max-w-md mx-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              
              {/* Badge de qualité */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-full shadow-lg transform rotate-12">
                <span className="font-bold">★ Artisanat 100% Marocain ★</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-20"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-current text-green-100"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-current text-red-100"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-current text-white"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

// Composant pour chaque item de statistique
const StatItem = ({ delay, number, suffix, text, color, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-700 transform ${
        inView 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-10 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-3">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-2xl shadow-md`}>
          {icon}
        </div>
      </div>
      
      <div className={`bg-gradient-to-r ${color} bg-clip-text text-transparent font-bold text-3xl md:text-4xl mb-2`}>
        <AnimatedCounter end={number} suffix={suffix} duration={2000} />
      </div>
      
      <div className="text-gray-700 font-medium text-sm md:text-base">
        {text}
      </div>
      
      {/* Barre de progression décorative */}
      <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out ${
            inView ? 'w-full' : 'w-0'
          }`}
          style={{ transitionDelay: `${delay + 500}ms` }}
        ></div>
      </div>
    </div>
  );
};