'use strict';

// const { config } = require('../config/config');
const pool = require('../libs/postgres.pool');

exports.plugin = {
  name: 'userService',
  register: async function (server, options) {
    pool.on('error', (err) => console.error(err));

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

    server.method(
      'updateUser',
      async ({user_id, name, email, birthday, gender, identities}) => {
        const { profileData } = identities.find(identity => identity.connection === 'facebook');

        const bidy = `'${birthday}'` || (profileData ? `'${profileData.birthday}'` : null);
        const gen = `'${gender}'` || (profileData ? `'${profileData.gender}'` : null);

        const query = `INSERT INTO users (id, name, email, date_of_birth, gender)
        values (
          0, 
          '${name}', 
          ${email ? "'" + email + "'" : null}, 
          ${bidy}, 
          ${gen}
          )
          ON CONFLICT (id) DO UPDATE
          SET name = '${name}', 
          email = ${email ? "'" + email + "'" : null},
          date_of_birth = ${bidy},
          gender = ${gen}`;

        await pool.query(query);

        return user_id;
      },
      {}
    );
  },
};
