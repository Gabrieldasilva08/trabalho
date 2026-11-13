import { Star, CheckCircle } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    stars: 4,
    text: '"The 450gsm card stock with velvet soft-touch laminate is unmatched in the industry. As an agency art director ordering for demanding luxury clients, Grafica Online is the only print shop that hits CMYK values zero drift across batch reorders."',
    name: 'Marcus Alistair',
    role: 'Design Director',
    company: 'Kinetic Creative Agency',
    avatar: 'MA',
    avatarColor: 'bg-blue-700',
  },
  {
    id: 2,
    stars: 5,
    text: '"We needed 4,000 waterproof vinyl labels and branded menu booklets for our three cafe openings within 48 hours. They arrived on time, completely crisp, vibrant colors, and our baristas swear by their adhesive resilience on iced cups!"',
    name: 'Sofia Lin',
    role: 'Co-Founder',
    company: 'Roastery Collective',
    avatar: 'SL',
    avatarColor: 'bg-orange-600',
  },
  {
    id: 3,
    stars: 5,
    text: '"The automatic file preflight caught an RGB black saturation error that would have ruined our expo launch collateral. Saved us thousands of dollars and four days of reprints. Grafica is our sole print infrastructure partner."',
    name: 'David Kovacs',
    role: 'Head of Growth',
    company: 'Nexus SaaS Platform',
    avatar: 'DK',
    avatarColor: 'bg-green-700',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              DEPOIMENTOS VERIFICADOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
              Loved by Agencies & Makers Nationwide
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Stars count={5} />
            <span className="text-sm font-bold text-navy">4.9 / 5</span>
            <span className="text-xs text-gray-400">(18.420 avaliações de clientes)</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Stars count={t.stars} />
                <span className="badge bg-green-100 text-green-700 text-[10px]">
                  <CheckCircle size={9} />
                  Cliente Verificado
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic flex-1">
                {t.text}
              </p>
              <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
                <div className={`w-8 h-8 rounded-full ${t.avatarColor} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-navy">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
