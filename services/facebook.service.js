'use strict';

// const { config } = require('../config/config');
const Wreck = require('@hapi/wreck');

exports.plugin = {
  name: 'facebookService',
  register: async function (server, options) {
    server.method(
      'getFacebookInfo',
      async (token) => {
        const wreck = Wreck.defaults({
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

        const res = await wreck.request(
          'GET',
          'https://graph.facebook.com/me',
          {}
        );
        const body = await Wreck.read(res, {});
        return JSON.parse(body.toString());
      },
      {}
    );
  },
};
