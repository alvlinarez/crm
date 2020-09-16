import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      id
      name
      quantity
      price
      createdAt
    }
  }
`;
