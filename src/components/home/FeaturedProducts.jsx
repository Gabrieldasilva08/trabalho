import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import ProductCard from './ProductCard'
import { api } from '../../services/api'

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProducts()
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              CATÁLOGO SELECIONADO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy dark:text-white mt-1">
              Produtos Gráficos em Destaque
            </h2>
          </div>
          <Link
            to="/produtos"
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Ver todos os produtos <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin text-primary" />
            Carregando da API...
          </div>
        ) : featured.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            Não há itens com a palavra-chave pesquisada. Inicie o JSON Server (`npm run server`).
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
