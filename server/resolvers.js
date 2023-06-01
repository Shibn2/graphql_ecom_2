import { PubSub } from "graphql-subscriptions";
import { db } from "./conn.js";
import {products} from "./data.js";

const pubSub = new PubSub();

export const resolvers = {
  Query: {
    Products: async() => {
      let collection = await db.collection("products");
      const productsFromDb = await collection.find({})?.toArray((data)=>{
        // console.log('productsFromDb', data);
        return data;
      });
      console.log('productsFromDb+============================-->');
      return productsFromDb; 
    },
    Product: async (root, { id }) => {
        const result = products.filter((el) => el.id === id);
        console.log('id--->', id, 'products', products, 'result', result);
        return products.filter((el) => el.id === id)[0]
    },
  },
  Mutation: {
    addProduct: async(root, { title, description, price, outOfStock}) => {
      const collection = await db.collection("products");
      const newProduct = { title, description, price, outOfStock };
      console.log('----------------------------++++===============>', newProduct);
      const productInsert = await collection.insertOne(newProduct);
      console.log('productInsert---- return value====>', productInsert);
      const { acknowledged } = productInsert;
      pubSub.publish(['POST_CREATED'], { productAdded: { title, description, price, outOfStock} });
      return { ...newProduct, acknowledged };
      // return acknowledged;
    }
  },
  Subscription: {
    productAdded: {
      subscribe: () => pubSub.asyncIterator(['POST_CREATED']),
    }
  }
};
