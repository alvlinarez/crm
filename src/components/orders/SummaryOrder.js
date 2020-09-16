import React, { useContext } from 'react';
import OrderContext from '../../context/orders/OrderContext';
import SummaryProduct from './SummaryProduct';

const SummaryOrder = () => {
  // Getting order context
  const orderContext = useContext(OrderContext);

  // Getting order products from context
  const { products } = orderContext;

  return (
    <>
      <p
        className="mt-10 my-2 bg-white border-l-4
        border-gray-800 text-gray-700 p-2 text-sm
        font-bold"
      >
        3.- Quantity
      </p>
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <SummaryProduct key={product.product.id} product={product} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm">No products</p>
      )}
    </>
  );
};

export default SummaryOrder;
