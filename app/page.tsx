import HeroSection from './components/HeroSection'
import ProductCard from './components/ProductCard'

export default function Home() {
  // SOLO 1 PRODUCTO DE PRUEBA
  const sampleProduct = {
    id: 1,
    name: 'EL PATRÓN',
    price: 249.99,
    shortDescription: 'La fragancia definitiva para quienes escriben sus propias reglas. Notas de cuero envejecido, tabaco negro y ámbar.',
    imageUrl: '/perfumes/Afnan9.png', // ← Cambiado: agregado / al inicio
    theme: {
      primaryColor: '#FF8C00', // Naranja GTA
      secondaryColor: '#B22222', // Rojo ladrillo
      backgroundImage: '/backgrounds/prueba_fondo.jpg' // ← Cambiado: agregado / al inicio
    }
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* SECCIÓN DE PRUEBA - SOLO 1 PRODUCTO */}
      <section id="productos" className="relative">
        <ProductCard 
          product={sampleProduct}
          layout="left"
        />
        
        {/* Espacio para probar scroll (simulando más productos) */}
        <div className="h-screen bg-comicBlack flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gtaOrange mb-4">
              Próximos Productos Aquí
            </h3>
            <p className="text-offWhite/70">
              Aquí irían los otros 7 perfumes con el mismo formato
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}