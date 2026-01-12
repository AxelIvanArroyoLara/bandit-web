'use client'
import Image from 'next/image'
import { ShoppingCart, LucideIcon } from 'lucide-react'

export default function ProductCard({ product }: { product: any }) {
  const Icon = product.silhouette;
  const isLeft = product.layout === "left";

  return (
    <section className="relative w-full min-h-[110vh] flex items-center justify-center overflow-visible border-b-[12px] border-black bg-black">
      
      {/* 1. EL "FRAGMENTO" DE FONDO (Capa Inferior) */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-700 bg-cover bg-center`}
        style={{ 
          // Aquí es donde irá la ruta de tu imagen generada
          backgroundImage: `url(${product.backgroundImage})`, 
          maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
          clipPath: isLeft 
            ? "polygon(0 0, 90% 0, 70% 100%, 0% 100%)" 
            : "polygon(30% 0, 100% 0, 100% 100%, 10% 100%)",
        }}
      >
        {/* Overlay de color para que la imagen no "ensucie" el diseño y mantenga la vibra del perfume */}
        <div 
          className="absolute inset-0 opacity-60" 
          style={{ backgroundColor: product.accentColor }} 
        />
      </div>

      {/* 2. TEXTO GIGANTE DE FONDO (Estilo Rockstar VI) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[25vw] font-archivo opacity-10 text-black leading-none uppercase">
          {product.name.split(' ')[0]}
        </span>
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className={`container mx-auto px-6 z-30 flex flex-col md:flex-row items-center justify-between ${!isLeft && 'md:flex-row-reverse'}`}>
        
        {/* LADO DEL TEXTO */}
        <div className="flex-1 space-y-6 text-center md:text-left py-12">
          <h2 className="text-7xl md:text-9xl text-gta-stroke drop-shadow-[15px_15px_0px_rgba(0,0,0,1)] leading-[0.8]">
            {product.name}
          </h2>
          
          <div className="flex flex-col gap-4 items-center md:items-start">
            <p className="text-bg-cream font-gothic text-4xl transform -rotate-2">
              Edición Limitada
            </p>
            <div className="bg-white text-black font-archivo text-5xl px-8 py-2 border-4 border-black shadow-[10px_10px_0px_#000]">
              ${product.price}
            </div>
          </div>

          <button className="btn-rockstar text-3xl px-16 py-6 mt-8 hover:skew-x-[-10deg] transition-transform">
             COMPRAR AHORA
          </button>
        </div>

        {/* LADO DE LA IMAGEN (El efecto 3D) */}
        <div className="flex-1 relative group perspective-1000">
          {/* Resplandor de fondo sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* La Botella que "vuela" */}
          <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-[30px_50px_30px_rgba(0,0,0,0.9)]">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={600} 
              height={800} 
              className="object-contain"
            />
          </div>
        </div>

      </div>

    </section>
  )
}