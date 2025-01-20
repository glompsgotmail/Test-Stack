"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const client_1 = require("@prisma/client");
const schema_1 = require("./graphql/schema");
const prisma = new client_1.PrismaClient();
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: schema_1.resolvers,
});
server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
});
