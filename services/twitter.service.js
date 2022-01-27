'use strict';

const axios = require('axios');
const { config } = require('../config/config');

exports.plugin = {
  name: 'twitterService',
  register: async function (server, options) {
    server.method(
      'getTwitterInfo',
      async (userId) => {
        const resp = await axios.get(`https://api.twitter.com/2/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${config.twitterBearerToken}`,
          }
        });

        return resp.data;
      },
      {}
    );
  },
};
