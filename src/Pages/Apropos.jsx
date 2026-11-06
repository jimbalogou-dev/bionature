import { Link } from 'react-router-dom'
import { Leaf, Target, Eye } from 'lucide-react'

function APropos() {
  return (
    <div>
      {/* Bannière d'introduction */}
      <section className="bg-[#f3f1ea] px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            À propos de <span className="text-green-700">BioNature</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Une entreprise née de la passion pour les produits naturels et
            l'envie de rendre le bien-être accessible à tous.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notre histoire</h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            BioNature est né d'une conviction simple : la nature offre déjà
            tout ce dont nous avons besoin pour prendre soin de nous. Depuis
            des années, nous parcourons le monde à travers des recherches approfondies auprès des meilleurs
            producteurs et artisans engagés dans une démarche biologique et
            responsable.
          </p>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Aujourd'hui, nous accompagnons des milliers de clients dans leur
            quête d'un mode de vie plus sain, en proposant une sélection
            rigoureuse de produits naturels, du champ jusqu'à votre porte.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100">
          <img
            src="/Produit25-removebg-preview.png"
            alt="Ingrédients naturels BioNatura"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
              <Target className="text-green-700" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              Notre mission
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Rendre les bienfaits de la nature accessibles à tous, à travers
              des produits sains, efficaces et respectueux de l'environnement.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
              <Eye className="text-green-700" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              Notre vision
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Devenir la référence du bien-être naturel, en construisant une
              relation de confiance durable avec nos clients et partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="max-w-4xl mx-auto px-6 py-14 text-center">
        <Leaf className="text-green-700 mx-auto" size={32} />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Envie de découvrir nos produits ?
        </h2>
        <p className="text-gray-500 mt-2">
          Explorez notre sélection et trouvez les produits naturels adaptés à vos besoins.
        </p>
        <Link
          to="/boutique"
          className="inline-block mt-6 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Découvrir la boutique
        </Link>
      </section>
    </div>
  )
}

export default APropos