'use strict';

const axios = require('axios');

exports.plugin = {
  name: 'facebookService',
  register: async function (server, options) {
    server.method(
      'getFacebookInfo',
      async (token) => {
        const resp = await axios.get('https://graph.facebook.com/me?fields=email,birthday,gender,name,groups{name},likes,events,picture', {
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
