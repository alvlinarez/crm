import React from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Order from '../../components/orders/Order';
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_SELLER } from '../../apollo/queries/getOrdersBySeller';
import Error from '../../components/Error';

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS_BY_SELLER);
  let getOrdersBySeller = [];
  if (!loading && data) {
    getOrdersBySeller = data.getOrdersBySeller;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <Link
        to="/new-order"
        className="bg-blue-800 py-2 px-5 mt-5 inline-block
            text-white rounded text-sm hover:bg-gray-800 mb-3
            uppercase font-bold"
      >
        New Order
      </Link>

      {loading && <Loading />}

      {getOrdersBySeller.length === 0 ? (
        <p className="mt-5 text-center text-2xl">No Orders Found</p>
      ) : (
        getOrdersBySeller.map((order) => <Order key={order.id} order={order} />)
      )}
    </Layout>
  );
};

export default Orders;
