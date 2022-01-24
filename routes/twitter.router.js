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
  },
};
