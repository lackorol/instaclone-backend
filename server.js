require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import logger from "morgan";
import { resolvers, typeDefs } from "./schema.js";
import { getUser, protectResolver } from "./users/users.utils.js";

const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  playground: true,
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
app.use(cors({ origin: "http://localhost:3000" }));
server.applyMiddleware({ app, path: "/graphql", cors: false });

app.listen({ port: PORT }, () => {
  console.log(`🎉 Server is running on http://localhost:${PORT}/ `);
});
