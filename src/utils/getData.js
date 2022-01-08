import { API_URL } from '../constants';

const getIngredientsData = async() => {
    const res = await fetch(`${API_URL}/ingredients`);
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const getOrderData = async(orderList) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ingredients: orderList
        })
    })
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const register = async(user) => {
    console.log(user);
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST", mode: 'cors', headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
    })
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const login = async(user) => {
    console.log(user);
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST", mode: 'cors', headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
    })
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const logout = async(user) => {
    const token = localStorage.getItem('refreshToken');
    const res = await fetch(`${API_URL}/auth/logout`,
        {method: 'POST', mode: 'cors', headers: {"Content-Type": "application/json"}, body: JSON.stringify({token})});
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const forgotRequest = async(user) => {
    const res = await fetch(`${API_URL}/password-reset`, {
        method: "POST", mode: 'cors', headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
    })
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const resetRequest = async(user) => {
    const res = await fetch(`${API_URL}/password-reset/reset`, {
        method: "POST", mode: 'cors', headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
    })
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const getUserData = async(token) => {
    const res = await fetch(`${API_URL}/auth/user`,
        {method: 'GET', mode: 'cors',
            headers: {"Content-Type": "application/json", "authorization": token}});
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const patchUserData = async(user, token) => {
    const res = await fetch(`${API_URL}/auth/user`,
        {method: 'PATCH', mode: 'cors', headers: {"Content-Type": "application/json", "authorization": token},
        body: JSON.stringify(user)});
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const getAccessToken = async() => {
    const token = localStorage.getItem('refreshToken');
    if (!token) throw new Error('Авторизуйтесь');
    const res = await fetch(`${API_URL}/auth/token`,
        { method: 'POST', mode: 'cors', headers: {"Content-Type": "application/json"}, body: JSON.stringify({token}) });
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

async function getRequestBody(res) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
}

export  {
    getIngredientsData, getOrderData, register, login, forgotRequest,
    getUserData, logout, getAccessToken, patchUserData, resetRequest
}
