import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, Package, Heart, ShoppingBag, TrendingUp } from 'lucide-react'
import { useAuth } from '../Context/AuthContext'
import { useOrders } from '../Context/OrdersContext'
import { useFavorites } from '../Context/FavoritesContext'

function Account() {
  const { user, logout } = useAuth()
  const { orders, loading } = useOrders()
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
            <User className="text-green-700" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Bonjour, {user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 text-sm font-medium hover:underline"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <div className="border border-gray-100 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <ShoppingBag size={16} />
            Commandes
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{orders.length}</p>
        </div>

        <div className="border border-gray-100 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <TrendingUp size={16} />
            Total dépensé
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">${totalSpent.toFixed(2)}</p>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Heart size={16} />
            Favoris
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{favorites.length}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link
          to="/favoris"
          className="flex items-center gap-3 border border-gray-100 rounded-xl p-5 hover:border-green-600 hover:shadow-sm transition-all"
        >
          <Heart className="text-green-700" size={22} />
          <div>
            <p className="font-medium text-gray-800 text-sm">Mes favoris</p>
            <p className="text-xs text-gray-500">Produits sauvegardés</p>
          </div>
        </Link>

        <Link
          to="/boutique"
          className="flex items-center gap-3 border border-gray-100 rounded-xl p-5 hover:border-green-600 hover:shadow-sm transition-all"
        >
          <Package className="text-green-700" size={22} />
          <div>
            <p className="font-medium text-gray-800 text-sm">Continuer mes achats</p>
            <p className="text-xs text-gray-500">Voir la boutique</p>
          </div>
        </Link>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Historique des commandes
        </h2>

        {loading ? (
          <p className="text-gray-400 text-sm text-center py-10">Chargement...</p>
        ) : orders.length === 0 ? (
          <div className="border border-gray-100 rounded-xl p-10 text-center">
            <Package className="text-gray-300 mx-auto" size={40} />
            <p className="text-gray-500 mt-3">
              Vous n'avez pas encore passé de commande.
            </p>
            <Link
              to="/boutique"
              className="inline-block mt-4 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Commande #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-14 h-14 object-cover rounded-lg bg-gray-50 shrink-0"
                    />
                  ))}
                </div>

                <p className="text-sm font-bold text-gray-800 mt-4">
                  Total : ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Account