import { gql } from '@apollo/client';

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;
