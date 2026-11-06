import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { useFavorites } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'

function Favoris() {
  const { favorites } = useFavorites()
  const { products } = useProducts()
  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mes favoris</h1>
        <p className="text-gray-500 mt-2">
          Retrouvez ici tous les produits que vous avez ajoutés à vos favoris.
        </p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="text-gray-300 mx-auto" size={48} />
          <p className="text-gray-500 mt-4">
            Vous n'avez pas encore de produits favoris.
          </p>
          <Link
            to="/boutique"
            className="inline-block mt-4 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>
      )}
    </div>
  )
}

export default Favoris