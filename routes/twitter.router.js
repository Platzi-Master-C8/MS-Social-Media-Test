'use strict';

const { config } = require('../config/config');

exports.plugin = {
  // pkg: require('../package.json'),
  // multiple: true,
  name: 'twitterAPI',
  register: async function (server, options) {
    server.auth.strategy('twitter', 'bell', {
      provider: 'twitter',
      password: 'cookie_encryption_password_secure',
      isSecure: false,
      clientId: config.twitterClientID,
      clientSecret: config.twitterClientSecret,
    });

    server.route({
      method: ['GET', 'POST'],
      path: '/loginTwitter',
      options: {
        auth: {
          mode: 'try',
          strategy: 'twitter',
        },
        handler: function (request, h) {
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
