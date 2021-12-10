import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,

    ADD_CONSTRUCTOR_INGREDIENT,
    DELETE_CONSTRUCTOR_INGREDIENT,

    SET_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,

    GET_ORDER_DETAILS,
    UPDATE_ORDER_DETAILS
} from '../actions/actions';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
    constructorIngredients: {buns: [], toppings: []},
    ingredientDetails: {},
    orderDetails: {}
}

export const reducer = (state = initialState, action) => {
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

        case  ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: action.card.type === 'bun' ?  {
                        buns: [action.card],
                        toppings:[...state.constructorIngredients.toppings]
                    }
                    :  {
                        buns: [...state.constructorIngredients.buns],
                        toppings:[...state.constructorIngredients.toppings, action.card]
                    }
            }
        }

        case DELETE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: {
                    buns: [...state.constructorIngredients.buns],
                    toppings:[...state.constructorIngredients.toppings.filter((card, guid) => card.guid  !== action.guid ) ]
                }
            }
        }

        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: action.card,
            }
        }

        case DELETE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: {}
            }
        }

        default: {
            return state;
        }
    }
}
