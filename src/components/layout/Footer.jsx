import { Link } from 'react-router-dom'
import { Printer } from 'lucide-react'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Produtos', path: '/produtos' },
  { label: 'Carrinho', path: '/carrinho' },
  { label: 'Perfil', path: '/perfil' },
]

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Printer size={14} className="text-white" />
            </div>
            <span className="font-black text-navy dark:text-white text-sm">
              Gráfica <span className="text-primary">Online</span>
            </span>
          </Link>

          <nav className="flex flex-wrap gap-4">
            {footerLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="text-[11px] text-gray-400 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
          © 2026 Gráfica Online
        </p>
      </div>
    </footer>
  )
}
