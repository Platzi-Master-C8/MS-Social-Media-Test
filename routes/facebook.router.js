'use strict';

const { config } = require('../config/config');

exports.plugin = {
  // pkg: require('../package.json'),
  // multiple: true,
  name: 'facebookAPI',
  register: async function (server, options) {
    server.auth.strategy('facebook', 'bell', {
      provider: 'facebook',
      password: 'cookie_encryption_password_secure',
      isSecure: true,
      clientId: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
      // location: 'https://ms-social-media.vercel.app',
      location: 'https://f987-200-68-167-242.ngrok.io'
    });

    server.route({
      method: '*',
      path: '/loginFacebook',
      options: {
        auth: {
          mode: 'try',
          strategy: 'facebook',
        },
        handler: (request, h) => {
          if (!request.auth.isAuthenticated) {
            console.log(request.auth.error);
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
