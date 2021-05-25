import { ApolloServer } from "apollo-server";
import dotenv from 'dotenv';
import schema from "./schema.js";

dotenv.config()

const server = new ApolloServer({
  schema
});

const PORT = process.env.PORT

server
  .listen(PORT)
  .then(() => console.log(`🎉 Server is running on http://localhost:${PORT}/ `));
