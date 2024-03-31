const { gql } = require('apollo-server');


const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String
  }

  type Userr {
    id: ID!
    email: String!
   
  }

  type mydata {
    id: ID!
    email: String!
  }
  type LoginResponse {
    token: String!
    user: Userr
  }
  type Mutation {
    signup(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): String!,
  }

  
  
  type Query {
    me: Userr!

  }

 
`;

module.exports = { typeDefs };


// login(email: String!, password: String!): String!,

//login(email: String!, password: String!): LoginResponse!