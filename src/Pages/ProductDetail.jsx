import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, Minus, Plus, ArrowLeft, ShieldCheck, Truck, MessageCircle } from 'lucide-react'
import { useFavorites } from '../Context/FavoritesContext'
import { useCart } from '../Context/CartContext'
import { useProducts } from '../Context/ProductsContext'
import { useToast } from '../Context/ToastContext'
import { buildWhatsAppLink, buildProductMessage, WHATSAPP_NUMBER } from '../Utils/whatsapp'
import ProductCarousel from '../Components/ProductCarousel'

function ProductDetail() {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { getProductById, products, loading } = useProducts()
  const { showToast } = useToast()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setQuantity(1)
  }, [productId])

  if (loading && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 text-sm">Chargement...</p>
      </div>
    )
  }

  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">Produit introuvable.</p>
        <Link to="/boutique" className="text-green-700 hover:underline mt-4 inline-block">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  const otherProducts = products.filter((p) => p.id !== product.id)

  const handleOrderNow = () => {
    const message = buildProductMessage(product, quantity)
    window.open(buildWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    showToast(isFavorite(product.id) ? 'Retiré des favoris' : 'Ajouté aux favoris')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/boutique"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 mb-6"
      >
        <ArrowLeft size={16} />
        Retour à la boutique
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-sm hover:scale-110 transition-transform"
          >
            <Heart size={20} className={isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} avis)
            </span>
          </div>

          <p className="text-3xl font-bold text-green-800 mt-4">${product.price.toFixed(2)}</p>

          <p className="text-gray-500 mt-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm font-medium text-gray-700">Quantité</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 hover:bg-gray-50">
                <Minus size={16} />
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="p-2 hover:bg-gray-50">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => addToCart(product.id, quantity, 'product')}
              className="flex-1 border-2 border-green-800 text-green-800 hover:bg-green-50 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Ajouter au panier
            </button>
            <button
              onClick={handleOrderNow}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={18} />
              Commander maintenant
            </button>
          </div>

          <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck size={18} className="text-green-700" />
              Paiement sécurisé, confirmé par notre équipe
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={18} className="text-green-700" />
              Livraison internationale via DHL
            </div>
          </div>
        </div>
      </div>

      {otherProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Continuer mes achats</h2>
          <ProductCarousel products={otherProducts} />
        </div>
      )}
    </div>
  )
}

export default ProductDetail