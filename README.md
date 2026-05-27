# GraphiQloud

Proyecto realizado con GraphQL, Apollo Federation y microservicios.

## Tecnologías utilizadas

- GraphQL
- Apollo Server
- Apollo Gateway
- Node.js
- DataLoader
- React (frontend)

---

# Arquitectura

El proyecto está dividido en varios subgraphs:

- users
- products
- orders

Todos los servicios son unidos mediante un Gateway.

---

# Estructura del proyecto

```txt
graphiqloud/
│
├── gateway/
│
├── subgraphs/
│   ├── users/
│   ├── products/
│   └── orders/
│
└── frontend/