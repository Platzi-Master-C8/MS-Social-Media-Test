'use strict';

// const { config } = require('../config/config');
const pool = require('../libs/postgres.pool');

exports.plugin = {
  name: 'userService',
  register: async function (server, options) {
    pool.on('error', (err) => console.error(err));

    server.method(
      'createUser',
      (data) => {
        console.log(data);
        return data;
      },
      {}
    );

    server.method(
      'findUsers',
      async () => {
        const query = 'SELECT * FROM users';
        const resp = await pool.query(query);
        return resp.rows;
      },
      {}
    );

    server.method(
      'findUser',
      async (id) => {
        const query = `SELECT * FROM users where id = ${id}`;
        const resp = await pool.query(query);
        return resp.rows;
      },
      {}
    );
  },
};
