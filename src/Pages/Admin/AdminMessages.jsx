import { useState, useEffect } from 'react'
import { MessageSquare, X, Trash2 } from 'lucide-react'
import { apiRequest } from '../../Utils/api'

function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const data = await apiRequest('/messages')
      setMessages(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpen = async (msg) => {
    setSelected(msg)
    if (!msg.read) {
      try {
        await apiRequest(`/messages/${msg.id}/read`, { method: 'PUT' })
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await apiRequest(`/messages/${id}`, { method: 'DELETE' })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      <p className="text-gray-500 text-sm mt-1">
        {messages.length} message{messages.length > 1 ? 's' : ''} reçu{messages.length > 1 ? 's' : ''}
      </p>

      <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className="h-fit min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
          {loading ? (
            <p className="text-center py-16 text-gray-400 text-sm">Chargement...</p>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="text-gray-300 mx-auto" size={40} />
              <p className="text-gray-500 mt-3 text-sm">Aucun message pour le moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-center gap-2 px-5 py-4 hover:bg-gray-50 transition-colors ${
                    selected?.id === msg.id ? 'bg-green-50' : ''
                  }`}
                >
                  <button onClick={() => handleOpen(msg)} className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="min-w-0 truncate text-sm font-medium text-gray-800">{msg.name}</p>
                      {!msg.read && <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{msg.subject}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="text-gray-400 hover:text-red-500 shrink-0" aria-label="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-fit min-w-0 rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="min-w-0 break-words font-semibold text-gray-800">{selected.subject}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>
              <p className="break-words text-sm text-gray-500">
                De : <span className="text-gray-800 font-medium">{selected.name}</span> ({selected.email})
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(selected.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </p>
              <p className="mt-4 break-words whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                {selected.message}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-10">
              Sélectionnez un message pour le lire.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminMessages