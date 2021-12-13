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
      method: '*',
      path: '/loginTwitter',
      options: {
        auth: 'twitter',
        handler: function (request, h) {
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
