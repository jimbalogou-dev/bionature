import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'

const categoryLabels = {
  'vitalite-masculine': 'Vitalité masculine',
  'bien-etre-naturel': 'Bio Naturel & bien-être',
  'immunite-respiratoire': 'Immunité respiratoire & anti-hémorroïdes',
  'confort-endurance': 'Confort & endurance',
  'Sante-naturelle': 'Santé naturelle',
  'sante-prostatique': 'Santé prostatique',
}

function Boutique() {
  const { products, loading } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const categories = Object.keys(categoryLabels)

  const clearSearch = () => {
    searchParams.delete('q')
    setSearchParams(searchParams)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else {
      result.sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [selectedCategory, sortBy, searchQuery, products])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Boutique</h1>
        <p className="text-gray-500 mt-2">
          Découvrez tous nos produits naturels sélectionnés avec soin.
        </p>
      </div>

      {searchQuery && (
        <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-6">
          <p className="text-sm text-gray-700">
            Résultats pour : <span className="font-medium">"{searchQuery}"</span>
          </p>
          <button
            onClick={clearSearch}
            className="text-sm text-green-700 hover:underline"
          >
            Effacer
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">

        <aside className="hidden md:block w-56 shrink-0">
          <h3 className="font-semibold text-gray-800 mb-3">Catégories</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Tous les produits
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">

          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="md:hidden flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <SlidersHorizontal size={16} />
                Filtres
              </button>
              <p className="text-sm text-gray-500 hidden sm:block">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="popular">Popularité</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>

          {filtersOpen && (
            <div className="md:hidden flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => { setSelectedCategory('all'); setFiltersOpen(false) }}
                className={`px-3 py-1.5 rounded-full text-xs border ${
                  selectedCategory === 'all'
                    ? 'bg-green-800 text-white border-green-800'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setFiltersOpen(false) }}
                  className={`px-3 py-1.5 rounded-full text-xs border ${
                    selectedCategory === cat
                      ? 'bg-green-800 text-white border-green-800'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <p className="text-gray-500 text-center py-12">Chargement...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">
              Aucun produit trouvé{searchQuery ? ` pour "${searchQuery}"` : ' dans cette catégorie'}.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Boutique