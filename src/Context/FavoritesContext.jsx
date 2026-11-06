import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext()
const API_URL = 'https://bioback.onrender.com/api'

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])

  const getToken = () => localStorage.getItem('token')

  const loadFavorites = useCallback(async () => {
    const token = getToken()
    if (!token || !user) {
      setFavorites([])
      return
    }

    try {
      const response = await fetch(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) {
        setFavorites(data.map((p) => p.id))
      }
    } catch (error) {
      console.error(error)
    }
  }, [user])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  const toggleFavorite = async (productId) => {
    const token = getToken()
    if (!token) {
      alert('Connectez-vous pour ajouter des favoris.')
      return
    }

    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )

    try {
      const response = await fetch(`${API_URL}/favorites/${productId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error()
    } catch (error) {
      loadFavorites()
    }
  }

  const isFavorite = (productId) => favorites.includes(productId)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, reload: loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}