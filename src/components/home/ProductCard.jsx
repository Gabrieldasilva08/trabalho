import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }) {
  return (
    <div className="card overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-40">
        <div
          className="w-full h-full flex items-center justify-center text-5xl"
          style={{ background: product.bgGradient }}
        >
          {product.emoji}
        </div>
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 badge ${product.badgeStyle} text-[10px] uppercase tracking-wider`}>
            {product.badge}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-navy leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{product.desc}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400">A partir de</p>
            <p className="text-base font-black text-navy">{product.price}</p>
          </div>
          <button className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-primary-600 transition-colors shadow-button">
            <ShoppingCart size={12} />
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}
