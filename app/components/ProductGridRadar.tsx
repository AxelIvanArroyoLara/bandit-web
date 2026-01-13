'use client'
import Image from 'next/image'
import { ShoppingCart, Radar, Zap, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { PERFUMES_DATA } from '@/app/data/perfumes'
import { useState, useEffect } from 'react'

export default function ProductGridRadar() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredPerfumes, setFilteredPerfumes] = useState(PERFUMES_DATA)

  // Datos para el carrusel destacado (primeros 4 productos)
  const featuredPerfumes = PERFUMES_DATA.slice(0, 4)
  
  // Categorías simuladas (en un caso real vendrían de los datos)
  const categories = [
    { id: 'all', name: 'TODAS', count: PERFUMES_DATA.length },
    { id: 'citrus', name: 'CÍTRICOS', count: 3 },
    { id: 'woody', name: 'MADERA', count: 4 },
    { id: 'floral', name: 'FLORAL', count: 2 }
  ]

  // Navegación del carrusel
  const nextCarousel = () => {
    setCurrentCarouselIndex(prev => (prev + 1) % featuredPerfumes.length)
  }

  const prevCarousel = () => {
    setCurrentCarouselIndex(prev => (prev - 1 + featuredPerfumes.length) % featuredPerfumes.length)
  }

  // Auto-rotar el carrusel cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextCarousel()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToPerfume = (id: number) => {
    const element = document.getElementById(`perfume-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 border-t-8 border-rockstar-yellow relative">
      {/* Efecto de radar */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 border-2 border-rockstar-yellow rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-8 border-2 border-gta-orange rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Encabezado estilo radar */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Radar className="text-rockstar-yellow animate-spin" style={{ animationDuration: '3s' }} size={36} />
            <h2 className="text-5xl md:text-7xl text-white font-archivo uppercase tracking-wider drop-shadow-[4px_4px_0px_rgba(248,180,0,0.7)]">
              LOS MÁS VENDIDOS
            </h2>
            <Zap className="text-gta-orange" size={36} />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Encuentra tu esencia
          </p>
        </div>

        {/* Carrusel de productos destacados */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden border-4 border-white/10 bg-gradient-to-br from-black to-gray-900">
            {/* Imagen del carrusel */}
            <div className="relative w-full h-full">
              <Image
                src={featuredPerfumes[currentCarouselIndex]?.image || ''}
                alt={featuredPerfumes[currentCarouselIndex]?.name || ''}
                fill
                className="object-contain p-8 transition-opacity duration-500"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Información del producto destacado */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 to-transparent">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-300 font-bold uppercase tracking-wider">DESTACADO</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-archivo text-white mb-2">
                    {featuredPerfumes[currentCarouselIndex]?.name}
                  </h3>
                  <p className="text-xl text-rockstar-yellow font-bold">${featuredPerfumes[currentCarouselIndex]?.price}</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => scrollToPerfume(featuredPerfumes[currentCarouselIndex]?.id)}
                    className="btn-rockstar px-8 py-3 text-lg"
                  >
                    VER DETALLES
                  </button>
                  <button className="bg-black text-white p-4 border-2 border-white rounded-full hover:bg-gta-orange hover:border-gta-orange transition-colors">
                    <ShoppingCart size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Controles del carrusel */}
            <div className="absolute top-1/2 left-4 right-4 flex justify-between -translate-y-1/2">
              <button
                onClick={prevCarousel}
                className="bg-black/80 text-white p-3 rounded-full border-2 border-white/30 hover:border-rockstar-yellow hover:bg-rockstar-yellow/20 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextCarousel}
                className="bg-black/80 text-white p-3 rounded-full border-2 border-white/30 hover:border-rockstar-yellow hover:bg-rockstar-yellow/20 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicadores del carrusel */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredPerfumes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentCarouselIndex === index 
                      ? 'bg-rockstar-yellow w-8' 
                      : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Filtros de categorías */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Filter className="text-gray-300" size={24} />
            <h3 className="text-2xl font-archivo text-white">FILTRAR POR CATEGORÍA</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg border-2 font-archivo transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-rockstar-yellow text-black border-rockstar-yellow'
                    : 'bg-black text-white border-gray-700 hover:border-gta-orange'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Grid completo de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredPerfumes.map((perfume, index) => (
            <div key={perfume.id} className="group">
              <div className="relative bg-gradient-to-b from-gray-900 to-black border-2 border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-rockstar-yellow hover:shadow-[0_0_30px_rgba(248,180,0,0.3)] hover:scale-[1.02]">
                {/* Indicador de posición en radar */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    index < 3 ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                </div>

                {/* Contenedor de imagen */}
                <div className="relative h-64">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={perfume.image}
                      alt={perfume.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* Información del producto */}
                <div className="p-6">
                  <h4 className="text-xl font-archivo text-white mb-2 line-clamp-1">{perfume.name}</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">Fragancia exclusiva de edición limitada</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-rockstar-yellow">${perfume.price}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => scrollToPerfume(perfume.id)}
                        className="bg-white text-black px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gta-orange transition-colors"
                      >
                        DETALLES
                      </button>
                      <button className="bg-black text-white p-2 border border-white rounded-full hover:bg-gta-orange transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Efecto de borde al hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-rockstar-yellow rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Contador de productos */}
        <div className="text-center mt-12">
          <div className="inline-block bg-black/80 border-2 border-gray-700 px-8 py-4 rounded-xl backdrop-blur-sm">
            <p className="text-lg text-white">
              <span className="text-rockstar-yellow font-bold">{filteredPerfumes.length}</span> PRODUCTOS EN EL RADAR
            </p>
            <p className="text-sm text-gray-400 mt-1">Escanea para encontrar tu fragancia perfecta</p>
          </div>
        </div>
      </div>
    </section>
  )
}