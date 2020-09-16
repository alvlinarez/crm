import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Layout from '../components/layout/Layout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CREATE_USER } from '../apollo/mutations/auth/createUser';
import showMsg from '../utils/showMsg';

const SignUp = () => {
  // Routing
  const history = useHistory();

  // Mutation to SignUp
  const [createUser] = useMutation(CREATE_USER);
  const [msg, setMsg] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      surname: yup.string().required('Surname is required'),
      email: yup.string().email('Email invalid').required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must contain at least 6 characters')
    }),
    onSubmit: async (values) => {
      const { name, surname, email, password } = values;
      try {
        const { data } = await createUser({
          variables: {
            input: {
              name,
              surname,
              email,
              password
            }
          }
        });
        // User created successfully
        setMsg(`User ${data.createUser.name} ${data.createUser.surname} 
        successfully created`);

        setTimeout(() => {
          setMsg(null);
          history.push('/signin');
        }, 1000);
      } catch (e) {
        setMsg(e.message.replace('Graphql error: ', ''));
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      }
    }
  });

  return (
    <>
      <Layout auth>
        <h1 className="text-center text-2xl text-white font-light">Sign Up</h1>
        {msg && showMsg(msg)}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Name"
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
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Surname"
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
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div
                  className="my-2 bg-red-100 border-l-4 border-red-500
                text-red-700 p-4"
                >
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              )}
              <button
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase
                hover:bg-gray-900"
              >
                Sign Up
              </button>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/signin">Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
