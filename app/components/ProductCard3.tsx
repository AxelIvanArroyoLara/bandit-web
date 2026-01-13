'use client'
import Image from 'next/image'
import { ShoppingCart, Tag } from 'lucide-react'

export default function ProductCard({ product }: { product: any }) {
  const Icon = product.silhouette;
  const isLeft = product.layout === "left";

  return (
    <section 
      id={`perfume-${product.id}`}
      className="relative w-full min-h-[100vh] md:min-h-[110vh] flex items-center justify-center overflow-visible border-b-[6px] md:border-b-[12px] border-black bg-black"
    >
      
      {/* 1. FONDO BELICÓN (Optimizado para móvil) */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-700 bg-cover bg-center md:bg-fixed`}
        style={{ 
          backgroundImage: `url(${product.backgroundImage})`,
          // En móvil: más cobertura, en desktop: efecto clipPath
          clipPath: isLeft 
            ? "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" 
            : "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <div 
          className="absolute inset-0 opacity-60 md:opacity-50 mix-blend-multiply" 
          style={{ backgroundColor: product.accentColor }} 
        />
        {/* Overlay para mejorar contraste en móvil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 md:hidden" />
      </div>

      {/* 2. TEXTO GIGANTE DE FONDO (Reducido en móvil) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[18vw] md:text-[25vw] font-archivo opacity-5 md:opacity-10 text-black leading-none uppercase">
          {product.name.split(' ')[0]}
        </span>
      </div>

      {/* 3. CONTENIDO PRINCIPAL BELICÓN */}
      <div className={`container mx-auto px-4 md:px-6 z-30 flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-4 md:gap-10 py-6 md:py-0`}>
        
        {/* --- ZONA DE TEXTO BELICÓN --- */}
        <div className={`flex-1 space-y-4 md:space-y-6 text-center md:text-left ${isLeft ? 'order-2 md:order-1' : 'order-2'}`}>
          
          {/* Título Principal - Estilo Belicón */}
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-gta-stroke drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] md:drop-shadow-[15px_15px_0px_rgba(0,0,0,1)] leading-[0.9] md:leading-[0.8]">
            {product.name}
          </h2>
          
          <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
            {/* Subtítulo Gótico Belicón */}
            <p className="text-gtaOrange font-gothic text-3xl md:text-4xl transform -rotate-1 md:-rotate-2 drop-shadow-[4px_4px_0px_#000] md:drop-shadow-lg">
              Edición Limitada
            </p>
            
            {/* PRECIO - Estilo Placa Belicón */}
            <div className="relative group cursor-default">
              <div className="bg-gradient-to-br from-gray-900 to-black border-3 md:border-4 border-gtaOrange shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] skew-x-[-8deg] md:skew-x-[-10deg] p-1">
                <div className="bg-black/90 border border-white/10 px-8 py-2 md:px-10 md:py-3">
                  <span className="font-archivo text-4xl md:text-5xl text-gtaOrange flex items-center justify-center md:justify-start gap-2 drop-shadow-[0_2px_8px_rgba(255,140,0,0.7)]">
                    <Tag size={28} className="text-white/60" /> 
                    <span className="text-stroke-black">${product.price}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN BELICÓN - Estilo Lingote de Oro */}
          <div className="mt-8 md:mt-12">
            <button className="group relative inline-flex items-center justify-center px-10 py-4 md:px-16 md:py-6 font-archivo text-xl md:text-3xl transition-all duration-300 overflow-hidden border-3 md:border-4 border-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] active:translate-y-1 md:active:translate-y-2 active:shadow-[4px_4px_0px_#000]">
              
              {/* Fondo Base (Oro Belicón) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] transition-all duration-500 group-hover:brightness-125" />
              
              {/* Brillo tipo "Barrido" Belicón */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 group-hover:translate-x-[150%]" />

              {/* Texto Belicón */}
              <span className="relative flex items-center gap-3 md:gap-4 z-10 text-black font-black tracking-tighter drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
                <ShoppingCart size={24} strokeWidth={3} className="group-hover:scale-110 transition-transform" /> 
                COMPRAR AHORA
              </span>

              {/* Bordes internos Belicón */}
              <div className="absolute inset-1 border border-black/30 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* --- LADO DE LA IMAGEN BELICÓN --- */}
        <div className={`flex-1 relative group perspective-1000 self-center ${isLeft ? 'order-1 md:order-2' : 'order-1'}`}>
          {/* Resplandor de fondo belicón */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[120%] h-[110%] md:h-[120%] bg-white/10 md:bg-white/5 blur-[50px] md:blur-[120px] rounded-full pointer-events-none" />
          
          {/* Contenedor principal de la botella */}
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 md:group-hover:rotate-2 drop-shadow-[20px_30px_25px_rgba(0,0,0,0.9)] md:drop-shadow-[30px_50px_30px_rgba(0,0,0,0.9)]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain p-3 md:p-4"
                sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, (max-width: 1024px) 450px, 550px"
                priority={product.id <= 2}
              />
            </div>
          </div>
          
          {/* Efecto extra belicón en móvil */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gtaOrange to-transparent md:hidden" />
        </div>
      </div>
      
      {/* Línea decorativa inferior belicón */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gtaOrange to-transparent md:hidden" />
    </section>
  )
}