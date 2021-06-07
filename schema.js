import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import Glob from "glob";
const { glob } = Glob;

const loadedTypes = loadFilesSync(`${__dirname}\\**\\*.typeDefs.js`);

const loadedResolvers = loadFilesSync(
  `${__dirname}\\**\\*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);
const schema = makeExecutableSchema({typeDefs, resolvers});
export default schema;