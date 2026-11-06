import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const MessagesContext = createContext()
const API_URL = 'https://bioback.onrender.com/api'

export function MessagesProvider({ children }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const getToken = () => localStorage.getItem('token')

  const loadMessages = useCallback(async () => {
    const token = getToken()
    if (!token || !user?.isAdmin) return

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) setMessages(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user?.isAdmin) loadMessages()
  }, [user, loadMessages])

  const addMessage = async (messageData) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erreur lors de l\'envoi.')
    return data
  }

  const markAsRead = async (id) => {
    const token = getToken()
    const response = await fetch(`${API_URL}/messages/${id}/read`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    setMessages((prev) => prev.map((m) => (m.id === id ? data : m)))
  }

  const deleteMessage = async (id) => {
    const token = getToken()
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error)
    }
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <MessagesContext.Provider value={{ messages, loading, addMessage, markAsRead, deleteMessage, reload: loadMessages }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  return useContext(MessagesContext)
}