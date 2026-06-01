# GraphiQloud

## Descripción

GraphiQloud es una aplicación web desarrollada para la gestión de usuarios, productos y órdenes utilizando una arquitectura basada en GraphQL y Apollo Federation.

El proyecto implementa una arquitectura de microservicios mediante subgraphs independientes conectados a través de un Apollo Gateway, permitiendo una organización modular y escalable del sistema.

---

# Tecnologías Utilizadas

## Frontend

* React
* Apollo Client
* CSS

## Backend

* Node.js
* GraphQL
* Apollo Server
* Apollo Gateway
* Apollo Federation

## Persistencia

* Archivos JSON

---

# Arquitectura

```txt
Frontend React
        │
        ▼
Apollo Gateway
        │
 ┌──────┼──────┐
 ▼      ▼      ▼
Users Products Orders
```

### Gateway

Centraliza todas las consultas GraphQL y distribuye las solicitudes a los distintos subgraphs.

### Users Subgraph

Gestiona toda la información relacionada con usuarios.

Funciones:

* Consultar usuarios
* Crear usuarios
* Validar correos electrónicos duplicados

### Products Subgraph

Gestiona el catálogo de productos.

Funciones:

* Consultar productos
* Crear productos
* Validar nombres duplicados
* Gestionar stock

### Orders Subgraph

Gestiona las órdenes realizadas.

Funciones:

* Consultar órdenes
* Crear órdenes
* Relacionar usuarios y productos
* Validar stock disponible

---

# Funcionalidades Implementadas

## Gestión de Usuarios

* Crear usuarios
* Consultar usuarios
* Validación de email único

## Gestión de Productos

* Crear productos
* Consultar productos
* Validación de nombre único
* Gestión de stock

## Gestión de Órdenes

* Crear órdenes
* Consultar órdenes
* Asociación entre usuarios y productos
* Validación de stock
* Descuento automático de stock

## Dashboard

Visualización de estadísticas generales:

* Total de usuarios registrados
* Total de productos registrados
* Total de órdenes realizadas
* Facturación total
* Productos sin stock

---

# Persistencia de Datos

La información se almacena mediante archivos JSON.

Archivos utilizados:

```txt
subgraphs/users/users.json
subgraphs/products/products.json
subgraphs/orders/orders.json
```

Esto permite conservar los datos incluso después de reiniciar los servidores.

---

# Validaciones Implementadas

### Usuarios

* No permite correos electrónicos duplicados.

### Productos

* No permite nombres de productos duplicados.

### Órdenes

* Verifica que exista el usuario.
* Verifica que exista el producto.
* Verifica que la cantidad sea válida.
* Verifica disponibilidad de stock.

---

# Actualización Automática

Apollo Client utiliza:

```javascript
refetchQueries
```

para actualizar automáticamente la información mostrada en la interfaz después de crear usuarios, productos u órdenes.

No es necesario recargar manualmente la página.

---

# Estructura del Proyecto

```txt
GraphiQloud
│
├── frontend
│   ├── src
│   │   ├── components
│   │   └── App.jsx
│
├── gateway
│
└── subgraphs
    ├── users
    │   ├── schema.js
    │   ├── resolvers.js
    │   └── users.json
    │
    ├── products
    │   ├── schema.js
    │   ├── resolvers.js
    │   └── products.json
    │
    └── orders
        ├── schema.js
        ├── resolvers.js
        └── orders.json
```

---

# Ejecución del Proyecto

## Iniciar Subgraph Users

```bash
node subgraphs/users/index.js
```

## Iniciar Subgraph Products

```bash
node subgraphs/products/index.js
```

## Iniciar Subgraph Orders

```bash
node subgraphs/orders/index.js
```

## Iniciar Gateway

```bash
node gateway/index.js
```

## Iniciar Frontend

```bash
npm run dev
```

---

# Estado Actual

* Apollo Federation implementado
* Gateway funcional
* Persistencia en JSON
* Dashboard de estadísticas
* Gestión de usuarios
* Gestión de productos
* Gestión de órdenes
* Validaciones de negocio
* Actualización automática de datos

---

# Próximas Mejoras

* CRUD completo de productos
* CRUD completo de usuarios
* Eliminación de órdenes
* Dashboard con gráficos
* Sistema de autenticación
* Búsquedas y filtros
* Diseño responsive

---