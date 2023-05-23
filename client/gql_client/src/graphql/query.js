import { gql } from "@apollo/client";

export const productData = gql`
  query Products {
    Products {
      title
      description
      price
      outOfStock
    }
  }
`;

