import { gql } from '@apollo/client';

export const BEST_CUSTOMERS = gql`
  query bestCustomers {
    bestCustomers {
      customer {
        name
        surname
        company
      }
      total
    }
  }
`;
