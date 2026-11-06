import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const addToCart = (id, quantity = 1, type = 'product') => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id && item.type === type)
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.type === type
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { id, quantity, type }]
    })
    openDrawer()
  }

  const removeFromCart = (id, type = 'product') => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.type === type)))
  }

  const updateQuantity = (id, quantity, type = 'product') => {
    if (quantity < 1) {
      removeFromCart(id, type)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === type ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setItems([])

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}