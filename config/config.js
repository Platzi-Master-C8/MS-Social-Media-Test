require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  facebookClientID: process.env.FACEBOOK_CLIENTID,
  facebookClientSecret: process.env.FACEBOOK_CLIENTSECRET,
  twitterClientID: process.env.TWITTER_CLIENTID,
  twitterClientSecret: process.env.TWITTER_CLIENTSECRET,
  linkedInClientID: process.env.LINKEDIN_CLIENTID,
  linkedInClientSecret: process.env.LINKEDIN_CLIENTSECRET,
  integrationsClientID: process.env.INTEGRATIONS_CLIENTID,
  integrationsClientSecret: process.env.INTEGRATIONS_CLIENTSECRET,
  jwtKey: process.env.JWT_KEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
};

module.exports = { config };
