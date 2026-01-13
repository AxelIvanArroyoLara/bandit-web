'use client'
import Image from 'next/image'
// Importamos iconos más agresivos para el botón
import { ShoppingCart, Crosshair, Tag } from 'lucide-react'

export default function ProductCard({ product }: { product: any }) {
  const Icon = product.silhouette;
  const isLeft = product.layout === "left";

  // Una descripción de ejemplo (esto debería venir de tus datos en el futuro)
  const dummyDescription = "Fragancia de alto calibre. Notas de salida explosivas con un fondo amaderado que impone respeto. Solo para los que llevan el mando.";

  return (
    <section id={`perfume-${product.id}`}
    className="relative w-full min-h-[110vh] flex items-center justify-center overflow-visible border-b-[12px] border-black bg-black">
      
      {/* 1. EL FONDO (Sin cambios, ya está perfecto) */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-700 bg-cover bg-center`}
        style={{ 
          backgroundImage: `url(${product.backgroundImage})`, 
          maskImage: 'linear-gradient(to top, black 85%, transparent 100%)', // Ajusté un poco la máscara
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

      {/* 2. TEXTO GIGANTE DE FONDO (Sin cambios) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[25vw] font-archivo opacity-10 text-black leading-none uppercase">
          {product.name.split(' ')[0]}
        </span>
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className={`container mx-auto px-6 z-30 flex flex-col md:flex-row items-start justify-between gap-10 ${!isLeft && 'md:flex-row-reverse'}`}>
        
        {/* --- ZONA DE TEXTO REDISEÑADA --- */}
        <div className="flex-1 space-y-8 text-center md:text-left py-12 relative">
          
          {/* Título Principal */}
          <h2 className="text-7xl md:text-9xl text-gta-stroke drop-shadow-[12px_12px_0px_rgba(0,0,0,1)] leading-[0.85]">
            {product.name}
          </h2>
          
          <div className="flex flex-col gap-6 items-center md:items-start">
            {/* Subtítulo Gótico */}
            <p className="text-gtaOrange font-gothic text-4xl transform -rotate-2 drop-shadow-lg">
              Edición Limitada
            </p>
            
            {/* NUEVO DISEÑO DE PRECIO: La "Placa Belicona" */}
            <div className="relative group cursor-default">
               {/* Fondo metálico oscuro con borde dorado */}
              <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-gtaOrange shadow-[8px_8px_0px_#000] skew-x-[-10deg] p-1">
                 {/* Contenedor interno para dar efecto de profundidad */}
                <div className="bg-black/80 border border-white/10 px-10 py-3 backdrop-blur-sm">
                  <span className="font-archivo text-5xl text-gtaOrange flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(255,140,0,0.5)]">
                    <Tag size={32} className="text-white/50" /> ${product.price}
                  </span>
                </div>
              </div>
            </div>

            {/* NUEVA ZONA DE DESCRIPCIÓN: El "Informe Táctico" */}
            <div className="max-w-md bg-black/70 border-l-4 border-gtaOrange p-6 shadow-[10px_10px_0px_rgba(0,0,0,0.5)] backdrop-blur-md skew-x-[-5deg]">
              <p className="text-bg-cream font-inter text-lg leading-relaxed font-medium tracking-wide">
                {dummyDescription}
              </p>
            </div>
          </div>

          {/* NUEVO DISEÑO DE BOTÓN: Lingote de Oro Belicón */}
          <div className="mt-12">
            <button className="group relative inline-flex items-center justify-center px-16 py-6 font-archivo text-3xl transition-all duration-300 overflow-hidden border-4 border-black shadow-[12px_12px_0px_#000] active:translate-y-2 active:shadow-none">
              
              {/* 1. Fondo Base (Oro con Gradiente Sutil) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] transition-all duration-500 group-hover:brightness-110" />
              
              {/* 2. Brillo tipo "Barrido" (El efecto que te gustó, mejorado) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[150%] skew-x-[-30deg] transition-transform duration-1000 group-hover:translate-x-[150%]" />

              {/* 3. Texto con Contraste Máximo */}
              <span className="relative flex items-center gap-4 z-10 text-black font-black tracking-tighter drop-shadow-sm">
                <ShoppingCart size={32} strokeWidth={3} className="group-hover:scale-110 transition-transform" /> 
                COMPRAR AHORA
              </span>

              {/* 4. Bordes internos decorativos (Efecto moneda/placa) */}
              <div className="absolute inset-1 border border-black/20 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* LADO DE LA IMAGEN (Sin cambios mayores) */}
        <div className="flex-1 relative group perspective-1000 self-center">
           {/* ... (El resto del código de la imagen sigue igual) ... */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[500px] max-h-[800px] transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[35px_55px_40px_rgba(0,0,0,0.8)]">
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