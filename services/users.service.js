'use strict';

// const { config } = require('../config/config');
const pool = require('../libs/postgres.pool');
const { faker } = require('@faker-js/faker');

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
        const query = `SELECT * FROM users where id = '${id}'`;
        const resp = await pool.query(query);
        return resp.rows;
      },
      {}
    );

    server.method(
      'updateUser',
      async ({ user_id, name, email, birthday, identities }) => {
        const identity = identities.find(
          (identity) => identity.connection === 'facebook'
        );
        const profileData = identity ? identity.profileData : null;

        const bidy = birthday || (profileData ? profileData.birthday : null);
        // const gen = gender || (profileData ? profileData.gender : null);

        const query = `INSERT INTO users (id, name, email, date_of_birth)
        values (
          '${user_id}', 
          '${name}', 
          ${email ? `'${email}'` : null}, 
          ${bidy ? `'${bidy}'` : null}
          )
          ON CONFLICT (id) DO UPDATE
          SET name = '${name}', 
          email = ${email ? `'${email}'` : null},
          date_of_birth = ${bidy ? `'${bidy}'` : null}`;

        await pool.query(query);

        return user_id;
      },
      {}
    );

    server.method(
      'generateCustomInfo',
      (userId) => {
        return {
          email: faker.internet.email(),
          birthday: faker.date.past(30),
          name: faker.name.findName(),
          picture: faker.image.imageUrl(),
          user_id: userId,
          languages: 'Inglés B2',
          about: faker.name.jobDescriptor(),
          education: [
            {
              institute: '',
              time_period: '1985-1995',
              country: 'Mexico',
            },
          ],
          works: [
            {
              id: 1,
              company: '',
              position: '',
              description: '',
              time_period: '1985-1995',
              city: 'Mexico',
            },
            {
              id: 2,
              company: '',
              position: '',
              description: '',
              time_period: '1985-1995',
              city: 'Mexico',
            },
          ],
          groups: [
            {
              id: '1',
              name: '',
              description: '',
              followers: '',
              state: 'public',
            },
            {
              id: '2',
              name: '',
              description: '',
              followers: '',
              state: 'public',
            },
          ],
          last_work: 2,
          member_since: faker.date.past(10),
          follow_people: 245,
          follow_pages: [
            {
              id: 1,
              name: '',
            },
            {
              id: 2,
              name: '',
            },
          ],
          followers: 2002,
          website: '',
          nationality: 'Mexico',
          current_location: 'Mexico',
          gender: 'male',
          contacts: '',
        };
      },
      {}
    );

    server.method(
      'getCustomInfo',
      async (id) => {
        const query = `SELECT highlight_info FROM user_highlights where user_id = '${id}'`;
        const resp = await pool.query(query);
        if (resp.rowCount > 0) {
          return JSON.parse(resp.rows[0].highlight_info);
        }

        return resp.rows;
      },
      {}
    );

    server.method(
      'saveCustomInfo',
      async (userId, customInfo) => {
        const info = JSON.stringify(customInfo);

        const resp = await pool.query(
          `SELECT id FROM user_highlights WHERE user_id = '${userId}'`
        );
        if (resp.rowCount > 0) {
          const query = `UPDATE user_highlights SET highlight_info = '${info}' WHERE user_id = '${userId}'`;
          await pool.query(query);
        } else {
          const resp = await pool.query(
            `SELECT MAX(id) as id FROM user_highlights`
          );
          const id = resp.rowCount > 0 ? resp.rows[0].id+1 : 1;

          const query = `INSERT INTO user_highlights (id, user_id, highlight_info)
          values (
            ${id},
            '${userId}', 
            '${info}'
            )`;

          await pool.query(query);
        }

        return {id: userId};
      },
      {}
    );
  },
};
