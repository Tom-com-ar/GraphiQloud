const fs = require("fs");
const path = require("path");

const productsFile = path.join(
  __dirname,
  "products.json"
);

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
    products: () => getProducts(),
  },

  Mutation: {
    createProduct: (
      _,
      { name, price, stock }
    ) => {
      const products = getProducts();

      const existingProduct =
        products.find(
          (product) =>
            product.name.toLowerCase() ===
            name.toLowerCase()
        );

      if (existingProduct) {
        throw new Error(
          "Ya existe un producto con ese nombre"
        );
      }

      const newProduct = {
        id: String(products.length + 1),
        name,
        price,
        stock,
      };

      products.push(newProduct);

      saveProducts(products);

      return newProduct;
    },
  },
};

module.exports = resolvers;