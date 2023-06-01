import React from "react";

const ProductList = ({ productList = [] }) =>
  productList?.map(({ title, description, price, outOfStock } = {}) => (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <p>{outOfStock ? "Item Out Of Stock" : "In Stock"}</p>
    </div>
  ));

export default ProductList;
