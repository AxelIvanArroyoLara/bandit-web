import ProductCard from '../components/ProductCard'


const TestPage = () => {
  const sampleProduct = {
    id: 1,
    name: 'El Patrón',
    price: 149.99,
    description: 'Una fragancia que impone respeto. Notas de cuero envejecido, tabaco negro y ámbar, creada para aquellos que escriben su propio destino.',
    imageUrl: '/placeholder-perfume.png', // Cambia por tu imagen
    theme: {
      primaryColor: '#FF8C00', // Naranja GTA
      secondaryColor: '#B22222', // Rojo ladrillo
      backgroundImage: '/placeholder-bg.jpg' // Opcional
    }
  }

  return (
    <div className="min-h-screen bg-comicBlack">
      <ProductCard 
        product={sampleProduct} 
        layout="left"
        index={0}
      />
    </div>
  )
}

export default TestPage