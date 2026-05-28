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
};

module.exports = resolvers;