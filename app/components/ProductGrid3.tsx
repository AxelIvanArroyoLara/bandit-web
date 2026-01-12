'use client'
import Image from 'next/image'
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { PERFUMES_DATA } from '@/app/data/perfumes'
import { useState, useEffect, useCallback } from 'react'

export default function ProductGrid2() {
  // Tomamos 6 perfumes para el carrusel
  const featuredPerfumes = PERFUMES_DATA.slice(0, 6)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3) // Por defecto 3 en desktop
  const totalItems = featuredPerfumes.length

  // Función para calcular items por vista según el ancho de pantalla
  const calculateItemsPerView = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 640) return 1 // Mobile
      if (width < 1024) return 2 // Tablet
      return 3 // Desktop
    }
    return 3
  }, [])

  // Inicializar y actualizar items por vista
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(calculateItemsPerView())
      // Resetear índice si es necesario para evitar índices inválidos
      setCurrentIndex(prev => Math.min(prev, totalItems - calculateItemsPerView()))
    }

    // Establecer valor inicial
    setItemsPerView(calculateItemsPerView())
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateItemsPerView, totalItems])

  // Navegación
  const nextSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = totalItems - itemsPerView
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = totalItems - itemsPerView
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  // Scroll a perfume
  const scrollToPerfume = (id: number) => {
    try {
      const element = document.getElementById(`perfume-${id}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }
    } catch (error) {
      console.error('Error en scrollToPerfume:', error);
    }
  }

  // Calcular ancho del contenedor y de cada slide
  const containerWidth = 100
  const slideWidth = containerWidth / itemsPerView

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black border-t-8 border-rockstar-yellow">
      <div className="max-w-7xl mx-auto">
        {/* Título y controles */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 px-4">
          <h2 className="text-5xl md:text-7xl text-white font-archivo uppercase tracking-wider drop-shadow-[6px_6px_0px_rgba(248,180,0,0.5)] mb-6 md:mb-0">
            EDICIONES ESPECIALES
          </h2>
          
          {/* Controles de navegación */}
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === index 
                      ? 'bg-rockstar-yellow w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ir a grupo ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="group bg-black text-white p-4 rounded-full border-2 border-rockstar-yellow hover:bg-rockstar-yellow transition-all duration-300"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextSlide}
                className="group bg-black text-white p-4 rounded-full border-2 border-rockstar-yellow hover:bg-rockstar-yellow transition-all duration-300"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative overflow-hidden">
          {/* Contenedor del carrusel */}
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * slideWidth}%)`,
              width: `${(totalItems * 100) / itemsPerView}%`
            }}
          >
            {featuredPerfumes.map((perfume) => (
              <div 
                key={perfume.id}
                className="p-4"
                style={{ width: `${slideWidth}%` }}
              >
                <div className="group perspective-1000 h-full">
                  <div className="relative bg-black border-4 border-white rounded-xl p-6 h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[15px_15px_0px_rgba(248,180,0,1)]">
                    
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Información del producto */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-archivo text-white text-center line-clamp-1">{perfume.name}</h3>
                      
                      <div className="flex items-center justify-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-rockstar-yellow fill-rockstar-yellow" />
                        ))}
                        <span className="text-sm text-gray-400 ml-2">(24)</span>
                      </div>
                      
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
              </div>
            ))}
          </div>

          {/* Indicador de posición */}
          <div className="text-center mt-8 text-white/60 text-sm">
            {currentIndex + itemsPerView > totalItems 
              ? `${currentIndex + 1}-${totalItems} de ${totalItems}` 
              : `${currentIndex + 1}-${currentIndex + itemsPerView} de ${totalItems}`}
          </div>
        </div>

        {/* Banner inferior */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black border-4 border-rockstar-yellow px-8 py-4 transform -rotate-1">
            <p className="text-xl font-gothic text-white">
              TODOS LOS PRODUCTOS INCLUYEN ENVÍO GRATIS + MUESTRAS EXCLUSIVAS
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}