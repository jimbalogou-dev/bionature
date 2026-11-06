import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react'
import { premiumPacks } from '../data/premiumPacks'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { buildWhatsAppLink, buildCartMessage, WHATSAPP_NUMBER } from '../utils/whatsapp'

function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart()
  const { products, loading } = useProducts()

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-sm">Chargement du panier...</p>
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

  const handleOrderWhatsApp = () => {
    const message = buildCartMessage(cartItems)
    window.open(buildWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="text-gray-300 mx-auto" size={48} />
        <h1 className="text-xl font-bold text-gray-800 mt-4">Votre panier est vide</h1>
        <p className="text-gray-500 text-sm mt-2">Ajoutez des produits pour commencer vos achats.</p>
        <Link to="/boutique" className="inline-block mt-6 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
          Découvrir la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon panier</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50 shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h3>
                  {item.type === 'pack' && (
                    <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full shrink-0">Pack</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center border border-gray-200 rounded-lg shrink-0">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.type)} className="p-2 hover:bg-gray-50">
                  <Minus size={14} />
                </button>
                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.type)} className="p-2 hover:bg-gray-50">
                  <Plus size={14} />
                </button>
              </div>

              <p className="text-sm font-bold text-gray-800 w-16 text-right shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button onClick={() => removeFromCart(item.id, item.type)} className="text-gray-400 hover:text-red-500 shrink-0" aria-label="Supprimer">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="border border-gray-100 rounded-xl p-6 h-fit">
          <h2 className="font-semibold text-gray-800 mb-4">Résumé</h2>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Sous-total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Les frais de livraison seront confirmés avec vous selon votre destination.
          </p>

          <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleOrderWhatsApp}
            className="flex items-center justify-center gap-2 w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            <MessageCircle size={18} />
            Commander via WhatsApp
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Notre équipe vous recontactera pour confirmer votre commande et les modalités de paiement.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cart