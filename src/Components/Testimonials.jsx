import { Star, ShieldCheck, Quote } from 'lucide-react'
import { testimonials, trustStats } from '../data/testimonials'

function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
      
      {/* En-tête de section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            Témoignages
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
          Ce que disent nos clients apres avoir utilisé nos produits naturels
        </h2>
        <p className="text-gray-500 mt-3">
          Des milliers de personnes nous font confiance chaque mois pour
          leur bien-être. Découvrez leurs témoignages.
        </p>
      </div>

      {/* Bandeau de chiffres de confiance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 bg-[#f3f1ea] rounded-2xl px-6 py-8">
        {trustStats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-green-800">{value}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Grille de témoignages */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(({ id, name, location, rating, text, product, verified }) => (
          <div
            key={id}
            className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow relative"
          >
            <Quote className="text-green-100 absolute top-5 right-5" size={40} />

            {/* Étoiles */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
                />
              ))}
            </div>

            {/* Texte du témoignage */}
            <p className="text-sm text-gray-600 leading-relaxed relative z-10">
              « {text} »
            </p>

            {/* Produit acheté */}
            <p className="text-xs text-green-700 font-medium mt-4">
              Produit : {product}
            </p>

            {/* Auteur */}
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-50">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-800 text-sm font-semibold">
                  {name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-800">{name}</p>
                  {verified && (
                    <ShieldCheck size={14} className="text-green-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-400">{location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials