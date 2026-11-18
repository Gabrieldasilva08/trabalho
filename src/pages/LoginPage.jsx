import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Printer, ShieldCheck, Award } from 'lucide-react'
import { useUser } from '../context/UserContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login({ email: form.email, password: form.password })
      setLoading(false)
      if (!result.ok) {
        setError(result.error || 'Não foi possível entrar.')
        return
      }
      navigate('/perfil')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #3B4FE0, #6B7FFF, #A855F7, #EC4899, #EF4444, #F97316, #EAB308, #22C55E)' }} />

        <div className="p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-surface border border-gray-200 flex items-center justify-center mb-3 shadow-sm">
              <Printer size={24} className="text-primary" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Commercial Print Portal
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-black text-navy text-center mb-1">
            Welcome back to Grafica Online
          </h1>
          <p className="text-xs text-gray-500 text-center mb-6 leading-relaxed">
            Sign in to access your print designs, repeat orders, and real-time preflight proofs.
          </p>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: 'Continue with Google', icon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              )},
              { label: 'Continue with Apple', icon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              )},
            ].map((btn) => (
              <button
                key={btn.label}
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {error && (
            <p className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">Work or Personal Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-9"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-navy">Password</label>
                <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="input-field pl-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/30"
                />
                <span className="text-xs text-gray-600">Remember this device for 30 days</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                <ShieldCheck size={10} />
                Safe session
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-600 transition-all duration-200 shadow-button flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : null}
              Sign In to Account →
            </button>
          </form>

          {/* Links */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <p className="text-xs text-gray-500">
              Don't have a business account?{' '}
              <Link to="/cadastro" className="text-primary font-semibold hover:underline">
                Create an account / Register ↗
              </Link>
            </p>
            <Link to="/produtos" className="text-xs text-gray-400 hover:text-primary transition-colors">
              Explorar catálogo sem entrar
            </Link>
          </div>
        </div>

        {/* Footer badges */}
        <div className="border-t border-gray-100 px-8 py-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-center gap-4">
          {[
            { icon: <Lock size={12} />, text: '256-Bit SSL Encrypted' },
            { icon: <Award size={12} />, text: 'ISO/IEC 27001 Certified Print Production' },
          ].map((b) => (
            <span key={b.text} className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <span className="text-green-500">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
