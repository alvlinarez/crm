import { gql } from '@apollo/client';

export const GET_CUSTOMERS_BY_SELLER = gql`
  query getCustomersBySeller {
    getCustomersBySeller {
      id
      name
      surname
      email
      company
      phone
    }
  }
`;
