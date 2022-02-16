import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_FAIL,
  INVENTORY_DETAILS_REQUEST,
  INVENTORY_DETAILS_SUCCESS,
  INVENTORY_DETAILS_FAIL,
} from '../constants/inventoryConstants'
import axios from 'axios'

const host = 'http://localhost:8080'

export const listInventories = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_LIST_REQUEST })
    const { data } = await axios.get(`${host}/inventory`)

    dispatch({ type: INVENTORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVENTORY_LIST_FAIL,
      payload: error.response,
    })
  }
}

export const listInventoryDetails = (vin) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_DETAILS_REQUEST })
    const { data } = await axios.get(`${host}/inventory/${vin}`)

    dispatch({ type: INVENTORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INVENTORY_DETAILS_FAIL,
      payload: error.response,
    })
  }
}
