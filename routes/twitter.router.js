const Boom = require('@hapi/boom');

'use strict';

exports.plugin = {
  name: 'twitterAPI',
  register: async function (server, options) {
    /* server.route({
      method: ['GET', 'POST'],
      path: '/login',
      options: {
        auth: {
          strategy: 'twitter',
        },
        handler: function (request, h) {
          if (!request.auth.isAuthenticated) {
            return (
              'Authentication failed due to: ' + request.auth.error.message
            );
          }
          const profile = request.auth.credentials.profile;
          const token = server.methods.generateJWT(profile.id, 'user');

          return h.redirect(
            'https://mf-social-media-test.vercel.app/dashboard?token=' + token
          );
        },
      },
    }); */

    server.route({
      method: 'GET',
      path: '/info',
      options: {
        handler: async (request, h) => {
          const profile = request.auth.credentials;
          const identities = profile.user.identities;

          // check if user has a connection with twitter
          const identity = identities.find(
            (identity) => identity.connection === 'twitter'
          );

          if (identity) {
            try {
              const info = await server.methods.getTwitterInfo(identity.user_id);
              return { tw: info };
            } catch (err) {
              console.log(err);
              return Boom.forbidden('try again some time');
            }
          }

          return Boom.unauthorized('no twitter connection');
        },
      },
    });
  },
};
