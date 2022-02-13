import { API_URL } from '../constants'
import { TCard, TUser } from '../types/data-types'

const getIngredientsData = async () => {
  const res = await fetch(`${API_URL}/ingredients`)
  return checkResponse(res)
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
  return checkResponse(res)
}

const register = async (user: TUser) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  return checkResponse(res)
}

const login = async (user: TUser) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  return checkResponse(res)
}

const logout = async (user: TUser) => {
  const token = localStorage.getItem('refreshToken')
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
  return checkResponse(res)
}

const forgotRequest = async (user: TUser) => {
  const res = await fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  return checkResponse(res)
}

const resetRequest = async (user: TUser) => {
  const res = await fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  return checkResponse(res)
}

const getUserData = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', authorization: token }
  })
  return checkResponse(res)
}

const patchUserData = async (user: TUser, token: string) => {
  const res = await fetch(`${API_URL}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', authorization: token },
    body: JSON.stringify(user)
  })
  return checkResponse(res)
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
  return checkResponse(res)
}

async function getRequestBody(res: Response) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

async function checkResponse(res: Response) {
  const obj = await getRequestBody(res)
  if (!res.ok) {
    throw new Error(obj.message)
  }
  if (obj.accessToken) localStorage.setItem('accessToken', obj.accessToken)
  return obj
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
