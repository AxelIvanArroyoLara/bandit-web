'use client'
import Image from 'next/image'
import { ShoppingCart, ChevronLeft, ChevronRight, Target, Trophy } from 'lucide-react'
import { PERFUMES_DATA } from '@/app/data/perfumes'
import { useState } from 'react'

export default function ProductGridMisiones() {
  const [currentMission, setCurrentMission] = useState(0)
  const itemsPerMission = 6
  
  // Calcular cuántas misiones hay
  const totalMissions = Math.ceil(PERFUMES_DATA.length / itemsPerMission)
  
  // Obtener perfumes para la misión actual
  const startIndex = currentMission * itemsPerMission
  const endIndex = startIndex + itemsPerMission
  const currentPerfumes = PERFUMES_DATA.slice(startIndex, endIndex)
  
  const nextMission = () => {
    setCurrentMission(prev => (prev + 1) % totalMissions)
  }
  
  const prevMission = () => {
    setCurrentMission(prev => (prev - 1 + totalMissions) % totalMissions)
  }
  
  const scrollToPerfume = (id: number) => {
    const element = document.getElementById(`perfume-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 border-b-8 border-gta-orange relative overflow-hidden">
      {/* Fondo estilo mapa GTA */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23FF8C00' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px'
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Encabezado estilo misión GTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <Target className="text-gta-orange" size={32} />
            <h2 className="text-6xl md:text-8xl text-white font-archivo uppercase tracking-wider drop-shadow-[6px_6px_0px_rgba(255,140,0,0.7)]">
              PRODUCTO {currentMission + 1}
            </h2>
            <Trophy className="text-rockstar-yellow" size={32} />
          </div>
          <p className="text-xl text-gray-300 font-gothic max-w-2xl mx-auto">
            {currentMission === 0 
              ? "Colección inicial - Fragancias más vendidas" 
              : `Colección extendida - Lote ${currentMission + 1}`}
          </p>
        </div>

        {/* Grid 2+4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Columna 1 - Imagen grande */}
          <div className="md:row-span-2">
            <div className="relative h-full group">
              <div className="relative h-full min-h-[500px] border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src={currentPerfumes[0]?.image || ''} 
                    alt={currentPerfumes[0]?.name || ''}
                    fill
                    className="object-contain p-6 opacity-90 group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-3xl font-archivo text-white mb-2">{currentPerfumes[0]?.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gta-orange">${currentPerfumes[0]?.price}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => scrollToPerfume(currentPerfumes[0]?.id)}
                        className="btn-rockstar px-6 py-2 text-sm"
                      >
                        VER DETALLES
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
              <div className="relative h-full min-h-[500px] border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src={currentPerfumes[1]?.image || ''} 
                    alt={currentPerfumes[1]?.name || ''}
                    fill
                    className="object-contain p-6 opacity-90 group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-3xl font-archivo text-white mb-2">{currentPerfumes[1]?.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gta-orange">${currentPerfumes[1]?.price}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => scrollToPerfume(currentPerfumes[1]?.id)}
                        className="btn-rockstar px-6 py-2 text-sm"
                      >
                        VER DETALLES
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
            {currentPerfumes.slice(2, 6).map((perfume) => (
              <div key={perfume.id} className="group relative">
                <div className="relative h-64 border-4 border-black bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
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
                          VER DETALLES
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

        {/* Controles de navegación */}
        <div className="flex justify-center items-center gap-8 mt-12">
          <button
            onClick={prevMission}
            className="group bg-black text-white p-4 rounded-full border-2 border-gta-orange hover:bg-gta-orange transition-all duration-300"
            aria-label="Misión anterior"
          >
            <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Indicadores de misión */}
          <div className="flex gap-2">
            {Array.from({ length: totalMissions }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMission(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentMission === index 
                    ? 'bg-gta-orange w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Misión ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextMission}
            className="group bg-black text-white p-4 rounded-full border-2 border-gta-orange hover:bg-gta-orange transition-all duration-300"
            aria-label="Siguiente misión"
          >
            <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Contador de misiones */}
        <div className="text-center mt-6">
          <div className="inline-block bg-black/80 border-2 border-gta-orange px-6 py-2 rounded-lg">
            <p className="text-lg font-archivo text-white">
              Producto <span className="text-gta-orange">{currentMission + 1}</span> DE <span className="text-rockstar-yellow">{totalMissions}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}