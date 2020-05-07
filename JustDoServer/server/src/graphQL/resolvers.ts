export const UserController = require("../controllers/UserController");
export const TaskController = require("../controllers/TaskController");

export const resolvers = {
  Query: {
    users: () => UserController.getAllUsers(),
    user: (parent, { id }) => UserController.getUserById(id),

    tasks: () => TaskController.getAllTask(),
    task: (parent, { id }, context) => TaskController.getTaskById(id, context),
    getTaskByUserId: (parent, { user_id }, context) =>
      TaskController.getTaskByUserId(user_id, context),
  },
  Mutation: {
    deleteUser: (parent, { id }) => UserController.deleteUser(id),
    updateUser: (parent, { id, email, password }) =>
      UserController.updateUser(id, password, email),
    addUser: (parent, { email, password }) =>
      UserController.createUser(email, password),
    passwordRestore: (parent, { id, password, token }) =>
      UserController.passwordRestore(id, password, token),
    login: (parent, { email, password }) =>
      UserController.login(email, password),
    sendEmailPasswordRestore: (parent, { email }, context) =>
      UserController.sendEmailPasswordRestore(email, context),

    addTask: (parent, args, context) =>
      TaskController.createTask(args, context),
    updateTask: (parent, args, context) =>
      TaskController.updateTask(args, context),
    deleteTask: (parent, { id }, context) =>
      TaskController.deleteTask(id, context),
  },
};
