const users = [
  {
    id: "1",
    name: "Tomás",
    email: "tomas@gmail.com",
  },
  {
    id: "2",
    name: "Joaquín",
    email: "joaquin@gmail.com",
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

module.exports = resolvers;