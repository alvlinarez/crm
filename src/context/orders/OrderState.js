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
    // let newStateProducts = selectedProducts.map((product) => {
    //   return {
    //     product,
    //     quantity: 0
    //   };
    // });

    let newStateProducts;
    if (state.products.length > 0) {
      // Code to avoid the elimination of quantity param in product object
      // because of react-select
      // Take from the second array a copy to assign the quantity
      // to the first one
      newStateProducts = selectedProducts.map((product) => {
        const orderProduct = state.products.find(
          (productState) => productState.product.id === product.id
        );
        return { product: { ...product, ...orderProduct }, quantity: 0 };
      });
    } else {
      //newStateProducts = selectedProducts;
      newStateProducts = selectedProducts.map((product) => {
        return {
          product,
          quantity: 0
        };
      });
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newStateProducts
    });
  };

  // Modify products quantity
  const changeQuantity = (quantityProduct) => {
    dispatch({
      type: QUANTITY_PRODUCT,
      payload: quantityProduct
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
        changeQuantity,
        setTotal
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
