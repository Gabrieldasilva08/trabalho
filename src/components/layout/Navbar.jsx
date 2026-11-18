import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Search, ShoppingCart, Menu, X, ChevronDown,
  Printer, Grid3X3, Home, Sun, Moon, User
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useUser } from '../../context/UserContext'

const NAV_LINKS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Produtos', path: '/produtos', icon: Grid3X3 },
  { label: 'Carrinho', path: '/carrinho', icon: ShoppingCart },
  { label: 'Perfil', path: '/perfil', icon: User },
]

const SUB_NAV = [
  { label: 'Cartões de Visita', path: '/produtos' },
  { label: 'Panfletos & Folders', path: '/produtos' },
  { label: 'Banners & Faixas', path: '/produtos' },
  { label: 'Adesivos & Rótulos', path: '/produtos' },
  { label: 'Kits Corporativos', path: '/produtos' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subNavOpen, setSubNavOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { isDark, toggleTheme } = useTheme()
  const { cartCount, isAccount, displayName } = useUser()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Printer size={15} className="text-white" />
            </div>
            <span className="font-bold text-navy dark:text-white text-sm hidden sm:block">
              Gráfica <span className="text-primary font-black">Online</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-1">
            {NAV_LINKS.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(path)
                    ? 'text-primary bg-surface dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-surface dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={14} />
                <span className="hidden lg:inline">{label}</span>
                {path === '/carrinho' && cartCount > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 bg-accent rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}

            <button
              onClick={() => setSubNavOpen(!subNavOpen)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                subNavOpen
                  ? 'text-primary bg-surface dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-surface dark:hover:bg-gray-800'
              }`}
            >
              Categorias
              <ChevronDown size={14} className={`transition-transform ${subNavOpen ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          <div className="flex-1 max-w-xs relative hidden lg:block">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchValue.trim()) {
                  navigate(`/produtos?q=${encodeURIComponent(searchValue.trim())}`)
                }
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         bg-gray-50 dark:bg-gray-800 text-navy dark:text-white"
            />
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <Link
              to="/perfil"
              className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium
                         text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 max-w-[140px]"
              title={displayName}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${isAccount ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="truncate">{isAccount ? displayName : 'Anônimo'}</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300"
              aria-label="Alternar tema"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${subNavOpen ? 'max-h-40 border-t border-gray-100 dark:border-gray-800' : 'max-h-0'}`}>
        <div className="bg-white dark:bg-gray-900 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-5 h-10 overflow-x-auto scrollbar-hide">
              {SUB_NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSubNavOpen(false)}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-primary font-medium whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
          {NAV_LINKS.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(path)
                  ? 'text-primary bg-surface dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon size={15} />
              {label}
              {path === '/carrinho' && cartCount > 0 && (
                <span className="ml-auto min-w-[18px] h-[18px] px-1 bg-accent rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
          <p className="px-3 pt-2 text-[11px] text-gray-400">
            {isAccount ? `Conta: ${displayName}` : 'Perfil anônimo'}
          </p>
        </div>
      )}
    </header>
  )
}
