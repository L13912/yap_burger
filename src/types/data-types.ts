import { ReactNode } from 'react'
import { store } from '../services/store'
import { ThunkAction } from 'redux-thunk'
import { Action, ActionCreator } from 'redux'
import { Dispatch } from 'redux'
import { TUserActions } from '../services/actions/user-actions'
import { TActions } from '../services/actions/actions'

export type RootState = ReturnType<typeof store.getState>
export type TApplicationActions = TUserActions | TActions

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
