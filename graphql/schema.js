const { gql } = require('apollo-server-hapi');

const typeDefs = gql`

type FacebookGroup {
  name: String
  id: String
}

type FacebookGroups {
  data: [FacebookGroup]
}

type FacebookInfo {
  id: String
  name: String
  email: String
  groups: FacebookGroups
}

type Query {
  getFBInfo: FacebookInfo
}`
;

module.exports = typeDefs;
