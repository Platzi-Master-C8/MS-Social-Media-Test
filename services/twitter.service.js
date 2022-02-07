'use strict';

const { response } = require('@hapi/hapi/lib/validation');
const axios = require('axios');
const { config } = require('../config/config');

exports.plugin = {
  name: 'twitterService',
  register: async function (server, options) {
    server.method(
      'getTwitterInfo',
      async (userId) => {

        const userInfo = await axios.get(`https://api.twitter.com/2/users/${userId}?expansions=pinned_tweet_id&user.fields=created_at,name,username,protected,verified,withheld,profile_image_url,location,url,description,entities,pinned_tweet_id,public_metrics`, {
          headers: {
            Authorization: `Bearer ${config.twitterBearerToken}`,
          }
        });

        const userFollowers = await axios.get(`https://api.twitter.com/2/users/${userId}/followers`, {
          headers: {
            Authorization: `Bearer ${config.twitterBearerToken}`,
          }
        });

        const userLikedTweets = await axios.get(`https://api.twitter.com/2/users/${userId}/liked_tweets`, {
          headers: {
            Authorization: `Bearer ${config.twitterBearerToken}`,
          }
        });

        const userFollowing = await axios.get(`https://api.twitter.com/2/users/${userId}/following`, {
          headers: {
            Authorization: `Bearer ${config.twitterBearerToken}`,
          }
        });

        const userTweets = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
          headers: {
            Authorization: `Bearer ${config.twitterBearerToken}`,
          }
        });

        return {
          ...userInfo.data.data,
          followers: userFollowers.data.data || undefined,
          following: userFollowing.data.data || undefined,
          likedTweets: userLikedTweets.data.data || undefined,
          tweets: userTweets.data.data || undefined
        };
      },
      {}
    );
  },
};
