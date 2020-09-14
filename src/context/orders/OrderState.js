import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import {
  SELECT_CUSTOMER,
  SELECT_PRODUCT,
  QUANTITY_PRODUCT,
  SET_TOTAL
} from '../../types/orderTypes';

const OrderState = ({ children }) => {
  // Orders state
  const initialState = {
    customer: {},
    products: [],
    total: 0
  };
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Modify Customer
  const addCustomer = (customer) => {
    dispatch({
      type: SELECT_CUSTOMER,
      payload: customer
    });
  };

  // Modify Products
  const addProducts = (selectedProducts) => {
    let newStateProducts;
    if (state.products.length > 0) {
      // Code to avoid the elimination of quantity param in product object
      // because of react-select
      // Take from the second array a copy to assign the quantity
      // to the first one
      newStateProducts = selectedProducts.map((product) => {
        const orderProduct = state.products.find(
          (productState) => productState.id === product.id
        );
        return {
          ...product,
          ...orderProduct
        };
      });
    } else {
      newStateProducts = selectedProducts;
    }
    dispatch({
      type: SELECT_PRODUCT,
      payload: newStateProducts
    });
  };

  // Modify products quantity
  const quantityProducts = (newProduct) => {
    dispatch({
      type: QUANTITY_PRODUCT,
      payload: newProduct
    });
  };

  // Total price of products
  const setTotal = () => {
    dispatch({
      type: SET_TOTAL
    });
  };

  return (
    <OrderContext.Provider
      value={{
        customer: state.customer,
        products: state.products,
        total: state.total,
        addCustomer,
        addProducts,
        quantityProducts,
        setTotal
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
