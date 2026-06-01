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

  type Mutation {
    createProduct(
      name: String!
      price: Float!
      stock: Int!
    ): Product
  }
`;

module.exports = typeDefs;