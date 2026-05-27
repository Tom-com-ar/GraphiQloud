const products = [
  {
    id: "1",
    name: "Mouse Gamer",
    price: 25000,
    stock: 12,
  },
  {
    id: "2",
    name: "Teclado Mecánico",
    price: 80000,
    stock: 5,
  },
];

const resolvers = {
  Query: {
    products: () => products,
  },
};

module.exports = resolvers;