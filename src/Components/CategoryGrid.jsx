import { Link } from 'react-router-dom'
import { Droplet, Leaf, SprayCan, Salad, Pill, Sprout } from 'lucide-react'

const iconMap = { Droplet, Leaf, SprayCan, Salad, Pill, Sprout }

const categories = [
  { id: 1, name: 'Vitalité masculine', icon: 'Droplet', path: '/categories/vitalite-masculine' },
  { id: 2, name: 'Bio Naturel & bien-être', icon: 'Leaf', path: '/categories/bien-etre-naturel' },
  { id: 3, name: 'Immunité respiratoire & anti-hémorroïdes', icon: 'SprayCan', path: '/categories/immunite-respiratoire' },
  { id: 4, name: 'Confort & endurance', icon: 'Salad', path: '/categories/confort-endurance' },
  { id: 5, name: 'Santé naturelle', icon: 'Pill', path: '/categories/sante-naturelle' },
  { id: 6, name: 'Santé prostatique', icon: 'Sprout', path: '/categories/sante-prostatique' },
]

function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-14">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Catégories populaires</h2>
        <Link to="/categories" className="text-green-700 text-sm font-medium hover:underline">
          Voir toutes
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(({ id, name, icon, path }) => {
          const Icon = iconMap[icon]
          return (
            <Link
              key={id}
              to={path}
              className="flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-xl py-6 hover:border-green-600 hover:shadow-sm transition-all"
            >
              <Icon className="text-green-700" size={26} />
              <span className="text-sm text-gray-700 text-center">{name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryGrid