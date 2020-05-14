const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");

export const resolvers = {
  Query: {
    tasks: () => TaskController.getAllTask(),
    task: (parent, { id }, context) => TaskController.getTaskById(id, context),
    getTaskByUserId: (parent, { userId: userId }, context) =>
      TaskController.getTaskByUserId(parseInt(userId), context),
  },
  Mutation: {
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
