const INGREDIENTS_URL  = 'https://norma.nomoreparties.space/api/ingredients';

async function getIngredients() {
    /*Пока лежит сервер, использую этот метод для подачи данных из мока data.js
    * Переопределяю на входе INGREDIENTS_URL */
    if (typeof INGREDIENTS_URL != 'string')
    {
        return JSON.parse(INGREDIENTS_URL);
    }
    const res = await fetch(INGREDIENTS_URL);
    const obj = await getRequestBody(res);
    if (res.status >= 400) {
        console.log(obj);
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

export default getIngredients;
