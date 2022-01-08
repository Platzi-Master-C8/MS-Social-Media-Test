'use strict';

const { config } = require('../config/config');

exports.plugin = {
  // pkg: require('../package.json'),
  // multiple: true,
  name: 'linkedInAPI',
  register: async function (server, options) {
    server.auth.strategy('linkedin', 'bell', {
      provider: 'linkedin',
      password: 'cookie_encryption_password_secure',
      isSecure: true,
      clientId: config.linkedInClientID,
      clientSecret: config.linkedInClientSecret,
      location: 'https://ms-social-media.vercel.app',
      providerParams: {
        // redirect_uri: server.info.uri + '/loginLinkedin',
        redirect_uri: 'https://ms-social-media.vercel.app/api/v1/loginLinkedin',
      },
    });

    server.state('linkedInLogin');

    server.route({
      method: '*',
      path: '/loginLinkedin',
      options: {
        auth: 'linkedin',
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
    });
  },
};
