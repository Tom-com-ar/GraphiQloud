import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
  ) {
    createUser(
      name: $name
      email: $email
    ) {
      id
      name
      email
    }
  }
`;

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createUser] = useMutation(
    CREATE_USER,
    {
      refetchQueries: [
        { query: GET_USERS }
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({
        variables: {
          name,
          email,
        },
      });

      alert("Usuario creado");

      setName("");
      setEmail("");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Usuario</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        Crear Usuario
      </button>
    </form>
  );
}

export default CreateUser;