const fs = require("fs");
const path = require("path");

const usersFile = path.join(
  __dirname,
  "users.json"
);

const getUsers = () => {
  return JSON.parse(
    fs.readFileSync(usersFile, "utf8")
  );
};

const saveUsers = (users) => {
  fs.writeFileSync(
    usersFile,
    JSON.stringify(users, null, 2)
  );
};

const resolvers = {
  Query: {
    users: () => getUsers(),
  },

  Mutation: {
    createUser: (_, { name, email }) => {
      const users = getUsers();

      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() ===
          email.toLowerCase()
      );

      if (existingUser) {
        throw new Error(
          "Ya existe un usuario con ese email"
        );
      }

      const newUser = {
        id: String(users.length + 1),
        name,
        email,
      };

      users.push(newUser);

      saveUsers(users);

      return newUser;
    },
  },
};

module.exports = resolvers;