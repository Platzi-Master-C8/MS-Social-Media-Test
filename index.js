'use strict';

require('dotenv').config();

const {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} = require('apollo-server-hapi');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const Bell = require('@hapi/bell');
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const services = require('./services');
const authStrategies = require('./utils/auth_strategies');

const app = Hapi.server({
  port: process.env.PORT || 4000,
  /* routes: {
    cors: true,
  }, */
});

const init = async (typeDefs, resolvers) => {

  // register plugins
  await app.register(Bell);
  await app.register(services);
  await app.register(authStrategies);
  await app.register(routes);

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

module.exports = app;
