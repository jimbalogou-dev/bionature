import { useState } from 'react'
import { Truck, Globe2, ShieldCheck, Clock, PackageCheck, ExternalLink, MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '../utils/whatsapp'

function formatPhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return `+${digits}`
}

function DHL() {
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('dhlWhatsAppNumber') || '+1 (732) 956-9549')
  const [savedPhoneNumber, setSavedPhoneNumber] = useState(() => {
    const storedNumber = localStorage.getItem('dhlWhatsAppNumber')
    return storedNumber ? storedNumber.replace(/\D/g, '') : '17329569549'
  })
  const [phoneError, setPhoneError] = useState('')

  const handleSavePhoneNumber = (event) => {
    event.preventDefault()
    const normalizedNumber = phoneNumber.replace(/\D/g, '')

    if (normalizedNumber.length < 7 || normalizedNumber.length > 15) {
      setPhoneError('Saisissez un numéro international valide, avec son indicatif pays.')
      return
    }

    localStorage.setItem('dhlWhatsAppNumber', normalizedNumber)
    setPhoneNumber(normalizedNumber)
    setSavedPhoneNumber(normalizedNumber)
    setPhoneError('')
  }

  const stats = [
    { value: '220+', label: 'Pays et territoires desservis' },
    { value: '3-7j', label: 'Délai moyen en zone urbaine' },
    { value: '100%', label: 'Colis suivis en temps réel' },
  ]

  const reasons = [
    {
      icon: Globe2,
      title: 'Couverture mondiale',
      description: 'DHL est présent dans plus de 220 pays et territoires à travers le monde, ce qui nous permet de vous livrer où que vous soyez.',
    },
    {
      icon: Clock,
      title: 'Rapidité reconnue',
      description: 'Leader mondial de la logistique express, DHL optimise chaque étape du transport pour réduire les délais de livraison.',
    },
    {
      icon: ShieldCheck,
      title: 'Fiabilité et sécurité',
      description: 'Vos colis sont manipulés avec soin, assurés, et suivis à chaque étape du trajet jusqu\'à leur destination finale.',
    },
    {
      icon: PackageCheck,
      title: 'Suivi en temps réel',
      description: 'Dès l\'expédition de votre commande, vous recevez un numéro de suivi officiel DHL pour suivre votre colis en direct.',
    },
  ]

  return (
    <div>
      <section className="bg-[#f3f1ea] px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-white w-16 h-16 rounded-full shadow-sm mb-4">
            <Truck className="text-green-700" size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Livraison internationale avec <span className="text-green-700">DHL</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Bio Nature s'associe à DHL, leader mondial du transport express, pour vous garantir
            une livraison rapide, sécurisée et suivie, où que vous soyez dans le monde.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-3 gap-4 mb-14">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center border border-gray-100 rounded-xl py-6 px-3">
              <p className="text-2xl sm:text-3xl font-bold text-green-800">{value}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Pourquoi nous avons choisi DHL
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Icon className="text-green-700" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Comment se passe votre livraison
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-green-700 font-bold text-3xl mb-2">1</p>
              <p className="text-sm text-gray-600">
                Votre commande est confirmée par notre équipe via WhatsApp, puis préparée avec soin.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-green-700 font-bold text-3xl mb-2">2</p>
              <p className="text-sm text-gray-600">
                Le colis est remis à DHL, qui vous envoie un numéro de suivi officiel par email ou WhatsApp.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-green-700 font-bold text-3xl mb-2">3</p>
              <p className="text-sm text-gray-600">
                Vous recevez votre colis, ou le récupérez à l'agence DHL la plus proche grâce à votre ticket.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="border border-green-100 bg-green-50 rounded-2xl p-6 sm:p-8 text-center">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="text-green-700" size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Contacter le service DHL</h2>
          <p className="text-sm text-gray-600 mt-2 mb-5">
            Numéro WhatsApp du service DHL international pour toute question sur les livraisons.
          </p>
          <p className="text-2xl font-bold text-green-800 mb-5" dir="ltr">
            {formatPhoneNumber(savedPhoneNumber)}
          </p>
          <form onSubmit={handleSavePhoneNumber} className="max-w-md mx-auto">
            <label htmlFor="dhl-whatsapp-number" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Numéro WhatsApp de DHL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="dhl-whatsapp-number"
                type="tel"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value)
                  setPhoneError('')
                }}
                placeholder="Ex. +33 1 23 45 67 89"
                autoComplete="tel"
                className="min-w-0 flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-900 text-white font-medium px-5 py-3 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
            {phoneError && (
              <p role="alert" className="text-sm text-red-600 mt-2 text-left">{phoneError}</p>
            )}
          </form>
          {savedPhoneNumber.length >= 7 && savedPhoneNumber.length <= 15 && (
            <a
              href={buildWhatsAppLink(savedPhoneNumber, 'Bonjour, je souhaite contacter le service DHL au sujet d\'une livraison.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={18} />
              Contacter le service DHL sur WhatsApp
            </a>
          )}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Suivre un colis DHL</h2>
        <p className="text-gray-500 mb-6">
          Une fois votre commande expédiée, utilisez le numéro de suivi fourni sur le site officiel ou via whatsapp du service DHL pour recupérer votre colis à l'agence DHL près de votre pays.
        </p>
      </section>
    </div>
  )
}

export default DHL