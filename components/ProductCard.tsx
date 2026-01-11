interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageSide: 'left' | 'right';
  vignetteType: 'explosion' | 'cloud' | 'tear';
}

export default function ProductCard({ 
  title, 
  description, 
  price, 
  imageSide = 'left',
  vignetteType = 'explosion' 
}: ProductCardProps) {
  
  const vignetteClass = {
    explosion: 'clip-path: polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)',
    cloud: 'clip-path: polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%)',
    tear: 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
  };

  return (
    <section className="snap-section flex items-center justify-center min-h-screen bg-comic-black">
      <div className={`container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 ${
        imageSide === 'right' ? 'md:flex-row-reverse' : ''
      }`}>
        
        {/* Imagen con efecto viñeta */}
        <div className="flex-1 relative">
          <div className="comic-border overflow-hidden" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gta-orange to-alucin-pink"></div>
          </div>
          {/* Etiqueta de precio */}
          <span className="text-comic-black font-black">${price}</span>
        </div>

        {/* Información del producto */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-gta text-white mb-6">
            {title}
          </h2>
          
          <p className="text-lg font-comic text-gray-300 mb-8">
            {description}
          </p>

            <div className="flex items-center gap-4">
            <button className="comic-border bg-alucin-pink text-white px-6 py-3 font-bold 
                                hover:bg-[#FF00FF] hover:brightness-125 transition-all">
                AÑADIR AL CARRITO 🛒
            </button>
            
            <button className="border-2 border-alucin-neon text-alucin-neon px-6 py-3 font-bold 
                                hover:bg-alucin-neon hover:text-comic-black transition-all">
                VER DETALLES
            </button>
            </div>
        </div>
      </div>
    </section>
  );
}