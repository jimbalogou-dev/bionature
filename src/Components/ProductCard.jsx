import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Check } from 'lucide-react'
import { useFavorites } from '../Context/FavoritesContext'
import { useCart } from '../Context/CartContext'
import { useToast } from '../Context/ToastContext'

function ProductCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const favorite = isFavorite(product.id)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product.id, 1, 'product')
    setAdded(true)
    showToast(`${product.name} ajouté au panier`)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    showToast(favorite ? 'Retiré des favoris' : 'Ajouté aux favoris')
  }

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
      <div className="relative aspect-square bg-gray-50">
        <Link to={`/produit/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </Link>
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={16} className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <div className="p-4">
        <Link to={`/produit/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] hover:text-green-700">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <p className="text-lg font-bold text-gray-800 mt-2">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          className={`w-full mt-3 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            added ? 'bg-green-100 text-green-800' : 'bg-green-800 hover:bg-green-900 text-white'
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Ajouté !
            </>
          ) : (
            'Ajouter au panier'
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductCard