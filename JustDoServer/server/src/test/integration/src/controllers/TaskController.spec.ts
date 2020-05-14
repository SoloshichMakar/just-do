import {
  host,
  email,
  password,
  newEmail,
} from "../../utils/constants";
import { GraphQLClient, request } from "graphql-request";
import { createTypeOrmConnection } from "../../../../utils/createTypeOrmConnection";
import { getRepository } from "typeorm";
import { Task } from "../../../../entities/Task";
import {
  mutationAddUser,
  mutationAddTask,
  mutationDeleteTask,
  mutationLogIn,
  mutationUpdateTask,
  queryGetAllTask,
  queryGetTaskById,
  queryGetTaskByUserId,
} from "../../utils/mutations";
const TaskController = require("../../../../controllers/TaskController");
const UserController = require("../../../../controllers/UserController");

let connection;

const updatedData = {
  id: 1,
  name: "To do update",
  description: "do some updated node",
};

const addTask = {
  name: "To do",
  description: "do some",
  due_date: "21:00 21-05-2020",
  priority: "average",
  notification_date: "20:30 21-05-2020",
  userId: "1",
};

const createNewTestUser = async () => {
  await UserController.createUser(newEmail, password);
  const loginData = await UserController.login(newEmail, password);
  const context = {
    req: {
      req: { headers: { token: loginData.token } },
    },
  };
  return context;
};

describe("Testing mocking client requests with task module", () => {
  beforeEach(async () => {
    connection = await createTypeOrmConnection();
    await request(host, mutationAddUser);
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    await client.request(mutationAddTask);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("should create Task", async () => {
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    const data = await client.request(mutationAddTask);
    expect(addTask).toEqual(data.addTask);
  });

  test("should update task", async () => {
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    const data = await client.request(mutationAddTask);
    expect(addTask).toEqual(data.addTask);

    await client.request(mutationUpdateTask);
    const task = await getRepository(Task).findOne(1);
    expect(task.name).toEqual("To do update");
    expect(task.description).toEqual("do some updated");
  });

  test("should get all task", async () => {
    let tasks = await request(host, queryGetAllTask);
    expect(tasks.tasks.length).toEqual(1);
  });

  test("should get task by id", async () => {
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    await client.request(mutationAddTask);
    const data = await client.request(queryGetTaskById);
    expect(data.task.name).toEqual("To do");
  });

  test("should get task by user id", async () => {
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    await client.request(mutationAddTask);
    const data = await client.request(queryGetTaskByUserId);
    expect(data.getTaskByUserId[0].name).toEqual("To do");
  });

  test("should delete task", async () => {
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    await client.request(mutationAddTask);
    const data = await client.request(mutationDeleteTask);
    expect(data.deleteTask.name).toEqual("To do");
  });
});

describe("Task controller tests", () => {
  let context;

  beforeEach(async () => {
    connection = await createTypeOrmConnection();
    await request(host, mutationAddUser);
    let response = await request(host, mutationLogIn);
    const client = new GraphQLClient(host, {
      headers: { token: response.login.token },
    });
    context = {
      req: {
        req: { headers: { token: response.login.token } },
      },
    };
    await client.request(mutationAddTask);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("should create task", async () => {
    let response = await request(host, mutationLogIn);
    expect(response.login.user.email).toEqual(email);
    expect(response.login.token).not.toEqual("");
    const data = await TaskController.createTask(addTask, context);
    expect(addTask.name).toEqual(data.name);
  });

  test("should throw an error when creating task, but losing connection to database", async () => {
    let response = await request(host, mutationLogIn);
    expect(response.login.user.email).toEqual(email);
    expect(response.login.token).not.toEqual("");
    await connection.close();
    const data = await TaskController.createTask(addTask, context);
    expect(data.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });

  test("should update task", async () => {
    await TaskController.updateTask(updatedData, context);
    const task = await getRepository(Task).findOne(1);
    expect(task.name).toEqual("To do update");
    expect(task.description).toEqual("do some updated node");
  });

  test("should return an error when update task, but user id is incorrect", async () => {
    context = await createNewTestUser();
    const response = await TaskController.updateTask(updatedData, context);
    expect(response.message).toEqual("Permission denied");
  });

  test("should return an error when update task, but losing connection to database", async () => {
    await connection.close();
    const response = await TaskController.updateTask(updatedData, context);
    expect(response.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });

  test("should get all task", async () => {
    let tasks = await TaskController.getAllTask();
    expect(tasks.length).toEqual(1);
  });

  test("should return error then get tasks, but losing connection to database ", async () => {
    await connection.close();
    let response = await TaskController.getAllTask();
    expect(response.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });

  test("should get task by id", async () => {
    const data = await TaskController.getTaskById(1, context);
    expect(data.name).toEqual("To do");
  });

  test("should return error when get task by id, but losing connection to database", async () => {
    await connection.close();
    const response = await TaskController.getTaskById(1, context);
    expect(response.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });

  test("should get task by user id", async () => {
    const data = await TaskController.getTaskByUserId(1, context);
    expect(data[0].name).toEqual("To do");
  });

  test("should return error when get task by user id, but user id is incorrect", async () => {
    context = await createNewTestUser();
    const response = await TaskController.getTaskByUserId(1, context);
    expect(response.message).toEqual("Permission denied");
  });

  test("should return error when get task by user id, but losing connection to database", async () => {
    await connection.close();
    const response = await TaskController.getTaskByUserId(1, context);
    expect(response.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });

  test("should delete task", async () => {
    const data = await TaskController.deleteTask(1, context);
    expect(data.name).toEqual("To do");
  });

  test("should return error when delete task, but user id is incorrect", async () => {
    context = await createNewTestUser();
    const response = await TaskController.deleteTask(1, context);
    expect(response.message).toEqual("Permission denied");
  });

  test("should return error when delete task, but losing connection to database", async () => {
    await connection.close();
    const response = await TaskController.deleteTask(2, context);
    expect(response.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });
});
