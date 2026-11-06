import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import { MessagesProvider } from './context/MessagesContext'
import { ToastProvider } from './context/ToastContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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