import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
      <CheckCircle size={18} className="text-green-400" />
      {message}
    </div>
  )
}

export default Toast