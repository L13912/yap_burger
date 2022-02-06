import { register, login, forgotRequest, logout, getAccessToken, getUserData, patchUserData, resetRequest } from '../../utils/getData'
import {TUser, TToken, AppDispatch} from "../../types/data-types";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_REQUEST_SUCCESS = 'REGISTER_USER_REQUEST_SUCCESS'
export const REGISTER_USER_REQUEST_FAILED = 'REGISTER_USER_REQUEST_FAILED'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED'

export const SET_IS_AUTH = 'SET_IS_AUTH'
export const RESET_IS_AUTH = 'RESET_IS_AUTH'
export const SET_USER = 'SET_USER'
export const RESET_USER = 'RESET_USER'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS'
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS'
export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS'
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS'
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED'

export type TUserActions =
    IRegisterUserRequest |
    IRegisterUserRequestSuccess |
    IRegisterUserRequestFailed  |
    ILoginUserRequest |
    ILoginUserRequestSuccess |
    ILoginUserRequestFailed |
    ISetIsAuth |
    IResetIsAuth |
    ISetUser |
    IResetUser |
    IGetUserRequest |
    IGetUserRequestSuccess |
    IGetUserRequestFailed |
    IForgotPasswordRequest |
    IForgotPasswordSuccess |
    IForgotPasswordFailed |
    IResetPasswordRequest |
    IResetPasswordSuccess |
    IResetPasswordFailed |
    ILogoutRequest |
    ILogoutSuccess |
    ILogoutFailed;


export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserRequestSuccess {
  readonly type: typeof REGISTER_USER_REQUEST_SUCCESS;
}

export interface IRegisterUserRequestFailed {
  readonly type: typeof REGISTER_USER_REQUEST_FAILED;
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginUserRequestSuccess {
  readonly type: typeof LOGIN_REQUEST_SUCCESS;
}

export interface ILoginUserRequestFailed {
  readonly type: typeof LOGIN_REQUEST_FAILED;
}

export interface ISetIsAuth {
  readonly type: typeof SET_IS_AUTH;
  readonly refreshToken: string;
  readonly accessToken?: string;
}

export interface IResetIsAuth {
  readonly type: typeof RESET_IS_AUTH;
}

export interface ISetUser {
  readonly type: typeof SET_USER;
  readonly user: TUser;
}

export interface IResetUser {
  readonly type: typeof RESET_USER;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserRequestSuccess {
  readonly type: typeof GET_USER_REQUEST_SUCCESS;
}

export interface IGetUserRequestFailed {
  readonly type: typeof GET_USER_REQUEST_FAILED;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
}

export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_REQUEST_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export function registerUser(user: TUser) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTER_USER_REQUEST })
    register(user)
      .then(res => {
        if (res) {
          dispatch({ type: REGISTER_USER_REQUEST_SUCCESS })
        } else {
          dispatch({ type: REGISTER_USER_REQUEST_FAILED })
        }
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: REGISTER_USER_REQUEST_FAILED })
      })
  }
}

export function loginUser(user: TUser) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST })
    login(user)
      .then(res => {
        if (res) {
          dispatch({ type: LOGIN_REQUEST_SUCCESS })
          dispatch({ type: SET_IS_AUTH, refreshToken: res.refreshToken })
          dispatch({ type: SET_USER, user: res.user })
        } else {
          dispatch({ type: LOGIN_REQUEST_FAILED })
        }
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: LOGIN_REQUEST_FAILED })
      })
  }
}

export function patchUser(user: TUser) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch({ type: GET_USER_REQUEST })
      const token: TToken = await getAccessToken()
      const res = await patchUserData(user, token.accessToken)
      dispatch({ type: GET_USER_REQUEST_SUCCESS })
      dispatch({ type: SET_USER, user: res })
    } catch (e) {
      dispatch({ type: GET_USER_REQUEST_FAILED })
      console.log(e)
    }
  }
}

export function getUser() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch({ type: GET_USER_REQUEST })
      const token: TToken = await getAccessToken()
      const res = await getUserData(token.accessToken)
      dispatch({ type: GET_USER_REQUEST_SUCCESS })
      dispatch({ type: SET_USER, user: res })
      dispatch({ type: SET_IS_AUTH, refreshToken: token.refreshToken })
    } catch (e) {
      dispatch({ type: GET_USER_REQUEST_FAILED })
      dispatch({ type: RESET_IS_AUTH })
    }
  }
}

export function forgotPassword(user: TUser) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })
    forgotRequest(user)
      .then(res => {
        if (res) {
          dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS })
        } else {
          dispatch({ type: FORGOT_PASSWORD_REQUEST_FAILED })
        }
      })
      .catch(e => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST_FAILED })
      })
  }
}

export function resetPassword(user: TUser) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    resetRequest(user)
      .then(res => {
        if (res) {
          dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS })
        } else {
          dispatch({ type: RESET_PASSWORD_REQUEST_FAILED })
        }
      })
      .catch(e => {
        dispatch({ type: RESET_PASSWORD_REQUEST_FAILED })
      })
  }
}

export function logoutUser(user: TUser) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST })
    dispatch({ type: RESET_USER })
    dispatch({ type: RESET_IS_AUTH })
    logout(user)
      .then(res => {
        if (res) {
          dispatch({ type: LOGOUT_REQUEST_SUCCESS })
        } else {
          dispatch({ type: LOGOUT_REQUEST_FAILED })
        }
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: LOGOUT_REQUEST_FAILED })
      })
  }
}
