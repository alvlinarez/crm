import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      quantity
      price
      createdAt
    }
  }
`;
