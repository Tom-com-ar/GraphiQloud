import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_ORDERS = gql`
  query {
    orders {
      id
      quantity

      user {
        name
      }

      product {
        name
        price
      }
    }
  }
`;

function Orders() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Órdenes</h2>

      {data.orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Orden #{order.id}</p>
          <p>Usuario: {order.user.name}</p>
          <p>Producto: {order.product.name}</p>
          <p>Cantidad: {order.quantity}</p>
          <p>Precio: ${order.product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;