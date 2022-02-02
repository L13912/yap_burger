import { getIngredientsData, getOrderData } from '../../utils/getData';
import {TIngredients} from "../../types/data-types";
import { AppDispatch} from "../../utils";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT: 'DELETE_CONSTRUCTOR_INGREDIENT' = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';
export const CHANGE_INGREDIENTS_ORDER: 'CHANGE_INGREDIENTS_ORDER' = 'CHANGE_INGREDIENTS_ORDER';

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

export type TUserActions =
    IGetIngredientsRequest |
    IGetIngredientsSuccess |
    IGetIngredientsFailed |
    IGetOrderRequest |
    IGetOrderSuccess |
    IGetOrderFailed;

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_ERROR;
}

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    getIngredientsData()
      .then(res => {
        if (res) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_ERROR
          })
        }
      })
      .catch(e => {
        console.log(e)
        dispatch({
          type: GET_INGREDIENTS_ERROR
        })
      })
  }
}

export function getOrder(orderList: TIngredients) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    getOrderData(orderList)
      .then(res => {
        if (res) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res
          })
        } else {
          dispatch({
            type: GET_ORDER_ERROR
          })
        }
      })
      .catch(e => {
        console.log(e)
        dispatch({
          type: GET_ORDER_ERROR
        })
      })
  }
}
