import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;
// const password = 'Inthad@26mdb';
// const userName = 'shibnstdy';
// const x = `mongodb+srv://shibnstdy:<password>@cluster0.phmnw.mongodb.net/`
// const connectionString = `mongodb+srv://${encodeURIComponent(userName)}:${encodeURIComponent(password)}@cluster0.phmnw.mongodb.net/`
//q3yTbXR7zqEKPVqB
console.log('connectionString', connectionString)
const client = new MongoClient(connectionString);

let conn;
try{
    conn = await client.connect();
} catch(err){
    console.log('Db connect error', err);
}

export const db = conn.db('Ecom_Inthad');

