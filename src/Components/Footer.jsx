import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_NUMBER } from '../utils/whatsapp'

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
            <li><Link to="/boutique" className="hover:text-white">Tous les produits</Link></li>
            <li><Link to="/categories" className="hover:text-white">Catégories</Link></li>
            <li><Link to="/panier" className="hover:text-white">Mon panier</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Entreprise</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/a-propos" className="hover:text-white">À propos</Link></li>
            <li><Link to="/engagements" className="hover:text-white">Nos engagements</Link></li>
            <li><Link to="/dhl" className="hover:text-white">Agence DHL</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Compte & Infos</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/connexion" className="hover:text-white">Connexion</Link></li>
            <li><Link to="/inscription" className="hover:text-white">Inscription</Link></li>
            <li><Link to="/convention-de-vente" className="hover:text-white">Convention de vente</Link></li>
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