import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SET_IS_AUTH,
  RESET_IS_AUTH,
  SET_USER,
  RESET_USER,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
  GET_USER_REQUEST,
  GET_USER_REQUEST_SUCCESS,
  GET_USER_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST, TUserActions
} from '../actions/user-actions'
import {TUser} from "../../types/data-types";

export type TUserState = {
  registerUserRequest: boolean,
  registerUserRequestFailed: boolean,
  registerUserSuccess: boolean,
  loginRequest: boolean,
  loginRequestFailed: boolean,
  loginUserSuccess: boolean,
  user: TUser,
  token: string,
  forgotPasswordSuccess: boolean,
  forgotPasswordRequest: boolean,
  forgotPasswordRequestFailed: boolean,
  resetPasswordSuccess: boolean,
  resetPasswordRequest: boolean,
  resetPasswordRequestFailed: boolean,
  isAuth: boolean,
  getUserRequest: boolean,
  getUserRequestFailed: boolean,
  isUserLoaded: boolean,
  refreshToken: string | undefined,
  accessToken: string | undefined
};

export const initialState: TUserState = {
  registerUserRequest: false,
  registerUserRequestFailed: false,
  registerUserSuccess: false,
  loginUserSuccess: false,
  user: { email: '', name: '' },
  token: '',
  forgotPasswordSuccess: false,
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: true,
  resetPasswordSuccess: false,
  resetPasswordRequest: false,
  resetPasswordRequestFailed: true,
  isAuth: false,
  loginRequest: false,
  loginRequestFailed: false,
  getUserRequest: false,
  getUserRequestFailed: false,
  isUserLoaded: false,
  refreshToken: undefined,
  accessToken: undefined
}

export const userReducer = (state: TUserState = initialState, action: TUserActions): TUserState  => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return { ...state,
        registerUserRequest: true }
    }
    case REGISTER_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        registerUserSuccess: true,
        registerUserRequest: false,
        registerUserRequestFailed: false
      }
    }
    case REGISTER_USER_REQUEST_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserRequestFailed: true,
        registerUserSuccess: false
      }
    }
    case SET_IS_AUTH: {
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        isAuth: true
      }
    }

    case RESET_IS_AUTH: {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return {
        ...state,
        isAuth: false
      }
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginUserSuccess: false,
        loginRequestFailed: false
      }
    }

    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: false,
        loginUserSuccess: true
      }
    }

    case LOGIN_REQUEST_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
        loginUserSuccess: false
      }
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        loginUserSuccess: false
      }
    }

    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        loginUserSuccess: false
      }
    }

    case SET_USER: {
      return {
        ...state,
        ...action.user
      }
    }

    case RESET_USER: {
      return {
        ...state,
        user: { email: '', name: '' }
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      }
    }

    case GET_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserRequestFailed: false
      }
    }

    case GET_USER_REQUEST_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserRequestFailed: true
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      }
    }

    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
        forgotPasswordSuccess: true
      }
    }

    case FORGOT_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }

    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        resetPasswordSuccess: true
      }
    }

    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true
      }
    }

    default:
      return state
  }
}
