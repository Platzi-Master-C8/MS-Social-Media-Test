const authService = require('./auth.service');
const facebookService = require('./facebook.service');
const linkedinService = require('./linkedin.service');
const userService = require('./users.service');

const services = [
  {
    plugin: authService,
  },
  {
    plugin: facebookService,
  },
  {
    plugin: linkedinService,
  },
  {
    plugin: userService,
  },
];

module.exports = services;
