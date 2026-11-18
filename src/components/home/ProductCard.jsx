import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useUser } from '../../context/UserContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useUser()
  const [qty, setQty] = useState(1)

  return (
    <div className="card overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-40">
        <div
          className="w-full h-full flex items-center justify-center text-5xl"
          style={{ background: product.bgGradient }}
        >
          {product.emoji}
        </div>
        {product.badge && (
          <span className={`absolute top-2 left-2 badge ${product.badgeStyle} text-[10px] uppercase tracking-wider`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-navy dark:text-white leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">{product.desc}</p>

        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] text-gray-400">A partir de</p>
            <p className="text-base font-black text-navy dark:text-white">{product.price}</p>
          </div>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-16 input-field text-xs py-1.5 px-2"
            title="Quantidade"
          />
        </div>

        <button
          onClick={() => {
            addToCart(product, qty)
            navigate('/carrinho')
          }}
          className="w-full flex items-center justify-center gap-1.5 bg-primary text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary-600 transition-colors shadow-button"
        >
          <ShoppingCart size={12} />
          Adicionar ({qty})
        </button>
      </div>
    </div>
  )
}
