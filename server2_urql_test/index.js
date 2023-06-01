import "./loadEnv.js";
import express from "express";
import React from "react";
import ReactDOMServer from 'react-dom/server'
import { createClient, ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "@urql/core";
import { Provider } from "urql";
import fetch from "node-fetch";
import App from "./app.js";

const app = express();

const ssrCache = ssrExchange({ isClient: false });

const client = createClient({
    url: 'http://localhost:3006/graphql',
    fetch,
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});
// console.log('client >>', client);
const productList = await client.query(`{
    Products {
        title
        description
        price
        outOfStock
      }
}`).toPromise();
// console.log('productList>>', productList);
const { data: { Products = [] } = {}} = productList || {};
console.log('Products -->', Products);
// const component = React.createElement(App, {productList});

// console.log('component', component);

// const appHtml = renderToString(component);

const appHtml = ReactDOMServer.renderToString(<Provider value={client}><App productList={Products}/></Provider>);

app.use(express.static("build", { type: 'application/javascript' }));

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>My SSR App</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script>
        window.__PRODUCT_LIST__ = ${JSON.stringify(Products)};
      </script>
      <script src="./client/client.js"></script>
    </body>
  </html>
    `);
});

app.listen( process.env.PORT, ()=>{
    console.log('App running at port', process.env.PORT);
})
