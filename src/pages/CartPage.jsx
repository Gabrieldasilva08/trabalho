import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2, Plus, Minus, ChevronRight, FileCheck, AlertCircle,
  RefreshCw, Eye, Scissors, Tag, Lock, ShieldCheck,
  Truck, Clock, Package, CheckCircle, CreditCard,
  MessageCircle, Zap, FileText, Info
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const initialItems = [
  {
    id: 1,
    name: 'Cartões de Visita Velvet Matte 450gsm',
    tag: 'Tiragem Offset',
    tagColor: 'bg-orange-100 text-orange-700',
    specs: 'Formato: 85 × 55mm • Papel Couché 450g • Soft-Touch Aveludada • Verniz Localizado UV',
    preflight: { status: 'approved', text: 'Aprovado Preflight (300 DPI / CMYK)' },
    file: 'Aurelia_Cards_Final_PrintReady.pdf (14.2 MB)',
    actions: ['Trocar Arquivo de Arte', 'Ver Prova'],
    qty: 500,
    unitPrice: 0.298,
    totalPrice: 149.00,
    bgColor: 'bg-gray-900',
    emoji: '🃏',
  },
  {
    id: 2,
    name: 'Banner Retrátil Roll-Up 85 × 200cm',
    tag: 'Com Suporte Incluso',
    tagColor: 'bg-blue-100 text-blue-700',
    specs: 'Lona Fosca Premium 510g • Estrutura de Alumínio Retrátil Auto-portante • Bag de Transporte Inclusa',
    preflight: { status: 'validated', text: 'Arquivo Anexado e Validado' },
    file: 'Estande_Feira_Aurelia_V2.tiff (48.6 MB)',
    actions: ['Substituir Arte', 'Pré-visualizar'],
    qty: 1,
    unitPrice: 185.00,
    totalPrice: 185.00,
    bgColor: 'bg-blue-700',
    emoji: '🖼️',
  },
  {
    id: 3,
    name: 'Adesivos Vinil Holográfico com Corte Especial',
    tag: 'Die-Cut Kiss',
    tagColor: 'bg-purple-100 text-purple-700',
    specs: 'Dimensões: 5 × 5cm • Vinil Rainbow Prismático • Impermeável/resistente à água e UV • Corte a Laser Customizado',
    preflight: { status: 'faca', text: 'Faca de Corte Aprovada' },
    file: 'Badge_Logo_HoloCut_vector.pdf (4.8 MB)',
    actions: ['Trocar Arte / Faca', 'Ver Faca de Corte'],
    qty: 250,
    unitPrice: 0.384,
    totalPrice: 96.00,
    bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600',
    emoji: '✨',
  },
]

const shippingOptions = [
  {
    id: 'balcao',
    label: 'Retirada no Balcão',
    desc: 'Disponível em nossa central gráfica em 24h úteis.',
    time: 'Em até 24h',
    price: 0,
    priceLabel: 'GRÁTIS',
    priceColor: 'text-green-600',
    icon: Package,
  },
  {
    id: 'expressa',
    label: 'Expressa 24 Horas',
    desc: 'Entrega direta por courier dedicado em SP e região metropolitana.',
    time: 'Próximo dia útil',
    price: 28.98,
    priceLabel: '+ R$ 28,98',
    priceColor: 'text-gray-700',
    icon: Zap,
  },
  {
    id: 'sedex',
    label: 'Sedex Correios',
    desc: 'Envio/rastreado com seguro de transporte para todo o Brasil.',
    time: '2 a 3 dias úteis',
    price: 19.50,
    priceLabel: '+ R$ 19,50',
    priceColor: 'text-gray-700',
    icon: Truck,
  },
]

function StatusBadge({ status, text }) {
  const styles = {
    approved: 'bg-green-100 text-green-700 border-green-200',
    validated: 'bg-teal-100 text-teal-700 border-teal-200',
    faca: 'bg-green-100 text-green-700 border-green-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border ${styles[status]}`}>
      <CheckCircle size={9} /> {text}
    </span>
  )
}

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="card p-4 mb-3">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className={`w-16 h-16 rounded-xl ${item.bgColor} flex items-center justify-center text-2xl shrink-0 shadow-sm`}>
          {item.emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-navy leading-tight">{item.name}</h3>
              <span className={`badge ${item.tagColor} text-[10px]`}>{item.tag}</span>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <p className="text-[10px] text-gray-500 mb-2 leading-relaxed">{item.specs}</p>

          <div className="flex items-center gap-2 flex-wrap mb-2">
            <StatusBadge status={item.preflight.status} text={item.preflight.text} />
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <FileText size={9} /> {item.file}
            </span>
          </div>

          {/* Actions + Qty */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              {item.actions.map((action) => (
                <button key={action} className="text-[10px] text-primary font-semibold flex items-center gap-1 hover:underline">
                  {action.includes('Trocar') || action.includes('Substituir') ? <RefreshCw size={9} /> : <Eye size={9} />}
                  {action}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Qty control */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => onQtyChange(item.id, -1)}
                  className="p-1.5 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <Minus size={12} />
                </button>
                <span className="px-3 text-xs font-bold text-navy w-16 text-center">
                  {item.qty} un
                </span>
                <button
                  onClick={() => onQtyChange(item.id, 1)}
                  className="p-1.5 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-base font-black text-navy">R$ {item.totalPrice.toFixed(2).replace('.', ',')}</p>
                <p className="text-[10px] text-gray-400">
                  R$ {(item.totalPrice / (item.qty || 1)).toFixed(3).replace('.', ',')} / un
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(initialItems)
  const [selectedShipping, setSelectedShipping] = useState('balcao')
  const [coupon, setCoupon] = useState('PRIMEIRACOMPRA18')
  const [couponApplied, setCouponApplied] = useState(true)

  const handleQtyChange = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      const factor = item.qty > 0 ? item.qty : 1
      const newQty = Math.max(1, item.qty + delta)
      const unitPrice = item.totalPrice / factor
      return { ...item, qty: newQty, totalPrice: +(unitPrice * newQty).toFixed(2) }
    }))
  }

  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((s, i) => s + i.totalPrice, 0)
  const discount = couponApplied ? subtotal * 0.10 : 0
  const shippingCost = shippingOptions.find(s => s.id === selectedShipping)?.price ?? 0
  const total = subtotal - discount + shippingCost

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={items.length} variant="full" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <ChevronRight size={12} />
          <span className="text-navy font-medium">Meu Carrinho</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-navy">Carrinho de Compras</h1>
            <span className="badge bg-primary/10 text-primary text-xs">
              {items.length} Itens Personalizados
            </span>
          </div>
          <Link to="/" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 self-end sm:self-auto">
            ← Continuar Comprando
          </Link>
        </div>

        {/* Preflight banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <FileCheck size={15} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-700">
              <span className="font-bold text-navy">Arquivos e Preflight Grátis</span> — Seus arquivos são checados contra erros de sangria (3mm), resolução (300 DPI) e modo de cor CMYK antes de rodar na gráfica.
            </p>
          </div>
          <span className="badge bg-green-100 text-green-700 text-[10px] border border-green-200 shrink-0">
            100% GARANTIDO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Items + Shipping */}
          <div className="lg:col-span-2">
            {/* Cart items */}
            <div>
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Shipping */}
            <div className="card p-5 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-primary" />
                  <h3 className="text-sm font-bold text-navy">Opções de Frete & Envio</h3>
                </div>
                <span className="text-xs text-gray-400">CEP: 01310-100 (São Paulo – SP)</span>
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
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle size={12} className="text-white" />
                        </div>
                      )}
                      <Icon size={18} className={`mb-2 ${selected ? 'text-primary' : 'text-gray-400'}`} />
                      <p className="text-xs font-bold text-navy mb-0.5">{option.label}</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed mb-2">{option.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">{option.time}</span>
                        <span className={`text-xs font-black ${option.priceColor}`}>
                          {option.priceLabel}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h3 className="text-base font-black text-navy mb-4">Resumo do Pedido</h3>

              {/* Line items */}
              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal dos Produtos ({items.length} itens)</span>
                  <span className="font-semibold text-navy">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Envio & Frete</span>
                  <span className="font-semibold text-green-600">
                    {selectedShipping === 'balcao' ? 'Grátis (Balcão)' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Tag size={10} className="text-green-500" />
                      Cupom Aplicado (10%)
                    </span>
                    <span className="font-semibold text-green-600">
                      – R$ {discount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Prova Digital PDF & Preflight</span>
                  <span className="font-semibold text-green-600">GRÁTIS</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="border border-gray-200 rounded-xl p-3 mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      placeholder="Código de cupom"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button
                    onClick={() => setCouponApplied(true)}
                    className="px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[10px] text-green-600 font-medium mt-1.5 flex items-center gap-1">
                    <CheckCircle size={9} /> Cupom {coupon} ativo (–10%)
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-navy">Total do Pedido:</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </p>
                    {couponApplied && (
                      <p className="text-[10px] text-gray-400">
                        com 10% OFF aplicado
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  ou até 3× de R$ {(total / 3).toFixed(2).replace('.', ',')} sem juros no cartão de crédito
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3.5 bg-accent text-white rounded-xl font-black text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg flex items-center justify-center gap-2 mb-3"
              >
                <Lock size={15} />
                Finalizar Compra / Pagar
              </button>

              {/* Trust items */}
              <div className="space-y-1.5 mb-4">
                {[
                  'Garantia 100% Fidelidade CMYK: Reimpressão sem custo caso haja defeito de produção gráfica.',
                  'Ambiente Seguro com Criptografia SSL 256-bit.',
                  'Emissão automática de Nota Fiscal Eletrônica (NF-e).',
                ].map((text) => (
                  <div key={text} className="flex items-start gap-1.5">
                    <ShieldCheck size={11} className="text-green-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              {/* Payment methods */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'PIX', sub: '5% OFF', color: 'bg-green-50 border-green-200 text-green-700' },
                  { label: 'Cartão de Crédito', sub: '3× sem juros', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                  { label: 'Boleto Faturado', sub: 'Venc. 7 dias', color: 'bg-gray-50 border-gray-200 text-gray-700' },
                ].map((m) => (
                  <div key={m.label} className={`border rounded-lg p-2 text-center ${m.color}`}>
                    <p className="text-[10px] font-black">{m.label}</p>
                    <p className="text-[9px] font-medium">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Support */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <MessageCircle size={15} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-navy">Dúvidas com seu arquivo de arte?</p>
                    <p className="text-[10px] text-gray-500 mb-1">
                      Nossos arte-finalistas estão online para ajudar no fechamento do arquivo.
                    </p>
                    <button className="text-[10px] text-primary font-bold hover:underline">
                      Falar com Suporte Técnico →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust row */}
      <div className="bg-white border-t border-gray-100 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: '100% Correspondência CMYK', desc: 'Calibração e precisão certificada ISO' },
            { icon: '🚀', title: 'Despacho Veloz em 24h', desc: 'Produção expressa em tiragens prioritárias' },
            { icon: '✅', title: 'Preflight Grátis', desc: 'Inspeção digital de sangria, faca e resolução' },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-xs font-bold text-navy">{b.title}</p>
                <p className="text-[10px] text-gray-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
