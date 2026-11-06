import { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()
const API_URL = 'https://bioback.onrender.com/api'

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/products`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getProductById = (id) => products.find((p) => p.id === id)

  const createProduct = async (productData) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    setProducts((prev) => [data, ...prev])
    return data
  }

  const updateProduct = async (id, productData) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    setProducts((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const deleteProduct = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error)
    }
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, getProductById, createProduct, updateProduct, deleteProduct, reload: loadProducts }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}