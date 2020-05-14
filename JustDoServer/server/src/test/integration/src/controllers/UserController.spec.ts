import {
  host,
  email,
  password,
  userId,
  newEmail,
} from "../../utils/constants";
import { request } from "graphql-request";
import { createTypeOrmConnection } from "../../../../utils/createTypeOrmConnection";
import { User } from "../../../../entities/User";
import {
  mutationAddUser,
  mutationLogIn,
  mutationSendMessageToRedis,
} from "../../utils/mutations";
const jwt = require("jsonwebtoken");
const UserController = require("../../../../controllers/UserController");
let redis = require("redis-mock");


interface IUser {
  id: number;
  email: string;
  password: string;
  createdAt: string;
}

let connection;

describe("Testing mocking client requests with user module", () => {
  beforeEach(async () => {
    connection = await createTypeOrmConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.createDatabase("graphqldb-test", true);
    await request(host, mutationAddUser);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("should create new user", async () => {
    await connection.close();
    connection = await createTypeOrmConnection();
    await request(host, mutationAddUser);
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
  });

  test("should log in", async () => {
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);

    const response = await request(host, mutationLogIn);
    expect(response.login.user.email).toEqual(email);
    expect(response.login.token).not.toEqual("");
  });

  test("should restore password", async () => {
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    let user = users[0];
    expect(user.email).toEqual(email);

    const payload = {
      id: user.id,
      email: email,
    };

    const secret = user.password + "-" + user.createdAt.getTime();
    let token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const newPassword = "123456#QQ";

    const mutationPasswordRestore = `
        mutation {
          passwordRestore(id: ${user.id}, password: "${newPassword}", token: "${token}"){
            id
            email
          }
        }`;
    await request(host, mutationPasswordRestore);
    const newUser = await User.findOne({ where: { email } });
    expect(newUser.password).not.toEqual(user.password);
  });

  test("should send email password restore", async () => {
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);

    const response = await request(host, mutationSendMessageToRedis);
    expect(response.sendEmailPasswordRestore.message).toEqual(
      "Message sent to : tom@bob.com"
    );
  });
});

describe("User controller tests", () => {

  const client = redis.createClient();
  const context = {
    client
  };

  beforeEach(async () => {
    connection = await createTypeOrmConnection();
    await request(host, mutationAddUser);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("should create user", async () => {
    await UserController.createUser(newEmail, password);
    const users = await User.find({ where: { email: newEmail } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(newEmail);
  });

  test("should return an error, when creating user and lost connection to the database", async () => {
    await connection.close();
    const response = await UserController.createUser(newEmail, password);
    expect(response.message).toEqual(
      "TypeError: Cannot read property 'connect' of undefined"
    );
    connection = await createTypeOrmConnection();
  });

  test("should log in and get token", async () => {
    await UserController.createUser(newEmail, password);
    const users = await User.find({ where: { email: newEmail } });
    expect(users).toHaveLength(1);

    const response = await UserController.login(newEmail, password);
    expect(response.user.email).toEqual(newEmail);
    expect(response.token.length).not.toEqual(0);
  });

  test("should return an error when user logging, but user email doesn't exist", async () => {
    const response = await UserController.login(newEmail, password);
    expect(response.message).toEqual("Invalid Login");
  });

  test("should return an error when user logging, but password doesn't match", async () => {
    const response = await UserController.login(email, password + "123");
    expect(response.message).toEqual("Invalid Login");
  });

  test("should restore password ", async () => {
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    let user = users[0];
    expect(user.email).toEqual(email);

    const payload = {
      id: user.id,
      email: email,
    };

    const secret = user.password + "-" + user.createdAt.getTime();
    let token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const newPassword = "123456#QQ";

    await UserController.passwordRestore(user.id, newPassword, token);
    const newUser = await User.findOne({ where: { email } });
    expect(newUser.password).not.toEqual(user.password);
  });

  test("should return an error when restoring password and sending an incorrect id", async () => {
    const user = await User.findOne({ where: { email } });
    expect(user.email).toEqual(email);

    const payload = {
      id: user.id,
      email: email,
    };
    const secret = user.password + "-" + user.createdAt.getTime();
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const newPassword = "123456#QQ";
    const response = await UserController.passwordRestore(
      3,
      newPassword,
      token
    );
    expect(response.message).toEqual(`Invalid id`);
  });

  test("should return an error when restoring password and sending an incorrect token", async () => {
    const newPassword = "123456#QQ";
    const response = await UserController.passwordRestore(
      userId,
      newPassword,
      "asdasdasdasd"
    );
    expect(response.message).toEqual(`JsonWebTokenError: jwt malformed`);
  });

  test("should send instructions to password restore", async () => {
    const response = await UserController.sendEmailPasswordRestore(
      email,
      context
    );
    expect(response.message).toEqual("Message sent to : tom@bob.com");
  });

  test("should return an error when sending instructions to password restore but inputted email doesn't exist", async () => {
    const response = await UserController.sendEmailPasswordRestore(
      newEmail,
      context
    );
    expect(response.message).toEqual("Invalid email");
  });
});
