'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    shortDescription: string
    imageUrl: string // Imagen del perfume
    theme: {
      primaryColor: string
      secondaryColor: string
      backgroundImage?: string // Imagen de fondo (opcional)
    }
  }
  layout?: 'left' | 'right'
}

const ProductCard = ({ 
  product, 
  layout = 'left'
}: ProductCardProps) => {
  const isImageLeft = layout === 'left'

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con imagen o color */}
      <div className="absolute inset-0">
        {product.theme.backgroundImage ? (
          // Si hay imagen de fondo
          <div className="absolute inset-0">
            <Image
              src={product.theme.backgroundImage}
              alt={`Fondo ${product.name}`}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-comicBlack/70 via-comicBlack/50 to-comicBlack/70" />
          </div>
        ) : (
          // Si no hay imagen, usar gradiente con colores del tema
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, 
                ${product.theme.primaryColor}15 0%, 
                #0a0a0a 40%, 
                #0a0a0a 60%, 
                ${product.theme.secondaryColor}15 100%)`
            }}
          />
        )}

        {/* Efecto de líneas verticales (fragmentación) */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${25 + i * 25}%`,
                background: `linear-gradient(to bottom, transparent, ${product.theme.primaryColor}20, transparent)`,
                boxShadow: `0 0 10px ${product.theme.primaryColor}30`
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className={`w-full flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
          
          {/* COLUMNA DE LA IMAGEN */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Sombra bajo el perfume */}
              <div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-4 rounded-full blur-md"
                style={{ 
                  backgroundColor: product.theme.primaryColor,
                  opacity: 0.3 
                }}
              />
              
              {/* Imagen del perfume */}
              <div className="relative w-full h-full group">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800/30 rounded-lg border-2 border-dashed border-gtaOrange/30 flex items-center justify-center">
                    <span className="text-offWhite/50">Imagen del perfume</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLUMNA DE LA INFORMACIÓN */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg mx-auto lg:mx-0">
              
              {/* Nombre del perfume */}
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4 font-dancing"
                style={{ color: product.theme.primaryColor }}
              >
                {product.name}
              </h2>

              {/* Precio */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-offWhite">
                  ${product.price.toFixed(2)} <span className="text-lg text-offWhite/70">MXN</span>
                </div>
              </div>

              {/* Descripción breve */}
              <div className="mb-8">
                <p className="text-lg text-offWhite/80 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Botón de comprar */}
              <button className="group relative px-8 py-4 bg-gtaOrange text-comicBlack font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-full max-w-xs">
                <span className="relative flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  AÑADIR AL CARRITO
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisoria inferior */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ 
          background: `linear-gradient(to right, transparent, ${product.theme.primaryColor}, transparent)`,
          opacity: 0.5
        }}
      />
    </div>
  )
}

export default ProductCard