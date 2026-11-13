import ProductCard from './ProductCard'

const products = [
  {
    id: 1,
    name: 'Cartões Velvet Soft-Touch',
    desc: 'Laminação aveludada dupla-face com corte preciso e refilado anti-toque.',
    price: 'R$ 42,00',
    badge: '450 GSM',
    badgeStyle: 'bg-gray-800 text-white',
    emoji: '🃏',
    bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 2,
    name: 'Banner Roll-Up Retrátil',
    desc: 'Lona 510g fosca anti-reflexo em alumínio e bolsa para transporte.',
    price: 'R$ 89,00',
    badge: 'Anti-Reflexo',
    badgeStyle: 'bg-teal-600 text-white',
    emoji: '🖼️',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 3,
    name: 'Folhetos Trifold A5 / A4',
    desc: 'Couché 150g fosca, com dobra de 3 vias, vinco mecânico, limpo e cores vivas.',
    price: 'R$ 55,00',
    badge: 'Dobra de Precisão',
    badgeStyle: 'bg-blue-600 text-white',
    emoji: '📄',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 4,
    name: 'Adesivos Vinil Holográfico',
    desc: 'Corte de contorno customizado, filme laminado protetor ultra-resistente.',
    price: 'R$ 14,50',
    badge: 'À prova d\'água',
    badgeStyle: 'bg-orange-500 text-white',
    emoji: '✨',
    bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #a18cd1 100%)',
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              CATÁLOGO SELECIONADO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
              Produtos Gráficos em Destaque
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-xs text-right hidden sm:block">
            Materiais gráficos com garantia de fidelidade cor ISO, prazos ágeis e opção direta para adicionar à sua cesta.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
