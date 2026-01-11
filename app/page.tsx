import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CollectionSection from '@/components/CollectionSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-comic-black">
      <Navbar />
      
      <HeroSection />
      
      {/* Productos Destacados */}
      <ProductCard 
        title="EL JEFE"
        description="Una fragancia que impone respeto."
        price={299.99}
        imageSide="left"
        vignetteType="explosion"
      />
      
      <ProductCard 
        title="LA SOMBRA"
        description="Misterio y elegancia en cada gota."
        price={349.99}
        imageSide="right"
        vignetteType="cloud"
      />
      
      {/* Colecciones */}
      <CollectionSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}