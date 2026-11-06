import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const OrdersContext = createContext()
const API_URL = 'https://bioback.onrender.com/api'

export function OrdersProvider({ children }) {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const getToken = () => localStorage.getItem('token')

  const loadMyOrders = useCallback(async () => {
    const token = getToken()
    if (!token || !user) return

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) setOrders(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) loadMyOrders()
    else setOrders([])
  }, [user, loadMyOrders])

  const addOrder = async (orderData) => {
    const token = getToken()
    const items = orderData.items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }))

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items,
        shippingInfo: orderData.shippingInfo,
        country: orderData.shippingInfo?.country,
        currency: orderData.currency,
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erreur lors de la commande.')

    setOrders((prev) => [data, ...prev])
    return data
  }

  return (
    <OrdersContext.Provider value={{ orders, loading, addOrder, reload: loadMyOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrdersContext)
}