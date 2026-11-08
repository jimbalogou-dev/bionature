import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { ProductsProvider } from './Context/ProductsContext'
import { FavoritesProvider } from './Context/FavoritesContext'
import { CartProvider } from './Context/CartContext'
import { OrdersProvider } from './Context/OrdersContext'
import { MessagesProvider } from './Context/MessagesContext'
import { ToastProvider } from './Context/ToastContext'
import ScrollToTop from './Components/ScrollToTop'
import VisitorTracker from './Components/VisitorTracker'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <VisitorTracker />
      <ToastProvider>
        <AuthProvider>
          <ProductsProvider>
            <FavoritesProvider>
              <CartProvider>
                <OrdersProvider>
                  <MessagesProvider>
                      <App />
                  </MessagesProvider>
                </OrdersProvider>
              </CartProvider>
            </FavoritesProvider>
          </ProductsProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)