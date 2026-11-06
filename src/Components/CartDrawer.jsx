import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { premiumPacks } from '../data/premiumPacks'
import { buildWhatsAppLink, buildCartMessage, WHATSAPP_NUMBER } from '../utils/whatsapp'

function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart } = useCart()
  const { products } = useProducts()

  const cartItems = items
    .map((item) => {
      const source = item.type === 'pack' ? premiumPacks : products
      const data = source.find((p) => p.id === item.id)
      if (!data) return null
      return { ...data, quantity: item.quantity, type: item.type }
    })
    .filter(Boolean)

  const total = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0)

  const handleOrderWhatsApp = () => {
    const message = buildCartMessage(cartItems)
    window.open(buildWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag size={18} className="text-green-700" />
            Mon panier
          </h2>
          <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="text-gray-300 mx-auto" size={40} />
              <p className="text-gray-500 text-sm mt-3">Votre panier est vide.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.type)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.type)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    className="text-gray-300 hover:text-red-500 shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleOrderWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={18} />
              Commander via WhatsApp
            </button>

            <Link
              to="/panier"
              onClick={closeDrawer}
              className="block text-center text-sm text-gray-500 hover:text-green-700"
            >
              Voir le panier complet
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer