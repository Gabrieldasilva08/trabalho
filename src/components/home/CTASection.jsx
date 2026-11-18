import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Grid3X3, ArrowRight } from 'lucide-react'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            Pronto para imprimir seu próximo projeto?
          </h2>
          <p className="text-sm text-blue-200 max-w-md">
            Envie sua arte para conferência imediata de corte e cores, ou monte seu carrinho direto pelo catálogo.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => navigate('/produtos')}
            className="flex items-center gap-2 px-5 py-3 border-2 border-white/40 text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            <Grid3X3 size={16} />
            Ver Vitrine de Produtos
          </button>
          <button
            onClick={() => navigate('/carrinho')}
            className="flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent-hover transition-colors shadow-lg"
          >
            <ShoppingCart size={16} />
            Acessar Carrinho
          </button>
        </div>
      </div>
    </section>
  )
}
