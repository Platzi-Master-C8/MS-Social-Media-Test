const facebookRouter = require('./facebook.router');
const twitterRouter = require('./twitter.router');
const linkedinRouter = require('./linkedin.router');
const usersRouter = require('./users.router');

const API_VERSION = '/api/v1';

const routes = [
  {
    plugin: facebookRouter,
    routes: {
      prefix: `${API_VERSION}/facebook`
    }
  },
  {
    plugin: twitterRouter,
    routes: {
      prefix: `${API_VERSION}/twitter`
    }
  },
  {
    plugin: linkedinRouter,
    routes: {
      prefix: `${API_VERSION}/linkedin`
    }
  },
  {
    plugin: usersRouter,
    routes: {
      prefix: `${API_VERSION}/users`
    }
  }
];

module.exports = routes;
