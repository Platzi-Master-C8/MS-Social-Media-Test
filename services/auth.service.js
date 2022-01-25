'use strict';

const { config } = require('../config/config');
const Jwt = require('@hapi/jwt');
const axios = require('axios');

exports.plugin = {
  name: 'authService',
  register: async function (server, options) {
    await server.register(Jwt);

    /* server.method(
      'generateJWT',
      (userId, userGroup) => {
        // generate JWT for future calls to backend API
        const token = Jwt.token.generate(
          {
            aud: 'urn:audience:social',
            iss: 'urn:issuer:social',
            id: userId,
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
    ); */

    server.method(
      'getTokenAuth0',
      async (audience) => {
        const resp = await axios.post(
          'https://platzimaster.us.auth0.com/oauth/token',
          {
            client_id: config.integrationsClientID,
            client_secret: config.integrationsClientSecret,
            audience: audience,
            grant_type: 'client_credentials',
          }
        );

        return resp.data;
      },
      {}
    );

    server.method(
      'getUserInfoAuth0',
      async (userId, token) => {
        const resp = await axios.get(`https://platzimaster.us.auth0.com/api/v2/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        return resp.data;
      },
      {}
    );
  },
};
