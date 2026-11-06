import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, User, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Merci de remplir tous les champs.')
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setLoading(true)
    const result = await register(name, email, password)
    setLoading(false)

    if (result.success) {
      navigate('/compte')
    } else {
      setError(result.error || 'Erreur lors de l\'inscription.')
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Leaf className="text-green-700 mx-auto" size={32} />
        <h1 className="text-2xl font-bold text-gray-800 mt-3">Créer un compte</h1>
        <p className="text-gray-500 text-sm mt-1">
          Rejoignez la communauté BioNatura
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700">Nom complet</label>
          <div className="relative mt-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Votre nom"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative mt-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="vous@exemple.com"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Mot de passe</label>
          <div className="relative mt-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
          <div className="relative mt-1">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà un compte ?{' '}
        <Link to="/connexion" className="text-green-700 font-medium hover:underline">
          Connectez-vous
        </Link>
      </p>
    </div>
  )
}

export default Register