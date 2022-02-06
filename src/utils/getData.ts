import { API_URL } from '../constants'
import { TCard, TUser } from '../types/data-types'

const getIngredientsData = async () => {
  const res = await fetch(`${API_URL}/ingredients`)
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const getOrderData = async (orderList: Array<TCard>) => {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    //@ts-ignore
    headers: { 'Content-Type': 'application/json', authorization: token },
    body: JSON.stringify({
      ingredients: orderList
    })
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const register = async (user: TUser) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const login = async (user: TUser) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const logout = async (user: TUser) => {
  const token = localStorage.getItem('refreshToken')
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const forgotRequest = async (user: TUser) => {
  const res = await fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const resetRequest = async (user: TUser) => {
  const res = await fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const getUserData = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', authorization: token }
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const patchUserData = async (user: TUser, token: string) => {
  const res = await fetch(`${API_URL}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', authorization: token },
    body: JSON.stringify(user)
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  return obj
}

const getAccessToken = async () => {
  const token = localStorage.getItem('refreshToken')
  if (!token) return '' /*throw new Error('Авторизуйтесь')*/
  const res = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  console.log(obj)
  localStorage.setItem('accessToken', obj.accessToken)
  return obj
}

async function getRequestBody(res: Response) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

export {
  getIngredientsData,
  getOrderData,
  register,
  login,
  forgotRequest,
  getUserData,
  logout,
  getAccessToken,
  patchUserData,
  resetRequest
}
