import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      surname
      email
    }
  }
`;
