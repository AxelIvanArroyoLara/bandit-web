'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // 1. NUEVO ESTADO: Para controlar el carrito por separado
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Catálogo', href: '#productos' }, // Cambié esto para que tenga más sentido
    { name: 'Buscar', href: '#' },
    { name: 'Pago', href: '#' },
  ]

  return (
    <>
      <nav className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 border-b-2 border-[#FF8C00]' 
          : 'bg-transparent py-5'
        }
      `}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-[#FF8C00] font-dancing tracking-tighter">
                BandidoPerfumes
              </h1>
            </div>

            {/* ENLACES - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[#F5F5F5] hover:text-[#FF8C00] font-semibold transition-colors relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#39FF14] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* ICONOS */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="p-2 text-[#F5F5F5] hover:text-[#FF8C00] transition-colors">
                <Search size={22} />
              </button>
              
              {/* BOTÓN DEL CARRITO - Ahora abre el CartDrawer */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="p-2 text-[#F5F5F5] hover:text-[#FF8C00] transition-all relative group"
              >
                <ShoppingCart size={22} />
                {/* 2. CONTADOR REAL: Solo se muestra si hay items */}
                {totalItems > 0 && (
                  <span className="
                    absolute -top-1 -right-1
                    w-5 h-5
                    bg-[#B22222] 
                    text-[#F5F5F5] 
                    text-xs 
                    rounded-full 
                    flex items-center justify-center
                    font-bold
                    animate-bounce
                  ">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button className="p-2 text-[#F5F5F5] hover:text-[#FF8C00] hidden md:block transition-colors">
                <User size={22} />
              </button>
              
              {/* MENÚ HAMBURGUESA - Solo para móviles */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#F5F5F5] hover:text-[#FF8C00] md:hidden transition-colors"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-[#FF8C00]/30 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-[#F5F5F5] hover:text-[#FF8C00] py-2 px-4 hover:bg-[#FF8C00]/10 rounded-lg transition-all font-semibold">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 3. RENDERIZAR EL CARRITO: Este componente es el que se desliza */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar