import "./loadEnv.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import fs from "fs/promises";
import { createServer } from "http";
import {makeExecutableSchema} from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { resolvers } from "./resolvers.js";
import { db } from "./conn.js";

console.log(" ATLAS_URI ", process.env.ATLAS_URI);

const app = express();

// create http server with express app
const httpServer = createServer(app);

const typeDefs = await fs.readFile("./schema.graphql", "utf-8");

// Create an instance of graphql schema, which can be used by both subscriber server and apollo server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// create the web socket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
})

// init the websocket server
const serverCleanup = useServer({ schema }, wsServer);



const apolloServer = new ApolloServer({ schema, plugins:[
  ApolloServerPluginDrainHttpServer({ httpServer }),
  {
    async serverWillStart(){
      return {
        async drainServer(){
          await serverCleanup.dispose()
        }
      }
    }
  }
]});
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.use(express.json({extended: true, limit: '1mb'}));

app.get("/products", (req, res) => {
  res.send("This is products");
});

app.post("/addProducts", async (req, res) => {
  let collection = await db.collection("products");

  let newDocument = req.body;
  console.log('newDocument', newDocument, 'req.body', req.body, 'req', req);
  newDocument.id = new Date().valueOf();
  let result = await collection.insertOne(newDocument);
  console.log('result', result);
  res.send(result).status(204);
});

// app.listen(port, () => {
//   console.log(`Server running at ${port}`);
// });

httpServer.listen(process.env.APP_SERVING_PORT, () => {
  console.log(`Server running at ${process.env.APP_SERVING_PORT}`);
})
