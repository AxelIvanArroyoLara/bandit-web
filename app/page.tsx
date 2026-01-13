'use client'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import HeroSection from './components/HeroSection'
import ProductGrid from './components/ProductGrid'
import ProductGrid2 from './components/ProductGrid2'
import ProductGrid3 from './components/ProductGrid3'
import ProductGrid4 from './components/ProductGrid4'
import ProductGridMisiones from './components/ProductGridMisiones'
import ProductGridRadar from './components/ProductGridRadar'
import ProductGridHibrido from './components/ProductGridHibrido'
import { PERFUMES_DATA } from './data/perfumes'

export default function Home() {
  return (
    <div className="bg-gta-black min-h-screen">
      <Navbar/>
      <HeroSection />
      <ProductGridHibrido />
      <ProductGridMisiones />
      <ProductGridRadar />
      {PERFUMES_DATA.map((perfume) => (
        <ProductCard key={perfume.id} product={perfume} />
      ))}
      
    </div>
  )
}