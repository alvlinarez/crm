import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/orders/OrderContext';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../apollo/queries/getProducts';
import Error from '../Error';
import Select from 'react-select';

const AssignProducts = () => {
  const [products, setProducts] = useState([]);

  // Orders context
  const orderContext = useContext(OrderContext);
  const { addProducts } = orderContext;

  // Query to db
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    addProducts(products);
  }, [products]);

  const selectProduct = (productSelected) => {
    // If there are no products, the list would be empty and not null
    productSelected = productSelected === null ? [] : productSelected;
    setProducts(productSelected);
  };

  let getProducts = {};
  if (!loading && data) {
    getProducts = data.getProducts;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <p
        className="mt-10 my-2 bg-white border-l-4
        border-gray-800 text-gray-700 p-2 text-sm
        font-bold"
      >
        2.- Select Products
      </p>
      <Select
        className="mt-3"
        instanceId="select-products"
        isMulti={true}
        options={getProducts}
        onChange={(option) => selectProduct(option)}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) =>
          `${option.name} - ${option.quantity} available`
        }
        placeholder="Select Products"
        noOptionsMessage={() => 'No results'}
      />
    </>
  );
};

export default AssignProducts;
