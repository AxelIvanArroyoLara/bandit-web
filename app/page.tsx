'use client'
import ProductCard from './components/ProductCard'
import HeroSection from './components/HeroSection'
import { Car, Building2, Trees as PalmTree, Crown, Landmark, Ship, Zap, TowerControl as Building, Castle } from 'lucide-react'

const PERFUMES_DATA = [
  { id: 1, name: "Fakhar Extrait", price: 1850, image: "/perfumes/FAKHAREXTRAIT.png", accentColor: "#D4AF37", silhouette: Castle, layout: "left" },
  { id: 2, name: "Eros Versace", price: 2100, image: "/perfumes/EROSVERSACE.png", accentColor: "#008B8B", silhouette: Car, layout: "right" },
  { id: 3, name: "Scandal", price: 1950, image: "/perfumes/Scandal.png", accentColor: "#C71585", silhouette: Building2, layout: "left" },
  { id: 4, name: "Valentino Roma", price: 2300, image: "/perfumes/valentinoRoma.png", accentColor: "#FF4500", silhouette: Landmark, layout: "right" },
  { id: 5, name: "Afnan 9 Pm", price: 1200, image: "/perfumes/Afnan9.png", accentColor: "#4169E1", silhouette: Building, layout: "left" },
  { id: 6, name: "Carolina Herrera", price: 2400, image: "/perfumes/CarolinaHerrera.png", accentColor: "#4B0082", silhouette: Zap, layout: "right" },
  { id: 7, name: "Donna Valentino", price: 2250, image: "/perfumes/DONNAVALENTINO.png", accentColor: "#DB7093", silhouette: PalmTree, layout: "left" },
  { id: 8, name: "Jean Paul Gaultier", price: 2150, image: "/perfumes/JEANPAULGAULTIER.png", accentColor: "#000080", silhouette: Ship, layout: "right" },
  { id: 9, name: "Gaultier Divine", price: 2200, image: "/perfumes/jeangaultier-removebg.png", accentColor: "#8B4513", silhouette: Crown, layout: "left" },
];

export default function Home() {
  return (
    <div className="bg-gta-black min-h-screen">
      <HeroSection />
      {/* Aquí iría tu HeroSection actual */}
      {PERFUMES_DATA.map((perfume) => (
        <ProductCard key={perfume.id} product={perfume} />
      ))}
    </div>
  )
}

