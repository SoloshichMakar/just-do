import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { resolvers } from "./graphQL/resolvers";
import { typeDefs } from "./graphQL/schema";
import { applyMiddleware } from "graphql-middleware";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
const UserMiddleware = require("./middleware/UserMiddleware");
const redis = require("redis");

const host = process.env.NODE_ENV === "test" ? "localhost" : "redis";

const client = redis.createClient(6379, host);

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("error", function (err) {
  console.log("Something went wrong " + err);
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PostMiddleware = {
  async Mutation(resolve, root, args, context, info) {
    if (info.fieldName === "addUser") {
      await UserMiddleware.userCreateValidation(args);
    }
    if (info.fieldName === "updateUser") {
      await UserMiddleware.userUpdateValidation(args);
    }
    const result = await resolve(root, args, context, info);
    return result;
  },
};

const middleware = [PostMiddleware];

const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: (req) => ({ req, client }),
});

export const startServer = () => {
  createTypeOrmConnection()
    .then(() => {
      server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      });
    })
    .catch(() => {
      console.log("Couldn't connect to the database.");
    });
};

startServer();
