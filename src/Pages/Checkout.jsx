import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ShieldCheck, Smartphone, CreditCard, Truck, Landmark, Wallet } from 'lucide-react'
import { premiumPacks } from '../data/premiumPacks'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { useProducts } from '../context/ProductsContext'

const countries = [
  { code: 'BJ', name: 'Bénin', currency: 'XOF' },
  { code: 'BF', name: 'Burkina Faso', currency: 'XOF' },
  { code: 'CI', name: 'Côte d\'Ivoire', currency: 'XOF' },
  { code: 'GW', name: 'Guinée-Bissau', currency: 'XOF' },
  { code: 'ML', name: 'Mali', currency: 'XOF' },
  { code: 'NE', name: 'Niger', currency: 'XOF' },
  { code: 'SN', name: 'Sénégal', currency: 'XOF' },
  { code: 'TG', name: 'Togo', currency: 'XOF' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN' },
  { code: 'GH', name: 'Ghana', currency: 'GHS' },
  { code: 'GN', name: 'Guinée', currency: 'GNF' },
  { code: 'SL', name: 'Sierra Leone', currency: 'SLL' },
  { code: 'LR', name: 'Liberia', currency: 'LRD' },
  { code: 'GM', name: 'Gambie', currency: 'GMD' },
  { code: 'CV', name: 'Cap-Vert', currency: 'CVE' },
  { code: 'CM', name: 'Cameroun', currency: 'XAF' },
  { code: 'GA', name: 'Gabon', currency: 'XAF' },
  { code: 'CG', name: 'Congo Brazzaville', currency: 'XAF' },
  { code: 'TD', name: 'Tchad', currency: 'XAF' },
  { code: 'CF', name: 'Centrafrique', currency: 'XAF' },
  { code: 'GQ', name: 'Guinée Équatoriale', currency: 'XAF' },
  { code: 'CD', name: 'RDC', currency: 'CDF' },
  { code: 'AO', name: 'Angola', currency: 'AOA' },
  { code: 'KE', name: 'Kenya', currency: 'KES' },
  { code: 'TZ', name: 'Tanzanie', currency: 'TZS' },
  { code: 'UG', name: 'Ouganda', currency: 'UGX' },
  { code: 'RW', name: 'Rwanda', currency: 'RWF' },
  { code: 'BI', name: 'Burundi', currency: 'BIF' },
  { code: 'ET', name: 'Éthiopie', currency: 'ETB' },
  { code: 'SS', name: 'Soudan du Sud', currency: 'SSP' },
  { code: 'DJ', name: 'Djibouti', currency: 'DJF' },
  { code: 'ZA', name: 'Afrique du Sud', currency: 'ZAR' },
  { code: 'ZM', name: 'Zambie', currency: 'ZMW' },
  { code: 'ZW', name: 'Zimbabwe', currency: 'ZWL' },
  { code: 'MZ', name: 'Mozambique', currency: 'MZN' },
  { code: 'MW', name: 'Malawi', currency: 'MWK' },
  { code: 'BW', name: 'Botswana', currency: 'BWP' },
  { code: 'NA', name: 'Namibie', currency: 'NAD' },
  { code: 'LS', name: 'Lesotho', currency: 'LSL' },
  { code: 'SZ', name: 'Eswatini', currency: 'SZL' },
  { code: 'MG', name: 'Madagascar', currency: 'MGA' },
  { code: 'MA', name: 'Maroc', currency: 'MAD' },
  { code: 'DZ', name: 'Algérie', currency: 'DZD' },
  { code: 'TN', name: 'Tunisie', currency: 'TND' },
  { code: 'EG', name: 'Égypte', currency: 'EGP' },
  { code: 'LY', name: 'Libye', currency: 'LYD' },
  { code: 'FR', name: 'France', currency: 'EUR' },
  { code: 'US', name: 'États-Unis', currency: 'USD' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'OTHER', name: 'Autre pays', currency: 'USD' },
]

const mobileMoneyByCountry = {
  BJ: ['MTN Mobile Money', 'Moov Money'],
  BF: ['Orange Money', 'Moov Money'],
  CI: ['Orange Money', 'MTN Mobile Money', 'Moov Money', 'Wave'],
  GW: ['Orange Money', 'MTN Mobile Money'],
  ML: ['Orange Money', 'Moov Money'],
  NE: ['Airtel Money', 'Moov Money'],
  SN: ['Orange Money', 'Free Money', 'Wave'],
  TG: ['Togocel T-Money', 'Moov Money'],
  NG: ['MTN Mobile Money', 'Airtel Money', 'OPay', 'PalmPay'],
  GH: ['MTN Mobile Money', 'AirtelTigo Money', 'Vodafone Cash'],
  GN: ['Orange Money', 'MTN Mobile Money'],
  SL: ['Orange Money', 'Africell Money', 'Qmoney'],
  LR: ['MTN Mobile Money', 'Orange Money'],
  GM: ['Africell Money', 'QCell Money'],
  CV: [],
  CM: ['Orange Money', 'MTN Mobile Money'],
  GA: ['Airtel Money'],
  CG: ['Airtel Money', 'MTN Mobile Money'],
  TD: ['Airtel Money', 'Moov Money'],
  CF: ['Orange Money', 'Airtel Money'],
  GQ: [],
  CD: ['Airtel Money', 'M-Pesa', 'Orange Money'],
  AO: ['Unitel Money', 'Multicaixa Express'],
  KE: ['M-Pesa', 'Airtel Money'],
  TZ: ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'HaloPesa'],
  UG: ['MTN Mobile Money', 'Airtel Money'],
  RW: ['MTN Mobile Money', 'Airtel Money'],
  BI: ['Lumicash', 'EcoCash'],
  ET: ['Telebirr', 'M-Pesa'],
  SS: ['MTN Mobile Money'],
  DJ: ['Waafi', 'D-Money'],
  ZA: [],
  ZM: ['MTN Mobile Money', 'Airtel Money', 'Zamtel Kwacha'],
  ZW: ['EcoCash', 'OneMoney'],
  MZ: ['M-Pesa', 'mKesh', 'e-Mola'],
  MW: ['Airtel Money', 'TNM Mpamba'],
  BW: ['Orange Money'],
  NA: [],
  LS: ['EcoCash', 'M-Pesa'],
  SZ: ['MTN Mobile Money'],
  MG: ['Orange Money', 'Mvola', 'Airtel Money'],
  MA: [],
  DZ: [],
  TN: [],
  EG: ['Vodafone Cash', 'Orange Money', 'Etisalat Cash'],
  LY: [],

  FR: [],
  US: [],
  OTHER: [],
}
const cinetPaySupportedCountries = ['BJ', 'BF', 'CI', 'ML', 'SN', 'TG', 'CM', 'TD', 'CG', 'CD', 'GN', 'GA', 'NE']

const paymentOptions = [
  { value: 'mobile_money', icon: Smartphone, label: 'Mobile Money', description: 'Orange Money, MTN, Moov, Wave, M-Pesa, Airtel Money selon votre pays' },
  { value: 'card', icon: CreditCard, label: 'Carte bancaire', description: 'Visa, Mastercard paiement sécurisé international' },
  { value: 'paypal', icon: Wallet, label: 'PayPal', description: 'Payez avec votre compte PayPal en toute sécurité' },
  { value: 'bank_transfer', icon: Landmark, label: 'Virement bancaire', description: 'Recevez nos coordonnées bancaires par email après la commande' },
  ]

function Checkout() {
  const { items, clearCart } = useCart()
  const { addOrder } = useOrders()
  const { products, loading } = useProducts()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'BJ',
    customCountry: '',
    paymentType: 'mobile_money',
    mobileOperator: '',
  })

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-sm">Chargement...</p>
      </div>
    )
  }

  const cartItems = items
    .map((item) => {
      const source = item.type === 'pack' ? premiumPacks : products
      const data = source.find((p) => p.id === item.id)
      if (!data) return null
      return { ...data, quantity: item.quantity, type: item.type }
    })
    .filter(Boolean)

  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const shipping = subtotal > 0 ? 4.99 : 0
  const total = subtotal + shipping

  const selectedCountry = countries.find((c) => c.code === formData.country)
  const isOtherCountry = formData.country === 'OTHER'
  const availableOperators = mobileMoneyByCountry[formData.country] || []
  const isCinetPaySupported = cinetPaySupportedCountries.includes(formData.country)
  const mobileMoneyAvailable = availableOperators.length > 0 && isCinetPaySupported

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const next = { ...prev, [name]: value }

      if (name === 'country') {
        next.mobileOperator = ''
        if (value !== 'OTHER') next.customCountry = ''
        const operators = mobileMoneyByCountry[value] || []
        const supported = cinetPaySupportedCountries.includes(value)
        if ((operators.length === 0 || !supported) && prev.paymentType === 'mobile_money') {
          next.paymentType = 'card'
        }
      }

      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (formData.paymentType === 'mobile_money' && !formData.mobileOperator) {
      alert('Merci de choisir un opérateur Mobile Money.')
      return
    }

    if (isOtherCountry && !formData.customCountry.trim()) {
      alert('Merci de préciser le nom de votre pays.')
      return
    }

    try {
      setSubmitting(true)
      await addOrder({
        items: cartItems,
        total,
        currency: selectedCountry?.currency,
        shippingInfo: {
          ...formData,
          country: isOtherCountry ? formData.customCountry.trim() : selectedCountry?.name,
        },
      })
      setOrderPlaced(true)
      clearCart()
    } catch (error) {
      setSubmitError(error.message || 'Erreur lors de la commande. Vérifiez que vous êtes connecté.')
    } finally {
      setSubmitting(false)
    }
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Votre panier est vide.</p>
        <Link to="/boutique" className="inline-block mt-6 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
          Découvrir la boutique
        </Link>
      </div>
    )
  }

  if (orderPlaced) {
    const confirmationMessages = {
      bank_transfer: 'Nos coordonnées bancaires viennent de vous être envoyées par email pour finaliser votre commande.',
      mobile_money: 'Vous allez recevoir une notification sur votre téléphone pour valider le paiement.',
      card: 'Votre paiement par carte a été initié, veuillez le confirmer pour finaliser votre commande.',
      paypal: 'Vous allez être redirigé vers PayPal pour finaliser votre paiement.',
    }

    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle className="text-green-700 mx-auto" size={56} />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Commande confirmée !</h1>
        <p className="text-gray-500 mt-2">{confirmationMessages[formData.paymentType]}</p>
        <div className="flex gap-3 justify-center mt-6">
          <Link to="/compte" className="border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Voir mes commandes
          </Link>
          <Link to="/boutique" className="bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Continuer mes achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finaliser la commande</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold text-gray-800 mb-4">Informations de livraison</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom complet</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    placeholder="+229 00 00 00 00"
                    className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Adresse</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange}
                  placeholder="Quartier, rue, numéro..."
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ville</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Pays</label>
                  <select name="country" value={formData.country} onChange={handleChange}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600">
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {isOtherCountry && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Précisez votre pays</label>
                  <input
                    type="text"
                    name="customCountry"
                    required
                    value={formData.customCountry}
                    onChange={handleChange}
                    placeholder="Ex : Comores, Seychelles, Maurice..."
                    className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Le Mobile Money n'est pas disponible pour ce pays, seuls la carte bancaire, PayPal, le virement bancaire sont disponibles.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-4">Mode de paiement</h2>
            <div className="space-y-3">
              {paymentOptions.map(({ value, icon: Icon, label, description }) => {
                const isMobileMoney = value === 'mobile_money'
                const disabled = isMobileMoney && !mobileMoneyAvailable

                return (
                  <label
                    key={value}
                    className={`flex items-start gap-3 border rounded-lg px-4 py-3 transition-colors ${
                      disabled
                        ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                        : 'border-gray-200 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value={value}
                      checked={formData.paymentType === value}
                      onChange={handleChange}
                      disabled={disabled}
                      className="accent-green-700 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <Icon size={16} className="text-green-700" />
                        {label}
                        {disabled && (
                          <span className="text-[10px] font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {availableOperators.length === 0 ? 'Non disponible pour ce pays' : 'Bientôt disponible pour ce pays'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{description}</p>

                      {isMobileMoney && formData.paymentType === 'mobile_money' && mobileMoneyAvailable && (
                        <div className="mt-3">
                          <select
                            name="mobileOperator"
                            value={formData.mobileOperator}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                          >
                            <option value="">Choisissez votre opérateur</option>
                            {availableOperators.map((op) => (
                              <option key={op} value={op}>{op}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {value === 'bank_transfer' && formData.paymentType === 'bank_transfer' && (
                        <p className="text-xs text-gray-500 mt-2 bg-gray-50 rounded-lg px-3 py-2">
                          Après validation, vous recevrez un email avec nos coordonnées bancaires (IBAN/RIB) et la référence à indiquer pour votre virement.
                        </p>
                      )}
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-6 h-fit">
          <h2 className="font-semibold text-gray-800 mb-4">
            Récapitulatif ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400">Qté : {item.quantity}</p>
                </div>
                <p className="text-xs font-medium text-gray-800 shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Livraison</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2 mt-4">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {submitting ? 'Traitement...' : 'Confirmer la commande'}
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 justify-center">
            <ShieldCheck size={14} />
            Paiement 100% sécurisé
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout