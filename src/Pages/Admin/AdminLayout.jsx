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
    <div className="min-h-screen bg-gray-50 md:flex">
      <aside className="flex w-full flex-col bg-gray-900 text-gray-300 md:sticky md:top-0 md:h-screen md:min-h-screen md:w-64 md:shrink-0">
        <div className="flex items-center justify-between gap-3 border-b border-gray-800 px-4 py-3 md:px-6 md:py-5">
          <div className="flex items-center gap-2">
            <div className="bg-green-700 p-2 rounded-full">
              <Leaf className="text-white" size={18} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">BioNatura</p>
              <p className="text-xs text-gray-500">Espace Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <Link
              to="/"
              aria-label="Voir le site"
              title="Voir le site"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <ExternalLink size={18} />
            </Link>
            <button
              onClick={handleLogout}
              aria-label="Déconnexion"
              title="Déconnexion"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 py-2 md:flex-1 md:flex-col md:space-y-1 md:overflow-x-hidden md:overflow-y-auto md:py-4">
          {links.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs transition-colors sm:text-sm md:gap-3 ${
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

        <div className="hidden space-y-1 border-t border-gray-800 px-3 py-4 md:block">
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

      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout