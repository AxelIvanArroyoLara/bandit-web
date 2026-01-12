'use client'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { PERFUMES_DATA } from '../data/perfumes'

export default function ProductGrid2() {
  // Tomamos perfumes 3, 4, 5, 6 para este grid
  const featuredPerfumes = PERFUMES_DATA.slice(2, 6)

  const scrollToPerfume = (id: number) => {
    try {
      const element = document.getElementById(`perfume-${id}`);
      if (element) {
        // Scroll suave con opciones modernas
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      } else {
        console.warn(`Elemento perfume-${id} no encontrado`);
        
        // Si no encuentra el elemento, busca cualquier sección con ese perfume
        setTimeout(() => {
          const retryElement = document.getElementById(`perfume-${id}`);
          if (retryElement) {
            retryElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center'
            });
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error en scrollToPerfume:', error);
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black border-t-8 border-rockstar-yellow">
      <h2 className="text-5xl md:text-7xl text-center mb-16 text-white font-archivo uppercase tracking-wider drop-shadow-[6px_6px_0px_rgba(248,180,0,0.5)]">
        LOS MÁS VENDIDOS
      </h2>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPerfumes.map((perfume) => (
            <div key={perfume.id} className="group perspective-1000">
              <div className="relative bg-black border-4 border-white rounded-xl p-6 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[15px_15px_0px_rgba(248,180,0,1)]">
                
                {/* Badge de estrella */}
                <div className="absolute -top-3 -right-3 bg-rockstar-yellow text-black p-2 rounded-full z-10">
                  <Star size={24} fill="black" />
                </div>
                
                {/* Contenedor de imagen */}
                <div className="relative h-64 mb-6 overflow-hidden rounded-lg bg-gradient-to-b from-gray-800 to-black">
                  <Image 
                    src={perfume.image} 
                    alt={perfume.name}
                    fill
                    className="object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Información del producto */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-archivo text-white text-center">{perfume.name}</h3>
                  
                  <div className="text-center">
                    <span className="text-3xl font-bold text-rockstar-yellow">${perfume.price}</span>
                    <div className="flex gap-2 mt-4 justify-center">
                      <button 
                        onClick={() => scrollToPerfume(perfume.id)}
                        className="flex-1 bg-white text-black py-3 px-4 font-archivo text-sm border-2 border-black hover:bg-rockstar-yellow transition-colors"
                      >
                        VER DETALLES
                      </button>
                      <button className="bg-black text-white p-3 border-2 border-white rounded-lg hover:bg-rockstar-yellow hover:border-rockstar-yellow transition-colors">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Efecto de borde brillante al hover */}
                <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-rockstar-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner inferior */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black border-4 border-rockstar-yellow px-8 py-4 transform -rotate-1">
            <p className="text-xl font-gothic text-white">
              Lorem Ipsum Texto de ejemplo Lorem Ipsum Texto de ejemplo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}