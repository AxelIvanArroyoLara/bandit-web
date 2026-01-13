'use client'
import Image from 'next/image'
import { ShoppingCart, Tag, Sparkles, Award, Target } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ProductCard({ product }: { product: any }) {
  const Icon = product.silhouette;
  const isLeft = product.layout === "left";
  
  // Estado para manejar la altura del contenedor
  const [containerHeight, setContainerHeight] = useState('min-h-[100vh]');
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil y ajustar altura
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Ajustar altura dinámicamente basado en el contenido
    const adjustHeight = () => {
      if (isMobile) {
        setContainerHeight('min-h-[90vh]');
      } else {
        // En desktop, altura más flexible
        setContainerHeight('min-h-[100vh]');
      }
    };
    
    adjustHeight();
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Descripciones personalizadas para cada perfume
  const perfumeDescriptions: Record<number, string> = {
    1: "FAKHAR EXTRAIT - Una explosión de elegancia masculina. Notas de bergamota italiana y pimienta rosa, con un corazón de vetiver haitiano y fondo de ámbar gris. Para el hombre que domina la ciudad.",
    2: "EROS VERSACE - La esencia de la seducción. Abre con menta verde y limón italiano, desarrolla notas de vainilla tonka y geranio, culminando en un fondo de sándalo y cedro. Mitología en cada gota.",
    3: "SCANDAL - La provocación hecha fragancia. Salida explosiva de miel y mandarina, corazón floral de jazmín y naranja, base sensual de haba tonka y caramelo. Atrevete a ser notado.",
    4: "VALENTINO ROMA - La grandeza de la Ciudad Eterna. Notas de bergamota calabresa y mandarina, un corazón de flor de naranjo y geranio, con un fondo de vainilla bourbon y vetiver. Lujo en estado puro.",
    5: "AFNAN 9 PM - La noche hecha esencia. Apertura fresca de manzana y bergamota, transición a notas de canela y vainilla, rematada con un fondo ambarado y almizcle. Tu mejor arma después del anochecer.",
    6: "CAROLINA HERRERA - El clásico reinventado. Notas de almendra y bergamota, corazón de iris y jazmín, base de vainilla y sándalo. Para quienes escriben su propia historia.",
    7: "DONNA VALENTINO - Feminidad poderosa. Salida de fresia y bergamota, desarrollo de peonía y magnolia, fondo de musk y pachulí. La elegancia no necesita explicaciones.",
    8: "JEAN PAUL GAULTIER - El icono del diseño olfativo. Notas de menta, anís y lavanda, corazón de especias orientales, base de vainilla y ámbar. Tan icónico como su diseñador.",
    9: "GAULTIER DIVINE - Lo celestial en la tierra. Apertura de flor de naranjo y pera, corazón de iris y jazmín, fondo de vainilla y almizcle. Una obra maestra en cada aspersión."
  };

  return (
    <section 
      id={`perfume-${product.id}`}
      className={`relative w-full ${containerHeight} flex items-center justify-center overflow-visible border-b-[4px] md:border-b-[8px] border-gta-orange bg-black transition-all duration-500`}
    >
      
      {/* 1. FONDO - Dinámico que se escala con el contenido */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000`}
        style={{ 
          backgroundImage: `url(${product.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Escala dinámica basada en el contenido
          transform: isMobile ? 'scale(1.1)' : 'scale(1)',
          filter: 'brightness(0.4) contrast(1.2)',
        }}
      >
        {/* Overlay dinámico que se ajusta al color del perfume */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{ 
            backgroundColor: product.accentColor,
            opacity: 0.4,
            mixBlendMode: 'overlay'
          }} 
        />
        
        {/* Efecto de gradiente para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* 2. TEXTO DE FONDO - Más sutil y responsive */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[12vw] md:text-[18vw] lg:text-[22vw] font-archivo opacity-[0.03] md:opacity-[0.04] text-white leading-none uppercase tracking-tighter">
          {product.name.split(' ')[0]}
        </span>
      </div>

      {/* 3. CONTENIDO PRINCIPAL - Rediseñado para fluir mejor */}
      <div className={`container mx-auto px-4 md:px-8 lg:px-12 z-30 flex flex-col ${!isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-8 md:gap-12 py-8 md:py-16`}>
        
        {/* --- ZONA DE TEXTO - Ahora con descripción siempre visible --- */}
        <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
          
          {/* Encabezado con ícono */}
          <div className="flex flex-col md:flex-row items-center lg:items-start gap-4 mb-2">
            <div className="hidden md:block">
              <Award className="text-gta-orange" size={32} />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-archivo leading-[0.9] tracking-tighter">
                {product.name}
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-2">
                <span className="inline-flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-gta-orange/30">
                  <Sparkles size={14} className="text-rockstar-yellow" />
                  <span className="text-sm text-rockstar-yellow font-archivo">EDICIÓN LIMITADA</span>
                </span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="text-gray-300 text-sm font-bold">#{product.id.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
          
          {/* PRECIO Destacado */}
          <div className="relative inline-block">
            <div className="bg-gradient-to-r from-black via-gray-900 to-black border-2 md:border-3 border-rockstar-yellow shadow-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl">
              <div className="flex items-center gap-3 md:gap-4">
                <Tag className="text-rockstar-yellow" size={isMobile ? 20 : 28} />
                <div>
                  <div className="text-gray-300 text-xs md:text-sm font-bold">PRECIO EXCLUSIVO</div>
                  <div className="font-archivo text-3xl md:text-4xl lg:text-5xl text-rockstar-yellow">
                    ${product.price}<span className="text-lg md:text-xl text-gray-400">.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN - SIEMPRE VISIBLE */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            <div className="bg-black/60 backdrop-blur-sm border-l-4 border-gta-orange p-5 md:p-6 rounded-r-xl shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-gta-orange" />
                <h3 className="font-archivo text-lg md:text-xl text-white">LA ESENCIA</h3>
              </div>
              <p className="text-bg-cream text-base md:text-lg leading-relaxed font-medium">
                {perfumeDescriptions[product.id] || "Fragancia exclusiva de edición limitada con notas únicas que definen carácter."}
              </p>
              {/* Notas olfativas (placeholder) */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs px-3 py-1 bg-black/50 border border-gta-orange/30 rounded-full text-gray-300">Cítrico</span>
                <span className="text-xs px-3 py-1 bg-black/50 border border-gta-orange/30 rounded-full text-gray-300">Amaderado</span>
                <span className="text-xs px-3 py-1 bg-black/50 border border-gta-orange/30 rounded-full text-gray-300">Ambar</span>
                <span className="text-xs px-3 py-1 bg-black/50 border border-gta-orange/30 rounded-full text-gray-300">Especiado</span>
              </div>
            </div>
          </div>

          {/* BOTÓN DE COMPRA - Siempre visible */}
          <div className="pt-4 md:pt-6">
            <button className="group relative inline-flex items-center justify-center w-full md:w-auto px-8 md:px-12 py-4 md:py-5 font-archivo text-lg md:text-xl transition-all duration-300 overflow-hidden border-2 md:border-3 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] active:shadow-[4px_4px_0px_#000]">
              
              {/* Fondo con gradiente dinámico */}
              <div className="absolute inset-0 bg-gradient-to-r from-rockstar-yellow via-gta-orange to-rockstar-yellow transition-all duration-700 group-hover:from-gta-orange group-hover:to-rockstar-yellow" />
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] skew-x-[-25deg] transition-transform duration-1000 group-hover:translate-x-[200%]" />

              {/* Texto e ícono */}
              <span className="relative flex items-center justify-center gap-3 md:gap-4 z-10 text-black font-black tracking-tight">
                <ShoppingCart size={isMobile ? 22 : 26} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" /> 
                <span className="whitespace-nowrap">AÑADIR AL CARRITO</span>
              </span>

              {/* Efecto de borde interno */}
              <div className="absolute inset-1 border border-white/20 rounded pointer-events-none" />
            </button>
            
            {/* Texto pequeño de garantía */}
            <p className="text-center lg:text-left text-gray-400 text-xs md:text-sm mt-3">
              ✅ Envío gratis + Muestras exclusivas + Garantía de autenticidad
            </p>
          </div>
        </div>

        {/* --- LADO DE LA IMAGEN - Optimizado --- */}
        <div className={`flex-1 relative ${isLeft ? 'order-1 lg:order-2' : 'order-1'} self-stretch md:self-center w-full`}>
          {/* Resplandor dinámico */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[100%] h-[90%] md:h-[100%] bg-gradient-to-r from-gta-orange/10 via-transparent to-gta-orange/10 blur-[40px] md:blur-[60px] rounded-full pointer-events-none" />
          
          {/* Contenedor de imagen con altura flexible */}
          <div className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[500px] xl:h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[450px] transform transition-all duration-700 hover:scale-105 hover:rotate-1">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain p-2 md:p-4 drop-shadow-2xl"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 300px, 380px"
                priority={product.id <= 3}
              />
              
              {/* Efecto de reflejo en la botella */}
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-sm pointer-events-none" />
            </div>
          </div>
          
          {/* Etiqueta de producto en la imagen */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/80 backdrop-blur-sm border border-gta-orange/30 px-3 py-2 rounded-lg">
            <div className="text-xs text-gray-300 font-bold">EXCLUSIVO</div>
            <div className="text-sm text-white font-archivo">2024</div>
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gta-orange to-transparent opacity-60" />
    </section>
  )
}