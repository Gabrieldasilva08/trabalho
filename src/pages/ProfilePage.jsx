import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, User, UserRound, Save, LogOut, Heart, ShoppingCart, Trash2, LogIn
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useUser } from '../context/UserContext'

const emptyAddress = {
  cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
}

export default function ProfilePage() {
  const {
    user, isAccount, displayName,
    saveAccount, clearAccount,
    favorites, clearFavorites,
    cartCount, clearCart,
  } = useUser()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: { ...emptyAddress },
  })
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(() => {
    if (isAccount) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        address: { ...emptyAddress, ...(user.address || {}) },
      })
    } else {
      setForm({ name: '', email: '', phone: '', company: '', address: { ...emptyAddress } })
    }
  }, [isAccount, user])

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    const a = form.address
    if (!a.cep || !a.street || !a.number || !a.neighborhood || !a.city || !a.state) {
      setSavedMsg('')
      alert('Preencha os campos obrigatórios de endereço.')
      return
    }
    saveAccount(form)
    setSavedMsg('Conta atualizada e salva no LocalStorage.')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  const setAddress = (key, value) => {
    setForm((f) => ({ ...f, address: { ...f.address, [key]: value } }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-primary">Início</Link>
          <ChevronRight size={12} />
          <span className="text-navy dark:text-white font-medium">Perfil</span>
        </div>

        <div className="card p-5 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isAccount ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}>
              {isAccount ? <User size={22} /> : <UserRound size={22} />}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-black text-navy dark:text-white truncate">{displayName}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAccount
                  ? `Conta salva · ${user.email}`
                  : 'Você está como visitante anônimo'}
              </p>
            </div>
          </div>

          {!isAccount ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Faça login ou crie uma conta para salvar seus dados no LocalStorage.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link to="/login" className="btn-primary text-sm">
                  <LogIn size={14} /> Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Criar conta
                </Link>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSave} className="space-y-3">
                <p className="text-xs font-semibold text-navy dark:text-white">Dados da conta</p>
                <input
                  className="input-field text-sm"
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className="input-field text-sm"
                  type="email"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  className="input-field text-sm"
                  placeholder="Telefone (opcional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  className="input-field text-sm"
                  placeholder="Empresa / Studio (opcional)"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />

                <p className="text-xs font-semibold text-navy dark:text-white pt-2">Endereço *</p>
                <div className="grid grid-cols-2 gap-2">
                  <input className="input-field text-sm" placeholder="CEP *" value={form.address.cep} onChange={(e) => setAddress('cep', e.target.value)} required />
                  <input className="input-field text-sm" placeholder="Número *" value={form.address.number} onChange={(e) => setAddress('number', e.target.value)} required />
                  <input className="input-field text-sm col-span-2" placeholder="Rua *" value={form.address.street} onChange={(e) => setAddress('street', e.target.value)} required />
                  <input className="input-field text-sm" placeholder="Bairro *" value={form.address.neighborhood} onChange={(e) => setAddress('neighborhood', e.target.value)} required />
                  <input className="input-field text-sm" placeholder="Complemento" value={form.address.complement} onChange={(e) => setAddress('complement', e.target.value)} />
                  <input className="input-field text-sm" placeholder="Cidade *" value={form.address.city} onChange={(e) => setAddress('city', e.target.value)} required />
                  <input className="input-field text-sm uppercase" placeholder="UF *" maxLength={2} value={form.address.state} onChange={(e) => setAddress('state', e.target.value)} required />
                </div>

                <button type="submit" className="btn-primary text-sm w-full">
                  <Save size={14} /> Salvar alterações
                </button>
                {savedMsg && (
                  <p className="text-xs text-green-600 dark:text-green-400">{savedMsg}</p>
                )}
              </form>

              <button
                type="button"
                onClick={clearAccount}
                className="mt-3 w-full text-xs text-red-500 font-semibold flex items-center justify-center gap-1.5 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut size={13} /> Sair da conta
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-navy dark:text-white flex items-center gap-1.5">
                <Heart size={13} className="text-accent" /> Favoritos
              </p>
              <span className="text-xs text-gray-400">{favorites.length}</span>
            </div>
            {favorites.length > 0 ? (
              <button onClick={clearFavorites} className="text-[11px] text-red-500 hover:underline flex items-center gap-1">
                <Trash2 size={11} /> Limpar favoritos
              </button>
            ) : (
              <p className="text-[11px] text-gray-500">Nenhum favorito salvo.</p>
            )}
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-navy dark:text-white flex items-center gap-1.5">
                <ShoppingCart size={13} className="text-primary" /> Carrinho
              </p>
              <span className="text-xs text-gray-400">{cartCount} un</span>
            </div>
            {cartCount > 0 ? (
              <div className="flex gap-3">
                <Link to="/carrinho" className="text-[11px] text-primary font-semibold hover:underline">
                  Ver carrinho
                </Link>
                <button onClick={clearCart} className="text-[11px] text-red-500 hover:underline flex items-center gap-1">
                  <Trash2 size={11} /> Esvaziar
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-gray-500">Carrinho vazio.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
