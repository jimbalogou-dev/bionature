import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import CartDrawer from './Components/CartDrawer'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminRoute from './Components/AdminRoute'
import AdminLayout from './Pages/Admin/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminProducts from './Pages/Admin/AdminProducts'
import AdminUsers from './Pages/Admin/AdminUsers'
import AdminOrders from './Pages/Admin/AdminOrders'
import AdminPayments from './Pages/Admin/AdminPayments'
import AdminMessages from './Pages/Admin/AdminMessages'
import Home from './Pages/Home'
import Boutique from './Pages/Boutique'
import Categories from './Pages/Categories'
import CategoryDetail from './Pages/CategoryDetail'
import ProductDetail from './Pages/ProductDetail'
import Engagements from './Pages/Engagements'
import APropos from './Pages/Apropos'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Account from './Pages/Account'
import Favoris from './Pages/Favoris'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import DHL from './Pages/DHL'
import ConventionVente from './Pages/ConventionVente'

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