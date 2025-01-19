import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUsers: async () => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_: any, args: { name: string; email: string }) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
  },
};
