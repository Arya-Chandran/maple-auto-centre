import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  inventoryListReducer,
  inventoryDetailsReducer,
} from './reducers/inventoryReducers'

const reducer = combineReducers({
  inventoryList: inventoryListReducer,
  inventoryDetails: inventoryDetailsReducer,
})
const initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
