import {PropsWithChildren, ReactNode} from 'react'
import { store } from '../services/store'
import { ThunkAction } from 'redux-thunk'
import { Action, ActionCreator } from 'redux'
import { Dispatch } from 'redux'
import { TUserActions } from '../services/actions/user-actions'
import { TActions } from '../services/actions/actions'
import {
  WS_START,
  WS_PRIVAT_START,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  TWsActions
} from '../services/actions/ws-actions'

export type RootState = ReturnType<typeof store.getState>
export type TApplicationActions = TUserActions | TActions | TWsActions

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>
export type AppDispatch = Dispatch<TApplicationActions>

export type TCard = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  guid?: string
}

export type TIngredients = Array<TCard>

export type TConstructorIngredients = {
  buns: ReadonlyArray<TCard>
  toppings: ReadonlyArray<TCard>
}

export type TConstCard = {
  card: TCard
  moveCard?: (dragIndex: number, index: number) => void
  type: string
  index: number
}

export type TIngredientCard = {
  card: TCard
}
export type TIngredientDetails = {
  card?: TCard | undefined
}

export type TModal = {
  children?: ReactNode
  close: () => void
  title?: string
}

export type TModalOverlay = Omit<TModal, 'title'>

export type TProtectedRoute = {
  children: ReactNode
  rest?: string
  path: string
}

export type TUser = {
  readonly id?: number
  readonly password?: string
  readonly login?: string
  readonly email?: string
  readonly name?: string
}

export type THistory = {
  replace: (path: string) => void
  location: {
    state: {
      from: string
    }
  }
}

export type TToken = {
  readonly accessToken: string
  readonly refreshToken: string
}

export type TOrder = {
  readonly _id?: string
  readonly ingredients?: Array<string>
  readonly status: string
  readonly createdAt: string | number | Date
  readonly name?: string
  readonly number?: number
  readonly updatedAt?: string
}

export type TWSMessage = {
  readonly orders: Array<TOrder>
  readonly success: boolean
  readonly total: number
  readonly totalToday: number
}

export type TOrders = Array<TOrder>

export type TStatus = {
  readonly orderStatus: string
}

export type TWsActionsType = {
  readonly wsInit: typeof WS_START
  readonly wsPrivatInit: typeof WS_PRIVAT_START
  readonly wsClose: typeof WS_CONNECTION_CLOSE
  readonly onOpen: typeof WS_CONNECTION_SUCCESS
  readonly onMessage: typeof WS_GET_MESSAGE
}

export type TFeedOrder = {
  readonly createdAt: string
  readonly ingredients: any[] | string[]
  readonly name: string
  readonly number: number
  readonly status: string
  readonly updatedAt: string
  readonly _id: string
}
