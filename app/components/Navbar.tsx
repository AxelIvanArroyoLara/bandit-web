'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Carrito', href: '#' },
    { name: 'Buscar', href: '#' },
    { name: 'Pago', href: '#' },
  ]

  return (
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#FF8C00] font-dancing">
              PerfumesBandido
            </h1>
          </div>

          {/* ENLACES DE NAVEGACIÓN - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  text-[#F5F5F5] 
                  hover:text-[#FF8C00] 
                  font-semibold 
                  transition-colors 
                  duration-200
                  relative
                  group
                "
              >
                {link.name}
                <span className="
                  absolute -bottom-1 left-0 
                  w-0 h-0.5 
                  bg-[#39FF14] 
                  group-hover:w-full
                  transition-all duration-300
                "></span>
              </a>
            ))}
          </div>

          {/* ICONOS */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="
              p-2 
              text-[#F5F5F5] 
              hover:text-[#FF8C00] 
              hover:bg-[#0a0a0a]/50 
              rounded-lg 
              transition-all 
              duration-200
            ">
              <Search size={22} />
            </button>
            
            <button className="
              p-2 
              text-[#F5F5F5] 
              hover:text-[#FF8C00] 
              hover:bg-[#0a0a0a]/50 
              rounded-lg 
              transition-all 
              duration-200
              relative
            ">
              <ShoppingCart size={22} />
              <span className="
                absolute -top-1 -right-1
                w-5 h-5
                bg-[#B22222] 
                text-[#F5F5F5] 
                text-xs 
                rounded-full 
                flex items-center justify-center
                font-bold
              ">
                3
              </span>
            </button>
            
            <button className="
              p-2 
              text-[#F5F5F5] 
              hover:text-[#FF8C00] 
              hover:bg-[#0a0a0a]/50 
              rounded-lg 
              transition-all 
              duration-200
              hidden md:block
            ">
              <User size={22} />
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                p-2 
                text-[#F5F5F5] 
                hover:text-[#FF8C00] 
                md:hidden
                transition-colors 
                duration-200
              "
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#FF8C00]/30">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    text-[#F5F5F5] 
                    hover:text-[#FF8C00] 
                    py-2 
                    px-4
                    hover:bg-[#FF8C00]/10 
                    rounded-lg
                    transition-all 
                    duration-200
                    font-semibold
                  "
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="
                  text-[#F5F5F5] 
                  hover:text-[#FF8C00] 
                  py-2 
                  px-4
                  hover:bg-[#FF8C00]/10 
                  rounded-lg
                  transition-all 
                  duration-200
                  font-semibold
                  flex items-center space-x-2
                "
              >
                <User size={20} />
                <span>Perfil</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar