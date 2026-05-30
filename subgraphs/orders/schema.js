const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type Order {
    id: ID!
    userId: ID!
    productId: ID!
    quantity: Int!

    user: User
    product: Product
  }

  type Query {
    orders: [Order]
  }

  type Mutation {
    createOrder(
      userId: ID!
      productId: ID!
      quantity: Int!
    ): Order
  }
`;

module.exports = typeDefs;