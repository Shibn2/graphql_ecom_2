import { gql } from "@apollo/client";

const insertProductData = gql`
    mutation AddProduct($title: String!, $description: String!, $price: String!, $outOfStock: Boolean!) {
    addProduct(title: $title, description: $description, price: $price, outOfStock: $outOfStock) {
      title
      description
      price
      outOfStock
    }
  }
`;

export default insertProductData;