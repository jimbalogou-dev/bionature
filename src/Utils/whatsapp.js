// ⚠️ Vérifie ce numéro avant la mise en ligne : https://wa.me/22967471741
export const WHATSAPP_NUMBER = '22967471741'

export function buildWhatsAppLink(phoneNumber, message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

export function buildProductMessage(product, quantity = 1) {
  const total = (product.price * quantity).toFixed(2)
  return `Bonjour Bio Nature 🌿,\n\nJe souhaite commander :\n\n🛍️ ${product.name}\nQuantité : ${quantity}\nPrix unitaire : $${product.price.toFixed(2)}\nTotal : $${total}\n\nMerci de me confirmer la disponibilité et les modalités de paiement.`
}

export function buildCartMessage(items) {
  let total = 0
  let lines = ''

  items.forEach((item) => {
    const lineTotal = item.price * item.quantity
    total += lineTotal
    lines += `🛍️ ${item.name}\nQuantité : ${item.quantity}\nPrix : $${lineTotal.toFixed(2)}\n\n`
  })

  return `Bonjour Bio Nature 🌿,\n\nJe souhaite passer la commande suivante :\n\n${lines}💰 Total : $${total.toFixed(2)}\n\nMerci de me confirmer la disponibilité et les modalités de paiement.`
}