import { AppDispatch, RootState } from '../types/data-types'
import { TWsActions } from './actions/ws-actions'
import { Middleware, MiddlewareAPI } from 'redux'
import { TWsActionsType } from '../types/data-types'

export const socketMiddleware = (wsUrl: string, wsActions: TWsActionsType): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => (action: TWsActions) => {
      const { dispatch } = store
      const { type } = action
      const { wsInit, wsPrivatInit, wsClose, onOpen, onMessage } = wsActions

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`)
      }
      if (type === wsPrivatInit) {
        const token = localStorage.getItem('accessToken')
        if (token) socket = new WebSocket(`${wsUrl}?token=${token!.split(' ')[1]}`)
      }

      if (socket) {
        if (type === wsClose) socket.close(1000, 'Closed by user')

        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data)
          dispatch({ type: onMessage, payload: data })
        }

        socket.onclose = (event: Event) => {
          console.log('WS connection closed')
        }
      }
      next(action)
    }
  }) as Middleware
}
