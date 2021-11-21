const INGREDIENTS_URL  = 'https://norma.nomoreparties.space/api/ingredients';

async function getIngredients() {
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
