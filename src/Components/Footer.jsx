import { Link, useLocation } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_NUMBER } from '../Utils/whatsapp'

function FooterLink({ to, children }) {
  const { pathname } = useLocation()

  const handleClick = () => {
    if (pathname === to) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 active:text-green-300"
    >
      {children}
    </Link>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-500" size={22} />
            <span className="text-white font-bold text-lg">BioNature</span>
          </div>
          <p className="text-sm mt-3 text-gray-400">
            Le meilleur de la nature pour votre bien-être au quotidien.
          </p>
          <div className="flex gap-4 mt-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white">
              <FaWhatsapp size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebook size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram size={18} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Boutique</h4>
          <ul className="space-y-2 text-sm">
            <li><FooterLink to="/boutique">Tous les produits</FooterLink></li>
            <li><FooterLink to="/categories">Catégories</FooterLink></li>
            <li><FooterLink to="/panier">Mon panier</FooterLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Entreprise</h4>
          <ul className="space-y-2 text-sm">
            <li><FooterLink to="/a-propos">À propos</FooterLink></li>
            <li><FooterLink to="/engagements">Nos engagements</FooterLink></li>
            <li><FooterLink to="/dhl">Agence DHL</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Compte & Infos</h4>
          <ul className="space-y-2 text-sm">
            <li><FooterLink to="/connexion">Connexion</FooterLink></li>
            <li><FooterLink to="/inscription">Inscription</FooterLink></li>
            <li><FooterLink to="/convention-de-vente">Convention de vente</FooterLink></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} BioNature. Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer