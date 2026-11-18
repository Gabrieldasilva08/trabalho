import { useEffect, useState } from 'react'
import { MessageSquare, Star, Send, X, Loader2 } from 'lucide-react'
import { api } from '../../services/api'
import { useUser } from '../../context/UserContext'

export default function InteractionPanel({ product, onClose }) {
  const { user, isAccount } = useUser()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    userName: isAccount ? user.name : '',
    rating: 5,
    comment: '',
    interest: 'interessado',
  })

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.getInteractions(product.id)
      setList(data)
    } catch {
      setError('Não foi possível carregar as interações. Verifique se o JSON Server está rodando.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [product.id])

  useEffect(() => {
    if (isAccount && user.name) {
      setForm((f) => ({ ...f, userName: user.name }))
    }
  }, [isAccount, user.name])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.userName.trim() || !form.comment.trim()) return
    setSaving(true)
    setError('')
    try {
      await api.createInteraction({
        productId: product.id,
        userName: form.userName.trim(),
        rating: Number(form.rating),
        comment: form.comment.trim(),
        interest: form.interest,
        createdAt: new Date().toISOString(),
      })
      setForm((f) => ({ ...f, comment: '', rating: 5 }))
      await load()
    } catch {
      setError('Erro ao salvar interação na API.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50">
      <div className="card w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Interações</p>
            <h3 className="text-base font-black text-navy dark:text-white">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mb-5 p-3 rounded-xl bg-surface dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-navy dark:text-white flex items-center gap-1.5">
            <MessageSquare size={13} className="text-primary" />
            Deixar avaliação / interesse
          </p>
          <input
            className="input-field text-xs"
            placeholder="Seu nome"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[10px] text-gray-500 dark:text-gray-400">
              Nota (1–5)
              <select
                className="input-field text-xs mt-1"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} estrela{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </label>
            <label className="text-[10px] text-gray-500 dark:text-gray-400">
              Interesse
              <select
                className="input-field text-xs mt-1"
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
              >
                <option value="interessado">Interessado</option>
                <option value="quero comprar">Quero comprar</option>
                <option value="recomendaria">Recomendaria</option>
                <option value="só avaliando">Só avaliando</option>
              </select>
            </label>
          </div>
          <textarea
            className="input-field text-xs min-h-[72px] resize-y"
            placeholder="Comentário ou avaliação..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
          />
          <button type="submit" disabled={saving} className="btn-primary text-xs w-full disabled:opacity-60">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            Salvar na API
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-500 mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
            {error}
          </p>
        )}

        <h4 className="text-xs font-bold text-navy dark:text-white mb-2">
          Avaliações dos usuários
        </h4>

        {loading ? (
          <div className="flex items-center gap-2 text-xs text-gray-400 py-6 justify-center">
            <Loader2 size={14} className="animate-spin" /> Carregando...
          </div>
        ) : list.length === 0 ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 py-4 text-center">
            Ainda não há interações para este produto.
          </p>
        ) : (
          <ul className="space-y-2">
            {list.map((item) => (
              <li key={item.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-navy dark:text-white">{item.userName}</span>
                  <span className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-semibold">
                    <Star size={10} className="fill-yellow-400" /> {item.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.comment}</p>
                <p className="text-[10px] text-primary mt-1 capitalize">{item.interest}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
