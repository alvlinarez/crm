import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import OrderContext from '../../context/orders/OrderContext';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../apollo/mutations/order/createOrder';
import Swal from 'sweetalert2';
import showMsg from '../../utils/showMsg';
import AssignCustomer from '../../components/orders/AssignCustomer';
import AssignProducts from '../../components/orders/AssignProducts';
import SummaryOrder from '../../components/orders/SummaryOrder';
import Total from '../../components/orders/Total';
import { GET_ORDERS_BY_SELLER } from '../../apollo/queries/getOrdersBySeller';

const NewOrder = () => {
  const history = useHistory();

  // Use context and get values and functions
  const orderContext = useContext(OrderContext);
  const { customer, products, total } = orderContext;

  // Error messages
  const [msg, setMsg] = useState(null);

  // Mutation to create order
  const [createOrder] = useMutation(CREATE_ORDER, {
    update(cache, { data: createOrder }) {
      // Get cache object to update
      const { getOrdersBySeller } = cache.readQuery({
        query: GET_ORDERS_BY_SELLER
      });
      // overwrite cache (cache must never be changed)
      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrdersBySeller: [...getOrdersBySeller, createOrder.createOrder]
        }
      });
    }
  });

  const validateOrder = () => {
    return !products.every((product) => product.quantity > 0) ||
      total === 0 ||
      Object.keys(customer).length === 0
      ? 'opacity-50 cursor-not-allowed'
      : '';
  };

  const handleCreateOrder = async () => {
    const { id } = customer;
    // Select params according apollo schema
    const order = products.map((product) => {
      return {
        product: product.product.id,
        quantity: product.quantity
      };
    });
    try {
      await createOrder({
        variables: {
          input: {
            customer: id,
            total,
            products: order
          }
        }
      });
      // Redirect
      history.push('/orders');
      // Show Alert
      Swal.fire('Success', 'Order created successfully', 'success');
    } catch (e) {
      setMsg(e.message.replace('GraphQL error: ', ''));
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">New Order</h1>
        {msg && showMsg(msg)}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <AssignCustomer />
            <AssignProducts />
            <SummaryOrder />
            <Total />
            <button
              type="button"
              className={`bg-gray-800 w-full mt-5 p-2 text-white 
            uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
              onClick={handleCreateOrder}
            >
              Save Order
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NewOrder;
