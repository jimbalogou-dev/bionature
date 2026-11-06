import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingCart, Leaf, Menu, X, LayoutDashboard } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { favorites } = useFavorites()
  const { cartCount, openDrawer } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Boutique', path: '/boutique' },
    { label: 'Catégories', path: '/categories' },
    { label: 'Nos engagements', path: '/engagements' },
    { label: 'Agence DHL', path: '/dhl' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ]

  const accountLink = user ? (user.isAdmin ? '/admin' : '/compte') : '/connexion'

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/boutique?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
  }

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">

        <button className="md:hidden text-gray-700 shrink-0" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Logo : le nom est visible sur tous les écrans, le slogan seulement dès sm */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
            <Leaf className="text-green-700" size={20} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">BioNature</h1>
            <p className="hidden sm:block text-xs text-gray-500 leading-tight">Le meilleur de la nature</p>
          </div>
        </Link>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit naturel..."
            className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700">
            <Search size={18} />
          </button>
        </form>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button className="md:hidden text-gray-600" onClick={() => setSearchOpen(!searchOpen)} aria-label="Rechercher">
            <Search size={22} />
          </button>

          <Link to={accountLink} className="hidden sm:flex flex-col items-center text-gray-600 hover:text-green-700">
            {user?.isAdmin ? (
              <LayoutDashboard size={22} />
            ) : user ? (
              <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-green-800 text-[10px] font-bold uppercase">{user.name.charAt(0)}</span>
              </div>
            ) : (
              <User size={22} />
            )}
            <span className="text-xs mt-1">
              {user?.isAdmin ? 'Admin' : user ? user.name.split(' ')[0] : 'Compte'}
            </span>
          </Link>

          <Link to="/favoris" className="relative hidden sm:flex flex-col items-center text-gray-600 hover:text-green-700">
            <Heart size={22} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
            <span className="text-xs mt-1">Favoris</span>
          </Link>

          <button onClick={openDrawer} className="relative flex flex-col items-center text-gray-600 hover:text-green-700">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs mt-1 hidden sm:block">Panier</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-3 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit naturel..."
            autoFocus
            className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button type="submit" className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </button>
        </form>
      )}

      <nav className="hidden md:block border-t border-gray-100">
        <ul className="max-w-7xl mx-auto px-6 flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="block py-3 hover:text-green-700 transition-colors whitespace-nowrap">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50">
          <ul className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 border-b border-gray-50 text-gray-700 hover:text-green-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-6 py-3">
              <Link to={accountLink} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-600 hover:text-green-700">
                {user?.isAdmin ? <LayoutDashboard size={18} /> : <User size={18} />}
                {user?.isAdmin ? 'Admin' : user ? user.name.split(' ')[0] : 'Compte'}
              </Link>
              <Link to="/favoris" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-600 hover:text-green-700">
                <Heart size={18} /> Favoris
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header