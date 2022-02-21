import { reducer, initialState, TState } from './reducers';
import * as types from '../actions/actions';
import { TCard  } from '../../types/data-types';

const ingredientMock: any = [{
    "_id": "id",
    "name": "name",
    "type": "type",
    "proteins": 0,
    "fat": 0,
    "carbohydrates": 0,
    "calories": 0,
    "price": 0,
    "image": "image",
    "image_mobile": "image_mobile",
    "image_large": "image_large",
    "__v": 0,
}];

const orderMock: any = {
    name: "Краторный space бургер",
    order: {
        createdAt: "2022-02-21T10:38:04.886Z",
        ingredients: [ ingredientMock, ingredientMock
        ],
        number: 10658,
        owner: {name: 'test', email: 'test@test.ru', createdAt: '2021-12-26T16:50:58.103Z', updatedAt: '2022-02-12T16:23:46.076Z'},
        price: 1335,
        status: "done",
        updatedAt: "2022-02-21T10:38:05.167Z",
        _id: "62136b8c25b9a4001b6e087f",
    },
    success: true
}


describe('Main reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined,{} as any)
        ).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    ingredientsRequest: false,
                },
                {
                    type: types.GET_INGREDIENTS_REQUEST,
                }
            )
        ).toEqual({
            ...initialState,
            ingredientsRequest: true,
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const obj =             reducer(
            {
                ...initialState,
                ingredientsFailed: false,
                ingredientsRequest: false
            },
            {
                type: types.GET_INGREDIENTS_SUCCESS,
                ingredients: {data: ingredientMock}
            }
        );
        console.log(obj)
        expect(obj).toEqual({
            ...initialState,
            ingredientsFailed: false,
            ingredientsRequest: false,
            ingredients: ingredientMock
        })
    })

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    ingredientsRequest: true,
                    ingredientsFailed: false,
                },
                {
                    type: types.GET_INGREDIENTS_ERROR
                }
            )
        ).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsError: true
        })
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    orderRequest: false,
                },
                {
                    type: types.GET_ORDER_REQUEST
                }
            )
        ).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    orderRequest: false,
                    orderFailed: false,
                    order: {},
                },
                {
                    type: types.GET_ORDER_SUCCESS,
                    order: orderMock,
                }
            )
        ).toEqual({
            ...initialState,
            orderFailed: false,
            orderRequest: false,
            order: orderMock
        })
    })

    it('should handle GET_ORDER_ERROR', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    orderError: false,
                },
                {
                    type: types.GET_ORDER_ERROR,
                }
            )
        ).toEqual({
            ...initialState,
            orderError: true,
        })
    })

    it('should handle CLEAR_ORDER', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    orderRequest: false,
                    orderFailed: false,
                    order: orderMock,
                },
                {
                    type: types.CLEAR_ORDER
                }
            )
        ).toEqual({
            ...initialState,
            orderFailed: false,
            orderRequest: false,
            order: {}
        })
    })
})
