import { useEffect, useMemo, useState } from 'react'
import {
  Search, Plus, Heart, MessageSquare, ShoppingCart,
  Loader2, Trash2, X, Pencil
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import InteractionPanel from '../components/products/InteractionPanel'
import { api } from '../services/api'
import { useUser } from '../context/UserContext'

const CATEGORIES = [
  'Todos',
  'Cartões de Visita',
  'Panfletos & Folders',
  'Banners & Faixas',
  'Adesivos & Rótulos',
  'Kits Corporativos',
]

const EMPTY_FORM = {
  name: '',
  desc: '',
  price: '',
  category: 'Cartões de Visita',
  emoji: '🖨️',
}

export default function ProductsPage() {
  const { favorites, toggleFavorite, addToCart } = useUser()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [qtyById, setQtyById] = useState({})

  const loadProducts = async () => {
    setLoading(true)
    setApiError('')
    try {
      const data = await api.getProducts()
      setProducts(data)
    } catch {
      setApiError('API offline. Rode: npm run server')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProducts() }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === 'Todos' || p.category === category
      const q = search.trim().toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      const matchFav = !onlyFavorites || favorites.includes(p.id)
      return matchCat && matchSearch && matchFav
    })
  }, [products, category, search, onlyFavorites, favorites])

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      desc: product.desc || '',
      price: product.price || '',
      category: product.category || 'Cartões de Visita',
      emoji: product.emoji || '🖨️',
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setApiError('')
    try {
      const payload = {
        name: form.name,
        desc: form.desc,
        price: form.price,
        category: form.category,
        emoji: form.emoji || '🖨️',
        badge: form.category.split(' ')[0],
        badgeStyle: 'bg-primary text-white',
        bgGradient: 'linear-gradient(135deg, #3B4FE0 0%, #6B7FFF 100%)',
      }

      if (editingId) {
        const current = products.find((p) => p.id === editingId)
        await api.updateProduct(editingId, {
          ...current,
          ...payload,
          id: editingId,
        })
      } else {
        await api.createProduct(payload)
      }

      closeForm()
      await loadProducts()
    } catch {
      setApiError(editingId ? 'Erro ao editar produto.' : 'Erro ao cadastrar produto.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remover este produto da API?')) return
    setDeletingId(id)
    setApiError('')
    try {
      await api.deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      if (editingId === id) closeForm()
    } catch {
      setApiError('Erro ao remover produto.')
    } finally {
      setDeletingId(null)
    }
  }

  const getQty = (id) => qtyById[id] ?? 1

  const handleAddToCart = (product) => {
    addToCart(product, getQty(product.id))
    setQtyById((prev) => ({ ...prev, [product.id]: 1 }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl font-black text-navy dark:text-white">Produtos</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {filtered.length} item(ns)
              {onlyFavorites ? ' · favoritos' : ''}
            </p>
          </div>
          <button
            onClick={() => (showForm ? closeForm() : openCreate())}
            className="btn-primary text-xs self-start"
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
            {showForm ? 'Fechar' : 'Novo produto'}
          </button>
        </div>

        {apiError && (
          <div className="mb-4 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">
            {apiError}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSave} className="card p-4 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p className="sm:col-span-2 text-xs font-semibold text-navy dark:text-white">
              {editingId ? `Editando produto #${editingId}` : 'Novo produto'}
            </p>
            <input
              className="input-field text-sm sm:col-span-2"
              placeholder="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="input-field text-sm sm:col-span-2"
              placeholder="Descrição"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
            />
            <input
              className="input-field text-sm"
              placeholder="Preço (R$ 50,00)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <select
              className="input-field text-sm"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              className="input-field text-sm"
              placeholder="Emoji"
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            />
            <button type="submit" disabled={saving} className="btn-primary text-xs disabled:opacity-60">
              {saving ? <Loader2 size={13} className="animate-spin" /> : editingId ? <Pencil size={13} /> : <Plus size={13} />}
              {editingId ? 'Salvar edição' : 'Salvar na API'}
            </button>
          </form>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                         bg-white dark:bg-gray-900 text-navy dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={() => setOnlyFavorites((v) => !v)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-accent text-white border-accent'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
            }`}
          >
            <Heart size={12} className={onlyFavorites ? 'fill-white' : ''} />
            Favoritos ({favorites.length})
          </button>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-gray-500">
            <Loader2 size={18} className="animate-spin text-primary" />
            Carregando...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <p className="text-sm font-medium">
              {onlyFavorites
                ? 'Nenhum produto nos favoritos'
                : 'Não há itens com a palavra-chave pesquisada'}
            </p>
            <button
              onClick={() => { setCategory('Todos'); setSearch(''); setOnlyFavorites(false) }}
              className="mt-3 text-xs text-primary font-semibold hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => {
              const isFav = favorites.includes(p.id)
              return (
                <div key={p.id} className="card overflow-hidden flex flex-col">
                  <div className="relative h-32" style={{ background: p.bgGradient || '#3B4FE0' }}>
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {p.emoji || '🖨️'}
                    </div>
                    <button
                      onClick={() => toggleFavorite(p.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full ${
                        isFav ? 'bg-accent text-white' : 'bg-white/90 text-gray-500'
                      }`}
                      title="Favorito"
                    >
                      <Heart size={12} className={isFav ? 'fill-white' : ''} />
                    </button>
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-[10px] text-primary font-semibold">{p.category}</p>
                    <h3 className="text-sm font-bold text-navy dark:text-white leading-tight mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2 flex-1">{p.desc}</p>
                    <p className="text-sm font-black text-navy dark:text-white mb-3">{p.price}</p>

                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-[10px] text-gray-500 dark:text-gray-400 shrink-0">Qtd</label>
                      <input
                        type="number"
                        min={1}
                        value={getQty(p.id)}
                        onChange={(e) =>
                          setQtyById((prev) => ({
                            ...prev,
                            [p.id]: Math.max(1, Number(e.target.value) || 1),
                          }))
                        }
                        className="w-16 input-field text-xs py-1.5 px-2"
                      />
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-primary text-white text-[10px] font-semibold hover:bg-primary-600"
                      >
                        <ShoppingCart size={12} /> Carrinho
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[10px] font-semibold text-navy dark:text-white hover:border-primary"
                        title="Editar"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[10px] font-semibold text-navy dark:text-white hover:border-primary"
                        title="Avaliar"
                      >
                        <MessageSquare size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        className="flex items-center justify-center gap-1 py-2 rounded-lg border border-red-200 dark:border-red-900 text-red-500 text-[10px] font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
                        title="Remover"
                      >
                        {deletingId === p.id
                          ? <Loader2 size={12} className="animate-spin" />
                          : <Trash2 size={12} />}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />

      {selectedProduct && (
        <InteractionPanel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
