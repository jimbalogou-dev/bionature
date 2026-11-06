import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useMessages } from '../Context/MessagesContext'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const { addMessage } = useMessages()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [sendError, setSendError] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  setSendError('')
  try {
    await addMessage(formData)
    setSent(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  } catch (error) {
    setSendError(error.message || 'Erreur lors de l\'envoi du message.')
  }
}

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'bionature818@gmail.com' },
    { icon: Phone, label: 'Téléphone', value: '+229 01 67 47 17 41' },
    { icon: MapPin, label: 'Adresse', value: ' Bénin, Togo, Côte d\'Ivoire,' },
  ]

  return (
    <div>
      <section className="bg-[#f3f1ea] px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Contactez-<span className="text-green-700">nous</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Une question, une suggestion ? Notre équipe est là pour vous répondre.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
        <div className="space-y-6">
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="bg-green-100 p-2.5 rounded-full shrink-0">
                <Icon className="text-green-700" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nom complet</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="vous@exemple.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Sujet</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Objet de votre message"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              placeholder="Votre message..."
            />
          </div>
           {sendError && (
           <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
            {sendError}
           </p>
           )}
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <Send size={16} />
            {sent ? 'Message envoyé ✓' : 'Envoyer le message'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default Contact