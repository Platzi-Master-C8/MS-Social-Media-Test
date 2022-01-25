'use strict';

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
          'https://graph.facebook.com/me?fields=email,birthday,gender,name,groups{name},likes,events,picture',
          {}
        );
        const body = await Wreck.read(res, {});
        return JSON.parse(body.toString());
      },
      {}
    );
  },
};
