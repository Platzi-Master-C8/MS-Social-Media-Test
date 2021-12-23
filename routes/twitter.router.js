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
      isSecure: true,
      clientId: config.twitterClientID,
      clientSecret: config.twitterClientSecret,
      location: 'https://ms-social-media.vercel.app',
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
          const profile = request.auth.credentials.profile;
          // h.state('linkedInLogin', profile);
          return h.redirect('https://mf-social-media-test.vercel.app/dashboard');
        },
      },
    });
  },
};
