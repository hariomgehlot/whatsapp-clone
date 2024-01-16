// import * as mongo from 'mongodb';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
// MongoDB connection string (replace with your connection string)

let uri = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '';

let dbName = process.env.DB_NAME ? '/' + process.env.DB_NAME : '';
mongoose
  .connect(uri + dbName)
  .then(() => {
    console.log('connected using mongoose');
  })
  .catch((error) => {
    console.log('failed to connect');
  });

// export const collections: { rooms?: mongo.Collection } = {};
// Create a new MongoClient with the provided connection string and options
// const client = new mongo.MongoClient(uri + dbName);

// // Connect to MongoDB using the client
// export async function connectToMongo() {
//   try {
//     await client.connect();
//     collections.rooms = client.db().collection('rooms');
//     console.log('connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }
// // Use the connected MongoClient in your application as needed

// // Close the MongoDB connection when the application exits
// async function closeMongoConnection() {
//   try {
//     await client.close();
//     console.log('Closed MongoDB connection');
//   } catch (error) {
//     console.error('Error closing MongoDB connection:', error);
//   }
// }
