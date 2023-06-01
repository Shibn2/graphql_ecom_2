import React, { useEffect, useMemo, useState } from "react";
import ProductList from "./productLIst.js";
import { gql, useQuery } from "urql";

function App({ productList }) {
  const [productData, setProductData] = useState(productList);
  // const [queryCount, setQueryCount] = useState(0);

  const [result, reexecuteQuery] = useQuery({
    query: gql`
    query {
      Products {
        title
        description
        price
        outOfStock
      }
    }`
  });
  console.log("-------> result", result);
  const { data: { Products } = {}, data, fetching, error } = result || {};

  const handleProductFetch = () => {
    console.log("data on client side refresh >>", Products);
    // setQueryCount(queryCount+1)
    reexecuteQuery({ requestPolicy: 'network-only' });
    // const { productList } = data;
  };

  useEffect(()=>{
    console.log('products>>', data?.Products);
    if(data?.Products?.length){
      setProductData(Products)
    }
  }, [data])

  //return 'Simple string SSR'
  return (
    <div className="App">
      <h3>App Client</h3>
      <ProductList productList={productData} />
      <button onClick={handleProductFetch}>Refresh Products</button>
    </div>
  );
}

export default App;
