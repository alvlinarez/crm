import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/orders/OrderContext';

const SummaryProduct = ({ product }) => {
  // Order context
  const orderContext = useContext(OrderContext);
  const { changeQuantity, setTotal, products } = orderContext;

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    updateQuantity();
    setTotal();
  }, [quantity]);

  const updateQuantity = () => {
    // updating quantity field in product in db
    changeQuantity({ ...product, quantity });
  };

  const { name, price } = product.product;

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>${price}</p>
      </div>
      <input
        type="number"
        placeholder="Quantity"
        min="0"
        className="shadow appearance-none border rounded w-full
        py-2 px-3 text-gray-700 leading-tight focus:outline-none
        focus:shadow-outline md:ml-4"
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      />
    </div>
  );
};

export default SummaryProduct;
