'use client'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { PERFUMES_DATA } from '../data/perfumes' // O la ruta correcta a tus datos

interface Perfume {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductGrid() {
  // Tomamos los 6 primeros perfumes como "más vendidos"
  const bestSellers = PERFUMES_DATA.slice(0, 6)

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
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 border-b-8 border-gta-orange">
      <h2 className="text-6xl md:text-8xl text-center mb-16 text-gta-stroke font-gothic drop-shadow-[10px_10px_0px_rgba(255,140,0,0.5)]">
        Los Más Vendidos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Columna 1 - Imagen grande */}
        <div className="md:row-span-2">
          <div className="relative h-full group">
            <div className="relative h-full min-h-[500px] border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image 
                src={bestSellers[0].image} 
                alt={bestSellers[0].name}
                fill
                className="object-contain p-6 opacity-90 group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-3xl font-archivo text-white mb-2">{bestSellers[0].name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gta-orange">${bestSellers[0].price}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollToPerfume(bestSellers[0].id)}
                      className="btn-rockstar px-6 py-2 text-sm"
                    >
                      VER MÁS
                    </button>
                    <button className="bg-black text-white p-3 border-2 border-white rounded-full hover:bg-gta-orange transition-colors">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna 2 - Imagen grande */}
        <div className="md:row-span-2">
          <div className="relative h-full group">
            <div className="relative h-full min-h-[500px] border-4 border-black bg-black rounded-lg overflow-hidden">
              <Image 
                src={bestSellers[1].image} 
                alt={bestSellers[1].name}
                fill
                className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-3xl font-archivo text-white mb-2">{bestSellers[1].name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gta-orange">${bestSellers[1].price}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollToPerfume(bestSellers[1].id)}
                      className="btn-rockstar px-6 py-2 text-sm"
                    >
                      VER MÁS
                    </button>
                    <button className="bg-black text-white p-3 border-2 border-white rounded-full hover:bg-gta-orange transition-colors">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna 3 - 4 imágenes pequeñas en grid 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {bestSellers.slice(2, 6).map((perfume) => (
            <div key={perfume.id} className="group relative">
              <div className="relative h-64 border-4 border-black bg-black rounded-lg overflow-hidden">
                <Image 
                  src={perfume.image} 
                  alt={perfume.name}
                  fill
                  className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/95 to-transparent">
                  <h4 className="text-lg font-archivo text-white mb-1">{perfume.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gta-orange">${perfume.price}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => scrollToPerfume(perfume.id)}
                        className="bg-white text-black px-3 py-1 text-xs font-bold border-2 border-black hover:bg-gta-orange transition-colors"
                      >
                        VER MÁS
                      </button>
                      <button className="bg-black text-white p-2 border border-white rounded-full hover:bg-gta-orange transition-colors">
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}