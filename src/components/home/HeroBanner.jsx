import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingCart, ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react'

const slides = [
  {
    id: 1,
    badge: { text: 'ACABAMENTOS NOBRES', color: 'bg-blue-100 text-blue-700' },
    title: ['Cartões de Visita com', null],
    titleHighlight: 'Soft-Touch & Foil',
    desc: 'Impressão offset de altíssima definição em papel couchê 450g com laminação aveludada e detalhes metálicos que elevam o valor da sua marca.',
    cta: 'Personalizar Agora',
    ctaSecondary: 'Adicionar Rápido',
    price: 'A partir de R$ 42,00',
    priceColor: 'bg-primary',
    image: (
      <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />
        {/* Simulated card stack */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-20 rounded-lg bg-gray-900 border border-gray-700 shadow-2xl"
            style={{
              transform: `rotate(${(i - 2) * 8}deg) translateY(${i * 2}px) translateX(${(i - 2) * 4}px)`,
              zIndex: i,
              background: `linear-gradient(135deg, #111 60%, #FFD700${30 + i * 10} 100%)`,
            }}
          >
            <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(255,215,0,0.15) 100%)' }} />
            <div className="absolute bottom-2 left-3 text-yellow-400/80 text-[7px] font-bold tracking-widest uppercase">AURA</div>
            <div className="absolute top-3 left-3 w-5 h-3 rounded-sm bg-yellow-500/40" />
          </div>
        ))}
        <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg z-10">
          A partir de R$ 42,00
        </div>
      </div>
    ),
  },
  {
    id: 2,
    badge: { text: 'GRANDE FORMATO RESISTENTE', color: 'bg-teal-100 text-teal-700' },
    title: ['Banners Roll-Up &', null],
    titleHighlight: 'Painéis UV',
    desc: 'Lona resistente anti-reflexo 510g com estrutura de alumínio retrátil. Prontos para feiras, eventos corporativos e pontos de venda.',
    cta: 'Configurar Medidas',
    ctaSecondary: 'Adicionar Rápido',
    price: 'A partir de R$ 89,00',
    priceColor: 'bg-teal-600',
    image: (
      <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        {/* Simulated banner */}
        <div className="relative w-24 h-40 bg-gradient-to-b from-purple-700 to-blue-800 rounded-sm shadow-2xl flex flex-col items-center justify-center border border-purple-500/50">
          <div className="text-white text-[8px] font-black text-center leading-tight px-2">
            <div className="text-yellow-400 text-[10px] mb-1">★ CREATIVE</div>
            <div>STUDIO</div>
            <div className="text-purple-300 mt-1">EXPO 2025</div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded" />
        </div>
        {/* Second banner partially visible */}
        <div className="absolute right-4 w-16 h-36 bg-gradient-to-b from-orange-600 to-red-700 rounded-sm shadow-xl opacity-70 flex items-center justify-center">
          <div className="text-white text-[7px] font-bold text-center">UV<br/>PANEL</div>
        </div>
        <div className="absolute bottom-3 left-3 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
          A partir de R$ 89,00
        </div>
      </div>
    ),
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const prev = () => setCurrent(c => (c === 0 ? slides.length - 1 : c - 1))
  const next = () => setCurrent(c => (c === slides.length - 1 ? 0 : c + 1))

  const slide = slides[current]

  return (
    <section className="bg-surface py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`bg-white rounded-2xl p-6 shadow-card border border-gray-100 transition-all duration-300
                          ${idx !== current && 'opacity-60 md:opacity-100'}`}
            >
              {/* Badge */}
              <span className={`badge ${s.badge.color} mb-3`}>
                <Sparkles size={10} />
                {s.badge.text}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-navy leading-tight mb-1">
                {s.title[0]}
                <br />
                <span className="text-gradient">{s.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-sm">
                {s.desc}
              </p>

              {/* Image */}
              <div className="mb-4">{s.image}</div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => navigate('/carrinho')}
                  className="btn-primary text-xs flex-1"
                >
                  {s.cta} <ArrowRight size={13} />
                </button>
                <button className="btn-ghost text-xs border border-gray-200 rounded-lg px-4 py-2.5">
                  <ShoppingCart size={13} />
                  Adicionar Rápido
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button onClick={prev} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={15} className="text-gray-500" />
            </button>
            <button onClick={next} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <ChevronRight size={15} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
