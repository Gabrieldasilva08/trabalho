const API_URL = 'http://localhost:3001'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Erro na API (${res.status})`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  getProducts: () => request('/products'),
  createProduct: (product) =>
    request('/products', { method: 'POST', body: JSON.stringify(product) }),
  updateProduct: (id, product) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  deleteProduct: (id) =>
    request(`/products/${id}`, { method: 'DELETE' }),
  getInteractions: (productId) =>
    request(`/interactions?productId=${productId}&_sort=createdAt&_order=desc`),
  createInteraction: (interaction) =>
    request('/interactions', { method: 'POST', body: JSON.stringify(interaction) }),
}
