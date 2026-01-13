'use client'

import { ArrowDown, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

// Nombres de tus archivos en public/backgrounds/
// Asegúrate de que coincidan exactamente con tus nombres de archivo
const BACKGROUNDS = [
  'Perfume1.png', // Reemplaza con tus nombres reales
  'Perfume2.png',
  'Perfume3.png',
  'Perfume4.png',
  'Perfume5.png',
  'Perfume6.png',
  'Perfume7.png',
  'Perfume8.png',
  'Perfume9.png',
]

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Lógica de la Pantalla de Carga (Ciclo de 6 segundos)
    const interval = setInterval(() => {
      setIsFading(true) // Empezar fundido a negro
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length)
        setIsFading(false) // Quitar fundido con la nueva imagen
      }, 1000) // Duración del fundido a negro

    }, 6000) // Tiempo que dura cada imagen

    return () => clearInterval(interval)
  }, [])

  const scrollToProducts = () => {
    const productsSection = document.getElementById('perfume-1')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* 1. CONTENEDOR DE IMÁGENES (ESTILO PANTALLA DE CARGA) */}
      <div className="absolute inset-0 z-0">
        {BACKGROUNDS.map((bg, index) => (
          <div
            key={bg}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex && !isFading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Imagen con Efecto Ken Burns (Zoom Lento) */}
            <div 
              className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-linear ${
                index === currentIndex ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(/backgrounds/${bg})` }}
            />
            
            {/* Overlay para oscurecer y dar textura */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          </div>
        ))}
      </div>

      {/* 2. TEXTURA DE PUNTOS (Halftone) - Se queda fija encima */}
      <div 
        className="absolute inset-0 opacity-20 z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FF8C00 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* 3. CONTENIDO CENTRAL */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-gtaOrange w-6 h-6 animate-pulse" />
            <span className="text-gtaOrange font-archivo tracking-[0.3em] text-sm md:text-base uppercase">
              The Real Street Fragrance
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter italic">
            PERFUMES<br/>
            <span className="text-gta-stroke drop-shadow-[10px_10px_0px_#FF8C00]">BANDIDO</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-bg-cream/80 font-inter mb-10 leading-relaxed">
            No es solo un aroma, es el respeto de la calle. <br className="hidden md:block"/> 
            Lujo belicón para los que llevan el mando.
          </p>

          <button 
            onClick={scrollToProducts}
            className="group relative px-12 py-5 font-archivo text-2xl text-black transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gtaOrange skew-x-[-12deg] group-hover:bg-white transition-colors" />
            <span className="relative flex items-center justify-center gap-3 font-black">
              EXPLORAR COLECCIÓN
              <ArrowDown className="w-6 h-6 group-hover:animate-bounce" />
            </span>
          </button>
        </div>

        {/* INDICADOR DE CARGA (Estilo Rockstar en la esquina) */}
        <div className="absolute bottom-10 right-10 flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[10px] text-gtaOrange font-archivo tracking-widest uppercase opacity-50">Cargando Estilo</span>
              <div className="w-32 h-1 bg-white/10 mt-1 overflow-hidden">
                <div className="h-full bg-gtaOrange animate-loading-bar" />
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection