import { db } from "./conn.js";
import {products} from "./data.js";

export const resolvers = {
  Query: {
    Products: async() => {
      let collection = await db.collection("products");
      const productsFromDb = await collection.find({})?.toArray((data)=>{
        console.log('productsFromDb', data);
        return data;
      });
      console.log('productsFromDb-->', productsFromDb);
      return productsFromDb; 
    },
    Product: async (root, { id }) => {
        const result = products.filter((el) => el.id === id);
        console.log('id--->', id, 'products', products, 'result', result);
        return products.filter((el) => el.id === id)[0]
    },
  },
};
