const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Order {
    id: ID!
    userId: ID!
    productId: ID!
    quantity: Int!
  }

  type Query {
    orders: [Order]
  }
`;

module.exports = typeDefs;