import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search, ShoppingCart, Bell, Menu, X, ChevronDown,
  Printer, Package, Grid3X3, Home
} from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Produtos', path: '/produtos', icon: Grid3X3 },
  { label: 'Carrinho', path: '/carrinho', icon: ShoppingCart },
]

const SUB_NAV = [
  'Cartões de Visita',
  'Panfletos & Folders',
  'Banners & Faixas',
  'Adesivos & Rótulos',
  'Kits Corporativos',
  'Calculadora de Preços',
]

export default function Navbar({ cartCount = 3, variant = 'full' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Printer size={15} className="text-white" />
            </div>
            <span className="font-bold text-navy text-sm leading-tight hidden sm:block">
              Gráfica<br/>
              <span className="text-primary font-black">Online</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {NAV_LINKS.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                           text-gray-600 hover:text-primary hover:bg-surface transition-all duration-150"
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <input
              type="text"
              placeholder="Buscar impressos, acabamentos, adesivos..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                         placeholder-gray-400 bg-gray-50"
            />
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Cart */}
            <button
              onClick={() => navigate('/carrinho')}
              className="relative flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-primary-600 transition-colors"
            >
              <ShoppingCart size={14} />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Bell */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 relative hidden sm:flex">
              <Bell size={16} />
            </button>

            {/* Menu icon */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hidden sm:flex">
              <Menu size={16} />
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      {variant === 'full' && (
        <div className="border-t border-gray-100 bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 h-9 overflow-x-auto scrollbar-hide">
              {SUB_NAV.map((item) => (
                <button
                  key={item}
                  className="text-xs text-gray-600 hover:text-primary font-medium whitespace-nowrap
                             transition-colors duration-150 py-2 border-b-2 border-transparent hover:border-primary"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 shadow-lg">
          {/* Mobile search */}
          <div className="relative mt-3 mb-3">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {NAV_LINKS.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium
                         text-gray-700 hover:text-primary hover:bg-surface transition-colors"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            {SUB_NAV.map((item) => (
              <button
                key={item}
                className="block w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
