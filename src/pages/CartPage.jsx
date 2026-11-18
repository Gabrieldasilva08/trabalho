import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2, Plus, Minus, ChevronRight, FileCheck, Tag, Lock, ShieldCheck,
  Truck, Package, CheckCircle, MessageCircle, Zap, ShoppingBag
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useUser } from '../context/UserContext'

const shippingOptions = [
  {
    id: 'balcao',
    label: 'Retirada no Balcão',
    desc: 'Disponível em nossa central gráfica em 24h úteis.',
    time: 'Em até 24h',
    price: 0,
    priceLabel: 'GRÁTIS',
    icon: Package,
  },
  {
    id: 'expressa',
    label: 'Expressa 24 Horas',
    desc: 'Entrega por courier dedicado em SP e região.',
    time: 'Próximo dia útil',
    price: 28.98,
    priceLabel: '+ R$ 28,98',
    icon: Zap,
  },
  {
    id: 'sedex',
    label: 'Sedex Correios',
    desc: 'Envio rastreado com seguro para todo o Brasil.',
    time: '2 a 3 dias úteis',
    price: 19.50,
    priceLabel: '+ R$ 19,50',
    icon: Truck,
  },
]

function parsePrice(price) {
  if (typeof price === 'number') return price
  if (!price) return 0
  const n = String(price).replace(/[^\d,.-]/g, '').replace(',', '.')
  return Number(n) || 0
}

function CartItem({ item, onQtyChange, onSetQty, onRemove }) {
  const unit = parsePrice(item.price)
  const total = unit * (item.qty || 1)

  return (
    <div className="card p-4 mb-3">
      <div className="flex gap-4">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
          style={{ background: item.bgGradient || '#1a1a2e' }}
        >
          {item.emoji || '🖨️'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-sm font-bold text-navy dark:text-white leading-tight">{item.name}</h3>
              {item.category && (
                <span className="badge bg-primary/10 text-primary text-[10px] mt-1">{item.category}</span>
              )}
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
            {item.desc}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => onQtyChange(item.id, -1)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              >
                <Minus size={12} />
              </button>
              <input
                type="number"
                min={1}
                value={item.qty || 1}
                onChange={(e) => onSetQty(item.id, e.target.value)}
                className="w-16 text-center text-xs font-bold text-navy dark:text-white bg-transparent py-1.5 outline-none"
              />
              <button
                onClick={() => onQtyChange(item.id, 1)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              >
                <Plus size={12} />
              </button>
            </div>

            <div className="text-right">
              <p className="text-base font-black text-navy dark:text-white">
                R$ {total.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-[10px] text-gray-400">
                R$ {unit.toFixed(2).replace('.', ',')} / un
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const navigate = useNavigate()
  const {
    cartItems, removeFromCart, updateCartQty, setCartQty, clearCart,
    user, isAccount, displayName,
  } = useUser()

  const [selectedShipping, setSelectedShipping] = useState('balcao')
  const [coupon, setCoupon] = useState('PRIMEIRACOMPRA18')
  const [couponApplied, setCouponApplied] = useState(true)
  const [orderMsg, setOrderMsg] = useState('')

  const subtotal = cartItems.reduce((s, i) => s + parsePrice(i.price) * (i.qty || 1), 0)
  const discount = couponApplied ? subtotal * 0.10 : 0
  const shippingCost = shippingOptions.find((s) => s.id === selectedShipping)?.price ?? 0
  const total = subtotal - discount + shippingCost
  const addressLabel = user?.address?.cep
    ? `${user.address.street}, ${user.address.number} — CEP ${user.address.cep}`
    : null

  const handleCheckout = () => {
    if (!isAccount) {
      navigate('/login')
      return
    }
    setOrderMsg(`Pedido confirmado para ${displayName}! Total R$ ${total.toFixed(2).replace('.', ',')}.`)
    setTimeout(() => setOrderMsg(''), 4000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <ChevronRight size={12} />
          <span className="text-navy dark:text-white font-medium">Meu Carrinho</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-navy dark:text-white">Carrinho de Compras</h1>
            <span className="badge bg-primary/10 text-primary text-xs">
              {cartItems.length} item(ns)
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              {isAccount ? `Cliente: ${displayName}` : 'Visitante anônimo'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 font-semibold hover:underline"
              >
                Esvaziar carrinho
              </button>
            )}
            <Link to="/produtos" className="text-xs text-primary font-semibold hover:underline">
              ← Continuar Comprando
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <FileCheck size={15} className="text-white" />
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            <span className="font-bold text-navy dark:text-white">Itens salvos no LocalStorage</span>
            {' '}— seu carrinho persiste ao recarregar a página.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="card p-10 text-center mb-6">
            <ShoppingBag size={36} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm font-semibold text-navy dark:text-white mb-1">Seu carrinho está vazio</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Adicione produtos na página de catálogo.
            </p>
            <Link to="/produtos" className="btn-primary text-xs inline-flex">
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQtyChange={updateCartQty}
                  onSetQty={setCartQty}
                  onRemove={removeFromCart}
                />
              ))}

              <div className="card p-5 mt-4">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-primary" />
                    <h3 className="text-sm font-bold text-navy dark:text-white">Opções de Frete</h3>
                  </div>
                  <span className="text-xs text-gray-400 text-right">
                    {addressLabel || 'CEP: 01310-100'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {shippingOptions.map((option) => {
                    const Icon = option.icon
                    const selected = selectedShipping === option.id
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedShipping(option.id)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          selected
                            ? 'border-primary bg-primary/5 dark:bg-primary/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 bg-white dark:bg-gray-900'
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <CheckCircle size={12} className="text-white" />
                          </div>
                        )}
                        <Icon size={18} className={`mb-2 ${selected ? 'text-primary' : 'text-gray-400'}`} />
                        <p className="text-xs font-bold text-navy dark:text-white mb-0.5">{option.label}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2">{option.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400">{option.time}</span>
                          <span className={`text-xs font-black ${option.price === 0 ? 'text-green-600' : 'text-navy dark:text-white'}`}>
                            {option.priceLabel}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card p-5 sticky top-24">
                <h3 className="text-base font-black text-navy dark:text-white mb-4">Resumo do Pedido</h3>

                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                    <span>Subtotal ({cartItems.length} itens)</span>
                    <span className="font-semibold text-navy dark:text-white">
                      R$ {subtotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                    <span>Frete</span>
                    <span className="font-semibold text-green-600">
                      {selectedShipping === 'balcao' ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <Tag size={10} className="text-green-500" />
                        Cupom (10%)
                      </span>
                      <span className="font-semibold text-green-600">
                        – R$ {discount.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Código de cupom"
                      className="input-field text-xs flex-1"
                    />
                    <button
                      onClick={() => setCouponApplied(true)}
                      className="px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-navy dark:text-white">Total:</span>
                    <p className="text-2xl font-black text-primary">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-accent text-white rounded-xl font-black text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg flex items-center justify-center gap-2 mb-2"
                >
                  <Lock size={15} />
                  {isAccount ? 'Finalizar Compra' : 'Entrar para finalizar'}
                </button>
                {isAccount ? (
                  <p className="text-[10px] text-green-600 dark:text-green-400 text-center mb-3">
                    Logado como {displayName} — sem precisar entrar de novo.
                  </p>
                ) : (
                  <p className="text-[10px] text-gray-500 text-center mb-3">
                    Faça login ou crie uma conta para concluir o pedido.
                  </p>
                )}
                {orderMsg && (
                  <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2 mb-3">
                    {orderMsg}
                  </p>
                )}

                <div className="space-y-1.5 mb-4">
                  {[
                    'Garantia de fidelidade CMYK.',
                    'Ambiente seguro SSL.',
                    'NF-e automática.',
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-1.5">
                      <ShieldCheck size={11} className="text-green-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <MessageCircle size={15} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-navy dark:text-white">Dúvidas com o arquivo?</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Nossa equipe ajuda no fechamento da arte.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: '100% Correspondência CMYK', desc: 'Calibração ISO' },
            { icon: '🚀', title: 'Despacho em 24h', desc: 'Produção expressa' },
            { icon: '✅', title: 'Preflight Grátis', desc: 'Sangria e resolução' },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-xs font-bold text-navy dark:text-white">{b.title}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
