import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiRequest } from '../Utils/api'

const VISITOR_ID_STORAGE_KEY = 'bionatura-visitor-id'

function VisitorTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return

    try {
      let visitorId = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY)
      if (!visitorId) {
        visitorId = window.crypto.randomUUID()
        window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId)
      }

      apiRequest('/visitors/track', {
        method: 'POST',
        body: JSON.stringify({ visitorId }),
      }).catch((error) => {
        console.error('Impossible d’enregistrer la visite du site.', error)
      })
    } catch (error) {
      console.error('Impossible de préparer le suivi des visiteurs.', error)
    }
  }, [pathname])

  return null
}

export default VisitorTracker
