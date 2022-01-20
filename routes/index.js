const facebookRouter = require('./facebook.router');
const twitterRouter = require('./twitter.router');
const linkedinRouter = require('./linkedin.router');
const authRouter = require('./auth.router');
const usersRouter = require('./users.router');

const API_VERSION = '/api/v1';

const routes = [
  {
    plugin: facebookRouter,
    routes: {
      prefix: API_VERSION
    }
  },
  {
    plugin: twitterRouter,
    routes: {
      prefix: API_VERSION
    }
  },
  {
    plugin: linkedinRouter,
    routes: {
      prefix: API_VERSION
    }
  },
  {
    plugin: authRouter,
    routes: {
      prefix: API_VERSION
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
