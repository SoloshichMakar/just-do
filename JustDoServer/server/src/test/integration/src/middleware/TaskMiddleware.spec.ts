import { email, host } from "../../utils/constants";
import { createTypeOrmConnection } from "../../../../utils/createTypeOrmConnection";
import { request } from "graphql-request";
import {mutationAddUser} from "../../utils/mutations";
const TaskMiddlewareTest = require("../../../../middleware/TaskMiddleware");

let connection;

const argsCreate = {
  name: "To do",
  description: "Sample desc",
  userId: 1,
};

const argsUpdate = {
  description: "Sample desc",
  completed: true,
};

describe("User controller tests for Jest", () => {
  beforeEach(async () => {
    connection = await createTypeOrmConnection();
    await request(host, mutationAddUser);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("Create validation", async () => {
    const response = await TaskMiddlewareTest.taskCreateValidation(argsCreate);
    expect(response).toEqual(true);
  });

  test("Create validation error", async () => {
    await expect(() =>
      TaskMiddlewareTest.taskCreateValidation({
        name: "",
        description: "",
        userId: 1,
      })
    ).toThrow("Invalid task");
  });

  test("Update validation", async () => {
    const response = await TaskMiddlewareTest.taskUpdateValidation(argsUpdate);
    expect(response).toEqual(true);
  });
});
