'use strict';

const axios = require('axios');

exports.plugin = {
  name: 'facebookService',
  register: async function (server, options) {
    server.method(
      'getFacebookInfo',
      async (token, userProfile) => {
        const {email, name, user_id, identities, picture_large } = userProfile;
        const { profileData } = identities.find(identity => identity.connection === 'facebook');

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
          contacts,
          picture
        } = resp.data;

        return {
          email, 
          name, 
          picture: picture.data.url, 
          picture_large: user_id.includes('facebook') ? picture_large : profileData.picture_large,
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
