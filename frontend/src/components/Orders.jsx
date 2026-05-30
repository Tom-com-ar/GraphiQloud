import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const GET_ORDERS = gql`
  query GetOrders {
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
            <h2 style={{ marginBottom: "20px" }}>
                Órdenes Registradas
            </h2>

            <div className="orders-grid">
                {data?.orders?.map((order) => (
                    <div
                        key={order.id}
                        className="order-card"
                    >
                        <h3>Orden #{order.id}</h3>

                        <p>
                            <strong>Usuario:</strong>{" "}
                            {order.user?.name || "No encontrado"}
                        </p>

                        <p>
                            <strong>Producto:</strong>{" "}
                            {order.product?.name || "No encontrado"}
                        </p>

                        <p>
                            <strong>Precio:</strong> $
                            {order.product?.price || 0}
                        </p>

                        <p>
                            <strong>Cantidad:</strong>{" "}
                            {order.quantity}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );  
}

export default Orders;