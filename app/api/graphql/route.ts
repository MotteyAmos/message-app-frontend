// npm install @apollo/server @as-integrations/express5 express graphql cors
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { mergedTypeDefs } from '@/lib/server/schema/type-defs';
import { mergedResolvers } from '@/lib/server/schema/resolvers';
import { DBClient } from '@/lib/db/DBClient';
import { Db, MongoClient } from "mongodb";



export interface MyContext {
  db: Db
}


const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});




const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => {
    const db = await DBClient();
    return { db };
  }
});

export { handler as GET, handler as POST };