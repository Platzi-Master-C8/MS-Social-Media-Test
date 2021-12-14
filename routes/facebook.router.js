'use strict';

const { config } = require('../config/config');

exports.plugin = {
  // pkg: require('../package.json'),
  // multiple: true,
  name: 'facebookAPI',
  register: async function (server, options) {
    /* server.auth.strategy({
      name: 'facebook',
      password: 'cookie_encryption_password_secure_1245654654645',
      isSecure: true,
      clientId: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
      // location: server.info.uri
      location: 'https://819e-2806-266-480-213-b032-d8c2-98ae-ccfc.ngrok.io',
      protocol: 'oauth2',
      auth: 'https://www.facebook.com/v12.0/dialog/oauth',
      token: 'https://graph.facebook.com/v12.0/oauth/access_token',

    }, 'bell'); */

    server.route({
      method: '*',
      path: '/loginFacebook',
      options: {
        /* auth: {
          mode: 'try',
          strategy: 'facebook',
        }, */
        handler: (request, h) => {
          if (!request.auth.isAuthenticated) {
            return (
              'Authentication failed due to: ' + request.auth.error.message
            );
          }

          return (
            '<pre>' +
            JSON.stringify(request.auth.credentials, null, 4) +
            '</pre>'
          );
        },
      },
    });
  },
};
