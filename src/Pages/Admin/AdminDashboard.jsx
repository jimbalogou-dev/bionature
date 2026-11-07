import { useState, useEffect } from 'react'
import { Users, Package, CreditCard, MessageSquare } from 'lucide-react'
import { apiRequest } from '../../Utils/api'

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const [statsData, ordersData, messagesData] = await Promise.all([
        apiRequest('/users/stats'),
        apiRequest('/orders'),
        apiRequest('/messages'),
      ])
      setStats(statsData)
      setOrders(ordersData)
      setMessages(messagesData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !stats) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <p className="text-gray-400 text-sm">Chargement du tableau de bord...</p>
      </div>
    )
  }

  const statCards = [
    { label: 'Utilisateurs', value: stats.userCount, icon: Users, color: 'bg-blue-100 text-blue-700' },
    { label: 'Commandes', value: stats.orderCount, icon: Package, color: 'bg-green-100 text-green-700' },
    { label: 'Revenus totaux', value: `$${stats.totalRevenue.toFixed(2)}`, icon: CreditCard, color: 'bg-amber-100 text-amber-700' },
    { label: 'Messages', value: stats.messageCount, icon: MessageSquare, color: 'bg-purple-100 text-purple-700', badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} non lus` : null },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
      <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de votre boutique BioNatura</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color, badge }) => (
          <div key={label} className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <p className="mt-3 break-words text-xl font-bold text-gray-800 sm:mt-4 sm:text-2xl">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
            {badge && (
              <span className="inline-block mt-2 text-[10px] font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Dernières commandes</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-400">Aucune commande pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-800 font-medium">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500">{order.user?.name || 'Client'}</p>
                  </div>
                  <p className="font-medium text-gray-800">${order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Derniers messages</h2>
          {messages.length === 0 ? (
            <p className="text-sm text-gray-400">Aucun message pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="text-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-800 font-medium">{msg.name}</p>
                    {!msg.read && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.subject}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard