

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";


const prisma = new PrismaClient();

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ 
        req,
        res,
        prisma,
    }),
});