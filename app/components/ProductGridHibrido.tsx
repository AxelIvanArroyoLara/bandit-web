'use client'
import Image from 'next/image'
import { ShoppingCart, Smartphone, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'
import { PERFUMES_DATA } from '@/app/data/perfumes'
import { useState, useEffect } from 'react'

export default function ProductGridHibrido() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const bestSellers = PERFUMES_DATA.slice(0, 6)
  
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

  // Para móvil: carrusel
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % bestSellers.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + bestSellers.length) % bestSellers.length)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 border-b-8 border-rockstar-yellow">
      <div className="max-w-7xl mx-auto">
        
        {/* Header que cambia según dispositivo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-4">
            {isMobile ? (
              <>
                <Smartphone className="text-rockstar-yellow animate-pulse" size={32} />
                <h2 className="text-4xl md:text-6xl text-white font-archivo uppercase tracking-wider drop-shadow-[4px_4px_0px_rgba(248,180,0,0.5)]">
                  DESLIZA PARA VER
                </h2>
              </>
            ) : (
              <>
                <Monitor className="text-gta-orange" size={32} />
                <h2 className="text-4xl md:text-7xl text-white font-archivo uppercase tracking-wider drop-shadow-[4px_4px_0px_rgba(255,140,0,0.5)]">
                  LOS MÁS VENDIDOS
                </h2>
              </>
            )}
          </div>
          <p className="text-gray-300">
            {isMobile 
              ? "Toca y desliza para explorar la colección completa" 
              : "Diseño optimizado para pantallas grandes"}
          </p>
        </div>

        {/* VERSIÓN DESKTOP (768px+) - Grid 2+4 */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Columna 1 - Imagen grande */}
            <div className="md:row-span-2">
              <div className="relative h-full group">
                <div className="relative h-full min-h-[500px] border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
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
                <div className="relative h-full min-h-[500px] border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image 
                      src={bestSellers[1].image} 
                      alt={bestSellers[1].name}
                      fill
                      className="object-contain p-6 opacity-90 group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
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
            
            {/* Columna 3 - 4 imágenes pequeñas */}
            <div className="grid grid-cols-2 gap-4">
              {bestSellers.slice(2, 6).map((perfume) => (
                <div key={perfume.id} className="group relative">
                  <div className="relative h-64 border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <Image 
                        src={perfume.image} 
                        alt={perfume.name}
                        fill
                        className="object-contain p-4 opacity-80 group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
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
        </div>

        {/* VERSIÓN MÓVIL (<768px) - Carrusel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Carrusel principal */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden border-4 border-white/10">
              {/* Imagen actual */}
              <div className="relative w-full h-full">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src={bestSellers[currentSlide].image} 
                    alt={bestSellers[currentSlide].name}
                    fill
                    className="object-contain p-6"
                    sizes="100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              
              {/* Información del producto actual */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 to-transparent">
                <h3 className="text-2xl font-archivo text-white mb-2">{bestSellers[currentSlide].name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gta-orange">${bestSellers[currentSlide].price}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollToPerfume(bestSellers[currentSlide].id)}
                      className="btn-rockstar px-4 py-2 text-sm"
                    >
                      VER MÁS
                    </button>
                    <button className="bg-black text-white p-2 border-2 border-white rounded-full hover:bg-gta-orange transition-colors">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Controles del carrusel */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full border-2 border-white/30 hover:border-gta-orange transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full border-2 border-white/30 hover:border-gta-orange transition-all"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bestSellers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-gta-orange w-6' 
                        : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Miniaturas en la parte inferior */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {bestSellers.slice(0, 3).map((perfume, index) => (
                <button
                  key={perfume.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentSlide === index ? 'border-gta-orange' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={perfume.image}
                    alt={perfume.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>
            
            {/* Indicador de deslizar */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-300">Desliza para ver más</span>
                <div className="animate-bounce">
                  <ChevronRight size={16} className="text-gta-orange" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de vista actual */}
        <div className="text-center mt-8">
          <div className="inline-block bg-black/80 border-2 border-gray-700 px-6 py-2 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-gray-300">
              Vista: <span className="text-rockstar-yellow font-bold">{isMobile ? 'Móvil' : 'Desktop'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}