'use strict';

const { config } = require('../config/config');
const Jwt = require('@hapi/jwt');

const Wreck = require('@hapi/wreck');
const { user } = require('pg/lib/defaults');

exports.plugin = {
  name: 'authService',
  register: async function (server, options) {
    await server.register(Jwt);

    // auth strategy
    server.auth.strategy('auth0_jwt', 'jwt', {
      keys: {
        uri: 'https://platzimaster.us.auth0.com/.well-known/jwks.json',
      },
      verify: {
        aud: 'https://platzimaster.us.auth0.com/api/v2/',
        iss: 'https://platzimaster.us.auth0.com/',
        sub: false,
      },
      validate: async (artifacts, request, h) => {
        // Get user id from Auth0 JWT payload
        const id = artifacts.decoded.payload.sub;

        // Get token from Auth0 to call management API
        const wreck = Wreck.defaults({
          headers: {
            'content-type': 'application/json',
          },
        });

        let res;

        res = await wreck.request(
          'POST',
          'https://platzimaster.us.auth0.com/oauth/token',
          {
            payload: {
              client_id: config.integrationsClientID,
              client_secret: config.integrationsClientSecret,
              audience: artifacts.decoded.payload.aud,
              grant_type: 'client_credentials',
            },
          }
        );

        const body = await Wreck.read(res, {});
        const token = JSON.parse(body.toString());

        // Get userInfo from Auth0
        const {resp, payload} = await Wreck.get(
          `https://platzimaster.us.auth0.com/api/v2/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`
            },
          }
        );

        const userInfo = payload.toString();

        // Update database with user info


        return {
          isValid: true,
          credentials: { user: JSON.parse(userInfo) },
        };

      },
    });

    server.auth.default('auth0_jwt');

    server.method(
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
    );
  },
};
