import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../apollo/mutations/customer/createCustomer';
import { GET_CUSTOMERS_BY_SELLER } from '../apollo/queries/getCustomersBySeller';
import { useFormik } from 'formik';
import * as yup from 'yup';

const NewCustomer = () => {
  const history = useHistory();

  // Mutation to create new customers
  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    update(cache, { data: createCustomer }) {
      // get cache object to update
      const { getCustomersBySeller } = cache.readQuery({
        query: GET_CUSTOMERS_BY_SELLER
      });
      cache.writeQuery({
        query: GET_CUSTOMERS_BY_SELLER,
        data: {
          getCustomersBySeller: [...getCustomersBySeller, createCustomer]
        }
      });
    }
  });

  // State for messages
  const [msg, setMsg] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      company: '',
      phone: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      surname: yup.string().required('Surname is required'),
      email: yup.string().email('Email invalid').required('Email is required'),
      company: yup.string().required('Company is required'),
      phone: yup.string()
    }),
    onSubmit: async (values) => {
      try {
        const { name, surname, company, email, phone } = values;
        await createCustomer({
          variables: {
            input: {
              name,
              surname,
              company,
              email,
              phone
            }
          }
        });
        history.push('/');
      } catch (e) {
        setMsg(e.message.replace('Graphql error: ', ''));
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      }
    }
  });

  const showMsg = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{msg}</p>
      </div>
    );
  };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">New Customer</h1>
        {msg && showMsg()}
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
                  htmlFor="surname"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Surname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                />
              </div>
              {formik.touched.surname && formik.errors.surname && (
                <div
                  className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
                >
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.surname}</p>
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div
                  className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
                >
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Company"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company}
                />
              </div>
              {formik.touched.company && formik.errors.company && (
                <div
                  className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
                >
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.company}</p>
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="Phone"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </div>
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
    </div>
  );
};

export default NewCustomer;
