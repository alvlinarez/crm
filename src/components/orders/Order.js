import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER } from '../../apollo/mutations/order/updateOrder';
import { DELETE_ORDER } from '../../apollo/mutations/order/deleteOrder';
// Modal
import Swal from 'sweetalert2';
// Show Error Message
import showMsg from '../../utils/showMsg';
import { GET_ORDERS_BY_SELLER } from '../../apollo/queries/getOrdersBySeller';

const Order = ({ order }) => {
  const {
    id,
    total,
    customer: { name, surname, phone, email, id: idCustomer },
    state,
    products
  } = order;

  // Mutation to update orders state
  const [updateOrder] = useMutation(UPDATE_ORDER);
  // Mutation to delete order
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersBySeller } = cache.readQuery({
        query: GET_ORDERS_BY_SELLER
      });
      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrdersBySeller: getOrdersBySeller.filter(
            (currentOrder) => currentOrder.id !== id
          )
        }
      });
    }
  });

  // State for orderState
  const [orderState, setOrderState] = useState(state);
  // State to change className by state of order
  const [orderClass, setOrderClass] = useState('');
  // State for error messages
  const [msg, setMsg] = useState(null);

  // Function to modify the order color by state
  const changeOrderClass = () => {
    if (orderState === 'PENDING') {
      setOrderClass('border-yellow-500');
    } else if (orderState === 'COMPLETED') {
      setOrderClass('border-green-500');
    } else {
      setOrderClass('border-red-800');
    }
  };

  useEffect(() => {
    changeOrderClass();
  }, [orderState]);

  // Change state order function
  const handleState = async (newState) => {
    try {
      const { data, loading } = await updateOrder({
        variables: {
          id,
          input: {
            state: newState,
            customer: idCustomer,
            products: products.map((asset) => {
              return {
                product: asset.product.id,
                quantity: asset.quantity
              };
            }),
            total
          }
        }
      });
      setOrderState(data.updateOrder.state);
    } catch (e) {
      setMsg(e.message.replace('Graphql error: ', ''));
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  };

  // Delete Order function
  const handleDeleteOrder = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then(async (result) => {
        if (result.value) {
          try {
            // Delete Order by ID
            const { data } = await deleteOrder({
              variables: {
                id
              }
            });
            Swal.fire('Order Deleted!', data.deleteOrder, 'success');
          } catch (e) {
            // If error exists, the graphql error by default is replaced
            throw new Error(e.message.replace('GraphQL error: ', ''));
          }
        }
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <div
      className={`${orderClass} border-t-4 mt-4 bg-white rounded p-6 md:grid
    md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      {msg && showMsg(msg)}
      <div>
        <p className="font-bold text-gray-800">
          Customer: {name} {surname}
        </p>
        {email && (
          <p className="flex items-center my-2">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-4 h-4 mr-2"
            >
              <path
                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0
              00-1.997 1.884z"
              />
              <path
                d="M18 8.118l-8 4-8-4V14a2 2 0 002
              2h12a2 2 0 002-2V8.118z"
              />
            </svg>
            {email}
          </p>
        )}
        {phone && (
          <p className="flex items-center my-2">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-4 h-4 mr-2"
            >
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0
              01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1
              1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82
              18 2 12.18 2 5V3z"
              />
            </svg>
            {phone}
          </p>
        )}
        <h2 className="text-gray-800 font-bold mt-10">Order State:</h2>
        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600
          text-white p-2 text-center rounded leading-tight focus:outline-none
          focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          value={orderState}
          onChange={(e) => handleState(e.target.value)}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-10">Order Summary</h2>
        {products.map((asset) => (
          <div key={asset.product.id} className="mt-4">
            <p className="text-sm text-gray-600">
              Product: {asset.product.name}
            </p>
            <p className="text-sm text-gray-600">Quantity: {asset.quantity}</p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total:
          <span className="font-light"> ${total}</span>
        </p>
        <button
          className="flex items-center mt-4 bg-red-800 px-5 py-2
          inline-block text-white rounded leading-tight uppercase
          text-xs font-bold"
          type="button"
          onClick={handleDeleteOrder}
        >
          Delete Order
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 ml-2">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414
              1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293
              1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0
              00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Order;
