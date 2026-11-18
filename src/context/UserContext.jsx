import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage'

const UserContext = createContext(null)

function toSessionUser(account) {
  return {
    mode: 'account',
    name: account.name,
    email: account.email,
    phone: account.phone || '',
    company: account.company || '',
    address: account.address || storage.ANON_USER.address,
  }
}

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => storage.getUser())
  const [favorites, setFavoritesState] = useState(() => storage.getFavorites())
  const [cartItems, setCartItems] = useState(() => storage.getCart())

  useEffect(() => { storage.setUser(user) }, [user])
  useEffect(() => { storage.setFavorites(favorites) }, [favorites])
  useEffect(() => { storage.setCart(cartItems) }, [cartItems])

  const isAccount = user.mode === 'account'
  const displayName = isAccount ? (user.name || 'Usuário') : 'Visitante anônimo'

  const saveAccount = useCallback(({ name, email, phone = '', company = '', password = '', address = {} }) => {
    const saved = storage.upsertAccount({ name, email, phone, company, password, address })
    setUserState(toSessionUser(saved))
    return saved
  }, [])

  const login = useCallback(({ email, password }) => {
    const found = storage.findAccount(email)
    if (found) {
      if (found.password && password && found.password !== password) {
        return { ok: false, error: 'Senha incorreta.' }
      }
      setUserState(toSessionUser(found))
      return { ok: true, user: found }
    }

    const name = String(email).split('@')[0] || 'Usuário'
    const saved = storage.upsertAccount({ name, email, password: password || '' })
    setUserState(toSessionUser(saved))
    return { ok: true, user: saved, created: true }
  }, [])

  const useAnonymous = useCallback(() => {
    setUserState({ ...storage.ANON_USER, address: { ...storage.ANON_USER.address } })
  }, [])

  const clearAccount = useCallback(() => {
    storage.clearUser()
    setUserState({ ...storage.ANON_USER, address: { ...storage.ANON_USER.address } })
  }, [])

  const toggleFavorite = useCallback((productId) => {
    const id = Number(productId)
    setFavoritesState((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const removeFavorite = useCallback((productId) => {
    setFavoritesState((prev) => prev.filter((x) => x !== Number(productId)))
  }, [])

  const clearFavorites = useCallback(() => {
    storage.clearFavorites()
    setFavoritesState([])
  }, [])

  const addToCart = useCallback((product, qty = 1) => {
    const amount = Math.max(1, Number(qty) || 1)
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + amount } : p
        )
      }
      return [...prev, { ...product, qty: amount }]
    })
  }, [])

  const updateCartQty = useCallback((productId, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== Number(productId)) return item
        return { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
      })
    )
  }, [])

  const setCartQty = useCallback((productId, qty) => {
    const amount = Math.max(1, Number(qty) || 1)
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === Number(productId) ? { ...item, qty: amount } : item
      )
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== Number(productId)))
  }, [])

  const clearCart = useCallback(() => {
    storage.clearCart()
    setCartItems([])
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAccount,
      displayName,
      saveAccount,
      login,
      useAnonymous,
      clearAccount,
      favorites,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      cartItems,
      cartCount: cartItems.reduce((s, i) => s + (i.qty || 1), 0),
      addToCart,
      updateCartQty,
      setCartQty,
      removeFromCart,
      clearCart,
    }),
    [
      user, isAccount, displayName, saveAccount, login, useAnonymous, clearAccount,
      favorites, toggleFavorite, removeFavorite, clearFavorites,
      cartItems, addToCart, updateCartQty, setCartQty, removeFromCart, clearCart,
    ]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
