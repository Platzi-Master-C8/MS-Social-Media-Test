const authService = require('./auth.service');
const facebookService = require('./facebook.service');
const userService = require('./users.service');

const services = [
  {
    plugin: authService,
  },
  {
    plugin: facebookService,
  },
  {
    plugin: userService,
  },
];

module.exports = services;
