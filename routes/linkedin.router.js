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
        // redirect_uri: 'https://ms-social-media.vercel.app/api/v1/loginLinkedin'
      },
    });

    server.state('linkedInLogin');

    server.route({
      method: '*',
      path: '/loginLinkedin',
      options: {
        auth: 'linkedin',
        handler: function (request, h) {
          /* return (
            '<pre>' +
            JSON.stringify(request.auth.credentials, null, 4) +
            '</pre>'
          ); */
          // console.log(request.auth);
          if(request.auth.isAuthenticated) {
            if (!request.auth.isAuthenticated) {
              return (
                'Authentication failed due to: ' + request.auth.error.message
              );
            }
            const profile = request.auth.credentials.profile;
            // h.state('linkedInLogin', profile);
            return h.redirect('https://mf-social-media-test-angaven.vercel.app/');
          }

        },
      },
    });
  },
};
