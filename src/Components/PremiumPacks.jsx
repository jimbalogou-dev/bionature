import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { premiumPacks } from '../data/premiumPacks'
import { useCart } from '../Context/CartContext'
import { useToast } from '../Context/ToastContext'

function PremiumPacks() {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [addedId, setAddedId] = useState(null)

  const handleAddToCart = (pack) => {
    addToCart(pack.id, 1, 'pack')
    setAddedId(pack.id)
    showToast(`${pack.name} ajouté au panier`)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-700 to-green-900 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <Sparkles size={12} />
          Packs Premium
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
          Nos formules combinées
        </h2>
        <p className="text-gray-500 mt-3">
          Des packs pensés pour une efficacité maximale, à prix réduit par
          rapport à un achat séparé.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {premiumPacks.map((pack) => {
          const discount = Math.round(((pack.originalPrice - pack.price) / pack.originalPrice) * 100)
          const isAdded = addedId === pack.id

          return (
            <div
              key={pack.id}
              className="border-2 border-green-100 rounded-2xl overflow-hidden hover:border-green-600 hover:shadow-lg transition-all bg-white relative flex flex-col"
            >
              {pack.badge && (
                <span className="absolute top-4 left-4 bg-green-800 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                  {pack.badge}
                </span>
              )}

              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6">
                <img
                  src={pack.image}
                  alt={pack.name}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-green-700 font-medium">{pack.tagline}</p>
                <h3 className="text-lg font-bold text-gray-800 mt-1">{pack.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{pack.description}</p>

                <ul className="mt-4 space-y-2 flex-1">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-green-700 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 mt-5">
                  <p className="text-2xl font-bold text-gray-800">${pack.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 line-through">${pack.originalPrice.toFixed(2)}</p>
                  <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(pack)}
                  className={`w-full mt-4 text-sm font-medium py-3 rounded-lg transition-colors ${
                    isAdded ? 'bg-green-100 text-green-800' : 'bg-green-800 hover:bg-green-900 text-white'
                  }`}
                >
                  {isAdded ? 'Ajouté au panier ✓' : 'Ajouter au panier'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PremiumPacks