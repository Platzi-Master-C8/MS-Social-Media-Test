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
      isSecure: false,
      clientId: config.linkedInClientID,
      clientSecret: config.linkedInClientSecret,
      providerParams: {
        redirect_uri: server.info.uri + '/loginLinkedin',
      },
    });

    server.route({
      method: '*',
      path: '/loginLinkedin',
      options: {
        auth: 'linkedin',
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
