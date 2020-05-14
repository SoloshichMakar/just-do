import { User } from "../entities/User";
import {getRepository} from "typeorm";
import { restoreMessage } from "../templates/PasswordRestoreMessage";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const clientAddress = "http://localhost:80";

module.exports = {
  async createUser(email, password) {
    try {
      const bcryptPassword = await bcrypt.hash(password, 10);
      const user = new User(email, bcryptPassword);
      return await getRepository(User).save(user);
    } catch (e) {
      return Error(e);
    }
  },

  async login(email, password) {
    const user = await getRepository(User).findOne({ email: email });
    if (!user) {
      return Error("Invalid Login");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Error("Invalid Login");
    }

    const payload = {
      id: user.id,
      username: user.email,
    };

    const secret = process.env.JWT_SECRET || "secret";

    const token = jwt.sign(payload, secret, {
      expiresIn: "30d",
    });
    return {
      token,
      user,
    };
  },


  async sendEmailPasswordRestore(email, context) {
    const user = await getRepository(User).findOne({ email: email });
    if (!user) {
      return Error("Invalid email");
    }
    const payload = {
      id: user.id,
      email: email,
    };

    const secret = user.password + "-" + user.createdAt.getTime();
    let token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const restoreLink = `"${clientAddress}/reset_password/${user.id}/${token}"`;

    const emailJson = {
      email: email,
      message: restoreMessage(restoreLink),
    };
    await context.client.set("emailJson", JSON.stringify(emailJson));

    const Message = { message: "Message sent to : " + email };
    return Message;
  },

  async passwordRestore(id, password, token) {
    const user = await getRepository(User).findOne(id);
    if (!user) {
      return  Error("Invalid id");
    }
    const secret = user.password + "-" + user.createdAt.getTime();
    try {
      const decoded = jwt.verify(token, secret);
      user.password = await bcrypt.hash(password, 10);
      await getRepository(User).update(id, user);
      return user;
    } catch (e) {
      return Error(e);
    }
  },

};
