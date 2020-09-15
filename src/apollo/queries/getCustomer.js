import { gql } from '@apollo/client';

export const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    getCustomer(id: $id) {
      name
      surname
      email
      company
      phone
    }
  }
`;
