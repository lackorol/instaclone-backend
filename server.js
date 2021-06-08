import { ApolloServer } from "apollo-server";
import dotenv from 'dotenv';
import schema from "./schema.js";
import { getUser, protectResolver } from "./users/users.utils.js";

dotenv.config()

const server = new ApolloServer({
  schema,
  context : async ({req}) => {
    return {
      loggedInUser : await getUser(req.headers.token),
      protectResolver
    }
  }  
});

const PORT = process.env.PORT

server
  .listen(PORT)
  .then(() => console.log(`🎉 Server is running on http://localhost:${PORT}/ `));

const x = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "log in pls"
    }
  }
  return resolver(root, args, context, info);
}