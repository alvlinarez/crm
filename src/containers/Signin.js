import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../apollo/mutations/authUser';
import Layout from '../components/layout/Layout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import client from '../apollo/config';

const SignIn = () => {
  // Mutation to SignIn
  const [authUser] = useMutation(AUTH_USER);
  const [msg, setMsg] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email.').required('Required email.'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await authUser({
          variables: {
            input: {
              email,
              password
            }
          }
        });
        setMsg('Signing in...');

        // Save in storage
        const { token } = data.authUser;
        localStorage.setItem('token', token);

        // Redirect to home
        setTimeout(() => {
          setMsg(null);
          window.location.href = '/';
        }, 1000);
      } catch (e) {
        console.log(e);
        setMsg(e.message.replace('Graphql error: ', ''));
        setTimeout(() => {
          setMsg(null);
        }, 2000);
      }
    }
  });

  const showMsg = () => (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{msg}</p>
    </div>
  );

  return (
    <>
      <Layout auth>
        <h1 className="text-center text-2xl text-white font-light">Sign In</h1>
        {msg && showMsg()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
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
                Sign In
              </button>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
