import {userReducer, initialState} from "./user-reducers";
import * as types from "../actions/user-actions";


describe('User reducer test', () => {
    it('should return the initinal state', () => {
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
})

