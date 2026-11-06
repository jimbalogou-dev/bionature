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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 mb-14">
      <div className="bg-[#f3f1ea] rounded-2xl overflow-hidden grid md:grid-cols-2 items-stretch">
        <div className="p-5 sm:p-8 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Restez informé de nos nouveautés et offres exclusives
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xl">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Votre adresse email"
              placeholder="Votre adresse email"
              className="w-full min-w-0 flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-800 hover:bg-green-900 text-white font-medium px-5 sm:px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Pas de spam, désabonnement à tout moment.
          </p>
        </div>

        <div className="h-48 sm:h-64 md:h-full md:min-h-[20rem]">
          <img
            src="/Plantes.jpeg"
            alt="Mortier et plantes naturelles"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Newsletter