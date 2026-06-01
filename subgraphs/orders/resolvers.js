const fs = require("fs");
const path = require("path");

const ordersFile = path.join(
  __dirname,
  "orders.json"
);

const usersFile = path.join(
  __dirname,
  "../users/users.json"
);

const productsFile = path.join(
  __dirname,
  "../products/products.json"
);

const getOrders = () => {
  return JSON.parse(
    fs.readFileSync(ordersFile, "utf8")
  );
};

const saveOrders = (orders) => {
  fs.writeFileSync(
    ordersFile,
    JSON.stringify(orders, null, 2)
  );
};

const getUsers = () => {
  return JSON.parse(
    fs.readFileSync(usersFile, "utf8")
  );
};

const getProducts = () => {
  return JSON.parse(
    fs.readFileSync(productsFile, "utf8")
  );
};

const saveProducts = (products) => {
  fs.writeFileSync(
    productsFile,
    JSON.stringify(products, null, 2)
  );
};

const resolvers = {
  Query: {
    orders: () => getOrders(),
  },

  Mutation: {
    createOrder: (
      _,
      { userId, productId, quantity }
    ) => {
      const orders = getOrders();
      const users = getUsers();
      const products = getProducts();

      const user = users.find(
        (u) => u.id === userId
      );

      if (!user) {
        throw new Error(
          "Usuario no encontrado"
        );
      }

      const product = products.find(
        (p) => p.id === productId
      );

      if (!product) {
        throw new Error(
          "Producto no encontrado"
        );
      }

      if (quantity <= 0) {
        throw new Error(
          "Cantidad inválida"
        );
      }

      if (product.stock < quantity) {
        throw new Error(
          `Stock insuficiente. Disponible: ${product.stock}`
        );
      }

      product.stock -= quantity;

      saveProducts(products);

      const newOrder = {
        id: String(orders.length + 1),
        userId,
        productId,
        quantity,
      };

      orders.push(newOrder);

      saveOrders(orders);

      return newOrder;
    },
  },

  Order: {
    user: (order) => {
      const users = getUsers();

      return (
        users.find(
          (user) => user.id === order.userId
        ) || null
      );
    },

    product: (order) => {
      const products = getProducts();

      return (
        products.find(
          (product) =>
            product.id === order.productId
        ) || null
      );
    },
  },
};

module.exports = resolvers;