import React from 'react';
import Layout from '../components/layout/Layout';
import usePolling from '../hooks/usePolling';
import { BEST_CUSTOMERS } from '../apollo/queries/bestCustomers';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import Loading from '../components/loading/Loading';
import Error from '../components/Error';

const BestCustomers = () => {
  const [data, loading, error, startPolling, stopPolling] = usePolling(
    BEST_CUSTOMERS
  );

  let bestCustomers = [];
  if (!loading && data) {
    bestCustomers = data.bestCustomers;
  }

  // Custom array with customer objects of bestcustomers array
  const customerChart = [];

  bestCustomers.map(
    (customer, index) =>
      (customerChart[index] = {
        ...customer.customer[0],
        total: customer.total
      })
  );

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Best Customers</h1>
        {loading ? (
          <Loading />
        ) : bestCustomers.length > 0 ? (
          <ResponsiveContainer width={'99%'} height={500}>
            <BarChart
              className="mt-10"
              width={600}
              height={500}
              data={customerChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3182c3" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div>No Results</div>
        )}
      </Layout>
    </div>
  );
};

export default BestCustomers;
