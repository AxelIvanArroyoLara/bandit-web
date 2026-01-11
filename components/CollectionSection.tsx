"use client";

import { useState } from 'react';

const collectionItems = [
  { id: 1, name: 'Colección Invierno', color: 'from-blue-500 to-cyan-300' },
  { id: 2, name: 'Colección Verano', color: 'from-yellow-500 to-orange-400' },
  { id: 3, name: 'Colección Élite', color: 'from-purple-500 to-pink-400' },
  { id: 4, name: 'Colección Nocturna', color: 'from-gray-800 to-black' },
  { id: 5, name: 'Colección Neon', color: 'from-green-400 to-blue-400' },
];

export default function CollectionSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % collectionItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + collectionItems.length) % collectionItems.length);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-comic-black to-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-gta text-center text-white mb-4">
          COLECCIONES <span className="text-alucin-neon">EXCLUSIVAS</span>
        </h2>
        
        <p className="text-center font-comic text-gray-300 mb-12 max-w-2xl mx-auto">
          Descubre nuestras ediciones limitadas, cada una con su propia personalidad y esencia única.
        </p>

        {/* Contenedor de colecciones */}
        <div className="relative">
          {/* Flechas de navegación */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-4 text-2xl hover:bg-alucin-neon hover:text-black transition"
          >
            ←
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-4 text-2xl hover:bg-alucin-neon hover:text-black transition"
          >
            →
          </button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {collectionItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-4">
                  <div className="relative group">
                    {/* Fondo con efecto paralelogramo */}
                    <div className={`comic-border transform skew-x-[-10deg] overflow-hidden bg-gradient-to-r ${item.color} h-64 md:h-96 transition-transform group-hover:skew-x-[-5deg]`}>
                      <div className="transform skew-x-[10deg] h-full flex items-center justify-center">
                        <h3 className="text-4xl font-gta text-white text-center p-8">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Botón flotante */}
                    <button className="absolute bottom-4 right-4 comic-border bg-white text-black px-6 py-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-alucin-neon">
                      EXPLORAR COLECCIÓN
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {collectionItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-alucin-neon' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}