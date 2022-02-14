import { combineReducers } from 'redux'
import { reducer } from './reducers'
import { userReducer } from './user-reducers'
import { wsReducer } from './ws-redusers'

export const rootReducer = combineReducers({
  reducer: reducer,
  userReducer: userReducer,
  wsReduser: wsReducer
})
