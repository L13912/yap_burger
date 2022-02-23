import {wsReducer, initialState} from './ws-reducers';
import * as types from '../actions/ws-actions';

describe('Websocket reducer', () => {
    it('should return the initial state', () => {
        expect(
            wsReducer(undefined, {} as any)
        ).toEqual(initialState)
    })

    it('should handle WS_START', () => {
        expect(
            wsReducer(
                {
                    ...initialState,
                    wsConnected: false,
                },
                {
                    type: types.WS_START,
                    payload: ''
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
        })
    })

    it('should handle WS_CONNECTION_CLOSE', () => {
        expect(
            wsReducer(
                {
                    ...initialState,
                    wsConnected: true,
                },
                {
                    type: types.WS_CONNECTION_CLOSE,
                    payload: ''
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: false,
        })
    })

    it('should handle WS_GET_MESSAGE', () => {
        const obj = wsReducer(
            {
                ...initialState
            },
            {
                type: types.WS_GET_MESSAGE,
                payload: {
                    orders: [{
                        _id: '#10535',
                        ingredients: [],
                        status: 'done',
                        createdAt: 'Сегодня, в 11:58 i-GMT+3',
                        name: 'Флюоресцентный space бургер',
                        number: 123456,
                        updatedAt: 'Сегодня, в 11:59 i-GMT+3'
                    }],
                    total: 1000,
                    totalToday: 50,
                }
            }
        )
        expect(obj).toEqual({
            ...initialState,
            orders: [{
                _id: '#10535',
                ingredients: [],
                status: 'done',
                createdAt: 'Сегодня, в 11:58 i-GMT+3',
                name: 'Флюоресцентный space бургер',
                number: 123456,
                updatedAt: 'Сегодня, в 11:59 i-GMT+3'
            }],
            total: 1000,
            totalToday: 50,
        })
    })
})
