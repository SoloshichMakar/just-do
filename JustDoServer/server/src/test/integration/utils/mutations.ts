import { email, password } from "./constants";

export const mutationAddUser = `
mutation {
  addUser(email: "${email}", password: "${password}"){
    email
  }
  
}`;


export const mutationLogIn = `
mutation {
  login(email: "${email}", password: "${password}"){
    user{
    id
    email
    }
    token
  }
  
}`;

export const mutationAddTask = `
mutation {
  addTask(name: "To do", description: "do some", due_date: "21:00 21-05-2020", priority: "average", notification_date: "20:30 21-05-2020", userId: 1){
    name
    description
    due_date
    priority
    notification_date
    userId
  }
}`;

export const mutationUpdateTask = `
mutation {
  updateTask(id: 1, name: "To do update", description: "do some updated"){
    name
    description
  }  
}`;

export const mutationDeleteTask = `
mutation {
  deleteTask(id: 1){
    name
    description
  }  
}`;

export const queryGetAllTask = `{
    tasks {
    name
    description
    userId
  }
}
`;

export const queryGetTaskById = `{
    task(id: 1){
    name
    description
    userId
  }
}
`;

export const queryGetTaskByUserId = `{
    getTaskByUserId(userId: 1) {
    name
    description
    userId
  }
}
`;

export const mutationSendMessageToRedis = `
mutation {
  sendEmailPasswordRestore(email: "${email}"){
    message
  }
}`;
