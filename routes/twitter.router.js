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
          // const accessToken = profile.user.identities[0].access_token;
          const id = profile.user.identities[0].user_id;
          
          try {
            const info = await server.methods.getTwitterInfo(id);
            return { info };
          } catch (err) {
            console.log(err);
            return err;
          }
        },
      },
    });
  },
};
