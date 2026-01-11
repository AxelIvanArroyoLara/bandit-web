// components/HeroSection.tsx - VERSIÓN SIMPLE
export default function HeroSection() {
  return (
    <section className="min-h-screen relative bg-gradient-to-b from-comic-black to-gray-900 
                        flex items-center justify-center">
      
      {/* Contenido CENTRADO y SIMPLE */}
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">LA ESENCIA</span>
          <br />
          <span className="text-gta-orange">DEL PODER</span>
        </h1>
        
        <p className="text-xl text-alucin-neon mb-10 font-semibold">
          Perfumes exclusivos para los que mandan
        </p>

        <button className="bg-gta-orange text-black font-bold text-xl 
                          px-8 py-4 rounded-lg border-4 border-black
                          hover:bg-alucin-neon hover:scale-105 transition-all">
          VER COLECCIÓN
        </button>
      </div>

      {/* Flecha de scroll SIMPLE */}
      <div className="absolute bottom-10 animate-bounce">
        <div className="text-alucin-pink text-4xl">↓</div>
      </div>
    </section>
  );
}