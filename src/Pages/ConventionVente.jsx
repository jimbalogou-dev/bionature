function ConventionVente() {
  const sections = [
    {
      title: '1. Objet',
      content: 'La présente Convention de vente a pour objet de définir les conditions dans lesquelles Bio Nature propose à la vente ses produits naturels, à travers son site internet et son service de commande via WhatsApp, à destination de tout client, particulier ou professionnel, résidant dans le monde entier.',
    },
    {
      title: '2. Produits et descriptions',
      content: 'Les produits proposés par Bio Nature sont décrits et présentés avec la plus grande exactitude possible. Les photographies et illustrations n\'entrent pas dans le champ contractuel et ne sauraient engager la responsabilité du vendeur en cas d\'erreur non substantielle.',
    },
    {
      title: '3. Prix',
      content: 'Les prix sont indiqués en dollars américains (USD), toutes taxes comprises, hors frais de livraison. Les frais de livraison sont communiqués au client avant la confirmation définitive de la commande, selon sa destination.',
    },
    {
      title: '4. Commande',
      content: 'Toute commande passée sur le site (ajout au panier, bouton "Commander maintenant") génère un message récapitulatif transmis à Bio Nature via WhatsApp. La commande n\'est considérée comme définitive qu\'après confirmation écrite de Bio Nature, précisant la disponibilité des produits et les modalités de paiement.',
    },
    {
      title: '5. Paiement',
      content: 'Le règlement s\'effectue selon les moyens de paiement proposés par Bio Nature au moment de la confirmation de commande (Mobile Money, virement bancaire, carte bancaire, ou autre moyen communiqué). Aucune expédition n\'est effectuée avant réception confirmée du paiement, sauf accord contraire explicite.',
    },
    {
      title: '6. Livraison',
      content: 'Les livraisons sont assurées par l\'agence DHL, partenaire logistique de Bio Nature, vers l\'ensemble des pays desservis par cette dernière. Un ticket de retrait et/ou un numéro de suivi est remis au client après expédition, lui permettant de récupérer son colis à l\'agence DHL de destination ou de suivre sa livraison à domicile selon le service choisi. Les délais indiqués sont donnés à titre indicatif et dépendent des conditions propres à chaque destination.',
    },
    {
      title: '7. Droit de rétractation et retours',
      content: 'Conformément aux pratiques commerciales en vigueur, toute demande d\'annulation ou de retour doit être adressée à Bio Nature dans les plus brefs délais après la commande, via WhatsApp ou le formulaire de contact du site, avant expédition du colis. Une fois le colis expédié, les conditions de retour sont étudiées au cas par cas.',
    },
    {
      title: '8. Responsabilité',
      content: 'Bio Nature met tout en œuvre pour garantir la qualité de ses produits. Les informations partagées sur le site ont un caractère informatif et ne sauraient se substituer à un avis médical professionnel. Bio Nature ne saurait être tenue responsable des retards imputables au transporteur ou aux autorités douanières du pays de destination.',
    },
    {
      title: '9. Données personnelles',
      content: 'Les informations transmises par le client (nom, contact, adresse) sont utilisées exclusivement dans le cadre du traitement de sa commande et de la relation client, et ne sont ni vendues ni cédées à des tiers.',
    },
    {
      title: '10. Contact',
      content: 'Pour toute question relative à la présente convention, le client peut contacter Bio Nature via le formulaire de contact du site ou directement via WhatsApp.',
    },
  ]

  return (
    <div>
      <section className="bg-[#f3f1ea] px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Convention de <span className="text-green-700">vente</span>
          </h1>
          <p className="text-gray-500 mt-4">
            Les présentes conditions régissent l'ensemble des ventes effectuées par Bio Nature,
            dans un objectif de transparence et de confiance envers nos clients.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-8">
        {sections.map(({ title, content }) => (
          <div key={title}>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ConventionVente