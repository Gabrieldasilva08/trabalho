import { Link } from 'react-router-dom'
import { Printer, Phone, Mail, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useState } from 'react'

const footerLinks = {
  Navegação: ['Home', 'Produtos em Destaque', 'Carrinho', 'Compras', 'Suporte e Gabaritos'],
}

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Trust badges */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'CMYK 100% Color Match',
                desc: 'Precisão offset digital calibrada',
              },
              {
                icon: '🚚',
                title: 'Despacho Rápido em 24h',
                desc: 'Entregas a prazos priorizados',
              },
              {
                icon: '✅',
                title: 'Garantia de Qualidade',
                desc: 'Conferência de sangria e fidelidade técnica',
              },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-navy">{b.title}</p>
                  <p className="text-xs text-gray-500">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Printer size={16} className="text-white" />
              </div>
              <span className="font-black text-navy text-base">
                Gráfica <span className="text-primary">Online</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-xs">
              Plataforma de impressão comercial de precisão para agências, designers independentes e marcas exigentes.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <Phone size={13} className="text-primary" />
              Central de Atendimento
            </div>
            <p className="text-sm font-bold text-navy mt-0.5 ml-5">0800 472 3422</p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Navegação</h4>
            <ul className="space-y-2">
              {footerLinks.Navegação.map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-500 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1">
              Novidades e Ofertas
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Receba cupons exclusivos e lançamentos de acabamentos especiais.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2025 Gráfica Online Inc. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['Privacidade', 'Termos de Serviço', 'Mapa do Site'].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
