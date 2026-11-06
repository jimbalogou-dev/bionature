import { Link } from 'react-router-dom'
import { Leaf, ShieldCheck, Truck } from 'lucide-react'

function Hero() {
  const trustPoints = [
    {
      icon: Leaf,
      title: '100% Naturel',
      subtitle: 'Sans additifs',
    },
    {
      icon: ShieldCheck,
      title: 'Paiement sécurisé',
      subtitle: 'Transactions protégées',
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      subtitle: 'Partout dans le monde',
    },
  ]

  return (
    <section className="bg-[#f3f1ea] rounded-3xl mx-6 mt-6 px-8 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Texte à gauche */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            La nature <br />
            au service de votre <br />
            <span className="text-green-700">bien-être.</span>
          </h2>

          <p className="text-gray-500 mt-6 max-w-md">
            Découvrez une sélection de produits naturels rigoureusement
            choisis pour votre santé et votre bien-être au quotidien.
          </p>

          <Link
            to="/boutique"
            className="inline-block mt-8 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>

        {/* Image à droite */}
        <div className="flex justify-center">
          <img
            src="/hero.jpg"
            alt="Produits naturels Bio Nature en bouteilles et pots"
            fetchPriority="high"
            decoding="async"
            className="max-w-md w-full object-contain"
          />
        </div>
      </div>

      {/* Badges de confiance */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
        {trustPoints.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-full">
              <Icon className="text-green-700" size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{title}</p>
              <p className="text-gray-500 text-xs">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero