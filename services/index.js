const authService = require('./auth.service');
const facebookService = require('./facebook.service');

const services = [
  {
    plugin: authService,
  },
  {
    plugin: facebookService,
  },
];

module.exports = services;
