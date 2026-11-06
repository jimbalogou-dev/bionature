import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'
import AdminOrders from './pages/admin/AdminOrders'
import AdminPayments from './pages/admin/AdminPayments'
import AdminMessages from './pages/admin/AdminMessages'
import Home from './pages/Home'
import Boutique from './pages/Boutique'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import ProductDetail from './pages/ProductDetail'
import Engagements from './pages/Engagements'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Favoris from './pages/Favoris'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import DHL from './pages/DHL'
import ConventionVente from './pages/ConventionVente'

function PublicLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/boutique" element={<PublicLayout><Boutique /></PublicLayout>} />
      <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />
      <Route path="/categories/:categoryId" element={<PublicLayout><CategoryDetail /></PublicLayout>} />
      <Route path="/produit/:productId" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/engagements" element={<PublicLayout><Engagements /></PublicLayout>} />
      <Route path="/a-propos" element={<PublicLayout><APropos /></PublicLayout>} />
      <Route path="/dhl" element={<PublicLayout><DHL /></PublicLayout>} />
      <Route path="/convention-de-vente" element={<PublicLayout><ConventionVente /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/connexion" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/inscription" element={<PublicLayout><Register /></PublicLayout>} />
      <Route
        path="/compte"
        element={
          <PublicLayout>
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          </PublicLayout>
        }
      />
      <Route path="/favoris" element={<PublicLayout><Favoris /></PublicLayout>} />
      <Route path="/panier" element={<PublicLayout><Cart /></PublicLayout>} />
      <Route path="/commande" element={<PublicLayout><Checkout /></PublicLayout>} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="produits" element={<AdminProducts />} />
        <Route path="utilisateurs" element={<AdminUsers />} />
        <Route path="commandes" element={<AdminOrders />} />
        <Route path="paiements" element={<AdminPayments />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  )
}

export default App