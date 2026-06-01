import CreateUser from "./components/CreateUser";
import CreateProduct from "./components/CreateProduct";
import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";

function App() {
  return (
    <div className="container">
      <h1 className="title">GraphiQloud</h1>

      <p className="subtitle">
        Plataforma de gestión de órdenes utilizando GraphQL,
        Apollo Federation y React.
      </p>

      <div className="card">
        <CreateUser />
      </div>

      <div className="card">
        <CreateProduct />
      </div>

      <div className="card">
        <CreateOrder />
      </div>

      <Orders />
    </div>
  );
}

export default App;