import React from 'react';
import { useHistory } from 'react-router-dom';
import { GET_PRODUCTS } from '../apollo/queries/getProducts';
import { DELETE_PRODUCT } from '../apollo/mutations/product/deleteProduct';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const Product = ({ product }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      // Get a copy of cache object
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS
      });
      // Overwrite cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter(
            (currentProduct) => currentProduct.id !== id
          )
        }
      });
    }
  });

  const history = useHistory();

  const { id, name, quantity, price } = product;

  const handleEditProduct = () => {
    history.push(`/edit-product/${id}`);
  };

  const handleDeleteProduct = () => {
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
            // Delete Product by ID
            const { data } = await deleteProduct({
              variables: {
                id
              }
            });
            Swal.fire('Deleted!', data.deleteProduct, 'success');
          } catch (e) {
            // If error exists, the graphql error by default is replaced
            throw new Error(e.message.replace('GraphQL error: ', ''));
          }
        }
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{quantity}</td>
      <td className="border px-4 py-2">${price}</td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center
          items-center bg-yellow-600 py-2 px-4 w-full text-white rounded
          text-xs uppercase font-bold"
          onClick={handleEditProduct}
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
          onClick={handleDeleteProduct}
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

export default Product;
