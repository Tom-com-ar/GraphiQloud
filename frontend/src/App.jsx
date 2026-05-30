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
        <CreateOrder />
      </div>

      <Orders />
    </div>
  );
}

export default App;