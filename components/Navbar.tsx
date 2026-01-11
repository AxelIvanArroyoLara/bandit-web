"use client"; // Necesario porque usamos estado y efectos

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-comic-black/90 backdrop-blur-md py-2 border-b-2 border-gta-orange' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-gta text-alucin-neon comic-border px-3 py-1">
            PerfumesBandido
          </h1>
        </div>

        {/* Enlaces de navegación - Ocultos en móvil por ahora */}
        <div className="hidden md:flex space-x-8">
          {['Inicio', 'Catálogo', 'Contacto', 'Perfil'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="font-comic text-white hover:text-alucin-neon transition-colors text-lg"
            >
              {item}
            </a>
          ))}
          {/* Icono de búsqueda */}
          <button className="text-white hover:text-alucin-pink">
            🔍
          </button>
        </div>

        {/* Menú hamburguesa para móvil */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </nav>
  );
}