import { gql } from '@apollo/client';

export const IS_SIGNED_IN = gql`
  query isSignedIn {
    isSignedIn @client
  }
`;
