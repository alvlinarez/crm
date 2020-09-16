import { gql } from '@apollo/client';

export const GET_ORDERS_BY_SELLER = gql`
  query getOrdersBySeller {
    getOrdersBySeller {
      id
      total
      state
      products {
        product {
          id
          name
          quantity
        }
        quantity
      }
      seller {
        id
        name
        surname
        email
      }
      customer {
        id
        name
        surname
        phone
        email
      }
    }
  }
`;
