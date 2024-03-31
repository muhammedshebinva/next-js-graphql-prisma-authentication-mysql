const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String
  }

  type mydata {
    id: ID!
    email: String!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): String!,
  }

  type Query {
    me: User
    getUserData(token: String!): mydata
  }

 
`;

module.exports = { typeDefs };
