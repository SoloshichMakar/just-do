import { email, host, password } from "../../utils/constants";
import { createTypeOrmConnection } from "../../../../utils/createTypeOrmConnection";
import { request } from "graphql-request";
import {mutationAddUser} from "../../utils/mutations";
const UserMiddlewareTest = require("../../../../middleware/UserMiddleware");

let connection;

describe("User controller tests for Jest", () => {
  beforeEach(async () => {
    connection = await createTypeOrmConnection();
    await request(host, mutationAddUser);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("Create validation", async () => {
    const response = await UserMiddlewareTest.userCreateValidation({
      email: "sample@mail.com",
      password: "123456@EE",
    });
    expect(response).toEqual(true);
  });

  test("Create validation error", async () => {
    expect(() =>
      UserMiddlewareTest.userCreateValidation({ email, password }).toThrow(
        `user ${email} already exists`
      )
    );
  });

  test("Create validation error", async () => {
    expect(() =>
      UserMiddlewareTest.userCreateValidation({
        email: "asdadsasd",
        password,
      }).toThrow(`Invalid query`)
    );
  });

  test("Update validation", async () => {
    const response = await UserMiddlewareTest.userUpdateValidation({
      email: "sample@mail.com",
      password: "123456@EE",
    });
    expect(response).toEqual(true);
  });
});
