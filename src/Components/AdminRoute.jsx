import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/connexion" replace />
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute