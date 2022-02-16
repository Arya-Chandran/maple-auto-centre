import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_FAIL,
  INVENTORY_DETAILS_REQUEST,
  INVENTORY_DETAILS_SUCCESS,
  INVENTORY_DETAILS_FAIL,
} from '../constants/inventoryConstants'

export const inventoryListReducer = (state = { inventory: [] }, action) => {
  switch (action.type) {
    case INVENTORY_LIST_REQUEST:
      return { inventory: [] }
    case INVENTORY_LIST_SUCCESS:
      return { inventory: action.payload }
    case INVENTORY_LIST_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const inventoryDetailsReducer = (state = { vehicle: {} }, action) => {
  switch (action.type) {
    case INVENTORY_DETAILS_REQUEST:
      return { ...state }
    case INVENTORY_DETAILS_SUCCESS:
      return { vehicle: action.payload }
    case INVENTORY_DETAILS_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
