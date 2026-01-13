'use client'
import { useCart } from '../context/CartContext'
import { X, ShoppingBag } from 'lucide-react'
import CartItem from './CartItem'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, totalPrice } = useCart()

  return (
    <>
      {/* Backdrop (Fondo oscuro) */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[998] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel Lateral */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l-4 border-gtaOrange z-[999] shadow-[-20px_0_50px_rgba(0,0,0,0.9)] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
            <h2 className="font-archivo text-4xl flex items-center gap-3">
              <ShoppingBag className="text-gtaOrange" /> TU CARRITO
            </h2>
            <button onClick={onClose} className="hover:rotate-90 transition-transform p-2">
              <X size={32} />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20">
                <ShoppingBag size={80} />
                <p className="font-archivo text-2xl mt-4">EL CARRITO ESTÁ VACÍO</p>
              </div>
            ) : (
              cart.map(item => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/* Footer del Carrito */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <div className="flex justify-between items-end">
              <span className="font-archivo text-xl text-white/50">TOTAL</span>
              <span className="font-archivo text-5xl text-gtaOrange">${totalPrice}</span>
            </div>

            <button className="group relative w-full flex items-center justify-center py-6 font-archivo text-2xl text-black overflow-hidden border-4 border-black shadow-[8px_8px_0px_#000] active:translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]" />
              <span className="relative z-10 font-black italic">FINALIZAR PEDIDO</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}