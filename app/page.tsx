import HeroSection from './components/HeroSection'
//import ProductShowcase from './components/ProductShowcase' // Lo crearemos después

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Sección de productos - Añadimos el id para el scroll */}
      <section id="productos" className="min-h-screen bg-comicBlack">
        {/* Placeholder temporal */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center text-gtaOrange mb-8">
            LOS 8 LEGENDARIOS
          </h2>
          <p className="text-center text-offWhite/80 max-w-2xl mx-auto mb-12">
            Cada fragancia cuenta una historia. Cada historia define un destino.
          </p>
          
          {/* Grid de productos placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="bg-gray-900/50 border border-gtaOrange/20 rounded-lg p-6 text-center animate-pulse"
              >
                <div className="h-48 bg-gray-800 rounded mb-4"></div>
                <div className="h-6 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded mb-4"></div>
                <div className="h-10 bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}