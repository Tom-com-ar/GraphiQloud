import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_DASHBOARD = gql`
  query {
    users {
      id
    }

    products {
      id
      stock
    }

    orders {
      id
      quantity

      product {
        price
      }
    }
  }
`;

function Dashboard() {
  const { loading, error, data } =
    useQuery(GET_DASHBOARD);

  if (loading) return <p>Cargando dashboard...</p>;

  if (error) return <p>{error.message}</p>;

  const totalUsers =
    data.users.length;

  const totalProducts =
    data.products.length;

  const totalOrders =
    data.orders.length;

  const totalRevenue =
    data.orders.reduce(
      (total, order) =>
        total +
        order.quantity *
        (order.product?.price || 0),
      0
    );

  const outOfStock =
    data.products.filter(
      (product) => product.stock === 0
    ).length;

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Usuarios</h3>
        <p>{totalUsers}</p>
      </div>

      <div className="stat-card">
        <h3>Productos</h3>
        <p>{totalProducts}</p>
      </div>

      <div className="stat-card">
        <h3>Órdenes</h3>
        <p>{totalOrders}</p>
      </div>

      <div className="stat-card">
        <h3>Facturación</h3>
        <p>${totalRevenue}</p>
      </div>

      <div className="stat-card">
        <h3>Sin stock</h3>
        <p>{outOfStock}</p>
      </div>
    </div>
  );
}

export default Dashboard;