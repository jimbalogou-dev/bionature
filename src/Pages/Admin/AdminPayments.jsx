import { useState, useEffect } from 'react'
import { CreditCard, Globe } from 'lucide-react'
import { useOrders } from '../../Context/OrdersContext'

function AdminPayments() {
  const { orders } = useOrders()
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  const methodLabels = {
    card: 'Carte bancaire',
    paypal: 'PayPal',
    cash: 'Paiement à la livraison',
  }

  const revenueByCountry = orders.reduce((acc, order) => {
    const country = order.shippingInfo?.country || 'Non spécifié'
    if (!acc[country]) {
      acc[country] = { country, total: 0, count: 0 }
    }
    acc[country].total += order.total
    acc[country].count += 1
    return acc
  }, {})

  const countryList = Object.values(revenueByCountry).sort((a, b) => b.total - a.total)

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Paiements</h1>
      <p className="text-gray-500 text-sm mt-1">
        {orders.length} paiement{orders.length > 1 ? 's' : ''} · ${totalRevenue.toFixed(2)} de revenus
      </p>

      {/* Répartition par pays */}
      {countryList.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={18} className="text-green-700" />
            <h2 className="font-semibold text-gray-800">Répartition par pays</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {countryList.map(({ country, total, count }) => (
              <div key={country} className="bg-white border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-800">{country}</p>
                <p className="text-xl font-bold text-green-800 mt-1">${total.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {count} commande{count > 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl mt-8 overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard className="text-gray-300 mx-auto" size={40} />
            <p className="text-gray-500 mt-3 text-sm">Aucun paiement pour le moment.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Commande</th>
                <th className="px-5 py-3 font-medium">Pays</th>
                <th className="px-5 py-3 font-medium">Méthode</th>
                <th className="px-5 py-3 font-medium">Montant</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-800 font-medium">#{order.id}</td>
                  <td className="px-5 py-3 text-gray-600">{order.shippingInfo?.country || '—'}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {methodLabels[order.shippingInfo?.paymentMethod] || '—'}
                  </td>
                  <td className="px-5 py-3 text-gray-800 font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(order.date).toLocaleDateString('fr-FR')}
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

export default AdminPayments