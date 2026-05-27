const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type Query {
    products: [Product]
  }
`;

module.exports = typeDefs;