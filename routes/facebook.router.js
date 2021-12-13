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
      isSecure: false,
      clientId: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
      location: server.info.uri
      // location: 'https://ms-social-media.vercel.app/',
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
            return request.auth;
          }

          // console.log(request.auth.credentials);

          // Perform any account lookup or registration, setup local session,
          // and redirect to the application. The third-party credentials are
          // stored in request.auth.credentials. Any query parameters from
          // the initial request are passed back via request.auth.credentials.query.

          return h.redirect('/home');
        },
      },
    });
  },
};
