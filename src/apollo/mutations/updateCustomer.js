import { gql } from '@apollo/client';

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: ID!, $input: CustomerInput) {
    updateCustomer(id: $id, input: $input) {
      name
      surname
      email
      company
      phone
    }
  }
`;
