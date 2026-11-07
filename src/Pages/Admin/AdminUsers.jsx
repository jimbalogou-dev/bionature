import { useState, useEffect } from 'react'
import { Users as UsersIcon, Trash2 } from 'lucide-react'
import { apiRequest } from '../../Utils/api'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await apiRequest('/users')
      setUsers(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Supprimer l'utilisateur "${name}" ?`)) return
    try {
      await apiRequest(`/users/${id}`, { method: 'DELETE' })
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Utilisateurs</h1>
      <p className="text-gray-500 text-sm mt-1">
        {users.length} utilisateur{users.length > 1 ? 's' : ''} inscrit{users.length > 1 ? 's' : ''}
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
        {loading ? (
          <p className="text-center py-16 text-gray-400 text-sm">Chargement...</p>
        ) : users.length === 0 ? (
          <div className="text-center py-16">
            <UsersIcon className="text-gray-300 mx-auto" size={40} />
            <p className="text-gray-500 mt-3 text-sm">Aucun utilisateur inscrit pour le moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Nom</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Inscrit le</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-800 font-medium">{u.name}</td>
                  <td className="px-5 py-3 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(u.id, u.name)} className="text-gray-400 hover:text-red-500" aria-label="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers