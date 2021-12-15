import  { getIngredientsData, getOrderData } from '../../utils/getData';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const CHANGE_INGREDIENTS_ORDER = 'CHANGE_INGREDIENTS_ORDER';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

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
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                })
            })
    }
}

export function getOrder(orderList) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderData(orderList).then((res) => {
            if (res) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res
                })
            } else {
                dispatch({
                    type: GET_ORDER_ERROR,
                })
            }
        })
            .catch((e) => {
                console.log(e)
                dispatch({
                    type: GET_ORDER_ERROR,
                })
            })
    }
}
