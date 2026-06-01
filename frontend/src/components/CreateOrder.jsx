import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";
import { GET_ORDERS } from "./Orders";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

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

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $userId: ID!
    $productId: ID!
    $quantity: Int!
  ) {
    createOrder(
      userId: $userId
      productId: $productId
      quantity: $quantity
    ) {
      id
      quantity
    }
  }
`;

function CreateOrder() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const { data: usersData } = useQuery(GET_USERS);
  const { data: productsData } = useQuery(GET_PRODUCTS);

  const [createOrder] = useMutation(
  CREATE_ORDER,
  {
    refetchQueries: [
      { query: GET_ORDERS },
      { query: GET_PRODUCTS }
    ],
    awaitRefetchQueries: true,
  }
);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Seleccione un usuario");
      return;
    }

    if (!productId) {
      alert("Seleccione un producto");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("Ingrese una cantidad válida");
      return;
    }

    try {
      await createOrder({
        variables: {
          userId,
          productId,
          quantity: Number(quantity),
        },
      });

      alert("Orden creada");

      setUserId("");
      setProductId("");
      setQuantity("");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Orden</h2>

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">
          Seleccionar usuario
        </option>

        {usersData?.users?.map((user) => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      >
        <option value="">
          Seleccionar producto
        </option>

        {productsData?.products?.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.name} - ${product.price} - Stock: {product.stock}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="number"
        min="1"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">
        Crear Orden
      </button>
    </form>
  );
}

export default CreateOrder;