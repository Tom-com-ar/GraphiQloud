const {
  userLoader,
  productLoader,
} = require("./loader");

const resolvers = {
  Query: {
    orders: () => orders,
  },

  Mutation: {
    createOrder: (_, { userId, productId, quantity }) => {
      console.log("Mutation ejecutada");

      const newOrder = {
        id: String(orders.length + 1),
        userId,
        productId,
        quantity,
      };

      orders.push(newOrder);

      return newOrder;
    },
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
