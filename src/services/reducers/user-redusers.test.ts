import {userReducer, initialState} from "./user-reducers";
import * as types from '../actions/user-actions';

describe('User reducer test', () => {

    it('should return the initial state', () => {
        expect(userReducer(initialState, {} as any)).toEqual(initialState);
    });

    it('should handle REGISTER_USER_REQUEST', () => {
        expect(
            userReducer(
                {
                    ...initialState,
                    registerUserRequest: false,
                },
                {
                    type: types.REGISTER_USER_REQUEST
                }
            )
        ).toEqual({
            ...initialState,
            registerUserRequest: true,
        })
    })

    it('should handle REGISTER_USER_REQUEST_SUCCESS', () => {
        expect(
            userReducer({
                ...initialState,
                registerUserRequest: true,
                registerUserSuccess: false,
                registerUserRequestFailed: true,
            },
                {
                type: types.REGISTER_USER_REQUEST_SUCCESS
            })
        ).toEqual({
            ...initialState,
            registerUserRequest: false,
            registerUserSuccess: true,
            registerUserRequestFailed: false,
        })
    })

    it('should handle REGISTER_USER_REQUEST_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                registerUserRequest: true,
                registerUserRequestFailed: false,
            },
                {
                    type: types.REGISTER_USER_REQUEST_FAILED
                })
        ).toEqual({
            ...initialState,
            registerUserRequest: false,
            registerUserRequestFailed: true,
        })
    })

    it('should handle SET_IS_AUTH', () => {

        expect(
            userReducer(
                {
                ...initialState,
                    isAuth: false
            },
                // @ts-ignore
                {

                    type: types.SET_IS_AUTH
                })
        ).toEqual(
            {
                ...initialState,
                isAuth: true
            }
        )
    })

    it('should handle RESET_IS_AUTH', () => {
        expect(
            userReducer({
                ...initialState,
                isAuth: true
            },{
                type: types.RESET_IS_AUTH
            })
        ).toEqual(
            {
                ...initialState,
                isAuth: false,
                accessToken: undefined,
            }
        )
    })

    it('should handle LOGIN_REQUEST', () => {
        expect(
            userReducer(
                {
                    ...initialState,
                    loginRequest: false,
                },
                {
                    type: types.LOGIN_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                loginRequest: true,
            }
        )
    })

    it('should handle LOGIN_REQUEST_SUCCESS', () => {
        expect(
            userReducer(
                {
                    ...initialState,
                    loginRequest: true,
                    loginRequestFailed: true,
                    loginUserSuccess: false,
                },
                {
                    type: types.LOGIN_REQUEST_SUCCESS
                }
            )
        ).toEqual(
            {
                ...initialState,
                loginRequest: false,
                loginRequestFailed: false,
                loginUserSuccess: true
            }
        )
    })

    it('should handle LOGIN_REQUEST_FAILED', () => {
        expect(
            userReducer(
                {
                    ...initialState,
                    loginRequest: true,
                    loginRequestFailed: false,
                    loginUserSuccess: false,
                },
                {
                    type: types.LOGIN_REQUEST_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                loginRequest: false,
                loginRequestFailed: true,
                loginUserSuccess: false,
            }
        )
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(
            userReducer(
                {
                    ...initialState,
                    loginUserSuccess: true
                },
                {
                    type: types.LOGOUT_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                loginUserSuccess: false
            }
        )
    })

    it('should handle LOGOUT_REQUEST_SUCCESS', () => {
        expect(
            userReducer(
                {
                    ...initialState,
                    loginUserSuccess: true
                },
                {
                    type: types.LOGOUT_REQUEST_SUCCESS
                }
            )
        ).toEqual(
            {
                ...initialState,
                loginUserSuccess: false
            }
        )
    })
})


