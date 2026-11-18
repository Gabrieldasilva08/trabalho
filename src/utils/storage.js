const USER_KEY = 'grafica_user'
const ACCOUNTS_KEY = 'grafica_accounts'
const FAVORITES_KEY = 'grafica_favorites'
const CART_KEY = 'grafica_cart'

const ANON_USER = {
  mode: 'anonymous',
  name: 'Visitante',
  email: '',
  phone: '',
  company: '',
  address: {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function normalizeAddress(address = {}) {
  return {
    cep: address.cep || '',
    street: address.street || '',
    number: address.number || '',
    complement: address.complement || '',
    neighborhood: address.neighborhood || '',
    city: address.city || '',
    state: address.state || '',
  }
}

function normalizeUser(user) {
  if (!user || typeof user !== 'object') return { ...ANON_USER, address: { ...ANON_USER.address } }

  if (user.mode === 'account' && user.email) {
    return {
      mode: 'account',
      name: user.name || 'Usuário',
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      address: normalizeAddress(user.address),
    }
  }

  if (user.email && user.name && user.mode !== 'anonymous') {
    return {
      mode: 'account',
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      address: normalizeAddress(user.address),
    }
  }

  return { ...ANON_USER, address: { ...ANON_USER.address } }
}

export const storage = {
  ANON_USER,

  getUser: () => normalizeUser(read(USER_KEY, ANON_USER)),
  setUser: (user) => write(USER_KEY, normalizeUser(user)),
  clearUser: () => write(USER_KEY, { ...ANON_USER, address: { ...ANON_USER.address } }),

  getAccounts: () => read(ACCOUNTS_KEY, []),
  upsertAccount: (account) => {
    const list = storage.getAccounts()
    const email = account.email.trim().toLowerCase()
    const next = {
      name: account.name.trim(),
      email,
      phone: (account.phone || '').trim(),
      company: (account.company || '').trim(),
      password: account.password || '',
      address: normalizeAddress(account.address),
      createdAt: account.createdAt || new Date().toISOString(),
    }
    const idx = list.findIndex((a) => a.email.toLowerCase() === email)
    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        ...next,
        password: account.password ? next.password : list[idx].password,
        createdAt: list[idx].createdAt || next.createdAt,
      }
      write(ACCOUNTS_KEY, list)
      return list[idx]
    }
    list.push(next)
    write(ACCOUNTS_KEY, list)
    return next
  },
  findAccount: (email) => {
    const key = String(email || '').trim().toLowerCase()
    return storage.getAccounts().find((a) => a.email.toLowerCase() === key) || null
  },

  getFavorites: () => read(FAVORITES_KEY, []),
  setFavorites: (ids) => write(FAVORITES_KEY, ids),
  clearFavorites: () => localStorage.removeItem(FAVORITES_KEY),

  getCart: () => read(CART_KEY, []),
  setCart: (items) => write(CART_KEY, items),
  clearCart: () => localStorage.removeItem(CART_KEY),
}
