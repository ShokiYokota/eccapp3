import { initialState } from '../store/initialState';
import { ProductsState, ProductsAction, FETCH_PRODUCTS,DELETE_PRODUCTS } from './types';



export const ProductsReducer = (
  state: ProductsState = initialState.products,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      }
    case DELETE_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state
  }
}