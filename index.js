'use strict';

const {
  ApolloServer,
  ApolloServerPluginStopHapiServer
} = require('apollo-server-hapi');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const Hapi = require('@hapi/hapi');

const init = async (typeDefs, resolvers) => {

  const app = Hapi.server({ port: 4000 });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginStopHapiServer({ hapiServer: app })],
  });

  await server.start();
  await server.applyMiddleware({ app });
  await app.start();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init(typeDefs, resolvers);
