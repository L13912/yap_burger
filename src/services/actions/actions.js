import getIngredientsData from '../../utils/getIngredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';

export const GET_ORDER_DETAILS = 'GET_ORDER_NUMBER';
export const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_NUMBER';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientsData().then((res) => {
                if (res) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_ERROR,
                    })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
