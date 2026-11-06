import { Leaf, ShieldCheck, Truck, Recycle, Heart, Users } from 'lucide-react'

function Engagements() {
  const engagements = [
    {
      icon: Leaf,
      title: '100% Naturel',
      description: 'Tous nos produits sont fabriqués à partir d\'ingrédients naturels, sans additifs chimiques ni conservateurs artificiels. Nous sélectionnons rigoureusement chaque matière première.',
    },
    {
      icon: Recycle,
      title: 'Respect de l\'environnement',
      description: 'Nos emballages sont recyclables ou biodégradables. Nous travaillons continuellement à réduire notre empreinte carbone tout au long de notre chaîne de production.',
    },
    {
      icon: Users,
      title: 'Commerce équitable',
      description: 'Nous collaborons avec des producteurs locaux et des coopératives, en garantissant une rémunération juste et des conditions de travail respectueuses.',
    },
    {
      icon: ShieldCheck,
      title: 'Qualité contrôlée',
      description: 'Chaque lot de production est testé et certifié selon les normes biologiques en vigueur, pour vous garantir des produits sûrs et efficaces.',
    },
    {
      icon: Truck,
      title: 'Livraison responsable',
      description: 'Nous optimisons nos circuits de livraison pour réduire les émissions de CO2, avec des options d\'expédition groupée disponibles.',
    },
    {
      icon: Heart,
      title: 'Bien-être avant tout',
      description: 'Notre mission est simple : vous accompagner vers un mode de vie plus sain, en toute transparence sur la composition de nos produits.',
    },
  ]

  return (
    <div>
      {/* Bannière d'introduction */}
      <section className="bg-[#f3f1ea] px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Nos <span className="text-green-700">engagements</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Chez BioNature, chaque produit que nous proposons répond à des
            valeurs fortes : naturalité, transparence et respect pour vous
            et pour la planète.
          </p>
        </div>
      </section>

      {/* Grille des engagements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagements.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-green-600 transition-all"
            >
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center">
                <Icon className="text-green-700" size={26} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bandeau chiffres clés */}
      <section className="bg-green-800 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <p className="text-3xl font-bold">100%</p>
            <p className="text-sm text-green-100 mt-1">Produits naturels</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50+</p>
            <p className="text-sm text-green-100 mt-1">Producteurs partenaires</p>
          </div>
          <div>
            <p className="text-3xl font-bold">2,5k+</p>
            <p className="text-sm text-green-100 mt-1">Clients satisfaits de nos produits</p>
          </div>
          <div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-green-100 mt-1">Additifs chimiques</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Engagements