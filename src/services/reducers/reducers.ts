import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CHANGE_INGREDIENTS_ORDER,
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  CLEAR_ORDER, TActions
} from '../actions/actions'
import update from 'immutability-helper'
import {TCard, TIngredientDetails} from "../../types/data-types";

type TOrderDetails = {
  name?: string,
  order?: { number: number }
}

export type TState = {
  ingredients: Array<TCard> | null,
  ingredientsRequest: boolean,
  ingredientsError: boolean,
  order: TOrderDetails,
  orderRequest: boolean,
  orderError: boolean,
  constructorIngredients: { buns: Array<TCard>, toppings: Array<TCard> },
  ingredientDetails: TIngredientDetails,
  ingredientsFailed: boolean,
  orderFailed: boolean
};

export const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
  order: {},
  orderRequest: false,
  orderError: false,
  constructorIngredients: { buns: [], toppings: [] },
  ingredientDetails: {},
  ingredientsFailed: false,
  orderFailed: false
}

export const reducer = (state: TState = initialState, action: TActions): TState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.ingredients.data
      }
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ...initialState,
        ingredientsError: true
      }
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        order: action.order
      }
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        ...initialState,
        orderError: true
      }
    }

    case CLEAR_ORDER: {
      return {
        ...state,
        order: {}
      }
    }

    case ADD_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients:
          action.card.type === 'bun'
            ? {
                buns: [action.card],
                toppings: [...state.constructorIngredients.toppings]
              }
            : {
                buns: [...state.constructorIngredients.buns],
                toppings: [...state.constructorIngredients.toppings, action.card]
              }
      }
    }

    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: {
          buns: [...state.constructorIngredients.buns],
          toppings: [...state.constructorIngredients.toppings.filter((card, guid) => card.guid !== action.guid)]
        }
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: { buns: [], toppings: [] }
      }
    }

    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.card
      }
    }

    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: {}
      }
    }
    case CHANGE_INGREDIENTS_ORDER: {
      const movedElement = update(state.constructorIngredients.toppings, { $splice: [[action.dragIndex, 1]] })
      const newOrderArr = update(movedElement, {
        $splice: [[action.hoverIndex, 0, state.constructorIngredients.toppings[action.dragIndex]]]
      })

      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          toppings: newOrderArr
        }
      }
    }

    default: {
      return state
    }
  }
}
