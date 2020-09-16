import { gql } from '@apollo/client';

export const BEST_SELLERS = gql`
  query bestSellers {
    bestSellers {
      total
      seller {
        id
        name
        surname
      }
    }
  }
`;
