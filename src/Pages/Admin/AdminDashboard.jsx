import { useState, useEffect, useCallback } from 'react'
import { Users, Package, CreditCard, MessageSquare } from 'lucide-react'
import { apiRequest } from '../../Utils/api'

function formatVisitorDate(date) {
  return new Date(`${date}T00:00:00.000Z`).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  })
}

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [visitorStats, setVisitorStats] = useState(null)
  const [visitorError, setVisitorError] = useState('')
  const [dashboardError, setDashboardError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadDashboard = useCallback(async () => {
    try {
      const [statsData, ordersData, messagesData] = await Promise.all([
        apiRequest('/users/stats'),
        apiRequest('/orders'),
        apiRequest('/messages'),
      ])
      setStats(statsData)
      setOrders(ordersData)
      setMessages(messagesData)

      try {
        setVisitorStats(await apiRequest('/users/visitor-stats'))
      } catch (error) {
        console.error(error)
        setVisitorError(error.message || 'Impossible de charger les statistiques des visiteurs.')
      }
    } catch (error) {
      console.error(error)
      setDashboardError(error.message || 'Impossible de charger le tableau de bord.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void Promise.resolve().then(loadDashboard)
  }, [loadDashboard])

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <p className="text-gray-400 text-sm">Chargement du tableau de bord...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <p className="text-sm text-red-600">{dashboardError || 'Les données du tableau de bord sont indisponibles.'}</p>
      </div>
    )
  }

  const statCards = [
    { label: 'Utilisateurs', value: stats.userCount, icon: Users, color: 'bg-blue-100 text-blue-700' },
    { label: 'Commandes', value: stats.orderCount, icon: Package, color: 'bg-green-100 text-green-700' },
    { label: 'Revenus totaux', value: `$${stats.totalRevenue.toFixed(2)}`, icon: CreditCard, color: 'bg-amber-100 text-amber-700' },
    { label: 'Messages', value: stats.messageCount, icon: MessageSquare, color: 'bg-purple-100 text-purple-700', badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} non lus` : null },
  ]
  const visitorCards = visitorStats
    ? [
        { label: "Aujourd'hui", value: visitorStats.today },
        { label: 'Hier', value: visitorStats.yesterday },
        { label: '7 derniers jours', value: visitorStats.last7Days },
        { label: 'Ce mois-ci', value: visitorStats.currentMonth },
        { label: 'Mois dernier', value: visitorStats.previousMonth },
      ]
    : []
  const dailyVisitors = visitorStats?.daily || []
  const maxDailyVisitors = Math.max(1, ...dailyVisitors.map(({ visitors }) => visitors))
  const dateLabels = dailyVisitors.filter((_, index) => index % 5 === 0 || index === dailyVisitors.length - 1)

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

      <section className="mt-8 space-y-4 sm:space-y-6" aria-labelledby="visitor-stats-title">
        <div>
          <h2 id="visitor-stats-title" className="text-lg font-semibold text-gray-800">Fréquentation du site</h2>
          <p className="mt-1 text-sm text-gray-500">
            Visiteurs uniques estimés par navigateur, fuseau horaire du Bénin. Le suivi commence à la mise en service.
          </p>
        </div>

        {visitorError ? (
          <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {visitorError}
          </p>
        ) : visitorStats ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5 sm:gap-4">
              {visitorCards.map(({ label, value }) => (
                <div key={label} className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
                  <p className="break-words text-xl font-bold text-gray-800 sm:text-2xl">{value.toLocaleString('fr-FR')}</p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid min-w-0 gap-4 lg:grid-cols-3 sm:gap-6">
              <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:col-span-2 sm:p-6">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">Visiteurs par jour</h3>
                    <p className="mt-1 text-xs text-gray-500">30 derniers jours</p>
                  </div>
                  <p className="text-xs text-gray-500">Total : {dailyVisitors.reduce((sum, day) => sum + day.visitors, 0).toLocaleString('fr-FR')}</p>
                </div>

                <div className="flex h-40 items-end gap-1 border-b border-gray-100 sm:h-52 sm:gap-1.5" role="img" aria-label="Graphique des visiteurs quotidiens sur les 30 derniers jours">
                  {dailyVisitors.map(({ date, visitors }) => (
                    <div
                      key={date}
                      title={`${formatVisitorDate(date)} : ${visitors} visiteur${visitors > 1 ? 's' : ''}`}
                      className="min-w-0 flex-1 rounded-t bg-green-700 transition-colors hover:bg-green-500"
                      style={{ height: `${visitors ? Math.max((visitors / maxDailyVisitors) * 100, 4) : 1}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between gap-1 text-[10px] text-gray-400 sm:text-xs">
                  {dateLabels.map(({ date }) => <span key={date}>{formatVisitorDate(date)}</span>)}
                </div>
              </div>

              <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800">Historique par année</h3>
                <p className="mt-1 text-xs text-gray-500">Visiteurs uniques par année</p>
                {visitorStats.yearly.length === 0 ? (
                  <p className="mt-5 text-sm text-gray-400">Aucune visite enregistrée pour le moment.</p>
                ) : (
                  <div className="mt-4 max-h-52 space-y-3 overflow-y-auto pr-1">
                    {visitorStats.yearly.map(({ year, visitors }) => (
                      <div key={year} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-gray-600">{year}</span>
                        <span className="font-semibold text-gray-800">{visitors.toLocaleString('fr-FR')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">Chargement des statistiques des visiteurs...</p>
        )}
      </section>

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