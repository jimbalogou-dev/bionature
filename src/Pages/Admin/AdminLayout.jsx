import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Package, MessageSquare, CreditCard, LogOut, Leaf, ShoppingBag, ExternalLink } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { label: 'Tableau de bord', path: '/admin', icon: LayoutDashboard },
    { label: 'Produits', path: '/admin/produits', icon: Package },
    { label: 'Utilisateurs', path: '/admin/utilisateurs', icon: Users },
    { label: 'Commandes', path: '/admin/commandes', icon: ShoppingBag },
    { label: 'Paiements', path: '/admin/paiements', icon: CreditCard },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-800">
          <div className="bg-green-700 p-2 rounded-full">
            <Leaf className="text-white" size={18} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">BioNatura</p>
            <p className="text-xs text-gray-500">Espace Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-green-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
            Voir le site
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white w-full transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout