const Boom = require('@hapi/boom');
 
'use strict';

exports.plugin = {
  name: 'facebookAPI',
  register: async function (server, options) {
    /* server.route({
      method: '*',
      path: '/login',
      options: {
        auth: {
          strategy: 'facebook',
        },
        handler: (request, h) => {
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

          // check if user has a connection with facebook
          const identity = identities.find(
            (identity) => identity.connection === 'facebook'
          );

          if (identity) {
            try {
              const info = await server.methods.getFacebookInfo(identity.access_token, profile.user);
              return { fb: info };
            } catch (err) {
              console.log(err);
              return Boom.forbidden('try again some time');
            }
          }

          return Boom.unauthorized('no facebook connection');
        },
      },
    });
  },
};
