import { useState, useEffect } from 'react'
import { Package, Trash2 } from 'lucide-react'
import { apiRequest } from '../../Utils/api'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const statusOptions = ['En cours', 'Expédiée', 'Livrée', 'Annulée']

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await apiRequest('/orders')
      setOrders(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await apiRequest(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      })
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    } catch (error) {
      alert(error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(`Supprimer la commande #${id} ?`)) return
    try {
      await apiRequest(`/orders/${id}`, { method: 'DELETE' })
      setOrders((prev) => prev.filter((o) => o.id !== id))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Commandes</h1>
      <p className="text-gray-500 text-sm mt-1">
        {orders.length} commande{orders.length > 1 ? 's' : ''} au total
      </p>

      <div className="bg-white border border-gray-100 rounded-xl mt-6 overflow-hidden">
        {loading ? (
          <p className="text-center py-16 text-gray-400 text-sm">Chargement...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="text-gray-300 mx-auto" size={40} />
            <p className="text-gray-500 mt-3 text-sm">Aucune commande pour le moment.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Commande</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Pays</th>
                <th className="px-5 py-3 font-medium">Articles</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-800 font-medium">#{order.id.slice(0, 8)}</td>
                  <td className="px-5 py-3 text-gray-600">{order.user?.name || order.shippingInfo?.fullName || '—'}</td>
                  <td className="px-5 py-3 text-gray-600">{order.country || '—'}</td>
                  <td className="px-5 py-3 text-gray-600">{order.items?.length || 0}</td>
                  <td className="px-5 py-3 text-gray-800 font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-1.5 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(order.id)} className="text-gray-400 hover:text-red-500" aria-label="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminOrders