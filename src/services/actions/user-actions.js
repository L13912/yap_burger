import {register, login, forgotRequest, logout, getAccessToken, getUserData, patchUserData, resetRequest}
    from '../../utils/getData';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_REQUEST_SUCCESS = 'REGISTER_USER_REQUEST_SUCCESS';
export const REGISTER_USER_REQUEST_FAILED = 'REGISTER_USER_REQUEST_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const SET_IS_AUTH = "SET_IS_AUTH";
export const RESET_IS_AUTH = "RESET_IS_AUTH";
export const SET_USER = "SET_USER";
export const RESET_USER = 'RESET_USER';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED';

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_REQUEST_SUCCESS = "GET_USER_REQUEST_SUCCESS";
export const GET_USER_REQUEST_FAILED = "GET_USER_REQUEST_FAILED";

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

export function registerUser(user) {
    return function (dispatch) {
        dispatch({type: REGISTER_USER_REQUEST});
        register(user).then((res) => {
            if (res) {
                dispatch({type: REGISTER_USER_REQUEST_SUCCESS});
            } else {
                dispatch({type: REGISTER_USER_REQUEST_FAILED})
            }
        })
            .catch((e) => {
                console.log(e)
                dispatch({type: REGISTER_USER_REQUEST_FAILED})
            })
    }
}

export function loginUser(user) {
    return async function (dispatch) {
        dispatch({type: LOGIN_REQUEST});
        login(user).then((res) => {
            if (res) {
                dispatch({type: LOGIN_REQUEST_SUCCESS});
                dispatch({type: SET_IS_AUTH, refreshToken: res.refreshToken});
                dispatch({type: SET_USER, user: res.user});
            } else {
                dispatch({type: LOGIN_REQUEST_FAILED})
            }
        })
            .catch((e) => {
                console.log(e)
                dispatch({type: LOGIN_REQUEST_FAILED})
            })
    }
}

export function patchUser(user) {
    return async function (dispatch) {
        try {
            dispatch({type: GET_USER_REQUEST});
            const token = await getAccessToken();
            const res = await patchUserData(user, token.accessToken);
            dispatch({type: GET_USER_REQUEST_SUCCESS});
            dispatch({type: SET_USER, user: res});
        } catch (e) {
            dispatch({type: GET_USER_REQUEST_FAILED});
            console.log(e);
        }
    }
}

export function getUser() {
    return async function (dispatch) {
        try {
            dispatch({type: GET_USER_REQUEST});
            const token = await getAccessToken();
            const res = await getUserData(token.accessToken);
            dispatch({type: GET_USER_REQUEST_SUCCESS});
            dispatch({type: SET_USER, user: res});
            dispatch({type: SET_IS_AUTH, refreshToken: token.refreshToken});
        } catch (e) {
            dispatch({type: GET_USER_REQUEST_FAILED});
            dispatch({type: RESET_IS_AUTH});
        }
    }
}

export function forgotPassword(user) {
    return async function(dispatch) {
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        forgotRequest(user).then((res) => {
            if (res) {
                dispatch({type: FORGOT_PASSWORD_REQUEST_SUCCESS});
            } else {
                dispatch({type: FORGOT_PASSWORD_REQUEST_FAILED});
            }
        })
        .catch((e) => {
            dispatch({type: FORGOT_PASSWORD_REQUEST_FAILED});
        })
    }
}

export function resetPassword(user) {
    return async function(dispatch) {
        dispatch({type: RESET_PASSWORD_REQUEST});
        resetRequest(user).then((res) => {
            if (res) {
                dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS});
            } else {
                dispatch({type: RESET_PASSWORD_REQUEST_FAILED});
            }
        })
            .catch((e) => {
                dispatch({type: RESET_PASSWORD_REQUEST_FAILED});
            })
    }
}

export function logoutUser(user) {
    return async function (dispatch) {
        dispatch({type: LOGOUT_REQUEST});
        dispatch({type: RESET_USER});
        dispatch({type: RESET_IS_AUTH});
        logout(user).then((res) => {
            if (res) {
                dispatch({type: LOGOUT_REQUEST_SUCCESS});
            } else {
                dispatch({type: LOGOUT_REQUEST_FAILED});
            }
        })
            .catch((e) => {
                console.log(e);
                dispatch({type: LOGOUT_REQUEST_FAILED});
            })
    }
}
