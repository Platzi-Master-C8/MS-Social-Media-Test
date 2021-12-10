'use strict';

const {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} = require('apollo-server-hapi');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const Bell = require('@hapi/bell');
const Hapi = require('@hapi/hapi');

const init = async (typeDefs, resolvers) => {
  const app = Hapi.server({ port: 4000 });
  await app.register(Bell);

  app.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '1555047951509441',
    clientSecret: 'd73fd234a77f38ca54331a9ad440c786',
    location: app.info.uri
  });

  app.route([{
    method: '*', // Must handle both GET and POST
    path: '/loginFacebook', // The callback endpoint registered with the provider
    options: {
      auth: {
        mode: 'try',
        strategy: 'facebook',
      },
      handler: (request, h) => {
        if (!request.auth.isAuthenticated) {
          return `Authentication failed due to: ${request.auth.error.message}`;
        }

        console.log(request.auth.credentials);

        // Perform any account lookup or registration, setup local session,
        // and redirect to the application. The third-party credentials are
        // stored in request.auth.credentials. Any query parameters from
        // the initial request are passed back via request.auth.credentials.query.

        return h.redirect('/home');
      },
    },
  },
  {
    method: 'GET',
    path: '/home',
    handler: (request, h) => {
      return {msg: 'hi'}
    }
  }]);

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
