import React from 'react';
import Layout from '../../components/layout/Layout';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../apollo/queries/getProducts';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Product from '../../components/Product';

const Products = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (error) {
    return <Error />;
  }
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Products</h1>

      <Link
        to="/new-product"
        className="bg-blue-800 py-2 px-5 mt-5 inline-block
            text-white rounded text-sm hover:bg-gray-800 mb-3
            uppercase font-bold"
      >
        New Product
      </Link>

      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-scroll lg:overflow-x-hidden">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Quantity</th>
                <th className="w-1/5 py-2">Price</th>
                <th className="w-1/5 py-2">Edit</th>
                <th className="w-1/5 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.getProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Products;
