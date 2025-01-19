import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { typeDefs, resolvers } from './graphql/schema';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
