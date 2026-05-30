import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { GET_ORDERS } from "./Orders";

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

  const [createOrder] = useMutation(
    CREATE_ORDER,
    {
      refetchQueries: [
        { query: GET_ORDERS }
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Orden</h2>

      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">
        Crear Orden
      </button>
    </form>
  );
}

export default CreateOrder;