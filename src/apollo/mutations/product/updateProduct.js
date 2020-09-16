import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      quantity
      price
    }
  }
`;
