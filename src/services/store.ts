import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { socketMiddleware } from './socket-middleware'
import { WS_API_URL } from '../constants'
import { TWsActionsType } from '../types/data-types'
import { WS_CONNECTION_CLOSE, WS_START, WS_PRIVAT_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './actions/ws-actions'
import { compose } from 'redux'

const wsActions: TWsActionsType = {
  wsInit: WS_START,
  wsPrivatInit: WS_PRIVAT_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onMessage: WS_GET_MESSAGE
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(`${WS_API_URL}/orders`, wsActions)))

export const store = createStore(rootReducer, enhancer)
