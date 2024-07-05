import { ApolloServer } from 'apollo-server';
import {typeDefs} from './schema.js';
import {resolvers} from './resolvers.js';
import { connectDB, db } from './db.js';

// Start the server
const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token, db };
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
