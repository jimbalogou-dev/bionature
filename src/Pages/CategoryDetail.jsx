import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'

const categoryLabels = {
  'vitalite-masculine': 'Vitalité masculine',
  'bien-etre-naturel': 'Bio Naturel & bien-être',
  'immunite-respiratoire': 'Immunité respiratoire & anti-hémorroïdes',
  'confort-endurance': 'Confort & endurance',
  'sante-naturelle': 'Santé naturelle',
  'sante-prostatique': 'Santé prostatique',
}

function CategoryDetail() {
  const { categoryId } = useParams()
  const { products } = useProducts()
  const categoryName = categoryLabels[categoryId] || 'Catégorie'
  const filteredProducts = products.filter((p) => p.category === categoryId)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/categories"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 mb-6"
      >
        <ArrowLeft size={16} />
        Toutes les catégories
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryName}</h1>
      <p className="text-gray-500 mb-8">
        {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  )
}

export default CategoryDetail