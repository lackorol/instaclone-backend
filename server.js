import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import { resolvers, typeDefs } from "./schema.js";
import { getUser, protectResolver } from "./users/users.utils.js";

dotenv.config();
const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use(express.static("uploads"));
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🎉 Server is running on http://localhost:${PORT}/ `);
});
