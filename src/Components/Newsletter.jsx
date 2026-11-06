import { useState } from 'react'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    console.log('Email inscrit :', email)
    setEmail('')
  }

  return (
    <section className="max-w-7xl mx-auto px-6 mt-14 mb-14">
      <div className="bg-[#f3f1ea] rounded-2xl overflow-hidden grid md:grid-cols-2 items-center">
        
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800">
            Restez informé de nos nouveautés et offres exclusives
          </h2>

          <form onSubmit={handleSubmit} className="flex gap-3 mt-6 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Pas de spam, désabonnement à tout moment.
          </p>
        </div>

        <div className="h-64 md:h-full">
          <img
            src="/Plantes.jpeg"
            alt="Mortier et plantes naturelles"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Newsletter