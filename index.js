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

const app = Hapi.server({ port: process.env.PORT || 4000 });
const init = async (typeDefs, resolvers) => {

  // register plugins
  await app.register(Bell);
  await app.register(services);
  await app.register(routes);

  // ROUTE ONLY FOR TESTING PURPOSES USING LAB
  /* app.route({
    method: 'GET',        // define the method this route will handle
    path: '/hi', // this is how you capture route parameters in Hapi
    handler: function(req, h) { // request handler method
      return 'Hello'; // reply with text.
    }
  }); */

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
