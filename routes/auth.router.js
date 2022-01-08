'use strict';

const { config } = require('../config/config');
const Jwt = require('@hapi/jwt');

exports.plugin = {
  name: 'auth',
  register: async function (server, options) {
    await server.register(Jwt);

    server.auth.strategy('my_jwt_strategy', 'jwt', {
      keys: config.jwtKey,
      verify: {
        aud: 'urn:audience:social',
        iss: 'urn:issuer:social',
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 3600, // 1 hour
        timeSkewSec: 15,
      },
      validate: (artifacts, request, h) => {
        console.log(artifacts.decoded.payload);
        return {
          isValid: true,
          // credentials: { user: artifacts.decoded.payload.user }
        };
      },
    });

    server.auth.default('my_jwt_strategy');

    server.route({
      method: 'POST',
      path: '/adminLogin',
      options: {
        auth: false,
        handler: (request, h) => {

          //Check if user is actually a valid user in DB and password is valid


          const token = server.methods.generateJWT('1', 'admin');
          return {accessToken: token};
        },
      },
    });
  },
};
