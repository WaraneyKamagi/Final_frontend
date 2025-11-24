const BASE_URL = 'http://localhost:3000'

export const fetchServices = async () => {
  const response = await fetch(`${BASE_URL}/services`)
  if (!response.ok) {
    throw new Error('Gagal mengambil data layanan')
  }
  return response.json()
}

export const fetchServiceById = async (serviceId) => {
  const response = await fetch(`${BASE_URL}/services/${serviceId}`)
  if (!response.ok) {
    throw new Error('Layanan tidak ditemukan')
  }
  return response.json()
}

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/users?email=${email}`)
  const users = await response.json()
  const user = users[0]

  if (!user) {
    throw new Error('Email belum terdaftar')
  }

  if (user.password !== password) {
    throw new Error('Password tidak sesuai')
  }

  return user
}

export const registerUser = async ({ name, email, password }) => {
  // Cek email dulu
  const checkResponse = await fetch(`${BASE_URL}/users?email=${email}`)
  const existingUsers = await checkResponse.json()

  if (existingUsers.length > 0) {
    throw new Error('Email sudah digunakan')
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
    role: 'user'
  }

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })

  if (!response.ok) {
    throw new Error('Gagal registrasi')
  }

  return response.json()
}

export const createOrder = async (orderData) => {
  const newOrder = {
    status: 'Menunggu Pembayaran',
    paymentMethod: null,
    paymentReference: null,
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  })

  if (!response.ok) {
    throw new Error('Gagal membuat order')
  }

  return response.json()
}

export const getUserOrders = async (userId) => {
  const response = await fetch(`${BASE_URL}/orders?userId=${userId}&_expand=service&_sort=createdAt&_order=desc`)
  if (!response.ok) {
    throw new Error('Gagal mengambil data order')
  }
  return response.json()
}

export const getOrderById = async (orderId) => {
  const response = await fetch(`${BASE_URL}/orders/${orderId}?_expand=service&_expand=user`)
  if (!response.ok) {
    throw new Error('Order tidak ditemukan')
  }
  return response.json()
}

export const fetchAllOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders?_expand=service&_expand=user&_sort=createdAt&_order=desc`)
  if (!response.ok) {
    throw new Error('Gagal mengambil semua order')
  }
  return response.json()
}

export const updateOrder = async (orderId, updates) => {
  // Ambil data lama dulu
  const oldOrder = await getOrderById(orderId)

  const updatedData = {
    ...oldOrder,
    ...updates,
    updatedAt: new Date().toISOString()
  }

  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })

  if (!response.ok) {
    throw new Error('Gagal update order')
  }

  return response.json()
}

export const deleteOrder = async (orderId) => {
  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Gagal menghapus order')
  }

  return true
}

