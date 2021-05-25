/* import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";


const loadedTypes = loadFilesSync(`${__dirname}\\**\\*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}\\**\\*.{queries,mutations}.js`);


const schema = makeExecutableSchema(typeDefs, resolvers);
 */

import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as fs from "fs";
import Glob from "glob";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const { glob } = Glob;
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedTypes = glob
  .sync(`${__dirname}\\**\\*.typeDefs.graphql`)
  .map((x) => fs.readFileSync(x, { encoding: "utf8" }));

const loadedResolvers = glob
  .sync(`${__dirname}\\**\\*.{queries,mutations}.js`)
  .map((resolver) => createRequire(resolver));

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
