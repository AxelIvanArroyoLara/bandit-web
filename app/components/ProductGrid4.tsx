'use client'
import Image from 'next/image'
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { PERFUMES_DATA } from '@/app/data/perfumes'
import { useState, useEffect, useCallback } from 'react'

export default function ProductGrid2() {
  const featuredPerfumes = PERFUMES_DATA.slice(0, 6)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  const calculateItemsPerView = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 640) return 1
      if (width < 1024) return 2
      return 3
    }
    return 3
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(calculateItemsPerView())
    }

    setItemsPerView(calculateItemsPerView())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateItemsPerView])

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % featuredPerfumes.length)
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + featuredPerfumes.length) % featuredPerfumes.length)
  }

  const scrollToPerfume = (id: number) => {
    const element = document.getElementById(`perfume-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Calcular posición 3D para cada slide
  const getSlideStyle = (index: number) => {
    const totalItems = featuredPerfumes.length
    const distance = (index - currentIndex + totalItems) % totalItems
    
    if (distance > totalItems / 2) {
      return { transform: 'translateX(100%) scale(0.7)', opacity: 0.5, zIndex: 1 }
    }
    
    switch(distance) {
      case 0: // Slide central
        return { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 10 }
      case 1: // Derecha
        return { transform: 'translateX(60%) scale(0.85)', opacity: 0.8, zIndex: 5 }
      case totalItems - 1: // Izquierda
        return { transform: 'translateX(-60%) scale(0.85)', opacity: 0.8, zIndex: 5 }
      default:
        return { transform: 'translateX(200%) scale(0.6)', opacity: 0.3, zIndex: 1 }
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black border-t-8 border-rockstar-yellow">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl text-center mb-16 text-white font-archivo uppercase tracking-wider drop-shadow-[6px_6px_0px_rgba(248,180,0,0.5)]">
          COLECCIÓN EXCLUSIVA
        </h2>

        {/* Contenedor del carrusel 3D */}
        <div className="relative h-[600px] md:h-[700px] overflow-visible">
          {featuredPerfumes.map((perfume, index) => (
            <div
              key={perfume.id}
              className="absolute top-1/2 left-1/2 w-[300px] md:w-[400px] transition-all duration-500 ease-out"
              style={{
                ...getSlideStyle(index),
                marginLeft: '-150px',
                marginTop: '-250px',
              }}
            >
              <div className="group perspective-1000">
                <div className="relative bg-black border-4 border-white rounded-xl p-6 h-full transform transition-all duration-300 group-hover:shadow-[0_25px_50px_rgba(248,180,0,0.3)]">
                  {/* Imagen */}
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg bg-gradient-to-b from-gray-800 to-black">
                    <Image 
                      src={perfume.image} 
                      alt={perfume.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  
                  {/* Contenido */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-archivo text-white text-center">{perfume.name}</h3>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-rockstar-yellow">${perfume.price}</span>
                      <div className="flex gap-2 mt-4 justify-center">
                        <button 
                          onClick={() => scrollToPerfume(perfume.id)}
                          className="bg-white text-black py-3 px-6 font-archivo text-sm border-2 border-black hover:bg-rockstar-yellow transition-colors"
                        >
                          VER DETALLES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controles de navegación */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-20">
            <button
              onClick={prevSlide}
              className="bg-black/80 text-white p-4 rounded-full border-2 border-rockstar-yellow hover:bg-rockstar-yellow transition-all backdrop-blur-sm"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-black/80 text-white p-4 rounded-full border-2 border-rockstar-yellow hover:bg-rockstar-yellow transition-all backdrop-blur-sm"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {featuredPerfumes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-rockstar-yellow w-8' 
                    : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Texto informativo */}
        <div className="text-center mt-20">
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Desliza para explorar nuestra colección limitada de fragancias exclusivas. 
            Cada perfume es una obra de arte olfativa con notas únicas y presentación premium.
          </p>
        </div>
      </div>
    </section>
  )
}