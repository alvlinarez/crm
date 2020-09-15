import React from 'react';
import Layout from '../components/layout/Layout';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS_BY_SELLER } from '../apollo/queries/getCustomersBySeller';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import Customer from '../components/Customer';

const Home = () => {
  // Apollo query
  const { data, loading, error } = useQuery(GET_CUSTOMERS_BY_SELLER);

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Customers</h1>

        <Link
          to="/new-customer"
          className="bg-blue-800 py-2 px-5 mt-5 inline-block
            text-white rounded text-sm hover:bg-gray-800 mb-3
            uppercase font-bold w-full lg:w-auto text-center"
        >
          New Customer
        </Link>

        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-scroll lg:overflow-x-hidden">
            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-gray-800">
                <tr className="text-white">
                  <th className="w-1/6 py-2">Name</th>
                  <th className="w-1/6 py-2">Company</th>
                  <th className="w-1/6 py-2">Email</th>
                  <th className="w-1/6 py-2">Phone</th>
                  <th className="w-1/6 py-2">Edit</th>
                  <th className="w-1/6 py-2">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.getCustomersBySeller.map((customer) => (
                  <Customer customer={customer} key={customer.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Home;
