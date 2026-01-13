'use client'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }: { product: any }) {
  const isLeft = product.layout === "left";

  return (
    <section 
      id={`perfume-${product.id}`}
      className="relative w-full min-h-screen flex items-center justify-center overflow-visible border-b-[12px] border-black bg-black"
    >
      
      {/* Fondo */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-700 bg-cover bg-center`}
        style={{ 
          backgroundImage: `url(${product.backgroundImage})`, 
          maskImage: 'linear-gradient(to top, black 85%, transparent 100%)',
          clipPath: isLeft 
            ? "polygon(0 0, 90% 0, 70% 100%, 0% 100%)" 
            : "polygon(30% 0, 100% 0, 100% 100%, 10% 100%)",
        }}
      >
        <div 
          className="absolute inset-0 opacity-50 mix-blend-overlay" 
          style={{ backgroundColor: product.accentColor }} 
        />
      </div>

      {/* Texto gigante de fondo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[25vw] font-archivo opacity-10 text-black leading-none uppercase">
          {product.name.split(' ')[0]}
        </span>
      </div>

      {/* Contenido principal */}
      <div className={`container mx-auto px-6 z-30 flex flex-col md:flex-row items-start justify-between gap-10 ${!isLeft && 'md:flex-row-reverse'}`}>
        
        {/* Zona de texto - ORDEN MÓVIL: primero */}
        <div className="flex-1 space-y-8 text-center md:text-left py-12 order-1 md:order-1">
          
          {/* Título */}
          <h2 className="text-7xl md:text-9xl text-gta-stroke drop-shadow-[12px_12px_0px_rgba(0,0,0,1)] leading-[0.85]">
            {product.name}
          </h2>
          
          <div className="flex flex-col gap-6 items-center md:items-start">
            {/* Subtítulo */}
            <p className="text-gtaOrange font-gothic text-4xl transform -rotate-2 drop-shadow-lg">
              Edición Limitada
            </p>
            
            {/* Precio */}
            <div className="bg-white text-black font-archivo text-5xl px-8 py-2 border-4 border-black shadow-[10px_10px_0px_#000]">
              ${product.price}
            </div>

            {/* Descripción - usa product.text si existe, sino un texto por defecto */}
            <div className="max-w-md bg-black/70 border-l-4 border-gtaOrange p-6 shadow-[10px_10px_0px_rgba(0,0,0,0.5)] backdrop-blur-md skew-x-[-5deg]">
              <p className="text-bg-cream font-inter text-lg leading-relaxed font-medium tracking-wide">
                {product.text || "Fragancia exclusiva de edición limitada. Notas únicas que definen carácter."}
              </p>
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

        {/* Lado de la imagen - ORDEN MÓVIL: después del texto */}
        <div className="flex-1 relative group perspective-1000 self-center order-2 md:order-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Contenedor que se ve en móvil y desktop */}
          <div className="relative w-full h-[400px] md:h-[700px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[300px] md:max-w-[500px] max-h-[600px] md:max-h-[800px] transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-[30px_50px_30px_rgba(0,0,0,0.9)]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={product.id <= 2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}