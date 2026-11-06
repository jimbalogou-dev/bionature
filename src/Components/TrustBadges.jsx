import { Leaf, ShieldCheck, Truck, Headset } from 'lucide-react'

function TrustBadges() {
  const badges = [
    { icon: Leaf, title: 'Qualité garantie', subtitle: 'Des produits sélectionnés avec soin.' },
    { icon: ShieldCheck, title: 'Paiement 100% sécurisé', subtitle: 'Vos transactions sont protégées.' },
    { icon: Truck, title: 'Livraison internationale', subtitle: 'Livraison rapide partout dans le monde.' },
    { icon: Headset, title: 'Support 24/7', subtitle: 'Nous sommes là pour vous aider.' },
  ]

  return (
    <section className="bg-[#f3f1ea] mx-6 mt-14 rounded-2xl px-8 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="text-green-700 mt-1" size={22} />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{title}</p>
              <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBadges