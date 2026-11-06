import { Link } from 'react-router-dom'
import { Droplet, Leaf, SprayCan, Salad, Pill, Sprout } from 'lucide-react'
import { useProducts } from '../Context/ProductsContext'

const iconMap = { Droplet, Leaf, SprayCan, Salad, Pill, Sprout }

const categories = [
  { id: 'vitalite-masculine', name: 'Vitalité masculine', icon: 'Droplet', description: 'Produits naturels pour soutenir l\'énergie et la vitalité au quotidien' },
  { id: 'bien-etre-naturel', name: 'Bio Naturel & bien-être', icon: 'Leaf', description: 'Une sélection large de produits naturels pour votre équilibre général' },
  { id: 'immunite-respiratoire', name: 'Immunité respiratoire & anti-hémorroïdes', icon: 'SprayCan', description: 'Solutions naturelles ciblées pour l\'immunité et le confort quotidien' },
  { id: 'confort-endurance', name: 'Confort & endurance', icon: 'Salad', description: 'Produits pour soutenir l\'endurance et combattre les infections' },
  { id: 'sante-naturelle', name: 'Santé naturelle', icon: 'Pill', description: 'Compléments nutritionnels pour une vitalité optimale' },
  { id: 'sante-prostatique', name: 'Santé prostatique', icon: 'Sprout', description: 'Produits ciblés pour accompagner la santé prostatique' },
]

function Categories() {
  const { products } = useProducts()
  const countByCategory = (id) =>
    products.filter((p) => p.category === id).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Catégories</h1>
        <p className="text-gray-500 mt-2">
          Explorez notre gamme de produits naturels par catégorie.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ id, name, icon, description }) => {
          const Icon = iconMap[icon]
          const count = countByCategory(id)

          return (
            <Link
              key={id}
              to={`/categories/${id}`}
              className="border border-gray-100 rounded-2xl p-6 hover:border-green-600 hover:shadow-md transition-all group"
            >
              <div className="bg-green-100 group-hover:bg-green-700 w-14 h-14 rounded-full flex items-center justify-center transition-colors">
                <Icon className="text-green-700 group-hover:text-white transition-colors" size={26} />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
              <p className="text-xs text-green-700 font-medium mt-3">
                {count} produit{count > 1 ? 's' : ''}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Categories