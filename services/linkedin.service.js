'use strict';

const axios = require('axios');

exports.plugin = {
  name: 'linkedinService',
  register: async function (server, options) {
    server.method(
      'getLinkedinInfo',
      async (token) => {
        const resp = await axios.get('https://api.linkedin.com/v2/me', {
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
