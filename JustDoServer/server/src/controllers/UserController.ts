import { User } from "../entities/User";
import { getRepository } from "typeorm";
import {restoreMessage} from "../templates/PasswordRestoreMessage";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const clientAddress = "http://localhost:80";

module.exports = {
  async createUser(email, password) {
    try {
      const user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      return await getRepository(User).save(user);
    } catch (e) {}
  },

  async login(email, password) {
    const user = await getRepository(User).findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Login");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid Login");
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

  async updateUser(id, email, password) {
    try {
      const user = await getRepository(User).findOne(id);
      if (email !== null && email !== undefined && email.length > 0) {
        user.email = email;
      }
      if (password !== null && password !== undefined && password.length > 0) {
        user.password = password;
      }
      await getRepository(User).update(id, user);
      return user;
    } catch (e) {}
  },

  async sendEmailPasswordRestore(email, context) {
    const user = await getRepository(User).findOne({ email: email });

    if (!user) {
      throw new Error("Invalid email");
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
    context.client.set("emailJson", JSON.stringify(emailJson));

    const Message = { message: "Message sent to : " + email };
    return Message;
  },

  async passwordRestore(id, password, token) {
    const user = await getRepository(User).findOne(id);
    if (!user) {
      throw new Error("Invalid id");
    }
    const secret = user.password + "-" + user.createdAt.getTime();
    try {
      const decoded = jwt.verify(token, secret);
      if (password !== null && password !== undefined && password.length > 0) {
        user.password = await bcrypt.hash(password, 10);
      }
      await getRepository(User).update(id, user);
      return user;
    } catch (e) {
      return Error(e);
    }
  },

  async getAllUsers() {
    try {
      return await getRepository(User).find();
    } catch (e) {}
  },

  async getUserById(id) {
    try {
      const user = await getRepository(User).findOne(id);
      return user;
    } catch (e) {
      console.log(e);
    }
  },

  async deleteUser(id) {
    try {
      const deleteUser = await getRepository(User).findOne(id);
      await getRepository(User).delete(id);
      return deleteUser;
    } catch (e) {}
  },
};
