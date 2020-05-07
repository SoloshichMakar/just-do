import { Task } from "../entities/Task";
import { getRepository } from "typeorm";
const jwt = require("jsonwebtoken");

interface IParams {
  id?: number;
  name: string;
  description: string;
  due_date: string;
  priority: string;
  notification_date: string;
  user_id: number;
  completed: boolean;
}

module.exports = {
  async createTask(data, context) {
    const {
      name,
      description,
      due_date,
      priority,
      notification_date,
      user_id,
    } = data;

    const token = context.req.req.headers.token;
    const decoded = jwt.verify(token, "secret");
    try {
      const task = new Task(
        name,
        description,
        due_date,
        priority,
        notification_date,
        user_id,
        false
      );
      return await getRepository(Task).save(task);
    } catch (e) {
      return Error(e);
    }
  },

  async updateTask(data, context) {
    const token = context.req.req.headers.token;
    const decoded = jwt.verify(token, "secret");
    try {
      const task = await getRepository(Task).findOne(data.id);
      if (decoded.id === task.user_id) {
        for (let updateTaskParameter in data) {
          const updateValue = data[updateTaskParameter];
          if (
            updateValue !== null &&
            updateValue !== undefined &&
            updateValue.length > 0
          ) {
            task[updateTaskParameter] = updateValue;
          }
        }
        await getRepository(Task).update(data.id, task);
        return await getRepository(Task).findOne(data.id);
      } else {
        return Error("Permission denied");
      }
    } catch (e) {
      return Error(e);
    }
  },

  async getAllTask() {
    try {
      return await getRepository(Task).find();
    } catch (e) {
      return Error(e);
    }
  },

  async getTaskById(id, context) {
    const token = context.req.req.headers.token;
    const decoded = jwt.verify(token, "secret");
    try {
      const user = await getRepository(Task).findOne(id);
      return user;
    } catch (e) {
      return Error(e);
    }
  },

  async getTaskByUserId(user_id, context) {
    const token = context.req.req.headers.token;
    const decoded = jwt.verify(token, "secret");

    try {
      if (decoded.id === user_id) {
        const user = await getRepository(Task).find({
          where: { user_id: user_id },
        });
        return user;
      } else {
        return Error("Permission denied");
      }
    } catch (e) {
      return Error(e);
    }
  },

  async deleteTask(id, context) {
    const token = context.req.req.headers.token;
    const decoded = jwt.verify(token, "secret");
    try {
      const deleteTask = await getRepository(Task).findOne(id);
      if (decoded.id === deleteTask.user_id) {
        await getRepository(Task).delete(id);
        return deleteTask;
      } else {
        return Error("Permission denied");
      }
    } catch (e) {
      return Error(e);
    }
  },
};
