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
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      <p className="text-gray-500 text-sm mt-1">
        {messages.length} message{messages.length > 1 ? 's' : ''} reçu{messages.length > 1 ? 's' : ''}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden h-fit">
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
                      <p className="text-sm font-medium text-gray-800">{msg.name}</p>
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

        <div className="bg-white border border-gray-100 rounded-xl p-6 h-fit">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">{selected.subject}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                De : <span className="text-gray-800 font-medium">{selected.name}</span> ({selected.email})
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(selected.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </p>
              <p className="text-sm text-gray-700 mt-4 leading-relaxed whitespace-pre-wrap">
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