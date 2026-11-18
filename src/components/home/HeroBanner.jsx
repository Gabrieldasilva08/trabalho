import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingCart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const slides = [
  {
    id: 1,
    badge: { text: 'ACABAMENTOS NOBRES', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
    title: 'Cartões de Visita com',
    titleHighlight: 'Soft-Touch & Foil',
    desc: 'Impressão offset de altíssima definição em papel couchê 450g com laminação aveludada e detalhes metálicos que elevam o valor da sua marca.',
    cta: 'Personalizar Agora',
    price: 'A partir de R$ 42,00',
    image: (
      <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />
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
    badge: { text: 'GRANDE FORMATO RESISTENTE', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300' },
    title: 'Banners Roll-Up &',
    titleHighlight: 'Painéis UV',
    desc: 'Lona resistente anti-reflexo 510g com estrutura de alumínio retrátil. Prontos para feiras, eventos corporativos e pontos de venda.',
    cta: 'Configurar Medidas',
    price: 'A partir de R$ 89,00',
    image: (
      <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="relative w-24 h-40 bg-gradient-to-b from-purple-700 to-blue-800 rounded-sm shadow-2xl flex flex-col items-center justify-center border border-purple-500/50">
          <div className="text-white text-[8px] font-black text-center leading-tight px-2">
            <div className="text-yellow-400 text-[10px] mb-1">★ CREATIVE</div>
            <div>STUDIO</div>
            <div className="text-purple-300 mt-1">EXPO 2025</div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded" />
        </div>
        <div className="absolute right-4 w-16 h-36 bg-gradient-to-b from-orange-600 to-red-700 rounded-sm shadow-xl opacity-70 flex items-center justify-center">
          <div className="text-white text-[7px] font-bold text-center">UV<br/>PANEL</div>
        </div>
        <div className="absolute bottom-3 left-3 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
          A partir de R$ 89,00
        </div>
      </div>
    ),
  },
  {
    id: 3,
    badge: { text: 'ADESIVOS PREMIUM', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' },
    title: 'Adesivos Vinil',
    titleHighlight: 'Holográfico',
    desc: 'Corte de contorno customizado com filme laminado protetor. Resistentes à água, UV e ideal para branding criativo.',
    cta: 'Ver Catálogo',
    price: 'A partir de R$ 14,50',
    image: (
      <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 flex items-center justify-center">
        <div className="w-28 h-28 rounded-2xl rotate-12 shadow-2xl flex items-center justify-center text-4xl"
             style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe, #a18cd1)' }}>
          ✨
        </div>
        <div className="absolute bottom-3 left-3 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
          A partir de R$ 14,50
        </div>
      </div>
    ),
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const navigate = useNavigate()

  const prev = () => setCurrent(c => (c === 0 ? slides.length - 1 : c - 1))
  const next = () => setCurrent(c => (c === slides.length - 1 ? 0 : c + 1))

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, current])

  const slide = slides[current]

  return (
    <section className="bg-surface dark:bg-gray-950 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
              <span className={`badge ${slide.badge.color} mb-3`}>
                <Sparkles size={10} />
                {slide.badge.text}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy dark:text-white leading-tight mb-2">
                {slide.title}
                <br />
                <span className="text-gradient">{slide.titleHighlight}</span>
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
                {slide.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => navigate('/produtos')}
                  className="btn-primary text-xs flex-1 sm:flex-none"
                >
                  {slide.cta} <ArrowRight size={13} />
                </button>
                <button
                  onClick={() => navigate('/carrinho')}
                  className="btn-ghost text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <ShoppingCart size={13} />
                  Adicionar Rápido
                </button>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              {slide.image}

              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Slide anterior"
              >
                <ChevronLeft size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Próximo slide"
              >
                <ChevronRight size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-7 bg-primary' : 'w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
