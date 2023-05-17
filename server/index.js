import "./loadEnv.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import fs from "fs/promises";
import { resolvers } from "./resolvers.js";
import { db } from "./conn.js";

console.log(" ATLAS_URI ", process.env.ATLAS_URI);

const app = express();
const port = 3006;
const typeDefs = await fs.readFile("./schema.graphql", "utf-8");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.use(express.json({extended: true, limit: '1mb'}));

app.get("/products", (req, res) => {
  res.send("This is products");
});

app.post("/addProducts", async (req, res) => {
  let collection = await db.collection("products");
  //   let newDocument = {
  //     title: "Inthad shoes",
  //     description: "Homegrown shoes",
  //     id: new Date().valueOf(),
  //   };
  let newDocument = req.body;
  console.log('newDocument', newDocument, 'req.body', req.body, 'req', req);
  newDocument.id = new Date().valueOf();
  let result = await collection.insertOne(newDocument);
  console.log('result', result);
  res.send(result).status(204);
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
