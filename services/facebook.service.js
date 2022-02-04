'use strict';

const axios = require('axios');

exports.plugin = {
  name: 'facebookService',
  register: async function (server, options) {
    server.method(
      'getFacebookInfo',
      async (token, userProfile) => {
        const {email, name, picture, user_id } = userProfile;

        const resp = await axios.get('https://graph.facebook.com/me?fields=email,birthday,gender,name,groups{name},likes,events,picture', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const {
          birthday, 
          languages, 
          about, 
          education, 
          works, 
          groups, 
          last_work, 
          member_since, 
          follow_people, 
          follow_pages, 
          followers, 
          website,
          nationality,
          current_location,
          gender,
          contacts
        } = resp.data;

        return {
          email, 
          name, 
          picture, 
          user_id,
          birthday, 
          languages, 
          about, 
          education, 
          works, 
          groups, 
          last_work, 
          member_since, 
          follow_people, 
          follow_pages, 
          followers, 
          website,
          nationality,
          current_location,
          gender,
          contacts
        };
      },
      {}
    );
  },
};
