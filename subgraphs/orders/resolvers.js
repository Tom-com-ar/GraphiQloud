const {
  userLoader,
  productLoader,
} = require("./loader");

const orders = [
  {
    id: "1",
    userId: "1",
    productId: "1",
    quantity: 2,
  },
  {
    id: "2",
    userId: "2",
    productId: "2",
    quantity: 1,
  },
];

const resolvers = {
  Query: {
    orders: () => orders,
  },

  Order: {
    user: async (order) => {
      return userLoader.load(order.userId);
    },

    product: async (order) => {
      return productLoader.load(order.productId);
    },
  },
};

module.exports = resolvers;