import React from 'react';
import Layout from '../components/layout/Layout';
import { BEST_SELLERS } from '../apollo/queries/bestSellers';
import usePolling from '../hooks/usePolling';
import Loading from '../components/loading/Loading';
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
import Error from '../components/Error';

const BestSellers = () => {
  const [data, loading, error, startPolling, stopPolling] = usePolling(
    BEST_SELLERS
  );

  let bestSellers = [];
  if (!loading && data) {
    bestSellers = data.bestSellers;
  }

  // Custom array with seller objects of bestsellers array
  const sellerChart = [];

  bestSellers.map(
    (seller, index) =>
      (sellerChart[index] = {
        ...seller.seller[0],
        total: seller.total
      })
  );

  if (error) {
    return <Error />;
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>
      {loading ? (
        <Loading />
      ) : bestSellers.length > 0 ? (
        <ResponsiveContainer width={'99%'} height={500}>
          <BarChart
            className="mt-10"
            width={600}
            height={500}
            data={sellerChart}
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
  );
};

export default BestSellers;
