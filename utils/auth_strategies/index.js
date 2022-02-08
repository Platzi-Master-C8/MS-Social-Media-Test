'use strict';

const { config } = require('../../config/config');

exports.plugin = {
  name: 'authStrategies',
  register: async function (server, options) {
    /* server.auth.strategy('facebook', 'bell', {
      provider: 'facebook',
      password: 'cookie_encryption_password_secure',
      isSecure: true,
      clientId: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
      location: 'https://ms-social-media.vercel.app',
      // location: 'https://f987-200-68-167-242.ngrok.io',
    });

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

      server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'cookie_encryption_password_secure',
        isSecure: true,
        clientId: config.twitterClientID,
        clientSecret: config.twitterClientSecret,
        location: 'https://ms-social-media.vercel.app',
      }); */

    server.auth.strategy('auth0_jwt', 'jwt', {
      keys: {
        uri: config.jwksUri,
      },
      verify: {
        aud: config.jwtAud,
        iss: config.jwtIss,
        sub: false,
      },
      validate: async (artifacts, request, h) => {
        // Get user id from Auth0 JWT payload
        const id = artifacts.decoded.payload.sub;

        // Get token from Auth0 to call management API
        try {
          const token = await server.methods.getTokenAuth0(config.jwtAud);
          // console.log(token);

          // Get userInfo from Auth0
          const userInfo = await server.methods.getUserInfoAuth0(
            id,
            token.access_token
          );

          // Update database with user info
          await server.methods.updateUser(userInfo);

          return {
            isValid: true,
            credentials: { user: userInfo },
          };
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    });

    server.auth.default('auth0_jwt');
  },
};
