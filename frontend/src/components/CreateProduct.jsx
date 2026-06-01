import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      stock
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $price: Float!
    $stock: Int!
  ) {
    createProduct(
      name: $name
      price: $price
      stock: $stock
    ) {
      id
      name
      price
      stock
    }
  }
`;

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [createProduct] = useMutation(
    CREATE_PRODUCT,
    {
      refetchQueries: [
        { query: GET_PRODUCTS }
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        variables: {
          name,
          price: Number(price),
          stock: Number(stock),
        },
      });

      alert("Producto creado");

      setName("");
      setPrice("");
      setStock("");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Producto</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button type="submit">
        Crear Producto
      </button>
    </form>
  );
}

export default CreateProduct;