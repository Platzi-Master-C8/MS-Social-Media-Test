'use strict';

const { config } = require('../config/config');
const Jwt = require('@hapi/jwt');

exports.plugin = {
  name: 'authService',
  register: async function (server, options) {
    server.method(
      'generateJWT',
      (userId, userGroup) => {
        // generate JWT for future calls to backend API
        const token = Jwt.token.generate(
          {
            aud: 'urn:audience:social',
            iss: 'urn:issuer:social',
            user: userId,
            group: userGroup,
          },
          {
            key: config.jwtKey,
          },
          {
            ttlSec: 3600, // 1 hour
          }
        );

        return token;
      },
      {}
    );
  },
};
