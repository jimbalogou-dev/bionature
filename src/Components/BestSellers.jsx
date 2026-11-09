import { Link } from 'react-router-dom'
import { useProducts } from '../Context/ProductsContext'
import ProductCard from './ProductCard'

function BestSellers() {
  const { products, loading } = useProducts()
  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5)

  return (
    <section className="max-w-7xl mx-auto px-6 mt-14">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Nos meilleures ventes</h2>
        <Link to="/boutique" className="text-green-700 text-sm font-medium hover:underline">
          Voir toutes les produits
        </Link>
      </div>

      {loading && products.length === 0 ? (
        <p className="text-sm text-gray-400">Chargement des produits...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BestSellers