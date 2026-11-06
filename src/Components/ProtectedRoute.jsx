import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // Attend que la session sauvegardée soit relue avant de décider
  if (loading) return null

  if (!user) {
    return <Navigate to="/connexion" replace />
  }

  return children
}

export default ProtectedRoute