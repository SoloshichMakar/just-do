export const typeDefs = `
  type User {
    id: ID!
    email: String!
  }
  
  type Task {
    id: ID!
    name: String!
    description: String!
    due_date: String!
    priority: String!
    notification_date: String!
    user_id: ID!
    completed: Boolean!
  }
  
  type Message {
    message: String!
  }
  
  type Query {
    user(id: ID!): User!
    task(id: ID!): Task!
    getTaskByUserId(user_id: ID!): [Task]
    users: [User!]!
    tasks: [Task!]!
    
  }
  
  type Mutation {
    addUser(email: String!, password: String!): User
    updateUser(id: ID!, email:String, password: String): User
    deleteUser(id: ID!): User   
    passwordRestore(id: ID!, password: String!, token: String!): User
    sendEmailPasswordRestore(email: String!): Message!
    
    addTask(name: String!, description: String!, due_date: String!, priority: String!, notification_date: String!, user_id: ID!): Task
    updateTask(id: ID!, name: String, description: String, due_date: String, priority: String, notification_date: String, completed: Boolean): Task
    deleteTask(id: ID!): Task
    
    login(email: String!, password: String!): LoginResponse!
  }
  
  type LoginResponse {
      token: String
      user: User
   }
`;