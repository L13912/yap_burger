import { INGREDIENTS_URL } from '../constants'

const getIngredientsData = async() => {
    const res = await fetch(`${INGREDIENTS_URL}/ingredients`);
    const obj = await getRequestBody(res);
    if (!res.ok) {
        throw new Error(obj.message);
    }
    return obj;
}

const getOrderData = async(orderList) => {
    const res = await fetch(`${INGREDIENTS_URL}/orders`, {
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

async function getRequestBody(res) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
}

export  {
    getIngredientsData, getOrderData
}
