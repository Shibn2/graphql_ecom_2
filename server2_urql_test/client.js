import React from "react";
import { hydrate } from "react-dom";
import App from "./app";
import { createClient, dedupExchange, cacheExchange, fetchExchange } from "@urql/core";
import { Provider } from "urql";

const client = createClient({
  url: "http://localhost:3006/graphql",
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});
const intProductList = window.__PRODUCT_LIST__;

console.log("intProductList----------->", intProductList);

hydrate(
  <Provider value={client}>
    <App productList={intProductList} />
  </Provider>,
  document.getElementById("root")
);
