import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle } from 'lucide-react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = useCallback((message) => {
    setToast({ show: true, message })
    setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 2000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast rendu une seule fois, globalement, en overlay */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
          <CheckCircle size={18} className="text-green-400 shrink-0" />
          {toast.message}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}