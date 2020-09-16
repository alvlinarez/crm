import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/orders/OrderContext';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS_BY_SELLER } from '../../apollo/queries/getCustomersBySeller';
import Error from '../Error';
import Select from 'react-select';

const AssignCustomer = () => {
  const [customer, setCustomer] = useState({});

  // Orders context
  const orderContext = useContext(OrderContext);
  const { addCustomer } = orderContext;

  // Query to db
  const { data, loading, error } = useQuery(GET_CUSTOMERS_BY_SELLER);

  useEffect(() => {
    addCustomer(customer);
  }, [customer]);

  let getCustomersBySeller = [];
  if (!loading && data) {
    getCustomersBySeller = data.getCustomersBySeller;
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
        1.- Assign a customer to the product
      </p>
      <Select
        className="mt-3"
        instanceId="select-customer"
        options={getCustomersBySeller}
        onChange={(option) => setCustomer(option)}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => `${option.name} ${option.surname}`}
        placeholder="Select Customer"
        noOptionsMessage={() => 'No results'}
      />
    </>
  );
};

export default AssignCustomer;
