import {Task} from "../entities/Task";
import {getRepository} from "typeorm";
import {User} from "../entities/User";
const jwt = require('jsonwebtoken');

interface IParams {
    id?: number
    name: string
    description: string
    due_date: string
    priority: string
    notification_date: string
    user_id: number
    completed: boolean
}



module.exports = {
    async createTask(data, context) {
        const token = context.req.req.headers.token;
        const decoded = jwt.verify(token, 'secret');
        try {
            const task = new Task();
            task.name = data.name;
            task.description = data.description;
            task.due_date = data.due_date;
            task.priority = data.priority;
            task.notification_date = data.notification_date;
            task.user_id = data.user_id;
            task.completed = false;
            return await getRepository(Task).save(task);
        } catch (e) {

        }
    },

    async updateTask(data, context) {
        const token = context.req.req.headers.token;
        const decoded = jwt.verify(token, 'secret');
        try {
            const task = await getRepository(Task).findOne(data.id);
            if(decoded.id.toString() === task.user_id) {
                for (let updateTaskParameter in data) {
                    const updateValue = data[updateTaskParameter];
                    if (updateValue !== null && updateValue !== undefined && updateValue.length > 0) {
                        task[updateTaskParameter] = updateValue;
                    }
                }
                await getRepository(Task).update(data.id, task);
                return await getRepository(Task).findOne(data.id);
            } else {
                return Error('Permission denied')
            }
        }catch (e) {
            console.log(e)
        }
    },

    async getAllTask() {
        try {
            return await getRepository(Task).find();
        } catch (e) {
        }
    },


    async getTaskById(id, context) {
        const token = context.req.req.headers.token;
        const decoded = jwt.verify(token, 'secret');
        try {
            const user = await getRepository(Task).findOne(id);
            return user;
        } catch (e) {
            console.log(e);
        }
    },

    async getTaskByUserId(user_id, context) {
        const token = context.req.req.headers.token;
        const decoded = jwt.verify(token, 'secret');

        try {
            if(decoded.id.toString() === user_id) {
                const user = await getRepository(Task).find({where: {user_id: user_id}});
                return user;
            } else {
                return Error('Permission denied')
            }
        } catch (e) {
            console.log(e);
        }
    },


    async deleteTask(id, context) {
        const token = context.req.req.headers.token;
        const decoded = jwt.verify(token, 'secret');
        try {
            const deleteTask = await getRepository(Task).findOne(id);
            if(decoded.id.toString() === deleteTask.user_id) {
                await getRepository(Task).delete(id);
                return deleteTask;
            }else {
                return Error('Permission denied')
            }
        } catch (e) {
        }
    },
};