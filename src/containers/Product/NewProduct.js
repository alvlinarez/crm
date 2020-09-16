import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../apollo/mutations/product/createProduct';
import { GET_PRODUCTS } from '../../apollo/queries/getProducts';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Layout from '../../components/layout/Layout';
import showMsg from '../../utils/showMsg';

const NewProduct = () => {
  const history = useHistory();

  // Mutation to create new products
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, { data: createProduct }) {
      // Get cache object to update
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });
      // overwrite cache (cache must never be changed)
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, createProduct]
        }
      });
    }
  });

  // State for messages
  const [msg, setMsg] = useState(null);

  // Form with Formik to create products
  const formik = useFormik({
    initialValues: {
      name: '',
      quantity: '',
      price: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      quantity: yup
        .number()
        .positive('Quantity must be positive')
        .integer()
        .required('Quantity is required'),
      price: yup
        .number()
        .positive('Price must be positive')
        .required('Price is required')
    }),
    onSubmit: async (values) => {
      try {
        const { name, quantity, price } = values;
        await createProduct({
          variables: {
            input: {
              name,
              quantity,
              price
            }
          }
        });
        history.push('/products');
      } catch (e) {
        setMsg(e.message.replace('Graphql error: ', ''));
        setTimeout(() => {
          setMsg(null);
        }, 3000);
      }
    }
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Product</h1>
      {msg && showMsg(msg)}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div
                className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                placeholder="Quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
              />
            </div>
            {formik.touched.quantity && formik.errors.quantity && (
              <div
                className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.quantity}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                step="0.01"
                placeholder="Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </div>
            {formik.touched.price && formik.errors.price && (
              <div
                className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white
              uppercase font-bold hover:bg-gray-900"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
