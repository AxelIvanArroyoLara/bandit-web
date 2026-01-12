'use client'

import { ArrowDown, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con gradiente y textura */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-comicBlack via-gray-900 to-comicBlack" />
        
        {/* Textura de puntos tipo cómic/halftone */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FF8C00 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Líneas diagonales sutiles */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #FF8C00 10px,
              #FF8C00 20px
            )`
          }}
        />
        
        {/* Efecto de viñeta en las esquinas */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gtaOrange/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gtaOrange/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
        
        {/* Elemento decorativo superior */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-comicBlack/50 backdrop-blur-sm border-2 border-gtaOrange rounded-full">
            <Sparkles className="w-4 h-4 text-gtaOrange" />
            <span className="text-xs font-bold text-offWhite tracking-wider">COLECCIÓN EXCLUSIVA 2024</span>
          </div>
        </div>

        {/* Título principal */}
        <div className={`space-y-6 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block text-offWhite font-roboto font-black tracking-tighter">
              LA ESENCIA
            </span>
            <span className="block font-gothic text-gtaOrange mt-2 text-6xl md:text-8xl lg:text-9xl">
              Del Poder
            </span>
          </h1>
          
          {/* Línea decorativa */}
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-transparent via-gtaOrange to-transparent" />
        </div>

        {/* Subtítulo */}
        <div className={`mb-12 max-w-3xl transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-offWhite/90 mb-6 font-light">
            Ocho fragancias únicas. Una actitud indomable.
            <br />
            <span className="text-gtaOrange font-semibold">Para los que escriben su propio destino.</span>
          </p>
          
          {/* Contador de productos */}
          <div className="inline-flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gtaOrange">8</div>
              <div className="text-sm text-offWhite/70">FRAGANCIAS</div>
            </div>
            <div className="h-8 w-px bg-gtaOrange/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gtaOrange">1</div>
              <div className="text-sm text-offWhite/70">ACTITUD</div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Botón principal */}
          <button
            onClick={scrollToProducts}
            className="group relative px-10 py-4 bg-gtaOrange text-comicBlack font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] hover:scale-105 active:scale-95"
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <span className="relative flex items-center justify-center gap-3">
              EXPLORAR COLECCIÓN
              <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
            </span>
          </button>
        </div>

        {/* Indicador de scroll */}
        <div 
          onClick={scrollToProducts}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-offWhite/70 tracking-wider">DESCUBRE</span>
            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-gtaOrange" />
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-gtaOrange rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-gtaOrange/50 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-gtaOrange/30 rounded-full animate-pulse delay-700" />
      
      {/* Borde inferior decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gtaOrange to-transparent" />
    </section>
  )
}

export default HeroSection