const DataLoader = require("dataloader");

const users = [
  {
    id: "1",
    name: "Tomás",
    email: "tomas@gmail.com",
  },
  {
    id: "2",
    name: "Joaquín",
    email: "joaquin@gmail.com",
  },
];

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

const userLoader = new DataLoader(async (ids) => {
  return ids.map((id) =>
    users.find((user) => user.id === id)
  );
});

const productLoader = new DataLoader(async (ids) => {
  return ids.map((id) =>
    products.find((product) => product.id === id)
  );
});

module.exports = {
  userLoader,
  productLoader,
};