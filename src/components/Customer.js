import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_CUSTOMER } from '../apollo/mutations/deleteCustomer';
import { GET_CUSTOMERS_BY_SELLER } from '../apollo/queries/getCustomersBySeller';
import Swal from 'sweetalert2';

const Customer = ({ customer }) => {
  const history = useHistory();

  // Mutation to delete customer
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    update(cache) {
      // Get a copy of cache object
      const { getCustomersBySeller } = cache.readQuery({
        query: GET_CUSTOMERS_BY_SELLER
      });
      // Overwrite cache
      cache.writeQuery({
        query: GET_CUSTOMERS_BY_SELLER,
        data: {
          getCustomersBySeller: getCustomersBySeller.filter(
            (currentCustomer) => currentCustomer.id !== id
          )
        }
      });
    }
  });

  const { id, name, surname, company, email, phone } = customer;

  // Delete customer
  const handleDeleteCustomer = () => {
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
            // Delete by ID
            const { data } = await deleteCustomer({
              variables: {
                id
              }
            });
            Swal.fire('Deleted!', data.deleteCustomer, 'success');
          } catch (e) {
            throw new Error(e.message.replace('GraphQl error: ', ''));
          }
        }
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  const handleEditCustomer = () => {
    history.push(`/edit-customer/${id}`);
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {name} {surname}
      </td>
      <td className="border px-4 py-2">{company}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{phone}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center
          items-center bg-yellow-600 py-2 px-4 w-full text-white rounded
          text-xs uppercase font-bold"
          onClick={handleEditCustomer}
        >
          Edit
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 ml-2">
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7
            10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010
            2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center
          items-center bg-red-800 py-2 px-4 w-full text-white rounded
          text-xs uppercase font-bold"
          onClick={handleDeleteCustomer}
        >
          Delete
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
      </td>
    </tr>
  );
};

export default Customer;
