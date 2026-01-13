'use client'
import Image from 'next/image'
import { ShoppingCart, Tag, Crosshair } from 'lucide-react'

export default function ProductCard({ product }: { product: any }) {
  const isLeft = product.layout === "left";

  return (
    <section 
      id={`perfume-${product.id}`}
      className="relative w-full min-h-[100vh] md:min-h-[110vh] flex items-center justify-center overflow-visible border-b-[8px] md:border-b-[12px] border-black bg-black"
    >
      
      {/* 1. FONDO */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center`}
        style={{ 
          backgroundImage: `url(${product.backgroundImage})`, 
          maskImage: 'linear-gradient(to top, black 90%, transparent 100%)',
          clipPath: isLeft 
            ? "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" 
            : "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay" 
          style={{ backgroundColor: product.accentColor }} 
        />
      </div>

      {/* 2. TEXTO GIGANTE DE FONDO */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[30vw] md:text-[25vw] font-archivo opacity-10 text-black leading-none uppercase">
          {product.name.split(' ')[0]}
        </span>
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className={`container mx-auto px-4 md:px-6 z-30 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 ${!isLeft && 'md:flex-row-reverse'}`}>
        
        {/* ZONA DE TEXTO */}
        <div className="flex-1 space-y-4 md:space-y-8 text-center md:text-left py-6 md:py-12 w-full">
          
          <h2 className="text-5xl sm:text-6xl md:text-9xl text-gta-stroke drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] md:drop-shadow-[12px_12px_0px_rgba(0,0,0,1)] leading-[0.85]">
            {product.name}
          </h2>
          
          <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start">
            <p className="text-gtaOrange font-gothic text-3xl md:text-4xl transform -rotate-2 drop-shadow-lg">
              Edición Limitada
            </p>
            
            {/* PRECIO (Placa Belicona) */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gtaOrange shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] skew-x-[-10deg] p-1">
              <div className="bg-black/80 border border-white/10 px-6 md:px-10 py-2 md:py-3 backdrop-blur-sm">
                <span className="font-archivo text-3xl md:text-5xl text-gtaOrange flex items-center gap-2">
                  <Tag size={24} className="text-white/50" /> ${product.price}
                </span>
              </div>
            </div>

            {/* DESCRIPCIÓN (Informe Táctico) - AHORA SIEMPRE VISIBLE */}
            <div className="w-full max-w-md bg-black/70 border-l-4 border-gtaOrange p-4 md:p-6 shadow-[10px_10px_0px_rgba(0,0,0,0.5)] backdrop-blur-md skew-x-[-5deg]">
              <p className="text-bg-cream font-inter text-base md:text-lg leading-relaxed font-medium tracking-wide text-left">
                {product.description}
              </p>
            </div>
          </div>

          {/* BOTÓN (Lingote de Oro) */}
          <div className="mt-6 md:mt-12 w-full md:w-auto">
            <button className="group relative w-full md:inline-flex items-center justify-center px-10 md:px-16 py-4 md:py-6 font-archivo text-2xl md:text-3xl transition-all duration-300 overflow-hidden border-4 border-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] active:translate-y-1 active:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 group-hover:translate-x-[150%]" />
              <span className="relative flex items-center justify-center gap-4 z-10 text-black font-black tracking-tighter">
                <Crosshair size={28} strokeWidth={3} /> COMPRAR
              </span>
            </button>
          </div>
        </div>

        {/* LADO DE LA IMAGEN */}
        <div className="flex-1 relative group perspective-1000 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-white/3 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative w-full h-[350px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[300px] md:max-w-[500px] transform transition-all duration-500 group-hover:scale-105 drop-shadow-[20px_30px_25px_rgba(0,0,0,0.8)] md:drop-shadow-[35px_55px_40px_rgba(0,0,0,0.8)]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 300px, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}