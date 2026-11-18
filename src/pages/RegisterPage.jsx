import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff, User, Building2,
  CheckCircle, Printer, ShieldCheck, Package,
  Star, Truck
} from 'lucide-react'
import { useUser } from '../context/UserContext'

function PasswordStrengthBar({ password }) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    number: /[0-9]/.test(password),
  }
  const count = Object.values(checks).filter(Boolean).length
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-500']
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              i < count ? colors[count] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="flex gap-3 flex-wrap">
        {[
          { key: 'length', label: '8+ chars' },
          { key: 'upper', label: 'Uppercase' },
          { key: 'special', label: 'Special Symbol' },
          { key: 'number', label: 'Number' },
        ].map((c) => (
          <span
            key={c.key}
            className={`text-[10px] font-semibold flex items-center gap-0.5 transition-colors ${
              checks[c.key] ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            {checks[c.key] ? '✓' : '·'} {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const { saveAccount } = useUser()
  const [accountType, setAccountType] = useState('creative')
  const [form, setForm] = useState({
    fullName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    agreeTerms: false,
    swatch: false,
  })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (!form.cep || !form.street || !form.number || !form.neighborhood || !form.city || !form.state) {
      setError('Preencha todos os campos obrigatórios de endereço.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      saveAccount({
        name: form.fullName,
        email: form.email,
        company: form.company,
        password: form.password,
        address: {
          cep: form.cep,
          street: form.street,
          number: form.number,
          complement: form.complement,
          neighborhood: form.neighborhood,
          city: form.city,
          state: form.state,
        },
      })
      setLoading(false)
      navigate('/perfil')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">

          {/* ── LEFT PANEL ── */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex flex-col gap-6 border-r border-gray-100">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                  <Printer size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-navy leading-none">Grafica Online</p>
                  <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Commercial Print & Lab</p>
                </div>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-xl font-black text-navy leading-tight mb-2">
                Create your Grafica Online Account
              </h1>
              <p className="text-xs text-gray-500 leading-relaxed">
                Unlock exclusive B2B trade pricing, instant file preflight, and free tactile sample packs tailored for modern print professionals.
              </p>
            </div>

            {/* Preflight metric */}
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-navy">Instant Preflight</p>
                <p className="text-[10px] text-gray-500">Automated CMYK & 300DPI bleed audit</p>
              </div>
              <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                0.4s avg
              </span>
            </div>

            {/* Product image card */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 h-32 flex items-center justify-center">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-10 rounded-sm shadow-xl"
                    style={{ background: `linear-gradient(135deg, #2a2a3e ${i * 20}%, #FFD700${20 + i * 20} 100%)` }}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-[9px] font-bold text-yellow-400 uppercase tracking-wider">Included on Sign Up</p>
                <p className="text-xs font-black text-white">Curated Master Swatch Kit v4.2</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              {[
                { icon: Package, text: '15% off first order applied directly at checkout, plus priority queueing on press runs.' },
                { icon: CheckCircle, text: 'Access wholesale bulk tiered tables for brochures, foils, heavyweight letterpress, and box packaging.' },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon size={11} className="text-primary" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-xs text-gray-500 italic leading-relaxed mb-2">
                "The automated bleed check saved us thousands in reprint costs."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-[9px] font-bold">EV</div>
                <p className="text-xs font-semibold text-navy">Elena Vance — Studio Monolith</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL (Form) ── */}
          <div className="md:col-span-3 p-8">
            {/* Account type */}
            <div className="mb-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Select Account Type
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'creative', label: 'Creative / Freelancer', icon: '🎨' },
                  { value: 'business', label: 'Business / Agency', icon: '🏢' },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setAccountType(t.value)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all duration-200 ${
                      accountType === t.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social sign up */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { label: 'Sign up with Google', icon: <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
                { label: 'Sign up with Apple', icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Or Register with Email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {error && (
              <p className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Company */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="fullName" type="text" placeholder="Julian Vance" value={form.fullName} onChange={handleChange} required className="input-field pl-9 text-xs" />
                  </div>
                  {form.fullName.length > 2 && (
                    <p className="text-[10px] text-primary mt-0.5 font-medium">Looks good! Ready for shipping labels.</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Company / Studio{' '}
                    <span className="text-gray-400 font-normal">Optional</span>
                  </label>
                  <div className="relative">
                    <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="company" type="text" placeholder="Vance Design Bureau" value={form.company} onChange={handleChange} className="input-field pl-9 text-xs" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Business or Creative Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="email" type="email" placeholder="julian@vancestudio.design" value={form.email} onChange={handleChange} required className="input-field pl-9 pr-9 text-xs" />
                  {form.email.includes('@') && form.email.includes('.') && (
                    <CheckCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[10px] text-gray-400">Instant order proofs sent directly to this address.</p>
                  {form.email.includes('@') && <span className="text-[10px] text-primary font-semibold">Valid format</span>}
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-navy">
                    Password <span className="text-red-500">*</span>
                  </label>
                  {form.password.length >= 8 && <span className="text-[10px] font-bold text-green-600">Strong</span>}
                </div>
                <div className="relative">
                  <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="password" type={showPass ? 'text' : 'password'} placeholder="PicaFoli#2024&" value={form.password} onChange={handleChange} required className="input-field pl-9 pr-9 text-xs" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
                <PasswordStrengthBar password={form.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="PicaFoli#2024&" value={form.confirmPassword} onChange={handleChange} required className="input-field pl-9 pr-9 text-xs" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-navy mb-3">
                  Endereço de entrega <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-navy mb-1">CEP *</label>
                    <input name="cep" value={form.cep} onChange={handleChange} required placeholder="01310-100" className="input-field text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-navy mb-1">Número *</label>
                    <input name="number" value={form.number} onChange={handleChange} required placeholder="100" className="input-field text-xs" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-navy mb-1">Rua / Avenida *</label>
                    <input name="street" value={form.street} onChange={handleChange} required placeholder="Av. Paulista" className="input-field text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-navy mb-1">Bairro *</label>
                    <input name="neighborhood" value={form.neighborhood} onChange={handleChange} required placeholder="Bela Vista" className="input-field text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-navy mb-1">Complemento</label>
                    <input name="complement" value={form.complement} onChange={handleChange} placeholder="Apto 12" className="input-field text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-navy mb-1">Cidade *</label>
                    <input name="city" value={form.city} onChange={handleChange} required placeholder="São Paulo" className="input-field text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-navy mb-1">Estado *</label>
                    <input name="state" value={form.state} onChange={handleChange} required placeholder="SP" maxLength={2} className="input-field text-xs uppercase" />
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2.5">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/30" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I accept the{' '}
                    <a href="#" className="text-primary underline">Terms of Service</a>,{' '}
                    Print Preflight Guarantee, and{' '}
                    <a href="#" className="text-primary underline">Privacy Policy</a>.
                  </span>
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" name="swatch" checked={form.swatch} onChange={handleChange} className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/30" />
                    <div>
                      <p className="text-xs font-bold text-navy">Complimentary Swatch Kits & Paper Drops</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        Send me free physical print sample kits, new substrate arrivals (linen, cotton, synthetic foils), and monthly trade discounts.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !form.agreeTerms}
                className="w-full py-3 bg-accent text-white rounded-xl font-bold text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : null}
                Create Free Account →
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign In →</Link>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 bg-gray-50 px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-primary" />
            <div>
              <p className="text-xs font-bold text-navy">Studio Welcome Swatch Included</p>
              <p className="text-[10px] text-gray-400">Delivered in 2 business days. Over 48 real tactile paper finishes, metallic foils, and spot UV plates.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
              <ShieldCheck size={11} className="text-green-500" /> 256-Bit Encrypted
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
              <Truck size={11} className="text-blue-500" /> Fast B2B Dispatch
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
