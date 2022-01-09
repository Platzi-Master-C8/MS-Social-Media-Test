'use strict';

// const { config } = require('../config/config');
const Wreck = require('@hapi/wreck');

exports.plugin = {
  name: 'facebookService',
  register: async function (server, options) {
    server.method(
      'getFacebookInfo',
      async (userId) => {
        const wreck = Wreck.defaults({
          headers: {
            Authorization:
              'Bearer EAAWGTtDCJ8EBAIohsThCxg9ynsmOYPNwqSh4BsSD3w4TjaOfguUiHH5RjcByIe3Q9B7YrL3oCe4gOsl54JKSOVf4OjELfuJGXaZBpoNR1hAcZANmnxPHsJL7AthlsIzBbk1dAXu55bcjjpgZBQF0wdgOh4BW9GqAswcUHu8czD5a1nW7b3ACeSivCfnSMrusmQl5IDdvQliOcT2lQtDJMIjPo8QMaZAcfiG80q34wODxzeFpNU8gGHllmZBpvTGIZD',
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
