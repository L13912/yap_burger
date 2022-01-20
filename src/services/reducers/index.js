import { combineReducers } from 'redux'
import { reducer } from './reducers'
import { userReducer } from './user-reducers'

export const rootReducer = combineReducers({
  reducer: reducer,
  userReducer: userReducer
})
