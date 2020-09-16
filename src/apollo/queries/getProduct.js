import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      quantity
      price
    }
  }
`;
