import {
  QUANTITY_PRODUCT,
  SELECT_CUSTOMER,
  SELECT_PRODUCT,
  SET_TOTAL
} from '../../types/orderTypes';

export default (state, action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload
      };
    case QUANTITY_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.product.id === action.payload.product.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        )
      };
    case SET_TOTAL:
      return {
        ...state,
        total: state.products.reduce(
          (sum, product) => (sum += product.product.price * product.quantity),
          0
        )
      };
    default:
      return state;
  }
};
