'use client'
import Image from 'next/image'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartItem({ item }: { item: any }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center gap-4 bg-black/40 p-3 border-l-4 border-gtaOrange mb-4 group transition-all hover:bg-black/60">
      <div className="relative w-20 h-20 bg-gray-900 overflow-hidden border border-white/10">
        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
      </div>
      
      <div className="flex-1">
        <h4 className="font-archivo text-lg leading-tight uppercase">{item.name}</h4>
        <p className="text-gtaOrange font-archivo">${item.price}</p>
        
        <div className="flex items-center gap-3 mt-2">
          <button 
            onClick={() => updateQuantity(item.id, -1)}
            className="p-1 hover:bg-gtaOrange hover:text-black transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-archivo text-xl">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1 hover:bg-gtaOrange hover:text-black transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button 
        onClick={() => removeFromCart(item.id)}
        className="text-white/30 hover:text-red-500 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}