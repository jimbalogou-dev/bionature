import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Package } from 'lucide-react'
import { useProducts } from '../../context/ProductsContext'

const categoryOptions = [
  { value: 'vitalite-masculine', label: 'Vitalité masculine' },
  { value: 'bien-etre-naturel', label: 'Bio Naturel & bien-être' },
  { value: 'immunite-respiratoire', label: 'Immunité respiratoire & anti-hémorroïdes' },
  { value: 'confort-endurance', label: 'Confort & endurance' },
  { value: 'Sante-naturelle', label: 'Santé naturelle' },
  { value: 'sante-prostatique', label: 'Santé prostatique' },
]

const emptyForm = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: 'vitalite-masculine',
  stock: '',
}

function AdminProducts() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const openCreateForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setError('')
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
    })
    setEditingId(product.id)
    setError('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyForm)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.price || !formData.category) {
      setError('Nom, prix et catégorie sont obligatoires.')
      return
    }

    try {
      setSaving(true)
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: formData.stock ? parseInt(formData.stock) : 0,
      }

      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }

      closeForm()
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Supprimer le produit "${name}" ?`)) return
    try {
      await deleteProduct(id)
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression.')
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produits</h1>
          <p className="text-gray-500 text-sm mt-1">
            {products.length} produit{products.length > 1 ? 's' : ''} au catalogue
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Ajouter un produit
        </button>
      </div>

      {/* Formulaire (création ou édition) */}
      {showForm && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">
              {editingId ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom du produit</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Prix ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {categoryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Image (chemin, ex: /Produit5-removebg-preview.png)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                {saving ? 'Enregistrement...' : editingId ? 'Enregistrer les modifications' : 'Créer le produit'}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="border border-gray-200 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des produits */}
      <div className="bg-white border border-gray-100 rounded-xl mt-6 overflow-hidden">
        {loading ? (
          <p className="text-center py-16 text-gray-400 text-sm">Chargement...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="text-gray-300 mx-auto" size={40} />
            <p className="text-gray-500 mt-3 text-sm">Aucun produit pour le moment.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Produit</th>
                <th className="px-5 py-3 font-medium">Catégorie</th>
                <th className="px-5 py-3 font-medium">Prix</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-gray-50 shrink-0"
                      />
                      <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {categoryOptions.find((c) => c.value === product.category)?.label || product.category}
                  </td>
                  <td className="px-5 py-3 text-gray-800 font-medium">${product.price.toFixed(2)}</td>
                  <td className="px-5 py-3 text-gray-600">{product.stock}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEditForm(product)}
                        className="text-gray-400 hover:text-green-700"
                        aria-label="Modifier"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminProducts